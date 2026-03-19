# PopSQL → ADP Studio Migration Plan

**Status:** Active  
**Cut-off Date:** April 17, 2026  
**PopSQL Sunset Date:** September 1, 2026  
**Owner:** Abhilash Achar (Platform Infrastructure PM)  
**Last Updated:** 2026-03-10

---

## Executive Summary

PopSQL is being retired on September 1, 2026. The AD Platform Infrastructure team is building an automated migration to move all PopSQL content (queries, folders, dashboards, notebooks, variables, and permissions) into ADP Studio. **April 17, 2026** is the cut-off date for the final PopSQL snapshot — any changes made in PopSQL after this date will **not** be included in the automated migration.

DBeaver is not being formally deprecated (it's a free, local tool), but it is being de-supported as a recommended query interface. All documentation and support will redirect to ADP Studio going forward.

---

## Timeline

| Date | Milestone | Description |
|------|-----------|-------------|
| **Mar 10, 2026** | Announcement sent | Slack + email to all PopSQL users (360) |
| **Mar 10 – Apr 17** | Preparation window | Users review/clean up PopSQL content; platform team completes import script |
| **Apr 17, 2026** | **Cut-off: Final PopSQL snapshot** | Platform team takes final export from PopSQL. Changes after this date are NOT migrated. |
| **Apr 17 – May 15** | Auto-migration execution | Platform team runs import scripts, validates data, resolves mapping issues |
| **May 15 – Jun 1** | Validation period | Users verify migrated content in ADP Studio; report issues |
| **Jun 1 – Sep 1** | Transition period | PopSQL remains accessible read-only; ADP Studio is primary |
| **Sep 1, 2026** | PopSQL sunset | PopSQL access terminated |

---

## What Gets Auto-Migrated

The platform team will automatically migrate the following from the final PopSQL snapshot:

| Content Type | Count | Migration Approach |
|---|---|---|
| SQL Queries | 5,000+ | Direct SQL import to ADP Studio DataDocs/Files |
| Folder Structure | 1,257 paths / 869 folders | Mapped to ADP Studio file tree (public/private) |
| Dashboards | 346 | Widget-by-widget import to ADP Studio boards |
| Dashboard Widgets | 3,255 (2,260 query + 995 text) | Chart config mapping to ADP Studio visualization |
| Notebooks | 85 | Import to DataDoc format |
| Query Variables | 608 queries with variables | Mapped to Jinja2 variable syntax |
| User Permissions | 360 users | Mapped to ADP Studio user accounts via SSO |
| Connections | 103 named connections | Mapped to ADP Studio engine IDs |

---

## What Users Should Do Before April 17

### 1. Clean Up Your PopSQL Content
- **Delete** queries you no longer need
- **Organize** queries into folders (the folder structure will be preserved)
- **Name** untitled/draft queries — unnamed queries are harder to find after migration
- **Review** dashboard configurations — ensure charts display correctly

### 2. Test ADP Studio
- Log in at [https://data.autodesk.com/query-experience](https://data.autodesk.com/query-experience)
- Run a few queries to get familiar with the interface
- Try the AI Query Assistant (text-to-SQL, auto-fix, query explanation)
- Report any issues in [#ad-query-support](https://autodesk.enterprise.slack.com/archives/C094NSNAW07)

### 3. Note What Won't Transfer Automatically
- **Scheduled queries** — ADP Studio scheduling is planned for FY27 Q2; users with critical schedules should document them
- **PopSQL-specific integrations** — Any external integrations pointing to PopSQL will need reconfiguration
- **Desktop app preferences** — ADP Studio is web-only (no desktop app needed)

---

## What Won't Be Migrated

| Item | Reason | User Action Required |
|---|---|---|
| PopSQL scheduled queries | ADP Studio scheduling not yet available | Document schedule configs; set up Airflow DAGs for critical schedules |
| Custom PopSQL themes/formatting | ADP Studio has different visualization options | Recreate chart styling in ADP Studio |
| PopSQL-specific API integrations | Different API surface | Update integrations to use ADP Studio APIs |
| DBeaver saved connections | Local tool, no centralized data | Re-create connections in ADP Studio (SSO-based, simpler) |

---

## DBeaver Users

DBeaver is a local, open-source desktop tool — there is no managed data to migrate. However:

- **DBeaver is being de-supported** as a recommended query interface
- All documentation, onboarding guides, and Confluence pages will be updated to point to ADP Studio
- The Contentful "Setup Query Interface - DBeaver or PopSQL" link will be replaced with ADP Studio migration guidance
- Users currently using DBeaver for ad-hoc queries should switch to ADP Studio, which offers:
  - No local installation required
  - SSO authentication (no manual credentials)
  - AI Query Assistant
  - Query history, sharing, and collaboration
  - Integrated data catalog and schema browser

---

## ADP Studio Advantages Over PopSQL & DBeaver

| Capability | PopSQL | DBeaver | ADP Studio |
|---|---|---|---|
| AI Query Assistant (text-to-SQL, auto-fix, explain) | No | No | **Yes** |
| Jinja2 templating (loops, conditionals, functions) | Basic variables | No | **Advanced** |
| SSO authentication (no manual credentials) | Yes | No | **Yes** |
| Web-based (no install) | Web + Desktop | Desktop only | **Web only** |
| Integrated data catalog | No | Basic | **Yes** (semantic search, metadata) |
| Licensing constraint | 170 seats | Free | **Unlimited** |
| Enterprise security & audit | Limited | None | **Full** (encryption, RBAC, audit) |
| Plugin system | No | Plugins | **Comprehensive** |
| Multi-engine (Snowflake + Data Lake) | Yes | Yes | **Yes** |

---

## Feature Gaps Being Addressed

These gaps are being actively worked on to ensure parity before the migration:

| Gap | Priority | Status | Target |
|---|---|---|---|
| DDL Operations (CREATE TABLE, CTAS, ALTER TABLE) | Must Have | In Progress — next sprint | Before cut-off |
| Data Lineage for DDL/DML | Must Have | In Progress — Trupal Patel | Current sprint |
| Data Export (CSV) | Must Have | Blocked by lineage | After lineage |
| DML Operations (INSERT, UPDATE, DELETE) | Must Have | Blocked by lineage | After lineage |
| Connection-to-Engine Mapping | Must Have | Open | Before import |
| User Mapping (360 users) | Must Have | Open | Before import |
| Dashboard Widget Migration | Should Have | In Progress — Riya verifying | Before import |
| Notebooks (DataDoc) | Should Have | Open | Before import |
| PopSQL Import Script | Must Have | Backlog | Next sprint |

---

## Communication Plan

### Channels
1. **Slack** — Announcement in `#ad-query-support`, `#pset-ad-infra-support`, `#adp-community`
2. **Email** — Targeted email to all 360 PopSQL users
3. **Contentful** — Full landing page under "Query Interfaces" on data.autodesk.com
4. **Confluence** — Detailed migration page in CPDDPS space

### Cadence
| Date | Communication |
|---|---|
| Mar 10 | Initial announcement (Slack + email) |
| Mar 24 | Reminder #1 — 3 weeks to cut-off |
| Apr 7 | Reminder #2 — 10 days to cut-off |
| Apr 14 | Final reminder — 3 days to cut-off |
| Apr 17 | Cut-off confirmation |
| May 15 | Migration complete — validation instructions |

---

## Support

- **Slack:** [#ad-query-support](https://autodesk.enterprise.slack.com/archives/C094NSNAW07) — for ADP Studio feedback and migration questions
- **Slack:** [#query-support](https://autodesk.slack.com/archives/C099A91SXAN) — for general query support
- **Confluence:** [ADP Studio User Guide](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333930171)
- **Confluence:** [Feature & Feedback Tracker](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/745193148)

---

## Stakeholders

| Role | Name | Responsibility |
|---|---|---|
| PM (Platform Infrastructure) | Abhilash Achar | Migration plan, announcement, Contentful page, stakeholder comms |
| Engineering Lead (APAC) | Sankalp Vairat | Import script development, DDL enablement, connection mapping |
| Engineering (APAC) | Riya Sanjay Loya | Dashboard widget verification, JIRA tickets, folder support |
| Engineering (APAC) | Trupal Patel | Data lineage integration (ADPINFRA-1422) |
| Engineering (AMER) | Harivams Sai Gudalwar | Querybook MFE, ADP Studio application |
| Platform Users | 360 PopSQL users | Clean up content, test ADP Studio, report issues |

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Import script not ready by Apr 17 | Medium | High | Start development now; de-scope dashboard widgets if needed |
| Users don't see announcement | Medium | Medium | Multi-channel communication + 4 reminders |
| Critical feature gaps not closed | Medium | High | Track weekly; escalate blockers; provide workarounds |
| Users resist change | Low-Medium | Medium | Encouraging tone; highlight AI advantages; extensive support |
| DBeaver users don't switch | Low | Low | DBeaver has no managed data; update docs; organic migration |

---

## References

- [POPSQL Migration - Analysis](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333720785)
- [ADP Studio - Feature & Feedback Tracker](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/745193148)
- [ADP Studio - User Guide](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333930171)
- [Adhoc Query Experience in Data Portal](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333697001)
- [PopSQL - User Guide](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333827905)
- [Querying Corporate and Commercial Data Lakes](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333631901)
