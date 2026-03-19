# autoPM — Home

> Personal productivity system for AD Platform Infrastructure PM work.
> Built on **GTD** (Getting Things Done) + **MMM** (Matt Mochary Method).

---

## GTD Dashboard

| List | Description |
|------|-------------|
| [[GTD/goals]] | FY27 strategic goals and quarterly outcomes |
| [[GTD/Projects]] | Active projects requiring multiple steps |
| [[GTD/Next_Actions]] | Next physical actions by context |
| [[GTD/Waiting_For]] | Items pending from others |
| [[GTD/Agenda]] | Topics for specific people and meetings |

---

## FY27 Alignment Map

*Initiatives are our OKRs. Outcomes realize each OKR quarter by quarter. Full detail: [[GTD/goals]]*

### Regionalization (PSET)
| Quarter | Outcome | Key Project(s) | Confidence |
|---------|---------|----------------|------------|
| Q1 | DataOS Compute Onboarding | [[GTD/Projects#Regionalization with DataOS]] | 🟡 |
| Q1 | Regionalized Infra Services | [[GTD/Projects#Regionalization of Core Infrastructure Services]] | 🟡 |
| Q2 | EMEA Data Lake Deployment | [[GTD/Projects#Regionalization of Core Infrastructure Services]] | Planned |

### Self Service Fulfillment
| Quarter | Outcome | Key Project(s) | Confidence |
|---------|---------|----------------|------------|
| Q1 | Self-Service Portal | [[GTD/Projects#AD Infrastructure Platform Support Backlog (FY27)]] | 🟡 |
| Q1 | Project Resource Management | [[GTD/Projects#Unified Resource MFE - Regionalized Mockups]] | 🟡 |
| Backlog | OSS Airflow on DataOS | [[GTD/Projects#Regionalization with DataOS]] | In Progress |

### Faster Cheaper Better Platform
| Quarter | Outcome | Key Project(s) | Confidence |
|---------|---------|----------------|------------|
| Q1 | Resource Utilization & Observability | [[GTD/Projects#Data Lake Stale Dataset Discovery (FY27)]] | 🟡 |
| Q1 | Graviton Migration | Engineering-led | TBD |
| Q2 | Infrastructure Cleanup | [[GTD/Projects#Stale Dataset Restore MFE (Self-Service)]] | Planned |
| Q2 | Stale Data Cost Attribution | [[GTD/Projects#Data Lake Stale Dataset Discovery (FY27)]] | Planned |
| Q3 | Privacera to Lake Formation | Planned | Planned |
| Q3 | Self-Service Deprecation | [[GTD/Projects#Data Lake - Data Lifecycle Management PRD (FY27)]] | Planned |

### Next Gen Data Experiences
| Quarter | Outcome | Key Project(s) | Confidence |
|---------|---------|----------------|------------|
| Q1 | Legacy Tool Migration | [[GTD/Projects#PopSQL → ADP Studio Migration]] | 🟢 |
| Q1 | ADP Studio Workspaces | [[GTD/Projects#ADP Studio Usage Dashboard]], [[GTD/Projects#ADP Studio — DML & DDL Enablement (Sandbox-First Approach)]] | 🟡 |
| Q2 | Data Retention Policies | [[GTD/Projects#Unified Resources MFE - Data Retention UI]] | Planned |
| Q2 | Looker / Power BI Connectivity | [[GTD/Projects#BI for CDL - Self-Service BI Connectivity PRD]] | Planned |
| Q2 | AI-Powered Query Optimization | [[GTD/Projects#Unified Infrastructure MCP Server — PRD]] | Planned |

---

## Active Projects (Quick Links)

### Regionalization & Infrastructure
- [[projects/regionalization/PRD_Central_Data_Lake_Resource_Management|Central Data Lake — Regionalized Resource Management PRD]]
- [[projects/regionalization/Unified_Resource_MFE_Mockups|Unified Resource MFE Mockups]]
- [[projects/beacon-representation/beacon-system-model-plan|Beacon System Model Plan]]

### ADP Studio & Data Experiences
- [[projects/adpstudiousage/README|ADP Studio Usage Dashboard]]
- [[projects/infra-mcp/PRD_Unified_Infrastructure_MCP_Server|Unified Infrastructure MCP Server PRD]]

### Stale Data & Cost Optimization
- [[projects/staledata/README|Stale Dataset Restore MFE]]
- [[projects/stalescorpdatalake/DataLake/PRD_Data_Lifecycle_Management_FY27|Data Lifecycle Management PRD]]
- [[projects/stalescorpdatalake/DataLake/BI_for_CDL_Draft|BI for CDL PRD]]

### SQL/NoSQL & Other
- [[projects/sql-nosql-db/PRODUCT_ANALYSIS|AMP SQL/NoSQL DB Analysis]]

---

## Method & Reference

- [[method/MMM|Matt Mochary Method]] — Stakeholder management, difficult conversations, bias to action
- [[goals|FY27 Goals (Root)]] — High-level goal summary

---

## Documentation Sites

- [AD Data Lake TechDocs (Beacon)](https://beacon.autodesk.com/catalog/pset/product/ad-data-lake/docs/)
- [ADP Studio TechDocs (Beacon)](https://beacon.autodesk.com/catalog/pset/product/adp-studio/docs/)
- [Confluence Personal Space](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/overview)

---

## Templates

- [[templates/daily-note|Daily Note]]
- [[templates/project|New Project]]
- [[templates/meeting-note|Meeting Note]]
- [[templates/prd|PRD Template]]
- [[templates/person|Person Note]] — Private stakeholder/colleague notes

---

## Vault Structure

```
autoPM/
├── Home.md                  ← You are here
├── GTD/                     ← GTD lists (Goals, Projects, Next Actions, Waiting For, Agenda)
├── people/                  ← 🔒 Private person notes (gitignored — never shared)
├── projects/                ← Active project work (PRDs, MFEs, analysis)
├── method/                  ← Frameworks (MMM)
├── daily/                   ← 🔒 Daily notes (gitignored — personal working log)
├── templates/               ← Note templates (shared — includes person template)
├── inbox/                   ← Capture inbox (new items land here)
├── references/              ← Reference implementations
├── pset-software-catalog/   ← Beacon catalog YAMLs
├── adpdatalakedocs/         ← AD Data Lake TechDocs
└── adp-studio-docs/         ← ADP Studio TechDocs
```

---

## Weekly Review Checklist

> GTD Weekly Review — the habit that keeps the system trustworthy.

- [ ] Clear inbox (process every item)
- [ ] Review [[GTD/Next_Actions]] — still current?
- [ ] Review [[GTD/Projects]] — does every active project have a next action?
- [ ] Review [[GTD/Waiting_For]] — any follow-ups overdue?
- [ ] Review [[GTD/Agenda]] — any upcoming meetings to prep?
- [ ] Review [[GTD/goals]] — are projects aligned with FY27 goals?
- [ ] Review calendar (next 2 weeks)
- [ ] Review Someday/Maybe list
- [ ] Capture any new items
- [ ] Review [[people/]] — any stale interaction logs? Anyone you haven't touched base with?

### Quarterly SR Alignment (review monthly or at quarter boundaries)
- [ ] Does every committed outcome have at least one active project?
- [ ] Are all active projects delivering against a committed outcome?
- [ ] Are confidence levels current in [[GTD/goals#Q1 FY27 — Quarterly SR Health]]?
- [ ] Any outcomes to pull forward from backlog or defer?
- [ ] Any new stakeholder requests to triage via [PSET work intake](https://autodesk.atlassian.net/wiki/spaces/APMO/pages/467804697)?
- [ ] Review [[references/FY27_Planning_Process]] for upcoming planning milestones

---

*Last Updated: 2026-03-17*
