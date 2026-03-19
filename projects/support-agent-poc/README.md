# Support Agent POC

A proof-of-concept support agent that provides a unified interface for submitting support requests. The agent uses AI (OpenAI GPT-4) to intelligently triage and route requests to appropriate teams, while allowing users to track progress from a single view.

## Features

- **Single Ticket Interface**: Submit one support request and see all team conversations in one place
- **AI-Powered Triage**: OpenAI analyzes requests and routes to appropriate teams
- **Simulated Team Channels**: Demo team channels (Engineering, Data Platform, Infrastructure, Security)
- **Real-Time Updates**: Server-Sent Events for live conversation updates
- **Unified View**: Requestors see progress from all teams without visiting multiple channels

## Architecture

```
User submits ticket → AI Triage → Create sub-tickets in team channels
                                         ↓
User sees unified view ← Team members respond
```

## Quick Start

### 1. Setup Environment

```bash
cd support-agent-poc

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Configure OpenAI API Key

```bash
# Copy the template
cp .env.template .env

# Edit .env and add your OpenAI API key
# OPENAI_API_KEY=sk-your-key-here
```

> **Note**: The app works without an API key using keyword-based fallback triage, but AI triage requires the OpenAI API key.

### 3. Run the Application

```bash
uvicorn app.main:app --reload
```

The app will be available at: http://localhost:8000

## Usage

### As a Requestor (User)

1. Go to http://localhost:8000
2. Fill out the support request form with:
   - Your name (optional)
   - Email (optional)
   - Title (required) - Brief summary of your issue
   - Description (required) - Detailed description
3. Submit and see the AI triage analysis
4. View your ticket to see all team conversations
5. Reply from the unified view to broadcast to all teams

### As a Team Member (Demo)

1. Click "Team Channels" in the navbar
2. Select your team (e.g., Engineering)
3. View tickets assigned to your team
4. Respond to tickets with your name
5. Mark tasks as resolved when done

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home page - submit ticket form |
| POST | `/tickets` | Create new support ticket |
| GET | `/tickets` | List all tickets |
| GET | `/tickets/{id}` | Get ticket details (JSON) |
| GET | `/tickets/{id}/view` | View ticket (HTML) |
| POST | `/tickets/{id}/reply` | User replies to ticket |
| GET | `/tickets/{id}/stream` | SSE stream for updates |
| GET | `/channels` | List team channels |
| GET | `/channels/{id}/view` | View team channel |
| POST | `/channels/{id}/tickets/{tid}/reply` | Team responds |
| POST | `/channels/{id}/tickets/{tid}/resolve` | Mark resolved |

## Project Structure

```
support-agent-poc/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app entry point
│   ├── config.py            # Settings from environment
│   ├── database.py          # SQLite/SQLAlchemy setup
│   ├── models.py            # Database models
│   ├── schemas.py           # Pydantic schemas
│   ├── services/
│   │   ├── triage.py        # OpenAI triage service
│   │   └── orchestrator.py  # Ticket routing logic
│   └── routers/
│       ├── tickets.py       # Ticket endpoints
│       └── channels.py      # Channel endpoints
├── templates/               # Jinja2 HTML templates
├── static/                  # CSS and JavaScript
├── requirements.txt
├── .env.template
└── README.md
```

## Demo Scenarios

### Scenario 1: Data Pipeline Issue

**Title**: "ETL job failing with permission errors"

**Description**: "The nightly ETL job that loads sales data into the warehouse has been failing since last night. Error message shows 'Access Denied' when trying to read from S3 bucket. This is blocking the daily sales report."

**Expected Routing**: Data Platform (primary), Infrastructure (for S3 access)

### Scenario 2: Security Concern

**Title**: "Need to revoke access for departed employee"

**Description**: "John Smith left the company yesterday. We need to immediately revoke his access to all systems including GitHub, AWS, and internal tools. He had admin access to several critical systems."

**Expected Routing**: Security (primary), Infrastructure (for cloud access)

### Scenario 3: Bug Report

**Title**: "Login page crashes on mobile Safari"

**Description**: "Users are reporting that the login page crashes immediately on Safari iOS. This started after yesterday's deployment. Affects iPhone users, approximately 30% of our mobile traffic."

**Expected Routing**: Engineering

## Future Enhancements

- Slack integration for real team channels
- User authentication (SSO)
- Email notifications
- Ticket search and filtering
- SLA tracking
- Analytics dashboard
- Multiple file attachments
