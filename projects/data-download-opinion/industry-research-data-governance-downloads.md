# Industry Research: How Companies Manage Data Downloads to Corporate Devices

**Author:** Abhilash Achar, PM — AD Platform Infrastructure  
**Date:** 2026-03-11  
**Purpose:** Objective research on how peer companies and regulated industries handle data downloads from centralized data stores (data lakes, warehouses) to company-provided devices, with focus on customer content/IP, enterprise data, and PII.

---

## Executive Summary

This document surveys 10 companies across SaaS, design tools, payments, ride-sharing, content streaming, and enterprise software — all of which manage some combination of customer-created content (IP), enterprise analytics data, and PII in centralized data stores.

**Key finding:** No company uses a single approach. The industry has converged on a spectrum of controls that vary by **data classification**, not by a blanket allow/deny policy. The universal pattern is:

1. **Customer content/IP** receives the strongest protections (often inaccessible to employees entirely)
2. **PII** is masked, tokenized, or encrypted at the query layer before it reaches any device
3. **Internal analytics and enterprise data** is accessible to authorized employees on managed devices with DLP, encryption, and audit logging
4. **The endpoint is secured and trusted**, not treated as inherently hostile

---

## Company-by-Company Analysis

### 1. Adobe — Network Isolation for Customer Content

**Relevance to Autodesk:** Direct competitor. Handles customer-created content (Creative Cloud files, PDFs, Illustrator/Photoshop designs) analogous to Autodesk drawings and models.

**Data infrastructure:** Lakehouse architecture on Delta Lake + Apache Spark, deployed on Azure. Petabytes under management. Strategic integrations with Databricks and Snowflake.

**Customer content policy:** Customers own their content. Adobe's updated Terms of Service (June 2024) commit: "We will not use your Local or Cloud Content to train generative AI." Employee access is governed by RBAC with least privilege, reviewed quarterly. Sub-processors have no access to customer data.

**Download to corporate devices:** **Blocked at the network level.** The Adobe Enterprise Security Overview (August 2025) states:

> "Reverse tunneling is disabled from the solution, which in turn blocks the movement or duplication of any customer data from production environments to machines on the Adobe corporate network. In addition, any connection requests from the production environment to the corporate network are denied."

Engineers access production through bastion hosts with privileged access management (PAM). They can view data in production but cannot SCP, copy, or transfer it to laptops. This is a hard network control, not just policy.

**Endpoint controls:**
- CrowdStrike Falcon on every managed endpoint (30,000+ employees), with 33 custom add-ons via FalconPy SDK
- USB ports disabled via CIS hardening
- 802.1x wireless auth requiring MDM enrollment
- Centralized SIEM for event correlation

**Data classification:** Three tiers — Public, Internal, Confidential. Customer data is Confidential by default. Governed by Adobe's Common Controls Framework (CCF) — 315 controls across 25 domains, rationalized from 4,300+ requirements across 20+ standards. CCF is open-source.

**Key distinction from Autodesk:** Adobe isolates customer content because they are a **data processor** — customers are the data controllers, and Adobe processes their content under contract. Autodesk's internal analytics data (product usage, enterprise metrics) is **Autodesk-owned** data, not customer content being processed.

