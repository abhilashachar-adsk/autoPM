# Q1 FY27 Outcomes -- Slide Content

*Content structured per the FY27 Goal slide template. One section per slide.*

---

## Slide 1: Regionalization (PSET) -- DataOS Compute Onboarding & Zero Trust Compliance

**FY27 GOAL:** Regionalization (PSET)

**TOP OUTCOMES AS DESCRIBED BY IMPACT ON CUSTOMERS OR EMPLOYEES:**

    As a **Platform User deploying data workloads on the Data Lake**, I want to **have secure and compliant data storage, processing, and transfer capabilities that satisfy regional data residency requirements** so that **I can operate workloads without manual configuration or compliance friction**.

    **How will we measure success?**
    - 100% -- 0 unapproved cross-region events

    **What are we changing?**
    Shift from **manually configuring compliance and regional data controls per workload** > to **compute automatically onboarded to platform-managed Kubernetes clusters (DataOS) with zero Trust and Security compliance built in**

| KEY PRODUCERS | KEY CONSUMERS |
|---------------|---------------|
| ADP Platform Team | Platform Users (Data Engineers, Data Owners) |
| Batch Ingestion Team | Regional / EMEA-based project teams |
| Batch Processing Team | Security & Compliance stakeholders |

---

## Slide 2: Regionalization (PSET) -- Regionalized Infrastructure Services

**FY27 GOAL:** Regionalization (PSET)

**TOP OUTCOMES AS DESCRIBED BY IMPACT ON CUSTOMERS OR EMPLOYEES:**

As a **Platform User**, I want to **have my project's resources regionalized and managed by platform for cost optimization and performance improvements** so that **I can build workloads on the platform with confidence that infrastructure is deployed in the right region**.

**How will we measure success?**
- All infrastructure services are deployable in regions with baked-in trust controls

**What are we changing?**
Shift from **single-region infrastructure requiring manual deployment and configuration for each new region** > to **Storage, Compute, and Orchestration regionalized with Data Lake core services that deploy automatically in any region**

| KEY PRODUCERS | KEY CONSUMERS |
|---------------|---------------|
| ADP Platform Team | Platform Users (all project teams) |
| Batch Ingestion Team | Regional operations teams |
| Batch Processing Team | Infrastructure consumers building regional workloads |

---

## Slide 3: Next Gen. Data Experiences -- Legacy Tool Migration to ADP Studio

**FY27 GOAL:** Next Gen. Data Experiences

**TOP OUTCOMES AS DESCRIBED BY IMPACT ON CUSTOMERS OR EMPLOYEES:**

As a **Data Consumer migrating from legacy SQL workbench and Interactive Data Analysis tools**, I want to **seamlessly transition to ADP Studio** so that **I can move to the new Data Portal without losing my existing work or performance**.

**How will we measure success?**
- >95% of known scripts/dashboards/work products successfully imported from legacy tools
- Migration guides and tooling reduce transition time to <1 week per team

**What are we changing?**
Shift from **fragmented, unsupported legacy tools (Popsql, Dbeaver, local workbenches) with no migration path** > to **a unified ADP Studio experience with platform-managed migration tooling and guides that preserve existing work**

| KEY PRODUCERS | KEY CONSUMERS |
|---------------|---------------|
| ADP Studio / Data Portal Team | Data Consumers (Analysts, Data Scientists) |
| Batch Ingestion Team | Teams currently on Popsql, Dbeaver, legacy SQL workbenches |
| Batch Processing Team | Business Intelligence users |

---

## Slide 4a: Self Service Fulfillment -- Self-Service Portal for Ingestion & Processing

**FY27 GOAL:** Self Service Fulfillment

**TOP OUTCOMES AS DESCRIBED BY IMPACT ON CUSTOMERS OR EMPLOYEES:**

As a **Platform User**, I want to **onboard myself through a self-service portal for Ingestion and Processing** so that **I can run workloads without waiting on platform team tickets or managing infrastructure directly**.

**How will we measure success?**
- Resource provisioning time reduced from days to hours
- Resource availability >99.5%
- Zero manual interventions for standard provisioning requests

**What are we changing?**
Shift from **ticket-based provisioning taking days, with manual platform team intervention for every new ingestion or processing workload** > to **a self-service portal where teams define requirements and the platform automates provisioning, deployment, scaling, monitoring, and lifecycle management**

| KEY PRODUCERS | KEY CONSUMERS |
|---------------|---------------|
| ADP Platform Team | Platform Users (Data Engineers) |
| Batch Ingestion Team | Project teams onboarding new workloads |
| Batch Processing Team | Teams waiting on infrastructure provisioning |

---

