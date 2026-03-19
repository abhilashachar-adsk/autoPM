# FY27 Goals & Outcomes

*Initiatives are our OKRs. Outcomes realize each OKR quarter by quarter. Achieving the outcomes = realizing the initiative.*

---

## AD Strategic Intent Alignment

Our work maps to these AD 3-year Strategic Intent themes, realized through the FY27 Strategic Realization cycle:

| SI Theme | Our Initiative | Capability Map |
|----------|---------------|----------------|
| Platform SR Initiative 03 — Multi-Region Enablement | [[#Regionalization (PSET)]] | `insights-personalization` |
| Platform SR Initiative 04 — Self-Service & Developer Productivity | [[#Self Service Fulfillment]] | `insights-personalization` |
| Platform SR Initiative 05 — Unified Platform Modernization | [[#Faster Cheaper Better Platform]] | `insights-personalization` |
| Platform SR Initiative 06 — Next Gen Data Experiences | [[#Next Gen Data Experiences]] | `insights-personalization` |

**Source:** [AD FY27 OKRs](https://autodesk.sharepoint.com/) | [Platform & Capability Strategy Update for FY27](https://autodesk.atlassian.net/wiki/spaces/PSETPM/pages/551160589) | [FY27 Strategic Planning](https://autodesk.atlassian.net/wiki/spaces/Access/pages/323290472)

---

## Regionalization (PSET)

> **OKR:** Deploy secure, compliant Data Lake capabilities that satisfy regional data residency requirements — enabling workloads in any region without manual configuration or compliance friction.
>
> **SI Alignment:** Platform SR Initiative 03 — Multi-Region Enablement
> **Capability:** `capability:capabilities-map/insights-personalization`
> **Projects:** [[GTD/Projects#Regionalization (PSET)]]

### Q1 FY27 Outcomes

| Outcome | Key Results | Confidence |
|---------|------------|------------|
| [[#DataOS Compute Onboarding & Zero Trust Compliance]] | 0 unapproved cross-region events | 🟡 In Progress |
| [[#Regionalized Infrastructure Services]] | All infra services deployable in regions with baked-in trust controls | 🟡 In Progress |

### Q2 FY27 Outcomes

| Outcome | Key Results | Confidence |
|---------|------------|------------|
| [[#EMEA Data Lake Deployment]] | Customer tenant in EMEA, functional parity, Tier 1 SLAs, zero cross-region transfer | Planned |

---

### DataOS Compute Onboarding & Zero Trust Compliance
**Quarter:** Q1 FY27

**Use Case:** As Platform Users deploying data workloads on the Data Lake, we need secure and compliant data storage, processing, and transfer capabilities that satisfy regional data residency requirements — without manual configuration or compliance.

**Outcome:** Teams can:
1. Compute automatically onboarded to platform-managed Kubernetes clusters (DataOS)
2. Operate regional workloads with zero Trust and Security compliance friction

**Success Metrics:**
- 100% — 0 unapproved cross-region events

| Owner | Timeline | Dependency |
|-------|----------|------------|
| [[Abhilash]] | Q1 FY27 | Batch Ingestion, Batch Processing |

---

### Regionalized Infrastructure Services
**Quarter:** Q1 FY27

**Use Case:** As a Platform User, I want my project's resources to be regionalized and managed by platform for cost optimization, performance improvements — so that I can build workloads on the platform with confidence.

**Outcome:**
1. Storage, Compute and Orchestration regionalized
2. Data Lake core services regionalized to deploy automatically in any region

**Strategy Change (Feb 2026):** Orchestration layer shifting from Astro Airflow + Temporal to **OSS Apache Airflow on DataOS**. OSS Airflow will be deployed per-region via Helm on DataOS clusters.

**Success Metrics:**
- All infrastructure services are deployable in regions with baked-in trust controls

| Owner | Timeline | Dependency |
|-------|----------|------------|
| [[Abhilash]] | Q1 FY27 | Batch Ingestion, Batch Processing |

---

### EMEA Data Lake Deployment
**Quarter:** Q2 FY27

**Use Case:** As a platform administrator, I want secure Data Lake deployed in EMEA with data residency guarantees so that we can serve European customers while meeting GDPR and Schrems II regulatory requirements for data sovereignty.

**Outcome:** EMEA regional deployment of ADP infrastructure including regional S3 storage, EMR on EKS compute, Orchestration, Observability stack, Access control, and Metadata management. Integration with AMP Control Plane for Tier 1 reliability.

**Success Metrics:**
- Customer tenant operational in EMEA region
- Functional parity with US deployment for core features
- Data residency verified — zero cross-region data transfer for regulated data
- Tier 1 reliability SLAs met (99.9% availability)
- Regional DR tested and documented

| Owner | Timeline | Dependency |
|-------|----------|------------|
| [[Abhilash]] | Q2 FY27 | AI/ML Platform Team |

---

## Self Service Fulfillment

> **OKR:** Enable platform users to self-serve provisioning, resource management, and workload orchestration without waiting on tickets or managing infrastructure directly.
>
> **SI Alignment:** Platform SR Initiative 04 — Self-Service & Developer Productivity
> **Capability:** `capability:capabilities-map/insights-personalization`
> **Projects:** [[GTD/Projects#Self Service Fulfillment]]

### Q1 FY27 Outcomes

| Outcome | Key Results | Confidence |
|---------|------------|------------|
| [[#Self-Service Portal for Ingestion & Processing]] | Provisioning time days→hours, availability >99.5%, zero manual interventions | 🟡 In Progress |
| [[#Project Resource Management]] | Predefined compute sizes, provisioning <10 min, >80% self-service | 🟡 In Progress |

### Backlog

| Outcome | Key Results | Confidence |
|---------|------------|------------|
| [[#Workflow Orchestration (OSS Airflow on DataOS)]] | BP migrated from Astro, deployment <1 day, zero connectivity failures | In Progress (setup) |

---

### Self-Service Portal for Ingestion & Processing
**Quarter:** Q1 FY27

**Use Case:** As a Platform User, I want to onboard myself through a self-service portal for Ingestion and Processing so that I can run workloads without waiting on platform team tickets or managing infrastructure directly.

**Outcome:** Teams work faster by defining request and configure processing requirements while the platform automates provisioning of storage, compute resource provisioning with automated deployment, scaling, monitoring, cost optimization and lifecycle management.

**Success Metrics:**
- Resource provisioning time reduced from days to hours
- Resource availability >99.5%
- Zero manual interventions for standard provisioning requests

| Owner | Timeline | Dependency |
|-------|----------|------------|
| [[Abhilash]] | Q1 FY27 | Batch Ingestion, Batch Processing |

---

### Project Resource Management
**Quarter:** Q1 FY27

**Use Case:** As a Platform User, I want to manage my project's resources — storage, compute with orchestration — so that I can customize infrastructure when needed without switching between multiple tools or submitting tickets.

**Outcome:** Teams are more productive and cost effective by using single UI interface, and widgets in workflows on Project Resources to view, create new, configure compute size and maintain data retention, lifecycle of resources, where the interface is integrated with Infrastructure APIs for low latency provisioning and lifecycle management.

**Success Metrics:**
- Users can select from predefined compute size configurations
- Resource provisioning requests complete under 10 mins
- >80% of resource management done through self-service (vs. tickets)

| Owner | Timeline | Dependency |
|-------|----------|------------|
| [[Abhilash]] | Q1 FY27 | |

---

### Workflow Orchestration (OSS Airflow on DataOS)
**Quarter:** Backlog (setup in progress)

**Use Case:** As a Data Engineer, I want platform-managed workflow orchestration so that I can deploy and run Airflow DAGs without managing infrastructure, networking, or connectivity to downstream services.

**Outcome:** Teams define DAG logic while platform handles Airflow infrastructure (scheduler, webserver, workers) on DataOS.

**Strategy Change (Feb 2026):** Shifted from Temporal to OSS Airflow on DataOS. Also replaces Astro (managed Airflow). OSS Airflow deployed via Helm on DataOS EKS clusters with KubernetesExecutor.

**Success Metrics:**
- BP migrated from Astro to OSS Airflow on DataOS
- Deployment time reduced from days to <1 day
- Zero connectivity failures to downstream services
- KubernetesExecutor auto-scaling operational

**Status:** Strategy revised — OSS Airflow setup in progress

| Owner | Timeline | Dependency |
|-------|----------|------------|
| [[Abhilash]] | Q1 FY27 | Batch Processing, DataOS |

---

## Faster Cheaper Better Platform

> **OKR:** Modernize infrastructure, reduce costs through compute optimization, improve observability, and strengthen security/compliance posture.
>
> **SI Alignment:** Platform SR Initiative 05 — Unified Platform Modernization
> **Capability:** `capability:capabilities-map/insights-personalization`
> **Projects:** [[GTD/Projects#Faster Cheaper Better Platform]]

### Q1 FY27 Outcomes

| Outcome | Key Results | Confidence |
|---------|------------|------------|
| [[#Resource Utilization, Observability & Lifecycle]] | 80% unused resources cleaned, cost reduction documented, CNS monitoring | 🟡 In Progress |
| [[#Graviton Compute Migration]] | All tenants on Graviton, x% compute savings | 🟡 In Progress |

### Q2 FY27 Outcomes

| Outcome | Key Results | Confidence |
|---------|------------|------------|
| [[#Infrastructure Cleanup]] | Cost reduction documented, 30-day recovery for archived resources | Planned |
| [[#Stale Data Cost Attribution]] | 100% stale data costs attributed to owner, savings messaging | Planned |

### Q3 FY27 Outcomes

| Outcome | Key Results | Confidence |
|---------|------------|------------|
| [[#Privacera Migration to AWS Lake Formation]] | ~6000 roles migrated, cost $300k→$X00/yr, zero access disruption | Planned |
| [[#Self-Service Deprecation Workflow]] | Deprecation via Data Portal, 30-day recovery, downstream notifications | Planned |

### Backlog

| Outcome | Key Results | Confidence |
|---------|------------|------------|
| [[#Corporate Schema Access Automation]] | Time to data access 24+ hours→<1 hour | Backlog |
| [[#IAM Role Cleanup (Offramp)]] | All offramp roles removed, security audit passed | Backlog |

---

### Resource Utilization, Observability & Lifecycle
**Quarter:** Q1 FY27

**Use Case:** As a Data Owner, I want to access observability and understand utilization and cost of my project resources so that my team can govern data workloads without manual intervention from the platform.

**Outcome:** Teams are trusted and cost effective because they:
1. Use single UI interface, and widgets in workflows to gain insights on project resource utilization and key observability of metrics, and logs
2. Benefit from platform-managed project resource lifecycle and data retention policies
3. Automatically onboarded to compute observability with alerting (CNS)

**Success Metrics:**
- 80% of unutilized resources identified and cleaned up automatically
- Monthly infrastructure cost reduction of $X documented
- All archived resources have 30-day recovery window
- All data processing on Spark are monitored via CNS

| Owner | Timeline | Dependency |
|-------|----------|------------|
| [[Abhilash]] | Q1 FY27 | DQA, Batch Processing |

---

### Graviton Compute Migration
**Quarter:** Q1 FY27

**Use Case:** As a Platform User, I want my project's resources managed by platform for cost optimization, performance improvements — so that I can build workloads on the platform with confidence.

**Outcome:** Teams using compute resources for processing and querying are:
1. Transitioned to more cost-efficient and performant engine (Graviton)

**Success Metrics:**
- BI and BP, and then all tenants have been transitioned to Graviton
- Realized x% savings gains in compute costs

| Owner | Timeline | Dependency |
|-------|----------|------------|
| [[Abhilash]] | Q1 FY27 | Batch Ingestion, Batch Processing, CNS |

---

### Infrastructure Cleanup
**Quarter:** Q2 FY27

**Use Case:** As a Platform Administrator, I want to clean up all unused Datasets, EMR clusters and Astro tenants in the Data Lake commercial and corporate environment so that we reduce infrastructure costs and complete the Corp-to-Commercial migration cleanly.

**Outcome:** Platform Data Lake Corporate Env. is cleaned up of Unused Storage, Compute and Orchestration Resources with automated discovery of vacant Compute, Orchestration, Storage Resources with reporting and auditability.

**Success Metrics:**
- Monthly infrastructure cost reduction of $X documented
- All archived resources have 30-day recovery window

| Owner | Timeline | Dependency |
|-------|----------|------------|
| [[Abhilash]] | Q2 FY27 | |

---

### Stale Data Cost Attribution
**Quarter:** Q2 FY27

*Absorbed from FY27 Strategic Outcomes Tracker — Data Lifecycle Management initiative.*

**Use Case:** As a Finance Partner, I want to see storage costs for stale datasets attributed to data owner/team so that we can drive cost optimization decisions.

**Outcome:** Cost attribution integration for stale data with owner dashboard, potential savings messaging, and integration with AD Cost Attribution dashboards.

**Success Metrics:**
- 100% stale data costs attributed
- Cost visibility in owner dashboard
- "If deprecated, save $X/month" messaging available

| Owner | Timeline | Dependency |
|-------|----------|------------|
| [[Abhilash]] | Q2 FY27 | Cost Attribution (FinOps) |

---

### Privacera Migration to AWS Lake Formation
**Quarter:** Q3 FY27

**Use Case:** As a Platform Administrator, I want to migrate access control from Privacera to Managed Ranger + AWS Lake Formation so that we reduce licensing costs, while maintaining fine-grained access policies for Presto workloads.

**Outcome:** Migration of ~6000 access control roles from Privacera Ranger to Managed Ranger + AWS Lake Formation. Includes policy translation, Azure AD integration, access audit log continuity, and updating the data access proxy API for backward compatibility during transition.

**Success Metrics:**
- ~6000 roles successfully migrated to Lake Formation
- Annual cost reduced from $300k to $X00/year
- Zero access disruption during migration (parallel run period)
- Audit log continuity maintained for compliance
- Privacera fully decommissioned

| Owner | Timeline | Dependency |
|-------|----------|------------|
| [[Abhilash]] | Q3 FY27 | AnD, Security Team, Compliance Team |

---

### Self-Service Deprecation Workflow
**Quarter:** Q3 FY27

*Absorbed from FY27 Strategic Outcomes Tracker — Data Lifecycle Management initiative.*

**Use Case:** As a Data Owner, I want to initiate deprecation requests via Data Portal so that I can manage my data lifecycle without platform team involvement.

**Outcome:** Self-service deprecation workflow with soft-delete (rename) before permanent deletion, owner confirmation, and downstream consumer notification.

**Success Metrics:**
- Self-service deprecation available in Data Portal
- 30-day recovery window for deprecated data
- Reduced platform team burden for deprecation requests

| Owner | Timeline | Dependency |
|-------|----------|------------|
| [[Abhilash]] | Q3 FY27 | Data Portal (Spindle), AnD |

---

### Corporate Schema Access Automation
**Quarter:** Backlog

**Use Case:** As a Platform Administrator, I want legacy corporate schema access automatically provisioned when we receive requests for fulfillment via Access Management workflows in Data Portal.

**Outcome:** Self-service UI in Data Portal for corporate schema access with automated IAM policy application (SRD/API), audit trail for compliance.

**Success Metrics:**
- Time to data access reduced from 24+ hours to <1 hour

| Owner | Timeline | Dependency |
|-------|----------|------------|
| [[Abhilash]] | Backlog | AnD |

---

### IAM Role Cleanup (Offramp)
**Quarter:** Backlog

**Use Case:** As a Platform Administrator, I want to clean up all unused and overly-permissive IAM roles created during the Offramp migration so that our AWS environment passes security audits and follows least-privilege principles.

**Outcome:** Audit and removal of unused IAM roles including off-ramp roles with reporting and auditability. Platform Data Lake Corporate Env. cleaned up of IAM Roles.

**Success Metrics:**
- All Offramp-related IAM roles removed or migrated
- Security audit passed with zero critical findings
- IAM role inventory reduced by X%

| Owner | Timeline | Dependency |
|-------|----------|------------|
| [[Abhilash]] | Backlog | Corporate Data Team, Batch Processing |

---

## Next Gen Data Experiences

> **OKR:** Deliver modern, unified data experiences that increase productivity, reduce time-to-insight, and support collaboration.
>
> **SI Alignment:** Platform SR Initiative 06 — Next Gen Data Experiences
> **Capability:** `capability:capabilities-map/insights-personalization`
> **Projects:** [[GTD/Projects#Next Gen Data Experiences]]

### Q1 FY27 Outcomes

| Outcome | Key Results | Confidence |
|---------|------------|------------|
| [[#Legacy Tool Migration to ADP Studio]] | >95% content imported, migration <1 week per team | 🟢 On Track |
| [[#ADP Studio Workspaces & Collaboration]] | CSAT ≥4.3, out of preview, >30% share/reuse | 🟡 In Progress |

### Q2 FY27 Outcomes

| Outcome | Key Results | Confidence |
|---------|------------|------------|
| [[#Data Retention Policies]] | Policies for all data categories, self-service config live | Planned |
| [[#Notebook Environment]] | >30% advanced users adopt notebooks | Planned |
| [[#Dashboard Widgets & Graph Editing]] | >30% dashboards use enhanced capabilities | Planned |
| [[#Looker Connectivity]] | Time to first BI dashboard days→<30 min | Planned |
| [[#Power BI Connectivity]] | Connection via Data Portal, SSO, 100% cost attribution | Planned |
| [[#AI-Powered Query Optimization]] | P95 <1.5s, AI SQL >70% acceptance, cost estimates <15% variance | Planned |

---

### Legacy Tool Migration to ADP Studio
**Quarter:** Q1 FY27

**Use Case:** As a Data Consumer, migrating from legacy SQL workbench, Interactive Data Analysis tools, I want seamless transition to ADP Studio so that I can transition to the new Data Portal without losing my existing work or performance.

**Outcome:** Teams are more productive by using ADP Studio for Interactive Analytics in Data Portal, while platform makes the migrations from Popsql, Dbeaver or other local workbench, seamless.

**Success Metrics:**
- >95% of known scripts/dashboards/work products successfully imported from legacy tools
- Migration guides and tooling reduce transition time to <1 week per team

| Owner | Timeline | Dependency |
|-------|----------|------------|
| [[Abhilash]] | Q1 FY27 | Batch Ingestion, Batch Processing |

---

### ADP Studio Workspaces & Collaboration
**Quarter:** Q1 FY27

**Use Case:** As a Data Consumer, I want to independently run, organize, share, and reuse queries without friction, improving iteration speed and productivity of my project.

**Outcome:** Teams are more productive and collaborative by using workspaces in ADP Studio for Interactive Analytics in Data Portal which supports:
- Query limit control
- Temp table creation
- Selective query execution
- Editor state persistence
- Query sharing and collaboration
- Tabs & file management
- Export options
- GitHub integration

**Success Metrics:**
- User satisfaction (CSAT) for Interactive Analytics workflows >= 4.3 / 5
- ADP Studio out of preview release
- >30% of active users share or reuse queries, files

| Owner | Timeline | Dependency |
|-------|----------|------------|
| [[Abhilash]] | Q1 FY27 | Batch Ingestion, Batch Processing |

---

### Data Retention Policies
**Quarter:** Q2 FY27

**Use Case:** As a Data Owner, I need standardized retention policies with visibility and automated enforcement so that personal and customer data is deleted within mandated timeframes (45 days post-account deactivation), reducing our regulatory exposure and ensuring we fulfill Trust Commitments across Security, Privacy, and Resilience domains.

**Outcome:** Platform standard data retention framework with policy definition interface for data categories, automated enforcement engine, and project team-facing actions for compliance.

**Success Metrics:**
- Retention policies approved for all data categories (Customer content, Behavioral, etc.)
- Self-service retention policy configuration live for all data owners via Admin MFE

| Owner | Timeline | Dependency |
|-------|----------|------------|
| [[Abhilash]] | Q2 FY27 | Metadata Management, Legal/Compliance Team |

---

### Notebook Environment
**Quarter:** Q2 FY27

**Use Case:** As a data consumer, I want to easily perform deeper analysis by combining SQL with notebooks and programmatic analysis so that I can work with semi-structured data (e.g. JSON) from Data Lake.

**Outcome:** ADP Studio for Interactive Analytics in Data Portal supports a notebook-like environment for deeper data analysis.

**Success Metrics:**
- >30% of advanced users adopt notebook functionality for SQL + programmatic analysis

| Owner | Timeline | Dependency |
|-------|----------|------------|
| [[Abhilash]] | Q2 FY27 | |

---

### Dashboard Widgets & Graph Editing
**Quarter:** Q2 FY27

**Use Case:** As a data consumer, I want to build, edit, and maintain dashboards that better represent complex data and refresh automatically.

**Outcome:** ADP Studio for Interactive Analytics in Data Portal supports graph editing, dashboard widgets.

**Success Metrics:**
- >30% of dashboards use enhanced capabilities (editable graphs, widgets, BP-enabled refresh)

| Owner | Timeline | Dependency |
|-------|----------|------------|
| [[Abhilash]] | Q2 FY27 | |

---

### Looker Connectivity
**Quarter:** Q2 FY27

**Use Case:** As a Business Analyst, I want to create or gain access to a Looker dashboard using Data Lake tables so that I can provide insights without knowing the underlying infrastructure (Corporate vs Commercial).

**Outcome:** Looker connectivity from Data Portal with auto-provisioned service users, SSO authentication, and LookML scaffolding from dataset metadata.

**Success Metrics:**
- Time to first BI dashboard reduced from days to <30 minutes

| Owner | Timeline | Dependency |
|-------|----------|------------|
| [[Abhilash]] | Q2 FY27 | ESE Looker BI Team |

---

### Power BI Connectivity
**Quarter:** Q2 FY27

**Use Case:** As a Business Analyst, I want to connect Power BI Desktop to Data Lake tables so that I can build and request access to financial reports with familiar tools using SSO.

**Outcome:** Power BI connectivity from Data Portal.

**Success Metrics:**
- Power BI connection available via Data Portal
- SSO authentication working
- BI query cost attribution at 100%

| Owner | Timeline | Dependency |
|-------|----------|------------|
| [[Abhilash]] | Q2 FY27 | ESE Power BI Team |

---

### AI-Powered Query Optimization
**Quarter:** Q2 FY27

**Use Case:** As a Data Consumer, I want AI-powered optimization suggestions so that I can understand query costs and see improvements on cost of running without deep SQL expertise.

**Outcome:** AI-enabled features in ADP Studio which provide actionable recommendations for tuning SQL, create SQL based on natural language, or fix issues with user-written SQL.

**Success Metrics:**
- P95 query latency <1.5 seconds
- AI-generated SQL with >70% acceptance rate
- Cost estimates shown before query execution with <15% variance from actuals

| Owner | Timeline | Dependency |
|-------|----------|------------|
| [[Abhilash]] | Q2 FY27 | |

---

## Q1 FY27 — Quarterly SR Health

*Updated each quarter during SR adjustment. Reflects current confidence in delivering committed outcomes.*

| Initiative | Outcome | Confidence | Notes |
|-----------|---------|------------|-------|
| Regionalization | DataOS Compute Onboarding | 🟡 In Progress | DataOS MVP underway |
| Regionalization | Regionalized Infra Services | 🟡 In Progress | PRD published, dependencies being resolved |
| Self Service | Self-Service Portal | 🟡 In Progress | Support backlog created, pending prioritization |
| Self Service | Project Resource Management | 🟡 In Progress | MFE mockups ready for review |
| Faster Cheaper Better | Resource Utilization & Observability | 🟡 In Progress | Stale data discovery 94.9% complete |
| Faster Cheaper Better | Graviton Migration | TBD | Awaiting engineering update |
| Next Gen Experiences | Legacy Tool Migration | 🟢 On Track | Cut-off April 17, announcement sent |
| Next Gen Experiences | ADP Studio Workspaces | 🟡 In Progress | Usage dashboard built, DDL pending decision |

---

## FY27 Delivery Timeline

| Quarter | Outcomes |
|---------|----------|
| **Q1 FY27** | DataOS Compute Onboarding, Regionalized Infra Services, Legacy Tool Migration, Self-Service Portal, Project Resource Management, Resource Utilization & Observability, Graviton Migration, ADP Studio Workspaces |
| **Q2 FY27** | EMEA Deployment, Infrastructure Cleanup, Stale Data Cost Attribution, Data Retention, Notebooks, Dashboard Widgets, Looker & Power BI Connectivity, AI Query Optimization |
| **Q3 FY27** | Privacera to Lake Formation Migration, Self-Service Deprecation Workflow |
| **Backlog** | Corporate Schema Automation, OSS Airflow on DataOS (setup), IAM Role Cleanup |

---

## Summary by Initiative

| Initiative | Q1 | Q2 | Q3 | Backlog | Total |
|------------|----|----|----|---------|----|
| Regionalization (PSET) | 2 | 1 | 0 | 0 | 3 |
| Self Service Fulfillment | 2 | 0 | 0 | 1 | 3 |
| Faster Cheaper Better Platform | 2 | 2 | 2 | 2 | 8 |
| Next Gen Data Experiences | 2 | 6 | 0 | 0 | 8 |
| **Total** | **8** | **9** | **2** | **3** | **22** |

---

## Outcome Owner
All outcomes owned by **[[Abhilash]]**

## Key Dependencies
- Batch Ingestion & Processing Teams
- DQA Team
- CNS Team
- Corporate Data Team
- ESE Looker & Power BI Teams
- AI/ML Platform Team
- Metadata Management Team
- Legal/Compliance Team
- AnD Team
- Security Team
- FinOps Team
- Data Portal (Spindle) Team

---

*Last Updated: 2026-03-17*

---

**Navigation:** [[Home]] | [[GTD/Projects|Projects]] | [[GTD/Next_Actions|Next Actions]] | [[GTD/Waiting_For|Waiting For]] | [[GTD/Agenda|Agenda]]