**Sources:**
- [Adobe Enterprise Security Overview (PDF)](https://www.adobe.com/cc-shared/assets/pdf/trust-center/ungated/whitepapers/corporate/adobe-enterprise-security-overview.pdf)
- [Adobe Trust Center — Security](https://www.adobe.com/trust/security.html)
- [Adobe Common Controls Framework](https://www.adobe.com/trust/compliance/adobe-ccf.html)

---

### 2. Canva — Design Content Protected, Analytics in Snowflake

**Relevance to Autodesk:** Handles customer-created design content (IP) — logos, presentations, social media graphics — similar to how Autodesk handles customer drawings and models.

**Data infrastructure:** 25+ PB Snowflake data warehouse processing 90M+ queries/month. CDC pipeline using AWS DMS, Kinesis, and Snowpipe Streaming. dbt for transformations, Looker/Mode for BI, Census for reverse ETL. Service-aligned data mesh model. 25 billion events/day.

**Customer content policy:** Designs are private by default with three-tier link sharing. Support staff can only access designs if an admin explicitly enables it AND a team member shares the affected design. AI training on customer content is opt-in only.

**Download to corporate devices:** No specific public policy disclosed. SOC 2 Type 2 and ISO 27001 certifications imply least-privilege access controls, audit logging, and endpoint security are in place. After their 2019 breach (139M accounts exposed — usernames, emails, bcrypt hashes, but **no customer designs**), Canva 5x'd their security investment.

**Data classification:** No public classification framework. Privacy Policy implicitly segments data into User Content, Account Info, Usage/Analytics, Third-Party Data, Payment Data, and Education Data — each with distinct handling rules.

**Certifications:** SOC 2 Type 2, ISO/IEC 27001, PCI DSS, GDPR, CCPA, EU-US Data Privacy Framework, COPPA/FERPA (Education).

**Canva Shield (Enterprise):** Launched October 2023 — AI privacy controls, AI indemnification, automated content moderation, admin feature controls for AI tools, and activity reporting.

**Sources:**
- [Canva Trust Center](https://trust.canva.com)
- [Canva Engineering — Data Infrastructure](https://canva.dev)
- [Canva Privacy Policy](https://www.canva.com/policies/privacy-policy/)
- [Canva Shield](https://www.canva.com/shield/)

---

### 3. Figma — Configurable Export Toggle (Closest Analogy to Autodesk)

**Relevance to Autodesk:** Figma is the most direct analogy — a design tool where customers create IP (UI designs, prototypes) stored in the cloud. Figma's approach to export controls is instructive.

**Customer content policy:** Customer designs are stored in Figma's cloud. Enterprise Key Management lets customers encrypt at rest with their own AWS KMS key — meaning even Figma employees cannot decrypt the content without the customer's key.

**Download / export controls:** Figma uses a **configurable export toggle** via Governance+, their enterprise administration product. Administrators can:
- Enable or disable file exports per organization
- Restrict copy/paste of design elements
- Set IP allowlists and network access restrictions to prevent data from reaching personal devices
- Control who can share files externally

This is a toggle, not a blanket ban. Organizations decide based on their own risk posture.

**Certifications:** SOC 2 Type 2, ISO 27001, FedRAMP authorized.

**Sources:**
- [Figma Security](https://www.figma.com/security/)
- [Figma Enterprise Key Management](https://www.figma.com/enterprise/)
- [Figma Governance+](https://www.figma.com/enterprise/governance/)

---

### 4. Netflix — Mask at the Query Layer, Trust the Device

**Relevance to Autodesk:** Netflix handles massive customer data (viewing history, preferences, PII) and content IP (licensed and original films/shows) in a centralized data lake.

**Data infrastructure:** Hundreds of PBs on AWS S3, queried via Presto and Spark on EMR, using Apache Iceberg (invented by Netflix) as the table format. DataHub for metadata governance.

**Customer data / PII policy:** Netflix achieves control through **purpose-based access control** that masks PII at the row, column, and sub-cell level *before query results are returned*. Engineers see masked data unless their specific use case is authorized. AWS IAM roles are continuously right-sized via Aardvark/Repokid (open-source tools Netflix built for this purpose).

**Download to corporate devices:** No explicit public "no download" policy. Consistent with their "freedom and responsibility" culture, Netflix controls data **at the source**, not at the endpoint:
- PII is masked before query results return — downloading masked data is acceptable
- Content (movies/shows) is protected by DRM (PlayReady, Widevine), not endpoint controls
- Endpoint security (Stethoscope) is **advisory, not blocking** — education over enforcement

**Content security (for production partners):** Strict requirements — encrypt all devices, 2FA, need-to-know access, annual pen tests. But these are for content production, not internal analytics.

**Philosophy:** "Control at the data layer, not the device layer." If PII is masked before it reaches the analyst, downloading results to a laptop is a non-issue because the sensitive data was never in the result set.

**Sources:**
- [Netflix Tech Blog — Data Governance](https://netflixtechblog.com)
- [Netflix Stethoscope](https://github.com/Netflix-Skunkworks/stethoscope)
- [Netflix Content Security Guidance](https://partnerhelp.netflixstudios.com/hc/en-us/articles/4804284966931)

---

### 5. Uber — Superuser Gateway, Classify Everything at Exabyte Scale

**Relevance to Autodesk:** Uber handles massive PII (rider/driver data, trip data, payment data) in a 1.5 exabyte data lake. Their post-breach evolution is instructive.

**Data infrastructure:** 1.5 EB on HDFS (migrating to GCS), processing 500K+ Presto queries daily. DataK9 provides AI-powered field-level classification across the entire data estate.

**Download to corporate devices:** Effectively **no direct download of production data.** The Superuser Gateway (deployed late 2025) removed superuser access from individual engineers entirely. The blog states: "Engineers never hold superuser tickets on their local machines." Commands execute on Uber's servers, not locally. All write operations require peer review via PR. Column-level encryption via Parquet means sensitive fields are unreadable without proper keys.

**Post-breach evolution (critical context):**
- **2016 breach** (57M records, $148M settlement): Weak cloud access controls, credentials in GitHub.
- **2022 breach** (~1 PB exposed): Social engineering (MFA fatigue), hardcoded PAM credentials in scripts.
- **Response:** Superuser Gateway, DataK9 classification, Data Lifecycle Management (automated PII deletion), per-workload LUKS encryption across 100K+ hosts, enhanced MFA, key rotation.

**Key insight:** Both breaches resulted from **credential and access control failures**, not from data being on corporate devices. Uber's response was better classification, access control, and lifecycle management — not prohibiting data downloads.

**Sources:**
- [Uber — Superuser Gateway](https://www.uber.com/blog/superuser-gateway-guardrails/)
- [Uber — DataK9: Auto-categorizing Data Through AI/ML](https://www.uber.com/en-US/blog/auto-categorizing-data-through-ai-ml/)
- [Uber — Evolution of Data Lifecycle Management](https://www.uber.com/blog/evolution-of-data-lifecycle-management-at-uber/)
- [Uber — Locking Down the Fleet (Encryption)](https://www.uber.com/blog/locking-down-the-fleet/)

---

### 6. Stripe — Secure the Device, Then Trust It

**Relevance to Autodesk:** Stripe handles the most regulated data type (PCI cardholder data) and has the most documented endpoint security program.

**Data infrastructure:** Data Pipeline exports to cloud destinations (S3, Snowflake, Redshift, Databricks, BigQuery). Cloud-to-cloud data movement is preferred over local downloads.

**Download to corporate devices:** PCI-DSS prohibits full card numbers (PAN), CVV, and magnetic stripe data on any local machine — even encrypted. All other analytics, transaction metadata, and enterprise data is accessible on managed corporate devices.

**Endpoint security (Secure Devices team):** The most detailed public endpoint program in this research:
- 10,000+ devices managed
- Custom macOS system extensions for DLP on every device
- Device attestation and software allowlisting
- Approved software lists — only authorized applications can execute
- Continuous monitoring and compliance verification

**Philosophy:** "Secure the device, then trust the device." Heavy investment in making the endpoint trustworthy rather than prohibiting data from reaching it.

**Sources:**
- [Stripe — Security](https://docs.stripe.com/security)
- [Stripe — Integration Security Guide](https://docs.stripe.com/security/guide)
- [Stripe — Secure Devices (Job Posting)](https://stripe.com/jobs/listing/security-infrastructure-engineer-secure-devices/6486711)

---

### 7. Dropbox — Zero-Knowledge for Customer Content, Standard Controls for Analytics

**Relevance to Autodesk:** Dropbox stores customer files (IP, documents, media) in the cloud, similar to Autodesk storing customer drawings.

**Customer content policy:** End-to-end zero-knowledge encryption where even Dropbox employees cannot read customer files. Only a "small number" of employees can access customer file environments, with documented justification and management approval required.

**Internal analytics data:** Standard DLP and access controls apply for internal analytics.

**Sources:**
- [Dropbox Security](https://www.dropbox.com/security)
- [Dropbox Trust Center](https://www.dropbox.com/trust)

---

### 8. Atlassian — Consent-Based Access, FIDO2, Zero Trust

**Relevance to Autodesk:** Atlassian hosts customer-created content in Confluence, Jira, and Trello — collaborative work products that constitute customer IP.

**Customer content access:** Customer consent is required before support engineers can access customer data. Export controls are configurable per classification level.

**Endpoint security:**
- FIDO2 hardware keys required for all staff (no SMS-based MFA)
- BYOD devices explicitly **cannot access customer data** — only corporate-managed devices
- Zero Trust with tiered criticality and automatic lockout for non-compliant devices

**Sources:**
- [Atlassian Trust Center](https://www.atlassian.com/trust)
- [Atlassian Security Practices](https://www.atlassian.com/trust/security/security-practices)

---

### 9. Box — Most Sophisticated Content DLP

**Relevance to Autodesk:** Box handles enterprise documents and files — customer content that constitutes IP.

**Download controls (Box Shield):** The most granular download DLP in this research:
- Per-classification download policies (Public / Internal / Confidential)
- ML-based anomaly detection for suspicious download patterns
- Device Trust with OS and antivirus requirements
- Customer-managed encryption via Box KeySafe
- 300+ auditable actions for compliance

**Sources:**
- [Box Shield](https://www.box.com/shield)
- [Box Trust](https://www.box.com/trust)

---

## Synthesis: Five Industry Patterns

### Pattern 1: Classification-Based Controls, Not Blanket Bans

Every company tiers its download policies by data sensitivity. No company uses a single allow/deny rule for all data types.

| Data Type | Typical Treatment |
|-----------|-------------------|
| **Customer content / IP** | Strongest protection — often inaccessible to employees (Adobe, Dropbox, Figma EKM) |
| **PII (customer identifiers)** | Masked or tokenized at query layer before reaching any device (Netflix, Uber DataK9) |
| **PCI / regulated financial data** | Prohibited locally per regulation (Stripe — PAN/CVV never on local machines) |
| **Internal analytics / enterprise data** | Accessible on managed devices with DLP, encryption, and audit logging |
| **Public / aggregated data** | Freely accessible |

### Pattern 2: Control at the Data Layer, Not Just the Endpoint

Netflix and Uber represent the most sophisticated approach: **mask PII before query results return**. If sensitive data never appears in the result set, downloading the results is inherently safe. This shifts the security boundary from the device to the data itself.

- Netflix: Purpose-based access control masks PII at row, column, and sub-cell level
- Uber: DataK9 auto-classifies every column; column-level Parquet encryption makes sensitive fields unreadable without keys
- Databricks: Unity Catalog row/column security and ABAC

### Pattern 3: Secure the Endpoint, Then Trust It

Stripe, Atlassian, and Adobe invest heavily in making the corporate device a trusted surface rather than an adversarial one.

| Company | Endpoint Investment |
|---------|---------------------|
| **Stripe** | Custom macOS DLP extensions, device attestation, software allowlisting, Secure Devices team |
| **Adobe** | CrowdStrike Falcon (33 custom add-ons), USB disabled, CIS hardening, 802.1x MDM |
| **Atlassian** | FIDO2 hardware keys, Zero Trust tiered lockout, BYOD banned for customer data |

### Pattern 4: Audit Everything

Download logging is the foundational control across every company surveyed. Even in the most permissive environments (Netflix), all data access is logged, monitored, and attributable to a specific user and purpose.

### Pattern 5: Customer Content vs. Internal Analytics Are Different Risk Profiles

Companies consistently treat **customer-created content** (designs, files, documents) differently from **internal analytics** (product usage, telemetry, business metrics). Customer content carries contractual obligations (the customer is the data controller); internal analytics is company-owned data used for company purposes.

| Category | Customer Content (IP) | Internal Analytics |
|----------|----------------------|-------------------|
| **Data controller** | Customer | Company |
| **Access model** | Need-to-know, consent-based | Role-based, authorized |
| **Typical controls** | Encryption, isolation, zero-knowledge | DLP, masking, audit logging |
| **Download policy** | Restricted or prohibited | Allowed with controls |

---

## Implications for Autodesk

Autodesk's data in S3 includes multiple data types that map to different risk profiles:

| Autodesk Data Type | Industry Analog | Typical Industry Treatment |
|--------------------|-----------------|---------------------------|
| **Customer content** (drawings, models stored in Autodesk cloud) | Adobe Creative Cloud files, Canva designs, Figma files | Strongest protection — Adobe blocks entirely; Figma uses configurable toggle; Canva requires admin + user consent |
| **Product usage / telemetry data** | Netflix viewing data, Uber trip analytics | Masked at query layer; accessible on managed devices with controls |
| **Enterprise / corporate data** | Internal business metrics across all companies | Accessible on managed devices with DLP and audit logging |
| **PII (customer identifiers)** | Stripe cardholder data, Uber rider data | Masked/tokenized before reaching devices; or encrypted at column level |

The industry standard is **not a single policy for all data types**. It is a tiered approach where controls scale with data sensitivity.

---

## Reference Summary Table

| Company | Customer Content Access | Analytics Data Download | PII Handling | Endpoint Controls | Key Philosophy |
|---------|------------------------|------------------------|--------------|-------------------|----------------|
| **Adobe** | Blocked (network isolation) | Not disclosed | Confidential by default | CrowdStrike, USB disabled, PAM, bastion hosts | Isolate production from corporate |
| **Canva** | Admin + user consent required | Snowflake-based (25PB) | Segmented by type | SOC 2 / ISO 27001 implied | Private by default |
| **Figma** | Configurable toggle (Governance+) | Not disclosed | Customer-managed keys | EKM, IP allowlist | Organization decides |
| **Netflix** | DRM-protected (content) | Allowed (PII masked at query layer) | Purpose-based masking | Advisory (Stethoscope) | Control data, trust device |
| **Uber** | N/A | Effectively blocked (Superuser Gateway) | DataK9 auto-classification, column encryption | Gateway, encryption, DLM | Classify everything, encrypt everything |
| **Stripe** | N/A | Cloud-to-cloud preferred | PCI data prohibited locally; other data allowed | Custom DLP, device attestation, allowlisting | Secure device, then trust it |
| **Dropbox** | Zero-knowledge encryption | Standard DLP | Employee access requires justification + approval | Not disclosed | Even we can't read your files |
| **Atlassian** | Consent-based access | Configurable export controls | FIDO2, Zero Trust | Hardware keys, BYOD banned | Consent + compliance |
| **Box** | Per-classification DLP (Shield) | Per-classification download policies | ML anomaly detection | Device Trust, KeySafe | Granular controls per classification |

---

## Sources

**Adobe:**
- [Adobe Enterprise Security Overview (PDF)](https://www.adobe.com/cc-shared/assets/pdf/trust-center/ungated/whitepapers/corporate/adobe-enterprise-security-overview.pdf)
- [Adobe Trust Center](https://www.adobe.com/trust.html)
- [Adobe Common Controls Framework](https://www.adobe.com/trust/compliance/adobe-ccf.html)

**Canva:**
- [Canva Trust Center](https://trust.canva.com)
- [Canva Engineering Blog](https://canva.dev)
- [Canva Shield](https://www.canva.com/shield/)

**Figma:**
- [Figma Security](https://www.figma.com/security/)
- [Figma Governance+](https://www.figma.com/enterprise/governance/)

**Netflix:**
- [Netflix Tech Blog](https://netflixtechblog.com)
- [Netflix Stethoscope (GitHub)](https://github.com/Netflix-Skunkworks/stethoscope)
- [Netflix Content Security](https://partnerhelp.netflixstudios.com/hc/en-us/articles/4804284966931)

**Uber:**
- [Uber — Superuser Gateway](https://www.uber.com/blog/superuser-gateway-guardrails/)
- [Uber — DataK9](https://www.uber.com/en-US/blog/auto-categorizing-data-through-ai-ml/)
- [Uber — Data Lifecycle Management](https://www.uber.com/blog/evolution-of-data-lifecycle-management-at-uber/)
- [Uber — Encryption & Disk Isolation](https://www.uber.com/blog/locking-down-the-fleet/)

**Stripe:**
- [Stripe — Security](https://docs.stripe.com/security)
- [Stripe — Integration Security Guide](https://docs.stripe.com/security/guide)
- [Stripe — Data Pipeline](https://docs.stripe.com/stripe-data)

**Dropbox:**
- [Dropbox Security](https://www.dropbox.com/security)

**Atlassian:**
- [Atlassian Trust Center](https://www.atlassian.com/trust)
- [Atlassian Security Practices](https://www.atlassian.com/trust/security/security-practices)

**Box:**
- [Box Shield](https://www.box.com/shield)
- [Box Trust](https://www.box.com/trust)
