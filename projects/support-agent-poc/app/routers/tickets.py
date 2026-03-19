from fastapi import APIRouter, Depends, HTTPException, Request, BackgroundTasks
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from sse_starlette.sse import EventSourceResponse
from sqlalchemy.orm import Session, joinedload
from typing import List
import asyncio
import json

from app.database import get_db
from app.models import Ticket, SubTicket, Message, TicketStatus
from app.schemas import (
    TicketCreate, 
    TicketResponse, 
    TicketListResponse, 
    UserReply,
    MessageResponse
)
from app.services.triage import triage_service
from app.services.orchestrator import orchestrator

router = APIRouter()
templates = Jinja2Templates(directory="templates")

# Store for SSE connections (in production, use Redis pub/sub)
ticket_subscribers = {}


@router.post("", response_model=TicketResponse)
async def create_ticket(
    ticket_data: TicketCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Create a new support ticket.
    The ticket will be automatically triaged and routed to appropriate teams.
    """
    # Create the ticket
    ticket = Ticket(
        title=ticket_data.title,
        description=ticket_data.description,
        requester_name=ticket_data.requester_name,
        requester_email=ticket_data.requester_email,
        status=TicketStatus.TRIAGING.value
    )
    db.add(ticket)
    db.commit()
    db.refresh(ticket)
    
    # Triage and route the ticket
    triage_result = await triage_service.triage_ticket(
        title=ticket.title,
        description=ticket.description,
        db=db
    )
    
    # Create sub-tickets based on triage
    await orchestrator.process_triage_result(ticket, triage_result, db)
    
    # Refresh to get all relationships
    db.refresh(ticket)
    
    return ticket


@router.get("", response_model=List[TicketListResponse])
async def list_tickets(
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """List all tickets with basic info."""
    tickets = db.query(Ticket)\
        .options(joinedload(Ticket.sub_tickets))\
        .order_by(Ticket.created_at.desc())\
        .offset(skip)\
        .limit(limit)\
        .all()
    
    result = []
    for ticket in tickets:
        result.append(TicketListResponse(
            id=ticket.id,
            title=ticket.title,
            status=ticket.status,
            priority=ticket.priority,
            requester_name=ticket.requester_name,
            created_at=ticket.created_at,
            team_count=len(ticket.sub_tickets)
        ))
    
    return result


@router.get("/{ticket_id}", response_model=TicketResponse)
async def get_ticket(
    ticket_id: int,
    db: Session = Depends(get_db)
):
    """Get a ticket with all conversations."""
    ticket = db.query(Ticket)\
        .options(
            joinedload(Ticket.sub_tickets).joinedload(SubTicket.channel),
            joinedload(Ticket.sub_tickets).joinedload(SubTicket.messages),
            joinedload(Ticket.messages)
        )\
        .filter(Ticket.id == ticket_id)\
        .first()
    
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    
    return ticket


@router.get("/{ticket_id}/view", response_class=HTMLResponse)
async def view_ticket(
    request: Request,
    ticket_id: int,
    db: Session = Depends(get_db)
):
    """View ticket in unified UI."""
    ticket = db.query(Ticket)\
        .options(
            joinedload(Ticket.sub_tickets).joinedload(SubTicket.channel),
            joinedload(Ticket.sub_tickets).joinedload(SubTicket.messages),
            joinedload(Ticket.messages)
        )\
        .filter(Ticket.id == ticket_id)\
        .first()
    
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    
    return templates.TemplateResponse("ticket.html", {
        "request": request,
        "ticket": ticket
    })


@router.post("/{ticket_id}/reply", response_model=List[MessageResponse])
async def reply_to_ticket(
    ticket_id: int,
    reply: UserReply,
    db: Session = Depends(get_db)
):
    """
    User replies to a ticket.
    The reply is broadcast to all involved teams.
    """
    ticket = db.query(Ticket)\
        .options(joinedload(Ticket.sub_tickets))\
        .filter(Ticket.id == ticket_id)\
        .first()
    
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    
    author_name = reply.author_name or ticket.requester_name or "User"
    
    messages = await orchestrator.broadcast_user_reply(
        ticket=ticket,
        content=reply.content,
        author_name=author_name,
        db=db
    )
    
    return messages


@router.post("/{ticket_id}/close")
async def close_ticket(
    ticket_id: int,
    db: Session = Depends(get_db)
):
    """Close a ticket."""
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    
    ticket.status = TicketStatus.CLOSED.value
    
    # Add closing message
    message = Message(
        ticket_id=ticket.id,
        author_type="system",
        author_name="System",
        content="This ticket has been closed."
    )
    db.add(message)
    db.commit()
    
    return {"status": "closed", "ticket_id": ticket_id}


@router.get("/list", response_class=HTMLResponse)
async def list_tickets_page(request: Request):
    """View all tickets page."""
    return templates.TemplateResponse("tickets_list.html", {"request": request})


@router.get("/{ticket_id}/stream")
async def ticket_stream(
    ticket_id: int,
    db: Session = Depends(get_db)
):
    """
    Server-Sent Events stream for real-time ticket updates.
    Clients connect here to receive live message notifications.
    """
    # Verify ticket exists
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    
    async def event_generator():
        # Get initial message count
        last_count = db.query(Message).filter(
            (Message.ticket_id == ticket_id) | 
            (Message.sub_ticket_id.in_(
                db.query(SubTicket.id).filter(SubTicket.parent_ticket_id == ticket_id)
            ))
        ).count()
        
        while True:
            await asyncio.sleep(3)  # Poll every 3 seconds
            
            # Check for new messages
            current_count = db.query(Message).filter(
                (Message.ticket_id == ticket_id) | 
                (Message.sub_ticket_id.in_(
                    db.query(SubTicket.id).filter(SubTicket.parent_ticket_id == ticket_id)
                ))
            ).count()
            
            if current_count > last_count:
                last_count = current_count
                yield {
                    "event": "message",
                    "data": json.dumps({"type": "new_message", "count": current_count})
                }
            else:
                # Send heartbeat
                yield {
                    "event": "heartbeat",
                    "data": json.dumps({"status": "ok"})
                }
    
    return EventSourceResponse(event_generator())
