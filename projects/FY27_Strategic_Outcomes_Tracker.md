# FY27 Strategic Outcomes - Planning Tracker

> **Deprecated (2026-03-17).** This tracker has been consolidated into [[GTD/goals]]. See that file for the single source of truth — Initiatives as OKRs, Outcomes grouped by quarter, with confidence tracking and wikilinks to projects.

*Last Updated: January 20, 2026*

This page consolidates FY27 strategic outcomes from AD Platform Infrastructure initiatives, aligned with the 6 strategic initiatives defined in AD FY27 OKRs.

---

## FY27 Outcomes Summary

| Initiative | Use Case | Outcome | Success Metric | Outcome Owner | Delivery QTR | Dependency | Cross-team Dependency PM |
|------------|----------|---------|----------------|---------------|--------------|------------|--------------------------|
| Self Service Fulfillment | As a Data Engineer, I want to provision Spark compute resources through a self-service portal so that I can run workloads without waiting on platform team tickets or managing infrastructure directly. | Teams define request and configure processing requirements while the platform automates compute resource provisioning with Spark on EMR on DataOS with automated deployment, scaling, monitoring, cost optimization and lifecycle management. | 1) BP team fully onboarded and running production workloads. 2) Provisioning time reduced from 2 weeks to 4 hours. 3) Platform availability ≥99.5%. 4) Zero manual interventions for standard provisioning requests. | Platform Infra | Q1 FY27 | Batch Processing | Batch Processing PM |
| Self Service Fulfillment | As a Data Engineer, I want corporate schema access automatically provisioned when I request it through Data Portal so that I don't need to wait 24+ hours for manual engineering support. | Self-service UI in Data Portal for corporate schema access with automated Privacera/IAM policy application, audit trail for compliance, and auto-approval for ReadOnly access. | 1) Time to data access reduced from 24+ hours to <1 hour. 2) 80% of requests completed without human intervention. 3) 40% reduction in access-related support tickets. | TBD | Q1 FY27 | Access Management, Privacera | Access Management PM |
| Self Service Fulfillment | As a notebook user, I want GDC (Glue Data Catalog) access automatically configured when I onboard to ADP so that I can query data immediately without permission errors. | Auto-apply GDC access during project/tenant creation with self-service GDC access request in Data Portal and clear error messages with migration tool for existing tenants. | 1) Zero "User not authorized to perform glue:GetTable" errors for properly onboarded users. 2) Self-service GDC access completion rate >90%. | TBD | Q1 FY27 | GDC Migration, IAM | Infrastructure PM |
| Self Service Fulfillment | As a new team onboarding to Batch Processing, I want infrastructure resources (Astro, EMR, Git repo) auto-provisioned when I create a project so that I can start building pipelines immediately. | Auto-provision Astro tenant, EMR virtual cluster, and Git repository on project creation with API-driven provisioning using RM APIs. Remove infra ticket step from BP onboarding. | 1) Onboarding time reduced from weeks to days. 2) Zero infrastructure tickets required for standard onboarding. 3) 100% automated resource creation. | TBD | Q1 FY27 | RM APIs, Astro, EMR | BP PM, EDEV PM |
| Self Service Fulfillment | As a platform user, I want a single entry point for all platform support so that I don't waste time figuring out which channel to use. | Single intake channel for all platform requests with intelligent routing to appropriate team, unified ticket tracking, and clear documentation of support boundaries. | 1) User confusion reduced (measured via survey). 2) Mean time to correct team reduced by 50%. 3) Single source of truth for support requests. | TBD | Q1 FY27 | Organizational alignment | DevRel PM |
| Faster Cheaper Better Platform | As a Platform Admin, I want to automatically identify and archive vacant compute and orchestration resources so that we can reduce costs from unused infrastructure. | Utility to periodically archive corporate EMR Clusters (Notebooks, ETL), Astro Tenants that are vacant with automated detection and archival process. | 1) ≥80% unutilized resources cleaned up. 2) Measurable cost savings achieved. 3) Automated archival process operational. | Infra Team | Q2 FY26 (Q4 2025) | Post-migration status, Resource inventory | BP PM, EDEV PM |
| Faster Cheaper Better Platform | As a Platform Admin, I want all modernization efforts aligned under a single framework so that we can track progress and avoid duplicated effort. | Consolidated migration framework for Fivetran→Nexla, Airflow→Temporal, Privacera→Apache Ranger, dbt→Spark, PopSQL→ADP Studio, Parquet→Iceberg with unified tracking and visibility. | 1) All 6 migrations tracked under single framework. 2) Zero redundant work. 3) Clear dependency map. 4) Coordinated rollout strategy. | TBD | FY27 | Migration teams alignment | Migration PM |
| Data Lifecycle Management | As a Data Owner, I want automated alerts when my datasets are flagged as stale so that I can take action to deprecate unused data and reduce storage costs. | Automated stale data detection (365+ days no access) with owner notification workflow, escalation path, and retention extension requests with justification. | 1) Daily detection job operational. 2) Owner response rate >80% within 14 days. 3) Time to identify stale data: automated (daily) vs manual (weeks). | Abhilash Achar | Q1 FY27 | Usage Insights (Trino Logs), Metadata API | AnD PM |
| Data Lifecycle Management | As a Platform Admin, I want retention policies automatically enforced based on data classification so that we maintain compliance with ADPCDL standards. | Automated application of retention policies with audit logging, exception workflow, and integration with Lake Formation for permission-aware retention. | 1) 100% datasets with assigned retention policy. 2) 80% stale datasets remediated. 3) Zero compliance audit critical findings. | Abhilash Achar | Q4 FY27 | Lake Formation Migration, Data Classification | Compliance PM |
| Data Lifecycle Management | As a Data Owner, I want to initiate deprecation requests via Data Portal so that I can manage my data lifecycle without platform team involvement. | Self-service deprecation workflow with soft-delete (rename) before permanent deletion, owner confirmation, and downstream consumer notification. | 1) Self-service deprecation available in Data Portal. 2) 30-day recovery window for deprecated data. 3) Reduced platform team burden for deprecation requests. | Abhilash Achar | Q3 FY27 | Data Portal (Spindle) | AnD PM |
| Data Lifecycle Management | As a Finance Partner, I want to see storage costs for stale datasets attributed to data owner/team so that we can drive cost optimization decisions. | Cost attribution integration for stale data with owner dashboard, potential savings messaging, and integration with AD Cost Attribution dashboards. | 1) 100% stale data costs attributed. 2) Cost visibility in owner dashboard. 3) "If deprecated, save $X/month" messaging available. | Abhilash Achar | Q2 FY27 | Cost Attribution (FinOps) | FinOps PM |
| BI Self-Service | As a Business Analyst, I want to create a Looker dashboard using Data Lake tables so that I can provide insights without knowing the underlying infrastructure (Corporate vs Commercial). | One-click Looker connection from Data Portal with auto-provisioned service users, SSO authentication, and LookML scaffolding from dataset metadata. | 1) Time to first BI dashboard reduced from ~4 hours to <30 minutes. 2) Support tickets for BI setup reduced from ~20/month to <5/month. 3) Self-service connection success rate >90%. | TBD | Q2 FY27 | Unified Query Endpoint, Looker Admin | AnD PM |
| BI Self-Service | As a Finance Analyst, I want to connect Power BI Desktop to Data Lake tables so that I can build financial reports with familiar tools using SSO. | Power BI connection files from Data Portal with pre-configured .pbids files, ODBC/JDBC support, and self-service scheduled refresh. | 1) Power BI connection available via Data Portal. 2) SSO authentication working. 3) BI query cost attribution at 100%. | TBD | Q3 FY27 | Power BI Gateway, Enterprise IT | Enterprise Tools PM |
| Regionalization | As a Platform Admin, I want to deploy AD infrastructure in regional boundaries (EMEA) so that we comply with GDPR/Schrems II data residency requirements. | Multi-region infrastructure enabling data workloads in multiple regions with EMEA deployment, modular architecture, and Tier 1 compliance. | 1) Customer Tenant deployed in EMEA with functional parity. 2) Data residency compliance achieved. 3) Regional architecture documented with cost models. | Abhilash Achar / AD Infra Triad | Q2 2026 | AWS account strategy, Security zones, CloudOS readiness | AMP PM, Trust/Compliance PM |
| Trust/Governance | As a Compliance Officer, I want to track data provenance (origins, context, classifications, authenticity) so that I can meet GDPR requirements and build stakeholder trust. | Comprehensive data provenance tracking beyond lineage - capturing source, ownership, processing history with full audit capability. | 1) Full lifecycle traceability for customer data. 2) 100% GDPR compliance coverage for regulated data. 3) Measurable improvement in stakeholder trust. | TBD | FY27 | MDM integration, Governance framework | Security PM, Compliance PM |
| Access Control | As a Platform Admin, I want to migrate from Privacera to AWS Lake Formation for access control so that we reduce licensing costs while maintaining governance. | Migration from Privacera to Lake Formation for centralized access control with ~6000 roles and ~5800 policies migrated. | 1) ~6000 roles migrated successfully. 2) ~5800 policies migrated. 3) Cost reduced from ~$300k/yr to ~$100k/yr ongoing. 4) Feature parity maintained. | Access Management Team | FY27 | Lake Formation evaluation, Policy mapping | AnD PM, Security PM |
| DataOS Platform | As a Data Engineer, I want to provision and run data workloads (Spark, Temporal, Flink) through a unified, self-service platform so that I can focus on building data products instead of managing K8s infrastructure. | Unified DataOS platform with automated project provisioning via CRD, single multi-tenant platform, and CaaS-managed CloudOS-native clusters. | 1) ≥1 early adopter project running end-to-end batch pipelines. 2) Setup time reduced from weeks to days. 3) Platform availability 99.5%. | TBD (Seema Jaisinghani / Vaishak Suresh) | Q1 FY27 | CaaS cluster availability, AWS account setup, CloudOS/UCP GitOps access | CaaS/CloudOS team PM |
| DataOS Platform | As a Data Pipeline Developer, I want to deploy Temporal workers with configurable resources through a simple API so that I can orchestrate workflows without managing K8s infrastructure. | Platform-managed Temporal workers via operator with declarative CRD-based resource allocation and standardized External Secrets/SSM integration. | 1) BP team successfully onboarded. 2) Worker deployment time reduced 50% vs. self-managed. 3) Zero worker connectivity failures post-deployment. | Anssi Junnola / Gandhar Tandale | Q1 FY27 | DataOS infrastructure, Temporal server cluster, External Secrets Operator | Temporal Platform PM / Infra team PM |
| DataOS Platform | As a Platform Admin / Finance Partner, I want automatic tenant isolation with granular cost attribution so that teams can safely share infrastructure with accurate chargebacks. | Namespace-level isolation with automatic RBAC, quotas, and workload-level cost attribution within 24 hours of workload completion. | 1) 100% workloads running in isolated namespaces. 2) Cost reports within 24 hours. 3) Zero cross-tenant access incidents. | TBD (Infrastructure lead) | Q2 FY27 | DataOS MVP operational, MDM integration, FinOps tooling | FinOps team PM |
| DataOS Platform | As a Data Engineer, I want to submit Spark jobs through DataOS with automatic EMR virtual cluster provisioning so that I can run distributed batch processing without managing EMR infrastructure. | API-driven Spark job submission with pre-configured Spark capability, built-in integration with Iceberg/Glue Data Catalog. | 1) Spark job startup time <5 minutes average. 2) 100+ jobs/week throughput. 3) ≥95% job completion success rate. | TBD (Spark/EMR capability owner) | Q1 FY27 | EMR on EKS prerequisites, Spark Runtime Images migration, Data Lake connectivity | Central Data Lake PM / Spark Runtime team PM |
| DataOS Platform | As a Platform Engineer, I want dedicated internal dev/stg environments separate from user-facing environments so that I can safely develop and test platform changes. | Dedicated internal clusters for platform testing with multi-region support (us-west-2 dev, us-east-1 stg/prd) and DR cluster with validated failover. | 1) 100% platform changes tested before user impact. 2) Zero unplanned user workload disruptions. 3) Quarterly DR failover validation. | Anssi Junnola / Architecture team | Q2 FY27 | AWS account strategy, Security zone compliance, CloudOS multi-stack readiness | CloudOS team PM / Security team PM |
| Interactive Analytics | As a Data Engineer, I want to see query-plan insights and optimization suggestions so that I can improve query runtime and reduce costs. | Visual query plan in Querybook with AI "Fix & Optimize" suggestions and cost surface for queries. | 1) Query execution P95 latency ≤1.5 seconds. 2) Visual plan available for 100% of executed queries. 3) AI optimization suggestions for complex queries. | Querybook Team | FY26 Q4 | Querybook MVP GA, Presto/Trino integration | AnD team PM |
| Interactive Analytics | As a Platform User, I want a unified tool with seamless migration capabilities and Git integration so that I can stop juggling multiple disconnected interfaces. | Seamless switch-over from PopSQL with auto-commit .sql on save, import/export notebooks (.ipynb/.json) with Git integration. | 1) Auto-commit .sql on save functional. 2) Git integration working. 3) PopSQL query migration supported. | Querybook Team | FY26 Q4 | Querybook GA, Git repository setup | AnD team PM |
| Resource Management | As a Platform User, I want to customize compute size and view resource versions through a unified interface so that I can meet performance requirements and ensure compliance. | Unified MFE for viewing, configuring, and maintaining project infrastructure resources with selectable compute sizes and version visibility. | 1) 100% eligible projects can customize compute size. 2) Version visibility for all compute/orchestration resources. 3) Due dates for required actions visible in real-time. | Nitin Kakkar / Infra Team | Q1 FY27 | AD Infra API, Unified MFE release | Batch Processing PM, EDEV PM |

