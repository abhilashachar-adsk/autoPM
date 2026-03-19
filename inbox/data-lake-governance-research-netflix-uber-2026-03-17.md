# Data Lake Governance Research: Netflix & Uber

**Date:** 2026-03-17
**Purpose:** Understand how large-scale consumer tech companies govern their data lakes, particularly whether employees can download data to corporate devices. Relevant benchmarking for AD Platform Infrastructure data governance strategy.

---

## NETFLIX

### 1. Data Lake Architecture

**Storage Layer:** Netflix's data lake is built entirely on **AWS S3** as the central storage layer, separating compute from storage. The platform stores **hundreds of petabytes** of raw data including user interactions, streaming logs, content metadata, and operational data.

**Compute Layer:**
- **Apache Spark** — large-scale ETL and data transformations
- **Presto/Trino** — low-latency interactive SQL queries across S3 data
- Both run on **Amazon EMR** (Elastic MapReduce) infrastructure
- **Keystone, Mantis, and Flink** handle real-time data-in-motion operations

**Table Format:** Netflix has migrated from Hive-based systems to **Apache Iceberg** (an open table format Netflix invented). This enables transactional compliance, time-travel queries, and schema evolution at massive scale. (Source: AWS re:Invent 2023 talk NFX306)

**Orchestration:** Netflix uses **Maestro**, their in-house workflow orchestration platform, for incremental processing on Iceberg tables.

**Cost Management:** Netflix operates a "data efficiency" dashboard that provides cost transparency across teams rather than imposing strict budgets, tracking S3 storage costs via inventory and compute costs through their Atlas monitoring system.

