# Projects

*Active projects organized by FY27 Initiatives. Each project has at least one Next Action.*
*Initiatives are our OKRs — see [[GTD/goals]] for the full goal hierarchy.*

---

## 🌐 Regionalization (PSET)

> **OKR:** Deploy secure, compliant Data Lake capabilities that satisfy regional data residency requirements — enabling workloads in any region without manual configuration or compliance friction.
> **Q1 Outcomes:** 2 committed | **Q2 Outcomes:** 1 planned | **Active Projects:** 3
> **Full Goals:** [[GTD/goals#Regionalization (PSET)]]

### Regionalization with DataOS
**Status:** In Progress — DataOS MVP underway, OSS Airflow setup in progress  
**Started:** 2026-02-11  
**Delivers:** [[GTD/goals#DataOS Compute Onboarding & Zero Trust Compliance|DataOS Compute Onboarding (Q1)]], [[GTD/goals#Workflow Orchestration (OSS Airflow on DataOS)|OSS Airflow on DataOS (Backlog)]]  
**Goal:** Deliver regional compute capabilities via DataOS — platform-managed Kubernetes clusters for Spark processing and OSS Airflow orchestration, enabling workloads to run in any region without manual infrastructure management

**Related PRD:** [Central Data Lake - Regionalized Resource Management PRD](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/724544519)

**Related Epics:**
- ADPINFRA-1264: DataOS - MVP and Phase 1
- ADPINFRA-1117: Orchestration - OSS Airflow on DataOS

**Scope:**
- DataOS cluster provisioning per region (EKS-based Kubernetes)
- Compute onboarding to platform-managed Kubernetes (DataOS)
- OSS Apache Airflow deployment via Helm on DataOS clusters
- KubernetesExecutor configuration for auto-scaling workers
- Astro → OSS Airflow migration path for existing tenants
- Airflow infrastructure (scheduler, webserver, workers, metadata DB)
- Regional compute topology and cluster placement

**Next Actions:**
- [ ] Confirm DataOS cluster + OSS Airflow setup timeline with AMER engineering leads
- [ ] Define OSS Airflow Helm chart configuration (scheduler replicas, KubernetesExecutor, metadata DB)
- [ ] Plan Astro → OSS Airflow migration path for existing tenants
- [ ] Review regional compute topology from PRD architecture section
- [ ] Validate DataOS cluster placement for EMEA (Q2)

**Milestones:**
| Milestone | Target | Capabilities |
|-----------|--------|--------------|
| M1 | Q1 Month 1 | Regional Infrastructure (DataOS clusters, OSS Airflow setup) |
| M4 | Q2 Month 4 | EMEA DataOS cluster deployment |

**Key Files:**
- `/projects/regionalization/PRD_Central_Data_Lake_Resource_Management.md`

**References:**
- [Platform Infra Outcomes Tracker - FY27Q1](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/722949586)

---

### Regionalization of Core Infrastructure Services
**Status:** In Progress — PRD Published, Dependencies Being Resolved  
**Started:** 2026-02-11  
**Delivers:** [[GTD/goals#Regionalized Infrastructure Services|Regionalized Infrastructure Services (Q1)]], [[GTD/goals#EMEA Data Lake Deployment|EMEA Data Lake Deployment (Q2)]]  
**Goal:** Regionalize AD Data Lake core services — storage, access control, APIs, and networking — so they deploy automatically in any region with built-in compliance and zero-trust security

**Related PRD:** [Central Data Lake - Regionalized Resource Management PRD](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/724544519)

**Scope:**
- Regional S3 storage + Glue catalogs per region
- Infrastructure API v2 (region-aware endpoints)
- Spindle region field for project-level region assignment (AnD team)
- AWS regional account provisioning (eu-west-1)
- Access control regionalization (Privacera / Lake Formation per region)
- Zero Trust compliance (cross-region access prevention)
- CNS alerting per region
- Regional cost attribution
- Unified Resource MFE region support (RegionBadge, RegionFilter)

**Next Actions:**
- [ ] Review Regionalization PRD with Infra Triad (covers both r13n projects)
- [ ] Validate regional project assignment with AnD (Spindle region field)
- [ ] Align with AWS Regional Accounts for eu-west-1 provisioning
- [ ] Get Security sign-off on Zero Trust reqs (REG-01, REG-06)
- [ ] Confirm Infrastructure API v2 scope with APAC ([[Nitin Kakkar]])
- [ ] Confirm CNS alert API availability
- [ ] Confirm regional cost attribution API with FinOps

**Milestones:**
| Milestone | Target | Capabilities |
|-----------|--------|--------------|
| M2 | Q1 Month 2 | Region-Aware APIs (Infra API v2, Spindle region field) |
| M3 | Q1 Month 3 | Unified MFE v1 (Storage + region badges) |
| M4 | Q2 Month 4 | EMEA Deployment (Regional S3 + Glue) |
| M5 | Q2 Month 5 | Unified MFE v2 (Compute GA, Orchestration GA, Observability) |
| M6 | Q2 Month 6 | Compliance & Lifecycle (Dashboard, Audit, Automation) |

**Key Files:**
- `/projects/regionalization/PRD_Central_Data_Lake_Resource_Management.md`

**References:**
- [Regionalized Data Lake and Resource Management - PRD - FY27](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333693915)
- [AD Data Lake - PRD](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333859875/AD+Data+Lake+-+PRD)

---

### Central Data Lake - Regionalized Resource Management PRD
**Status:** Draft Complete - Published to Confluence  
**Started:** 2026-02-11  
**Delivers:** [[GTD/goals#DataOS Compute Onboarding & Zero Trust Compliance|DataOS Compute Onboarding (Q1)]], [[GTD/goals#Regionalized Infrastructure Services|Regionalized Infra Services (Q1)]], [[GTD/goals#Self-Service Portal for Ingestion & Processing|Self-Service Portal (Q1)]], [[GTD/goals#Project Resource Management|Project Resource Management (Q1)]], [[GTD/goals#Resource Utilization, Observability & Lifecycle|Resource Utilization & Observability (Q1)]]  
**Goal:** Define product requirements for regionalizing the AD Data Lake and delivering unified resource management through the Data Portal

**Confluence:** [Central Data Lake - Regionalized Resource Management PRD](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/724544519)

**Outcome:** Consolidated PRD covering regionalization + resource management + observability as a single product vision

> **Execution Split:** This PRD covers two distinct execution tracks — see **Regionalization of Core Infrastructure Services** (Outcome 2) and **Regionalization with DataOS** (Outcome 1) above.

**Confluence (CPDDPS):** [Regionalized Data Lake and Resource Management - PRD - FY27](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333693915)

**Completed Actions:**
- [x] Map Q1 FY27 outcomes to regionalization requirements (REG-01 through REG-06)
- [x] Define resource management requirements (RM-01 through RM-05)
- [x] Define Unified Resource MFE scope (MFE-01 through MFE-05)
- [x] Write user stories for regionalization, resource management, and observability
- [x] Define architecture overview with regional topology
- [x] Map dependencies and create RAID log
- [x] Define milestones (M1-M8) across Q1-Q3
- [x] Publish PRD to personal Confluence space (2026-02-11)
- [x] Consolidated Infrastructure Readiness Plan into PRD (2026-02-11) — merged Scope, Guiding Principles, Infrastructure Stories, Tier 1 NFRs, and RAID items from child page

**Next Actions:**
- [ ] Review PRD with AD Platform Infrastructure Triad
- [ ] Validate regional project assignment approach with AnD (Spindle) team
- [ ] Confirm DataOS cluster timeline with AMER engineering leads
- [ ] Align with AWS Regional Accounts team for eu-west-1 provisioning
- [x] ~~Publish PRD to Confluence~~
- [ ] Get stakeholder sign-off (Security, Compliance, FinOps)

**Key Files:**
- `/projects/regionalization/PRD_Central_Data_Lake_Resource_Management.md`
- `/projects/regionalization/Unified_Resource_MFE_Mockups.md`

**Milestones:**
| Milestone | Target | Capabilities |
|-----------|--------|--------------|
| M1 | Q1 Month 1 | Regional Infrastructure (DataOS clusters, OSS Airflow setup) |
| M2 | Q1 Month 2 | Region-Aware APIs (Infra API v2, Spindle region field) |
| M3 | Q1 Month 3 | Unified MFE v1 (Storage + region badges, Compute page MVP) |
| M3a | Q1 Month 3 | Lifecycle Integration (Retention tab, Extension modal) |
| M4 | Q2 Month 4 | EMEA Deployment (DataOS EMEA, Regional S3 + Glue) |
| M5 | Q2 Month 5 | Unified MFE v2 (Compute GA, Orchestration GA, Observability) |
| M6 | Q2 Month 6 | Compliance & Lifecycle (Dashboard, Audit, Automation) |

**References:**
- [AD Data Lake - PRD](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333859875/AD+Data+Lake+-+PRD)
- [Platform Infra Outcomes Tracker - FY27Q1](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/722949586)

---

## 🛠️ Self Service Fulfillment

> **OKR:** Enable platform users to self-serve provisioning, resource management, and workload orchestration without tickets or managing infrastructure directly.
> **Q1 Outcomes:** 2 committed | **Backlog:** 1
> **Full Goals:** [[GTD/goals#Self Service Fulfillment]]

### AD Infrastructure Platform Support Backlog (FY27)
**Status:** Backlog Created - Pending Prioritization  
**Started:** 2026-01-20  
**Delivers:** [[GTD/goals#Self-Service Portal for Ingestion & Processing|Self-Service Portal (Q1)]]  
**Goal:** Reduce support ticket volume by 40% through self-service automation and improved documentation

**Analysis:** Based on 6-month analysis of #pset-ad-infra-support Slack conversations (July 2025 - January 2026)

**Outcome:** Product roadmap addressing major support drivers:
1. Access & Permissions Automation (~35% of tickets)
2. Resource Provisioning Automation (~20% of tickets)
3. Documentation & Discovery Improvements (~15% of tickets)
4. Platform Stability & Observability (~15% of tickets)

**Key Insight from Analysis:**
> "The dev team is acting as a product surface. They are: The access visibility layer, The policy interpreter, The diagnostics engine, The workflow router."

**Next Actions:**
- [ ] Validate effort estimates with engineering leads
- [ ] Present backlog to AD Platform Infrastructure Triad
- [ ] Identify cross-team dependencies (BP, AnD, Data Access)
- [ ] Commit P0 items for Q1 FY27 sprint planning
- [ ] Announce roadmap to #adp-community

**P0 (Critical) Items:**
1. Corporate Schema Access Automation
2. GDC Access Automation  
3. Batch Processing Onboarding Automation
4. Unified Support Channel Communication

**Key Files:**
- `/projects/pset-ad-infra-support-backlog.md`

**Success Metrics:**
- 40% reduction in manual support tickets within 6 months
- <1 hour time to data access (currently 24+ hours)
- 80% self-service success rate

---

### Unified Resource MFE - Regionalized Mockups
**Status:** Migrated to Weave MUI (MUI/Emotion) — Ready for Review  
**Started:** 2026-02-11  
**Delivers:** [[GTD/goals#Project Resource Management|Project Resource Management (Q1)]], [[GTD/goals#Resource Utilization, Observability & Lifecycle|Resource Utilization & Observability (Q1)]]  
**Goal:** Define component-level wireframes and specifications for the regionalized Unified Resource MFE

**Confluence:** [Unified Resource MFE - Mockup Specifications](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/724484024)
**Repository:** [git.autodesk.com/ADP/unified-resources-mfe-mockup](https://git.autodesk.com/ADP/unified-resources-mfe-mockup)

**Related Epics:**
- ADPPICSERV-553: Unified MFE - Configure & Maintain
- ADPPICSERV-386: Standard Data Retention Action Plan
- ADPPICSERV-542: Improve Provisioning Latency

**Outcome:** Complete interactive mockup (React/TypeScript) for 5 screens (Overview, Storage, Compute, Orchestration, Observability) aligned with Regionalized Data Lake PRD (FY27), using Weave-patterned MUI components

**Completed Actions:**
- [x] Define navigation structure and routing
- [x] Create shared component specifications (RegionBadge, LifecycleStatusBadge, RetentionStatusBadge, ClassificationBadge)
- [x] Design Overview Dashboard wireframe with resource summary, cost, and retention status widgets
- [x] Design updated Storage Page with region badges, retention tab, and classification
- [x] Design new Compute Page with cluster management and utilization metrics
- [x] Design updated Orchestration Page ~~(Temporal workers)~~ → revised to OSS Airflow (v0.2)
- [x] Design new Observability Page with cost dashboard, utilization, alerts, and lifecycle
- [x] Design modals: Create Cluster, Retention Extension, Create Domain (updated)
- [x] Define TypeScript types for all new data models
- [x] Define API integration map and new hooks
- [x] Define 6-phase implementation priority
- [x] **PRD Alignment Update (2026-02-12):** Updated interactive mockup per Regionalized Data Lake PRD
- [x] **Weave MUI Migration (2026-02-12):** Migrated entire mockup from Tailwind CSS / lucide-react to MUI (Material UI) + Emotion:
  - [x] Replaced Tailwind CSS with MUI `sx` prop and theme-based styling
  - [x] Replaced lucide-react icons with @mui/icons-material
  - [x] Created Weave-patterned theme (light-gray, Autodesk colors, medium density)
  - [x] Converted all 7 shared components (RegionBadge, RetentionStatusBadge, ClassificationBadge, etc.)
  - [x] Converted all 6 page components (Overview, Storage, Compute, Orchestration, Observability, JobDetail)
  - [x] Converted all modals from custom HTML to MUI Dialog components
  - [x] Converted all forms to MUI FormControl/TextField/Select patterns
  - [x] App shell uses MUI AppBar, Tabs, Container, Menu
  - [x] Build compiles cleanly (tsc + vite build)
- [x] **Terminology rework (2026-02-12):** Replaced "compliance" terminology with "retention status" throughout:
  - [x] `ComplianceStatus` → `RetentionStatus`, `complianceStatus` → `retentionStatus`
  - [x] `ComplianceBadge` → `RetentionStatusBadge`, `'compliant'` → `'on-track'`
  - [x] "Compliance Status" headings → "Retention Status", "X Compliant" → "X On Track"
  - [x] "Regional Compliance Dashboard" → "Regional Retention Dashboard"
  - [x] GDPR/Schrems II language softened to "data residency" (not "compliance")
- [x] **Autodesk Assistant Integration Exploration (2026-02-12):**
  - [x] Researched AA MCP Strategy, Plugin MFE Integration, V2 Domain Agent resources
  - [x] Identified 3 integration paths (Cloud MCP Server, MFE Workflow, Data Portal Plugin alignment)
  - [x] Designed 7 MCP tools for resource management
  - [x] Documented on Confluence: [AA Integration Exploration](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/730188375)
- [x] **Observability Page PRD Alignment (2026-02-12):**
  - [x] Restructured Observability page into 5 tabbed pillars per [AD Observability PRD](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333772517):
    - Cost Management (resource type, region, trend, lifecycle/optimization)
    - Compute Observability (cluster KPIs, per-cluster detail, Spark jobs)
    - Pipeline Observability (DAG health, success rates, recent pipeline runs)
    - Data Observability (quality scores by domain: freshness/completeness/uniqueness/validity, anomalies, trends)
    - Alerts & Incidents (severity summary, filtered alert feed)
  - [x] Added mock data: `DataQualityScore` (4 domains), `PipelineRun` (6 runs)
  - [x] Updated Assistant engine with `get_data_quality` and `get_pipeline_runs` MCP tools

**Next Actions:**
- [ ] Commit and push Weave MUI changes to repo
- [ ] Review mockups with APAC Infra team ([[Nitin Kakkar]])
- [ ] Review mockups with AD Platform Infrastructure Triad
- [ ] Create JIRA stories from mockup specifications
- [ ] Begin Phase 1 implementation (Region Foundation)
- [ ] Prototype 2-3 read-only MCP tools for AA integration (Path A)
- [ ] Create routing dataset (50+ example prompts) for AA Orchestrator
- [ ] Reach out to [[Nick Ragusa]] re: Data Portal Plugin alignment (Path C)

**Key Files:**
- `/projects/regionalization/Unified_Resource_MFE_Mockups.md`

**Implementation Phases:**
| Phase | Components | Target |
|-------|-----------|--------|
| Phase 1 | Region Foundation (RegionBadge, RegionFilter, updated DomainListItem) | Week 1-2 |
| Phase 2 | Compute Page (ComputePage, CreateClusterModal, ClusterDetails) | Week 3-4 |
| Phase 3 | Overview Dashboard | Week 5-6 |
| Phase 4 | Retention Integration | Week 7-8 |
| Phase 5 | Orchestration Page | Week 9-10 |
| Phase 6 | Observability Page | Week 11-12 |

---

## ⚡ Faster Cheaper Better Platform

> **OKR:** Modernize infrastructure, reduce costs through compute optimization, improve observability, and strengthen security/compliance posture.
> **Q1 Outcomes:** 2 committed | **Q2 Outcomes:** 2 planned | **Q3 Outcomes:** 2 planned | **Backlog:** 2
> **Full Goals:** [[GTD/goals#Faster Cheaper Better Platform]]

### Data Lake Stale Dataset Discovery (FY27)
**Status:** In Progress (94.9% tables pending metrics)  
**Started:** 2026-01-16  
**Delivers:** [[GTD/goals#Infrastructure Cleanup|Infrastructure Cleanup (Q2)]], [[GTD/goals#Stale Data Cost Attribution|Stale Data Cost Attribution (Q2)]]  
**Goal:** Identify and deprecate stale datasets in Hive/Data Lake

**Outcome:** 7,037 stale datasets identified across 39 teams, ~4.9 TB measured

**Next Actions:**
- [ ] Complete batch queries for remaining tables (currently 5.1% measured)
- [ ] Generate final summary report
- [ ] Begin stakeholder outreach

**Key Files:**
- `/projects/stalescorpdatalake/FY27/stale_data_inventory_by_owner.md`
- `/projects/stalescorpdatalake/FY27/stale_data_inventory_detailed.csv`

---

### Data Lake - Data Lifecycle Management PRD (FY27)
**Status:** Draft Complete - Published to Confluence  
**Started:** 2026-01-20  
**Delivers:** [[GTD/goals#Data Retention Policies|Data Retention Policies (Q2)]], [[GTD/goals#Infrastructure Cleanup|Infrastructure Cleanup (Q2)]], [[GTD/goals#Self-Service Deprecation Workflow|Self-Service Deprecation (Q3)]]  
**Goal:** Define enterprise-grade data lifecycle management capability for AD Data Lake

**Confluence:** [AD Data Lake - Data Lifecycle Management PRD (FY27)](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/694146391/AD+Data+Lake+-+Data+Lifecycle+Management+PRD+FY27)

**Outcome:** PRD approved and implementation planned for FY27

**Next Actions:**
- [ ] Review PRD with AD Platform Infrastructure Triad
- [ ] Align with Lake Formation migration timeline
- [ ] Confirm dependencies with AnD (Data Portal) team
- [ ] Get stakeholder sign-off (Legal/Privacy, Finance)
- [x] ~~Create Confluence page as child of AD Data Lake PRD~~

**Key Files:**
- `/projects/stalescorpdatalake/DataLake/PRD_Data_Lifecycle_Management_FY27.md`

**Milestones:**
| Milestone | Target | Capabilities |
|-----------|--------|--------------|
| M1 | FY27 Q1 | Automated detection + Owner notification |
| M2 | FY27 Q2 | Cost attribution for stale data |
| M3 | FY27 Q3 | Self-service deprecation + Lifecycle dashboard |
| M4 | FY27 Q4 | Retention enforcement + Compliance |

---

### Snowflake Stale Dataset Discovery & Deprecation
**Status:** ✅ Signed Off — [[Abhilash]] signed off from this project (2026-03-12)  
**Started:** 2026-01-19  
**Closed:** 2026-03-12  
**Delivered:** Infrastructure cost analysis — $800K/year potential savings identified  
**Goal:** Identify and deprecate datasets not accessed in 12+ months to reduce storage AND compute costs

**Outcome:** Discovery phase complete. 242,578 stale objects identified ($800K/year potential savings). Project signed off — no further action from [[Abhilash]].

**Confluence:** [AD Snowflake - Stale Dataset Deprecation - Jan 2026](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/694142850)

**Key Findings (as of 2026-01-21):**
- **343,413 total objects** analyzed in Snowflake
- **242,578 stale objects** (70.6% of total) - no reads in 365+ days or never read
- **2,776 TB stale storage** (50.7% of total) - $766,183/year storage cost
- **$34,061/year compute** wasted on writing to never-read tables (Priority 2)
- **$800,244/year total potential savings** from deprecating stale data

**Completed Actions:**
- [x] Run stale data analysis script (`stale_data_analysis_consolidated.sql`)
- [x] Fix compute cost attribution methodology (2026-01-21)
- [x] Document ACCESS_HISTORY 365-day retention limitation
- [x] Update Confluence page with corrected numbers

**Key Files:**
- `/projects/staledata/Snowflake/stale_data_analysis_consolidated.sql` ← **Updated 2026-01-21**
- `/projects/staledata/Snowflake/METHODOLOGY.md`
- `/projects/staledata/Snowflake/stakeholder_template.md`

---

### Stale Dataset Restore MFE (Self-Service)
**Status:** In Progress - Pivoted to ADP Studio (Trino DDL) approach, zero backend  
**Started:** 2026-02-11  
**Delivers:** [[GTD/goals#Infrastructure Cleanup|Infrastructure Cleanup (Q2)]]  
**Goal:** Provide a self-service UI for users to restore soft-deleted (`_adp_stale`) datasets via Trino DDL executed in ADP Studio

**Related:**
- [AD Data Lake - Stale Dataset Deprecation - Jan 2026](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/689380512)
- [Soft Delete Process Discussion](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/710774655)
- [Stale Dataset Restore — Design & Specification](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/740381756)

**Outcome:** Users paste dataset names into the MFE, which validates input and generates `ALTER TABLE ... RENAME TO` SQL. Users copy the SQL and execute it in ADP Studio (Querybook) using the Data-Lake engine. No backend required.

**Data Portal URL (DEV):** `https://data-dev.autodesk.com/restore-stale-dataset`

**Architecture:**
```
MFE (validate + generate SQL) → User copies SQL → ADP Studio (Querybook) → Trino → Glue Data Catalog
```

**Completed Actions:**
- [x] Review Confluence context for stale dataset deprecation and soft delete process
- [x] Analyze reference MFE (adp-infra-project-resources-mfe) patterns
- [x] Scaffold MFE project with full CFP integration (React 18, TypeScript, Weave MUI)
- [x] Create RestoreForm with dataset list input, validation, and preview
- [x] Create UserContext for authenticated user context
- [x] Create dataset validation utilities (format, batch size, dedup)
- [x] Push MFE to git.autodesk.com and create Jenkins pipeline
- [x] Deploy v1.0.1 to dev CFP CDN
- [x] Register MFE in Contentful (both `dev-2024-09-24` and `master` environments) (2026-02-25)
- [x] Fix Spindle API URLs, token endpoint, current-user route, environment detection (2026-02-25)
- [x] Fix router basename mismatch: `/adp-stale-dataset-restore` → `/restore-stale-dataset` (2026-02-26)
- [x] Fix Contentful: `hidePageTitle: true`, parent page consistency (2026-02-26)
- [x] **Pivot to ADP Studio approach (2026-02-27):**
  - [x] Investigated Trino/Presto REST API for direct browser access — blocked by IP whitelisting, CORS, and internal-only networking
  - [x] Evaluated 3 backend alternatives: Querybook API, Spindle BFF endpoint, thin Lambda proxy
  - [x] Decided on zero-backend Option C: MFE generates SQL, user executes via ADP Studio
  - [x] Created `src/utils/sqlGenerator.ts` — generates `ALTER TABLE hive.<db>.<table>_adp_stale RENAME TO hive.<db>.<table>` statements
  - [x] Updated `envVariables.ts` with ADP Studio URLs and engine labels per environment
  - [x] Rewrote `RestoreForm.tsx` — replaced API submission with SQL generation + Copy SQL + Open ADP Studio flow
  - [x] Updated `RestorePage.tsx` — new info text explaining Trino-based workflow
  - [x] Removed unused backend files: `useRestoreDatasets.ts`, `staleClient.ts`, `staleService.ts`, `RestoreResultModal.tsx`
  - [x] Updated Confluence design doc: renamed to "Stale Dataset Restore — Design & Specification", added Option C as chosen approach, archived Option A (Lambda)

**Next Actions:**
- [ ] Commit and push ADP Studio pivot changes to `main` branch
- [ ] Trigger Jenkins rebuild and verify new build deploys to dev CFP
- [ ] Verify MFE renders correctly on `https://data-dev.autodesk.com/restore-stale-dataset`
- [ ] Test ALTER TABLE RENAME in ADP Studio Dev with a known `_adp_stale` table
- [ ] Add Jest unit tests for SQL generator and validation utilities
- [ ] Review with AD Platform Infrastructure Triad
- [ ] Announce self-service restore option in #tmp-ad-datalake-stale-dataset

**Key Risks:**
| Risk | Mitigation |
|------|-----------|
| User lacks DDL permissions | Querybook returns clear permission error; user requests access via Privacera |
| Table name collision (original exists) | Trino returns "Table already exists" error |
| Prd Trino requires Spindle-audience token | Querybook handles Prd auth transparently |

**Bug Root Cause #1 (2026-02-25):**
MFE deployed to CFP but rendered blank. Misconfigurations: wrong Spindle URLs, wrong token endpoint, wrong user API route, build-time env detection instead of CFP runtime.

**Bug Root Cause #2 (2026-02-26):**
MFE loaded without errors but content was blank. Root cause: router basename mismatch (`/adp-stale-dataset-restore` vs `/restore-stale-dataset`). Also fixed Contentful hidePageTitle and parent page.

**Key Files:**
- `/projects/staledata/src/components/restore/RestoreForm.tsx` - SQL generator form with Copy/Open Studio
- `/projects/staledata/src/components/restore/RestorePage.tsx` - Page with context info
- `/projects/staledata/src/utils/sqlGenerator.ts` - Trino ALTER TABLE RENAME generation
- `/projects/staledata/src/utils/datasetValidation.ts` - Input validation logic
- `/projects/staledata/src/utils/envVariables.ts` - ADP Studio URLs per environment

**Tech Stack:**
| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| UI | Weave MUI |
| State | Redux (CFP) + React Query v4 |
| Forms | react-hook-form |
| Query Execution | ADP Studio (Querybook) → Trino |
| Build | Webpack 5 |
| Host | CFP |

---

### Beacon System Model — AD Platform Infrastructure Representation
**Status:** Phase 1 Complete — Executing Phase 2-5  
**Started:** 2026-02-27  
**Delivers:** Platform modernization enabler — cross-cutting across all initiatives  
**Goal:** Organize AD Data Lake, ADP Studio, and Resource Management APIs under an `ad-platform-infrastructure` domain in Beacon's system model hierarchy (Domain → Product → System → Component → API/Resource).

**Outcome:** All AD Platform products discoverable in Beacon with proper hierarchy, clean system boundaries, and registered APIs

**Key Findings (from Production Beacon audit — 2026-02-27):**
- ~~**0 Product entities** registered for AD Data Lake or ADP Studio~~ → ✅ 2 Products created (PR #909)
- ~~**3 broken domain references** — `ad-infra` (3 systems) don't exist~~ → ✅ All 3 fixed
- ~~**1 split-brain duplicate** — `ADPCP`/`adp-control-plane`~~ → ✅ ADPCP retired, 16 components merged
- **8 Resource Management APIs exist** but are all lumped on `adp-control-plane` instead of distributed to logical systems
- ~~**ADP Studio has zero presence**~~ → ✅ Product, System, 3 Components, 2 APIs created
- **`adp-self-service-system`** and **`CATALOG`/`metadata-manager`** excluded from scope (owned by AnD / Data Catalog teams)
- **`adppa-*` pipeline automation** excluded from scope (owned by SPS Singapore)
- **0 Resource entities** for ADP infra systems

**Phases:**
| Phase | Deliverable | Timeline | Status |
|-------|-------------|----------|--------|
| Phase 1 | Fix broken refs; resolve ADPCP/adp-control-plane split-brain; create `ad-platform-infrastructure` Domain | Week 1-2 | ✅ Complete (2026-03-05) |
| Phase 2 | Register 2 Products (AD Data Lake, ADP Studio) | Week 2-3 | ✅ Complete (PR #909) |
| Phase 3 | Create new Systems | Week 3-4 | Partial — `adp-studio` system created |
| Phase 4 | Redistribute 8 existing APIs to correct systems; register 5 new APIs | Week 4-5 | Pending |
| Phase 5 | Register Components and Resources | Week 5-6 | Partial — 3 ADP Studio components created |

**Completed Actions:**
- [x] Audit existing Beacon catalog for all ADP-related entities (Systems, APIs, Domains) — staging
- [x] Identify 10 gaps in current representation
- [x] Design target hierarchy (AD Platform Infrastructure domain → Product → System → Component → API → Resource)
- [x] Create YAML templates for Domain, Product, System, and API entities
- [x] Define stakeholder communication plan (IDP admin, SPS Singapore, Studio team, Data Catalog team)
- [x] Document plan at `/projects/beacon-representation/beacon-system-model-plan.md`
- [x] Publish plan to Confluence: [Beacon Representation Plan](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/742000710)
- [x] **Production gap assessment** — confirmed findings against production Beacon (not just staging); identified additional gaps: `metadata-manager` broken domain, `CATALOG`/`metadata-manager` duplicate, all 8 APIs already exist in prod
- [x] **Service inventory from adpcs-infra** (2026-03-05) — cataloged 27 services (12 components + 15 resources, 24 active + 3 archived) from `adpcs-infra` repo with Beacon system model mapping, business service IDs, monikers, and descriptions. Published to Confluence: [Service Inventory](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/747679370)
- [x] **Identified adp-studio businessServiceId gap** (2026-03-05) — `adp-studio` system has no registered `businessServiceId`; uses Querybook's `4AFA5AF5` / `CSQRYBOK` for OTEL. Needs own business service registration.
- [x] **Service inventory from adp-temporal** (2026-03-05) — cataloged 7 services (4 components + 3 resources) from `adp-temporal` repo: Temporal Server (ECS Fargate, Go + mTLS/JWT plugins), Temporal UI (OIDC), Temporal Worker (SB-only), Temporal Test, Aurora PostgreSQL 16.3 DB, PKI/Security Groups (AWS Private CA hierarchy), Bastion. CloudOS project `adtmprl`, monikers `ADTMPRL-{E}-{R}`. No `adsk.service.id` or Beacon catalog config — gap identified. Updated Confluence: [Service Inventory (CPDDPS)](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/747745980)
- [x] **Created `ad-platform-infrastructure` Domain YAML** (2026-03-05) — `domains/ad-platform-infrastructure.yaml` with `realizationOf: capability:capabilities-map/insights-personalization`, owner `ad-platform-infra`
- [x] **Fixed 3 broken domain refs** (2026-03-05) — `adp-central-data-lake`, `adp-core-services`, `adp-control-plane` all updated from `domain:default/ad-infra` → `domain:pset/ad-platform-infrastructure`
- [x] **Merged ADPCP into adp-control-plane** (2026-03-05) — moved 16 components from `system:pset/ADPCP` → `system:pset/adp-control-plane`; retired `ADPCP.yaml`; added explicit `hasPart` listing all 7 APIs + 16 components to `adp-control-plane.yaml`
- [x] **Created Products** (PR #909) — `ad-data-lake` and `adp-studio` Product YAMLs with TechDocs refs, links, and `hasPart` relationships
- [x] **Created ADP Studio entities** (PR #909) — System `adp-studio`, APIs `adp-studio-query-api` + `adp-studio-catalog-api`, Components `adp-studio-web` + `adp-studio-worker` + `adp-studio-ai-assistant`
- [x] ~~Create `ADP/adp-studio-docs` Git repo and push split docs~~ (pushed to git.autodesk.com:ADP/adp-studio-docs)
- [x] ~~Fix catalog-info.yaml for Beacon staging registration~~ (2026-03-04) — changed `kind: Product` (unrecognized by Beacon processors) to `kind: Component` with `type: documentation` in both `adpdatalakedocs` and `adp-studio-docs` repos
- [x] **Resolved PR #909 merge conflicts with staging** (2026-03-10) — merged latest staging into `add-ad-platform-products`, resolved 5 conflicts: `pr-review.md` (section lettering), `atf-sdk.yaml` (kept both observability dashboards), `adp-central-data-lake`/`adp-control-plane`/`adp-core-services` (retained `partOf: domain:pset/ad-platform-infrastructure` over staging's `capabilities-map/ad-infra`). Pushed to fork.
- [x] **Aligned hierarchy with Autodesk System Model Standard** (2026-03-10) — Products now list only systems in `hasPart` (not APIs/components directly). Systems use `partOf: domain:pset/ad-platform-infrastructure` for organizational hierarchy. Products claim systems via `hasPart` for product grouping. Added explicit `hasPart` to `adp-studio` system listing 3 components + 2 APIs.

**Next Actions:**
- [ ] Review updated plan with AD Platform Infrastructure Triad
- [x] ~~Push updated files to PR #909 branch~~ (commit `82b5c8f`, 2026-03-05)
- [ ] Redistribute 8 APIs from `adp-control-plane` to logical systems (Phase 4)
- [ ] Register `adp-studio` as its own business service in ServiceNow (currently piggybacking on CSQRYBOK / 4AFA5AF5)
- [ ] Register both docs repos in Beacon staging via "Register Catalog Entity" UI
- [ ] Verify TechDocs builds for both entities on Beacon staging
- [ ] Update Confluence page with Phase 1 completion + production assessment + TechDocs consolidation
- [ ] Start registering service inventory components (28+ from adpcs-infra and adp-temporal)

**Key Files:**
- `/projects/beacon-representation/beacon-system-model-plan.md`
- `/adpdatalakedocs/` — AD Data Lake TechDocs (updated)
- `/adp-studio-docs/` — ADP Studio TechDocs (new)

**References:**
- [Beacon Staging Catalog](https://beacon-stg.autodesk.com/catalog)
- [pset-software-catalog repo](https://git.autodesk.com/openatadsk/pset-software-catalog)

---

### Beacon TechDocs Consolidation (Two-Repo Split)
**Status:** In Progress — Both repos pushed, pending Beacon staging registration  
**Started:** 2026-02-12  
**Delivers:** Platform modernization enabler — cross-cutting across all initiatives  
**Goal:** Split monolithic `adpdatalakedocs` into two Beacon-aligned TechDocs sites — AD Data Lake (storage/compute/orchestration/APIs) and ADP Studio (query/analytics/dashboards)

**AD Data Lake TechDocs:** [product:pset/ad-data-lake](https://beacon.autodesk.com/catalog/pset/product/ad-data-lake/docs/)  
**ADP Studio TechDocs:** [product:pset/adp-studio](https://beacon.autodesk.com/catalog/pset/product/adp-studio/docs/)  
**Repository (Data Lake):** [git.autodesk.com/ADP/adpdatalakedocs](https://git.autodesk.com/ADP/adpdatalakedocs)  
**Repository (Studio):** git.autodesk.com/ADP/adp-studio-docs (to be created)

**Outcome:** Each Product has its own focused TechDocs site. Query content fully extracted to ADP Studio docs with proper cross-linking.

**Content Sources:**
- Confluence: ADP Data Lake Docs (Beta), Resource Management User Guide, CDL Onboarding
- Contentful: data.autodesk.com/data-lake (latest user-facing docs)
- Existing repo content (11 API docs, service pages, architecture)

**Completed Actions:**
- [x] Clone and assess existing repo structure (64 files, 11 API docs)
- [x] Audit mkdocs.yaml nav vs available content (found major gaps - only 3 of 11 APIs wired)
- [x] Update mkdocs.yaml with comprehensive 7-section nav covering all 3 pillars
- [x] Add all 11 API docs to nav: Storage (2), Domain (4), Compute (3), Access Control (2)
- [x] Add Architecture, Concepts, Capabilities, Use Cases, Tutorials, AI/ML, Changelog to nav
- [x] Enhance architecture.md with high-level system diagram and data organization section
- [x] Enhance getting-started.md with platform prerequisites (environment, team, domain setup)
- [x] Update API overview with comprehensive table of all available APIs
- [x] Commit and push to main branch (2026-02-12)
- [x] **Terminology update (2026-02-12):** Domain→Storage, Astronomer→Platform-managed Airflow
  - [x] Updated 18 files across all doc sections
  - [x] "Domain" replaced with "Storage" (associated with Projects) in all user-facing docs
  - [x] "Astronomer" replaced with "platform-managed Airflow" throughout
  - [x] Data Portal batch processing highlighted as preferred orchestration interface
  - [x] Domain Management API and Astro Tenant API marked with transition notes
  - [x] mkdocs.yaml nav: "Domain APIs" → "Storage & Schema APIs"
  - [x] Commit b54c6b7 pushed to main
- [x] **User-facing platform roadmap (2026-02-13):**
  - [x] Created roadmap.md sourced from FY27 Q1 Outcome Tracker
  - [x] Organized by 5 user-relevant themes (Regional, Query, Self-Service, Cost, BI)
  - [x] Includes Q2 horizon, recently delivered, and feedback channels
  - [x] Added to mkdocs.yaml nav as top-level "Roadmap" section
  - [x] Published to Beacon (commit a0a6b1c)
  - [x] Published to Confluence: [AD Data Lake - Platform Roadmap (FY27)](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/726652959)

**Completed Actions (continued):**
- [x] **Data Portal — Compute & Orchestration content pages** (2026-03-17):
  - [x] Created "ADP Compute Clusters" page in Contentful (`about-compute-clusters`) with Introduction, Key Features, Use Cases
  - [x] Created "ADP Orchestration" page in Contentful (`about-orchestration`) with Introduction, Key Features, Use Cases
  - [x] Fixed Compute Clusters "Learn More" link on Data Lake page (was pointing to Data Storage)
  - [x] Fixed Orchestration "Learn More" link on Data Lake page (was pointing to deprecated Confluence wiki)
  - [x] All 11 entries published (9 new, 2 updated)

**Next Actions:**
- [ ] Verify TechDocs build on Beacon staging (post-terminology update)
- [ ] Review rendered documentation for consistency and broken links
- [x] ~~Rewrite query.md from Confluence ADP Studio User Guide~~ (8c6003c, 2026-02-13)
- [ ] Enhance content pages not yet reviewed: use-cases, tutorials, ai-ml-integration
- [ ] Add LINC-style usage examples section if appropriate
- [ ] Announce documentation update to #pset-ad-infra-support

**Key Files:**
- `/adpdatalakedocs/mkdocs.yaml` - Updated navigation structure
- `/adpdatalakedocs/docs/architecture.md` - Enhanced with system diagram
- `/adpdatalakedocs/docs/getting-started.md` - Enhanced with platform prerequisites
- `/adpdatalakedocs/docs/apis/overview.md` - Complete API reference table

**Documentation Structure:**
| Section | Pages | Status |
|---------|-------|--------|
| Architecture | 2 (Architecture, Concepts) | Wired + Enhanced + Terminology Updated; Capabilities removed (088119c) |
| Getting Started | 2 (Setup, Auth) | Portal & Migration removed (out of scope) |
| Services | 3 (Storage, Compute, Orchestration) | Wired + Terminology Updated; Data Ingestion removed (out of scope); Query moved to ADP Studio docs; Restore Stale Datasets moved to Ongoing Projects |
| Resource Management APIs | Overview + 3 local (Create Storage, CDL Schema, Compute) + 8 linked to Beacon catalog | Beacon-linked (746263a) |
| Ongoing Projects | 1 (Restore Stale Datasets) | New section for active project tooling (2026-03-05) |
| Use Cases & Tutorials | 3 (Use Cases, Tutorials, AI/ML) | Wired + Terminology Updated |
| Reference | 3 (FAQ, Glossary, Changelog) | Wired + Terminology Updated |

---

## 🚀 Next Gen Data Experiences

> **OKR:** Deliver modern, unified data experiences that increase productivity, reduce time-to-insight, and support collaboration.
> **Q1 Outcomes:** 2 committed | **Q2 Outcomes:** 6 planned
> **Full Goals:** [[GTD/goals#Next Gen Data Experiences]]

### PopSQL → ADP Studio Migration
**Status:** Active — Announcement Drafted, Cut-off April 17  
**Started:** 2026-03-10  
**Delivers:** [[GTD/goals#Legacy Tool Migration to ADP Studio|Legacy Tool Migration to ADP Studio (Q1)]]  
**Goal:** Migrate all PopSQL users (360) and content (5,000+ queries, 346 dashboards, 85 notebooks) to ADP Studio before September 1, 2026. Establish April 17 as the cut-off for automated migration.

**Confluence:** [PopSQL → ADP Studio Migration — Cut-off April 17, 2026](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/751741208)
**Feature Tracker:** [ADP Studio - Feature & Feedback Tracker (PopSQL Transition)](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/745193148)

**Outcome:** All 360 PopSQL users transitioned to ADP Studio with content auto-migrated; DBeaver de-supported as query interface

**Key Dates:**
| Date | Milestone |
|------|-----------|
| Mar 10, 2026 | Announcement sent (Slack + email) |
| Apr 17, 2026 | **Cut-off: Final PopSQL snapshot** |
| Apr 17 – May 15 | Auto-migration execution |
| May 15 – Jun 1 | User validation period |
| Sep 1, 2026 | PopSQL sunset |

**Completed Actions:**
- [x] Research PopSQL/DBeaver usage on Confluence
- [x] Create detailed migration plan (`/projects/popsql-migration/migration-plan.md`)
- [x] Draft Slack + email announcement with reminder templates (`/projects/popsql-migration/announcement.md`)
- [x] Publish migration page to Confluence (CPDDPS space, child of Feature Tracker)
- [x] Create Contentful migration landing page under Query Interfaces (page + 3 content blocks, draft status)
- [x] Update documentation to point to ADP Studio (2026-03-10):
  - [x] Contentful: Updated link entry `65v8wd9xYjGZrM6SDdo7fC` — "Get Started with ADP Studio" → ADP Studio User Guide
  - [x] Contentful: Updated + published intro `4rEnrmQ9oZdxsJKynhGD2c` — removed "in preview", added migration/deprecation note
  - [x] Contentful: Updated + published card `I9pytHYKJ6GBR0RuOK1tA` — removed "among other options" from description
  - [x] Confluence: Updated page 333631901 — added "Recommended: Query via ADP Studio" section + deprecation banners on PopSQL/DBeaver sections
  - [x] Confluence: Updated page 333827905 — added deprecation banner at top with sunset date, migration link, and ADP Studio redirect
  - [x] Contentful: Updated + published intro entry `6io0Q6IzsduPXiUO5fqP9R` on Query Interfaces page — added Platform Query Strategy section, reordered tools by status (Recommended / Supported / Being Phased Out / Disabled), re-published page entry for CDN refresh

**Next Actions:**
- [ ] Send Slack announcement to #ad-query-support, #pset-ad-infra-support, #adp-community
- [ ] Send targeted email to 360 PopSQL users
- [ ] Publish Contentful entries (3 customRichText + 1 page) to make live on data.autodesk.com
- [ ] Send Reminder #1 (Mar 24) — 3 weeks to cut-off
- [ ] Send Reminder #2 (Apr 7) — 10 days to cut-off
- [ ] Send Final Reminder (Apr 14) — 3 days to cut-off
- [ ] Confirm import script (GAP-11) development is on track
- [ ] Validate user mapping strategy (GAP-8) with [[Sankalp Vairat|Sankalp]]
- [ ] Validate connection-to-engine mapping (GAP-5) with [[Riya Loya|Riya]]
- [ ] Confirm DDL enablement (GAP-2) lands before Apr 17

**Workstream: Data Lineage Integration (ADPINFRA-1422)**
Presto does not support lineage tracking — flagged by architects and leadership as a compliance issue. Lineage capture is the missing layer for DDL/DML operations via ADP Studio. ADP Studio already has MDM metadata writeback (ADPDII-1745 — [[Mohit Arora]]) via `metadata_api_client.py`.

- **Confluence:** [Data Lineage Integration with MDM for DDL/DML Operations](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/742040310)
- **Source:** [Slack Thread — #C094NSNAW07](https://autodesk.slack.com/archives/C094NSNAW07/p1767935163491769) ([[Riya Loya]] → [[Sankalp Vairat]], 2026-02-27)
- **Approaches:** Trino Event Listener, Studio middleware, or hybrid
- **Key Stakeholders:** [[Sankalp Vairat]] (implementation ideas), [[Mohit Arora]] (MDM writeback — ADPDII-1745), [[Trupal Patel]] (Trino Event Listener spike), Data Catalog / MDM Team (API contract)
- **Sprint Plan:**
  - Current: Spike — lineage options evaluation + interim DML policy + MDM API contract
  - Next: DDL enablement + Studio-level DDL lineage
  - +2: Studio-level DML lineage + MDM API publishing
  - +3: Trino Event Listener evaluation for cluster-wide coverage
- **Lineage Next Actions:**
  - [ ] Spike: Evaluate lineage capture options (Trino Event Listener vs Studio middleware vs hybrid)
  - [ ] Confirm MDM lineage API contract with Data Catalog / MDM team
  - [ ] Decide interim DML policy (disable on Presto, warning banner, or manual registration)
  - [ ] Assign US Infra resource for Presto lineage work
  - [ ] Coordinate with [[Sankalp Vairat|Sankalp]] on his implementation ideas

**Key Files:**
- `/projects/popsql-migration/migration-plan.md`
- `/projects/popsql-migration/announcement.md`

**Contentful Entries (draft):**
- Page: `C4wy4gRyBXNDxPqIIHZqc` — PopSQL to ADP Studio Migration
- Intro: `7m2KA7nApG4y7zDEV66oJF` — Migration introduction
- Timeline: `4PDSCsz0pFAj9cVC8NYSVb` — Timeline and what gets migrated
- FAQ: `2dSiVp4cdbmNxByUKlB5zI` — What to do and FAQ

---

### Data Download to Autodesk-Managed Devices — Opinion Piece
**Status:** Draft Complete — Ready for Stakeholder Review  
**Started:** 2026-03-11  
**Delivers:** [[GTD/goals#Legacy Tool Migration to ADP Studio|Legacy Tool Migration to ADP Studio (Q1)]] — unblocks GAP-1 (data export)  
**Goal:** Produce a one-page opinion piece arguing FOR allowing data downloads from Autodesk S3 to Autodesk-managed corporate devices, with appropriate controls

**Outcome:** Stakeholder-ready opinion piece with validated evidence (PowerBI local storage, Excel limitations, endpoint encryption, industry standards) and a tiered recommendation (audit logging, DLP, sensitivity labels, classification-based controls)

**Key Arguments:**
- Data stays within Autodesk security perimeter (MDM, FileVault/BitLocker, remote wipe)
- Precedent: Power BI Desktop stores data locally in `.pbix` with no built-in encryption; Excel financial data lives on laptops
- Prohibition causes business harm: GAP-1/GAP-4 on Feature Tracker, shadow IT risk, workflow regression from PopSQL
- Industry standards (ISO 27001, SOC 2, GDPR) require "appropriate measures" — not cloud-only storage

**Completed Actions:**
- [x] Research Autodesk Trust Center, data lake docs, and industry standards
- [x] Validate Power BI Desktop local storage behavior (Import mode, no built-in encryption for .pbix)
- [x] Validate Excel protection limitations (Microsoft warns password protection insufficient for sensitive PII)
- [x] Draft opinion piece (~1000 words) with pragmatic tone for mixed audience
- [x] **Industry deep-dive research (2026-03-17):** Comprehensive sourced analysis of 5 content-heavy SaaS companies (Stripe, Figma, Dropbox, Atlassian, Box) covering data lake architecture, download controls, DLP, endpoint security, and Zero Trust posture. Key findings:
  - No company uses blanket download prohibition — all use classification-based controls
  - Stripe: Custom Secure Devices team (10K+ devices), macOS DLP agents, device attestation, software allowlisting; PCI data prohibited locally but analytics data permissible
  - Figma (closest analogy to Autodesk): Configurable export toggle via Governance+, EKM with customer-owned AWS KMS keys, IP allowlist/NAR
  - Dropbox: E2E encryption (Dropbox can't read customer files); employee access architecturally prohibited for customer content
  - Atlassian: Customer consent required before employee access; export blocking per classification; FIDO2 + Zero Trust + application control
  - Box: Box Shield with per-classification download policies (Public/Internal/Confidential); ML-based anomaly detection; Device Trust with OS/AV requirements

**Next Actions:**
- [ ] Share opinion piece with Security & Compliance team for feedback
- [ ] Validate endpoint security controls with Autodesk IT (FileVault/BitLocker enforcement, DLP agent deployment, MDM platform)
- [ ] Present to leadership with recommendation for tiered download policy
- [ ] Publish opinion piece and industry research to Confluence

**Key Files:**
- `/projects/data-download-opinion/opinion-data-download-to-local-machines.md`
- `/projects/data-download-opinion/industry-research-saas-data-governance.md`

---

### ADP Studio — DML & DDL Enablement (Sandbox-First Approach)
**Status:** Draft Complete — Pending Triad Decision  
**Started:** 2026-03-10  
**Priority:** P1 — High (PopSQL Migration Blocker)  
**Delivers:** [[GTD/goals#ADP Studio Workspaces & Collaboration|ADP Studio Workspaces & Collaboration (Q1)]], [[GTD/goals#Legacy Tool Migration to ADP Studio|Legacy Tool Migration (Q1)]]  
**Goal:** Enable DDL and DML operations in ADP Studio through a sandbox-first approach — ephemeral per-project namespaces with TTL enforcement, existing access controls, and a promotion path to batch processing pipelines

**Confluence:** [ADP Studio — DML & DDL Enablement Decision](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/751455021)

**Related:**
- [ADP Studio - Feature & Feedback Tracker (PopSQL Transition)](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/745193148)
- [ADP Studio PRD](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333819421)
- JIRA: [ADPDII-1867](https://jira.autodesk.com/browse/ADPDII-1867) (DDL), ADPINFRA-1422 (Lineage)

**Recommendation:** Option B — Sandbox Namespace with Ephemeral Data
- Sandbox namespace per project (`sandbox_{project_id}`) with 7-day default TTL
- Full DDL + DML in sandbox; production schemas remain read-only
- Existing Privacera/Lake Formation access controls apply
- "Promote to Pipeline" one-click path from sandbox SQL to Airflow batch pipeline
- Data export unblocked via sandbox tables

**Completed Actions:**
- [x] Analyze feature gaps from Feature Tracker (GAP-1 through GAP-4)
- [x] Review PRD requirements and FY27 goals alignment
- [x] Evaluate 4 options (Lineage Gate, Sandbox, Warning Banner, Read-Only)
- [x] Draft decision document with architecture, implementation plan, risks
- [x] Publish to Confluence (2026-03-10)

**Next Actions:**
- [ ] Schedule decision review with Triad ([[Ritesh]], [[Sankalp Vairat|Sankalp]], [[Abhilash]]) — deadline 2026-03-17
- [ ] Discuss sandbox namespace provisioning approach with APAC Infra ([[Sankalp Vairat|Sankalp]])
- [ ] Confirm Trino Event Listener progress with [[Trupal Patel|Trupal]] (ADPINFRA-1422)
- [ ] Create JIRA tickets for Phase 1 sandbox DDL tasks
- [ ] Draft user announcement for #ad-query-support

**Implementation Phases:**
| Phase | Scope | Target |
|-------|-------|--------|
| Phase 1 | Sandbox DDL (CREATE TABLE, CTAS, CREATE VIEW) | Sprint +1 |
| Phase 2 | Sandbox DML + TTL enforcement | Sprint +2 |
| Phase 3 | Data Export + Promote to Pipeline | Sprint +3 |
| Phase 4 | Production DDL/DML via batch pipeline | Q2 FY27 |

**Key Files:**
- `/projects/ddl-dml-enablement/DDL_DML_Enablement_Decision.md`

---

### ADP Studio Usage Dashboard
**Status:** In Progress — Backend + Frontend implemented, pending deployment  
**Started:** 2026-03-03  
**Delivers:** [[GTD/goals#ADP Studio Workspaces & Collaboration|ADP Studio Workspaces & Collaboration (Q1)]]  
**Goal:** Build a usage analytics dashboard for ADP Studio to track platform adoption, query activity, engine breakdown, collaboration, and feature usage — aligned to FY27 success metrics (CSAT > 4.3, >30% share/reuse, >70% AI acceptance, out of preview)

**Confluence:** [ADP Studio Usage Dashboard — Design & Implementation](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/745540740)

**Outcome:** Admin-only dashboard accessible at `/admin/usage/` in ADP Studio with KPI cards, trend charts, engine breakdown, collaboration metrics, and feature adoption analytics

**Architecture:**
- Backend: 6 new Flask endpoints under `/admin/usage/` (dashboard, trends, engines, collaboration, features, export)
- Business logic: SQLAlchemy aggregation queries against existing QueryBook MySQL tables (query_execution, event_log, impression, user, data_doc, board)
- Frontend: React + TypeScript admin page with Chart.js visualizations, MUI components
- Zero new database tables — all metrics derived from existing data

**Completed Actions:**
- [x] Explore adpcs-infra repo and map all data sources (query_execution, event_log, impression, user, data_doc, board, query_engine)
- [x] Create `logic/usage_analytics.py` — business logic with 8 SQLAlchemy query functions
- [x] Create `datasources/admin_usage_analytics.py` — 6 admin API endpoints following admin_feedback_analytics pattern
- [x] Register new module in `datasources/__init__.py`
- [x] Create `resource/admin/usageAnalytics.ts` — frontend API client
- [x] Create `AdminUsageDashboard.tsx` — full React dashboard with KPIs, trends, engines, collaboration, features tabs
- [x] Register route in `AppAdmin.tsx`, sidebar in `AdminAppEntitySidebar.tsx`, entity type in `types.ts`

**Next Actions:**
- [ ] Deploy changes to dev environment
- [ ] Verify all 6 API endpoints return correct data against dev MySQL
- [ ] Test frontend dashboard renders correctly in ADP Studio admin
- [ ] Review with AD Platform Infrastructure Triad
- [ ] Publish dashboard documentation to Confluence
- [ ] Create JIRA ticket for code review and production deployment

**Key Files:**
- `/projects/adpstudiousage/repo/adpcs-infra/infra/querybook/src/querybook/server/logic/usage_analytics.py`
- `/projects/adpstudiousage/repo/adpcs-infra/infra/querybook/src/querybook/server/datasources/admin_usage_analytics.py`
- `/projects/adpstudiousage/repo/adpcs-infra/infra/querybook/src/querybook/webapp/components/AdminUsageDashboard/AdminUsageDashboard.tsx`
- `/projects/adpstudiousage/repo/adpcs-infra/infra/querybook/src/querybook/webapp/resource/admin/usageAnalytics.ts`

**FY27 Goal Alignment:**
| Metric | FY27 Target | Dashboard Coverage |
|--------|-------------|-------------------|
| ADP Studio out of preview | Release decision | MAU, DAU, WAU, query volume |
| CSAT > 4.3 | User satisfaction | Success rate, avg duration |
| >30% share/reuse | Collaboration | Share/reuse %, shared docs/boards/executions |
| >70% AI acceptance | Query Assistant | AI acceptance rate (keep vs reject) |
| 100% migration | Legacy tool migration | New user growth, total active users |

---

### Unified Resources MFE - Data Retention UI
**Status:** In Progress - UI Mockup Complete  
**Started:** 2026-01-29  
**Delivers:** [[GTD/goals#Data Retention Policies|Data Retention Policies (Q2)]], [[GTD/goals#Resource Utilization, Observability & Lifecycle|Resource Utilization & Observability (Q1)]]  
**Goal:** Enhance Infrastructure Resources MFE with data retention policy management for ADPPICSERV-386

**Related Tickets:**
- [ADPPICSERV-386](https://autodesk.atlassian.net/wiki/spaces/~orra/pages/681583498) - Standard Data Retention Action Plan
- ADPPICSERV-522 - Retention enforcement mechanism
- ADPPICSERV-519 - Stakeholder retention info & extension requests

**Outcome:** Self-service UI for data teams to view, manage, and request extensions for data retention policies

**Completed Actions:**
- [x] Review retention policy document (ADPPICSERV-386)
- [x] Add retention policy TypeScript types
- [x] Create Retention Dashboard widget with compliance metrics
- [x] Add retention info to storage cards (classification, status, countdown)
- [x] Create Extension Request Modal component
- [x] Document Weave UI migration guide (MIGRATION_TO_WEAVE.md)

**Next Actions:**
- [ ] Clone adp-infra-project-resources-mfe repository locally
- [ ] Migrate mockup to Weave UI patterns
- [ ] Integrate with retention policy API (ADPPICSERV-519)
- [ ] Add Jest tests following ADP BI MFE patterns
- [ ] Review with AD Platform Infrastructure Triad

**Key Files:**
- `/Unified Resources MFE Concept/src/components/UnifiedDashboard.tsx`
- `/Unified Resources MFE Concept/src/components/RetentionExtensionModal.tsx`
- `/Unified Resources MFE Concept/src/types/index.ts`
- `/Unified Resources MFE Concept/MIGRATION_TO_WEAVE.md`

**Key Features Implemented:**
| Feature | Description |
|---------|-------------|
| Retention Dashboard | Summary of compliant/expiring/pending datasets |
| Classification Badges | Customer Content, Third Party, Enterprise, Internal |
| Compliance Status | Color-coded status on storage cards |
| Extension Workflow | Modal for requesting retention extensions |
| Legal Hold Support | Visual indicator and policy exemption |

**References:**
- [ADPCDL Standards - Data Retention Policies](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333927765)
- [adp-bi-mfe](https://git.autodesk.com/ADP/adp-bi-mfe) - Reference for Weave UI patterns
- [adp-infra-project-resources-mfe](https://git.autodesk.com/ADP/adp-infra-project-resources-mfe) - Target repo

---

### BI for CDL - Self-Service BI Connectivity PRD
**Status:** Draft Complete  
**Started:** 2026-01-20  
**Delivers:** [[GTD/goals#Looker Connectivity|Looker Connectivity (Q2)]], [[GTD/goals#Power BI Connectivity|Power BI Connectivity (Q2)]]  
**Goal:** Enable self-service Business Intelligence tool connectivity to the AD Data Lake (Commercial and Corporate)

**Confluence Draft:** [BI for CDL](https://autodesk.atlassian.net/wiki/pages/resumedraft.action?draftId=333909467&draftShareId=12316f79-2b4f-43be-8eb5-6fd4a1c7b715)

**Outcome:** PRD defining Looker and Power BI connectivity use cases with self-service experience

**Next Actions:**
- [ ] Publish draft to Confluence page
- [ ] Review with Platform Infrastructure Triad
- [ ] Align with Unified Data Lake Experiences initiative
- [ ] Validate use cases with Business Analysts and Data Analysts
- [ ] Scope technical options (Unified Query Gateway vs Connection Templates)

**Key Files:**
- `/projects/stalescorpdatalake/DataLake/BI_for_CDL_Draft.md`

**Milestones:**
| Milestone | Target | Capabilities |
|-----------|--------|--------------|
| M1 | FY27 Q2 | Looker self-service connection from Data Portal |
| M2 | FY27 Q3 | Lake Formation access propagates to Looker |
| M3 | FY27 Q3 | Power BI connection files from Data Portal |
| M4 | FY27 Q4 | BI usage tracking in Data Portal |

**Related Pages:**
- [Unified Data Lake Experiences](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333908597/Unified+Data+Lake+Experiences)
- [AD Data Lake - PRD](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333859875/AD+Data+Lake+-+PRD)

---

### Unified Infrastructure MCP Server — PRD
**Status:** Draft Complete - Published to Confluence  
**Started:** 2026-03-03  
**Delivers:** [[GTD/goals#AI-Powered Query Optimization|AI-Powered Query Optimization (Q2)]]  
**Goal:** Define product requirements for a single, unified MCP server consolidating fragmented AI tooling efforts for the AD Data Lake — enabling schema discovery, query execution, resource visibility, job log access, and observability from any MCP-compatible client (Cursor, Claude Code, Autodesk Assistant)

**Confluence:** [Unified Infrastructure MCP Server — PRD](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/745544869/Unified+Infrastructure+MCP+Server+PRD)

**JIRA Epic:** [ADPPICSERV-392](https://jira.autodesk.com/browse/ADPPICSERV-392)

**Trigger:** [Community requests in #adp-community](https://autodesk.slack.com/archives/C0GF2K7Q9/p1772512342817839) for MCP server access to schema discovery and query execution from IDE tools; followed by [consolidation thread](https://autodesk.slack.com/archives/C07H420AQE5/p1772564301727309) identifying 4 fragmented MCP efforts.

**Outcome:** Consolidated PRD covering 15 MCP tools across 3 phases (Schema Discovery, Query & Query Assistant Parity → Resource Visibility & Job Logs → Write Operations)

**Completed Actions:**
- [x] Capture context from Slack community request and consolidation thread
- [x] Map 4 fragmented MCP efforts to unified tool catalog
- [x] Define 11 MCP tools (MCP-01 through MCP-11) with parameters and response specs
- [x] Add 4 Query Assistant parity tools (MCP-12 Generate SQL, MCP-13 Edit SQL, MCP-14 Fix SQL, MCP-15 Summarize SQL) based on existing ADP Studio Query Assistant capabilities (2026-03-03)
- [x] Define architecture (Node.js/TypeScript on DataOS, Spindle JWT auth, MCP Registry)
- [x] Write user stories for schema discovery, query execution, and resource/observability
- [x] Define 12 non-functional requirements
- [x] Map dependencies and create RAID log
- [x] Define milestones (M1-M10) across Q2-Q3 FY27
- [x] Publish PRD to personal Confluence space (2026-03-03)
- [x] Integrate Beacon Universal MCP Server Template into PRD (2026-03-03): updated architecture to CloudOS deployment + Entra SSO / CIMD auth; compressed M1 from 4 weeks to ~2 weeks; mitigated R3 (auth risk); resolved I3 (auth pattern); added D7/D8 decisions

**Next Actions:**
- [ ] Schedule alignment meeting with [[Sankalp Vairat]] to consolidate fragmented MCP efforts
- [ ] Review PRD with AD Platform Infrastructure Triad
- [ ] Prioritize ADPPICSERV-392 for upcoming sprint
- [ ] Instantiate Beacon Universal MCP Server Template (Node.js/TypeScript + Internal Entra SSO)
- [ ] Self-service Entra App Registration via Beacon template
- [ ] Coordinate with APAC infra team on Trino REST API access for MCP server CloudOS pods
- [ ] Register MCP server on MCP Registry (dev)
- [ ] Confirm MCP Registry accepts non-AA MCP servers with Intelligence Team

**Key Files:**
- `/projects/infra-mcp/PRD_Unified_Infrastructure_MCP_Server.md`

**Key Stakeholders:**
- [[Sankalp Vairat]] (Engineering Lead — fragmented effort coordination)
- #adp-community users (community demand / user validation)
- Intelligence Team (MCP Registry, AA integration)
- Platform Infra APAC (Trino proxy, Infra API v2)
- Platform Infra AMER (DataOS, Spark History Server)

**Milestones:**
| Milestone | Target | Capabilities |
|-----------|--------|--------------|
| M1 | Q2 Week 2 | MCP Server Scaffold via Beacon Template (CloudOS, Entra SSO, audit, registry) |
| M2 | Q2 Month 2 | Schema Discovery (table search, schema, database list) |
| M3 | Q2 Month 2 | Query Execution & Query Assistant Tools (execute, generate, edit, fix, summarize SQL) |
| M4 | Q2 Month 3 | Resource Visibility (project resources, compute listing) |
| M5 | Q2-Q3 Month 4 | Job Logs & Spark Observability |
| M6 | Q2-Q3 Month 5 | Utilization & Cost |
| M7 | Q2-Q3 Month 6 | Write Operations (Fivetran, access policies) |

---

## 📊 Cross-Cutting

> These projects support multiple initiatives and are not tied to a single OKR.

### Platform Infra Outcomes Tracker - AMER (FY27 Q1)
**Status:** Page Created - Pending Engineering Input  
**Started:** 2026-02-10  
**Delivers:** Cross-cutting — tracks execution across all initiatives  
**Goal:** Track AMER team's Q1 FY27 infrastructure outcomes aligned with strategic initiatives

**Confluence:** [Platform Infra Outcomes Tracker - FY27Q1](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/722949586/Platform+Infra+Outcomes+Tracker+-+FY27Q1)  
**Parent Page:** [2027Q1 Infra Project Tracker (APAC)](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/720998320)

**Outcome:** AMER team has a living tracker for 6 open epics across 3 strategic initiatives

**Completed Actions:**
- [x] Create Confluence child page under APAC tracker
- [x] Map 6 open JIRA epics to Q1 outcomes from goals.md
- [x] Infer milestones from epic descriptions (marked *suggested*)
- [x] Add JIRA epic links and project tracker links where available

**Next Actions:**
- [ ] Add AMER team member names to Lead and Team columns
- [ ] Ask engineering leads to fill in Estimated and Actual Timelines
- [ ] Validate *suggested* milestones with engineering leads
- [ ] Update Overall Status as work begins (To Do → In Progress)
- [ ] Populate Health indicators (Green/Amber/Red) once timelines are set

**Epics Tracked:**
| Rank | Epic | Outcome |
|------|------|---------|
| P1 | ADPINFRA-1264: DataOS - MVP and Phase 1 | Regionalization – DataOS Compute Onboarding |
| P1 | ADPINFRA-1117: Orchestration - OSS Airflow on DataOS | Regionalization – Regionalized Infra Services |
| P2 | ADPPICSERV-542: Improve Provisioning Latency | Self Service – Self-Service Portal |
| P2 | ADPPICSERV-553: Unified MFE - Configure & Maintain | Self Service – Project Resource Management |
| P3 | ADPINFRA-1081: Privacera Deprecation | Faster Cheaper Better – Resource Utilization |
| P3 | ADPINFRA-1074: Jenkins to Cloudbees CI | Faster Cheaper Better – Platform Modernization |

---

### autoPM — Open Source Shareable Repo
**Status:** Active — Dashboard auto-deploys via pre-push hook
**Started:** 2026-03-12
**Delivers:** Cross-cutting — team productivity infrastructure  
**Goal:** Share the GTD + MMM Cursor setup as a public GitHub repo so any user can set up their Cursor environment with the same productivity system

**Outcome:** Repo at [git.autodesk.com/achara/autoPM](https://git.autodesk.com/achara/autoPM) with generalized GTD dashboard, 5 core lists (templates), MMM method reference, 4 note templates, and always-on Cursor rules — all team-specific content stripped

**Completed Actions:**
- [x] Read and analyzed all workspace files (Home, CLAUDE.md, GTD/, method/, templates/, .cursor/rules/)
- [x] Created generalized versions of all 22 files (stripped company-specific data)
- [x] Initialized local git repo at `/autoPM-shared/`
- [x] Authenticated GitHub CLI (`abhilashachar-adsk`)
- [x] Created public repo and pushed initial commit (2026-03-12)
- [x] Created team dashboard with MkDocs Material (Kanban boards, stat cards, project portfolio)
- [x] Created Cursor Agent Skill (`.cursor/skills/autopm-setup/`)
- [x] Created Claude Code Skill (`.claude/skills/onboard/`)
- [x] Implemented pre-push git hook for auto dashboard deployment (2026-03-12)
- [x] Disabled GitHub Actions workflow (GHE has no shared runners — Confluence confirms CBCI is official CI/CD)
- [x] Updated both skills + README to include hook installation in onboarding flow

**Key Files:**
- `/Users/achara/Documents/Work Projects/autoPM-shared/` — local clone
- [GitHub Repo](https://git.autodesk.com/achara/autoPM)

**Repo Contents (22 files):**
| Category | Files |
|----------|-------|
| Core | README.md, CLAUDE.md, Home.md, LICENSE, .gitignore |
| GTD Templates | goals.md, Projects.md, Next_Actions.md, Waiting_For.md, Agenda.md |
| Methods | MMM.md, Operations_Lifecycle.md |
| Templates | daily-note.md, project.md, prd.md, meeting-note.md |
| Cursor Rules | workflow.mdc (GTD), advisor.mdc (MMM) |
| Scripts | install-hooks.sh, deploy_dashboard.sh, onboard_pm.sh, hooks/pre-push |
| Folders | inbox/, daily/, projects/, references/ |

---

## 🔮 Unaligned Requests

### AMP SQL and NoSQL Database Capability (AECGAIA Request)
**Status:** Analysis Complete - Pending Decision  
**Started:** 2026-01-23  
**Epic:** PSETWRKIN-2906  
**Delivers:** Unaligned — stakeholder request from AECGAIA team (not tied to an FY27 outcome)  
**Goal:** Enable SQL/NoSQL database access within AMP for AECGAIA ML workflows

**Outcome:** Platform capability allowing ML teams to provision operational databases for high-concurrency workloads

**Problem Statement:**
- AECGAIA needs 3k+ concurrent writes for ML pipelines
- Current Iceberg tables limited by PyIceberg immaturity and S3 throttling (3,500 writes/sec/prefix)
- Row-level lineage requires 100M-1B write operations per pipeline run
- No self-service database provisioning in AMP

**Key Stakeholders:**
- [[Ratti Sonthi]] (AECGAIA - requester)
- [[Pete Meltzer]] (Research Enablement)
- [[Colt Chapin]] (AECGAIA Data Team)
- [[Aniket Awchare]] (AMP Intake reviewer)

**Recommended Solution:**
| Tier | Solution | Use Case |
|------|----------|----------|
| Tier 1 | Redis/ElastiCache | Ephemeral lookup tables |
| Tier 2 | DynamoDB | Persistent key-value stores |
| Tier 3 | Aurora Serverless | Relational/SQL needs |

**Next Actions:**
- [ ] Schedule sync with [[Ratti Sonthi|Ratti]]/[[Colt Chapin|Colt]]/[[Pete Meltzer|Pete]] to clarify exact access patterns
- [ ] Document Iceberg workarounds already applied for concurrent writes
- [ ] Evaluate DynamoDB as managed, tenant-isolated solution
- [ ] Create RFC for "AMP Operational Data Stores" capability

**Key Files:**
- `/projects/sql-nosql-db/PRODUCT_ANALYSIS.md`

**References:**
- [Jira Epic](https://autodesk.atlassian.net/browse/PSETWRKIN-2906)
- [AMP Requests Page](https://autodesk.atlassian.net/wiki/spaces/GAIA/pages/521022867/AMP+Requests)
- [GAIA Row-Level Lineage RFC](https://autodesk.atlassian.net/wiki/spaces/GAIA/pages/521057525)

---

## 📋 Someday/Maybe

*Projects to consider in the future*

- ~~Snowflake lifecycle management (FY28)~~ — Signed off (2026-03-12)
- Archival to S3 Glacier cold storage
- Cross-lake data movement automation
- Tableau connectivity to Data Lake (after Looker/Power BI)
- Query tool consolidation (QueryBook as default)
- Support channel unification automation (AI routing)

---

*Last Updated: 2026-03-17 (Aligned to FY27 Initiatives/OKRs with Delivers wikilinks)*

---

**Navigation:** [[Home]] | [[GTD/goals|Goals]] | [[GTD/Next_Actions|Next Actions]] | [[GTD/Waiting_For|Waiting For]] | [[GTD/Agenda|Agenda]]
