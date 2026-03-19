# Next Actions

*Single next steps that can be done now. Organized by context.*

---

## 📊 @Analysis (Faster Cheaper Better Platform)

- [ ] **Complete Data Lake batch queries** - Continue from batch 2 onwards

## 📝 @Planning (Next Gen. Data Experiences)

- [ ] **Review Data Lifecycle Management PRD** - Internal review before stakeholder circulation
- [ ] **Create Confluence page for PRD** - Publish as child page under AD Data Lake PRD
- [ ] **Schedule PRD review with Infra Triad** - Get engineering input on feasibility
- [ ] **Align PRD with Lake Formation timeline** - Confirm M4 dependencies
- [ ] **Publish BI for CDL draft to Confluence** - Copy content from BI_for_CDL_Draft.md
- [ ] **Validate BI use cases with analysts** - Interview Business Analysts and Data Analysts
- [ ] **Scope unified query endpoint** - Evaluate Trino gateway vs connection templates
- [ ] **Inventory existing BI connections** - Catalog current Looker/Power BI Data Lake connections

## 🗄️ @AMP SQL/NoSQL DB (PSETWRKIN-2906) — Unaligned Request

- [ ] **Schedule sync with AECGAIA** - Meet with [[Ratti Sonthi|Ratti]], [[Colt Chapin|Colt]], [[Pete Meltzer|Pete]] to clarify exact access patterns
- [ ] **Request Iceberg workaround docs** - Ask AECGAIA to document 3k concurrent write remediation
- [ ] **Evaluate DynamoDB cost model** - Calculate costs for 1B writes/pipeline scenario
- [ ] **Draft RFC for AMP Operational Data Stores** - Propose tiered solution (Redis/DynamoDB/Aurora)

## 📋 @Backlog Planning (Self Service Fulfillment)

- [ ] **Review backlog with engineering leads** - Validate effort estimates for P0 items
- [ ] **Schedule Triad review** - Present AD Infra Support Backlog to [[Vaishak]], [[Sankalp Vairat|Sankalp]], [[Sarang]]
- [ ] **Map cross-team dependencies** - Identify BP, AnD, Data Access team coordination needs
- [ ] **Draft Q1 sprint commitment** - Select P0 items for immediate sprint
- [ ] **Prepare #adp-community announcement** - Draft roadmap communication with timelines

## 🖥️ @Unified Resources MFE (Next Gen. Data Experiences)

- [ ] **Clone adp-infra-project-resources-mfe** - `git clone https://git.autodesk.com/ADP/adp-infra-project-resources-mfe`
- [ ] **Install Weave UI packages** - Add `@weave-mui/material`, `@weave-mui/icons-weave`, `@weave-mui/enums`
- [ ] **Migrate RetentionBadge to Weave** - Follow pattern in MIGRATION_TO_WEAVE.md
- [ ] **Migrate ClassificationBadge to Weave** - Use color constants from adp-bi-mfe
- [ ] **Migrate Extension Modal to Weave** - Use WeaveModal pattern
- [ ] **Create Retention Tab component** - Add to storage resource detail page
- [ ] **Add Jest tests** - Follow adp-bi-mfe testing patterns
- [ ] **Connect to retention API** - Integrate with ADPPICSERV-519 endpoints
- [ ] **Review UI with Triad** - Get feedback on retention dashboard design

---

## 🌐 @Regionalization — Core Infrastructure Services (Regionalization)

- [ ] **Review Regionalization PRD with Infra Triad** - Schedule 50-min review (covers both r13n projects)
- [ ] **Validate regional project assignment with AnD** - Confirm Spindle can add `region` field to project metadata
- [ ] **Align with AWS Regional Accounts** - Initiate eu-west-1 account provisioning request
- [ ] **Get Security sign-off on Zero Trust reqs** - Share REG-01, REG-06 with Security & Compliance stakeholders
- [ ] **Confirm Infrastructure API v2 scope with APAC** - Align region-aware API changes with [[Nitin Kakkar]]
- [ ] **Confirm CNS alert API availability** - Regional alerting dependency
- [ ] **Confirm regional cost attribution API with FinOps** - Chargeback model for multi-region
- [x] ~~**Publish PRD & MFE Mockups to Confluence**~~ - Published to personal space (2026-02-11): [PRD](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/724544519) | [Mockups](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/724484024)
- [x] **Align Cost Attribution with FinOps** - Confirm regional cost breakdown API availability

*MFE regionalization work (Region badges, mockup migration, Phase 1 implementation) tracked under **@Unified Resource MFE** section.*

---

## 🖥️ @Regionalization — DataOS Compute (Regionalization)

