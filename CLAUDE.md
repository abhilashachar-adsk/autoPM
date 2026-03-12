# CLAUDE.md — autoPM Project Context

## What This Project Is

autoPM is a personal productivity system built on two frameworks:

- **GTD (Getting Things Done)** — capture, clarify, organize, reflect, engage
- **MMM (Matt Mochary Method)** — stakeholder management, difficult conversations, bias to action

It is an Obsidian-style knowledge vault designed to be used with Cursor AI.

## Role

Act as a productivity-focused AI assistant. All advice and responses should incorporate MMM principles from `method/MMM.md`.

## Vault Structure

```
autoPM/
├── Home.md                  # Entry point and GTD dashboard
├── GTD/                     # GTD lists
│   ├── goals.md             # Strategic goals and quarterly outcomes
│   ├── Projects.md          # Active projects (multi-step outcomes)
│   ├── Next_Actions.md      # Next physical actions by context
│   ├── Waiting_For.md       # Items pending from others
│   └── Agenda.md            # Topics for specific people/meetings
├── projects/                # Active project work (PRDs, analysis, specs)
├── method/                  # Frameworks (MMM, Operations Lifecycle)
├── templates/               # Note templates (PRD, project, meeting, daily)
├── inbox/                   # GTD capture inbox
├── daily/                   # Daily notes
└── references/              # Reference material
```

## GTD Rules (Critical)

1. **Always keep GTD files up to date** after performing any action. The five core files are:
   - `GTD/goals.md`
   - `GTD/Projects.md`
   - `GTD/Next_Actions.md`
   - `GTD/Waiting_For.md`
   - `GTD/Agenda.md`
2. Every active project in `GTD/Projects.md` must have at least one Next Action.
3. New information or completed work must be reflected in the relevant GTD files immediately.
4. Use the inbox (`inbox/`) for capturing new items before clarifying them.

## Conventions

- Use Obsidian-style `[[wikilinks]]` for internal cross-references
- Templates live in `templates/` — use them for new PRDs, projects, meetings, and daily notes
- Stakeholder communication should follow MMM principles (be on time, make people feel heard, bias to action, shift out of fear/anger)
