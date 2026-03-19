# PSET AD FY27 Strategic Initiatives - Outcomes

*Updated: January 20, 2026 - Aligned with AD FY27 OKRs PowerPoint*

---

## FY27 Strategic Initiatives Overview

The Analytics Data Platform (AD/ADP) team has identified 6 strategic initiatives for FY27:

| # | Initiative | Focus Area | Description |
|---|------------|------------|-------------|
| 01 | Assistant (PSET) | AI/ML | Industry-smart, person-tuned Assistant capabilities |
| 02 | Trust/Governance (PSET) | Compliance & Data Quality | Data Provenance and regulatory compliance |
| 03 | Regionalization (PSET) | Infrastructure | AD Multi-Region Enablement for data residency |
| 04 | Self Service Fulfillment | Developer Experience | API-first product experience, adoption acceleration |
| 05 | Faster Cheaper Better Platform | Modernization | Unified Platform Modernization (Legacy Migrations) |
| 06 | Next Gen. Data Experiences | User Experience | BI, Snowflake, Unified Data Experiences |

---

## Summary Table - All Outcomes

| Initiative | Use Case | Outcome | Success Metric | Outcome Owner | Delivery QTR | Dependency | Cross-team Dependency PM |
|------------|----------|---------|----------------|---------------|--------------|------------|--------------------------|
| **SELF SERVICE FULFILLMENT** |
| API-First Product Experience | Technical users expect programmable, self-serve products with consistent APIs | API-first foundation across AD products with versioned APIs powering SDK/CLI/GUI interfaces | 1) Consistent API coverage 2) MCP integration ready 3) Reduced engineering tickets | TBD | FY27 | API standards, MCP strategy | Platform PM |
| Ingest and Processing Innovation | Data pipelines need modern, scalable ingestion capabilities | Improved data ingestion and processing workflows | 1) Processing efficiency gains 2) Reduced pipeline latency | TBD | FY27 | Infrastructure readiness | BP PM |
| Adoption Acceleration | Platform needs broader adoption across organization | Accelerated onboarding and increased platform usage | 1) New team onboarding velocity 2) Platform adoption rate | TBD | FY27 | Documentation, Training | DevRel PM |
| **FASTER CHEAPER BETTER PLATFORM** |
| Unified Platform Modernization | Independent modernization efforts need coordination | Consolidated migration framework for Fivetran→Nexla, Astro→OSS Airflow on DataOS, Privacera→Apache Ranger, dbt→Spark, PopSQL→ADP Studio, Parquet→Iceberg | 1) All migrations tracked under single framework 2) Reduced duplicated effort 3) Clear dependency map | TBD | FY27 | Migration teams alignment | Migration PM |
| **REGIONALIZATION** |
| AD Multi-Region Enablement | Data residency requirements for GDPR/regulatory compliance | Multi-region infrastructure enabling data workloads in multiple regions | 1) EMEA region deployment 2) Data residency compliance 3) Regional architecture defined | Abhilash Achar / AD Infra Triad | Q2 2026 | AWS account strategy, Security zones | AMP PM, Trust/Compliance PM |
| **TRUST/GOVERNANCE** |
| Data Provenance | Regulatory compliance requires tracing data origins and transformations | Comprehensive data provenance tracking beyond lineage - capturing source, ownership, processing history | 1) Full audit capability for customer data 2) GDPR compliance 3) Stakeholder trust | TBD | FY27 | MDM integration | Security PM |
| **NEXT GEN. DATA EXPERIENCES** |
| BI Experience | Users need streamlined BI workflows | Improved business intelligence experience and tooling | 1) User satisfaction improvement 2) Time to insight reduction | TBD | FY27 | Querybook, BI tools | AnD PM |
| Snowflake Modernization | Snowflake usage needs standardization | Standardized Snowflake patterns and cost optimization | 1) Cost reduction 2) Query performance improvement | TBD | FY27 | Snowflake account access | Data Platform PM |
| Cursor-like Experience for Data Teams | Data teams need modern development experience | AI-assisted data development similar to Cursor IDE | 1) Developer productivity increase 2) Code quality improvement | TBD | FY27 | AI/ML capabilities | DevRel PM |
| Analytics Platform for Product Data | Product teams need dedicated analytics capabilities | Centralized analytics platform for product telemetry | 1) Product data accessibility 2) Self-service analytics | TBD | FY27 | Product telemetry integration | Product Analytics PM |
| Unified Data Experiences | Fragmented tools create friction | Consolidated data experience across ingestion, transformation, visualization | 1) Single entry point 2) Reduced tool sprawl | TBD | FY27 | Portal integration | UX PM |
| Centralized Data Collection | Data collection is inconsistent across systems | Unified approach to data collection and governance | 1) Standardized collection 2) Governance coverage | TBD | FY27 | Telemetry infrastructure | Governance PM |
| **DATAOS PLATFORM (Supporting Infrastructure)** |
| DataOS Platform MVP | Data Engineers need to run distributed workloads (Spark, OSS Airflow, Flink) without managing K8s infrastructure | Unified self-service platform for data workloads with automated project provisioning via CRD | 1) ≥1 early adopter onboarded 2) Setup time: weeks→days 3) 99.5% availability | TBD (Seema Jaisinghani / Vaishak Suresh) | Q1 FY27 | CaaS cluster availability, AWS account setup, CloudOS/UCP GitOps access | CaaS/CloudOS team PM |
| OSS Airflow on DataOS (replaces Astro + Temporal) | Pipeline teams need managed orchestration without infrastructure overhead | Platform-managed OSS Airflow via Helm on DataOS with KubernetesExecutor | 1) BP team migrated from Astro 2) <1 day provisioning 3) Zero connectivity failures | Anssi Junnola / Gandhar Tandale | Q1 FY27 | DataOS infrastructure, Helm chart, PostgreSQL (metadata DB), External Secrets Operator | Infra team PM |
| Multi-Tenant Isolation & Cost Attribution | Multiple teams sharing platform need security isolation and accurate cost chargebacks | Namespace-level isolation with automatic RBAC, quotas, and granular cost attribution | 1) 100% workloads isolated 2) Cost reports within 24hrs 3) Zero cross-tenant incidents | TBD (Infrastructure lead) | Q2 FY27 | DataOS MVP operational, MDM integration, FinOps tooling | FinOps team PM |
| Spark Batch Processing (EMR on EKS) | Data Engineers need to run Spark jobs without managing EMR clusters | API-driven Spark job submission with automatic EMR virtual cluster provisioning | 1) <5 min startup time 2) 100+ jobs/week 3) ≥95% success rate | TBD (Spark/EMR capability owner) | Q1 FY27 | EMR on EKS prerequisites, Spark Runtime Images migration, Data Lake connectivity | Central Data Lake PM / Spark Runtime team PM |
| DataOS Environment Strategy | Platform developers need safe environments to test changes without disrupting users | Dedicated internal dev/stg clusters separate from user-facing environments with DR | 1) 100% changes tested internally first 2) Zero user disruptions 3) Quarterly DR validation | Anssi Junnola / Architecture team | Q2 FY27 | AWS account strategy, Security zone compliance, CloudOS multi-stack readiness | CloudOS team PM / Security team PM |

