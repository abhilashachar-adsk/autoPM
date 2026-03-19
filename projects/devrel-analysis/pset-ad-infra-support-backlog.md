# Product Backlog: AD Infrastructure Platform
## Based on 6-Month Analysis of #pset-ad-infra-support

**Analysis Period:** July 2025 - January 2026  
**Generated:** January 20, 2026

---

## Executive Summary

After analyzing six months of support conversations in #pset-ad-infra-support, I've identified **six major themes** driving support volume. The most striking insight comes from Srivathsan Canchi's analysis:

> "The dev team is acting as a product surface. They are: The access visibility layer, The policy interpreter, The diagnostics engine, The workflow router. And they are doing it repeatedly, manually, and expensively."

This backlog aims to shift these manual, repetitive tasks into self-service capabilities, dramatically reducing support volume while improving user experience.

---

## Theme Analysis & Support Volume Drivers

| Theme | Est. % of Tickets | Automation Potential |
|-------|-------------------|---------------------|
| Access & Permissions | ~35% | High |
| Resource Provisioning | ~20% | High |
| Query/Execution Issues | ~15% | Medium |
| Documentation/Discovery | ~15% | High |
| Migration Support | ~10% | Medium |
| Platform Stability | ~5% | Medium |

---

## Product Backlog

### Epic 1: Self-Service Access Management
**Goal:** Eliminate manual IAM/permission tickets through automation

#### 1.1 Corporate Schema Access Automation (P0 - Critical)
**Problem:** Every corporate schema access request requires manual engineering intervention via the TeamDataAccessBot workflow.

**Evidence from Slack:**
- Multiple daily "Corporate Schema Access Request" tickets requiring manual Privacera/IAM configuration
- Engineers manually granting read-only access even when users request admin/readwrite
- 24-hour SLA for fulfillment creates bottleneck

**User Story:**
> As a data engineer, I want to request corporate schema access through Data Portal and have it automatically provisioned, so I don't need to wait for manual engineering support.

**Acceptance Criteria:**
- [ ] Self-service UI in Data Portal for corporate schema access requests
- [ ] Automated Privacera policy application
- [ ] Automated IAM role permission updates
- [ ] Audit trail for compliance
- [ ] Auto-approval for ReadOnly access; manual approval workflow for ReadWrite

**Effort Estimate:** Large

---

#### 1.2 GDC (Glue Data Catalog) Access Automation (P0 - Critical)
**Problem:** Teams migrating to GDC need manual cross-account role configuration.

**Evidence from Slack:**
- "User not authorized to perform glue:GetTable" errors after EMR/notebook upgrades
- Manual GDC access application via Jenkins pipelines
- Delays in provisioning access to new notebook endpoints

**User Story:**
> As a notebook user, I want GDC access automatically configured when I onboard to ADP, so I can query data immediately without permission errors.

**Acceptance Criteria:**
- [ ] Auto-apply GDC access during project/tenant creation
- [ ] Self-service GDC access request in Data Portal
- [ ] Clear error messages when GDC access is missing
- [ ] Migration tool to update existing tenants

**Effort Estimate:** Medium

---

#### 1.3 Cross-Account IAM Permission Self-Service (P1)
**Problem:** Cross-account IAM access requests (e.g., EMR accessing RDS in different account) require manual intervention.

**Evidence from Slack:**
- MAP team requesting cross-account IAM roles with CloudFormation permissions
- Security concerns about overly permissive PassRole permissions
- Manual review process creates delays

**User Story:**
> As a platform user, I want to request cross-account permissions through a governed self-service flow, so I can access resources across accounts without security review delays.

**Acceptance Criteria:**
- [ ] Self-service request form with pre-approved permission patterns
- [ ] Automated security guardrails (no PassRole to admin roles)
- [ ] Approval workflow for non-standard patterns
- [ ] Audit logging for compliance

**Effort Estimate:** Large

---

#### 1.4 Query Tool Access Unification (P1)
**Problem:** Users need separate access requests for PopSQL, QueryBook, DBeaver connections.

