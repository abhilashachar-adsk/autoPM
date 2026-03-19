from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum


class TicketStatus(str, Enum):
    PENDING = "pending"
    TRIAGING = "triaging"
    IN_PROGRESS = "in_progress"
    RESOLVED = "resolved"
    CLOSED = "closed"


class SubTicketStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    RESOLVED = "resolved"


class MessageAuthorType(str, Enum):
    USER = "user"
    TEAM_MEMBER = "team_member"
    SYSTEM = "system"


# Team Channel Schemas
class TeamChannelBase(BaseModel):
    name: str
    description: Optional[str] = None


class TeamChannelCreate(TeamChannelBase):
    pass


class TeamChannelResponse(TeamChannelBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


# Message Schemas
class MessageBase(BaseModel):
    content: str
    author_name: Optional[str] = None


class MessageCreate(MessageBase):
    author_type: MessageAuthorType = MessageAuthorType.USER


class MessageResponse(MessageBase):
    id: int
    author_type: str
    ticket_id: Optional[int] = None
    sub_ticket_id: Optional[int] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


# Sub-ticket Schemas
class SubTicketBase(BaseModel):
    context: str


class SubTicketCreate(SubTicketBase):
    channel_id: int


class SubTicketResponse(SubTicketBase):
    id: int
    parent_ticket_id: int
    channel_id: int
    status: str
    created_at: datetime
    channel: Optional[TeamChannelResponse] = None
    messages: List[MessageResponse] = []
    
    class Config:
        from_attributes = True


# Triage Result Schema
class TeamAssignment(BaseModel):
    """Assignment to a specific team from triage."""
    team_name: str
    context: str = Field(description="Context/questions for this team")
    priority: str = Field(default="medium", description="Priority for this team")


class TriageResult(BaseModel):
    """Result from LLM triage analysis."""
    summary: str = Field(description="Brief summary of the issue")
    priority: str = Field(default="medium", description="Overall priority: low, medium, high, critical")
    teams: List[TeamAssignment] = Field(description="Teams that need to be involved")
    reasoning: str = Field(description="Explanation of routing decision")


# Ticket Schemas
class TicketBase(BaseModel):
    title: str = Field(min_length=5, max_length=255)
    description: str = Field(min_length=10)


class TicketCreate(TicketBase):
    requester_name: Optional[str] = "Anonymous"
    requester_email: Optional[str] = None


class TicketResponse(TicketBase):
    id: int
    status: str
    priority: Optional[str] = None
    requester_name: Optional[str] = None
    requester_email: Optional[str] = None
    triage_result: Optional[dict] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    sub_tickets: List[SubTicketResponse] = []
    messages: List[MessageResponse] = []
    
    class Config:
        from_attributes = True


class TicketListResponse(BaseModel):
    id: int
    title: str
    status: str
    priority: Optional[str] = None
    requester_name: Optional[str] = None
    created_at: datetime
    team_count: int = 0
    
    class Config:
        from_attributes = True


# Reply Schemas
class UserReply(BaseModel):
    """User reply to a ticket (broadcast to all teams)."""
    content: str = Field(min_length=1)
    author_name: Optional[str] = None


class TeamReply(BaseModel):
    """Team member reply to a sub-ticket."""
    content: str = Field(min_length=1)
    author_name: str = Field(min_length=1)