- [ ] **Confirm DataOS + OSS Airflow timeline with AMER leads** - Validate M1 milestone for DataOS clusters and OSS Airflow Helm deployment
- [ ] **Define OSS Airflow Helm chart configuration** - Scheduler replicas, KubernetesExecutor, metadata DB
- [ ] **Plan Astro → OSS Airflow migration path** - Document migration steps for existing Astro tenants to OSS Airflow on DataOS
- [ ] **Review regional compute topology** - Validate DataOS cluster placement per region from PRD architecture
- [ ] **Validate DataOS cluster placement for EMEA** - Coordinate with AMER leads for Q2 EMEA deployment

---

## 🖥️ @Unified Resource MFE — Regionalized Mockups (Self Service Fulfillment)

- [ ] **Commit and push Weave MUI changes** - `git add . && git commit` in unified-resources-mfe-mockup
- [ ] **Review MFE mockups with APAC team** - Schedule review with [[Nitin Kakkar]] for Unified MFE wireframes
- [ ] **Create JIRA stories from MFE specs** - Break Phase 1-6 into individual stories under ADPPICSERV-553
- [ ] **Begin Phase 1 implementation** - Start RegionBadge, RegionFilter components in adp-infra-project-resources-mfe
- [x] ~~**Update interactive mockup per PRD**~~ - Updated Storage, Compute, Overview, Observability (2026-02-12)
- [x] ~~**Migrate MFE mockup to Weave MUI**~~ - Replaced Tailwind/lucide with MUI/Emotion + Weave theme (2026-02-12)
- [x] ~~**Align Observability page with AD Observability PRD**~~ - Restructured into 5 tabbed pillars (2026-02-12)

## 🤖 @Autodesk Assistant Integration (Next Gen. Data Experiences)

