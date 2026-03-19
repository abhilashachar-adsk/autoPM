# AD Platform Infrastructure — Service Inventory

**Sources:** `adpcs-infra`, `adp-temporal` repos
**Model Reference:** Beacon System Model (`system-model.autodesk.com/1.0.0`)
**Last Updated:** 2026-03-05

---

## Service Inventory

| # | Service Name | Beacon Kind | System | Product | `adsk.service.id` | `adsk.service.alias` | Moniker Pattern | Status | Description |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Querybook (ADP Studio) | component | adp-studio | ADP Studio | `4AFA5AF5` | `CSQRYBOK` | `CSQRYBOK-{E}-{R}` | Active | SQL query platform deployed on EKS via Helm (web, worker, scheduler pods). Provides query editor, data catalog browser, dashboards, and AI Query Assistant. Backed by Aurora MySQL (`rds-querybook`), Redis, and OpenSearch. Ingress via ALB at `query-experience.adpcs-{e}-{r}.adskeng.net`. |
| 2 | RDS Querybook | resource | adp-studio | ADP Studio | — | — | — | Active | Aurora MySQL cluster backing Querybook. Provides query metadata, execution history, user settings, and DataDoc storage. Deployed on `cloudos-spark-nb` EKS VPC. |
| 3 | RDS ADP Studio | resource | adp-studio | ADP Studio | — | — | — | Active | Aurora MySQL cluster for ADP Studio. Deployed on `cloudos-presto` EKS VPC. |
| 4 | EKS Spark ETL | component | adp-core-services | AD Data Lake | — | — | `ADPCS-{E}-{R}` | Active | EKS cluster (`cloudos-spark-etl`) hosting Spark ETL workloads. Runs Karpenter (autoscaler), KRO, ACK controllers (S3, EMR, IAM), Spark History Server, Spark Live Server, Dynatrace operator, Turbonomic, Cloudability, IBM FinOps agent, cert-manager, OpenTelemetry, and FluentBit. |
| 5 | EKS Spark Notebooks | component | adp-core-services | AD Data Lake | — | — | `ADPCS-{E}-{R}` | Active | EKS cluster (`cloudos-spark-nb`) hosting Spark notebook workloads and Querybook. Runs cert-manager, OpenTelemetry, FluentBit, and Querybook Helm charts. |
| 6 | EKS Nexla | component | adp-core-services | AD Data Lake | — | — | `ADPCS-{E}-{R}` | Active | EKS cluster (`cloudos-nexla`) for Nexla data integration platform. Managed via ArgoCD and Karpenter. |
| 7 | EMR Spark ETL Virtual Clusters | component | adp-core-services | AD Data Lake | — | — | — | Active | EMR Serverless virtual clusters (`adpts`, `adpbp`) on `cloudos-spark-etl` EKS. Includes S3 buckets per virtual cluster, pod templates (per env, with/without HMS), bucket lifecycle policies, and job execution roles. |
| 8 | EMR Spark Notebooks Virtual Clusters | component | adp-core-services | AD Data Lake | — | — | — | Active | EMR virtual clusters for `cloudos-spark-nb` EKS. IaC placeholder (README only, no Terraform files yet). |
| 9 | EMR Studio | component | adp-core-services | AD Data Lake | — | — | `ADPCS-{E}-{R}` | Active | AWS EMR Studio for interactive Spark development. Provisions IAM service role and `aws_emr_studio` resource with S3-backed workspace storage. |
| 10 | EMR Spark Configs | resource | adp-core-services | AD Data Lake | — | — | — | Active | S3 objects containing Spark configuration files (`spark-defaults-*.json`, `env-map.json`) consumed by the `adp-infra-utilities` Airflow EMR Operator. |
| 11 | Service Catalog (EMR Spark) | component | adp-core-services | AD Data Lake | — | `ADPTS` | `ADPTS-{E}-{R}` | Active | AWS Service Catalog portfolio for self-service EMR Spark cluster provisioning (EMR 5.34.0). Includes CloudFormation templates, IAM constraint/launch roles (`sc-emr-spark-constraint`, `emr_ec2_instance_role`), and S3-hosted bootstrap scripts. |
| 12 | Astronomer Deployment Roles | component | adp-core-services | AD Data Lake | — | — | `ADPCS-{E}-{R}` | Active | IAM roles for 200+ Astronomer Airflow tenant deployments (e.g., `adpbp-*`, `adpdii-*`). Each tenant gets an IAM role with S3, EMR, Glue, Secrets Manager, and KMS permissions for its Airflow DAGs. |
| 13 | Astronomer Tenant Creation | resource | adp-core-services | AD Data Lake | — | — | — | Active | S3 uploads of tenant JSON configuration files for Astronomer onboarding. |
| 14 | S3 Bucket | resource | adp-central-data-lake | AD Data Lake | — | — | `{BS}-{E}-{R}` | Active | Reusable Terraform module for S3 bucket creation with SSL-only policy via `tf-modules-s3`. Used across all environments for raw, internal, export, and config buckets. |
| 15 | S3 Object Upload | resource | adp-central-data-lake | AD Data Lake | — | — | `{BS}-{E}-{R}` | Active | Terraform module to upload JSON content objects to S3 buckets. Used for configs, tenant files, and bootstrap scripts. |
| 16 | KMS Encryption | resource | adp-central-data-lake | AD Data Lake | — | — | `{BS}-{E}-{R}` | Active | AWS KMS keys for S3 data encryption. Key alias pattern: `${moniker}_ingestion`. Used for encrypting data at rest in CDL buckets. |
| 17 | Secret Manager | resource | adp-central-data-lake | AD Data Lake | — | — | — | Active | AWS Secrets Manager for metastore secret replication. Copies `adp-metastore-*-secret` from ADPCS account to partner accounts for cross-account Hive Metastore access. |
| 18 | VPC Security Group | resource | adp-central-data-lake | AD Data Lake | — | — | `{BS}-{E}-{R}` | Active | AWS security groups with dynamic ingress/egress rules. Provides network isolation for EKS clusters, RDS instances, and other compute resources. |
| 19 | Svc Role Data Access | resource | adp-control-plane | AD Data Lake | — | — | — | Active | IAM role (`svc-role-data-access`) enabling API ECS services to access S3 buckets and KMS keys. Assumed by Control Plane API task roles for data operations. |
| 20 | IAM Role | resource | adp-control-plane | AD Data Lake | — | — | `{BS}-{E}-{R}` | Active | Generic reusable Terraform module for IAM role creation via `tf-modules-iam`. Supports trust policies, inline policies, and attached managed policies. |
| 21 | EMR Presto Route53 | resource | adp-core-services | AD Data Lake | — | — | `{BS}-{E}-{R}` | Active | Route53 hosted zone and NS record delegation for EMR Presto DNS endpoints. Enables DNS-based service discovery for Trino query engine. |
| 22 | RDS Astronomer | resource | adp-core-services | AD Data Lake | — | — | — | Active | Aurora PostgreSQL cluster backing Astronomer Airflow platform. Deployed on `cloudos-astronomer` EKS VPC. Includes Secrets Manager secret and KMS key. |
| 23 | RDS CloudOS DataOS | resource | adp-core-services | AD Data Lake | — | — | — | Active | Aurora PostgreSQL cluster for CloudOS DataOS. Includes Secrets Manager secret and KMS key. |
| 24 | Bastion Node Role | resource | adp-core-services | AD Data Lake | — | — | `{BS}-{E}-{R}` | Active | IAM instance profile role for bastion/jump-box EC2 nodes. Attaches HRDAMI and SSM managed policies for secure access. |
| 25 | EKS Presto | component | adp-core-services | AD Data Lake | `3D30775F` | `PRESTOCS` | `ADPCS-{E}-{R}` | Archived | EKS cluster (`cloudos-presto`) for Trino/Presto query engine. Ran HMS/GDC, Privacera, Karpenter, Dynatrace OTEL collector, Dynatrace operator, and Dynakube. Replaced by shared infrastructure. |
| 26 | EKS Astronomer | component | adp-core-services | AD Data Lake | `F20B171E` | `CSASTRO` | `ADPCS-{E}-{R}` | Archived | EKS cluster (`cloudos-astronomer`) for Astronomer Airflow. Ran Velero (backup), Astronomer Helm, cert-manager, Dynatrace, Cloudability, Turbonomic, and Spark Job Metrics CronJob. Migrated to platform-managed Airflow. |
| 27 | EMR Presto | component | adp-core-services | AD Data Lake | — | `ADP-PRESTO` | — | Archived | Bare-metal EMR cluster for Trino query engine (Hadoop 3.x, Hue, Trino, Privacera, Hive Metastore, Datadog). Replaced by EKS-based Trino. |