---

## Outcome 1: DataOS Platform Foundation (MVP)

**As a** Data Engineer / Data Scientist  
**I want to** provision and run data workloads (Spark, OSS Airflow, Flink) through a unified, self-service platform  
**So that** I can focus on building data products instead of managing Kubernetes infrastructure and learning different patterns for each tool.

### How will we measure success?

| Metric | Target |
|--------|--------|
| Early adopter projects onboarded | ≥ 1 project running end-to-end batch pipelines |
| Time to provision data workload environment | Reduced from weeks → days |
| Platform availability | 99.5% uptime |

### What are we changing?

| Shift from | → | Shift to |
|------------|---|----------|
| Multiple isolated K8s clusters per service (Spark, Astro Airflow) managed individually | → | Single multi-tenant DataOS platform with unified operations (OSS Airflow + Spark) |
| Hand-crafted Terraform clusters outside CloudOS | → | CaaS-managed, CloudOS-native clusters with built-in compliance |
| Different patterns/UX for each data offering | → | Unified API and CLI experience across all data workloads |
| Manual namespace and resource setup | → | Automated project provisioning via CRD |

**Outcome Owner** – TBD (Recommend: Seema Jaisinghani or Vaishak Suresh)  
**Delivery QTR** – Q1 FY27  
**Dependency** – CaaS cluster availability, AWS account setup, CloudOS/UCP GitOps access  
**Cross-team Dependency PM** – CaaS/CloudOS team PM

---

## Outcome 2: OSS Airflow Deployment on DataOS (replaces Temporal Workers)

**Strategy Change (Feb 2026):** Orchestration layer shifting from Astro (managed Airflow) + Temporal to **OSS Apache Airflow on DataOS**. This consolidates orchestration onto a single, platform-managed open-source solution, eliminates Astro licensing, and enables regional deployment on the same Kubernetes infrastructure as Spark compute.

**As a** Data Pipeline Developer  
**I want to** deploy and manage Airflow DAGs on platform-managed OSS Airflow environments through a simple interface  
**So that** I can orchestrate complex data workflows without managing Kubernetes infrastructure, Airflow configuration, or scheduler operations myself.

### How will we measure success?

| Metric | Target |
|--------|--------|
| Teams migrated from Astro to OSS Airflow on DataOS | BP team successfully onboarded |
| Airflow environment provisioning time | <1 day (from weeks with Astro setup) |
| DAG deployment time | <5 minutes from git push to DAG visible |
| Scheduler/worker connectivity failures post-deployment | Zero |

### What are we changing?