**Evidence from Slack:**
- Frequent "Need editor access to PopSQL" tickets
- "Unable to connect via presto-gdc-prd-corporate" errors
- Confusion about which query tool to use
- Recommendation to move users from PopSQL to QueryBook

**User Story:**
> As a data analyst, I want a single access request to enable all supported query tools, so I can choose my preferred tool without additional tickets.

**Acceptance Criteria:**
- [ ] Unified query tool onboarding flow
- [ ] Auto-provision QueryBook access with data access grants
- [ ] Clear documentation on query tool options and recommendations
- [ ] Deprecation path for PopSQL with QueryBook migration guide

**Effort Estimate:** Medium

---

### Epic 2: Resource Provisioning Automation
**Goal:** Enable teams to provision infrastructure resources without support tickets

#### 2.1 Batch Processing Onboarding Automation (P0 - Critical)
**Problem:** New teams onboarding to Batch Processing require manual Astro tenant, EMR cluster, and Git repo creation.

**Evidence from Slack:**
- Multiple "Infrastructure Resources Request" tickets for VC and Airflow
- Manual resource creation via Jenkins and APIs
- Inconsistent fulfillment times
- Request from BP team: "BP requests Astronomer infrastructure from infra team"

**User Story:**
> As a new team onboarding to Batch Processing, I want infrastructure resources (Astro, EMR, Git repo) auto-provisioned when I create a project, so I can start building pipelines immediately.

**Acceptance Criteria:**
- [ ] Auto-provision Astro tenant on project creation
- [ ] Auto-provision EMR virtual cluster on project creation
- [ ] Auto-create Git repository with example DAGs
- [ ] Remove infra ticket step from BP onboarding flow
- [ ] API-driven provisioning (use RM APIs)

**Effort Estimate:** Large

---

#### 2.2 Domain/Bucket Creation Self-Service (P1)
**Problem:** New domains and bucket requests require manual infrastructure provisioning.

**Evidence from Slack:**
- "Corporate bucket for ingestion new onboarding" requests
- Questions about how to create buckets using new API
- Manual domain creation in DEV environment

**User Story:**
> As a data domain owner, I want to create new domains and buckets through Data Portal, so I can set up my data infrastructure without infrastructure tickets.

**Acceptance Criteria:**
- [ ] Self-service domain creation flow in Data Portal
- [ ] Automated bucket provisioning with proper naming conventions
- [ ] IAM policy auto-configuration for new buckets
- [ ] Integration with GDC for catalog registration

**Effort Estimate:** Medium

---

#### 2.3 DAG Migration Tooling (P2)
**Problem:** Corporate to Commercial migration requires manual DAG recreation.

**Evidence from Slack:**
- "Tenants must manually recreate all DAGs individually on BP dashboard"
- Proposed solution: "Migrate 1-2 dags from the teams current repo so they can test"
- Migration overhead creates significant friction

**User Story:**
> As a team migrating from Corporate to Commercial, I want a tool to migrate my existing DAGs, so I don't have to manually recreate each pipeline.

**Acceptance Criteria:**
- [ ] DAG export tool from Corporate tenants
- [ ] DAG import tool to Commercial tenants
- [ ] Validation step to verify DAG compatibility
- [ ] Connection string/credential mapping for new environment

**Effort Estimate:** Medium

---

### Epic 3: Documentation & Discovery
**Goal:** Reduce support volume by enabling self-service discovery

#### 3.1 Unified Support Channel Communication (P0 - Critical)
**Problem:** Users are confused by multiple support channels.

**Evidence from Slack:**
- "Users confused between different support channels like C06JDM50NBE, C05J3848J4T, C05JFCCB0FK, C05F3UT42L9, C064QP3EFBM"
- "Think C05J3848J4T is one source for support"
- Users frequently redirected between channels
- Data Access team redirecting users to Infra support and vice versa

**User Story:**
> As a platform user, I want a single entry point for all platform support, so I don't waste time figuring out which channel to use.

**Acceptance Criteria:**
- [ ] Single intake channel for all platform requests
- [ ] Intelligent routing to appropriate team
- [ ] Unified ticket tracking across teams
- [ ] Clear documentation of support boundaries

