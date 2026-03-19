# Canva Data Management & Security Policies — Research Summary

**Date:** 2026-03-17
**Purpose:** Benchmark research for Autodesk AD Platform Infrastructure — how a comparable SaaS platform (customer-created IP content) handles data management, security, and governance.
**Relevance to Autodesk:** Canva handles customer-created content (designs, images, presentations) analogous to how Autodesk handles customer drawings and models. Both must protect customer IP while enabling internal analytics and product improvement.

---

## 1. Customer Content Data (IP) Protection

### How Canva Protects Customer-Created Designs

- **Private by default:** All Canva designs are private by default — only people explicitly added can access them. ([Privacy Policy §3b](https://www.canva.com/policies/privacy-policy/))
- **Encryption:** Customer data is encrypted at-rest and in-transit using SSL/TLS. ([Trust Center](https://trust.canva.com/))
- **Link sharing model:** Three tiers — "Only people added," "Only your team," and "Anyone with the link." The most restrictive is the default. ([Privacy Policy §3b](https://www.canva.com/policies/privacy-policy/))
- **Penetration testing:** Regular application-level penetration testing and code analysis. ([Trust Center](https://trust.canva.com/))

### Where Customer Data Is Stored

- **Primary cloud provider:** Amazon Web Services (AWS) — Canva has been an AWS customer since 2013. ([AWS Case Study](https://aws.amazon.com/solutions/case-studies/canva-2019/))
- **Storage regions:** Data is stored and processed in the **United States, Australia, Singapore, European Union, United Kingdom, Philippines, and New Zealand** (per Privacy Policy §5).
- **Scale:** ~260 million monthly active creators, ~100 billion events and 400 TB of data processed weekly.
- **Backup:** Multi-region backups and cross-region replication for databases (3+ TB backed up with cross-region replication).
- **No confirmed GCP usage** — all public documentation references AWS exclusively.

### Can Canva Employees Access Customer Designs?

- **Support access is opt-in:** Team admins can enable a setting that allows Canva support staff to temporarily access designs for troubleshooting — but only when a team member explicitly shares the affected design. When disabled, support staff cannot access any designs. ([Help Center — Privacy Settings](https://www.canva.com/help/manage-privacy-settings/))
- **Troubleshooting clause:** The Privacy Policy states Canva "may need to review your designs to support your request for help, correct general errors with the Canva Service or improve our services." (Privacy Policy §2)
- **Content moderation:** Canva uses automated content moderation and prompt filtering (part of Canva Shield) — human review of designs may occur for safety/abuse violations.
- **AI training:** Canva uses customer content for AI training, but **only with user consent** (opt-in via privacy settings). Users can opt out at any time. Private designs are excluded. Canva Education content is never used for AI training. ([Privacy Policy §2, §7d](https://www.canva.com/policies/privacy-policy/))

### Access Controls

- **Access monitoring** is listed as a core security control in the Trust Center.
- **Role-based access control (RBAC)** for enterprise teams.
- **SSO + SCIM** for enterprise identity management.
- **Admin controls** over content import, export, transfer, and feature access.

---

## 2. Enterprise Data Management — Data Lake & Analytics Infrastructure

### Data Warehouse: Snowflake

Canva uses **Snowflake** as its cloud data warehouse, which stores **25+ petabytes** of data with **90+ million queries/month**. Over two-thirds of Canva employees use Snowflake in some capacity (analysts, PMs, designers). ([canva.dev engineering blog](https://www.canva.dev/blog/engineering/service-aligned-data-platform-architecture/))

### Data Architecture Evolution

| Era | Approach | Details |
|-----|----------|---------|
| Legacy | Snapshot replication | Full database snapshots every 24 hours to S3, then ingested to Snowflake. Became unscalable as extraction times exceeded 24 hours. |
| Current | Change-Data-Capture (CDC) | Only captures DML changes (inserts, updates, deletes) as JSON records. Continuous streaming via AWS DMS (MySQL) and Kinesis Data Streams (DynamoDB). |

### Data Platform Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Ingestion (1P) | AWS DMS, Kinesis, Snowpipe Streaming | First-party service data CDC |
| Ingestion (3P) | Fivetran | Third-party ETL |
| Storage | AWS S3 → Snowflake | Raw data landing → warehouse |
| Transformation | dbt (data build tool) | Data modeling and orchestration |
| Visualization | Looker, Mode | BI and analytics |
| Reverse ETL | Census | Syncing enriched data back to operational systems |
| Event collection | Custom pipeline | 25 billion events/day |
| Monitoring | Custom tooling | Snowflake cost and usage monitoring |

### Service-Aligned Architecture (Data Mesh Characteristics)

Canva organizes its data platform using **service-aligned data architecture** with data-mesh-like characteristics:

1. **Source layer** — raw replicated data from each service database
2. **Model layer** — transformed data with business logic, owned by service teams
3. **Expose layer** — curated data that service owners publish for downstream consumers

Service owners define Infrastructure as Code (IaC) to create and own end-to-end data infrastructure for their service, treating **data as a first-class product**.

### Key Engineering Blog Posts (canva.dev)

- [Service-aligned Data Platform Architecture](https://www.canva.dev/blog/engineering/service-aligned-data-platform-architecture/) (Jun 2022) — CDC migration, data mesh approach
- [Snowpipe Streaming](https://www.canva.dev/blog/engineering/snowpipe-streaming/) — Migrating from AWS Firehose to Snowpipe Streaming (cost reduction)
- [Scaling to Count Billions](https://www.canva.dev/blog/engineering/scaling-to-count-billions/) — OLAP for high-volume analytics
- [How Canva collects 25 billion events per day](https://www.canva.dev/blog/engineering/product-analytics-event-collection/) — Event collection pipeline
- [Snowflake Monitoring Mastery](https://www.canva.dev/blog/engineering/our-journey-to-snowflake-monitoring-mastery/) — Cost and usage monitoring
- [Trust but Test: Vendor Security Testing](https://www.canva.dev/blog/engineering/trust-but-test/) — Vendor security assessment approach

---

## 3. Download to Corporate Devices / DLP Controls

### What Is Publicly Known

**Limited public disclosure.** Canva does not publicly detail its internal DLP (Data Loss Prevention) or endpoint security controls for employees. However, based on available evidence:

- **Enterprise admin controls for customers:** Admins can restrict who can import, export, and transfer content within Canva teams. Content transfer can be limited to "admins only." ([Help Center — Admin Controls](https://www.canva.com/help/admin-controls-for-enterprise/))
- **Access monitoring:** Listed as a core security control, suggesting logging and auditing of data access. ([Trust Center](https://trust.canva.com/))
- **SOC 2 Type 2 and ISO 27001:** Both certifications require documented access controls, least privilege principles, and audit logging — implying internal controls exist around employee data access.
- **Post-breach investment:** After the 2019 breach, Canva "increased security investments and resources fivefold" during ISO 27001 certification with Privasec. The security team was described as "much larger" and "still growing" by 2021. ([iTnews](https://www.itnews.com.au/news/canvas-infosec-resourcing-still-growing-two-years-after-large-data-breach-569282); [Privasec Case Study](https://privasec.com/resources/blog/featured-case-study-canva-iso-27001-certification-with-privasec/))

### What Can Be Inferred (SOC 2 / ISO 27001 Requirements)

Organizations holding SOC 2 Type 2 and ISO 27001 must typically implement:
- Least privilege access to production systems and customer data
- Audit logging of access to sensitive data
- Background checks for employees with data access
- Endpoint security controls (MDM, DLP, encryption)
- Data handling procedures for different classification levels
- Incident response procedures

**Gap:** No public documentation on specific DLP tools, endpoint management, or whether employees can download customer data to laptops.

---

## 4. Data Classification and Governance

### Privacy Policy Data Categories

Canva's Privacy Policy implicitly classifies data into several categories:

| Category | Examples | Handling |
|----------|----------|----------|
| **User Content** | Designs, images, documents, videos, metadata | Private by default; encrypted at-rest; opt-in AI training |
| **Account Information** | Username, name, email, birthdate, phone, profession | Used for service delivery, support, personalization |
| **Usage/Analytics Data** | Activity data, clickstream, event data | Used for analytics, ML, service improvement; general usage data AI training on by default (can opt out) |
| **Third-Party Data** | Social media info, marketing data, employer info | Used for personalization and advertising; opt-out available |
| **Payment Data** | Billing information | PCI DSS compliant handling |
| **Education Data** | Student data in Canva Education | Enhanced protections — no AI training, no advertising, COPPA/FERPA certified |

### Governance Framework

- **No public data classification framework** (unlike some enterprises that publish tiered classification schemas).
- **Shared Responsibility Model** for API developers: Canva and third-party developers share security responsibilities for data accessed through Connect APIs. Developers must conduct vulnerability assessments and remediate issues per defined timelines. ([Canva Dev Docs](https://www.canva.dev/docs/connect/guidelines/shared-responsibility/))
- **Data Processing Addendum (DPA):** Available for enterprise customers, governing Canva as a data processor for EU/UK compliance.
- **Authority Request Policy:** Governs disclosure of user data to law enforcement and regulators.

---

## 5. Security Certifications and Compliance

| Certification / Framework | Status | Notes |
|---------------------------|--------|-------|
| **SOC 2 Type 2** | Certified | Vendor-attested; reports available via Trust Portal |
| **ISO/IEC 27001** | Certified | Achieved with Privasec; 5x increase in security investment |
| **PCI DSS** | Compliant | Payment card processing |
| **GDPR** | Compliant | EU data protection; Canva Pty Ltd is controller; DPA available |
| **CCPA/CPRA** | Compliant | California privacy rights; does not sell personal data |
| **EU-US Data Privacy Framework** | Adherent | Cross-border data transfer mechanism |
| **Swiss-US DPF** | Adherent | Swiss data transfer mechanism |
| **UK Extension to EU-US DPF** | Adherent | UK data transfer mechanism |
| **Digital Services Act (DSA)** | Compliant | EU digital platform regulation |
| **COPPA** | Certified (Education) | Certified by iKeepSafe for Canva Education |
| **FERPA** | Certified (Education) | Certified by iKeepSafe for Canva Education |

### Trust Center

Canva operates a **Trust & Security Portal** at [trust.canva.com](https://trust.canva.com/) (powered by SafeBase) where customers can:
- View compliance certifications
- Download SOC 2 and ISO 27001 audit reports
- Access penetration testing reports
- Review security documentation and assessments

---

## 6. Canva Shield

### Overview

**Canva Shield** is Canva's enterprise-grade security, privacy, and AI indemnification platform, launched in **October 2023**. It was specifically designed to address generative AI security concerns for enterprise customers using Magic Studio (Canva's AI suite).

### Key Components

| Feature | Description |
|---------|-------------|
| **AI Privacy Controls** | Admins manage privacy preferences and team access to Magic Studio; users control AI training opt-in |
| **AI Indemnification** | Canva takes legal responsibility for AI-generated content issues for eligible enterprise users |
| **Content Moderation** | Automated content moderation and prompt filtering for AI-generated content |
| **De-biasing Model** | Industry-first model ensuring safe and inclusive AI-generated content |
| **Admin Feature Controls** | Enable/disable Magic/AI tools, Dream Lab, Canva Assistant per team |
| **Local Data Processing** | Reduces exposure to external servers (for certain operations) |
| **Activity Reporting** | Team dashboard for tracking usage and AI tool adoption |
| **$200M AI Royalty Program** | Two-year program compensating creators whose work informs AI tools |

### Enterprise Security Controls (beyond Shield)

- **SSO** (SAML 2.0)
- **SCIM** provisioning/de-provisioning
- **Role-based access control**
- **Content transfer restrictions** (admin-controlled)
- **Content import restrictions** (admin-controlled)
- **Email visibility controls**
- **Audit logging and access monitoring**

---

## 7. Data Breaches and Incidents

### May 2019 Breach

| Detail | Information |
|--------|------------|
| **Date discovered** | May 24, 2019 |
| **Attacker** | GnosticPlayers (alias) |
| **Users affected** | ~139 million |
| **Data exposed** | Usernames, email addresses, real names, city/country, password hashes (bcrypt, 61M users), Google auth tokens (78M Gmail users) |
| **Customer designs exposed?** | **No** — only account metadata was compromised, not design content |
| **Detection** | Canva detected and shut down the database server; attacker interrupted mid-attack |
| **Notification** | Reported to FBI and authorities immediately; user notifications sent |

### Aftermath and Improvements

- **January 2020:** Canva discovered ~4 million bcrypt hashes had been cracked; forced password resets for all users who hadn't changed passwords since the breach.
- **Security investment:** Increased security investment and resources **5x** during ISO 27001 certification process.
- **Team growth:** Built a "much larger" and "still growing" security team — the breach "had a really visceral impact on company executives." ([iTnews, 2021](https://www.itnews.com.au/news/canvas-infosec-resourcing-still-growing-two-years-after-large-data-breach-569282))
- **ISO 27001 certification:** Achieved post-breach, establishing a formal Information Security Management System (ISMS). ([Privasec Case Study](https://privasec.com/resources/blog/featured-case-study-canva-iso-27001-certification-with-privasec/))
- **Criticism:** Canva was criticized for including marketing content in initial breach notifications before addressing the security incident. ([Sophos](https://news.sophos.com/en-us/2019/05/28/millions-of-canva-users-data-stolen-as-gnosticplayers-strikes-again/))

### Key Takeaway for Autodesk
The 2019 breach exposed **account metadata only** — not customer designs or content. This suggests Canva had some separation between authentication/account systems and content storage systems, even before their post-breach security investments.

---

## 8. Comparison Notes — Relevance to Autodesk AD Platform

| Dimension | Canva | Relevance to Autodesk |
|-----------|-------|----------------------|
| **Customer IP content** | Designs, images, presentations — private by default, encrypted at-rest | Analogous to customer drawings, models, BIM data |
| **Cloud provider** | AWS (sole confirmed provider) | Autodesk uses AWS + Azure |
| **Data warehouse** | Snowflake (25+ PB) | Common enterprise choice; relevant for AD Data Lake planning |
| **Data architecture** | Service-aligned CDC with data mesh characteristics | Relevant model for AD platform service extraction |
| **AI training on customer data** | Opt-in with user consent; excludes private designs; Education exempt | Sets a policy benchmark for customer content ML use |
| **Employee access to customer content** | Support access opt-in by admin; access monitoring; no public DLP details | Gap area — Autodesk should define clearer public stance |
| **Certifications** | SOC 2 Type 2, ISO 27001, PCI DSS, GDPR, CCPA | Similar compliance posture expected |
| **Breach history** | 2019 (139M accounts, no content exposed); led to 5x security investment | Demonstrates value of incident-driven security maturation |
| **Enterprise security product** | Canva Shield (AI controls, indemnification, content moderation) | Model for enterprise security feature packaging |

---

## Sources

1. [Canva Trust & Security Portal](https://trust.canva.com/)
2. [Canva Privacy Policy](https://www.canva.com/policies/privacy-policy/) (updated March 16, 2026)
3. [Canva Shield / Secure your organization](https://www.canva.com/business/features/security-sso/)
4. [Service-aligned Data Platform Architecture — Canva Engineering Blog](https://www.canva.dev/blog/engineering/service-aligned-data-platform-architecture/)
5. [Snowpipe Streaming — Canva Engineering Blog](https://www.canva.dev/blog/engineering/snowpipe-streaming/)
6. [How Canva collects 25 billion events per day — Canva Engineering Blog](https://www.canva.dev/blog/engineering/product-analytics-event-collection/)
7. [Scaling to Count Billions — Canva Engineering Blog](https://www.canva.dev/blog/engineering/scaling-to-count-billions/)
8. [Snowflake Monitoring Mastery — Canva Engineering Blog](https://www.canva.dev/blog/engineering/our-journey-to-snowflake-monitoring-mastery/)
9. [Trust but Test: Vendor Security Testing — Canva Engineering Blog](https://www.canva.dev/blog/engineering/trust-but-test/)
10. [AWS Case Study: Canva](https://aws.amazon.com/solutions/case-studies/canva-2019/)
11. [Privasec Case Study: Canva ISO 27001](https://privasec.com/resources/blog/featured-case-study-canva-iso-27001-certification-with-privasec/)
12. [iTnews: Canva infosec resourcing still growing](https://www.itnews.com.au/news/canvas-infosec-resourcing-still-growing-two-years-after-large-data-breach-569282)
13. [SmartCompany: Canva Shield](https://www.smartcompany.com.au/artificial-intelligence/canva-shield-generative-ai-security-safety-enterprise-customers/)
14. [Canva Security Incident FAQs](https://www.canva.com/en_gb/help/incident-may24/)
15. [Canva Admin Controls](https://www.canva.com/help/admin-controls-for-enterprise/)
16. [Canva Shared Responsibility Model — Connect APIs](https://www.canva.dev/docs/connect/guidelines/shared-responsibility/)
