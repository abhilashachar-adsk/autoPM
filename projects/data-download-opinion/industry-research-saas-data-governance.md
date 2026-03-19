# Industry Research: How Content-Heavy SaaS Companies Manage Data Downloads to Corporate Devices

**Author:** Abhilash Achar, PM — AD Platform Infrastructure  
**Date:** 2026-03-17  
**Status:** Research Companion — Supports Opinion Piece  
**Companion To:** [Should Autodesk Allow Data Downloads from S3 to Corporate Devices?](opinion-data-download-to-local-machines.md)

---

## Executive Summary

This research examines how five content-heavy SaaS companies — Stripe, Figma, Dropbox, Atlassian, and Box — manage employee access to customer-created content and internal analytics data, with specific focus on download controls, DLP enforcement, and endpoint security. These companies were selected because they store customer intellectual property (designs, documents, code, financial data) analogous to how Autodesk stores customer drawings and engineering data.

**Key finding:** No company examined uses a blanket prohibition on data downloads to managed corporate devices. Every company uses a layered control model: identity verification → device health attestation → role-based access → audit logging → DLP monitoring. The consensus approach is **"controlled channels with classification-aware policies"** rather than **"no downloads."**

---

## 1. STRIPE

### 1.1 Data Lake & Analytics Architecture

Stripe operates a sophisticated internal data infrastructure that has evolved significantly:

- **Stripe Sigma**: SQL-based analytics tool querying Stripe data with ~3-hour latency. Available directly in the Stripe Dashboard for authorized users. ([Stripe Sigma](https://stripe.com/sigma))
- **Data Pipeline**: No-code product that syncs Stripe data to external warehouses (Snowflake, Amazon Redshift, Databricks) and cloud storage (S3, GCS, Azure Blob). Core data refreshes every 3 hours with 3–6 hour delivery windows depending on data volume. ([Stripe Data Pipeline Docs](https://docs.stripe.com/stripe-data/access-data-in-warehouse))
- **Real-time analytics evolution (2025–2026)**: Stripe rebuilt its Billing Analytics engine, reducing latency from 24-hour batch jobs to <15 minutes using a Flink-Spark-Pinot architecture. This maintains subscription state rather than re-reading complete history. ([Medium — Viswajith K S, Jan 2026](https://medium.com/@viswajithks/how-stripe-converted-the-24-hour-lag-to-15-minutes-latency-75d901047482))
- **Data schemas**: Organized into `STRIPE` (live mode) and `STRIPE_TESTMODE` (sandbox) with `merchant_id` columns for multi-account filtering.

**Key insight for Autodesk:** Stripe's data architecture favors **cloud-to-cloud data movement** (S3, Snowflake, Redshift) rather than downloads to local machines. Data Pipeline exports go to managed cloud destinations — not employee laptops. This is the preferred pattern for bulk data, while Sigma handles interactive analysis in-browser.

### 1.2 Download Controls & Data Access

Stripe's approach to download controls is driven primarily by PCI-DSS requirements:

- **Cloud-to-cloud preferred**: Data Pipeline sends data to customer-owned cloud storage or data warehouses. There is no "download to desktop" button in Sigma or Data Pipeline. ([Stripe Data Pipeline](https://stripe.com/data-pipeline))
- **Export functionality**: Sigma supports scheduled queries that write results to Data Pipeline destinations. Dashboard exports (CSV) are available for certain reports but are governed by user role and permissions. ([Stripe Sigma Scheduled Queries](https://docs.stripe.com/sigma/scheduled-queries))
- **Role-based access**: Dashboard supports detailed roles for least-privilege access. Restricted API keys can be scoped to specific IP addresses. Audit logs capture all sensitive account activity including logins and data access. ([Stripe Security](https://docs.stripe.com/security/stripe))

### 1.3 PCI-DSS Implications

PCI-DSS has profound implications for what data can exist on local machines:

- **PCI Service Provider Level 1**: Stripe holds the most stringent certification available in the payments industry. Over 300 security controls across 12 security domains. ([Stripe Security](https://docs.stripe.com/security/stripe))
- **Tokenization**: Card numbers are replaced with randomly generated tokens. Full PANs and CVVs can **never** be stored on local machines — even encrypted. The Card Data Vault (CDV) runs in a separate AWS environment with its own credentials, isolated from the rest of Stripe infrastructure. ([Stripe — Payment Tokenization](https://stripe.com/resources/more/payment-tokenization))
- **What CAN exist locally**: Transaction metadata, last-4 digits, merchant analytics, aggregated financial data — all non-PCI-scoped data is permissible on managed devices with appropriate controls.
- **Internal tokenization**: "None of the Stripe internal servers and daemons can obtain plain text card numbers, but they can request that cards are sent to a service provider on a static allowlist." This means even Stripe's own internal systems cannot access raw card data outside the CDV. ([Stripe Security](https://docs.stripe.com/security/stripe))

**Key insight for Autodesk:** PCI-DSS does not blanket-ban downloads — it prohibits specific data elements (full PAN, CVV) on local machines. All other data (transaction metadata, merchant data, analytics) is permissible with controls. This classification-based approach directly parallels what Autodesk should adopt: prohibit Restricted-class data downloads while allowing Internal and Confidential data with logging.

### 1.4 Secure Devices Team — Endpoint Security

Stripe has a dedicated **Secure Devices team** responsible for all corporate endpoint security. This is one of the most well-documented endpoint security programs in the industry, revealed through job postings:

**Team scope** (from [Stripe Secure Devices job listing](https://stripe.com/jobs/listing/security-infrastructure-engineer-secure-devices/6486711)):
- **Data Loss Prevention (DLP)**: Dedicated DLP program to detect and prevent both accidental and malicious data exfiltration from endpoints
- **Software execution control**: Approved software allowlist — unapproved applications are blocked from running on Stripe devices. "Comprehensive process for allowlisting permitted software on employee laptops, preventing the installation of non-approved applications." ([Stripe Security](https://docs.stripe.com/security/stripe))
- **Device attestation**: Managing device attestation flows to secure device and user identities — devices must prove their identity and health status before accessing internal services
- **macOS system extensions**: Custom-built macOS kernel/system extensions for telemetry and prevention capabilities deployed across all Stripe macOS devices
- **Scale**: Over 10,000 Stripe devices managed
- **Backend services**: Operates both on-device agents and backend services that provide critical controls and security configuration to endpoints

**Secure Endpoint Access team** (from [Stripe Backend Engineer — Secure Endpoint Access](https://stripe.com/jobs/listing/backend-engineer-secure-endpoint-access/7396672)):
- **Zero-trust infrastructure**: Designs and operates Stripe's zero-trust network access
- **Device health attestation**: Every request to internal services includes a device health check
- **Strong authentication**: Enforces MFA (hardware-based 2FA tokens), least privilege access
- **Global points-of-presence**: Multiple PoPs for low-latency secure access worldwide

**Corporate technology posture** (from [Stripe Security](https://docs.stripe.com/security/stripe)):
- Zero-trust approach to employee access management
- SSO + 2FA using hardware tokens + mTLS via cryptographic certificate on Stripe-issued machines
- Continuous monitoring for malicious processes, fraudulent domain connections, and intruder activity on all Stripe-issued laptops
- Audit logs monitored for abnormalities, intrusions, and suspicious activity
- All code undergoes multiparty review and automated testing; changes recorded in immutable, tamper-evident log

**Key insight for Autodesk:** Stripe does NOT prohibit all data on endpoints. Instead, they invest heavily in making endpoints trustworthy: DLP agents, software control, device attestation, and continuous monitoring. The philosophy is **"secure the device, then trust the device"** — not "lock data in the cloud."

---

## 2. FIGMA (Design Tool — Most Analogous to Autodesk)

Figma is the most directly comparable company because they store **customer-created intellectual property** (design files) — analogous to how Autodesk stores customer drawings.

### 2.1 Customer Design File Protection

Figma's approach to customer IP protection operates on a **shared responsibility model**:

**Figma's responsibilities** ([Figma Shared Responsibility Model](https://www.figma.com/legal/shared-responsibility-security-model/)):
- Security patching
- Customer data encryption (at rest and in transit)
- Security event logging and monitoring
- Incident management and service uptime monitoring

**Customer responsibilities**:
- Managing which users have access to design files
- Setting up user authentication appropriately
- Ensuring device security
- Managing third-party apps and plugins
- Reporting security issues

**Key insight:** Figma explicitly places **device security** as the customer's responsibility, not Figma's. This is a deliberate design choice — Figma provides the controls, customers configure them.

### 2.2 Employee Access to Customer Designs

Figma does not publicly document the specifics of internal employee access to customer files, but their security practices indicate strong controls:

- **SOC 2 Type 2 and ISO 27001 certified**: These audits require documented access controls, segregation of duties, and regular access reviews for employee access to production systems. ([Figma Security](https://www.figma.com/security/))
- **FedRAMP authorized**: Federal compliance requires strict access control documentation and continuous monitoring.
- **Government data request principles**: Figma publishes principles on handling third-party requests for customer data, including government requests. They assess legality and comply only with valid, lawful requests. An annual Transparency Report details these requests. ([Figma Legal — Government Data Requests](https://figma.com/legal/figma-principles-regarding-government-and-other-third-party-requests-for-customer-personal-data))

### 2.3 Data Governance Controls (Governance+ for Enterprise)

Figma's **Governance+ add-on** (Enterprise tier) provides the most detailed look at their control model ([Figma Governance+](https://help.figma.com/hc/en-us/articles/31825370509591-Governance-for-Figma-Enterprise)):

| Control | Description | Relevance to Autodesk |
|---------|-------------|----------------------|
| **Enterprise Key Management (EKM)** | Encrypts Figma file data at rest using customer's own AWS KMS key — customer controls the key | Analogous to S3 KMS encryption; data at rest is customer-controlled |
| **Restrict File Exporting** | Admins can limit the ability to export files from Figma | Direct parallel — configurable download toggle, not blanket prohibition |
| **IP Allowlist / Network Access Restrictions** | Ensures access only from approved corporate networks | Prevents data from reaching personal devices/networks |
| **Discovery Pipeline** | Logs all text edits in Figma files for legal discovery and data retention | Audit trail for content changes — similar to S3 access logging |
| **Enforced 2FA** | Required additional authentication | Standard identity control |
| **Extended Idle Session Timeout** | Auto-signs out inactive users | Reduces exposure window |
| **Guest Expiration** | Sets default lifetimes for external collaborators | Limits external access duration |
| **Internal Policies** | Requires users to agree to customer policies before accessing content | Policy acknowledgment before access |

**Key insight for Autodesk:** Figma — which handles customer IP nearly identical in sensitivity to Autodesk drawings — uses a **configurable toggle for file export**, not a prohibition. Enterprise customers can restrict export, but the platform default allows it. The controls focus on encryption (EKM), network restrictions, and audit logging. This is exactly the model the opinion piece recommends.

---

## 3. DROPBOX (Cloud Storage — Customer Content)

Dropbox stores customer files directly — documents, media, code, and sensitive business data.

### 3.1 Employee Access to Customer Files

Dropbox has some of the most explicit public documentation about restricting employee access to customer content:

- **Strictly limited access**: "Only a small number of employees and contractors have access to the environment where end user files are stored." ([Dropbox Security Measures PDF](https://assets.dropbox.com/documents/en/legal/security-measures.pdf))
- **Technical prohibition**: "Dropbox employs technical access controls and internal policies to **prohibit employees and contractors from arbitrarily accessing user files** and to restrict access to metadata and account information." ([Dropbox Security Measures PDF](https://assets.dropbox.com/documents/en/legal/security-measures.pdf))
- **Documented justification**: "A record of access requests, justification, and approval are documented by management, with access granted by appropriate individuals." ([Dropbox Security Measures PDF](https://assets.dropbox.com/documents/en/legal/security-measures.pdf))
- **Distributed architecture**: "Dropbox's distributed architecture separates different information levels across multiple services, meaning access to any individual service cannot be used to recreate files." ([Dropbox Shared Responsibility Guide PDF](https://assets.dropbox.com/documents/en/trust/shared-responsibility-guide.pdf))

### 3.2 End-to-End Encryption

Dropbox has implemented **zero-knowledge, end-to-end encryption** as the strongest form of customer content protection:

- "Zero-knowledge, end-to-end encryption where only customers possess decryption keys, meaning **not even Dropbox can access the contents of their files.**" ([Dropbox Engineering — E2E Encryption](https://dropbox.tech/security/end-to-end-encryption-for-dropbox-teams))
- Files encrypted on the customer's device before upload
- Block-level encryption: files split into blocks, each encrypted with AES 256-bit, stored in Block Storage Servers with hash-based retrieval ([Dropbox Architecture](https://dropbox.com/business/trust/security/architecture))
- Even if an employee had server access, encrypted content is unreadable without the customer's key

### 3.3 DLP and Endpoint Controls

**For customer-facing DLP:**
- Automatic scanning for personal information (credit cards, passport numbers, bank accounts, SSNs) across team folders ([Dropbox Data Classification](https://help.dropbox.com/security/data-classification))
- DLP alerts sent to admins when sensitive files shared externally
- Cloudflare Zero Trust integration with CASB for additional scanning ([Cloudflare Zero Trust Docs — Dropbox](https://developers.cloudflare.com/cloudflare-one/applications/casb/casb-integrations/dropbox))

**For internal security:**
- ACLs synchronized across all data stores
- SSO, 2FA, remote wipe capabilities
- Session control, password requirements
- Activity monitoring across all team actions ([Dropbox Help — Customize Security](https://help.dropbox.com/security/customize-security))

**Lessons from the 2022 breach:**
- An employee was phished despite using hardware key authentication
- API keys stored in GitHub repositories were exposed
- Resulted in stricter employee access scope and API key restrictions ([Doppler — Learning from the Dropbox Data Breach](https://www.doppler.com/blog/learning-dropbox-data-breach))

**Key insight for Autodesk:** Dropbox's approach is the most aggressive: they architecturally prevent employees from accessing customer content through encryption where Dropbox itself doesn't hold the keys. For internal analytics data (non-customer content), standard DLP and access controls apply. The lesson: **customer content requires the strongest controls; internal analytics data needs standard enterprise controls.**

---

## 4. ATLASSIAN (Customer Content in Confluence/Jira)

Atlassian manages customer-created content across Confluence, Jira, Jira Service Management, Trello, Loom, Compass, and Rovo.

### 4.1 Employee Access to Customer Instance Data

Atlassian has the most transparent public documentation about internal access controls:

**Access restrictions** ([Atlassian Security Measures](https://www.atlassian.com/legal/security-measures), effective October 2025):
- **Need-to-know basis**: Strict role-based access limiting staff access to customer data only when necessary
- **Least privilege**: User provisioning based on job roles, enforced through authentication processes
- **Management approval required**: Prior approval from management before granting access to data, applications, or infrastructure based on data classification levels
- **Regular reviews**: Access rights regularly reviewed; dormant accounts promptly removed
- **Segregation of duties**: Including access control reviews, HR-managed security groups, and workflow controls

**Customer consent requirement** ([Atlassian Security Practices](https://www.atlassian.com/trust/security/security-practices)):
- "Before our support engineers are able to access customer data stored within our applications, **our customers must provide their explicit consent** to allow such access through our consent control checker."
- This is a significant control: even authorized Atlassian employees cannot access a customer's Confluence/Jira instance without the customer granting permission.

**Breach as incident** ([Atlassian Security Practices](https://www.atlassian.com/trust/security/security-practices)):
- "Unauthorized or inappropriate access to customer data is treated as a security incident and managed through our incident management process. This process includes instructions to notify affected customers if a breach of policy is observed."

### 4.2 Zero Trust Implementation

Atlassian has implemented a comprehensive Zero Trust architecture, well-documented by their CISO ([CSO Online — Inside Atlassian's Zero Trust Implementation](https://www.csoonline.com/article/570061/atlassian-ciso-talks-remote-work-challenges-and-zero-trust-networking.html)):

- **Device identity + user identity + security posture + role** determine access — not network location
- **Tiered criticality**: Different services assigned different criticality tiers; higher tiers require MFA
- **FIDO2 keys required**: Less secure methods (SMS, phone-based OTPs) are not supported for Atlassian staff. "Atlassian has adopted this approach to ensure our authentication process is highly resistant to phishing-based and man-in-the-middle attacks."
- **MDM enforcement**: Devices that deviate from approved standard are automatically prevented from accessing Atlassian systems
- **Application control**: Prevents running specific types of software (including remote access solutions) that could compromise device security posture
- **BYOD restrictions**: Mobile devices under BYOD "have limited access to Atlassian systems and **cannot access customer data**." ([Atlassian Security Practices](https://www.atlassian.com/trust/security/security-practices))

### 4.3 Data Export and Download Controls

Atlassian offers explicit data export prevention capabilities:

- **Admin-controlled export blocking**: Organization admins can block exports of sensitive data across PDF, XML, CSV, and Word from Confluence pages, blogs, and Jira work items ([Atlassian — Prevent Data Export](https://support.atlassian.com/security-and-access-policies/docs/prevent-data-export/))
- **API export blocking**: Export controls also prevent exports via URL or API requests
- **Limitations acknowledged**: Export controls don't prevent browser-based actions (print, save-as) or Marketplace app exports
- **Data classification**: Organization-wide content classification for Confluence spaces and Jira projects ([Atlassian DLP](https://developer.atlassian.com/cloud/admin/dlp/about/))
- **Data security policies**: Content-centric policies governing how users, apps, and external parties interact with sensitive data at three levels: classification, containers (spaces/projects), and workspace level ([Atlassian Data Security Policy Guide](https://developer.atlassian.com/cloud/admin/data-security-policy-guide))

**Atlassian Data Lake** ([Atlassian Data Lake](https://www.atlassian.com/platform/analytics/what-is-atlassian-data-lake)):
- Available to Cloud Enterprise customers
- Pre-modeled, queryable data from Jira, JSM, and Confluence
- "Data privacy and security built into the trusted Atlassian platform"
- Supports data shares to external warehouses (Snowflake) with admin controls

### 4.4 Endpoint Security

**Corporate devices** ([Atlassian Security Practices](https://www.atlassian.com/trust/security/security-practices)):
- Full disk encryption + screen locks on all devices
- Secure browsing (blocked malicious extensions, phishing sites)
- Endpoint Detection & Response (EDR) — detects malware, enables SOC response
- Endpoint firewalls preventing local services from network exposure
- Application control preventing unapproved software
- Central MDM enforcing CIS benchmarks and deploying updates
- VPN with defined lockout periods

**Key insight for Autodesk:** Atlassian's approach is the gold standard for content-heavy SaaS: **export controls are configurable per classification level, not blanket bans.** Customer consent is required for employee access. BYOD cannot access customer data. Corporate devices must pass health attestation. This is a sophisticated, layered model that Autodesk can directly reference.

---

## 5. BOX (Enterprise Content Management)

Box is the most directly relevant comparison for content management — they handle enterprise documents, contracts, financial data, and sensitive IP.

### 5.1 Employee Access to Customer Content

Box provides the most granular content access model:

- **Seven permissioning roles**: Granular access controls enabling collaboration while maintaining security ([Box Security & Compliance](https://www.box.com/security-compliance))
- **Box KeySafe**: Customer-managed encryption keys — customers maintain independent control of encryption, meaning Box cannot access encrypted content without customer cooperation ([Box Security & Compliance](https://www.box.com/security-compliance))
- **AES 256-bit encryption**: All files encrypted at rest and in transit with TLS ([Box Core Security](https://www.box.com/security/zerotrust))
- **Admin protections**: Zero-trust enhancements prevent compromised admin accounts from escalating — verification emails for admin changes, restrictions on email domain changes, verification before admin upgrades ([Box Zero Trust Enhancements](https://support.box.com/hc/en-us/articles/11866162688915-Box-is-adding-zero-trust-enhancements-for-admins))

### 5.2 Box Shield — DLP and Threat Detection

Box Shield is the most mature DLP platform among the companies researched:

**Content classification and access policies** ([Box Shield](https://blog.box.com/box-shield-intelligent-frictionless-content-security)):
- Manual or automatic classification (PII, healthcare, HR/finance)
- Granular per-label access policies:
  - **Print restrictions**
  - **FTP restrictions**
  - **Application restrictions**
  - **Download restrictions** (can be toggled per classification)
  - **External collaborator restrictions**
  - **Shared link restrictions**

**Threat detection (ML-based)** ([Box Shield](https://blog.box.com/box-shield-intelligent-frictionless-content-security)):
- Suspicious locations (untrusted/high-risk geographic access)
- Suspicious sessions (rapid location changes indicating compromised accounts)
- Anomalous downloads (unusual user behavior patterns)

**Box Shield Pro (2025)** ([Box Shield Pro Announcement](https://www.businesswire.com/news/home/20250911208391/en/Box-Announces-Box-Shield-Pro-to-Deliver-the-Next-Generation-of-Content-Protection-with-AI)):
- Ransomware Activity Detection (mass encryption monitoring)
- AI Threat Analysis Agent (automated alert summarization)
- AI Classification Agent (intelligent content classification)

**Industry-specific configurations** ([Box Shield Best Practices](https://support.box.com/hc/en-us/articles/26658520540179-Configuring-Shield-Access-Policies-to-Match-Industry-Best-Practices)):
- Healthcare, financial services, legal/M&A, and general use cases
- Recommended classification labels: Public, Internal, Confidential
- Corresponding access policies per label

### 5.3 Zero-Trust and Device Security

Box implements a comprehensive zero-trust framework ([Box Core Security](https://www.box.com/security/zerotrust)):
- **Device Trust**: Admin rules controlling content access based on device and endpoint criteria (OS version, anti-virus status)
- **Device pinning**: Limits number of devices per account
- **Information Rights Management**: Vector-based watermarking for content tracing
- **Over 300 auditable actions**: Full visibility into content access, sharing, and usage
- **Compliance**: SOC 1/2/3, GDPR, HIPAA, FINRA, FedRAMP, ISO 27001, PCI-DSS ([Box Trust](https://www.box.com/trust))

**Key insight for Autodesk:** Box's model is the most sophisticated content protection framework examined. Downloads are **not prohibited — they are controlled per classification**. Public content downloads freely; Confidential content has download restrictions. This classification-aware toggle is exactly what the opinion piece recommends for Autodesk's data lake.

---

## Cross-Company Comparison Matrix

| Dimension | Stripe | Figma | Dropbox | Atlassian | Box |
|-----------|--------|-------|---------|-----------|-----|
| **Primary content type** | Financial transactions, merchant data | Customer design files (IP) | Customer documents & files | Customer project/wiki content | Enterprise documents & files |
| **Analogy to Autodesk** | Analytics data (non-IP) | Closest — customer-created IP | Customer-stored content | Customer-created content | Enterprise content management |
| **Employee access to customer data** | CDV isolated; need-to-know for non-PCI | SOC 2 controlled; shared responsibility | Architecturally prohibited (E2E encryption) | Customer consent required; need-to-know | KeySafe (customer-controlled encryption) |
| **Download to corporate device** | Cloud-to-cloud preferred; non-PCI data permissible | Configurable toggle (Governance+) | Standard DLP controls for internal data | Configurable per classification | Configurable per classification (Shield) |
| **DLP on endpoints** | Custom DLP program, macOS system extensions | Customer responsibility (shared model) | Cloudflare CASB + internal DLP | EDR + application control + MDM | Shield anomaly detection + ML |
| **Device attestation** | Yes — dedicated team, 10K+ devices | Customer managed | Standard MDM | Yes — Zero Trust, FIDO2 required | Device Trust with OS/AV rules |
| **Software allowlisting** | Yes — comprehensive | Not documented | Not documented | Yes — application control | Not documented |
| **Classification-based controls** | PCI vs non-PCI (binary) | EKM + export toggle | DLP scanning (PII types) | Multi-level classification + policies | Public/Internal/Confidential labels |
| **Audit logging** | Immutable, tamper-evident | Discovery Pipeline | Activity monitoring | Full audit trail | 300+ auditable actions |
| **Zero Trust architecture** | Yes — SSO + 2FA + mTLS + device cert | SSO + 2FA (customer-configured) | ACLs + strong auth | Yes — FIDO2 + tiered + MDM | Yes — Device Trust + SSO + MFA |
| **Key compliance** | PCI Level 1, SOC 1/2, NIST | SOC 2 Type 2, ISO 27001, FedRAMP | SOC 2, ISO 27001, GDPR | SOC 2, ISO 27001, NIST 800-53 | SOC 1/2/3, FedRAMP, HIPAA, PCI |

---

## Synthesis: Patterns and Principles for Autodesk

### Pattern 1: Classification-Based Controls, Not Blanket Bans

Every company uses **data classification** to determine what controls apply. No company applies a single policy to all data types:
- **Stripe**: PCI data (prohibited locally) vs. analytics data (permissible)
- **Figma**: Configurable export toggle per enterprise organization
- **Box**: Public/Internal/Confidential labels with per-label download policies
- **Atlassian**: Classification levels, containers, and workspace-level policies
- **Dropbox**: PII scanning with type-specific DLP alerts

**Recommendation for Autodesk:** Implement tiered controls based on AD Data Lake classification (Public, Internal, Confidential, Restricted). Public and Internal data should be freely downloadable with logging. Confidential data requires logging and DLP. Restricted data (PII, customer IP) requires explicit approval.

### Pattern 2: Secure the Endpoint, Then Trust the Endpoint

All companies invest heavily in making corporate devices trustworthy rather than treating them as untrusted:
- **Stripe**: Custom macOS system extensions, DLP agents, device attestation, software allowlisting (10K+ devices)
- **Atlassian**: Full disk encryption, EDR, application control, CIS benchmarks via MDM, FIDO2 authentication
- **Box**: Device Trust with OS/AV requirements, device pinning

**Recommendation for Autodesk:** Validate and document the endpoint security controls already in place (MDM, FileVault/BitLocker, EDR) and use these as the justification for treating Autodesk-managed devices as trusted endpoints.

### Pattern 3: Audit Everything

Every company treats audit logging as the foundation of data governance:
- **Stripe**: Immutable, tamper-evident logs of all code changes and access
- **Figma**: Discovery Pipeline logging all text edits
- **Box**: 300+ auditable actions with anomaly detection
- **Atlassian**: Full audit trail with customer access consent logging
- **Dropbox**: Activity monitoring across all team actions

**Recommendation for Autodesk:** Ensure every download event from the data lake is logged with user identity, dataset, classification, timestamp, and volume. This is the single most important control.

### Pattern 4: Customer Content Gets Strongest Protection

There is a clear distinction between **customer-created IP** and **internal analytics data**:
- **Dropbox**: E2E encryption — even Dropbox can't read customer files
- **Box**: KeySafe — customer controls the encryption key
- **Figma**: EKM — customer's AWS KMS key encrypts file data
- **Atlassian**: Customer consent required before employee access

Autodesk's customer drawings (`.dwg`, `.rvt` files) deserve the Dropbox/Box/Figma level of protection. Autodesk's internal analytics data (product usage, enterprise metrics, stale dataset inventories) is Autodesk-owned and should follow the Stripe/Atlassian model — controlled access with logging, not prohibition.

### Pattern 5: Zero Trust Means "Verify Then Allow," Not "Never Allow"

Every Zero Trust implementation examined follows the same flow:
1. Verify user identity (SSO + MFA/FIDO2)
2. Verify device health (MDM enrollment, encryption, EDR, OS version)
3. Verify access authorization (RBAC, classification-based policies)
4. Log the action
5. Monitor for anomalies

None of them include "deny data download" as a Zero Trust principle. As Stripe's security page states: "Stripe takes a **zero-trust approach** to employee access management" — and then describes granting access to authenticated, attested devices.

---

## Sources

### Stripe
- [Security at Stripe](https://docs.stripe.com/security/stripe) — comprehensive security documentation
- [Stripe Data Pipeline](https://docs.stripe.com/stripe-data/access-data-in-warehouse) — data warehouse sync architecture
- [Stripe — Payment Tokenization](https://stripe.com/resources/more/payment-tokenization) — tokenization as PCI compliance
- [Stripe — PCI Compliance Guide](https://stripe.com/guides/pci-compliance) — PCI-DSS overview
- [Stripe Jobs — Security Infrastructure Engineer, Secure Devices](https://stripe.com/jobs/listing/security-infrastructure-engineer-secure-devices/6486711) — endpoint security team scope
- [Stripe Jobs — Backend Engineer, Secure Endpoint Access](https://stripe.com/jobs/listing/backend-engineer-secure-endpoint-access/7396672) — zero-trust network access
- [How Stripe converted 24-hour lag to 15 minutes (Medium, Jan 2026)](https://medium.com/@viswajithks/how-stripe-converted-the-24-hour-lag-to-15-minutes-latency-75d901047482) — Flink-Spark-Pinot architecture

### Figma
- [Figma Security & Compliance](https://www.figma.com/security/) — certifications and security overview
- [Figma Shared Responsibility Security Model](https://www.figma.com/legal/shared-responsibility-security-model/) — responsibility split
- [Governance+ for Figma Enterprise](https://help.figma.com/hc/en-us/articles/31825370509591-Governance-for-Figma-Enterprise) — export controls, EKM, NAR
- [Figma Blog — SOC 2 Type 2, SSO, and More](https://www.figma.com/blog/keeping-your-data-in-figma-safe-and-secure/) — audit and compliance
- [Figma Principles on Government Data Requests](https://figma.com/legal/figma-principles-regarding-government-and-other-third-party-requests-for-customer-personal-data) — transparency report
- [Figma Privacy & Trust Center](https://figma.com/legal/privacy-trust-center) — compliance documentation

### Dropbox
- [Dropbox Security Architecture — Whitepaper (PDF)](https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/dash/Dash-Security-Architecture-Overview_Whitepaper.pdf)
- [Dropbox Security Measures (PDF)](https://assets.dropbox.com/documents/en/legal/security-measures.pdf) — employee access controls
- [Dropbox Shared Responsibility Guide (PDF)](https://assets.dropbox.com/documents/en/trust/shared-responsibility-guide.pdf) — distributed architecture
- [Dropbox Engineering — E2E Encryption for Teams](https://dropbox.tech/security/end-to-end-encryption-for-dropbox-teams) — zero-knowledge encryption
- [Dropbox Infrastructure Architecture](https://dropbox.com/business/trust/security/architecture) — block-level encryption
- [Dropbox Data Classification](https://help.dropbox.com/security/data-classification) — DLP scanning for PII
- [Learning from the Dropbox Data Breach (Doppler)](https://www.doppler.com/blog/learning-dropbox-data-breach) — 2022 breach lessons

### Atlassian
- [Atlassian Security Measures](https://www.atlassian.com/legal/security-measures) — access controls, MDM, training (Oct 2025)
- [Atlassian Security Practices](https://www.atlassian.com/trust/security/security-practices) — comprehensive security overview
- [Atlassian Trust Center](https://customertrust.atlassian.com/) — compliance documentation
- [Inside Atlassian's Zero Trust Implementation (CSO Online)](https://www.csoonline.com/article/570061/atlassian-ciso-talks-remote-work-challenges-and-zero-trust-networking.html)
- [Atlassian — Prevent Data Export](https://support.atlassian.com/security-and-access-policies/docs/prevent-data-export/) — export blocking controls
- [Atlassian Data Loss Prevention](https://developer.atlassian.com/cloud/admin/dlp/about/) — classification and DLP
- [Atlassian Data Security Policy Guide](https://developer.atlassian.com/cloud/admin/data-security-policy-guide) — content-centric policies
- [Atlassian Data Lake](https://www.atlassian.com/platform/analytics/what-is-atlassian-data-lake) — analytics infrastructure

### Box
- [Box Security & Compliance](https://www.box.com/security-compliance) — overview of controls
- [Box Core Security — Zero Trust](https://www.box.com/security/zerotrust) — Device Trust, encryption, IAM
- [Box Shield — Intelligent Content Security](https://blog.box.com/box-shield-intelligent-frictionless-content-security) — DLP and classification
- [Box Shield Pro Announcement (BusinessWire, Sep 2025)](https://www.businesswire.com/news/home/20250911208391/en/Box-Announces-Box-Shield-Pro-to-Deliver-the-Next-Generation-of-Content-Protection-with-AI)
- [Box Shield Access Policy Best Practices](https://support.box.com/hc/en-us/articles/26658520540179-Configuring-Shield-Access-Policies-to-Match-Industry-Best-Practices) — industry-specific configs
- [Box Trust](https://www.box.com/trust) — compliance certifications
- [Box Zero Trust Admin Enhancements](https://support.box.com/hc/en-us/articles/11866162688915-Box-is-adding-zero-trust-enhancements-for-admins)
- [Box Admin Controls](https://www.box.com/security/it-admin-controls) — permissioning and audit trails
- [Building Trust with Customers (Box Blog)](https://blog.box.com/building-trust-our-customers-and-partners) — trust philosophy

### Industry Best Practices
- [SaaS Data Loss Prevention Guide (Island)](https://www.island.io/blog/saas-data-loss-prevention-guide)
- [Insider Threat Prevention in SaaS: 20 Best Practices (DoControl)](https://www.docontrol.io/blog/insider-threat-prevention-best-practices)
- [The 2026 Data Loss Prevention Guide (Forcepoint)](https://www.forcepoint.com/blog/insights/data-loss-prevention-guide)
- [How to Protect SaaS Data Without Device Control 2026 (Kahana/Zero)](https://kahana.co/blog/how-to-protect-saas-data-without-device-control-2026)

---

*This research supports the opinion piece "Should Autodesk Allow Data Downloads from S3 to Corporate Devices?" and provides sourced evidence for stakeholder discussions with Security, Compliance, and Leadership.*