---

## Initiative Legend

| Initiative | Description | FY27 Strategic Alignment |
|------------|-------------|--------------------------|
| Self Service Fulfillment | API-first product experience, adoption acceleration | Initiative 04 |
| Faster Cheaper Better Platform | Unified platform modernization, cost optimization | Initiative 05 |
| Data Lifecycle Management | Stale data detection, retention policy enforcement, cost attribution | Initiative 05 + Trust/Governance |
| BI Self-Service | Business Intelligence tools connectivity to Data Lake | Initiative 06: Next Gen Data Experiences |
| Regionalization | AD Multi-Region Enablement for data residency | Initiative 03 |
| Trust/Governance | Data Provenance and regulatory compliance | Initiative 02 |
| Access Control | Privacera to Lake Formation migration | Initiative 05 |
| DataOS Platform | Supporting infrastructure for data workloads | Foundation for all initiatives |
| Interactive Analytics | Querybook and query tools | Initiative 06: Next Gen Data Experiences |
| Resource Management | Infrastructure resource configuration | Initiative 04 |

---

## Key Milestones by Quarter

### Q1 FY27
- DataOS Platform MVP operational
- Temporal Worker deployment on DataOS
- Spark Batch Processing (EMR on EKS) ready
- Stale data detection & owner notification live
- Unified MFE for resource management

### Q2 FY27
- Multi-Tenant Isolation & Cost Attribution
- DataOS Environment Strategy implemented
- Regionalization - EMEA deployment
- Cost attribution for stale data
- Looker self-service connectivity

### Q3 FY27
- Self-service deprecation workflow
- Lifecycle dashboard GA
- Power BI connectivity
- Lake Formation access integration

### Q4 FY27
- Retention policy enforcement
- Compliance audit readiness
- BI usage tracking
- Full provenance tracking

---

## Source Documents

- [AD FY27 OKRs PowerPoint](https://autodesk.sharepoint.com/) (January 2026)
- [AD Data Lake - Data Lifecycle Management PRD](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/694146391)
- [BI for CDL - Business Intelligence Tools Connectivity PRD](https://autodesk.atlassian.net/wiki/spaces/AA/)
- [Product Backlog: AD Infrastructure Platform](https://autodesk.atlassian.net/wiki/spaces/AA/) (6-Month Analysis)
- [FY27 Strategic Initiatives Outcomes](https://autodesk.atlassian.net/wiki/spaces/AA/)

---

*Document Owner: Abhilash Achar | AD Platform Infrastructure Triad*
