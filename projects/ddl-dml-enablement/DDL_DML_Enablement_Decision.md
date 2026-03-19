# ADP Studio — DML & DDL Enablement Decision

**Author:** Abhilash Achar  
**Date:** 2026-03-10  
**Status:** Draft — Pending Triad Review  
**Related:**
- [ADP Studio - Feature & Feedback Tracker (PopSQL Transition)](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/745193148)
- [ADP Studio for Query, Data Analysis, and Workflow Development - PRD](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333819421)
- [Data Lineage Integration with MDM for DDL/DML Operations](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/742040310)
- JIRA: [ADPDII-1867](https://jira.autodesk.com/browse/ADPDII-1867) (DDL), ADPINFRA-1422 (Lineage)

---

## 1. Problem Statement

Data analysts and data engineers transitioning from PopSQL to ADP Studio rely on DDL and DML operations as part of their daily workflows — creating staging tables, materializing intermediate results, building views for dashboards, and inserting aggregated data for reporting. PopSQL provided unrestricted DDL/DML against Snowflake, and users expect equivalent capabilities in ADP Studio.

However, ADP Studio operates against Trino (Data Lake) and Snowflake through a shared, governed platform where:

- **Data lineage** is a compliance requirement before enabling DML (architects and leadership have flagged PII/GDPR concerns — GAP-3 on the Feature Tracker)
- **No sandbox boundary** currently exists — DDL/DML would execute against production Glue Catalog and Snowflake schemas
- **No audit trail** for write operations exists in the Trino path today (Trino Event Listener modification is in progress — ADPINFRA-1422)

The question is not *whether* to enable DDL/DML, but *how* to enable it safely — giving analysts the capabilities they need while maintaining data governance, lineage, and access controls.

---

## 2. User Needs

Based on the PRD requirements, PopSQL usage analysis, and user feedback:

| Persona | DDL Needs | DML Needs |
|---------|-----------|-----------|
| **Data Analyst** | CREATE VIEW, CTAS (materialize query results for dashboards), CREATE TABLE (staging) | INSERT INTO (populate staging tables), limited UPDATE for corrections |
| **Data Engineer** | CREATE TABLE, ALTER TABLE, DROP TABLE, CREATE VIEW | INSERT INTO (ETL staging), DELETE (cleanup), MERGE |
| **BI Developer** | CREATE VIEW (Looker/Power BI source views), CTAS | INSERT INTO (refresh materialized views) |

**Key insight from PopSQL export:** 608 queries use variables, many of which are iterative analysis patterns that create temporary artifacts. These users need a fast feedback loop — write a query, materialize it, validate it, share it — not a pipeline deployment cycle.

---

## 3. Options Evaluated

### Option A: Full DDL/DML with Lineage Gate

Enable DDL immediately (current sprint — ADPDII-1867). Gate DML behind lineage integration completion (ADPINFRA-1422).

| Pros | Cons |
|------|------|
| Simplest implementation — unblock DDL now | DML remains blocked indefinitely until lineage ships |
| Matches PopSQL parity for DDL | No sandbox boundary — DDL against production catalog |
| | No time-based cleanup — orphaned tables accumulate |
| | No promotion path to batch pipelines |

### Option B: Sandbox Namespace with Ephemeral Data (Recommended)

Create a sandbox-like environment where analysts can perform DDL and DML freely, but data is **ephemeral** (automatically cleaned up after a configurable retention period). Production use of aggregated logic is only accessible through compliant batch processing pipelines. ADP Studio provides a one-click promotion path from sandbox query to pipeline SQL.

| Pros | Cons |
|------|------|
| Unblocks analysts immediately — full DDL + DML in sandbox | Requires sandbox namespace provisioning (Glue DB per project or user) |
| Ephemeral data = no stale table accumulation | Retention enforcement requires a cleanup job |
| Existing access controls (Privacera/Lake Formation) apply to sandbox | Users must learn sandbox vs production distinction |
| Lineage can be added incrementally (sandbox first, production later) | Promotion to pipeline requires integration with Batch Processing |
| Clean separation: explore in sandbox, productionize through pipelines | |
| Aligns with FY27 Goal 7 (ADP Studio Workspaces — "Temp table creation") | |

### Option C: Warning Banner + Manual Approval

Enable DDL/DML on production schemas with a warning banner and manual approval workflow for write operations.

| Pros | Cons |
|------|------|
| Minimal implementation | Does not solve lineage compliance |
| Users get full access | Manual approval bottleneck defeats self-service |
| | No sandbox isolation — production risk |
| | No cleanup automation |

### Option D: Read-Only Studio + External Pipeline Only

Keep ADP Studio read-only. All DDL/DML must go through Airflow batch processing pipelines.

| Pros | Cons |
|------|------|
| Zero governance risk in Studio | Kills iterative analysis workflow |
| All writes have lineage (through pipeline) | Massive UX regression vs PopSQL |
| | Users will revert to DBeaver/PopSQL |
| | Contradicts PRD requirements and FY27 goals |

---

## 4. Recommendation: Option B — Sandbox Namespace with Ephemeral Data

### 4.1 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      ADP Studio (Querybook)                  │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌───────────────┐  │
│  │  SQL Editor   │    │  Sandbox     │    │  Promote to   │  │
│  │  (Read-Only   │    │  Workspace   │    │  Pipeline     │  │
│  │   on Prod)    │    │  (DDL+DML)   │    │  (One-Click)  │  │
│  └──────┬───────┘    └──────┬───────┘    └──────┬────────┘  │
│         │                    │                    │           │
└─────────┼────────────────────┼────────────────────┼───────────┘
          │                    │                    │
          ▼                    ▼                    ▼
   ┌──────────────┐   ┌──────────────┐    ┌───────────────┐
   │  Production   │   │   Sandbox    │    │  Batch        │
   │  Schemas      │   │   Namespace  │    │  Processing   │
   │  (SELECT only)│   │  (DDL+DML)   │    │  (Airflow)    │
   │              │   │  TTL: 7 days │    │               │
   └──────────────┘   └──────────────┘    └───────────────┘
          │                    │                    │
          ▼                    ▼                    ▼
   ┌──────────────────────────────────────────────────────┐
   │         Glue Data Catalog / Snowflake                 │
   │   prod schemas (read)  │  sandbox_* (read/write)     │
   └──────────────────────────────────────────────────────┘
```

### 4.2 Sandbox Namespace Design

| Property | Value |
|----------|-------|
| **Namespace pattern** | `sandbox_{project_id}` (Glue) / `SANDBOX_{PROJECT}` (Snowflake) |
| **Default TTL** | 7 days (configurable: 1–30 days) |
| **Max storage per sandbox** | 50 GB (soft limit, alerting at 80%) |
| **Access control** | Inherits project-level Privacera/Lake Formation policies — same users who can read production data can write sandbox data |
| **Cross-read** | Sandbox tables are readable by project members (enables collaboration) |
| **Production read** | Sandbox queries can SELECT from production schemas (read-only) |
| **Cleanup mechanism** | Scheduled Airflow DAG runs nightly, drops tables past TTL, logs deletions |
| **Lineage** | Sandbox DDL/DML captured via Trino Event Listener → MDM (Phase 1: audit log; Phase 2: full lineage graph) |

### 4.3 Allowed Operations by Zone

| Operation | Production Schemas | Sandbox Namespace | Batch Pipeline |
|-----------|-------------------|-------------------|----------------|
| SELECT | Yes | Yes | Yes |
| CREATE TABLE | No | Yes (TTL enforced) | Yes |
| CREATE TABLE AS SELECT | No | Yes (TTL enforced) | Yes |
| CREATE VIEW | No | Yes (TTL enforced) | Yes |
| ALTER TABLE | No | Yes (own tables only) | Yes |
| DROP TABLE | No | Yes (own tables only) | Yes |
| INSERT INTO | No | Yes (TTL enforced) | Yes |
| UPDATE | No | Yes (own tables only) | Yes |
| DELETE | No | Yes (own tables only) | Yes |
| MERGE | No | Yes (own tables only) | Yes |
| EXPORT (CSV) | Sandbox tables only | Yes | Yes |

### 4.4 Promotion to Batch Processing Pipeline

The critical differentiator of this approach is a clear path from **exploratory sandbox work** to **production-grade pipelines**:

1. **Develop in Sandbox:** Analyst writes and iterates on SQL in ADP Studio sandbox — creating staging tables, materializing intermediate results, validating outputs.

2. **Promote SQL:** When the logic is validated, the analyst clicks "Promote to Pipeline" in ADP Studio. This action:
   - Extracts the SQL logic (CREATE TABLE AS SELECT, INSERT INTO, etc.)
   - Opens a pre-filled Batch Processing pipeline template in Data Portal
   - Maps sandbox table references to production schema equivalents
   - Adds scheduling configuration (cron, dependency triggers)

3. **Pipeline Runs in Production:** The batch processing pipeline (Airflow DAG) executes the SQL against production schemas with:
   - Full lineage tracking (MDM integration)
   - Audit trail
   - Scheduling and alerting
   - Cost attribution
   - SLA monitoring

4. **Sandbox Expires:** The original sandbox tables are cleaned up per TTL. Production data lives only in governed pipelines.

This creates a natural workflow: **explore → validate → productionize → govern**.

### 4.5 Data Export Strategy

Data export (GAP-4 on the Feature Tracker) is unblocked by this approach:

- **Sandbox tables** can be exported to CSV/Parquet directly from ADP Studio (no lineage concern — it's the user's own sandbox data)
- **Production query results** can be exported to the user's sandbox namespace first (CTAS into sandbox), then exported from there
- **Large exports** (>100MB) should be routed through batch processing pipelines that write to S3 with proper access controls

This avoids the current blocker where export is gated behind lineage for production schemas.

---

## 5. Implementation Plan

### Phase 1: Sandbox DDL (Current Sprint + 1)

**Scope:** Enable DDL in sandbox namespaces via ADP Studio

| Task | Owner | Sprint | JIRA |
|------|-------|--------|------|
| Create sandbox Glue databases per project (IaC) | APAC Infra | Current + 1 | TBD |
| Configure ADP Studio to route DDL to sandbox namespace | Riya / Jennifer | Current + 1 | ADPDII-1867 |
| Add sandbox engine/connection in ADP Studio | Riya | Current + 1 | TBD |
| Privacera/LF policies for sandbox namespace | APAC Infra | Current + 1 | TBD |
| Trino Event Listener — capture DDL audit events | Trupal Patel | Current (ADPINFRA-1422) | ADPINFRA-1422 |

### Phase 2: Sandbox DML + TTL Enforcement (Sprint + 2)

**Scope:** Enable DML in sandbox; implement automatic cleanup

| Task | Owner | Sprint | JIRA |
|------|-------|--------|------|
| Enable INSERT, UPDATE, DELETE, MERGE in sandbox | Riya / Sankalp | +2 | TBD |
| Build TTL enforcement Airflow DAG (nightly cleanup) | AMER Infra | +2 | TBD |
| Sandbox storage monitoring + alerting | AMER Infra | +2 | TBD |
| Lineage events for DML via Trino Event Listener → MDM | Trupal Patel | +2 | ADPINFRA-1422 |

### Phase 3: Data Export + Promotion Path (Sprint + 3)

**Scope:** Enable CSV export from sandbox; build pipeline promotion UX

| Task | Owner | Sprint | JIRA |
|------|-------|--------|------|
| CSV/Parquet export from sandbox tables | Riya / Jennifer | +3 | GAP-4 |
| "Promote to Pipeline" button in ADP Studio | Sankalp / Riya | +3 | TBD |
| Batch Processing template pre-fill from Studio SQL | AMER Infra | +3 | TBD |
| User documentation — sandbox workflow guide | Abhilash | +3 | TBD |

### Phase 4: Production DDL/DML via Pipeline (Q2 FY27)

**Scope:** Full lineage-tracked DDL/DML through batch pipelines; evaluate selective production DDL

| Task | Owner | Sprint | JIRA |
|------|-------|--------|------|
| MDM lineage graph for DDL/DML events | Data Catalog Team | Q2 | TBD |
| Evaluate CREATE VIEW on production (low-risk DDL) | Sankalp / Abhilash | Q2 | TBD |
| Pipeline-executed DDL/DML with full lineage | Batch Processing | Q2 | TBD |

---

## 6. User Communication Plan

Following MMM "Difficult Conversation" principles — users expecting full PopSQL parity need to understand the sandbox approach without feeling blocked:

### Message to Users (target: mid-March announcement)

> **Subject: DDL & DML Coming to ADP Studio — Sandbox-First Approach**
>
> We're enabling DDL and DML operations in ADP Studio with a sandbox-first approach that gives you the freedom to create tables, views, and write data — while maintaining the governance and lineage our platform requires.
>
> **What's changing:**
> - You'll get a sandbox workspace per project where you can CREATE TABLE, INSERT, UPDATE, DELETE freely
> - Sandbox data is ephemeral (default 7-day retention) — perfect for staging, analysis, and validation
> - Production schemas remain read-only in ADP Studio
> - When your logic is ready for production, use "Promote to Pipeline" to turn it into a scheduled batch pipeline
>
> **Why sandbox-first:**
> - Unblocks you immediately — no waiting for full lineage integration
> - Prevents orphaned tables and storage bloat
> - Creates a clean path from exploration to production
> - Maintains compliance for production data
>
> **Timeline:**
> - DDL in sandbox: end of March
> - DML in sandbox: mid-April
> - Data export: end of April
> - Pipeline promotion: May
>
> We know this is different from PopSQL's unrestricted access. We believe this approach is better — it gives you a fast feedback loop for exploration while ensuring production data stays governed. We want to hear your thoughts: reply in #ad-query-support or join our feedback session [date TBD].

---

## 7. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Users resist sandbox approach, want production DDL | Medium | Medium | Clear communication (above); show that sandbox → pipeline path is faster than manual DDL |
| Sandbox storage grows uncontrolled | Low | Medium | TTL enforcement + 50GB soft limit + alerting at 80% |
| Trino Event Listener delays block lineage | Medium | High | Sandbox approach decouples DDL/DML enablement from lineage; lineage adds governance incrementally |
| Promotion to Pipeline is complex for analysts | Medium | Medium | Pre-filled templates; SQL extraction automation; training materials |
| Sandbox Glue databases create catalog sprawl | Low | Low | Naming convention (`sandbox_*`); excluded from production catalog search by default |

---

## 8. Decision Required

**Ask:** Approve Option B (Sandbox Namespace with Ephemeral Data) as the approach for DDL/DML enablement in ADP Studio.

**Decision makers:**
- Ritesh (Staff) — platform direction alignment
- Sankalp Vairat (Engineering Lead) — technical feasibility
- Abhilash Achar (PM) — product requirements

**Decision deadline:** 2026-03-17 (before Sprint planning for Phase 1)

---

## 9. Appendix

### A. PopSQL DDL/DML Usage Analysis

From PopSQL export data (5,000+ queries, 360 users):

- ~15% of queries contain DDL statements (primarily CREATE VIEW, CTAS)
- ~8% contain DML statements (primarily INSERT INTO for staging)
- Most DDL/DML usage is from Data Analysts creating staging/materialization tables for dashboard backing
- Heaviest DDL users are also the heaviest dashboard creators (correlation: dashboard creators need materializable queries)

### B. Feature Tracker Cross-Reference

| Feature Gap | How Sandbox Approach Addresses It |
|-------------|----------------------------------|
| GAP-1: Data Lineage | Decoupled — sandbox enables DDL/DML now; lineage added incrementally via Event Listener |
| GAP-2: DDL Operations | Fully addressed — DDL available in sandbox namespace |
| GAP-3: DML Operations | Fully addressed — DML available in sandbox namespace |
| GAP-4: Data Export | Unblocked — export from sandbox tables (user's own data) |

### C. Alignment with FY27 Goals

| FY27 Goal | Alignment |
|-----------|-----------|
| Goal 3: Legacy Tool Migration | Closes DDL/DML parity gap with PopSQL |
| Goal 7: ADP Studio Workspaces | "Temp table creation" is a stated success criterion |
| Goal 15: AI-Powered Query Optimization | AI can optimize sandbox queries before pipeline promotion |
