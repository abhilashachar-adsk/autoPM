# autoPM

**AI-powered personal productivity system for Product Managers.**

autoPM is an Obsidian-style knowledge vault that turns your Cursor IDE into a full PM productivity environment. It combines two proven frameworks with AI agent rules so your Cursor assistant understands your workflow, maintains your task lists, and gives you stakeholder management advice — all from your editor.

## Frameworks

### GTD (Getting Things Done)
David Allen's productivity system. Your mind is for having ideas, not holding them. autoPM captures everything into trusted lists and helps you choose what to do next based on context, time, energy, and priority.

### MMM (Matt Mochary Method)
Stakeholder management techniques used by top Silicon Valley CEOs. Covers being on time and present, top goal focus, shifting out of fear/anger, difficult conversations, making people feel heard, and bias to action.

## What You Get

- **GTD Dashboard** (`Home.md`) — single entry point to all your lists
- **5 GTD Lists** — Goals, Projects, Next Actions, Waiting For, Agenda
- **Method Reference** — Full MMM playbook always available to your AI agent
- **Templates** — Daily notes, project briefs, PRDs, meeting notes
- **Cursor Rules** — AI agent automatically maintains your GTD lists and applies MMM principles
- **Inbox Capture** — Drop quick notes; clarify later

## Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/autoPM.git
cd autoPM
```

### 2. Open in Cursor

```bash
cursor .
```

### 3. Start using it

The `.cursor/rules/` are automatically loaded. Your Cursor AI agent will:

- **Maintain your GTD lists** — after every action, it updates Projects, Next Actions, Waiting For, Agenda, and Goals
- **Apply MMM principles** — stakeholder advice, difficult conversation frameworks, bias to action
- **Use your templates** — when you ask it to create a new project, PRD, or meeting note

### 4. (Optional) Open in Obsidian

autoPM is fully Obsidian-compatible. Open the folder as an Obsidian vault to get graph view, backlinks, and `[[wikilink]]` navigation.

## Vault Structure

```
autoPM/
├── Home.md                  # GTD Dashboard — start here
├── CLAUDE.md                # AI agent context file
├── GTD/
│   ├── goals.md             # Strategic goals and outcomes
│   ├── Projects.md          # Active projects (multi-step outcomes)
│   ├── Next_Actions.md      # Next physical actions by context
│   ├── Waiting_For.md       # Items pending from others
│   └── Agenda.md            # Topics for specific people/meetings
├── method/
│   ├── MMM.md               # Matt Mochary Method reference
│   └── Operations_Lifecycle.md  # Operations lifecycle framework
├── templates/
│   ├── daily-note.md        # Daily note template
│   ├── project.md           # Project template
│   ├── prd.md               # PRD template
│   └── meeting-note.md      # Meeting note template
├── .cursor/
│   └── rules/
│       ├── workflow.mdc     # GTD workflow rule (always active)
│       └── advisor.mdc      # MMM advisor rule (always active)
├── inbox/                   # GTD capture inbox
├── daily/                   # Daily notes
├── projects/                # Active project work
└── references/              # Reference material
```

## GTD in 60 Seconds

| Step | What | How |
|------|------|-----|
| **Capture** | Get it out of your head | Drop it in `inbox/` |
| **Clarify** | What is it? Is it actionable? | Process inbox items |
| **Organize** | Put it in the right list | Move to GTD/ files |
| **Reflect** | Weekly review | Use the checklist in `Home.md` |
| **Engage** | Do the right thing | Filter by context, time, energy, priority |

### Golden Rules

1. Everything captured — nothing floating in your head
2. Every project has at least one Next Action
3. Review regularly so the system stays trustworthy

## MMM in 60 Seconds

| Method | Core Idea |
|--------|-----------|
| **On Time & Present** | Be on time. If late, notify before the meeting starts. Be fully present — no phone checking. |
| **Top Goal** | Block 2 hours daily for your #1 priority. No emails, no Slack. |
| **Shift out of Fear/Anger** | Fear and anger give bad advice. Pause before acting. Do the opposite of what fear recommends. |
| **Difficult Conversations** | Warn → State clearly → Explain briefly → Ask for feelings → Make them feel heard |
| **Make People Feel Heard** | Repeat back what they said. Ask "Is that right?" then "Is there more?" |
| **Bias to Action** | If <2 min, do it now. If >2 min, schedule it. Start every action in the last 10 min of the meeting. |

## How the Cursor Rules Work

### `workflow.mdc` (GTD)
Always active. Tells the AI agent to:
- Maintain the 5 GTD files after every action
- Ensure every project has a Next Action
- Capture new information into the right lists

### `advisor.mdc` (MMM)
Always active. Tells the AI agent to:
- Include MMM principles when giving stakeholder advice
- Reference the full MMM playbook from `method/MMM.md`
- Apply frameworks like "Make People Feel Heard" and "Bias to Action"

## Customization

### Personalize `CLAUDE.md`
Edit `CLAUDE.md` to describe your role, team, and project context. This is the primary context file your AI agent reads.

### Add Your Goals
Replace the example content in `GTD/goals.md` with your actual strategic goals and quarterly outcomes.

### Add MCP Integrations
If you use tools like Confluence, Slack, Jira, or GitHub, add MCP server configurations to `.cursor/mcp.json` to give your AI agent access to those tools.

### Add Your Own Methods
Drop additional framework references into `method/` and reference them in your cursor rules.

## Weekly Review Checklist

Built into `Home.md`:

- [ ] Clear inbox (process every item)
- [ ] Review Next Actions — still current?
- [ ] Review Projects — does every active project have a next action?
- [ ] Review Waiting For — any follow-ups overdue?
- [ ] Review Agenda — any upcoming meetings to prep?
- [ ] Review Goals — are projects aligned with goals?
- [ ] Review calendar (next 2 weeks)
- [ ] Review Someday/Maybe list
- [ ] Capture any new items

## License

MIT

## Acknowledgments

- [Getting Things Done](https://gettingthingsdone.com/) by David Allen
- [The Great CEO Within](https://docs.google.com/document/d/1ZJZbv4J6FZ8Dnb0JuMhJxTnwl-dwqx5xl0s65DE3wO8/) by Matt Mochary
- [Amp It Up](https://www.amazon.com/Amp-Unlocking-Hypergrowth-Expectations-Intensity/dp/1119836115) by Frank Slootman