| Shift from | → | Shift to |
|------------|---|----------|
| Astro managed Airflow (vendor lock-in, per-tenant cost) | → | OSS Airflow on DataOS (Helm-deployed, platform-managed) |
| Temporal workers for workflow orchestration | → | OSS Airflow with KubernetesExecutor for task-level isolation |
| Manual Airflow configuration per Astro tenant | → | Standardized Helm values with platform defaults |
| Custom secrets management per team | → | Standardized External Secrets/SSM integration |
| No regional orchestration capability | → | Per-region Airflow deployments on regional DataOS clusters |

**Outcome Owner** – Anssi Junnola / Gandhar Tandale  
**Delivery QTR** – Q1 FY27  
**Dependency** – DataOS infrastructure operational, Helm chart for Airflow, PostgreSQL (metadata DB), External Secrets Operator  
**Cross-team Dependency PM** – Infra team PM

---

## Outcome 3: Multi-Tenant Isolation & Cost Attribution

**As a** Platform Administrator / Finance Partner  
**I want to** have automatic tenant isolation with granular cost attribution  
**So that** teams can safely share infrastructure while maintaining security boundaries and accurate chargebacks.

### How will we measure success?

| Metric | Target |
|--------|--------|
| Workloads running in isolated namespaces | 100% |
| Cost attribution report availability | Within 24 hours of workload completion |
| Cross-tenant access incidents | Zero |

### What are we changing?

| Shift from | → | Shift to |
|------------|---|----------|
| Separate clusters per team (expensive, hard to manage) | → | Shared cluster with namespace-level isolation |
| Approximate cost allocation based on cluster ownership | → | Granular workload-level cost attribution |
| Manual RBAC setup per deployment | → | Automatic tenant-scoped RBAC via Project Controller |
| No resource quotas or contention management | → | Enforceable resource quotas per tenant/workload |

**Outcome Owner** – TBD (Infrastructure lead)  
**Delivery QTR** – Q2 FY27  
**Dependency** – DataOS MVP operational, MDM integration, FinOps tooling  
**Cross-team Dependency PM** – FinOps team PM

---

## Outcome 4: Spark Batch Processing on EMR on EKS

**As a** Data Engineer  
**I want to** submit Spark jobs through DataOS with automatic EMR virtual cluster provisioning  
**So that** I can run distributed batch processing without managing EMR infrastructure or Spark operator configuration.

### How will we measure success?

| Metric | Target |
|--------|--------|
| Spark job startup time | < 5 minutes average |
| Weekly Spark job throughput | 100+ jobs/week |
| Job completion success rate | ≥ 95% |

### What are we changing?

| Shift from | → | Shift to |
|------------|---|----------|
| Teams managing their own EMR clusters | → | Platform-managed EMR on EKS per project |
| Manual Spark operator installation and config | → | Pre-configured Spark capability via DataOS |
| Direct kubectl/spark-submit requiring K8s knowledge | → | DataOS API for job submission |
| Disconnected from Data Lake governance | → | Built-in integration with Iceberg/Glue Data Catalog |

**Outcome Owner** – TBD (Spark/EMR capability owner)  
**Delivery QTR** – Q1 FY27  
**Dependency** – EMR on EKS prerequisites, Spark Runtime Images migration, Data Lake connectivity  
**Cross-team Dependency PM** – Central Data Lake PM / Spark Runtime team PM

---

## Outcome 5: DataOS Environment Strategy

**As a** Platform Engineer / DataOS Developer  
**I want to** have dedicated internal dev/stg environments separate from user-facing environments  
**So that** I can safely develop and test platform changes without disrupting user workloads.

### How will we measure success?

| Metric | Target |
|--------|--------|
| Platform changes tested before user impact | 100% |
| Unplanned user workload disruptions from platform dev | Zero |
| DR failover validation | Quarterly |

### What are we changing?

| Shift from | → | Shift to |
|------------|---|----------|
| Using user dev/stg clusters for platform development | → | Dedicated internal clusters for platform testing |
| All environments treated equally (risky for users) | → | User environments treated as production-grade |
| Single region deployment | → | Multi-region support (us-west-2 dev, us-east-1 stg/prd) |
| No DR strategy | → | DR cluster with validated failover capability |

**Outcome Owner** – Anssi Junnola / Architecture team  
**Delivery QTR** – Q2 FY27  
**Dependency** – AWS account strategy, Security zone compliance, CloudOS multi-stack readiness  
**Cross-team Dependency PM** – CloudOS team PM / Security team PM

---

# FY27 Strategic Initiatives (January 2026 Update)

The following initiatives are sourced from the AD FY27 OKRs PowerPoint (January 2026).

---

## Initiative 01: Assistant (PSET) - Industry-smart, Person-tuned Assistant

*Note: This initiative is in early planning stages and details are pending finalization.*

**As a** Business User / Analyst  
**I want to** interact with an intelligent assistant that understands my industry context and personal preferences  
**So that** I can get data insights and complete analytics tasks more efficiently through natural language.

### Strategic Alignment
- Part of Autodesk's broader AI strategy
- Integrates with MCP (Model Context Protocol) ecosystem
- Supports both human and AI-driven workflows

**Outcome Owner** – TBD  
**Delivery QTR** – FY27  
**Dependency** – AI/ML infrastructure, MCP integration  
**Cross-team Dependency PM** – AI Platform PM

