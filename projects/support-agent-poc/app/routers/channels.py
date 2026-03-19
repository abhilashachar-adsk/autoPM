from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session, joinedload
from typing import List

from app.database import get_db
from app.models import TeamChannel, SubTicket, Message, SubTicketStatus
from app.schemas import (
    TeamChannelResponse,
    SubTicketResponse,
    TeamReply,
    MessageResponse
)
from app.services.orchestrator import orchestrator

router = APIRouter()
templates = Jinja2Templates(directory="templates")


@router.get("", response_model=List[TeamChannelResponse])
async def list_channels(db: Session = Depends(get_db)):
    """List all team channels."""
    channels = db.query(TeamChannel).all()
    return channels


@router.get("/{channel_id}", response_model=TeamChannelResponse)
async def get_channel(
    channel_id: int,
    db: Session = Depends(get_db)
):
    """Get a specific channel."""
    channel = db.query(TeamChannel).filter(TeamChannel.id == channel_id).first()
    
    if not channel:
        raise HTTPException(status_code=404, detail="Channel not found")
    
    return channel


@router.get("/{channel_id}/view", response_class=HTMLResponse)
async def view_channel(
    request: Request,
    channel_id: int,
    db: Session = Depends(get_db)
):
    """View channel with all sub-tickets (team member view)."""
    channel = db.query(TeamChannel)\
        .options(
            joinedload(TeamChannel.sub_tickets).joinedload(SubTicket.messages),
            joinedload(TeamChannel.sub_tickets).joinedload(SubTicket.parent_ticket)
        )\
        .filter(TeamChannel.id == channel_id)\
        .first()
    
    if not channel:
        raise HTTPException(status_code=404, detail="Channel not found")
    
    return templates.TemplateResponse("channel.html", {
        "request": request,
        "channel": channel
    })


@router.get("/{channel_id}/tickets", response_model=List[SubTicketResponse])
async def list_channel_tickets(
    channel_id: int,
    status: str = None,
    db: Session = Depends(get_db)
):
    """List all sub-tickets in a channel."""
    query = db.query(SubTicket)\
        .options(
            joinedload(SubTicket.messages),
            joinedload(SubTicket.channel),
            joinedload(SubTicket.parent_ticket)
        )\
        .filter(SubTicket.channel_id == channel_id)
    
    if status:
        query = query.filter(SubTicket.status == status)
    
    sub_tickets = query.order_by(SubTicket.created_at.desc()).all()
    
    return sub_tickets


@router.post("/{channel_id}/tickets/{sub_ticket_id}/reply", response_model=MessageResponse)
async def reply_to_sub_ticket(
    channel_id: int,
    sub_ticket_id: int,
    reply: TeamReply,
    db: Session = Depends(get_db)
):
    """
    Team member replies to a sub-ticket.
    The reply is also shown in the main ticket's unified view.
    """
    sub_ticket = db.query(SubTicket)\
        .options(
            joinedload(SubTicket.channel),
            joinedload(SubTicket.parent_ticket)
        )\
        .filter(
            SubTicket.id == sub_ticket_id,
            SubTicket.channel_id == channel_id
        )\
        .first()
    
    if not sub_ticket:
        raise HTTPException(status_code=404, detail="Sub-ticket not found")
    
    message = await orchestrator.add_team_response(
        sub_ticket=sub_ticket,
        content=reply.content,
        author_name=reply.author_name,
        db=db
    )
    
    return message


@router.post("/{channel_id}/tickets/{sub_ticket_id}/resolve")
async def resolve_sub_ticket(
    channel_id: int,
    sub_ticket_id: int,
    db: Session = Depends(get_db)
):
    """Mark a sub-ticket as resolved."""
    sub_ticket = db.query(SubTicket)\
        .options(joinedload(SubTicket.parent_ticket).joinedload(SubTicket.parent_ticket.sub_tickets))\
        .filter(
            SubTicket.id == sub_ticket_id,
            SubTicket.channel_id == channel_id
        )\
        .first()
    
    if not sub_ticket:
        raise HTTPException(status_code=404, detail="Sub-ticket not found")
    
    await orchestrator.resolve_sub_ticket(sub_ticket, db)
    
    return {"status": "resolved", "sub_ticket_id": sub_ticket_id}