**Effort Estimate:** Medium (organizational change, minimal engineering)

---

#### 3.2 Data Portal Navigation Improvements (P1)
**Problem:** Users struggle to find features in Data Portal after Access Portal migration.

**Evidence from Slack:**
- "Navigating on data portal for storage, ADP studio etc seems confusing"
- "Was not able to find storage page until I provided the link"
- "Users used to access control portal"

**User Story:**
> As a Data Portal user, I want intuitive navigation that helps me find features quickly, so I can be productive without asking for help.

**Acceptance Criteria:**
- [ ] Information architecture review and redesign
- [ ] Consistent navigation patterns across features
- [ ] Search functionality improvements
- [ ] Contextual help/tooltips for common tasks
- [ ] Migration guide from Access Portal

**Effort Estimate:** Medium

---

#### 3.3 Self-Service Documentation Portal (P1)
**Problem:** Documentation is scattered and difficult to discover.

**Evidence from Slack:**
- Users asking basic questions that should be answered by docs
- "Please follow the documentation" with long wiki URLs
- ChatGPT analysis: "Product documentation should be easy to discover, follow and intuitively answer basic questions"

**User Story:**
> As a platform user, I want comprehensive, searchable documentation integrated into Data Portal, so I can find answers without creating support tickets.

**Acceptance Criteria:**
- [ ] In-product documentation/help system
- [ ] Search across all platform documentation
- [ ] FAQ section based on common support questions
- [ ] Video tutorials for common workflows
- [ ] Feedback mechanism for documentation gaps

**Effort Estimate:** Medium

---

#### 3.4 CDL Bucket FAQ & Self-Service Verification (P2)
**Problem:** Users frequently ask "does my bucket exist?" and "how do I write to CDL?"

**Evidence from Slack:**
- "Check if CDL bucket exists" support requests
- "Bucket doesn't exist" errors when writing from AMP
- FAQ referenced but information missing/unclear

**User Story:**
> As an AMP user, I want to verify my CDL bucket exists and see my bucket paths in the UI, so I can troubleshoot data storage issues myself.

**Acceptance Criteria:**
- [ ] Bucket status visibility in Data Portal project view
- [ ] "Test write" functionality to verify permissions
- [ ] Updated FAQ with CDL bucket information
- [ ] Error message improvements with actionable guidance

**Effort Estimate:** Small

---

### Epic 4: Platform Stability & Observability
**Goal:** Reduce platform-related support tickets through proactive improvements

#### 4.1 Iceberg Metadata Health Dashboard (P1)
**Problem:** Iceberg metadata issues cause query failures and data access problems.

**Evidence from Slack:**
- "Metadata not found for iceberg table" errors
- "NotFoundException: Location does not exist" for metadata files
- Orphan file issues requiring AWS support tickets
- Complex debugging requiring infrastructure team involvement

**User Story:**
> As an infrastructure engineer, I want a dashboard showing Iceberg table health, so I can proactively identify and fix metadata issues before users report them.

**Acceptance Criteria:**
- [ ] Iceberg metadata validation job
- [ ] Dashboard showing table health status
- [ ] Automated alerting for metadata issues
- [ ] Self-service metadata repair tools where safe

**Effort Estimate:** Medium

---

#### 4.2 DAG Execution Monitoring & Alerts (P1)
**Problem:** Long-running or stuck DAGs are not automatically detected.

**Evidence from Slack:**
- "DAG was stuck/running for 4 days"
- "Jobs running more than 12 hours should auto terminate" but didn't
- No queuing when jobs are stuck

**User Story:**
> As a pipeline owner, I want automatic alerts when my DAG runs exceed expected duration, so I can investigate before downstream impacts occur.

**Acceptance Criteria:**
- [ ] Configurable SLA thresholds per DAG
- [ ] Automatic alerting when SLA breached
- [ ] Auto-termination option for runaway jobs
- [ ] Job queuing improvements when prior run is stuck

**Effort Estimate:** Medium

---

#### 4.3 Query Engine Performance Monitoring (P2)
**Problem:** Query performance issues reported after GDC migration.