## Slide 4b: Self Service Fulfillment -- Project Resource Management

**FY27 GOAL:** Self Service Fulfillment

**TOP OUTCOMES AS DESCRIBED BY IMPACT ON CUSTOMERS OR EMPLOYEES:**

As a **Platform User**, I want to **manage my project's resources -- storage, compute with orchestration -- through a single interface** so that **I can customize infrastructure when needed without switching between multiple tools or submitting tickets**.

**How will we measure success?**
- Users can select from predefined compute size configurations
- Resource provisioning requests complete under 10 mins
- >80% of resource management done through self-service (vs. tickets)

**What are we changing?**
Shift from **managing resources across multiple disconnected tools and ticket queues, with no unified view of storage, compute, or lifecycle** > to **a single UI with integrated Infrastructure APIs for viewing, creating, configuring, and managing the full lifecycle of project resources in minutes**

| KEY PRODUCERS | KEY CONSUMERS |
|---------------|---------------|
| ADP Platform Team | Platform Users (Data Engineers, Tech Leads) |
| | Project teams managing storage, compute, and orchestration |
| | Data Owners overseeing resource configurations |

---

## Slide 5: Faster Cheaper Better Platform -- Resource Utilization, Observability & Lifecycle

**FY27 GOAL:** Faster Cheaper Better Platform

**TOP OUTCOMES AS DESCRIBED BY IMPACT ON CUSTOMERS OR EMPLOYEES:**

As a **Data Owner**, I want to **access observability and understand utilization and cost of my project resources** so that **my team can govern data workloads without manual intervention from the platform**.

**How will we measure success?**
- 80% of unutilized resources identified and cleaned up automatically
- Monthly infrastructure cost reduction of $X documented
- All archived resources have 30-day recovery window
- All data processing on Spark are monitored via CNS

**What are we changing?**
Shift from **no visibility into resource utilization, manual cost tracking, and platform team-driven cleanup of unused resources** > to **automated observability with CNS alerting, platform-managed lifecycle and data retention policies, and self-service insights on utilization, metrics, and logs**

| KEY PRODUCERS | KEY CONSUMERS |
|---------------|---------------|
| ADP Platform Team | Data Owners |
| DQA Team | Project teams with Spark workloads |
| Batch Processing Team | Finance / cost stakeholders |
| CNS Team | Platform Administrators |

---

## Slide 6: Faster Cheaper Better Platform -- Graviton Compute Migration

**FY27 GOAL:** Faster Cheaper Better Platform

**TOP OUTCOMES AS DESCRIBED BY IMPACT ON CUSTOMERS OR EMPLOYEES:**

As a **Platform User**, I want to **have my project's compute resources managed by platform for cost optimization and performance improvements** so that **I can build workloads on the platform with confidence that I'm on the most efficient infrastructure**.

**How will we measure success?**
- BI and BP, and then all tenants have been transitioned to Graviton
- Realized x% savings gains in compute costs

**What are we changing?**
Shift from **running processing and query workloads on legacy x86 compute instances with higher cost and lower performance** > to **all tenants transitioned to cost-efficient, high-performance Graviton instances, delivering measurable savings in compute costs**

| KEY PRODUCERS | KEY CONSUMERS |
|---------------|---------------|
| ADP Platform Team | BI teams (query workloads) |
| Batch Ingestion Team | Batch Processing teams |
| Batch Processing Team | All platform tenants running compute |
| CNS Team | Finance / cost stakeholders |

---

## Slide 7: Next Gen. Data Experiences -- ADP Studio Workspaces & Collaboration

**FY27 GOAL:** Next Gen. Data Experiences

**TOP OUTCOMES AS DESCRIBED BY IMPACT ON CUSTOMERS OR EMPLOYEES:**

As a **Data Consumer**, I want to **independently run, organize, share, and reuse queries without friction** so that **I can improve iteration speed and productivity of my project**.

**How will we measure success?**
- User satisfaction (CSAT) for Interactive Analytics workflows >= 4.3 / 5
- ADP Studio out of preview release
- >30% of active users share or reuse queries, files

**What are we changing?**
Shift from **isolated query execution with no collaboration, limited editor features, and no persistent state between sessions** > to **full workspace experience in ADP Studio with query sharing, temp tables, selective execution, state persistence, tabs, file management, export options, and GitHub integration**

| KEY PRODUCERS | KEY CONSUMERS |
|---------------|---------------|
| ADP Studio / Data Portal Team | Data Consumers (Analysts, Data Scientists) |
| Batch Ingestion Team | Teams running Interactive Analytics |
| Batch Processing Team | Collaborative data teams sharing queries and files |

---

*Generated: February 10, 2026*
