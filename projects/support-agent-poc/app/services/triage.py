import json
import logging
from typing import List, Optional
from openai import OpenAI
from sqlalchemy.orm import Session

from app.config import get_settings
from app.models import TeamChannel
from app.schemas import TriageResult, TeamAssignment

logger = logging.getLogger(__name__)

TRIAGE_SYSTEM_PROMPT = """You are an intelligent support ticket triage agent. Your job is to analyze support requests and determine which team(s) should handle them.

Available teams:
{teams}

For each support request, you must:
1. Summarize the issue briefly
2. Determine the overall priority (low, medium, high, critical)
3. Identify which team(s) need to be involved
4. For each team, provide specific context about what they need to address

Guidelines:
- Route to multiple teams if the issue spans multiple domains
- Be specific in the context you provide to each team
- Consider dependencies between teams (e.g., Security might need to approve before Engineering implements)
- Critical priority: Production down, security breach, data loss
- High priority: Significant impact, blocking work
- Medium priority: Important but not urgent
- Low priority: Nice to have, minor issues

Respond ONLY with valid JSON in this exact format:
{{
    "summary": "Brief summary of the issue",
    "priority": "low|medium|high|critical",
    "teams": [
        {{
            "team_name": "Exact team name from the list",
            "context": "Specific context and questions for this team",
            "priority": "priority for this specific team"
        }}
    ],
    "reasoning": "Brief explanation of why these teams were chosen"
}}"""


class TriageService:
    """Service for triaging support tickets using OpenAI."""
    
    def __init__(self):
        settings = get_settings()
        self.client = OpenAI(api_key=settings.openai_api_key) if settings.openai_api_key else None
        self.model = "gpt-4o"
    
    def get_teams_description(self, db: Session) -> str:
        """Get formatted description of available teams."""
        teams = db.query(TeamChannel).all()
        return "\n".join([f"- {team.name}: {team.description}" for team in teams])
    
    def get_team_names(self, db: Session) -> List[str]:
        """Get list of team names."""
        teams = db.query(TeamChannel).all()
        return [team.name for team in teams]
    
    async def triage_ticket(
        self,
        title: str,
        description: str,
        db: Session
    ) -> TriageResult:
        """
        Analyze a ticket and determine routing.
        
        Args:
            title: Ticket title
            description: Ticket description
            db: Database session
            
        Returns:
            TriageResult with team assignments
        """
        if not self.client:
            # Fallback for when OpenAI is not configured
            logger.warning("OpenAI not configured, using fallback triage")
            return self._fallback_triage(title, description, db)
        
        teams_description = self.get_teams_description(db)
        valid_teams = self.get_team_names(db)
        
        system_prompt = TRIAGE_SYSTEM_PROMPT.format(teams=teams_description)
        
        user_message = f"""Please triage this support request:

Title: {title}

Description:
{description}"""
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ],
                temperature=0.3,
                response_format={"type": "json_object"}
            )
            
            result_text = response.choices[0].message.content
            result_data = json.loads(result_text)
            
            # Validate and filter teams to only valid ones
            valid_assignments = []
            for team in result_data.get("teams", []):
                if team.get("team_name") in valid_teams:
                    valid_assignments.append(TeamAssignment(
                        team_name=team["team_name"],
                        context=team.get("context", "Please review this request."),
                        priority=team.get("priority", "medium")
                    ))
            
            # If no valid teams matched, fall back to Engineering
            if not valid_assignments:
                valid_assignments.append(TeamAssignment(
                    team_name="Engineering",
                    context="General support request - please review.",
                    priority="medium"
                ))
            
            return TriageResult(
                summary=result_data.get("summary", title),
                priority=result_data.get("priority", "medium"),
                teams=valid_assignments,
                reasoning=result_data.get("reasoning", "Routed based on request content.")
            )
            
        except Exception as e:
            logger.error(f"OpenAI triage failed: {e}")
            return self._fallback_triage(title, description, db)
    
    def _fallback_triage(
        self,
        title: str,
        description: str,
        db: Session
    ) -> TriageResult:
        """Simple keyword-based fallback triage when OpenAI is unavailable."""
        text = f"{title} {description}".lower()
        
        assignments = []
        
        # Simple keyword matching
        keywords = {
            "Engineering": ["bug", "error", "crash", "feature", "code", "api", "frontend", "backend"],
            "Data Platform": ["data", "database", "query", "analytics", "pipeline", "etl", "warehouse"],
            "Infrastructure": ["deploy", "server", "cloud", "aws", "kubernetes", "docker", "monitoring", "network"],
            "Security": ["security", "access", "permission", "vulnerability", "authentication", "password", "breach"]
        }
        
        for team_name, team_keywords in keywords.items():
            if any(keyword in text for keyword in team_keywords):
                assignments.append(TeamAssignment(
                    team_name=team_name,
                    context=f"Request mentions keywords related to {team_name}. Please review.",
                    priority="medium"
                ))
        
        # Default to Engineering if no matches
        if not assignments:
            assignments.append(TeamAssignment(
                team_name="Engineering",
                context="General support request - please review and route if needed.",
                priority="medium"
            ))
        
        return TriageResult(
            summary=title,
            priority="medium",
            teams=assignments,
            reasoning="Routed using keyword matching (OpenAI unavailable)."
        )


# Singleton instance
triage_service = TriageService()
