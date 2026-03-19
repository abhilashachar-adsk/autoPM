from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, JSON, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.database import Base


class TicketStatus(str, enum.Enum):
    """Status of a ticket."""
    PENDING = "pending"
    TRIAGING = "triaging"
    IN_PROGRESS = "in_progress"
    RESOLVED = "resolved"
    CLOSED = "closed"


class SubTicketStatus(str, enum.Enum):
    """Status of a sub-ticket in a team channel."""
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    RESOLVED = "resolved"


class MessageAuthorType(str, enum.Enum):
    """Type of message author."""
    USER = "user"
    TEAM_MEMBER = "team_member"
    SYSTEM = "system"


class Ticket(Base):
    """Main support ticket submitted by user."""
    __tablename__ = "tickets"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    status = Column(String(50), default=TicketStatus.PENDING.value)
    priority = Column(String(50), nullable=True)
    requester_name = Column(String(255), nullable=True, default="Anonymous")
    requester_email = Column(String(255), nullable=True)
    
    # LLM triage results stored as JSON
    triage_result = Column(JSON, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    sub_tickets = relationship("SubTicket", back_populates="parent_ticket", cascade="all, delete-orphan")
    messages = relationship("Message", back_populates="ticket", cascade="all, delete-orphan")


class TeamChannel(Base):
    """Team support channel."""
    __tablename__ = "team_channels"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    description = Column(Text, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    sub_tickets = relationship("SubTicket", back_populates="channel")


class SubTicket(Base):
    """Sub-ticket created in a team channel for a parent ticket."""
    __tablename__ = "sub_tickets"
    
    id = Column(Integer, primary_key=True, index=True)
    parent_ticket_id = Column(Integer, ForeignKey("tickets.id"), nullable=False)
    channel_id = Column(Integer, ForeignKey("team_channels.id"), nullable=False)
    
    # Context provided to the team
    context = Column(Text, nullable=False)
    status = Column(String(50), default=SubTicketStatus.PENDING.value)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    parent_ticket = relationship("Ticket", back_populates="sub_tickets")
    channel = relationship("TeamChannel", back_populates="sub_tickets")
    messages = relationship("Message", back_populates="sub_ticket", cascade="all, delete-orphan")


class Message(Base):
    """Message in a ticket or sub-ticket conversation."""
    __tablename__ = "messages"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Can be associated with either a ticket or sub-ticket
    ticket_id = Column(Integer, ForeignKey("tickets.id"), nullable=True)
    sub_ticket_id = Column(Integer, ForeignKey("sub_tickets.id"), nullable=True)
    
    author_type = Column(String(50), nullable=False)
    author_name = Column(String(255), nullable=True)
    content = Column(Text, nullable=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    ticket = relationship("Ticket", back_populates="messages")
    sub_ticket = relationship("SubTicket", back_populates="messages")