---

## Initiative 02: Trust/Governance (PSET) - Data Provenance

**As a** Data Steward / Compliance Officer  
**I want to** track not only data lineage but also the origins, context, classifications, and authenticity of data  
**So that** I can meet regulatory requirements (GDPR), ensure data subjects' rights are respected, and build stakeholder trust.

### How will we measure success?

| Metric | Target |
|--------|--------|
| Customer data audit capability | Full lifecycle traceability |
| GDPR compliance coverage | 100% for regulated data |
| Stakeholder trust indicators | Measurable improvement |

### What are we changing?

| Shift from | → | Shift to |
|------------|---|----------|
| Technical lineage only (data flow & dependencies) | → | Full provenance (source, ownership, processing history, authenticity) |
| Limited audit capability for customer data | → | Complete audit trail throughout data lifecycle |
| Reactive compliance | → | Proactive regulatory readiness |
| Implicit trust in data assets | → | Explicit transparency and accountability |

### Why is this important?

Robust data provenance is essential for establishing the Analytics Data Platform as a trusted environment for both internal teams and external customers. By enabling precise tracing of where and how customer data is used, the platform can confidently meet regulatory requirements such as GDPR, ensuring that data subjects' rights are respected and that data usage is fully auditable.

### Current State

MDM collects technical lineage metadata during data ingest and processing, providing a detailed map of data dependencies and transformations. However, this does not capture the broader context or authenticity of data assets. Specific customer data cannot yet be fully audited throughout its lifecycle, limiting the ability to ensure users can fully understand and trust those data assets.

**Outcome Owner** – TBD  
**Delivery QTR** – FY27  
**Dependency** – MDM integration, Governance framework  
**Cross-team Dependency PM** – Security PM, Compliance PM

---

## Initiative 03: Regionalization (PSET) - AD Multi-Region Enablement

**As a** Platform Admin / Compliance Officer  
**I want to** deploy AD infrastructure in regional boundaries (EMEA, etc.)  
**So that** we comply with data residency requirements (GDPR, Schrems II) and support Autodesk's global expansion.

### How will we measure success?

| Metric | Target |
|--------|--------|
| Regional infrastructure deployment | EMEA region operational |
| Data residency compliance | Full compliance achieved |
| Architecture documentation | Complete with cost models |
| Impacted systems mapped | 100% coverage |

### What are we changing?

| Shift from | → | Shift to |
|------------|---|----------|
| Single-region operation (US) | → | Multi-region infrastructure |
| No prior multi-region experience | → | Defined architecture and cost models |
| Data residency as secondary concern | → | Data residency as top priority |
| Latency-focused optimization only | → | Compliance-first with latency benefits |

### Why is this important?

Data residency is a company-level priority and a hard dependency for several initiatives launching Q2 2026. Establishing multi-region capability ensures legal adherence, unlocks global expansion, and prevents future launch delays. It positions AD's products for scalable, compliant operations across geographies.

### Current State

AD's platform currently operates in a single region with no prior multi-region work or team experience. Inference systems are the primary scope, with dependent systems like logging, monitoring, and storage requiring review. The full set of impacted systems and regional compliance rules remain to be mapped.

**Outcome Owner** – Abhilash Achar / AD Infrastructure Triad  
**Delivery QTR** – Q2 2026 (FY27)  
**Dependency** – AWS account strategy, Security zone compliance, CloudOS readiness  
**Cross-team Dependency PM** – AMP PM, Trust/Compliance PM

---

## Initiative 04: Self Service Fulfillment - API-First Product Experience

**As a** Data Platform Developer / Technical User  
**I want to** access every AD capability through consistent, versioned APIs that power SDK, CLI, and GUI interfaces  
**So that** I can build programmable, self-serve workflows and integrate with emerging AI and MCP-based ecosystems.

### How will we measure success?

| Metric | Target |
|--------|--------|
| API coverage across AD products | 100% of core capabilities |
| SDK/CLI availability | Functional and documented |
| Engineering intervention reduction | Measurable decrease in support tickets |
| MCP integration readiness | Prepared for AI-driven workflows |

### What are we changing?

| Shift from | → | Shift to |
|------------|---|----------|
| Fragmented interfaces (GUI-only, ad-hoc APIs) | → | Consistent, versioned APIs across all products |
| Duplicated logic across layers | → | Unified API-first model |
| Fragmented telemetry | → | Consolidated operational visibility |
| Engineering intervention for key workflows | → | Self-serve enablement |
| Limited AI readiness | → | Future-proofed for human and AI-driven workflows |

### Why is this important?

AD's technical users expect programmable, self-serve products. Today's fragmented interfaces—GUI-only features, ad-hoc APIs, and duplicated logic—slow delivery and limit automation. An API-first model creates consistency, scalability, and operational visibility while aligning with Autodesk's broader MCP strategy.

### Current State