---

## Service Inventory — `adp-temporal` repo

| # | Service Name | Beacon Kind | System | Product | `adsk.service.id` | `adsk.service.alias` | Moniker Pattern | Status | Description |
|---|---|---|---|---|---|---|---|---|---|
| 28 | Temporal Server | component | adp-core-services | AD Data Lake | — | — | `ADTMPRL-{E}-{R}` | Active | Temporal workflow engine (v1.26.3) deployed on ECS Fargate via CloudOS v3. Custom Go server binary with TLS ClaimMapper and Composite ClaimMapper plugins for mTLS worker auth and JWT (Azure AD OIDC) UI auth. Backed by Aurora PostgreSQL (`temporal-db`). gRPC endpoint at `temporal-app.adtmprl-{e}-{r}.cloudos.autodesk.com:7233` via ALB (HTTPS/gRPC) and NLB (TCP). OTEL sidecar enabled with Prometheus metrics on port 8233. |
| 29 | Temporal UI | component | adp-core-services | AD Data Lake | — | — | `ADTMPRL-{E}-{R}` | Active | Temporal Web UI (v2.39.0) for workflow visualization, execution management, and namespace administration. OIDC authentication via Azure AD. Deployed on ECS Fargate alongside Temporal Server. Accessible at `temporal-ui.adtmprl-{e}-{r}.cloudos.autodesk.com` (VPN required for stg/prd). |
| 30 | Temporal Worker | component | adp-core-services | AD Data Lake | — | — | `ADTMPRL-C-UW2-SB` | Active (SB only) | Python-based test worker running HelloWorld workflow for sandbox validation. Deployed on ECS Fargate with mTLS client certificate auth. Sandbox-only deployment. |
| 31 | Temporal Test | component | adp-core-services | AD Data Lake | — | — | `ADTMPRL-{E}-{R}` | Active | Post-deployment test container (`temporalio/admin-tools:1.25`) that validates Temporal server health after each CloudOS deployment. Runs in all environments. |
| 32 | Temporal Database (Aurora PostgreSQL) | resource | adp-core-services | AD Data Lake | — | — | `ADTMPRL-{E}-{R}` | Active | Aurora PostgreSQL 16.3 cluster backing Temporal server. TLS-only connections enforced. Instance class `db.t4g.medium` in stg/prd. Stores workflow execution history, visibility data, and namespace metadata. |
| 33 | Temporal Security Groups & PKI | resource | adp-core-services | AD Data Lake | — | — | `ADTMPRL-{E}-{R}` | Active | Terraform module provisioning AWS Private CA hierarchy (root + subordinate CA) for Temporal mTLS, security groups for inter-node communication (ports 6933-6939, 7233-7239), IAM roles for CA management, cross-account RAM resource sharing for tenant CA access, and Secrets Manager storage for CA/server/UI certificates. |
| 34 | Temporal Bastion | resource | adp-core-services | AD Data Lake | — | — | `ADTMPRL-C-UW2` | Active | EC2 bastion host (`t3a.medium`) for secure database access. CloudOS-managed with `business_service: adtmprl`. Dev environment only (not deployed in stg/prd). |

