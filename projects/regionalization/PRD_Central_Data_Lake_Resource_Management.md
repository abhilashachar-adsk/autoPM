# Central Data Lake - Regionalized Resource Management PRD

**Confluence Page:** *To be published*

**Other working titles:** "Regionalized Data Lake", "Central Data Lake Resource Management", "Multi-Region Infrastructure Services"

| **Target Releases** | FY27 Q1–Q3 |
|---------------------|------------|
| **Document Status** | 📝 Draft |
| **Document Owner** | Abhilash Achar |
| **Team** | AD Platform Infrastructure Triad |
| **Program** | Data Lake as a Product |
| **Parent Initiative** | [AD Data Lake - PRD](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333859875/AD+Data+Lake+-+PRD) |

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Problem Statement](#problem-statement)
3. [Goals & Success Outcomes](#goals--success-outcomes)
4. [User Personas](#user-personas)
5. [Regionalization Requirements](#regionalization-requirements)
6. [Resource Management Requirements](#resource-management-requirements)
7. [Unified Resource MFE Scope](#unified-resource-mfe-scope)
8. [User Stories](#user-stories)
9. [Non-Functional Requirements](#non-functional-requirements)
10. [Architecture Overview](#architecture-overview)
11. [Dependencies](#dependencies)
12. [Milestones & Delivery Plan](#milestones--delivery-plan)
13. [RAID Log](#raid-log)
14. [Appendix](#appendix)

---

## Executive Summary

This PRD defines the product requirements for **regionalizing the AD Central Data Lake** and delivering a **unified resource management experience** through the Data Portal. It consolidates three converging Q1 FY27 strategic outcomes into a single product vision:

| Q1 Outcome | Initiative | What This PRD Covers |
|------------|------------|---------------------|
| **DataOS Compute Onboarding & Zero Trust** | Regionalization (PSET) | Compute automatically onboarded to DataOS with regional compliance |
| **Regionalized Infrastructure Services** | Regionalization (PSET) | Storage, Compute, and Orchestration deployed per region |
| **Self-Service Portal for Ingestion & Processing** | Self Service Fulfillment | Self-service onboarding without tickets |
| **Project Resource Management** | Self Service Fulfillment | Single UI for storage, compute, orchestration lifecycle |
| **Resource Utilization, Observability & Lifecycle** | Faster Cheaper Better | Observability, cost visibility, automated lifecycle |

**Why one PRD?** Regionalization is not just an infrastructure change — it fundamentally reshapes how resources are provisioned, viewed, managed, and governed. A regionalized Data Lake requires a regionalized resource management experience. Delivering these as separate products would create fragmented UX and duplicated engineering effort. This PRD ensures:

1. **Every resource is region-aware from creation** — no retrofitting
2. **Self-service provisioning respects regional boundaries** — compliance by default
3. **Observability surfaces regional context** — cost, utilization, and compliance per region
4. **The Unified Resource MFE is the single interface** — for all regions, all resource types

**Strategic Context:**
- Autodesk's PSET Regionalization initiative requires all AD infrastructure to support multi-region deployment by Q2 FY27 (EMEA)
- Data residency (GDPR, Schrems II) is a company-level priority and a hard dependency for Q2 customer deployments
- The current `adp-infra-project-resources-mfe` manages storage (Hive/Snowflake) and orchestration — but is single-region, lacks compute management, and has no lifecycle/retention capabilities
- The Q1 foundation enables Q2's EMEA Data Lake Deployment (Outcome 8 in goals.md)

---

## Problem Statement

### Current State Challenges

| Challenge | Impact | Evidence |
|-----------|--------|----------|
| **Single-region infrastructure** | Cannot serve EMEA customers; GDPR non-compliance for regulated data | All Data Lake resources deployed in us-east-1 only |
| **No region-aware provisioning** | New resources default to US; no mechanism to specify target region | `CreateDomainModal` has no region selector |
| **Fragmented resource management** | Users manage storage, compute, and orchestration through different tools and ticket queues | 20% of support tickets are resource provisioning requests |
| **No unified compute management** | No self-service compute provisioning; EMR clusters managed manually | Platform team manually creates EMR clusters per project |
| **No lifecycle or retention in UI** | Data retention policies exist but not surfaced; no self-service extension or deprecation | ADPPICSERV-386 retention requirements not yet integrated |
| **No observability integration** | Users cannot see resource utilization, cost, or health in one place | Separate dashboards for storage, compute, CNS alerts |
| **Manual compliance verification** | Zero Trust controls applied manually per deployment; no automated compliance checking | Each regional deployment requires manual security review |

### Impact on Q2 EMEA Deployment

Without Q1 regionalization foundations, Q2's EMEA Data Lake deployment (Outcome 8) will face:
- No automated regional provisioning → manual setup for each EMEA tenant
- No region-aware UI → users cannot distinguish US vs EMEA resources
- No regional compliance dashboard → manual verification of data residency
- No regional lifecycle policies → GDPR retention requirements unenforceable at scale

---

## Goals & Success Outcomes

### Primary Objective

Deliver a **region-aware, self-service resource management platform** for the AD Data Lake that enables teams to provision, configure, observe, and manage the full lifecycle of storage, compute, and orchestration resources — in any supported region — through a single unified interface.

### Success Metrics

| Metric | Baseline (Current) | Q1 FY27 Target | Q2 FY27 Target | Measurement |
|--------|--------------------|-----------------|-----------------| ------------|
| **Unapproved cross-region events** | Unmeasured | 0 | 0 | Regional audit logs |
| **Infrastructure services deployable per region** | US only | Storage + Compute + Orchestration regionalized | EMEA tenant operational | Deployment inventory |
| **Resource provisioning time** | Days (ticket-based) | Hours (self-service) | <10 minutes | Provisioning API metrics |
| **Resource management via self-service** | ~20% | >50% | >80% | Ticket volume vs. MFE usage |
| **Resource availability** | Unmeasured | >99.5% | >99.5% | Platform SLA monitoring |
| **Manual interventions for provisioning** | Most requests | <30% of requests | Zero for standard requests | Support ticket analysis |
| **Unutilized resources identified** | 0% | 50% flagged | 80% cleaned up | Lifecycle automation |

### Alignment with Q1 Slide Outcomes

| Slide | "What are we changing?" | PRD Requirement |
|-------|------------------------|-----------------|
| Slide 1 | Manual compliance → compute auto-onboarded to DataOS with Zero Trust | REG-01: Regional Compute Onboarding |
| Slide 2 | Single-region infra → Storage, Compute, Orchestration regionalized | REG-02 through REG-06: Regional Services |
| Slide 4a | Ticket-based provisioning → self-service portal | RM-01 through RM-04: Self-Service Provisioning |
| Slide 4b | Multiple tools → single UI with Infrastructure APIs | MFE-01 through MFE-10: Unified Resource MFE |
| Slide 5 | No visibility → automated observability with CNS | OBS-01 through OBS-04: Observability & Lifecycle |

---

## User Personas

### Primary Personas

| Persona | Description | Regional Needs | Resource Management Needs |
|---------|-------------|----------------|--------------------------|
| **Platform User (Data Engineer)** | Builds and operates data pipelines on the lake | Deploy workloads in correct region; no cross-region leakage | Provision storage, compute, orchestration self-service |
| **Data Owner / Tech Lead** | Manages a project's data portfolio and team resources | Understand regional footprint; manage retention per region | Single view of all project resources with cost/utilization |
| **Platform Administrator** | Manages platform-wide infrastructure and compliance | Deploy infrastructure in new regions; verify compliance | Platform-wide view of all resources across regions |

### Secondary Personas

| Persona | Description | Needs |
|---------|-------------|-------|
| **Security & Compliance Stakeholder** | Verifies Zero Trust, data residency, GDPR | Regional compliance dashboards; audit logs per region |
| **Finance Partner** | Tracks infrastructure costs by region, team, project | Regional cost attribution; chargeback by region |
| **Regional Operations Team (EMEA)** | Operates workloads in EMEA region | Region-specific resource provisioning and monitoring |

---

## Regionalization Requirements

### REG-01: Regional Compute Onboarding (DataOS)

**As a** Platform User deploying data workloads  
**I want** my compute to be automatically onboarded to platform-managed Kubernetes clusters (DataOS) with Zero Trust and Security compliance built in  
**So that** I can operate regional workloads without manual configuration or compliance friction.

| Requirement | Description | Priority |
|-------------|-------------|----------|
| REG-01.1 | Compute provisioning API accepts `region` parameter (e.g., `us-east-1`, `eu-west-1`) | Must Have |
| REG-01.2 | DataOS clusters deployed per region with Zero Trust networking (no public endpoints, mTLS) | Must Have |
| REG-01.3 | Compute auto-onboards to regional DataOS cluster based on project's region assignment | Must Have |
| REG-01.4 | Zero unapproved cross-region compute events (data processed only in assigned region) | Must Have |
| REG-01.5 | Compute onboarding completes without manual security review for pre-approved regions | Should Have |

**Acceptance Criteria:**
- A new EMR on EKS virtual cluster can be provisioned in any supported region via API
- The cluster inherits Zero Trust controls (IAM roles, security groups, network policies) from DataOS
- Cross-region compute access is blocked by network policy (no pod in `eu-west-1` can access data in `us-east-1`)
- Audit log captures region of every compute operation

---

### REG-02: Regionalized Storage (S3 / Glue Data Catalog)

**As a** Platform User  
**I want** my project's storage (S3 buckets, Glue databases/tables) provisioned in the correct region  
**So that** data residency requirements are satisfied and I don't need to manually configure regional storage.

| Requirement | Description | Priority |
|-------------|-------------|----------|
| REG-02.1 | Storage provisioning API accepts `region` parameter | Must Have |
| REG-02.2 | S3 buckets created in the specified region with bucket policy enforcing regional access | Must Have |
| REG-02.3 | Glue Data Catalog databases/tables created in regional Glue catalog | Must Have |
| REG-02.4 | Existing US storage remains in US; no cross-region data migration during regionalization | Must Have |
| REG-02.5 | Storage cards in MFE display region badge (e.g., "US-East-1", "EU-West-1") | Must Have |
| REG-02.6 | Cross-region S3 access blocked by bucket policy (no reads/writes from outside assigned region) | Must Have |

**Acceptance Criteria:**
- A new Hive domain created for an EMEA project has S3 bucket in `eu-west-1`
- Glue database for that domain exists in the `eu-west-1` Glue catalog
- Attempting to access EMEA data from US compute is denied
- Storage page in MFE shows the region for each domain

---

### REG-03: Regionalized Compute (EMR on EKS)

**As a** Platform User  
**I want** my project's compute resources (EMR on EKS clusters) deployed in the same region as my data  
**So that** I get optimal performance and comply with data residency requirements.

| Requirement | Description | Priority |
|-------------|-------------|----------|
| REG-03.1 | EMR virtual clusters provisioned on regional DataOS EKS clusters | Must Have |
| REG-03.2 | Compute size configurations (small/medium/large/xlarge) available per region | Must Have |
| REG-03.3 | Graviton instance types default for all new regional compute | Should Have |
| REG-03.4 | Compute page in MFE shows region, instance type, and cluster status | Must Have |
| REG-03.5 | Cross-region compute-to-storage access denied by IAM policy | Must Have |

**Acceptance Criteria:**
- A project assigned to `eu-west-1` gets EMR virtual cluster on EMEA DataOS
- Spark jobs submitted from EMEA compute access only EMEA S3 buckets
- MFE compute tab shows region and Graviton badge for eligible clusters

---

### REG-04: Regionalized Orchestration (OSS Airflow on DataOS)

**As a** Platform User  
**I want** my workflow orchestration (OSS Airflow) deployed in the same region as my data and compute  
**So that** my pipeline execution respects regional boundaries.

**Strategy Change (Feb 2026):** The orchestration layer is shifting from Astro (managed Airflow) and Temporal to **OSS Apache Airflow** deployed on DataOS (EKS). This consolidates orchestration onto a single, platform-managed open-source solution running on the same Kubernetes infrastructure as Spark compute. OSS Airflow will be deployed per-region using Helm charts on DataOS clusters, with KubernetesExecutor for task-level pod isolation.

| Requirement | Description | Priority |
|-------------|-------------|----------|
| REG-04.1 | OSS Airflow deployed on regional DataOS clusters via Helm chart with KubernetesExecutor | Must Have |
| REG-04.2 | Orchestration API accepts `region` parameter for Airflow environment provisioning | Must Have |
| REG-04.3 | Orchestration page in MFE shows region per Airflow environment and DAGs | Should Have |
| REG-04.4 | Airflow task pods restricted to same-region compute and storage access | Must Have |
| REG-04.5 | Airflow metadata DB (PostgreSQL) deployed in-region for data residency | Must Have |
| REG-04.6 | DAG deployment pipeline supports regional targeting (deploy DAGs to specific region) | Should Have |

**Acceptance Criteria:**
- An OSS Airflow environment provisioned for an EMEA project runs entirely on EMEA DataOS
- Airflow task pods (KubernetesExecutor) cannot access cross-region S3 buckets
- Airflow metadata DB resides in the same region as the Airflow deployment
- Orchestration page in MFE displays Airflow environment, DAGs, and regional context
- Migration path from Astro tenants to OSS Airflow environments documented

---

### REG-05: Regional Project Assignment

**As a** Platform Administrator  
**I want** to assign a project to a specific region at onboarding time  
**So that** all resources provisioned for that project are automatically in the correct region.

| Requirement | Description | Priority |
|-------------|-------------|----------|
| REG-05.1 | Project onboarding includes region selection (US / EMEA / APAC-future) | Must Have |
| REG-05.2 | Once assigned, project region is immutable (to prevent accidental cross-region migration) | Must Have |
| REG-05.3 | All downstream resource provisioning inherits project region | Must Have |
| REG-05.4 | Spindle project metadata includes `region` field | Must Have |
| REG-05.5 | Multi-region projects (resources in multiple regions) supported as future phase | Nice to Have |

**Acceptance Criteria:**
- A new project created with region "EMEA" has all storage, compute, orchestration in `eu-west-1`
- Attempting to change a project's region after creation returns an error
- Spindle API returns `region` field for project metadata

---

### REG-06: Regional Compliance & Audit

**As a** Security & Compliance Stakeholder  
**I want** automated compliance verification for regional data residency  
**So that** I can confirm zero cross-region data events without manual review.

| Requirement | Description | Priority |
|-------------|-------------|----------|
| REG-06.1 | Automated daily audit of cross-region access attempts (S3, compute, orchestration) | Must Have |
| REG-06.2 | Compliance dashboard showing regional compliance status per project | Should Have |
| REG-06.3 | Alert (CNS) triggered on any cross-region access attempt | Must Have |
| REG-06.4 | Monthly compliance report exportable for audit (GDPR, Schrems II) | Should Have |
| REG-06.5 | All regional lifecycle actions logged (create, modify, deprecate, delete) | Must Have |

**Acceptance Criteria:**
- Dashboard shows "100% compliant" when zero cross-region events detected
- Alert fires within 15 minutes of a cross-region access attempt
- Monthly report includes: project, region, resource count, compliance status, exceptions

---

## Resource Management Requirements

### RM-01: Self-Service Storage Provisioning

**As a** Platform User  
**I want** to create new storage (Hive domains) through a self-service portal  
**So that** I can start ingesting data without waiting on platform team tickets.

| Requirement | Description | Priority |
|-------------|-------------|----------|
| RM-01.1 | CreateDomain workflow supports regional storage creation | Must Have |
| RM-01.2 | Domain creation form includes data classification (Confidential-Restricted, Need-to-Know, Internal-Use-Only) | Must Have |
| RM-01.3 | Domain creation form includes workspace type (HIVE, with SNOWFLAKE and ICEBERG as future) | Must Have |
| RM-01.4 | Provisioning completes within 10 minutes for standard requests | Must Have |
| RM-01.5 | Region is auto-populated from project assignment (REG-05) | Must Have |
| RM-01.6 | Environment selection (dev/stg/prd) with appropriate access controls | Must Have |

---

### RM-02: Self-Service Compute Provisioning

**As a** Platform User  
**I want** to provision compute resources (EMR on EKS) through the resource management UI  
**So that** I can run data processing workloads without managing infrastructure.

| Requirement | Description | Priority |
|-------------|-------------|----------|
| RM-02.1 | Compute provisioning form with predefined size configurations (small/medium/large/xlarge) | Must Have |
| RM-02.2 | Each size maps to specific instance types, vCPU, memory, and estimated cost/hour | Must Have |
| RM-02.3 | Region auto-populated from project assignment | Must Have |
| RM-02.4 | Graviton instances default; x86 available as override with justification | Should Have |
| RM-02.5 | Compute provisioning completes within 10 minutes | Must Have |
| RM-02.6 | Compute status visible in MFE (provisioning, running, stopped, terminated) | Must Have |

**Predefined Compute Configurations:**

| Size | vCPU | Memory | Instance Type | Est. Cost/Hour |
|------|------|--------|---------------|----------------|
| Small | 4 | 16 GB | m7g.xlarge (Graviton) | ~$0.16 |
| Medium | 8 | 32 GB | m7g.2xlarge (Graviton) | ~$0.33 |
| Large | 16 | 64 GB | m7g.4xlarge (Graviton) | ~$0.65 |
| X-Large | 32 | 128 GB | m7g.8xlarge (Graviton) | ~$1.30 |

---

### RM-03: Self-Service Orchestration Management

**As a** Platform User  
**I want** to view, configure, and manage my project's orchestration resources (OSS Airflow environments)  
**So that** I can control workflow execution without submitting tickets.

| Requirement | Description | Priority |
|-------------|-------------|----------|
| RM-03.1 | View Airflow environment status (healthy, degraded, down) and component health (scheduler, webserver, workers) | Must Have |
| RM-03.2 | Configure Airflow worker resources (CPU, memory, parallelism) from predefined sizes | Should Have |
| RM-03.3 | View DAG list with schedule, last run status, and success rate | Must Have |
| RM-03.4 | Link to Airflow Webserver UI for DAG execution details and log inspection | Should Have |
| RM-03.5 | Region context shown for all orchestration resources | Must Have |
| RM-03.6 | View Airflow connections and variables (read-only, secrets masked) | Nice to Have |

---

### RM-04: Resource Lifecycle & Retention Management

**As a** Data Owner  
**I want** to manage retention policies and lifecycle status of my resources through the same interface  
**So that** I can ensure compliance without separate tools.

| Requirement | Description | Priority |
|-------------|-------------|----------|
| RM-04.1 | Retention policy displayed per storage domain (data classification → retention period) | Must Have |
| RM-04.2 | Compliance status badges: Compliant, Expiring Soon, Action Required, Legal Hold | Must Have |
| RM-04.3 | Self-service retention extension request with business justification | Must Have |
| RM-04.4 | Retention enforcement respects regional boundaries (EMEA data deleted in EMEA) | Must Have |
| RM-04.5 | Lifecycle status for compute and orchestration: Active, Idle, Stale, Scheduled-for-Cleanup | Should Have |
| RM-04.6 | 30-day recovery window for all deprecated resources | Must Have |

---

### RM-05: Resource Observability & Cost Visibility

**As a** Data Owner  
**I want** to see utilization, cost, and health metrics for all my project resources  
**So that** I can optimize spend and govern workloads without platform team intervention.

| Requirement | Description | Priority |
|-------------|-------------|----------|
| RM-05.1 | Storage utilization: total size, growth trend, stale data percentage | Must Have |
| RM-05.2 | Compute utilization: CPU/memory usage, job success rate, idle time | Must Have |
| RM-05.3 | Cost attribution: monthly cost per resource type, per region, per environment | Must Have |
| RM-05.4 | CNS alert integration: surface active alerts for project resources | Should Have |
| RM-05.5 | Utilization recommendations: flag idle compute, stale storage, oversized clusters | Should Have |
| RM-05.6 | Cost trend charts (30/60/90 day) per project and per region | Should Have |

---

## Unified Resource MFE Scope

### MFE-01: Architecture

The Unified Resource MFE extends the existing `adp-infra-project-resources-mfe` with:

| Current State | New State |
|---------------|-----------|
| Storage page (Hive, Snowflake domains) | Storage page + Regional context + Retention management |
| Orchestration page (placeholder) | Orchestration page (OSS Airflow environment & DAG management) |
| No compute management | **New:** Compute page (EMR on EKS management) |
| No observability | **New:** Observability dashboard (utilization, cost, alerts) |
| No lifecycle management | **New:** Lifecycle tab (retention, compliance, cleanup) |
| Single-region assumption | **Updated:** Region-aware throughout all pages |

### MFE-02: Navigation Structure

```
Project Resources (adp-infra-project-resources-mfe)
├── Overview Dashboard (NEW)
│   ├── Resource Summary (storage, compute, orchestration counts by region)
│   ├── Cost Summary Widget
│   ├── Compliance Status Widget
│   └── Recent Activity
├── Storage
│   ├── Domain List (existing, + region badge)
│   ├── Domain Details (existing, + retention tab)
│   ├── Create Domain (existing, + region auto-fill)
│   └── Retention Management (NEW)
├── Compute (NEW)
│   ├── Cluster List (EMR on EKS clusters)
│   ├── Cluster Details (status, size, region, utilization)
│   ├── Create Cluster (size selection, region auto-fill)
│   └── Cluster Configuration (scale up/down)
├── Orchestration
│   ├── Airflow Environment (status, components, region)
│   ├── DAG List (schedule, last run, success rate)
│   ├── DAG Run History (recent runs with status)
│   └── Link to Airflow Webserver UI
└── Observability (NEW)
    ├── Utilization Dashboard (CPU, memory, storage)
    ├── Cost Dashboard (by resource type, region, environment)
    ├── Alerts (CNS integration)
    └── Lifecycle Status (active, idle, stale)
```

### MFE-03: Region-Aware Components

Every resource card, list item, and detail view SHALL display:

| Component | Region Treatment |
|-----------|-----------------|
| Region Badge | Color-coded pill: US (blue), EMEA (green), APAC (orange, future) |
| Region Selector | Dropdown in Create flows, auto-populated from project assignment |
| Region Filter | Global filter in Overview and list pages to filter by region |
| Region Column | Column in all resource tables showing resource region |

### MFE-04: New Components Required

| Component | Page | Description |
|-----------|------|-------------|
| `OverviewDashboard.tsx` | Overview | Summary cards for all resource types with regional breakdown |
| `CostSummaryWidget.tsx` | Overview | Monthly cost by region and resource type |
| `ComplianceStatusWidget.tsx` | Overview | Regional compliance status (compliant/warning/violation) |
| `ComputePage.tsx` | Compute | List and manage EMR on EKS clusters |
| `ComputeClusterCard.tsx` | Compute | Individual cluster card with status, size, region |
| `CreateClusterModal.tsx` | Compute | Provision new compute with size selector |
| `ClusterDetails.tsx` | Compute | Detailed view with utilization metrics |
| `RetentionTab.tsx` | Storage | Retention policy and compliance for storage domains |
| `RetentionBadge.tsx` | Storage | Compliance status badge (Compliant, Expiring, Action Required) |
| `RetentionExtensionModal.tsx` | Storage | Request retention extension with justification |
| `ClassificationBadge.tsx` | Storage | Data classification badge (Confidential, NTK, Internal) |
| `ObservabilityPage.tsx` | Observability | Utilization, cost, and alert dashboard |
| `UtilizationChart.tsx` | Observability | CPU/Memory/Storage trend charts |
| `CostBreakdownChart.tsx` | Observability | Cost by region, resource type, environment |
| `AlertsList.tsx` | Observability | CNS alerts for project resources |
| `RegionBadge.tsx` | Shared | Reusable region indicator component |
| `RegionFilter.tsx` | Shared | Global region filter |
| `LifecycleStatusBadge.tsx` | Shared | Active/Idle/Stale/Deprecated status indicator |

### MFE-05: Updated Existing Components

| Component | Changes |
|-----------|---------|
| `StoragePage.tsx` | Add region badge to domain list, add region filter |
| `DomainListItem.tsx` | Add region badge, retention status, lifecycle badge |
| `DomainDetails.tsx` | Add Retention tab alongside HIVE/SNOWFLAKE tabs |
| `CreateDomainModal.tsx` | Add region field (auto-populated), retain data classification |
| `OrchestrationPage.tsx` | Replace placeholder with OSS Airflow environment & DAG management |
| `index.tsx` (app) | Add routes for `/compute`, `/observability`, `/overview` |

---

## User Stories

### Regionalization Stories

---

**US-REG-01: Provision Regional Storage**

**As a** Platform User creating a new storage domain  
**I want** the storage to be automatically provisioned in my project's assigned region  
**So that** data residency is guaranteed from the first byte written.

| Acceptance Criteria |
|---------------------|
| Region field in Create Domain modal is auto-populated from project metadata |
| S3 bucket created in the project's region |
| Glue database registered in the regional catalog |
| Domain list shows region badge after creation |
| Cannot override region to a different value than project assignment |

---

**US-REG-02: View Regional Resource Footprint**

**As a** Data Owner  
**I want** to see all my project's resources grouped or filtered by region  
**So that** I understand my regional infrastructure footprint at a glance.

| Acceptance Criteria |
|---------------------|
| Overview dashboard shows resource counts per region |
| Region filter in all list pages (storage, compute, orchestration) |
| Region badge on every resource card |
| Cost summary broken down by region |

---

**US-REG-03: Verify Regional Compliance**

**As a** Security & Compliance Stakeholder  
**I want** a compliance dashboard showing data residency status per project and region  
**So that** I can verify GDPR/Schrems II compliance without manual investigation.

| Acceptance Criteria |
|---------------------|
| Compliance widget shows compliant/non-compliant status |
| Drill-down to see which resources are non-compliant and why |
| Cross-region access attempts surfaced as compliance violations |
| Exportable compliance report |

---

**US-REG-04: Prevent Cross-Region Data Access**

**As a** Platform Administrator  
**I want** cross-region data access to be blocked by default with automated alerting  
**So that** data residency guarantees cannot be accidentally violated.

| Acceptance Criteria |
|---------------------|
| S3 bucket policies deny access from outside assigned region |
| IAM roles scoped to regional resources only |
| CNS alert fires within 15 minutes of cross-region attempt |
| Audit log records all access attempts with source and target region |

---

### Resource Management Stories

---

**US-RM-01: Provision Compute Self-Service**

**As a** Platform User (Data Engineer)  
**I want** to provision an EMR on EKS cluster through the Data Portal UI  
**So that** I can run Spark jobs without waiting on platform team or managing infrastructure.

| Acceptance Criteria |
|---------------------|
| Create Cluster modal with size selection (S/M/L/XL) |
| Estimated cost/hour shown for each size |
| Region auto-populated from project assignment |
| Cluster available within 10 minutes of request |
| Cluster appears in Compute page with "Provisioning" → "Running" status |

---

**US-RM-02: View All Project Resources**

**As a** Data Owner / Tech Lead  
**I want** to see all my project's resources (storage, compute, orchestration) in a single dashboard  
**So that** I have complete visibility without switching between tools.

| Acceptance Criteria |
|---------------------|
| Overview dashboard shows: storage domains count, compute clusters count, orchestration workers count |
| Each section shows total cost, utilization summary, and compliance status |
| Clicking a section navigates to the detailed page |
| Regional breakdown in each summary card |

---

**US-RM-03: Configure Compute Size**

**As a** Platform User  
**I want** to select from predefined compute size configurations  
**So that** I can right-size my compute without needing to know instance types.

| Acceptance Criteria |
|---------------------|
| Size selector shows: name, vCPU, memory, estimated cost/hour |
| Graviton instance type default with visual indicator |
| Size change request creates a new cluster version (not in-place resize) |
| Previous cluster available during transition (blue-green) |

---

**US-RM-04: View Resource Utilization**

**As a** Data Owner  
**I want** to see utilization and cost metrics for my project resources  
**So that** I can identify waste and optimize spend.

| Acceptance Criteria |
|---------------------|
| Storage: total size, growth rate, stale %, monthly cost |
| Compute: avg CPU utilization, avg memory utilization, idle hours, monthly cost |
| Orchestration: workflow success rate, worker uptime, monthly cost |
| Trend charts (30/60/90 day) for each metric |
| Recommendations for idle or oversized resources |

---

**US-RM-05: Manage Data Retention**

**As a** Data Owner  
**I want** to view and manage retention policies for my storage domains  
**So that** I can ensure compliance and request extensions when needed.

| Acceptance Criteria |
|---------------------|
| Retention tab shows: data classification, retention period, days remaining, status |
| Status badges: Compliant (green), Expiring Soon (yellow), Action Required (red), Legal Hold (blue) |
| "Request Extension" button opens modal with justification field |
| Extension request routes to approver workflow |
| Regional retention policies enforced (EMEA data lifecycle managed in EMEA) |

---

**US-RM-06: Self-Service Ingestion Onboarding**

**As a** Platform User  
**I want** to onboard my project for ingestion through a self-service portal  
**So that** I can start ingesting data without waiting on platform team tickets.

| Acceptance Criteria |
|---------------------|
| Onboarding workflow: select project → configure storage → configure compute → configure orchestration |
| Each step respects project region assignment |
| Estimated total cost shown before confirmation |
| All resources provisioned automatically after confirmation |
| Status page shows provisioning progress |

---

### Observability Stories

---

**US-OBS-01: View Resource Alerts**

**As a** Data Owner  
**I want** to see active CNS alerts for my project resources in the resource management UI  
**So that** I'm aware of issues without checking separate monitoring tools.

| Acceptance Criteria |
|---------------------|
| Alerts widget shows active alerts with severity (Critical, Warning, Info) |
| Each alert linked to the affected resource |
| Alert count shown in Overview dashboard header |
| Filter alerts by region, resource type, severity |

---

**US-OBS-02: View Cost Attribution by Region**

**As a** Finance Partner  
**I want** to see infrastructure costs broken down by region, project, and resource type  
**So that** I can include regional costs in chargeback discussions.

| Acceptance Criteria |
|---------------------|
| Cost dashboard shows: total cost, cost by region, cost by resource type |
| Monthly trend with month-over-month change indicator |
| Export capability for finance reporting |
| Cost per resource with "potential savings" for idle resources |

---

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| NFR-01 | Resource provisioning API SHALL respond within 30 seconds | Performance | <30s API response |
| NFR-02 | Compute cluster SHALL be available within 10 minutes of request | Performance | <10 min provisioning |
| NFR-03 | MFE pages SHALL load within 3 seconds (P95) | Performance | <3s page load |
| NFR-04 | All resource operations SHALL be logged with region, actor, timestamp | Compliance | 100% audit coverage |
| NFR-05 | Cross-region access SHALL be denied by infrastructure policy | Security | Zero cross-region access |
| NFR-06 | System SHALL support 100+ concurrent projects per region | Scalability | 100+ projects/region |
| NFR-07 | Regional infrastructure SHALL maintain 99.5% availability | Reliability | 99.5% SLA |
| NFR-08 | All sensitive operations SHALL use mTLS | Security | Zero plaintext connections |
| NFR-09 | MFE SHALL work on latest Chrome, Firefox, Safari, Edge | Compatibility | 4 major browsers |
| NFR-10 | All APIs SHALL be versioned (v1, v2) with deprecation policy | Maintainability | Semantic versioning |

---

## Architecture Overview

### Regional Infrastructure Topology

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ADP Control Plane                            │
│  ┌────────────┐  ┌─────────────────┐  ┌───────────────────────┐    │
│  │  Spindle   │  │  Infra API (v2) │  │  Compliance Service   │    │
│  │ (Projects) │  │ (Region-aware)  │  │  (Audit & Reporting)  │    │
│  └────────────┘  └─────────────────┘  └───────────────────────┘    │
│  ┌────────────┐  ┌─────────────────┐  ┌───────────────────────┐    │
│  │ Workflow   │  │  Cost Attrib.   │  │  CNS Alerting         │    │
│  │ Service    │  │  Service        │  │  Integration          │    │
│  └────────────┘  └─────────────────┘  └───────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   US (us-east-1) │ │ EMEA (eu-west-1) │ │ APAC (future)    │
│ ┌──────────────┐ │ │ ┌──────────────┐ │ │                  │
│ │   DataOS     │ │ │ │   DataOS     │ │ │                  │
│ │   (EKS)      │ │ │ │   (EKS)      │ │ │                  │
│ │ ┌──────────┐ │ │ │ │ ┌──────────┐ │ │ │                  │
│ │ │EMR on EKS│ │ │ │ │ │EMR on EKS│ │ │ │                  │
│ │ │(Spark)   │ │ │ │ │ │(Spark)   │ │ │ │                  │
│ │ ├──────────┤ │ │ │ │ ├──────────┤ │ │ │                  │
│ │ │OSS      │ │ │ │ │ │OSS      │ │ │ │                  │
│ │ │Airflow  │ │ │ │ │ │Airflow  │ │ │ │                  │
│ │ └──────────┘ │ │ │ │ └──────────┘ │ │ │                  │
│ └──────────────┘ │ │ └──────────────┘ │ │                  │
│ ┌──────────────┐ │ │ ┌──────────────┐ │ │                  │
│ │ S3 Storage   │ │ │ │ S3 Storage   │ │ │                  │
│ │ Glue Catalog │ │ │ │ Glue Catalog │ │ │                  │
│ └──────────────┘ │ │ └──────────────┘ │ │                  │
│ ┌──────────────┐ │ │ ┌──────────────┐ │ │                  │
│ │ Observability│ │ │ │ Observability│ │ │                  │
│ │ Stack        │ │ │ │ Stack        │ │ │                  │
│ └──────────────┘ │ │ └──────────────┘ │ │                  │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

### API Layer (Infra API v2)

The existing Infrastructure API (powering `adp-infra-project-resources-mfe`) must be extended:

| Current Endpoint | Change Required |
|------------------|-----------------|
| `POST /v1/domains` | Add `region` field to request; create regional S3 bucket + Glue DB |
| `GET /v1/domains/{tenantKey}` | Return `region` field per domain |
| `GET /v1/domains/{name}/resources` | Return `region` per resource |
| **New** `POST /v2/compute/clusters` | Provision EMR on EKS cluster with region and size |
| **New** `GET /v2/compute/clusters/{projectId}` | List compute clusters for project |
| **New** `PATCH /v2/compute/clusters/{clusterId}` | Update cluster configuration |
| **New** `GET /v2/observability/{projectId}` | Utilization, cost, and alert metrics |
| **New** `GET /v2/compliance/{projectId}` | Regional compliance status |
| **New** `POST /v2/lifecycle/extension` | Request retention extension |

---

## Dependencies

| Dependency | Owner / Team | Contribution | Status | Risk |
|------------|--------------|-------------|--------|------|
| **DataOS (EKS clusters)** | Platform Infra (AMER) | Regional Kubernetes clusters for compute | In Progress (ADPINFRA-1264) | Medium |
| **Orchestration (OSS Airflow on DataOS)** | Platform Infra (AMER) | Regional OSS Airflow deployment via Helm on DataOS | Strategy Change (ADPINFRA-1117) | Medium |
| **Infrastructure API v2** | Platform Infra (APAC) | Region-aware domain and compute APIs | Planned (ADPPICSERV-553) | Medium |
| **Spindle (Project Service)** | AnD Team | `region` field in project metadata | Requires alignment | High |
| **Provisioning Latency** | Platform Infra (APAC) | <10 min provisioning SLA | In Progress (ADPPICSERV-542) | Medium |
| **CNS Integration** | CNS Team | Alert API for project resource alerts | Requires alignment | Medium |
| **Cost Attribution Service** | FinOps | Regional cost breakdown API | Requires alignment | Medium |
| **Metadata Management API** | Tools & Services | Lifecycle attributes, retention metadata | Confirmed (BUILT) | Low |
| **Usage Insights (Trino Logs)** | EDEV | Staleness detection for lifecycle | Confirmed (BUILT) | Low |
| **Unified Resource MFE** | Platform Infra (APAC) | UI implementation (ADPPICSERV-553) | In Progress | Low |
| **Data Lifecycle Management** | Platform Infra (Abhilash) | Retention policies, stale detection | PRD Complete | Low |
| **AWS Regional Accounts** | Cloud Operations | AWS accounts in eu-west-1 | Requires alignment | High |

---

## Milestones & Delivery Plan

### Q1 FY27: Foundation (Current Quarter)

| Milestone | Capabilities | Target | Epics |
|-----------|-------------|--------|-------|
| **M1: Regional Infrastructure** | DataOS clusters in US (MVP); OSS Airflow deployed on DataOS | End of Month 1 | ADPINFRA-1264, ADPINFRA-1117 |
| **M2: Region-Aware APIs** | Infra API v2 accepts `region`; Spindle project metadata extended | End of Month 2 | ADPPICSERV-553, ADPPICSERV-542 |
| **M3: Unified MFE v1** | Storage page + region badges; Compute page MVP; Observability shell | End of Month 3 | ADPPICSERV-553 |
| **M3a: Lifecycle Integration** | Retention tab in Storage; Classification badges; Extension modal | End of Month 3 | ADPPICSERV-386 |

### Q2 FY27: EMEA & Full Capabilities

| Milestone | Capabilities | Target | Dependencies |
|-----------|-------------|--------|--------------|
| **M4: EMEA Deployment** | DataOS EMEA cluster; Regional S3 + Glue; EMEA tenant operational | Month 4 | AWS Regional Accounts |
| **M5: Unified MFE v2** | Compute page GA; Orchestration page GA; Full observability | Month 5 | CNS, Cost Attribution |
| **M6: Compliance & Lifecycle** | Compliance dashboard; Regional audit; Lifecycle automation | Month 6 | Metadata Management |

### Q3 FY27: Scale & Optimize

| Milestone | Capabilities | Target |
|-----------|-------------|--------|
| **M7: Self-Service GA** | Full onboarding workflow; Zero-ticket provisioning for standard requests | Month 7-9 |
| **M8: Advanced Observability** | AI-powered recommendations; Automated right-sizing | Month 7-9 |

---

## RAID Log

### Risks

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|------------|--------|------------|
| R1 | Spindle team cannot add `region` field in Q1 | Medium | High | Design region assignment at Infra API level as fallback; escalate to leadership |
| R2 | DataOS AMER cluster not ready for regional compute | Medium | High | Use direct EMR on EKS provisioning without DataOS operator as fallback |
| R3 | AWS regional accounts not provisioned in time for Q2 EMEA | Low | Critical | Escalate to Cloud Operations early; start account request in Q1 |
| R4 | Cross-region access prevention has gaps | Medium | High | Implement defense-in-depth: bucket policy + IAM + network policy + audit |
| R5 | MFE scope too large for single quarter | Medium | Medium | Prioritize: M3 (region badges + compute page) over M3a (lifecycle) |
| R6 | Provisioning latency exceeds 10-minute target | Medium | Medium | Async provisioning with status polling; optimize parallel resource creation |

### Assumptions

| ID | Assumption | Validation |
|----|------------|------------|
| A1 | Projects are assigned to exactly one region at creation | Confirm with product leadership |
| A2 | Graviton instances available in all target regions | Verify with AWS account team |
| A3 | CNS can ingest alerts from regional DataOS clusters | Confirm with CNS team |
| A4 | Cost Attribution Service can provide per-resource, per-region breakdown | Confirm with FinOps |
| A5 | Existing `adp-infra-project-resources-mfe` codebase can be extended (not rewritten) | Confirmed by code review |

### Issues

| ID | Issue | Status | Owner |
|----|-------|--------|-------|
| I1 | Spindle project model does not include `region` field | Open | Abhilash → AnD team |
| I2 | Infrastructure API v1 is not region-aware | Open | APAC Infra team |
| I3 | No compute management API exists | Open | Platform Infra |

### Decisions

| ID | Decision | Date | Rationale |
|----|----------|------|-----------|
| D1 | Single PRD for regionalization + resource management | Feb 2026 | Regionalization and resource management are inseparable; delivering separately creates fragmented UX |
| D2 | Project-level region assignment (not resource-level) | Feb 2026 | Simplifies compliance; prevents accidental cross-region resources |
| D3 | Extend existing MFE (not rewrite) | Feb 2026 | Preserve existing storage/domain functionality; reduce delivery risk |
| D4 | Graviton default for new compute | Feb 2026 | Aligns with Graviton Migration outcome (Slide 6); cost optimization from day one |
| D5 | OSS Airflow on DataOS replaces Astro Airflow and Temporal | Feb 2026 | Consolidates orchestration onto single OSS solution on DataOS; reduces vendor lock-in (Astro), simplifies architecture (one orchestrator), and enables regional deployment on same K8s infrastructure as Spark compute |

---

## Appendix

### A. Regionalization Readiness Checklist

| Service | US (Current) | EMEA (Q2 Target) | Owner |
|---------|-------------|-------------------|-------|
| S3 Storage | ✅ Operational | ⬜ Planned | Platform Infra |
| Glue Data Catalog | ✅ Operational | ⬜ Planned | Platform Infra |
| EMR on EKS | ✅ Operational | ⬜ Planned | Platform Infra |
| DataOS (EKS) | 🟡 In Progress | ⬜ Planned | AMER Infra |
| OSS Airflow (on DataOS) | 🟡 In Progress | ⬜ Planned | AMER Infra |
| Observability Stack | ✅ Operational | ⬜ Planned | Platform Infra |
| Access Control (Lake Formation) | 🟡 In Progress | ⬜ Planned | Access Mgmt |
| Metadata Management | ✅ Operational | ⬜ Planned | Tools & Services |
| CNS Alerting | ✅ Operational | ⬜ Planned | CNS Team |
| Cost Attribution | 🟡 Partial | ⬜ Planned | FinOps |

### B. Mapping to JIRA Epics

| Epic | PRD Requirements | Status |
|------|------------------|--------|
| ADPINFRA-1264: DataOS MVP and Phase 1 | REG-01, REG-03, REG-04 | In Progress |
| ADPINFRA-1117: Orchestration - OSS Airflow on DataOS | REG-04, RM-03 | Strategy Change |
| ADPPICSERV-542: Improve Provisioning Latency | RM-01, RM-02, RM-06 | In Progress |
| ADPPICSERV-553: Unified MFE - Configure & Maintain | MFE-01 through MFE-05 | In Progress |
| ADPPICSERV-386: Standard Data Retention | RM-04 | In Progress |
| ADPINFRA-1081: Privacera Deprecation | REG-06 (access control layer) | In Progress |

### C. Related Documentation

| Document | Link |
|----------|------|
| AD Data Lake - PRD | [Confluence](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333859875/AD+Data+Lake+-+PRD) |
| Data Lifecycle Management PRD | [Confluence](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/694146391) |
| Platform Infra Outcomes Tracker - FY27Q1 | [Confluence](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/722949586) |
| ADPCDL Standards - Data Retention Policies | [Confluence](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333927765) |
| ADP Regionalization Infrastructure Readiness | [Confluence](linked from FY27_Outcomes.md) |
| Q1 FY27 Outcomes Slides | Local: `/GTD/Q1_FY27_slide_content.md` |

### D. Glossary

| Term | Definition |
|------|------------|
| **DataOS** | Platform-managed Kubernetes (EKS) clusters for running data workloads (Spark, OSS Airflow, Flink) |
| **OSS Airflow** | Open-source Apache Airflow deployed on DataOS via Helm; replaces Astro (managed Airflow) and Temporal for workflow orchestration. Uses KubernetesExecutor for task-level pod isolation |
| **Regional Boundary** | AWS region (e.g., us-east-1, eu-west-1) where all resources for a project are co-located |
| **Zero Trust** | Security model where no network location is trusted; all connections authenticated and encrypted |
| **Unified Resource MFE** | Micro-frontend in Data Portal for managing all project infrastructure resources |
| **Data Residency** | Legal requirement that data stays within a specific geographic boundary |
| **Infra API** | Backend service providing CRUD operations for infrastructure resources |
| **Graviton** | AWS ARM-based processor instances offering better price-performance than x86 |

---

## Change Log

| Version | Description | Author | Date |
|---------|-------------|--------|------|
| 0.1 | Initial draft - Regionalization + Resource Management consolidated PRD | Abhilash Achar | 2026-02-11 |
| 0.2 | Strategy change: Orchestration updated from Temporal/Astro to OSS Airflow on DataOS | Abhilash Achar | 2026-02-11 |

---

*Document maintained by AD Platform Infrastructure Triad*