Across AD's product portfolio, capabilities are inconsistently exposed through GUIs, CLIs, and APIs. Redundant logic exists across layers, telemetry is fragmented, and key workflows depend on engineering intervention (support tickets). These gaps limit self-serve enablement, slow integration, and hinder AI readiness. The current approach increases maintenance cost and creates uneven developer experiences.

**Outcome Owner** – TBD  
**Delivery QTR** – FY27  
**Dependency** – API standards, MCP strategy alignment  
**Cross-team Dependency PM** – Platform PM, DevRel PM

---

## Initiative 05: Faster Cheaper Better Platform - Unified Platform Modernization

**As a** Platform Admin / Engineering Leader  
**I want to** have all modernization efforts (migrations) aligned under a single framework  
**So that** we can track progress, dependencies, and outcomes holistically while avoiding duplicated effort and migration fatigue.

### How will we measure success?

| Metric | Target |
|--------|--------|
| Migrations tracked under unified framework | All 6 key migrations |
| Shared visibility across teams | Single source of truth |
| Migration fatigue reduction | Measurable decrease in complaints |
| Duplicated effort elimination | Zero redundant work |
| Timeline conflicts resolved | Coordinated rollout strategy |

### Key Migrations Included

1. **Fivetran → Nexla** - Data integration modernization
2. **Astro Airflow → OSS Airflow on DataOS** - Workflow orchestration consolidation (Temporal also deprecated)
3. **Privacera → Apache Ranger** - Access control standardization
4. **dbt → Spark** - Transformation engine consolidation
5. **PopSQL → ADP Studio** - Query interface unification
6. **Parquet → Iceberg** - Data format modernization

### What are we changing?

| Shift from | → | Shift to |
|------------|---|----------|
| Six independent modernization efforts | → | Unified strategic initiative |
| Fragmented timelines and communication | → | Single narrative for modernization |
| No shared roadmap or dependency map | → | Coordinated visibility and tracking |
| Siloed execution without coordination | → | Aligned framework with sequencing |
| Migration fatigue from multiple parallel efforts | → | Coordinated rollout reducing partner burden |

### Why is this important?

Multiple independent modernization efforts are currently underway across ADP, creating potential overlaps, fragmented timelines, and inconsistent communication. By treating them as a unified strategic initiative, we establish a single narrative for modernization, improving visibility, governance, and accountability. This alignment will accelerate Autodesk's transition to a cloud-native, automated, and compliant data platform.

### Current State

Today, ADP's modernization efforts are fragmented, inconsistent, and often working against each other. While each has strong technical rationale, they currently operate as separate projects without shared visibility or success tracking. Each migration is happening in isolation with no shared roadmap, dependency map, or coordinated rollout strategy. Partner teams are being asked to participate in multiple migrations simultaneously, resulting in migration fatigue and complaints.

**Outcome Owner** – TBD  
**Delivery QTR** – FY27  
**Dependency** – Migration teams alignment, Partner team coordination  
**Cross-team Dependency PM** – Migration PM, Infrastructure PM

---

## Initiative 06: Next Gen. Data Experiences

**As a** Data Owner / Publisher / Consumer  
**I want to** have streamlined workflows for generating data deliverables, discovering data, and creating insights  
**So that** I can reduce time to value and increase adoption of analytics-driven processes.

### How will we measure success?

| Metric | Target |
|--------|--------|
| Time to generate data deliverables | Significant reduction |
| Data discovery improvements | Auto-generated semantics and metadata |
| Workflow consolidation | End-to-end analytics in integrated environment |
| User satisfaction | Measurable improvement |
| Onboarding acceleration | Faster time to productivity |

### What are we changing?

| Shift from | → | Shift to |
|------------|---|----------|
| Ad-hoc, cumbersome data experience | → | Holistic, consistent data experience |
| Self-service geared to data producers only | → | Self-service for analysts, PMs, leadership |
| Multiple disjointed tools and portals | → | Integrated analytics environment |
| Fragmented workflows for BI, data publishing | → | Unified end-to-end workflows |
| No standardized data egress path | → | Clear path to SFDC and business systems |
| Inconsistent data governance | → | Consistent governance across assets |

### Why is this important?

Autodesk has hundreds of developers and business users who need to publish, analyze, and interpret large volumes of data. Complex data environments introduce friction to users who must navigate multiple disjointed tools and portals. Users face fragmented workflows for dashboard creation, data publishing, and code generation which hinders scalability, introduces risk (compliance), and creates obstacles for new users.

### Current State

The current ADP data experience is ad-hoc and cumbersome. Self-service functionality is geared towards data producers (developers), leaving analysts, product managers, and leadership to navigate undefined paths for data discovery, transformation, and BI. Known gaps include immature/missing workflows, no standardized path for data egress, and inconsistent governance of data assets.

### Sub-initiatives

| Sub-initiative | Description | Owner |
|----------------|-------------|-------|
| BI Experience | Improved business intelligence tooling and workflows | TBD |
| Snowflake Modernization & Standardization | Cost optimization and standardized patterns | TBD |
| Cursor-like Experience for Data Teams | AI-assisted data development | TBD |
| Analytics Platform for Product Data | Centralized product telemetry analytics | TBD |
| Unified Data Experiences | Consolidated ingestion, transformation, visualization | TBD |
| Centralized Data Collection | Standardized data collection and governance | TBD |