**Evidence from Slack:**
- "GDC job takes significantly longer to run - more than an hour"
- "This is an hourly job, this performance is totally unacceptable"
- Looker dashboards timing out due to Presto cluster issues

**User Story:**
> As a platform engineer, I want visibility into query engine performance by tenant, so I can identify and address performance regressions proactively.

**Acceptance Criteria:**
- [ ] Query latency dashboards by tenant/catalog
- [ ] Performance comparison (GDC vs Hive Metastore)
- [ ] Alerting on performance degradation
- [ ] Query optimization recommendations

**Effort Estimate:** Medium

---

### Epic 5: Migration Support Tools
**Goal:** Streamline migrations to reduce support burden

#### 5.1 GDC Migration Validation Tool (P1)
**Problem:** Teams migrating to GDC face unexpected issues.

**Evidence from Slack:**
- Tables created in notebooks not visible in DBeaver after migration
- Metastore mismatch between environments
- Hive views not working in GDC/Iceberg

**User Story:**
> As a team migrating to GDC, I want a validation tool that checks my tables and pipelines, so I can identify issues before they impact production.

**Acceptance Criteria:**
- [ ] Pre-migration validation check
- [ ] Table-by-table migration status dashboard
- [ ] Compatibility check for views
- [ ] Rollback guidance if issues found

**Effort Estimate:** Medium

---

#### 5.2 Iceberg Adoption Accelerator (P2)
**Problem:** Teams struggle to adopt Iceberg table format.

**Evidence from Slack:**
- "Iceberg adoption identified as biggest technical challenge"
- View compatibility issues with Iceberg
- Sensor development for Iceberg tables

**User Story:**
> As a data engineer, I want clear guidance and tools to migrate my tables to Iceberg, so I can take advantage of modern table format benefits.

**Acceptance Criteria:**
- [ ] Iceberg migration playbook
- [ ] Schema compatibility checker
- [ ] Automated migration tool for simple tables
- [ ] Iceberg sensor availability (referenced as "coming soon")

**Effort Estimate:** Medium

---

### Epic 6: Developer Experience Improvements
**Goal:** Reduce friction in day-to-day platform usage

#### 6.1 Error Message Enhancement (P1)
**Problem:** Error messages don't provide actionable guidance.

**Evidence from Slack:**
- Generic "Access Denied" errors without context
- "401 Unauthorized" without explaining credential issues
- Users creating tickets to understand error causes

**User Story:**
> As a platform user, when I encounter an error, I want clear guidance on what went wrong and how to fix it, so I can resolve issues without support tickets.

**Acceptance Criteria:**
- [ ] Error code taxonomy with descriptions
- [ ] Self-service resolution steps in error messages
- [ ] Link to relevant documentation from errors
- [ ] Error code lookup in Data Portal

**Effort Estimate:** Medium

---

#### 6.2 Databand PostgreSQL Connection Fix (P2)
**Problem:** Databand connection strings with special characters cause failures.

**Evidence from Slack:**
- Multiple tickets: "ValueError: invalid interpolation syntax in postgresql://"
- Recurring issue across tenants (ADPTS-16213 mentioned multiple times)
- URL-encoded characters in passwords causing issues

**User Story:**
> As an Astro user with Databand integration, I want my monitoring to work reliably regardless of password special characters, so I don't have to create support tickets for configuration issues.

**Acceptance Criteria:**
- [ ] Fix URL encoding handling in Databand connection setup
- [ ] Automated connection string validation
- [ ] Documentation for special character handling
- [ ] Proactive fix for affected tenants

**Effort Estimate:** Small

---

#### 6.3 Notebook Endpoint Configuration Validation (P2)
**Problem:** Notebook endpoints created with incorrect configurations.

**Evidence from Slack:**
- "Job template specified while creating notebooks endpoint points to emr 6.1.0 but was created for emr-7.6.0-latest"
- Users unable to run backfill jobs from new endpoints

**User Story:**
> As an infrastructure engineer, I want endpoint creation to validate configuration consistency, so users don't encounter issues from mismatched settings.