---

## Identifier Reference

### `adpcs-infra` repo

| Identifier Type | Values Found in Repo | Source Location |
|---|---|---|
| `adsk.service.id` | `4AFA5AF5` (Querybook), `3D30775F` (Presto), `F20B171E` (Astronomer) | `helm_chart_values/*.yaml` OTEL_RESOURCE_ATTRIBUTES |
| `adsk.service.alias` | `CSQRYBOK`, `PRESTOCS`, `CSASTRO`, `ADP-PRESTO`, `ADPTS` | `helm_chart_values/*.yaml`, Terraform tags |
| `BUSINESS_SERVICE` | `ADPCS` | Jenkins Groovy pipelines (`build-and-push-*.groovy`) |
| Moniker pattern | `{business_service}-{env}-{region}` e.g. `ADPCS-P-UE1` | `variables.tf` / `locals.tf` (all modules) |
| EMR job template | `adpts` | `job-template.json` (root) |

### `adp-temporal` repo

| Identifier Type | Values Found in Repo | Source Location |
|---|---|---|
| CloudOS project/service | `adtmprl` | `Jenkinsfile` (`config.service`), `.cloudos/*/pipelines.yml` |
| `business_service` | `adtmprl` | `.cloudos/bastion/infra/infra.yml` |
| Moniker pattern | `ADTMPRL-{E}-{R}` e.g. `ADTMPRL-P-UE1`, `ADTMPRL-C-UW2-SB` | `.cloudos/temporal/infra/*/us-*.yml`, `.cloudos/temporal-infra/infra/*/us-*.yml` |
| `adsk.service.id` | — (not set) | No OTEL_RESOURCE_ATTRIBUTES configured |
| `adsk.service.alias` | — (not set) | No Beacon catalog config |
| `adsk:service` tag | `temporal` | `infrastructure/tf/regional/certs.tf` (CA resource tags) |
| VPN Group | `VPNAccess_ADTMPRL` | `README.md` |
| Harmony product_name | `AD Temporal` | `Jenkinsfile` (Harmony scan config) |

## System-to-Business-Service Mapping

These are the Beacon systems that the infra repo's services roll up to:

| System | Business Service ID | Title | Owner |
|---|---|---|---|
| `adp-central-data-lake` | `80494D62` | AD Data Lake | ad-platform-infra |
| `adp-control-plane` | `94898117` | ADP Control Plane | ad-platform-infra |
| `adp-core-services` | `02147B95` | ADP Core Services | ad-platform-infra |
| `adp-studio` | — (uses `4AFA5AF5` / CSQRYBOK for OTEL) | ADP Studio | ad-platform-infra |

## Summary Counts

### `adpcs-infra` repo

| Category | Active | Archived | Total |
|---|---|---|---|
| Components (deployable services) | 9 | 3 | 12 |
| Resources (infrastructure modules) | 15 | 0 | 15 |
| **Subtotal** | **24** | **3** | **27** |

### `adp-temporal` repo

| Category | Active | Archived | Total |
|---|---|---|---|
| Components (deployable services) | 4 | 0 | 4 |
| Resources (infrastructure modules) | 3 | 0 | 3 |
| **Subtotal** | **7** | **0** | **7** |

### Combined Totals

| Category | Active | Archived | Total |
|---|---|---|---|
| Components (deployable services) | 13 | 3 | 16 |
| Resources (infrastructure modules) | 18 | 0 | 18 |
| **Grand Total** | **31** | **3** | **34** |