- [ ] **Prototype read-only MCP tools** - Build 2-3 tools (`list_storage_resources`, `get_retention_status`, `list_expiring_resources`) using Beacon template or AgentCore
- [ ] **Create routing dataset** - Write 50+ example prompts for AA Orchestrator routing optimization
- [ ] **Register dev MCP server on MCP Registry** - Register at [data.autodesk.com/mcp-registry](https://data.autodesk.com/mcp-registry) with product context: Data Portal
- [ ] **Reach out to [[Nick Ragusa]]** - Align on Data Portal Plugin timeline (TSDEV-4201 Phase 3) and coordinate capability-specific MCP server pattern
- [ ] **Test in AA DEV environment** - Verify tool routing at https://cfp-mfe-dev.autodesk.com/autodesk-assistant-new/current/index.html
- [ ] **Review MCP tool design with Intelligence Team** - Get feedback on tool naming, parameters, and response shapes per their [MCP Implementation Guidelines](https://autodesk.atlassian.net/wiki/spaces/DATA/pages/709781812)
- [x] ~~**Research AA integration patterns**~~ - Explored MCP Strategy, Plugin MFE Integration, V2 Domain Agent resources, Data Portal Plugin plan (2026-02-12): [Confluence](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/730188375)

## 📊 @AMER Outcomes Tracker (FY27 Q1)

- [ ] **Add AMER team names** - Update Lead and Team columns on [Confluence page](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/722949586)
- [ ] **Schedule sync with AMER engineering leads** - 25-min meeting to fill in timelines and validate milestones
- [ ] **Validate suggested milestones** - Review inferred milestones with epic owners
- [ ] **Update status and health** - Set In Progress / Green/Amber/Red once timelines confirmed

## 🔄 @Stale Dataset Restore MFE (Faster Cheaper Better Platform)

- [x] ~~**Push MFE to git.autodesk.com**~~ - Repo pushed and Jenkins job created
- [x] ~~**Create Jenkins multibranch pipeline**~~ - `adp-stale-dataset-restore-mfe` job created on CBCI
- [x] ~~**Verify CFP pipeline auto-discovery**~~ - Pipeline ran successfully, deployed to dev CFP CDN
- [x] ~~**Register MFE in Contentful**~~ - Both `dev-2024-09-24` and `master` environments (2026-02-25)
- [x] ~~**Fix runtime config bugs**~~ - Spindle URLs, token endpoint, API route, CFP env detection (2026-02-25)
- [x] ~~**Fix router basename mismatch**~~ - `/adp-stale-dataset-restore` → `/restore-stale-dataset` (2026-02-26)
- [x] ~~**Fix Contentful config**~~ - hidePageTitle, parent page consistency (2026-02-26)
- [x] ~~**Pivot to ADP Studio approach**~~ - Replaced Lambda API with SQL generator + ADP Studio execution (2026-02-27)
- [ ] **Commit and push ADP Studio pivot** - Push sqlGenerator.ts, updated RestoreForm/RestorePage, removed backend files
- [ ] **Trigger Jenkins rebuild** - Verify new build deploys to dev CFP
- [ ] **Verify MFE on Data Portal** - Confirm `https://data-dev.autodesk.com/restore-stale-dataset` loads with SQL generator UI
- [ ] **Test ALTER TABLE RENAME in ADP Studio** - Run generated SQL in ADP Studio Dev against a known `_adp_stale` table
- [ ] **Add Jest tests** - Cover sqlGenerator, datasetValidation, and RestoreForm
- [ ] **Review with Infra Triad** - Demo the zero-backend approach
- [ ] **Announce self-service restore** - Post in #tmp-ad-datalake-stale-dataset

## 🏗️ @Beacon System Model (Faster Cheaper Better Platform)

- [x] ~~**Create service inventory from adpcs-infra**~~ - Cataloged 27 services (12 components + 15 resources) with Beacon model mapping, business service IDs, monikers. Published to [Confluence](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/747679370) and local `/projects/beacon-representation/service-inventory.md` (2026-03-05)
- [x] ~~**Create service inventory from adp-temporal**~~ - Cataloged 7 services (4 components + 3 resources): Temporal Server, UI, Worker, Test, Aurora PostgreSQL DB, PKI/SG, Bastion. Updated [Confluence (CPDDPS)](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/747745980) and local `service-inventory.md`. Grand total now 34 services across both repos (2026-03-05)
- [x] ~~**Create `ad-platform-infrastructure` Domain YAML**~~ - Created `domains/ad-platform-infrastructure.yaml` with `realizationOf: capability:capabilities-map/insights-personalization` (2026-03-05)
- [x] ~~**Fix 3 broken domain refs**~~ - Updated `adp-central-data-lake`, `adp-core-services`, `adp-control-plane` from `domain:default/ad-infra` → `domain:pset/ad-platform-infrastructure` (2026-03-05)
- [x] ~~**Merge `ADPCP` into `adp-control-plane`**~~ - Moved 16 components from `ADPCP` → `adp-control-plane`; retired `ADPCP.yaml`; added explicit `hasPart` listing all 7 APIs + 16 components (2026-03-05)
- [x] ~~**Create `ad-data-lake` Product YAML**~~ - Created `products/ad-data-lake.yaml` with TechDocs ref, links, and `hasPart` for APIs + components (PR #909)
- [x] ~~**Create `adp-studio` Product YAML**~~ - Created `products/adp-studio.yaml` with System, 3 Components, 2 APIs (PR #909)
- [x] ~~**Publish plan to Confluence**~~ - Published (2026-02-27)
- [x] ~~**Production gap assessment**~~ - Completed (2026-02-27): confirmed all findings against production Beacon; identified 1 in-scope split-brain duplicate (ADPCP/adp-control-plane), 3 broken domain refs, 8 existing APIs, ADP Studio zero presence. CATALOG/metadata-manager and adp-self-service-system excluded from scope.
- [x] ~~**Push updated files to PR #909**~~ - Pushed domain YAML, system fixes, ADPCP merge, ASM compliance fixes to `add-ad-platform-products` branch (commit `82b5c8f`, 2026-03-05)
- [x] ~~**Resolve PR #909 merge conflicts**~~ - Merged latest staging into `add-ad-platform-products`, resolved 5 conflicts (pr-review.md, atf-sdk.yaml, 3 system YAMLs), pushed to fork (2026-03-10)
- [x] ~~**Align PR #909 with Autodesk System Model Standard**~~ - Products list only systems; systems partOf domain; product→system via hasPart; adp-studio system gains explicit hasPart (2026-03-10)
- [ ] **Seek BSM/ASM guidance on runtime vs control plane split** - Ask Beacon/IDP admin team how to separate runtime and control plane when modeled as one system ([[Kevin]] raised, no answer yet)
- [ ] **Seek BSM/ASM guidance on centralized service representation** - How should centralized services shared across regions be represented? Neither [[Abhilash]] nor [[Nitin Kakkar|Nitin]] knows
- [ ] **Define capability-level reporting taxonomy** - Formalize top-down taxonomy (Storage, Access, Query, Compute); collapse implementation details (e.g., KMS under Storage)
- [ ] **Create delivery timeline per capability** - Start/end dates for Storage, Access, Query, Compute; needed for external reporting
- [ ] **Scope down PR to bare minimum after Cloud OS meeting** - Based on [[Nitin Kakkar|Nitin]]'s Cloud OS sync outcome, trim PR to essentials for account provisioning
- [ ] **Publish open questions table to Confluence** - Append `inbox/beacon-open-questions-2026-03-12.md` to Beacon Representation Plan Confluence page
- [ ] **Review updated plan with Infra Triad** - Schedule 25-min review of Beacon representation plan (v0.9 — Phase 1 complete) at `/projects/beacon-representation/beacon-system-model-plan.md`
- [ ] **Register `adp-studio` business service** - Create ServiceNow business service for ADP Studio (currently uses Querybook's `4AFA5AF5` / `CSQRYBOK`)
- [ ] **Register `adp-temporal` in Beacon** - No `adsk.service.id`, `adsk.service.alias`, or `catalog-info.yaml` exists in adp-temporal repo. Needs Beacon catalog registration and OTEL resource attributes.
- [ ] **Redistribute 8 existing APIs** - Move `datafile-storage-api`, `hive-resource-api`, `domain-management-api` to `adp-central-data-lake`; `emr-spark-cluster-api` to `ad-datalake-compute`; `astro-tenant-api` to `ad-datalake-orchestration`; `user-data-access-api`, `svc-role-data-access-api` to `ad-datalake-access-control` (Phase 4)
- [ ] **Update Confluence page** - Update [Beacon Representation Plan](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/742000710) to v0.9 with Phase 1 completion

## 📖 @Beacon Documentation (Faster Cheaper Better Platform)

- [x] ~~**Split adpdatalakedocs into two repos**~~ - Completed (2026-02-27): Updated `adpdatalakedocs` (→ Product `ad-data-lake`) and created `adp-studio-docs` (→ Product `adp-studio`). Query content extracted from monolithic docs into 6 structured ADP Studio pages.
- [x] ~~**Create `ADP/adp-studio-docs` Git repo**~~ - Completed (2026-02-27): Repo created and pushed to `git@git.autodesk.com:ADP/adp-studio-docs.git`
- [x] ~~**Push updated `adpdatalakedocs` to Git**~~ - Completed (2026-02-27): Commit `7c69dc1` — catalog-info.yaml (Component→Product), mkdocs.yaml (query removed), index.md (Studio links), faq.md. Remote updated to `ADP/adpdatalakedocs`.
- [ ] **PR to pset-software-catalog** - Fork `openatadsk/pset-software-catalog`, push branch `add-ad-platform-products` with `products/ad-data-lake.yaml` and `products/adp-studio.yaml`. Files ready at local `/pset-software-catalog/products/`
- [ ] **Verify TechDocs build for AD Data Lake** - Check https://beacon.autodesk.com/catalog/pset/product/ad-data-lake/docs/
- [ ] **Verify TechDocs build for ADP Studio** - Check https://beacon.autodesk.com/catalog/pset/product/adp-studio/docs/
- [ ] **Review rendered docs for broken links** - Walk through all nav sections in browser for both products
- [ ] **Enhance tutorials.md** - Add step-by-step walkthroughs for common workflows
- [ ] **Announce docs update** - Post in #pset-ad-infra-support with link to Beacon staging
- [ ] **Push roadmap update to git** - Commit updated roadmap.md with Query Assistant, Recently Delivered section, Q2 items (2026-02-27)
- [ ] **Update Confluence roadmap page** - Sync updated roadmap to [AD Data Lake - Platform Roadmap (FY27)](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/726652959)
- [ ] **Post announcements to Slack** - Post Query Assistant and ADP Studio update announcements to #pset-ad-infra-announcements
- [x] ~~**Domain→Storage terminology update**~~ - 18 files updated, "Domain" replaced by "Storage" (associated with Projects), legacy API notes added (2026-02-12)
- [x] ~~**Astronomer→Platform-managed Airflow update**~~ - All Astronomer refs removed, Data Portal batch processing highlighted as preferred, Astro Tenant API marked with transition warning (2026-02-12)
- [x] ~~**Create user-facing platform roadmap**~~ - roadmap.md created from FY27 Q1 Outcome Tracker, published to Beacon + Confluence (2026-02-13)
- [x] ~~**Update roadmap with Query Assistant & Q2 items**~~ - Added Query Assistant as "Available Now", added Recently Delivered section, added Q2 items (Notebook, Dashboard Widgets, BI, Retention) (2026-02-27)
- [x] ~~**Draft ADP Studio announcements**~~ - Created two announcements (Query Assistant launch + ADP Studio improvements roundup) in Slack style (2026-02-27)

## 🖥️ @ADP Studio — DDL/DML Enablement (Next Gen. Data Experiences)

- [ ] **Schedule Triad decision meeting** - 25-min review with [[Ritesh]], [[Sankalp Vairat|Sankalp]], [[Abhilash]] by 2026-03-17; share [decision doc](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/751455021)
- [ ] **Discuss sandbox provisioning with [[Sankalp Vairat|Sankalp]]** - Validate Glue DB per-project approach and Trino routing for sandbox namespace
- [ ] **Confirm Trino Event Listener progress with [[Trupal Patel|Trupal]]** - ADPINFRA-1422 in current sprint; needed for Phase 1 audit events
- [ ] **Create JIRA tickets for Phase 1** - Sandbox Glue DB creation, ADP Studio sandbox routing, Privacera policies, sandbox engine/connection
- [ ] **Draft user announcement** - "DDL & DML Coming to ADP Studio — Sandbox-First Approach" for #ad-query-support

## 🖥️ @ADP Studio — PopSQL Transition & User Feedback (Next Gen. Data Experiences)

- [x] **Publish Feb feedback tracker to Confluence** - Created initial tracker with 6 items from Slack thread (2026-03-03)
- [x] **Consolidate feature & feedback tracker** - Merged feedback tracker + Querybook feature page into single [ADP Studio - Feature & Feedback Tracker (PopSQL Transition)](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/745193148) with Bugs, Feature Gaps, Roadmap, and PopSQL Migration Status (2026-03-03)
- [ ] **Create JIRA tickets for BUG-6 through BUG-11** - New UX bugs from [[Ryan Tan]]/[[Yann Laforest]]: tab switching, result panel collapse, execution panel clutter, excess headers, dark mode. Plus BUG-11 (commercial public schema access) from [[Sachidanand Sharma]]. Triage with [[Riya Loya|Riya]].
- [ ] **Follow up with [[Riya Loya|Riya]] on JIRA tickets** - Confirm tickets exist for all bugs (BUG-1 through BUG-11) and feature gaps (GAP-1 through GAP-12); get JIRA links
- [ ] **Reply to [[Ryan Tan]] / [[Yann Laforest]] in #query-support** - Acknowledge UX feedback, share tracker link, confirm bugs logged (BUG-6 to BUG-10)
- [ ] **Reply to [[Sachidanand Sharma]] / [[Sankalp Vairat|Sankalp]] in #query-support** - Confirm BUG-11 (commercial public schema access) logged; share finding that Privacera General policy only covers corp public schemas
- [ ] **Reply to [[Eddy Susanto]] in #query-support** - Confirm GAP-12 (org-wide dashboard sharing) logged; explain current limitation (individual user sharing only) and that share-link functionality is being tracked
- [ ] **Coordinate with Access team on `spindle_role_universal_readonly`** - Need Access team to add `spindle_role_universal_readonly` to all databases readonly role as nested role for commercial public schemas. One-time push for existing roles + update domain creation workflow. Coordinate with [[Trupal Patel|Trupal]].
- [ ] **Share consolidated tracker with stakeholders** - Send Confluence link to [[Yann Laforest|yann.laforest]], [[Rio Wei|rio.wei]], [[Ryan Tan|ryan.tan]], [[Sachidanand Sharma]], [[Eddy Susanto]], and other reporters with a summary of what's covered
- [ ] **Escalate data export priority (GAP-1)** - Two separate users flagged export as adoption blocker; needs a target date or escalation
- [ ] **Decide PopSQL import blockers with [[Riya Loya|Riya]]** - Folder support (GAP-2), user mapping (GAP-10), connection mapping (GAP-9) all block the import script
- [ ] **Confirm DDL enablement timeline with [[Sankalp Vairat|Sankalp]]** - DDL ops (GAP-5) targeted for next sprint; verify no blockers
- [ ] **Check lineage spike progress with [[Trupal Patel|Trupal]]** - ADPINFRA-1422 in current sprint; [[Trupal Patel|Trupal]] syncing with MDM team on field requirements

## 🤖 @Unified Infrastructure MCP Server (Next Gen. Data Experiences)

- [ ] **Schedule alignment meeting with [[Sankalp Vairat|Sankalp]]** - Consolidate 4 fragmented MCP efforts into single roadmap; [[Sankalp Vairat|Sankalp]] committed to documenting current state this week
- [ ] **Review PRD with Infra Triad** - Schedule 50-min review of Unified Infrastructure MCP Server PRD
- [ ] **Prioritize ADPPICSERV-392** - Use PRD to formally rank epic for upcoming sprint
- [ ] **Instantiate Beacon Universal MCP Server Template** - Create MCP server scaffold via Beacon template; select Node.js/TypeScript runtime + Internal Entra SSO auth; generate CloudOS deployment definitions (M1 target: 2 weeks)
- [ ] **Self-service Entra App Registration** - Register MCP server as internal-only Entra app (self-service via Beacon template, no identity team dependency)
- [ ] **Coordinate Trino API access with APAC** - Add MCP server CloudOS pod CIDR to Trino REST API allowlist
- [ ] **Confirm MCP Registry compatibility** - Check with Intelligence Team that non-AA MCP servers are accepted
- [ ] **Register MCP server on MCP Registry (dev)** - Register at data.autodesk.com/mcp-registry with product context: AD Platform Infrastructure
- [ ] **Reply in #adp-community thread** - Share PRD link and MCP server roadmap in the community thread
- [ ] **Reply in consolidation thread** - Share PRD in [#C07H420AQE5](https://autodesk.slack.com/archives/C07H420AQE5/p1772564301727309) with [[Sankalp Vairat|Sankalp]]'s input
- [x] ~~**Create PRD for Unified Infrastructure MCP Server**~~ - Published to Confluence (2026-03-03): [PRD](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/745443128)
- [x] ~~**Integrate Beacon Universal MCP Server Template into PRD**~~ - Updated PRD v0.2: CloudOS deployment, Entra SSO / CIMD auth, compressed M1, mitigated R3, resolved I3 (2026-03-03)

## 📊 @ADP Studio Usage Dashboard (Next Gen. Data Experiences)

- [x] ~~**Explore adpcs-infra repo**~~ - Mapped all QueryBook data sources (query_execution, event_log, impression, user, data_doc, board) (2026-03-03)
- [x] ~~**Create backend business logic**~~ - `logic/usage_analytics.py` with 8 SQLAlchemy query functions (2026-03-03)
- [x] ~~**Create admin API endpoints**~~ - `datasources/admin_usage_analytics.py` with 6 endpoints (dashboard, trends, engines, collaboration, features, export) (2026-03-03)
- [x] ~~**Create frontend dashboard**~~ - `AdminUsageDashboard.tsx` with KPIs, trend charts, engine breakdown, collaboration, features (2026-03-03)
- [x] ~~**Register route and sidebar**~~ - Added to AppAdmin.tsx, types.ts, AdminAppEntitySidebar.tsx (2026-03-03)
- [ ] **Deploy to dev environment** - Push changes to adpcs-infra, trigger Jenkins build
- [ ] **Verify API endpoints on dev** - Test all 6 `/admin/usage/` endpoints against dev MySQL
- [ ] **Test frontend on dev** - Navigate to `/admin/usage/` in ADP Studio dev
- [ ] **Review with Infra Triad** - Demo dashboard and get sign-off for production deployment
- [ ] **Publish dashboard docs to Confluence** - Create page under personal space with metric definitions and FY27 alignment
- [ ] **Create JIRA ticket** - For code review and production deployment

## 📢 @PopSQL → ADP Studio Migration (Next Gen. Data Experiences)

- [ ] **Send Slack announcement** — Post to #ad-query-support, #pset-ad-infra-support, #adp-community (text in `/projects/popsql-migration/announcement.md`)
- [ ] **Send targeted email** — Email to all 360 PopSQL users (template in announcement.md)
- [ ] **Publish Contentful entries** — Publish 3 customRichText entries + 1 page entry to make migration page live on data.autodesk.com/data-lake/query-interfaces/popsql-migration
- [ ] **Send Reminder #1 (Mar 24)** — "3 weeks to cut-off" reminder in Slack
- [ ] **Send Reminder #2 (Apr 7)** — "10 days to cut-off" reminder in Slack
- [ ] **Send Final Reminder (Apr 14)** — "3 days to cut-off" final reminder in Slack
- [ ] **Confirm import script on track** — Check with [[Sankalp Vairat|Sankalp]]/[[Riya Loya|Riya]] that GAP-11 (PopSQL Import Script) is prioritized for next sprint
- [ ] **Validate user mapping strategy** — 360 PopSQL users need SSO mapping; decide skip/placeholder/default-owner strategy (GAP-8)
- [ ] **Validate connection mapping** — 103 PopSQL connections → ADP Studio engine IDs (GAP-5)
- [ ] **Confirm DDL lands before cut-off** — DDL (GAP-2) targeted for next sprint; must be live before Apr 17
- [x] ~~**Update old Contentful link**~~ — Replaced "Setup Query Interface - Dbeaver or Popsql" entry (`65v8wd9xYjGZrM6SDdo7fC`) with "Get Started with ADP Studio" pointing to ADP Studio User Guide (2026-03-10)
- [x] ~~**Update Contentful intro text**~~ — Updated `customRichText` entry `4rEnrmQ9oZdxsJKynhGD2c`: removed "in preview" note, added migration/deprecation note with bold callout (2026-03-10)
- [x] ~~**Update Contentful button card**~~ — Updated `buttonCard` entry `I9pytHYKJ6GBR0RuOK1tA`: removed "among other options", now reads "ADP Studio for interactive querying, developing SQL-based data pipelines, and visualizations" (2026-03-10)
- [x] ~~**Update Confluence Querying page**~~ — Added "Recommended: Query via ADP Studio" section + deprecation banners to PopSQL and DBeaver sections on page 333631901 (2026-03-10)
- [x] ~~**Update Confluence PopSQL User Guide**~~ — Added deprecation banner at top of page 333827905 with sunset date, auto-migration details, and ADP Studio link (2026-03-10)
- [x] ~~**Update Query Interfaces page with platform strategy**~~ — Rewrote intro entry `6io0Q6IzsduPXiUO5fqP9R` with strategic framing (ADP Studio + AMP Model Lab as recommended; Snowflake/Looker as supported; PopSQL/DBeaver deprecated; Atlan/EMR disabled). Re-published page entry to force CDN refresh (2026-03-11)
- [x] ~~**Add Docs and Feedback links to ADP Studio page**~~ — Created `customRichText` entry `31nPL0iEvKoISfAVyOOgIL` ("ADP Studio - Top Links") with hyperlinks to [Beacon TechDocs](https://beacon-stg.autodesk.com/catalog/pset/component/adp-studio-docs/docs) and [#ad-query-support Slack](https://autodesk.enterprise.slack.com/archives/C099A91SXAN). Added to `titledSection` `6i9O0F1UH6ZRREQ3oZP2Sa` as first content item on query-experience page. Published (2026-03-11). Note: right-justification requires a frontend CSS change in the Data Portal app — Contentful rich text doesn't support text alignment.

## 📄 @Data Download Opinion Piece (Next Gen. Data Experiences)

- [x] ~~**Draft opinion piece**~~ — Created one-page opinion piece arguing FOR allowing S3 data downloads to Autodesk-managed devices with tiered controls (2026-03-11)
- [x] ~~**Industry deep-dive research**~~ — Comprehensive sourced analysis of Stripe, Figma, Dropbox, Atlassian, Box covering data lake architecture, download controls, DLP, endpoint security, Zero Trust posture. Key finding: no company uses blanket prohibition; all use classification-based controls with audit logging. Saved to `/projects/data-download-opinion/industry-research-saas-data-governance.md` (2026-03-17)
- [ ] **Validate endpoint controls with IT** — Confirm FileVault/BitLocker enforcement, DLP agent deployment (Purview/Forcepoint?), and MDM platform (Jamf/Intune?) with Autodesk IT
- [ ] **Share opinion piece + industry research with Security & Compliance** — Send both documents for feedback; ask for their data on existing local data handling (PowerBI, Excel, ERP)
- [ ] **Present to leadership** — Schedule 25-min review with relevant stakeholders; use MMM "Difficult Conversation" framing if pushback expected
- [ ] **Publish to Confluence** — Publish opinion piece and industry research to personal Confluence space

## 🗄️ @MAP Domain — Legacy Schema Migration ([[Venkatesh]]/MAP Team)

- [ ] **Confirm no data in legacy schemas** - Run `SHOW TABLES IN map_public` / `map_private` via ADP Studio; check S3 paths with `SHOW CREATE SCHEMA`
- [ ] **Coordinate cleanup with [[Trupal Patel|Trupal]]** - Schedule quick sync to execute Hive DROP SCHEMA, Snowflake DROP SCHEMA, MDM deregistration for legacy `map` domain
- [ ] **Execute Create Storage API** - After cleanup, `POST /ad-infra/v1/storage` with `storage_name: map`, `storage_type: corporate`, `project_id: 3fcf4cd4-f6ae-4c75-a495-5e21431421e6`
- [ ] **Verify provisioning** - Poll `GET /ad-infra/v1/storage/map` until status is `complete`
- [ ] **Notify [[Venkatesh]]** - Confirm new schemas (map_raw_ingest, map_internal_public, map_internal_private, etc.) are available in Data Portal

## 🔬 @ADP Studio User Research (Next Gen. Data Experiences)

- [x] ~~**Structure research findings from Rio Wei + Ashwini Joshi interviews**~~ — Mapped findings to 10 user journey stages, identified 3 cross-cutting themes, 10 prioritized opportunities (2026-03-17)
- [x] ~~**Publish research findings to Confluence**~~ — [ADP Studio — User Research Findings (March 2026)](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/760840382) (2026-03-17)
- [ ] **Share findings with ADP Studio team** — Send Confluence link to [[Sankalp Vairat|Sankalp]], [[Riya Loya|Riya]], and ADP Studio engineering leads
- [ ] **Schedule Louise interview** — Rio referenced colleague Louise who builds interactive dashboards in Cursor; follow up for deeper insight on dashboard/viz use case
- [ ] **Collect Ashwini's negative examples** — Ashwini promised to share examples of what Query Assistant can't do well in Snowflake; follow up
- [ ] **Update PRD User Research section** — Add research findings link and updated persona table to [ADP Studio PRD](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333819421) Feedback section
- [ ] **Validate opportunity priorities with Triad** — Review P0-P3 opportunity ranking with [[Ritesh]], [[Sankalp Vairat|Sankalp]]

## 🔬 @Research (Data Governance Benchmarking)

- [ ] **Clarify Netflix/Uber research into governance recommendations** — Review `inbox/data-lake-governance-research-netflix-uber-2026-03-17.md` and extract actionable patterns for AD Platform data governance strategy (purpose-based access control, AI-driven classification, column-level encryption)

## ✅ Completed Today

*Move items here as they're done*

- [x] **Investigated ADP Studio MFE responsiveness on Data Portal** (2026-03-18) — Analyzed all three layers: Contentful genericPage (no fullWidth field exists), `adp-query-exp-mfe` (Grid/iframe all `width: 100%`, zero max-width), and Querybook (QueryComposer uses `width: 100%`). Confirmed bottleneck is the Data Portal shell's fixed-width content container for genericPage. Drafted Slack message requesting `fullWidth` boolean field for genericPage from AnD/Data Portal team. Added to Waiting For and Agenda.
- [x] **Updated Querybook Help button to point to Beacon TechDocs** (2026-03-18) — Changed `InfoMenuButton.tsx` in `adpcs-infra/infra/querybook`: updated Help menu link from `data.autodesk.com/querybook` to Beacon staging TechDocs (`beacon-stg.autodesk.com/catalog/pset/component/adp-studio-docs/docs`). Renamed label/tooltip/aria from "QueryBook User Guide" to "ADP Studio User Guide". Needs commit + deploy via adpcs-infra pipeline.
- [x] **Industry deep-dive research on SaaS data governance** (2026-03-17) — Researched Stripe, Figma, Dropbox, Atlassian, Box on data download controls, DLP, endpoint security, and Zero Trust. 5-company comparison matrix with sourced findings. Saved to `projects/data-download-opinion/industry-research-saas-data-governance.md`. Supports opinion piece for stakeholder review.
- [x] **Updated Data Lake roadmap link to Beacon TechDocs** (2026-03-17) — Changed "Open Roadmap" link (`5BK5Sk6BPhlT3mS0nudWYy`) from Productboard to Beacon staging TechDocs roadmap page. Published.
- [x] **Fixed fabricated content in Compute & Orchestration pages** (2026-03-17) — Removed fabricated cluster sizing tiers ("Small to X-Large") and "Graviton instances" from Compute Key Features. Removed "Right-size Airflow workers" from Orchestration Use Cases (platform-managed, not user-controlled). All entries re-published.
- [x] **Structured ADP Studio user research findings** (2026-03-17) — Analyzed Rio Wei + Ashwini Joshi interviews, mapped to PRD user journey stages, identified 10 opportunities. Published to [Confluence](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/760840382) and local `projects/adp-studio-research/user-research-findings.md`
- [x] **Created Compute Clusters content page on Data Portal** (2026-03-17) — Created Contentful `page` entry (about-compute-clusters) with Introduction, Key Features, and Use Cases customRichText entries. Published to data.autodesk.com
- [x] **Created Orchestration content page on Data Portal** (2026-03-17) — Created Contentful `page` entry (about-orchestration) with Introduction, Key Features, and Use Cases customRichText entries. Published to data.autodesk.com
- [x] **Fixed Learn More links on Data Lake page** (2026-03-17) — Created new link entry for Compute Clusters card (was incorrectly pointing to Data Storage). Updated Orchestration link entry to point to new Orchestration page (was pointing to deprecated Confluence wiki). Both buttonCards and links published.
- [x] **Signed off from Snowflake cost optimization project** (2026-03-12) — All Snowflake stale dataset discovery, outreach, and deprecation actions closed out

---

*Last Updated: 2026-03-18*

---

**Navigation:** [[Home]] | [[GTD/goals|Goals]] | [[GTD/Projects|Projects]] | [[GTD/Waiting_For|Waiting For]] | [[GTD/Agenda|Agenda]]