**Outcome Owner** – TBD (Sponsor: Matt, PM Lead: Nick, ENG Lead: Sankalp)  
**Delivery QTR** – FY27  
**Dependency** – Querybook, BI tools, Portal integration  
**Cross-team Dependency PM** – AnD PM, UX PM

---

## Key Stakeholders & Communication

| Role | Name | Engagement Frequency |
|------|------|---------------------|
| Executive Sponsor | Seema Jaisinghani | Bi-weekly |
| Technical Lead | Anssi Junnola | Daily |
| Architecture | Kevin Sebastian | Weekly |
| PM Reviewer | Vaishak Suresh | Weekly |
| Engineering Lead | Tony Zhang | Weekly |

---

## Summary View - FY27 Strategic Initiatives

| # | Initiative | Persona | Key Shift | QTR |
|---|---------|---------|-----------|-----|
| 01 | Assistant (PSET) | Business User | Manual insights → AI-assisted analytics | FY27 |
| 02 | Trust/Governance - Data Provenance | Compliance Officer | Technical lineage only → Full provenance tracking | FY27 |
| 03 | Regionalization - Multi-Region Enablement | Platform Admin | Single-region → Multi-region (EMEA) | Q2 2026 |
| 04 | Self Service Fulfillment - API-First | Developer | Fragmented interfaces → Consistent APIs | FY27 |
| 05 | Faster Cheaper Better - Unified Modernization | Engineering Leader | Siloed migrations → Coordinated framework | FY27 |
| 06 | Next Gen. Data Experiences | Data Consumer | Disjointed tools → Integrated analytics | FY27 |

### DataOS Platform (Supporting Infrastructure)

| # | Outcome | Persona | Key Shift | QTR |
|---|---------|---------|-----------|-----|
| 1 | DataOS Platform MVP | Data Engineer | Fragmented clusters → Unified platform | Q1 |
| 2 | OSS Airflow on DataOS | Pipeline Developer | Astro + Temporal → OSS Airflow on DataOS | Q1 |
| 3 | Multi-Tenant Isolation | Platform Admin | Separate clusters → Shared with isolation | Q2 |
| 4 | Spark on EMR/EKS | Data Engineer | Manual EMR → API-driven submission | Q1 |
| 5 | Environment Strategy | Platform Engineer | Shared envs → Dedicated internal testing | Q2 |

---

## Notes

- **FY27 focuses on 6 strategic initiatives** aligned at the PSET AD level
- DataOS is positioned as a **distribution of CloudOS**, specifically for data workloads (similar to how KaaR serves web workloads)
- Current status shows **CaaS onboarding may be restricted** - fallback plan is Terraform-managed EKS
- The initiative replaces the deprecated **Workspace-as-a-Service (WaaS)** approach
- Key risk: **Wider blast radius** compared to current isolated per-service clusters - DR planning critical
- **Unified Platform Modernization** consolidates 6 key migrations (Fivetran→Nexla, Astro→OSS Airflow on DataOS, Privacera→Apache Ranger, dbt→Spark, PopSQL→ADP Studio, Parquet→Iceberg)
- **Multi-Region Enablement** is a company-level priority with Q2 2026 dependencies

---

## Additional Outcomes (Confluence Sources - January 2026)

The following additional outcomes were sourced from Confluence and remain relevant to FY27 planning. Many of these align with or support the 6 strategic initiatives above.

