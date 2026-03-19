from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from contextlib import asynccontextmanager

from app.database import init_db, get_db, SessionLocal
from app.routers import tickets, channels
from app.models import TeamChannel


def seed_team_channels(db):
    """Seed initial team channels if they don't exist."""
    existing = db.query(TeamChannel).first()
    if existing:
        return
    
    teams = [
        TeamChannel(
            name="Engineering",
            description="Software development, bugs, feature requests, code reviews"
        ),
        TeamChannel(
            name="Data Platform",
            description="Data pipelines, analytics, databases, data quality issues"
        ),
        TeamChannel(
            name="Infrastructure",
            description="Cloud resources, deployments, networking, monitoring, DevOps"
        ),
        TeamChannel(
            name="Security",
            description="Access control, vulnerabilities, compliance, authentication"
        ),
    ]
    
    for team in teams:
        db.add(team)
    db.commit()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler."""
    # Startup
    init_db()
    
    # Seed team channels
    db = SessionLocal()
    try:
        seed_team_channels(db)
    finally:
        db.close()
    
    yield
    # Shutdown (nothing needed)


app = FastAPI(
    title="Support Agent POC",
    description="Unified support interface with intelligent triage",
    version="0.1.0",
    lifespan=lifespan
)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Setup templates
templates = Jinja2Templates(directory="templates")

# Include routers
app.include_router(tickets.router, prefix="/tickets", tags=["tickets"])
app.include_router(channels.router, prefix="/channels", tags=["channels"])


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """Home page - redirect to ticket submission."""
    return templates.TemplateResponse("submit.html", {"request": request})


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}
