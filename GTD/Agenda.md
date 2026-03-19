# Agenda

*Topics to discuss with specific people or in specific meetings*

---

## 👤 Individual Conversations

---

## 📅 Meeting Agendas

---

## 🌐 Regionalization — Core Infrastructure Services (Regionalization)

### AD Platform Infrastructure Triad
- [ ] Walk through Central Data Lake Regionalized Resource Management PRD (covers both r13n projects)
- [ ] Review regionalization requirements (REG-01 through REG-06)
- [ ] Validate Q1 milestone feasibility (M2: APIs, M3: MFE, M4: EMEA)
- [ ] Discuss resource management self-service scope (RM-01 through RM-05)
- [ ] Review Unified Resource MFE mockups and implementation phases

### AnD Team (Spindle / Data Portal)
- [ ] **Request `fullWidth` page option for genericPage** — Data Portal shell constrains MFE content area width; need `fullWidth` boolean on `genericPage` content type + shell CSS change to remove `max-width` when set. Key use case: ADP Studio (`query-experience/editor`) needs full viewport width. Evidence: MFE and Querybook both use `width: 100%`; bottleneck is shell container CSS.
- [ ] Discuss adding `region` field to Spindle project metadata (REG-05)
- [ ] Align on project-level region assignment approach
- [ ] Confirm Data Portal integration points for Unified Resource MFE

### APAC Infra Team ([[Nitin Kakkar]])
- [ ] **Cloud OS meeting debrief** — What was the outcome? How are we adjusting the account request approach?
- [ ] **Bare-minimum Beacon PR** — Scope down PR to essentials for account provisioning based on Cloud OS outcome
- [ ] **Delivery timeline per capability** — Draft start/end dates for Storage, Access, Query, Compute
- [ ] **Capability-level reporting** — Confirm taxonomy: collapse KMS under Storage; agree on 4 top-level capabilities
- [ ] Review Unified Resource MFE mockup specifications
- [ ] Discuss Infrastructure API v2 region-aware changes
- [ ] Align on MFE implementation phases and ownership
- [ ] Review existing ADPPICSERV-553 epic scope against PRD

### Security & Compliance
- [ ] Review Zero Trust requirements (REG-01, REG-06)
- [ ] Discuss cross-region access prevention approach
- [ ] Align on compliance dashboard requirements
- [ ] Confirm GDPR/Schrems II compliance audit needs

### FinOps
- [ ] Discuss regional cost attribution API availability
- [ ] Align on cost dashboard requirements for Observability page
- [ ] Confirm chargeback model for multi-region infrastructure

---

## 🖥️ Regionalization — DataOS Compute (Regionalization)

### AMER Engineering Leads
- [ ] Validate DataOS cluster timeline for regional compute (ADPINFRA-1264)
- [ ] Discuss OSS Airflow on DataOS setup plan (ADPINFRA-1117) — replacing Astro + Temporal
- [ ] Define OSS Airflow Helm chart configuration (scheduler replicas, KubernetesExecutor, metadata DB)
- [ ] Plan Astro → OSS Airflow migration path for existing tenants
- [ ] Review regional compute topology from PRD architecture section
- [ ] Discuss DataOS cluster sizing and placement for EMEA (Q2)

### AD Platform Infrastructure Triad
- [ ] Review DataOS MVP progress (ADPINFRA-1264)
- [ ] Validate OSS Airflow on DataOS timeline (ADPINFRA-1117)
- [ ] Discuss compute onboarding workflow for new tenants on DataOS

---

## 🖥️ ADP Studio — PopSQL Transition (Next Gen. Data Experiences)

### ADP Studio Team ([[Riya Loya]])
- [ ] Review consolidated tracker — confirm JIRA ticket coverage for all 5 bugs and 11 feature gaps
- [ ] Prioritize data export (GAP-1) — flagged by 2 users as adoption blocker; needs target date
- [ ] Decide PopSQL import blockers: folder support (GAP-2), user mapping (GAP-10), connection mapping (GAP-9)
- [ ] Confirm DDL enablement timeline (GAP-5) — targeted for next sprint
- [ ] Review dashboard widget compatibility findings (GAP-11)
- [ ] Discuss DataDoc re-enablement for notebook import (GAP-4)
- [ ] **PopSQL migration cut-off April 17** — Confirm import script (GAP-11) is prioritized for immediate development
- [ ] **User mapping strategy** — 360 users need SSO mapping; who leads this and by when?
- [ ] **Connection mapping** — 103 PopSQL connections → ADP Studio engine IDs; clean up unused connections

### [[Sankalp Vairat]] (Engineering Lead)
- [ ] **DDL/DML Sandbox Decision** — Review [decision doc](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/751455021); validate sandbox namespace approach (Option B); confirm Glue DB per-project provisioning feasibility
- [ ] DDL enablement status and timeline
- [ ] DML policy decision — sandbox-first approach decouples from lineage
- [ ] Lineage architecture: Event Listener → MDM direct vs batch
- [ ] PII/GDPR scan requirement for DML operations
- [ ] **S3 Bucket Naming Convention** — Which option (A/B/C/D) are we recommending? What's the ETA?
- [ ] **S3 Naming Prioritization** — Confirm this is tied to onboarding experience; align with BI/BP feedback and FY27 goals
- [ ] **Consider project ID vs AWS account** — Consistency with cluster ID naming; avoid exposing AWS account info to users

### [[Trupal Patel]] (Lineage Implementation)
- [ ] Trino Event Listener modification progress (ADPINFRA-1422)
- [ ] MDM field requirements from [[Renjini]]
- [ ] Performance impact assessment of lineage capture on Presto

---

*Last Updated: 2026-03-12 (Person names converted to [[wikilinks]])*

---

**Navigation:** [[Home]] | [[GTD/goals|Goals]] | [[GTD/Projects|Projects]] | [[GTD/Next_Actions|Next Actions]] | [[GTD/Waiting_For|Waiting For]]
