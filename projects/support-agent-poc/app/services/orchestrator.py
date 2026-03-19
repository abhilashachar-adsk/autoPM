import logging
from typing import List
from sqlalchemy.orm import Session

from app.models import Ticket, SubTicket, TeamChannel, Message, TicketStatus, SubTicketStatus, MessageAuthorType
from app.schemas import TriageResult

logger = logging.getLogger(__name__)


class TicketOrchestrator:
    """Orchestrates ticket routing and sub-ticket creation."""
    
    async def process_triage_result(
        self,
        ticket: Ticket,
        triage_result: TriageResult,
        db: Session
    ) -> List[SubTicket]:
        """
        Process triage result and create sub-tickets in team channels.
        
        Args:
            ticket: The parent ticket
            triage_result: Result from triage service
            db: Database session
            
        Returns:
            List of created sub-tickets
        """
        sub_tickets = []
        
        # Update ticket with triage result
        ticket.triage_result = triage_result.model_dump()
        ticket.priority = triage_result.priority
        ticket.status = TicketStatus.IN_PROGRESS.value
        
        # Create sub-tickets for each assigned team
        for assignment in triage_result.teams:
            # Find the team channel
            channel = db.query(TeamChannel).filter(
                TeamChannel.name == assignment.team_name
            ).first()
            
            if not channel:
                logger.warning(f"Team channel not found: {assignment.team_name}")
                continue
            
            # Create sub-ticket
            sub_ticket = SubTicket(
                parent_ticket_id=ticket.id,
                channel_id=channel.id,
                context=assignment.context,
                status=SubTicketStatus.PENDING.value
            )
            db.add(sub_ticket)
            db.flush()  # Get the ID
            
            # Add system message to sub-ticket
            system_message = Message(
                sub_ticket_id=sub_ticket.id,
                author_type=MessageAuthorType.SYSTEM.value,
                author_name="Triage Agent",
                content=f"""New support request routed to {channel.name}:

**Original Request:** {ticket.title}

**Context for {channel.name}:**
{assignment.context}

**Priority:** {assignment.priority}

---
*Please review and respond. Your responses will be visible to the requester.*"""
            )
            db.add(system_message)
            
            sub_tickets.append(sub_ticket)
        
        # Add system message to main ticket
        teams_involved = ", ".join([a.team_name for a in triage_result.teams])
        main_message = Message(
            ticket_id=ticket.id,
            author_type=MessageAuthorType.SYSTEM.value,
            author_name="Triage Agent",
            content=f"""Your request has been analyzed and routed to the appropriate teams.

**Summary:** {triage_result.summary}

**Priority:** {triage_result.priority}

**Teams Involved:** {teams_involved}

**Routing Reason:** {triage_result.reasoning}

---
*You'll see updates from all teams below. You can reply here and your message will be shared with all involved teams.*"""
        )
        db.add(main_message)
        
        db.commit()
        
        return sub_tickets
    
    async def broadcast_user_reply(
        self,
        ticket: Ticket,
        content: str,
        author_name: str,
        db: Session
    ) -> List[Message]:
        """
        Broadcast a user reply to all involved team channels.
        
        Args:
            ticket: The parent ticket
            content: Reply content
            author_name: Name of the user
            db: Database session
            
        Returns:
            List of created messages
        """
        messages = []
        
        # Add message to main ticket
        main_message = Message(
            ticket_id=ticket.id,
            author_type=MessageAuthorType.USER.value,
            author_name=author_name,
            content=content
        )
        db.add(main_message)
        messages.append(main_message)
        
        # Broadcast to all sub-tickets
        for sub_ticket in ticket.sub_tickets:
            sub_message = Message(
                sub_ticket_id=sub_ticket.id,
                author_type=MessageAuthorType.USER.value,
                author_name=author_name,
                content=f"**[Update from Requester]**\n\n{content}"
            )
            db.add(sub_message)
            messages.append(sub_message)
        
        db.commit()
        
        return messages
    
    async def add_team_response(
        self,
        sub_ticket: SubTicket,
        content: str,
        author_name: str,
        db: Session
    ) -> Message:
        """
        Add a team member response to a sub-ticket.
        Also adds a copy to the main ticket for unified view.
        
        Args:
            sub_ticket: The sub-ticket
            content: Response content
            author_name: Name of the team member
            db: Database session
            
        Returns:
            Created message
        """
        # Get channel name for attribution
        channel_name = sub_ticket.channel.name
        
        # Add message to sub-ticket
        sub_message = Message(
            sub_ticket_id=sub_ticket.id,
            author_type=MessageAuthorType.TEAM_MEMBER.value,
            author_name=f"{author_name} ({channel_name})",
            content=content
        )
        db.add(sub_message)
        
        # Also add to main ticket for unified view
        main_message = Message(
            ticket_id=sub_ticket.parent_ticket_id,
            author_type=MessageAuthorType.TEAM_MEMBER.value,
            author_name=f"{author_name} ({channel_name})",
            content=content
        )
        db.add(main_message)
        
        # Update sub-ticket status if it was pending
        if sub_ticket.status == SubTicketStatus.PENDING.value:
            sub_ticket.status = SubTicketStatus.IN_PROGRESS.value
        
        db.commit()
        
        return sub_message
    
    async def resolve_sub_ticket(
        self,
        sub_ticket: SubTicket,
        db: Session
    ) -> None:
        """Mark a sub-ticket as resolved."""
        sub_ticket.status = SubTicketStatus.RESOLVED.value
        
        # Check if all sub-tickets are resolved
        parent = sub_ticket.parent_ticket
        all_resolved = all(
            st.status == SubTicketStatus.RESOLVED.value 
            for st in parent.sub_tickets
        )
        
        if all_resolved:
            parent.status = TicketStatus.RESOLVED.value
            
            # Add system message
            message = Message(
                ticket_id=parent.id,
                author_type=MessageAuthorType.SYSTEM.value,
                author_name="System",
                content="All teams have marked their tasks as resolved. This ticket is now resolved."
            )
            db.add(message)
        
        db.commit()


# Singleton instance
orchestrator = TicketOrchestrator()