**Acceptance Criteria:**
- [ ] Configuration validation in endpoint creation pipeline
- [ ] Version compatibility checks
- [ ] Clear error when configuration mismatch detected
- [ ] Self-service endpoint configuration view

**Effort Estimate:** Small

---

## Prioritization Matrix

| Item | Impact | Effort | Priority | Sprint Candidate |
|------|--------|--------|----------|------------------|
| 1.1 Corporate Schema Access Automation | High | Large | P0 | Q1 |
| 1.2 GDC Access Automation | High | Medium | P0 | Q1 |
| 2.1 Batch Processing Onboarding Automation | High | Large | P0 | Q1 |
| 3.1 Unified Support Channel | High | Medium | P0 | Q1 |
| 4.2 DAG Execution Monitoring | High | Medium | P1 | Q1 |
| 1.3 Cross-Account IAM Self-Service | Medium | Large | P1 | Q2 |
| 1.4 Query Tool Access Unification | Medium | Medium | P1 | Q1 |
| 3.2 Data Portal Navigation | Medium | Medium | P1 | Q2 |
| 3.3 Self-Service Documentation | Medium | Medium | P1 | Q2 |
| 4.1 Iceberg Metadata Dashboard | Medium | Medium | P1 | Q2 |
| 5.1 GDC Migration Validation | Medium | Medium | P1 | Q2 |
| 6.1 Error Message Enhancement | Medium | Medium | P1 | Q2 |
| 2.2 Domain/Bucket Self-Service | Medium | Medium | P1 | Q2 |
| 4.3 Query Performance Monitoring | Medium | Medium | P2 | Q2 |
| 2.3 DAG Migration Tooling | Medium | Medium | P2 | Q3 |
| 3.4 CDL Bucket Self-Verification | Low | Small | P2 | Q2 |
| 5.2 Iceberg Adoption Accelerator | Medium | Medium | P2 | Q3 |
| 6.2 Databand PostgreSQL Fix | Low | Small | P2 | Q1 |
| 6.3 Notebook Endpoint Validation | Low | Small | P2 | Q1 |

---

## Success Metrics

### Primary KPIs
1. **Support Ticket Volume Reduction:** Target 40% reduction in manual tickets within 6 months
2. **Time to Data Access:** Target <1 hour for standard access requests (currently 24+ hours)
3. **Self-Service Success Rate:** Target 80% of requests completed without human intervention

### Secondary KPIs
1. **User Satisfaction (CSAT):** Survey after support interactions
2. **Mean Time to Resolution:** Track for remaining manual tickets
3. **Documentation Effectiveness:** Track documentation views vs. related tickets

---

## Stakeholder Communication Strategy

Based on the Mochary Method principles, here's how to communicate this backlog:

### Making Stakeholders Feel Heard (MMM Method 8)
Before presenting solutions, acknowledge the current pain:
- "I heard that the support load is unsustainable"
- "I understand teams are frustrated by wait times"
- "I recognize documentation gaps are causing repeated questions"

### Difficult Conversation Preparation (MMM Method 7)
Some items will require cross-team coordination or organizational change (e.g., unified support channel). When presenting these:
1. State the difficult thing clearly: "We need to consolidate support channels"
2. Explain why: "Users are confused and tickets are being bounced"
3. Acknowledge concerns: "I know this changes team boundaries"
4. Focus on outcomes: "This serves our users better"

### Bias to Action (MMM Method 9)
For each sprint:
- Identify the first action for each committed item
- Start that action in the sprint planning meeting
- Create calendar blocks for larger items

---

## Next Steps

1. **Validate with Engineering:** Review effort estimates with technical leads
2. **Stakeholder Review:** Present to product leadership for prioritization input
3. **Dependency Mapping:** Identify cross-team dependencies
4. **Sprint Planning:** Commit to Q1 items in next sprint planning
5. **Communication:** Announce roadmap to #adp-community with expected timelines

---

*This backlog was generated by analyzing 6 months of #pset-ad-infra-support conversations. It should be reviewed and refined with input from the engineering team and stakeholders.*
