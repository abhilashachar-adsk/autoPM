# CLAUDE.md — autoPM Project Context

## What This Project Is

autoPM is a personal productivity system and project hub for AD Platform Infrastructure PM work at Autodesk. It is an Obsidian-style knowledge vault built on two frameworks:

- **GTD (Getting Things Done)** — capture, clarify, organize, reflect, engage
- **MMM (Matt Mochary Method)** — stakeholder management, difficult conversations, bias to action

## Role

Act as the PM for Platform Infrastructure within the Analytics Data Org of PSET at Autodesk. All advice and responses should incorporate MMM principles from `method/MMM.md`.

## Vault Structure

```
autoPM/
├── Home.md                  # Entry point and GTD dashboard
├── GTD/                     # GTD lists
│   ├── goals.md             # FY27 strategic goals and quarterly outcomes
│   ├── Projects.md          # Active projects (multi-step outcomes)
│   ├── Next_Actions.md      # Next physical actions by context
│   ├── Waiting_For.md       # Items pending from others
│   └── Agenda.md            # Topics for specific people/meetings
├── people/                  # 🔒 Private person notes (gitignored)
├── projects/                # Active project work (PRDs, MFEs, analysis)
├── method/MMM.md            # Matt Mochary Method reference
├── templates/               # Note templates (PRD, project, meeting, daily, person)
├── inbox/                   # GTD capture inbox
├── references/              # Reference implementations
├── pset-software-catalog/   # Beacon product/system YAML definitions
├── adpdatalakedocs/         # AD Data Lake TechDocs (MkDocs)
├── adp-studio-docs/         # ADP Studio TechDocs (MkDocs)
├── support-agent-poc/       # AI support agent POC (FastAPI)
└── unified-resources-mfe-mockup/  # React/Vite/MUI mockup
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
5. **People notes are private.** Files in `people/` are gitignored and must never be committed, shared, or published to Confluence. Use `templates/person.md` for new person notes. When referencing people in GTD files, use `[[Person Name]]` wikilinks — the linked page lives in `people/` and stays local.

## Subproject Build Commands

There is no root-level build system. Each subproject has its own tooling:

| Subproject | Dev | Build | Lint | Test |
|---|---|---|---|---|
| `unified-resources-mfe-mockup/` | `npm run dev` | `tsc && vite build` | `npm run lint` | — |
| `projects/staledata/` | — | `tsc --noEmit && webpack --config webpack.prod.js` | `npm run lint` | `npm run test` (Jest) |
| `adpdatalakedocs/` | `mkdocs serve` | `mkdocs build` | — | — |
| `support-agent-poc/` | `uvicorn` | — | — | — |

## Key Technologies

- **Content**: Markdown (Obsidian-compatible)
- **Frontend**: React 18, TypeScript, MUI/Weave, Vite, Webpack
- **Backend**: Python (Flask, FastAPI), SQLAlchemy
- **Infrastructure**: Terraform, Docker, Kubernetes
- **Documentation**: MkDocs with Material theme
- **Catalog**: YAML (Beacon system model)

## Security Rules

### Node.js
- Never use user input directly in file paths, `child_process`, or `fs` calls
- No `eval()`, `new Function()`, or `vm` on dynamic input
- No hardcoded secrets — use environment variables
- Always use `===` and `!==`
- No dynamic `require()` calls

### Python
- Never use `eval()`, `exec()`, or `compile()` on user input
- No `pickle` with untrusted data
- No hardcoded secrets — use environment variables
- Use `hmac.compare_digest()` for secret comparison
- Never log sensitive data (tokens, keys, PII)

## Documentation

All documentation should be pushed to Confluence under:
https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/overview

## MCP Integrations

This workspace has MCP servers configured for:
- **Confluence** — documentation management
- **Contentful** — content operations
- **Slack** — messaging
- **Beacon** — developer portal catalog queries
- **Browser** — web automation and testing

## Conventions

- Use Obsidian-style `[[wikilinks]]` for internal cross-references, including `[[Person Name]]` for people
- Templates live in `templates/` — use them for new PRDs, projects, meetings, daily notes, and person notes
- Person notes go in `people/` (private, gitignored) — never in `projects/` or any shared location
- Stakeholder communication should follow MMM principles (be on time, make people feel heard, bias to action, shift out of fear/anger)