| Initiative | Use Case | Outcome | Success Metric | Outcome Owner | Delivery QTR | Dependency | Cross-team Dependency PM |
|------------|----------|---------|----------------|---------------|--------------|------------|--------------------------|
| Interactive Analytics in Data Portal - Advanced Tuning and Performance | Engineers need query-plan insights to improve runtime & spend and debug SQL/Py code | Visual query plan; AI "Fix & Optimize"; Cost surface for queries | 1) P95 latency ≤ 1.5s 2) Visual plan available 3) AI optimization suggestions | Querybook Team | FY26 Q4 | Querybook MVP GA, Presto/Trino integration | AnD team PM |
| Unified MFE for Project Resources - Configure and Maintain Resources | Platform users need to customize compute size and view resource versions for compliance | Unified MFE for viewing, configuring, and maintaining project infrastructure resources | 1) Users can select compute sizes 2) Version visibility for compliance 3) View due dates for resource actions | Nitin Kakkar / Infra Team | Q1 FY27 | AD Infra API, Unified MFE release | Batch Processing PM, EDEV PM |
| Tearing down unused Compute and Orchestration resources in Corp Env | Platform needs to archive vacant corporate resources to reduce costs | Utility to periodically archive corporate EMR Clusters (Notebooks, ETL), Astro Tenants that are vacant | 1) 80% unutilized resources cleaned up 2) Cost savings achieved 3) Automated archival process | Infra Team | Q2 FY26 (Q4 2025) | Post-migration status, Resource inventory | BP PM, EDEV PM |
| Interactive Analytics in Data Portal - Migration Toolkit | Platform users want unified tool instead of juggling multiple interfaces; need Git integration | Seamless switch-over with auto-commit .sql on save, import/export notebooks (.ipynb/.json) with Git integration | 1) Auto-commit .sql on save 2) Git integration working 3) Migration from PopSQL supported | Querybook Team | FY26 Q4 | Querybook GA, Git repository setup | AnD team PM |
| Analysis on impact of Regionalization | ADP must modularize infrastructure for regional deployments to comply with GDPR/Schrems II | ADP Regionalization Infrastructure Readiness - modular, secure regional instances with Tier 1 compliance | 1) Customer Tenant deployed in EMEA 2) Functional parity with US deployment 3) Tier 1 compliance achieved | Abhilash Achar / AD Infra Triad | FY27 | AWS account strategy, Security zone compliance, CloudOS readiness | AMP PM, Trust/Compliance PM |
| Infrastructure Cleanup - IAM roles | Post-migration cleanup of IAM roles including Offramp roles | Clean up IAM roles including the Offramp role after corporate-commercial migration | 1) All unused IAM roles identified 2) Offramp roles cleaned up 3) Security audit passed | Infra Team | Q2 FY26 (Q4 2025) | Pipeline migration completion | Security PM |
| Access Control - Privacera Deprecation | Replace Privacera with AWS Lake Formation for fine-grained access control (cost savings) | Migration from Privacera to Lake Formation for centralized access control with cost reduction | 1) ~6000 roles migrated 2) ~5800 policies migrated 3) Cost reduced from ~$300k/yr to ~$100k/yr ongoing | Access Management Team | FY27 | Lake Formation evaluation, Policy mapping | AnD PM, Security PM |

---

## Outcome 6: Interactive Analytics - Advanced Tuning and Performance

**As a** Data Engineer / Analyst  
**I want to** see query-plan insights and optimization suggestions  
**So that** I can improve query runtime, reduce costs, and debug SQL/Python code effectively.

### How will we measure success?

| Metric | Target |
|--------|--------|
| Query execution P95 latency | ≤ 1.5 seconds |
| Visual query plan availability | 100% of executed queries |
| AI optimization suggestions | Available for complex queries |

### What are we changing?

| Shift from | → | Shift to |
|------------|---|----------|
| Blind query execution without insight | → | Visual query-plan insights |
| Manual query optimization | → | AI "Fix & Optimize" suggestions |
| No cost visibility for queries | → | Cost surface showing query spend |
| Debugging through trial and error | → | Tools to debug SQL/Py code |

**Outcome Owner** – Querybook Team  
**Delivery QTR** – FY26 Q4  
**Dependency** – Querybook MVP GA, Presto/Trino integration  
**Cross-team Dependency PM** – AnD team PM

---

## Outcome 7: Unified MFE for Project Resources - Configure and Maintain

**As a** Platform Developer  
**I want to** customize compute size and view versions of resources through a unified interface  
**So that** I can meet performance requirements and ensure compliance with privacy and security mandates.

### How will we measure success?

| Metric | Target |
|--------|--------|
| Users able to customize compute size | 100% of eligible projects |
| Version visibility for compliance | All compute and orchestration resources |
| Users can view due dates for required actions | Real-time availability |

### What are we changing?

| Shift from | → | Shift to |
|------------|---|----------|
| Fixed default compute sizes only | → | Selectable compute sizes from preset options |
| No visibility into resource versions | → | Clear version display for compliance tracking |
| Scattered resource management | → | Unified MFE for all project resources |
| Manual compliance checks | → | Automated due date visibility for resource actions |

**Outcome Owner** – Nitin Kakkar / Infra Team  
**Delivery QTR** – Q1 FY27  
**Dependency** – AD Infra API release, Unified MFE integration with Data Portal  
**Cross-team Dependency PM** – Batch Processing PM, EDEV PM

---

## Outcome 8: Tearing Down Unused Compute and Orchestration Resources

**As a** Platform Admin  
**I want to** automatically identify and archive vacant compute and orchestration resources  
**So that** we can reduce costs and operational overhead from unused infrastructure.

### How will we measure success?

| Metric | Target |
|--------|--------|
| Unutilized resources cleaned up | ≥ 80% |
| Cost savings from resource cleanup | Measurable reduction |
| Automated archival process operational | Running on schedule |

### What are we changing?

| Shift from | → | Shift to |
|------------|---|----------|
| Manual identification of unused resources | → | Automated utility for detection |
| Resources remain indefinitely | → | Periodic archival of vacant EMR Clusters, Astro Tenants |
| No visibility into resource utilization | → | Clear metrics on resource usage |
| High cost from idle infrastructure | → | Cost optimization through cleanup |

**Outcome Owner** – Infra Team  
**Delivery QTR** – Q2 FY26 (Q4 2025)  
**Dependency** – Post-migration status, Resource inventory analysis  
**Cross-team Dependency PM** – BP PM, EDEV PM