**Sources:** [Netflix Tech Blog — Presto](https://netflixtechblog.com/using-presto-in-our-big-data-platform-on-aws-938035909fd4), [Acceldata — Netflix Data Engineering](https://www.acceldata.io/blog/data-engineering-netflix-data-infrastructure), [Netflix Tech Blog — Maestro + Iceberg](https://netflixtechblog.com/incremental-processing-using-netflix-maestro-and-apache-iceberg-b8ba072ddeeb)

---

### 2. Data Governance & Access Control

**Data Gateway Platform:** Netflix's Online Datastore team built the **Data Gateway** to create powerful data abstractions that protect application developers from complex distributed databases (Cassandra, EVCache, OpenSearch) and incompatible API changes. It prevents database misuse anti-patterns and reduces migration burden. (Source: [Netflix Tech Blog — Data Gateway](https://netflixtechblog.medium.com/data-gateway-a-platform-for-growing-and-protecting-the-data-tier-f1ed8db8f5c6))

**Data Mesh (Netflix's version):** Netflix's Data Mesh is a **data movement and processing platform** for real-time use cases. Originally defined for Change Data Capture (CDC), it expanded to handle broader data movement and processing scenarios. It addresses the fragmented landscape of bespoke data movement solutions. (Source: [Netflix Tech Blog — Data Mesh](https://netflixtechblog.com/data-mesh-a-data-movement-and-processing-platform-netflix-1288bcab2873))

**Data Bridge:** A unified control plane that simplifies and standardizes data movement across diverse data stores by separating user intent from implementation. Published January 2026. (Source: [Netflix Tech Blog — Data Bridge](https://netflixtechblog.medium.com/data-bridge-how-netflix-simplifies-data-movement-36d10d91c313))

**DataHub Metadata Platform:** Netflix migrated to **DataHub** as their extensible metadata platform for self-serve data discovery and governance. This reduced reliance on the central Data Platform Team and enabled source system teams to define their own entity types and governance requirements. Netflix's privacy and legal teams define **custom governance properties** aligned with regulatory requirements to control how data is ingested and accessed. (Source: [DataHub — Netflix Collaboration](https://medium.com/datahub-project/how-netflix-is-collaborating-with-datahub-to-enhance-its-extensibility-a34d33f45947))

**Fine-Grained Access Control:**
- Netflix implements **purpose-based access control** for their data warehouse
- Data can be masked at **row, column, and sub-cell levels** for complex data types (structs, arrays, maps)
- Access is transparently routed based on the **purpose of data access** to ensure compliance
- Data owners determine who can access data within the analytics and downstream systems

**Dedicated Privacy Engineering Team:** Netflix employs Privacy Engineers and Data Engineers specifically focused on data protection. The Privacy and Data Protection Engineering team "ensures safe & efficient data use across Netflix" and works on data classification, policy development, control and capability design, implementation, and rollout. (Source: [Netflix Jobs — Privacy Engineer](https://www.getro.org/companies/netflix/jobs/41562532-privacy-engineer-l4-data-protection))

---

### 3. Security Architecture & Tooling

**Identity-First Architecture:** Netflix shifted from traditional permission models to an **identity-first architecture** that prioritizes identity isolation over granular permission controls. Key practices include:
- **Account segmentation** — containing blast radius if an account is compromised
- **Removing static keys** — using short-lived credentials rotated automatically through EC2 metadata
- **Permission right-sizing** — automated least privilege adjustments

**Open-Source Security Tools:**
- **Aardvark & Repokid** — continuous analysis and rightsizing of AWS IAM permissions; "autopilot for IAM" enforcing least privilege without heavy process
- **ConsoleMe & Weep** — central control plane for managing multi-account AWS permissions and access at scale
- **Stethoscope** — user-focused endpoint security application (detailed below)

**Sources:** [Netflix Tech Blog — Aardvark & Repokid](https://netflixtechblog.com/introducing-aardvark-and-repokid-53b081bf3a7e), [Netflix Tech Blog — ConsoleMe](https://netflixtechblog.com/consoleme-a-central-control-plane-for-aws-permissions-and-access-fd09afdd60a8), [tldrsec — Netflix Credential Compromise](https://tldrsec.com/p/appsec-netflix-s-layered-approach-to-reducing-risk-of-credential-compromise)

---

### 4. Endpoint Security & Download Policies

**Stethoscope (Endpoint Security):**
Netflix's Stethoscope is a user-focused endpoint security tool that provides **personalized recommendations rather than enforcement**. It evaluates:
- Application installations and remote login settings
- Screen lock status and automatic updates
- OS/software currency, firewall configuration, disk encryption
- Device health from JAMF, LANDESK, Google MDM

The philosophy: **education over enforcement**. Rather than automatically blocking actions, Stethoscope provides "personalized, actionable information" that respects employees' autonomy. This reflects Netflix's belief that "responsible people thrive on freedom." (Source: [Netflix Tech Blog — Stethoscope](https://netflixtechblog.com/introducing-netflix-stethoscope-5f3c392368e3))

**Can Netflix Employees Download Data to Laptops?**

Based on all available evidence, here is the nuanced picture:

- **No explicit public "no download" policy has been published.** Netflix's "freedom and responsibility" culture historically favored trust and autonomy over restrictive controls.
- **However, technical controls are in place.** The data lake architecture is server-side (S3 + EMR), and queries run through Presto/Spark on remote clusters — data is queried in place, not pulled to local machines at scale.
- **PII is masked at the access layer.** Netflix's fine-grained, purpose-based access control masks sensitive data at row, column, and sub-cell levels based on the purpose of access. Analysts would see masked/anonymized data unless their specific use case is approved.
- **AWS access is tightly controlled.** With Aardvark, Repokid, and ConsoleMe managing IAM policies, direct S3 bucket access from laptops would require specific, right-sized permissions that are continuously audited and reduced.
- **Endpoint security is advisory, not blocking.** Stethoscope recommends disk encryption, screen lock, etc., but does not technically block data from being on devices.
- **The cultural approach:** Netflix invests in making secure behavior easy rather than policing employees. The assumption is that with proper tooling, access controls, and purpose-based masking, there is no need for a blanket "no download" rule — data is controlled at the source.

**Key Inference:** Netflix's approach is **"control at the data layer, not the device layer."** Raw PII is unlikely to reach employee laptops because it is masked before it leaves the data warehouse. The combination of purpose-based access control, automated least privilege, and identity-first architecture means that even if an engineer could technically export query results, those results would already be stripped of sensitive data unless the engineer's specific use case is authorized.

---

### 5. Content Security

**For Production Partners (External):**
Netflix's Content Security Requirements are stringent and explicit:
- **Device encryption required:** FileVault for Mac, BitLocker for Windows
- **Strong passwords + 2FA** mandatory
- **Need-to-know access controls** with NDAs from all personnel
- **External hard drives and USB devices must be encrypted**
- **Monthly vulnerability assessments** and yearly penetration tests
- **Annual security training** required
- All third-party subcontractors must meet equivalent security measures

**For Streaming Content (DRM):**
Netflix uses **Microsoft PlayReady** as primary DRM technology and **Google Widevine DRM** for content protection across devices. Content is encrypted in transit and at rest on consumer devices.

**Sources:** [Netflix Partner Help Center — Content Security Requirements](https://partnerhelp.netflixstudios.com/hc/en-us/articles/360001937528-Netflix-Content-Security-Requirements), [Netflix Partner Help Center — Production Info Security](https://partnerhelp.netflixstudios.com/hc/en-us/articles/4804284966931-Content-Security-Production-Information-Security-Guidance)

---

## UBER

### 1. Customer Data Classification

**Data Categories Collected:**
- **Rider PII:** Names, email addresses, phone numbers, ratings, payment methods
- **Driver PII:** Names, contact details, license numbers, vehicle information
- **Trip Data:** Times/locations of trip requests/starts/ends, distance traveled, trip prices
- **Mobile Event Data:** 30 days of device OS, model, app version with location timestamps
- **Payment Data:** Credit card information, bank account details (excluded from user data exports for security)

**Classification Approach (DataK9):**
Uber uses **DataK9**, an AI/ML-powered automatic data categorization platform that classifies data at **field level across an exabyte of data**. The system:
- Replaces manual tagging of hundreds of thousands of columns across storage systems
- Uses probabilistic AI/ML to distinguish nuanced categories (e.g., personal vs. business addresses, precise vs. approximate locations)
- Trained on a manually-curated "golden" dataset (<1% of total, ~1,000 tables) by domain experts and privacy specialists
- Achieves >90% accuracy and >85% F2-score before production deployment
- Automated ticket creation for data owner review during mass categorization rollout

**Tag-Driven Access Policy:** Column categories/tags — not column names — determine access policies. Predefined tags assigned by data owners trigger corresponding access restrictions. For example, a location with lat/long to 3+ decimal places linked to personal ID could be classified as "Highly Restricted." (Source: [Uber Blog — DataK9](https://www.uber.com/en-US/blog/auto-categorizing-data-through-ai-ml/))

---

### 2. Data Lake Architecture

**Scale:** One of the world's largest Hadoop installations:
- **1.5 exabytes** of HDFS storage
- **10,000+ active users**
- **500,000+ Presto queries** and **370,000+ Spark applications** daily
- Tens of thousands of servers across two on-prem regions

**Migration to GCP (2024-ongoing):**
- **Phase 1 (IaaS Lift-and-Shift):** GCS for storage, existing stack (YARN, Hive, Spark, Presto) on GCP Compute Engine. As of 2024, >19% of analytical workloads run on GCP.
- **Phase 2 (PaaS Adoption):** Future adoption of Dataproc and BigQuery for cloud-native benefits.

**DataMesh (Uber's version):** Uber's DataMesh lays the foundation for cloud migration by:
- Mapping Hive databases to organizational GCS buckets (decentralized data ownership)
- Consolidating security groups to reduce access control complexity
- Classifying data by usage and lifetime with TTL policies for less-critical data
- Respecting cloud provider quotas in data mapping

**HiveSync:** Bi-directional, permissions-aware replication system handling 350 PB across dual-region data lakes for disaster recovery.

**Apache Hudi:** Used for trillion-record-scale data lake operations.

**Sources:** [Uber Blog — GCP Migration](https://www.uber.com/en-GB/blog/modernizing-ubers-data-infrastructure-with-gcp/), [Uber Blog — DataMesh](https://www.uber.com/blog/datamesh/), [Uber Blog — HiveSync](https://www.uber.com/blog/building-ubers-data-lake-batch-data-replication-using-hivesync/)

---

### 3. Data Governance & Security Controls

**Column-Level Access Control (CLAC):**
Uber implements column-level access control using **Apache Parquet's finer-grained encryption**. This addresses three controls simultaneously:
1. **Data access restrictions** — different columns can have different access limitations based on predefined tags
2. **Retention policies** — specific column categories can be deleted without destroying the entire table
3. **Encryption at rest** — Parquet modular encryption encrypts different columns with different keys (AES-GCM and AES-CTR)

When users lack permission for encrypted columns, they receive **masked (null) values** rather than hard failures — preventing pipeline disruptions while maintaining security. (Source: [Uber Blog — Parquet Encryption](https://www.uber.com/blog/one-stone-three-birds-finer-grained-encryption-apache-parquet/))

**Data Lifecycle Management (DLM):**
Uber's DLM manages data across lifecycle stages for three goals:
1. **Compliance** (GDPR, SOX, HIPAA) — regulatory requirements
2. **Cost efficiency** — deleting unused data, optimizing storage tiers, saving millions annually
3. **Data reliability** — backups and recovery

Operations include: on-demand deletion (right to be forgotten), periodic backups, type-based operations (PII deletion), and age-based operations (cold storage migration, data expiration). (Source: [Uber Blog — DLM Evolution](https://www.uber.com/blog/evolution-of-data-lifecycle-management-at-uber/))

**Security Model Bridge (Hadoop to GCP):**
Uber built integrations to bridge Hadoop's Kerberos-based security model (ACLs, delegation tokens) with GCP's IAM system, enabling seamless authentication and authorization across migrated infrastructure. (Source: [Uber Blog — Securing Hadoop on GCP](https://www.uber.com/en-UA/blog/securing-hadoop-on-gcp/))

---

### 4. Can Uber Employees Download Data to Laptops?

**Superuser Gateway (Published Late 2025):**
This is the definitive answer. Uber's **Superuser Gateway** fundamentally changed how employees interact with data:

- **Superuser access has been removed from individual engineers.** Only the Superuser Gateway backend holds elevated privileges.
- **Commands execute on Uber's servers, not locally.** Engineers submit commands via `superuser-cli`, which generates a PR in a dedicated repository.
- **Peer review is mandatory for write operations.** Another engineer must review and approve before execution.
- **Automated validation runs on every request:** impact estimation (e.g., how many files an `rm -r` would delete), permission checks, syntax validation.
- **Centralized audit trails** attribute all actions to individual engineers (not shared accounts).
- **Read-only operations have a lower-friction path** — debugging/investigation queries don't require full peer review, but still run through the controlled environment.

**Key quote from the blog post:** *"Because the credentials and execution environment live in the service, engineers never hold superuser tickets on their local machines. This means there's no way to circumvent the peer approval process."*

**For Presto/Spark queries:**
- Uber processes 500,000+ Presto queries daily across petabyte-scale infrastructure
- Column-level access control (CLAC) and Parquet encryption restrict what data is visible in query results
- Tag-driven policies mask sensitive columns for unauthorized users
- The DataMesh architecture maps data to organizational buckets with consolidated security groups

**Inference:** Uber's approach is even more restrictive than Netflix's. The combination of:
1. Superuser Gateway removing local privileged access
2. Column-level encryption making sensitive data unreadable without proper keys
3. Tag-driven access policies automatically masking PII
4. Post-breach hardened MFA and PAM controls

...means that **Uber employees cannot freely download raw sensitive data to corporate devices.** Query results from Presto/Spark would have sensitive columns masked or encrypted. Superuser operations happen server-side only.

**Source:** [Uber Blog — Superuser Gateway](https://www.uber.com/blog/superuser-gateway-guardrails/)

---

### 5. Post-Breach Security Controls

**2016 Breach:**
- Hackers used stolen credentials to access an Amazon S3 bucket, stealing data on **57 million users and 600,000 driver license numbers**
- CSO Joe Sullivan concealed the breach, paying hackers $100,000 as a fake "bug bounty" with NDAs
- Sullivan was convicted in October 2022 of obstruction of justice and misprision of a felony
- Uber paid **$148 million** to settle claims from all 50 states

**2022 Breach (Lapsus$):**
- Attacker purchased a contractor's compromised credentials from the dark web
- Bypassed MFA via "prompt bombing" (repeatedly sending push notifications until accepted)
- Found **hardcoded PAM admin credentials** in PowerShell scripts, gaining admin access to Thycotic (Uber's PAM system)
- Accessed AWS, GCP, Google Workspace, Slack, SentinelOne, and code repositories
- **Did NOT access** production systems, user accounts, or sensitive databases

**Post-Breach Security Improvements:**
1. **MFA Hardening:** Strengthened multi-factor authentication policies; required re-authentication for all internal tools
2. **Superuser Gateway:** Replaced direct superuser command execution with reviewed, auditable paths; removed superuser access from individual engineers
3. **Key Rotation:** Rotated keys to all internal services
4. **Codebase Lockdown:** Prevented unauthorized code changes
5. **Enhanced Monitoring:** Added additional internal environment monitoring
6. **Tool Disabling:** Disabled affected or potentially affected internal tools
7. **Account Remediation:** Forced password resets for compromised employee accounts

**Sources:** [Uber Newsroom — Security Update](https://www.uber.com/newsroom/security-update/), [GitGuardian — Uber Breach 2022](https://blog.gitguardian.com/uber-breach-2022), [Silverfort — Uber Breach Analysis](https://www.silverfort.com/blog/uber-breach-key-takeaways-why-mfa-service-account-protection-pam-must-work-together-to-protect-against-compromised-credentials/)

---

## COMPARATIVE ANALYSIS

| Dimension | Netflix | Uber |
|---|---|---|
| **Data Lake Scale** | Hundreds of PBs on S3 | 1.5 EB on HDFS, migrating to GCS |
| **Table Format** | Apache Iceberg (invented by Netflix) | Apache Hudi, Hive, Parquet |
| **Query Engines** | Presto, Spark on EMR | Presto (500K queries/day), Spark |
| **Cloud** | AWS (all-in) | On-prem + GCP migration |
| **Access Control Model** | Purpose-based (fine-grained masking at row/column/sub-cell) | Tag-driven CLAC with Parquet encryption |
| **Data Classification** | Privacy Engineering team + DataHub metadata | DataK9 (AI/ML auto-classification at field level) |
| **Endpoint Security** | Stethoscope (advisory, not blocking) | Superuser Gateway (enforcing, blocking) |
| **Download Policy** | No explicit ban; data masked at source before queries return | Explicitly restricted; superuser access removed from engineers |
| **Security Philosophy** | "Freedom and responsibility" — trust + tooling | Post-breach hardened — explicit controls + peer review |
| **Post-Breach Response** | N/A (no major public breach) | $148M settlement; complete security overhaul |
| **Content Protection** | Strict DRM (PlayReady, Widevine) + partner security requirements | N/A |
| **Data Lifecycle** | Cost-transparency dashboards | DLM framework (GDPR, SOX, HIPAA compliance + TTL policies) |

---

## KEY TAKEAWAYS FOR AD PLATFORM INFRASTRUCTURE

### What to Learn from Netflix:
1. **Purpose-based access control** is the gold standard — masking data based on *why* it's being accessed, not just *who* is accessing it
2. **Data masking at the source** is more effective than device-level controls — by the time data reaches an analyst, PII is already stripped
3. **Automated least-privilege** (Aardvark/Repokid model) continuously right-sizes permissions without manual overhead
4. **Advisory endpoint security** (Stethoscope) works well in high-trust cultures but requires strong data-layer controls as a backstop
5. **Extensible metadata platforms** (DataHub) enable decentralized governance while maintaining central policy

### What to Learn from Uber:
1. **AI-powered data classification** (DataK9) is essential at scale — manual tagging is impractical beyond a few thousand tables
2. **Column-level encryption** at the Parquet layer provides defense-in-depth that survives data copies
3. **Removing superuser access from individuals** and routing through a gateway with peer review is a proven pattern
4. **Breaches drive real change** — Uber's post-breach controls are now industry-leading precisely because they learned the hard way
5. **Tag-driven policies** that use semantic categories rather than column names are more resilient to schema changes

### Critical Insight:
**Neither company allows uncontrolled download of raw PII to corporate devices** — but they achieve this through different mechanisms:
- Netflix: masks data at the query layer so sensitive data never appears in results
- Uber: removes privileged access from local machines and encrypts sensitive columns at the storage layer

Both approaches are "prevention at the source" rather than "prevention at the endpoint."

---

*Research compiled 2026-03-17 for AD Platform Infrastructure data governance benchmarking.*
