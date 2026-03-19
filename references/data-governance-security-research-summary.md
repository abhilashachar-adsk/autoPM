# Data Governance, Security & Local Storage: Research Summary

**Date:** March 11, 2026  
**Purpose:** Comprehensive research on Autodesk policies, enterprise data practices, and industry standards for data handling, PII protection, and local vs. cloud storage.

---

## 1. Autodesk's Public Data Governance and Security Policies

### Trust Center Overview

Autodesk publishes its data governance and security posture through the **Autodesk Trust Center** (https://www.autodesk.com/trust/overview).

**Data Privacy (https://www.autodesk.com/trust/privacy):**
- Privacy by design principles govern treatment of personal data
- Six privacy principles: accountability, limited third-party sharing, purpose limitation, purposeful collection/retention, clear choices, transparency
- Privacy impact assessments where personal data is collected
- Role-specific privacy training for workforce
- Compliance with global standards and privacy laws (GDPR, CCPA, etc.)

**Security Framework (https://www.autodesk.com/trust/security):**
- **Build secure:** Secure software development, secure coding, vulnerability scanning
- **Run secure:** Endpoint protection, IAM, encryption in transit and at rest, firewalling
- **Stay secure:** Continuous vulnerability assessment, third-party threat research (HackerOne, Zero Day Initiative), Cyber Threat and Response team

**Compliance (https://www.autodesk.com/trust/compliance):**
- SOC 2, ISO 27000 series, ISO 19650, FedRAMP Moderate (AFG), ISO 42001 (AI governance)
- Regular internal audits, risk assessments, penetration testing
- External audits by independent assessors

**Availability (https://www.autodesk.com/trust/availability):**
- Multi-edge infrastructure with redundancy
- Default-deny traffic policies
- Automated backups, replication between geographically separate data centers
- Regional data options: Japan, India, Canada, UK, Australia, Germany

**Sources:** [Autodesk Trust Center](https://www.autodesk.com/trust/overview), [Privacy](https://www.autodesk.com/trust/privacy), [Security](https://www.autodesk.com/trust/security), [Compliance](https://www.autodesk.com/trust/compliance), [Availability](https://www.autodesk.com/trust/availability)

---

## 2. Autodesk Trust Center – Data Handling and Security Practices

- **Data collection:** Direct (account, registration, events) and automatic (cookies, analytics); encrypted, anonymized where applicable
- **Processing:** For own purposes and on behalf of customers under written contracts
- **Infrastructure:** Global multi-zone, fault-tolerant, redundant backups
- **Patch management:** Staging + production environments, automated testing
- **Incident management:** ITIL v3 framework
- **Data replication:** Geographically separate data centers; cross-border transfer addressed in Privacy Statement
- **Regional options:** Data residency for Japan, India, Canada, UK, Australia, Germany

**Sources:** [Autodesk Trust Center](https://www.autodesk.com/trust), [Autodesk Privacy Statement](https://www.autodesk.com/company/legal-notices-trademarks/privacy-statement)

---

## 3. Best Practices for Enterprise Data Download Policies (AWS S3 to Local Machines)

### Technical Controls

| Control | Description |
|---------|-------------|
| **Bucket policies** | JSON-based IAM policies to allow/deny actions by requester, IP, resource |
| **VPC endpoints** | Restrict S3 access to corporate networks; use `aws:SourceVpce` condition |
| **IAM policies** | Deny `s3:GetObject` for specific users/roles where downloads are prohibited |
| **Selective sync** | Download only necessary files; avoid full sync of cloud drives |

### Operational Best Practices

- Use **AWS S3 Transfer Manager** for large transfers
- For large-scale (>10TB): consider AWS Snowball or S3DistCp with EMR
- Avoid syncing entire cloud drives to local machines
- No built-in mechanism to distinguish console vs. CLI vs. SDK downloads—control via identity and network policies

### Defense-in-Depth

AWS recommends: bucket policies + VPC endpoints + IAM policies for layered protection.

**Sources:** [AWS S3 Download Objects](https://docs.aws.amazon.com/AmazonS3/latest/userguide/download-objects.html), [AWS Security Blog – Bucket Policies](https://aws.amazon.com/blogs/security/how-to-use-bucket-policies-and-apply-defense-in-depth-to-help-secure-your-amazon-s3-data), [AWS S3 Exfiltration Prevention](https://docs.aws.amazon.com/res/latest/ug/S3-buckets-preventing-exfiltration.html)

---

## 4. PII Handling: Corporate Devices vs. Cloud-Only

### Trend

- 46% of organizations storing customer PII in the cloud are considering moving it back on-premises (Netwrix)
- 78% of businesses experienced cloud-related breaches in 2024 (~€4.2M per incident)
- Local-first software adoption increased 340% in 2025 (ZoraLead)

### Corporate Devices (On-Premises/Self-Hosted)

**Pros:** Full data control, no third-party access, data sovereignty, protection from vendor breaches, no telemetry concerns  
**Cons:** Higher IT burden, maintenance, scalability challenges

### Cloud-Only

**Pros:** Faster deployment, automatic updates, lower operational burden  
**Cons:** Less control, vendor risk, government data requests, multi-tenant exposure, complex DPAs for GDPR

**Sources:** [Netwrix Survey](https://www.netwrix.com/survey_organizations_that_store_customer_pii_in_the_cloud_consider_moving_it_back_on_premises_due_to_security_concerns.html), [ZoraLead Local-First](https://zoralead.com/blog/local-first-software-vs-cloud-b2b-data-privacy), [PII Tools](https://pii-tools.com/self-hosted-software-vs-saas/)

---

## 5. Data Loss Prevention (DLP) Policies at Enterprise Software Companies

### DLP Scope

| State | What DLP Monitors |
|-------|-------------------|
| **Data in motion** | Outbound web, email (HTTP/HTTPS, mail) |
| **Data in use** | Endpoint usage, USB, printing, clipboard |
| **Data at rest** | Servers, databases, network storage |

### Typical Capabilities

- Delete, log, archive, or quarantine inappropriate data
- Centralized policy management
- Compliance templates (GDPR, HIPAA)
- ML-driven classification

### Vendors

- **Microsoft Purview DLP:** M365, endpoints, AI apps
- **Forcepoint DLP:** 12,000+ customers, 1,700+ templates, 80+ countries
- **Palo Alto Networks:** Precision AI, 1,000+ identifiers
- **Zscaler DLP:** Cloud-native, web/email/endpoint

**Sources:** [MyDLP](https://www.mydlp.com/), [Microsoft Purview DLP](https://www.microsoft.com/en-us/security/business/information-protection/microsoft-purview-data-loss-prevention), [Forcepoint](https://www.forcepoint.com/product/dlp-data-loss-prevention)
---

## 6. Power BI Desktop – Local Data Storage and Encryption

### Local Storage

- **Import mode:** Data copied into `.pbix` file on the user’s machine
- Uses VertiPaq (xVelocity) columnar engine; data stored in RAM and in `.pbix`
- If `.pbix` stays local and is never published, data does not enter Microsoft cloud

### Encryption

- **Local .pbix:** No built-in encryption unless **Microsoft Information Protection (MIP) sensitivity labels** are applied
- **Power BI Service:** Encryption at rest by default (Microsoft-managed keys); BYOK available in Premium
- **Azure:** TDE for SQL, Azure Storage Encryption for storage

### Recommendation

Apply sensitivity labels in Power BI Desktop for local encryption of `.pbix` files containing sensitive data.

**Sources:** [The Bricks – Does Power BI Store Data Locally?](https://www.thebricks.com/resources/guide-does-power-bi-desktop-store-data-locally), [Microsoft Fabric Community](https://community.fabric.microsoft.com/t5/Desktop/Power-BI-Desktop-local-data-security/td-p/1129261), [Power BI Security](https://learn.microsoft.com/en-us/fabric/security/power-bi-security), [Microsoft Information Protection in Power BI](https://powerbi.microsoft.com/en-us/blog/announcing-microsoft-information-protection-sensitivity-labels-in-power-bi-desktop-public-preview/)

---

## 7. Excel Files with Sensitive Data on Corporate Laptops

### Security Assessment

| Control | Status |
|---------|--------|
| **File encryption** | AES-256 via `Encrypt with Password` |
| **IRM** | Restrict permissions, copy, forward, print |
| **Password protection** | Can open or modify files |

### Limitations

- Microsoft warns: password protection alone is **not sufficient** for highly sensitive personal information (e.g., credit cards, employee data)
- No access revocation after sharing
- No leak tracing or forwarding prevention
- For highly sensitive data: use secure document-sharing platforms with dynamic watermarks, revocation, and analytics

### Recommendation

Use OneDrive Personal Vault or similar for sensitive files; supplement native Excel protection with IRM and enterprise controls.

**Sources:** [Microsoft Protection](https://support.microsoft.com/en-us/office/protection-and-security-in-excel-be0b34db-8cb6-44dd-a673-0b3e3475ac2d), [IRM in Excel](https://support.microsoft.com/en-us/office/restrict-access-to-workbooks-with-information-rights-management-in-excel-3525d8fd-4313-4645-b60e-5ec0e1b9c317), [Peony](https://www.peony.ink/blog/how-to-password-protect-excel-files-2025)

---

## 8. Industry Standards – Data Locality and Local Storage of PII

### ISO 27001

- Control A.5.34: Privacy and protection of PII
- Control A.5.31: Legal/regulatory requirements
- Supports ROPA, retention, deletion, secure disposal

### ISO/IEC 27018 (Cloud)

- Cloud providers must inform customers where data is stored
- Support data return/transfer within reasonable timeframes

### SOC 2

- Requires retention periods defined by legal/regulatory obligations
- Audit and disposal evidence

### GDPR

- “Appropriate technical and organisational measures” for personal data
- Cross-border transfer restrictions

### CCPA

- “Reasonable security” standards
- Regional data residency considerations

### Data Locality

- Document data location for GDPR, CCPA, and customer transparency
- ISO 27018 and regional offerings support data residency

**Sources:** [ISO 27001 for GDPR/CCPA](https://chillcompliance.com/blogs/our-blog/iso-27001-gdpr-ccpa-overview), [ISO 27018](https://learn.microsoft.com/en-us/compliance/regulatory/offering-iso-27018), [Data Retention](https://docs.opusguard.com/library/data-retention-requirements-iso-27001-and-soc-2-fr)

---

## 9. Risks of Downloading Cloud Data to Local Machines (Corporate Devices)

### Security Risks

- Local devices often lack cloud-level security controls
- Endpoints are easier to compromise than cloud platforms
- Users may use unapproved apps that transmit data outside organizational control
- Data exfiltration via HTTPS is hard to detect (e.g., small files, “normal” names)

### Operational Risks

- Accidental deletion, corruption, hardware failure, theft, natural disasters
- Storage and performance issues from large syncs
- Full drives can block OS updates and critical apps

### Detection

- Breach discovery often takes 187–287 days
- Exfiltration often uses legitimate-looking HTTPS traffic and small files (<50MB)

### Mitigation

- Use **selective sync** instead of full cloud drive sync
- DLP for data in motion, use, and at rest
- VPC endpoints and network restrictions for S3 access

**Sources:** [Roundtable Technology](https://www.roundtabletechnology.com/blog/why-you-should-avoid-syncing-cloud-drives-to-your-computer), [Network Threat Detection](https://networkthreatdetection.com/cloud-storage-data-exfiltration-risks/), [Google DLP](https://cloud.google.com/docs/security/data-loss-prevention/preventing-data-exfiltration), [Microsoft Exfiltration](https://learn.microsoft.com/en-us/compliance/assurance/assurance-data-exfiltration-access-controls)

---

## 10. FileVault / BitLocker – Sufficiency for PII on Corporate Devices

### Compliance

- **BitLocker:** FIPS-validated; meets NIST SP 800-171 and CMMC 2.0 encryption requirements
- **FileVault:** XTS-AES 128-bit encryption on macOS 10.13+; considered enterprise-ready by Apple

### Breach Notification

- Many U.S. state laws exempt breach notification if the device uses **whole-disk encryption**
- FileVault and BitLocker typically qualify for this exemption for lost/stolen devices

### Enterprise Management

- Both manageable via Microsoft Intune (key escrow, recovery, reporting)

### Caveat

- **Encryption alone is not sufficient for full compliance.** It is one control among many; organizations must still address access control, retention, DLP, and other policies.

**Sources:** [Lakeridge – BitLocker NIST](https://lakeridge.io/bitlocker-cui-nist-sp-800-171-cmmc), [Innovation Works – Whole Disk Encryption](https://startup-recipes.innovationworks.org/recipes/implementing-whole-disk-encryption-with-bitlocker-and-filevault), [Microsoft Intune BitLocker](https://learn.microsoft.com/en-us/intune/intune-service/protect/encrypt-devices), [Microsoft Intune FileVault](https://learn.microsoft.com/en-us/mem/intune/protect/encrypt-devices-filevault)

---

## Summary & Recommendations

| Topic | Key Takeaway |
|-------|--------------|
| **Autodesk** | Trust Center documents privacy, security, compliance, and regional data options; encryption in transit and at rest, SOC 2, ISO 27001, FedRAMP |
| **S3 downloads** | Use bucket policies, VPC endpoints, IAM; selective sync; defense-in-depth |
| **PII location** | Cloud vs. on-prem trade-off; security concerns driving some organizations back on-prem |
| **DLP** | Monitor data in motion, use, and at rest; enterprise DLP for compliance |
| **Power BI** | Local .pbix stores data; apply MIP sensitivity labels for local encryption |
| **Excel** | Password protection alone is insufficient for highly sensitive PII; use IRM and secure platforms |
| **Standards** | ISO 27001, SOC 2, GDPR, CCPA require documented controls and data locality |
| **Cloud downloads** | Local copies increase risk; selective sync and DLP |
| **Disk encryption** | FileVault/BitLocker help meet breach notification exemptions but are not sufficient alone for compliance |

---

## Source References (Quick Links)

- [Autodesk Trust Center](https://www.autodesk.com/trust/overview)
- [Autodesk Privacy](https://www.autodesk.com/trust/privacy)
- [Autodesk Security](https://www.autodesk.com/trust/security)
- [Autodesk Compliance](https://www.autodesk.com/trust/compliance)
- [AWS S3 Security](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-policies.html)
- [Microsoft Power BI Security](https://learn.microsoft.com/en-us/fabric/security/power-bi-security)
- [Microsoft Excel Protection](https://support.microsoft.com/en-us/office/protection-and-security-in-excel-be0b34db-8cb6-44dd-a673-0b3e3475ac2d)
- [ISO 27018](https://learn.microsoft.com/en-us/compliance/regulatory/offering-iso-27018)
- [Chill Compliance – ISO/GDPR/CCPA](https://chillcompliance.com/blogs/our-blog/iso-27001-gdpr-ccpa-overview)
- [Lakeridge – BitLocker NIST](https://lakeridge.io/bitlocker-cui-nist-sp-800-171-cmmc)
- [Netwrix PII Cloud Survey](https://www.netwrix.com/survey_organizations_that_store_customer_pii_in_the_cloud_consider_moving_it_back_on_premises_due_to_security_concerns.html)