---

## Outcome 9: Interactive Analytics - Migration Toolkit

**As a** Platform User / Data Analyst  
**I want to** have a unified tool with seamless migration capabilities and Git integration  
**So that** I can stop juggling multiple disconnected interfaces and version-control my work.

### How will we measure success?

| Metric | Target |
|--------|--------|
| Auto-commit .sql on save | Functional |
| Import/export notebooks with Git | Working for .ipynb/.json |
| PopSQL query migration | Supported |

### What are we changing?

| Shift from | → | Shift to |
|------------|---|----------|
| Multiple disconnected query interfaces | → | One unified Interactive Analytics tool |
| Manual version control of queries | → | Auto-commit .sql on save |
| No notebook portability | → | Import/export notebooks with Git integration |
| Locked-in to specific tools (PopSQL) | → | Migration path from existing tools |

**Outcome Owner** – Querybook Team  
**Delivery QTR** – FY26 Q4  
**Dependency** – Querybook GA, Git repository setup  
**Cross-team Dependency PM** – AnD team PM

---

## Outcome 10: Analysis on Impact of Regionalization

**As a** Platform Admin / Compliance Officer  
**I want to** deploy ADP infrastructure in regional boundaries (EMEA)  
**So that** we comply with GDPR, Schrems II, and data sovereignty requirements for regulated workloads.

### How will we measure success?

| Metric | Target |
|--------|--------|
| Customer Tenant deployed in EMEA | Functional parity with US |
| Tier 1 compliance achieved | Full compliance |
| Regional data residency | Data remains within designated geography |

### What are we changing?

| Shift from | → | Shift to |
|------------|---|----------|
| US-only data lake architecture | → | Modular regional deployments |
| Compliance gaps for EMEA customers | → | Full GDPR/Schrems II compliance |
| Single-region infrastructure | → | Multi-region support (US, EMEA) |
| Manual regional setup | → | Automated regional tenant provisioning |

**Outcome Owner** – Abhilash Achar / AD Infrastructure Triad  
**Delivery QTR** – FY27  
**Dependency** – AWS account strategy, Security zone compliance, CloudOS readiness  
**Cross-team Dependency PM** – AMP PM, Trust/Compliance PM

---

## Outcome 11: Infrastructure Cleanup - IAM Roles

**As a** Platform Admin / Security Officer  
**I want to** clean up unused IAM roles including Offramp roles post-migration  
**So that** we maintain security hygiene and reduce the attack surface.

### How will we measure success?

| Metric | Target |
|--------|--------|
| Unused IAM roles identified | 100% inventory complete |
| Offramp roles cleaned up | All deprecated roles removed |
| Security audit | Passed |

### What are we changing?

| Shift from | → | Shift to |
|------------|---|----------|
| Accumulated legacy IAM roles | → | Clean, minimal IAM footprint |
| Offramp roles remaining post-migration | → | Offramp roles cleaned up |
| Manual role cleanup | → | Automated cleanup process |
| Unknown security exposure | → | Audited and documented IAM state |

**Outcome Owner** – Infra Team  
**Delivery QTR** – Q2 FY26 (Q4 2025)  
**Dependency** – Pipeline migration completion  
**Cross-team Dependency PM** – Security PM

---

## Outcome 12: Access Control - Privacera Deprecation

**As a** Platform Admin / Cost Manager  
**I want to** migrate from Privacera to AWS Lake Formation for access control  
**So that** we reduce licensing costs while maintaining fine-grained data access governance.

### How will we measure success?

| Metric | Target |
|--------|--------|
| Roles migrated | ~6000 roles |
| Policies migrated | ~5800 policies |
| Annual cost reduction | From ~$300k/yr to ~$100k/yr ongoing |
| Feature parity | Maintained for Hive/Presto access control |

### What are we changing?

| Shift from | → | Shift to |
|------------|---|----------|
| Privacera for fine-grained access control | → | AWS Lake Formation |
| $300k/year licensing cost | → | ~$100k/year ongoing (AWS native) |
| Third-party dependency for access governance | → | AWS-native access management |
| Privacera-specific integration patterns | → | Lake Formation API integration |

**Outcome Owner** – Access Management Team  
**Delivery QTR** – FY27  
**Dependency** – Lake Formation evaluation complete, Policy mapping validated  
**Cross-team Dependency PM** – AnD PM, Security PM

---

## Document Sources

**Primary Sources:**
- AD FY27 OKRs PowerPoint (January 2026) - SharePoint: AD FY27 OKRs.pptx
- DataOS high-level design (Confluence)
- DataOS Problem Statement (Confluence)
- Project Plan - DataOS (Confluence)
- DataOS project tracker (Confluence)
- DataOS environment setup (Confluence)

**Additional Sources:**
- Querybook Feature Rich AD Platform SQL Interface
- AD Resource Management
- Unified Data Lake Experiences - Transition Plan
- Privacera Renewal FY26
- ADP Regionalization Infrastructure Readiness Plan

*Last updated: January 20, 2026*

