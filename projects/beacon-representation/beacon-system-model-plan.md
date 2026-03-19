# AD Platform Infrastructure — Beacon Representation Plan
## AD Data Lake, ADP Studio & Resource Management APIs

**Author:** Abhilash Achar
**Date:** 2026-02-27
**Status:** Phase 1 Complete — Domain Created, Systems Fixed, ADPCP Merged
**Version:** 0.9

---

## 1. Executive Summary

This plan proposes how to represent the **AD Data Lake**, **ADP Studio**, and **Resource Management APIs** in Beacon's software catalog using its system model hierarchy, organized under a new **AD Platform Infrastructure** domain. The goal is to make these products discoverable, navigable, and well-connected so developers, stakeholders, and dependent teams can understand the platform's structure, ownership, and API surface.

**Scope:** Systems owned or co-owned by the AD Platform Infrastructure team.

**Why this matters:** Today these systems are scattered across multiple Beacon namespaces (`pset`, `default`) with inconsistent naming, broken domain references (e.g., `domain:default/ad-infra` doesn't exist in the catalog), missing Product entities, and no connection to the Autodesk System Model capabilities map. A clean Beacon representation will improve discoverability, enable dependency tracking, and align with PSET's expectations for catalog completeness.

---

## 2. Beacon System Model — How It Works

Beacon organizes entities in a strict hierarchy with relationship types connecting each level:

```
Capability ──(realizedBy)──► Domain ──(hasPart)──► System ──(hasPart)──► Component
                                                           ──(providesApi)──► API
                                                           ──(hasPart)──► Resource
```

**Entity Kinds and Their Purpose:**

| Kind | Purpose | Example |
|------|---------|---------|
| **Capability** | Strategic capability from the Autodesk capabilities map | Insights & Personalization |
| **Domain** | Functional area that realizes a capability | Analytics Data Processing |
| **System** | A bounded, deployable service boundary | AD Data Lake |
| **Component** | A deployable unit (service, MFE, worker, etc.) | `docs-dm`, `insight-frontend` |
| **API** | An interface provided or consumed by a system | Datafile Storage API (OpenAPI) |
| **Resource** | Infrastructure dependency (DB, cache, queue, bucket) | PostgreSQL, S3, Redis |
| **Product** | Customer-facing offering (can contain systems) | BIM 360 Docs |

**Key Relationships:**

| Relationship | Meaning |
|-------------|---------|
| `hasPart` / `partOf` | Containment (Domain has Systems, System has Components) |
| `realizedBy` / `realizationOf` | Capability is realized by Domains |
| `providesApi` / `apiProvidedBy` | System provides an API |
| `consumesApi` / `apiConsumedBy` | Component/System consumes an API |
| `dependsOn` / `dependencyOf` | Runtime dependency |
| `ownedBy` / `ownerOf` | Team ownership |

---

## 3. Current State — What Exists Today (Production)

> **Note:** This section was updated on 2026-02-27 using production Beacon data (not staging).

### 3.1 Existing ADP-Related Entities in Production Beacon

**Systems (key entries):**

| System | Namespace | Domain | Owner | Notes |
|--------|-----------|--------|-------|-------|
| `adp-central-data-lake` | pset | `domain:default/ad-infra` | ad-platform-infra | **Domain reference broken** — `ad-infra` doesn't exist |
| `adp-core-services` | pset | `domain:default/ad-infra` | ad-platform-infra | Same broken domain ref |
| `adp-control-plane` | pset | `domain:default/ad-infra` | ad-platform-infra | Same broken domain ref; holds **8 APIs** |
| `ADPCP` | pset | — | alex.orr | **Split-brain duplicate** of adp-control-plane; holds **16 Components** |
| `ADPDS` | pset | — | anitha.matta | ADP Data Services |
| `ADPES` | pset | — | AD-SPS | Streaming Processing |
| `ADPDISI` | pset | — | marcus.too | Stream Ingestion |
| `ADPBP` | pset | — | mili.tripathi | Batch Processing |
| `ADPCASE` | pset | — | adp.csi.webnservices | Client-Side Interactions |
| `ADPCSI` | pset | — | adp.csi.webnservices | CSI Services |
| `ADPDP` | pset | — | nick.ragusa | Data Portal |
| `ADPPHD` | pset | — | norberto.hernandez | ADPPHD |
| `ad-data-capture` | pset | `adp-client-side-interaction` | adp.product.data.collection | Data Capture SDKs |
| `ad-data-security-governance` | pset | — | ad-data-security | Data Security |
| `adp-data-quality-assurance` | pset | — | adp.edev.team | Data Quality |
| `adp-central-notification-service` | pset | — | adp.edev.team | Notification Service |
| `linc` | pset | — | adp.edev.team | Language-Integrated Networked Context |

**Domains:**

| Domain | Namespace | Notes |
|--------|-----------|-------|
| `adp-access-and-discovery` | default | ADP Access and Discovery |
| `adp-streaming-ingestion` | default | ADP Streaming Ingestion |
| `adp-client-side-interaction` | default | Has child: `system:pset/ad-data-capture` |
| `ingestion-config-service` | default | Batch-Ingestion |

**APIs on `adp-control-plane` (all exist in production):**

| API | Owner | System |
|-----|-------|--------|
| `datafile-storage-api` | ad-platform-infra | adp-control-plane |
| `domain-management-api` | ad-platform-infra | adp-control-plane |
| `hive-resource-api` | ad-platform-infra | adp-control-plane |
| `snowflake-resource-api` | ad-platform-infra | adp-control-plane |
| `emr-spark-cluster-api` | ad-platform-infra | adp-control-plane |
| `astro-tenant-api` | ad-platform-infra | adp-control-plane |
| `svc-role-data-access-api` | ad-platform-infra | adp-control-plane |
| `user-data-access-api` | ad-platform-infra | adp-control-plane |

**Other relevant APIs:** `adpes-ingestion-api`, `adpes-control-plane-api`, `ad-data-security-governance`, `adp-phd`, `data-quality-api`, `central-notification-service-api`, `metadata-manager-api`, `insight-delivery-graphql`.

**Products:** None for AD Data Lake, ADP Studio, or Resource Management.

**Resources:** None for ADP infra-owned systems (no S3, Snowflake, Airflow, EMR resources registered).

### 3.2 Critical Issue — Split-Brain Duplicate

**`adp-control-plane` ↔ `ADPCP`** (CloudDNA ID: `94898117`)

| Aspect | `adp-control-plane` | `ADPCP` |
|--------|---------------------|---------|
| Entity source | `pset-software-catalog` (main) + BSM2ASM migration | `pset-software-catalog` (main) |
| Owner | `group:default/ad-platform-infra` | `user:default/alex.orr` |
| Domain | `domain:default/ad-infra` (broken) | — (none) |
| Children | **8 APIs** | **16 Components** |

**Impact:** You cannot navigate from an API to its backing component within the same system. APIs and their implementation are disconnected.

### 3.3 Identified Gaps (Updated for Production)

| # | Gap | Severity | Impact | Status |
|---|-----|----------|--------|--------|
| G1 | **No Product entity** for AD Data Lake or ADP Studio | High | Not discoverable as products; can't traverse Product → System | ✅ Fixed — `ad-data-lake` and `adp-studio` Products created in PR #712 |
| G2 | **Broken domain references** — `ad-infra` (3 systems) don't exist | Critical | 3 systems orphaned with no hierarchy context | ✅ Fixed — All 3 systems now reference `domain:pset/ad-platform-infrastructure` |
| G3 | **No `ad-platform-infrastructure` Domain** | High | No grouping for our operational systems | ✅ Fixed — Domain created with `realizationOf: capability:capabilities-map/insights-personalization` |
| G4 | **Split-brain duplicate** — `ADPCP`/`adp-control-plane` share CloudDNA ID but split APIs vs Components | Critical | APIs disconnected from their components; ownership confusion | ✅ Fixed — 16 components moved to `adp-control-plane`; `ADPCP.yaml` retired |
| G6 | **APIs exist but need redistribution** — all 8 Resource Mgmt APIs lumped on `adp-control-plane` instead of logical systems | Medium | APIs don't map to product architecture boundaries | Phase 4 — pending |
| G7 | **Missing new APIs** — `create-storage-api`, `cdl-schema-api`, `compute-api`, `infrastructure-api-v2`, `studio-query-api` | Medium | Upcoming APIs not yet registered | Partial — `adp-studio-query-api` and `adp-studio-catalog-api` created in PR #712 |
| G8 | **No Resource entities** for ADP infra systems — S3, Snowflake, Airflow, EMR | Low | Infrastructure dependencies invisible | Phase 5 — pending |
| G9 | **Inconsistent naming** — mix of `adp-*`, `ADPCP`, `ADPBP` | Medium | Hard to find and navigate | Partial — `ADPCP` retired |
| G10 | **ADP Studio has zero presence** — No system, component, or API anywhere in production | High | Major product completely invisible. `adpcs-presto-system` does not exist in production. | ✅ Fixed — Product, System, 3 Components, 2 APIs created in PR #712 |

---

## 4. Proposed Beacon Representation

### 4.1 Target Hierarchy

```
Domain: AD Platform Infrastructure (NEW — namespace: pset)
│   Replaces broken "domain:default/ad-infra"
│   owner: group:default/ad-platform-infra
│
├── Product: AD Data Lake (NEW — namespace: pset)
│   │   title: "AD Data Lake"
│   │   description: "Enterprise-scale data platform with commercial and corporate environments"
│   │   owner: group:default/ad-platform-infra
│   │
│   ├── System: adp-central-data-lake (EXISTS — UPDATE domain ref)
│   │   │   title: "AD Data Lake — Storage"
│   │   ├── Component: datafile-storage-service (MOVE from ADPCP)
│   │   ├── Component: hive-resource-service (MOVE from ADPCP)
│   │   ├── Component: snowflake-resource-service (MOVE from ADPCP)
│   │   ├── Component: cdl-schema-service (NEW)
│   │   ├── API: datafile-storage-api (EXISTS — MOVE from adp-control-plane)
│   │   ├── API: domain-management-api (EXISTS — MOVE from adp-control-plane)
│   │   ├── API: hive-resource-api (EXISTS — MOVE from adp-control-plane)
│   │   ├── API: snowflake-resource-api (EXISTS — MOVE from adp-control-plane)
│   │   ├── API: create-storage-api (NEW — not yet on Beacon)
│   │   ├── API: cdl-schema-api (NEW — not yet on Beacon)
│   │   ├── Resource: s3-raw-buckets (NEW)
│   │   ├── Resource: s3-internal-buckets (NEW)
│   │   ├── Resource: s3-export-buckets (NEW)
│   │   ├── Resource: glue-data-catalog (NEW)
│   │   └── Resource: snowflake-warehouse (NEW)
│   │
│   ├── System: ad-datalake-compute (NEW or rename from scattered systems)
│   │   │   title: "AD Data Lake — Compute"
│   │   ├── Component: emr-on-eks-service (NEW)
│   │   ├── Component: dataos-integration (NEW)
│   │   ├── API: emr-spark-cluster-api (EXISTS — MOVE from adp-control-plane)
│   │   ├── API: compute-api (NEW — unified compute API)
│   │   └── Resource: eks-clusters (NEW)
│   │
│   ├── System: ad-datalake-orchestration (NEW)
│   │   │   title: "AD Data Lake — Orchestration"
│   │   ├── Component: oss-airflow-service (NEW)
│   │   ├── Component: pipeline-cicd (NEW)
│   │   ├── API: astro-tenant-api (EXISTS — MOVE from adp-control-plane, mark deprecated)
│   │   └── Resource: airflow-metadata-db (NEW)
│   │
│   ├── System: ad-datalake-access-control (NEW)
│   │   │   title: "AD Data Lake — Access Control"
│   │   ├── Component: privacera-integration (NEW, mark transitioning)
│   │   ├── Component: lake-formation-integration (NEW)
│   │   ├── API: user-data-access-api (EXISTS — MOVE from adp-control-plane)
│   │   └── API: svc-role-data-access-api (EXISTS — MOVE from adp-control-plane)
│   │
│   └── System: ad-resource-management (NEW)
│       │   title: "AD Resource Management"
│       ├── Component: adp-infra-project-resources-mfe (NEW — the Unified Resource MFE)
│       ├── Component: ad-infra-api (NEW — the backend)
│       └── API: infrastructure-api-v2 (NEW — region-aware resource mgmt API)
│
├── Product: ADP Studio (NEW — namespace: pset)
│   │   title: "ADP Studio"
│   │   description: "Interactive SQL query platform with AI assistance"
│   │   owner: group:default/adp.ts.developer.team
│   │
│   └── System: adp-studio (NEW or update adpcs-presto-system)
│       │   title: "ADP Studio"
│       ├── Component: studio-frontend (NEW — QueryBook-based UI)
│       ├── Component: query-assistant (NEW — AI-powered SQL assistant)
│       ├── Component: catalog-browser (NEW — metadata browser)
│       ├── Component: dashboard-engine (NEW — visualization)
│       ├── Component: trino-gateway (RENAME from adpcs-presto-system)
│       ├── API: studio-query-api (NEW)
│       ├── Resource: trino-cluster (NEW)
│       └── Resource: snowflake-connection (NEW)
│
└── System: adp-control-plane (EXISTS — UPDATE domain ref)
    │   title: "ADP Control Plane"
    ├── System: adp-core-services (EXISTS — UPDATE)
    └── (Infrastructure backbone — not user-facing)

```

---

## 5. Action Plan

### Phase 1: Foundation — Fix Broken References, Resolve Duplicates & Create Domain (Week 1-2) ✅ COMPLETE

| # | Action | Entity Type | Details | Owner | Priority | Status |
|---|--------|-------------|---------|-------|----------|--------|
| 1.1 | **Create Domain: `ad-platform-infrastructure`** | Domain | namespace: `pset`, owner: `ad-platform-infra`. Replaces broken `domain:default/ad-infra`. Linked to `capability:capabilities-map/insights-personalization`. | Abhilash | P0 | ✅ Done (2026-03-05) |
| 1.2 | **Merge `ADPCP` into `adp-control-plane`** | System | Moved 16 components from `ADPCP` → `adp-control-plane`; retired `ADPCP.yaml`. Both shared CloudDNA ID `94898117`. `adp-control-plane` now has explicit `hasPart` listing all 7 APIs and 16 components. | Abhilash | P0 | ✅ Done (2026-03-05) |
| 1.3 | **Update `adp-central-data-lake`** domain ref | System | `domain:default/ad-infra` → `domain:pset/ad-platform-infrastructure` | Abhilash | P0 | ✅ Done (2026-03-05) |
| 1.4 | **Update `adp-core-services`** domain ref | System | Same fix | Abhilash | P0 | ✅ Done (2026-03-05) |
| 1.5 | **Update `adp-control-plane`** domain ref | System | Same fix | Abhilash | P0 | ✅ Done (2026-03-05) |

**Deliverable:** All infra-owned ADP systems have valid domain references; ADPCP/adp-control-plane split-brain resolved; `ad-platform-infrastructure` domain visible in Beacon.

**PR:** [pset-software-catalog #909](https://git.autodesk.com/openatadsk/pset-software-catalog/pull/909)

**YAML Example for Domain:**
```yaml
apiVersion: backstage.io/v1alpha1
kind: Domain
metadata:
  name: ad-platform-infrastructure
  namespace: pset
  title: AD Platform Infrastructure
  description: >
    AD Platform Infrastructure provides enterprise-scale data storage, processing,
    orchestration, query, and governance capabilities for Autodesk. This domain
    encompasses the AD Data Lake, ADP Studio, Resource Management APIs, and the
    underlying control plane and core services.
  tags:
    - data-platform
  annotations:
    backstage.io/source-location: url:https://git.autodesk.com/openatadsk/pset-software-catalog/tree/staging/domains/
spec:
  owner: group:default/ad-platform-infra
```

### Phase 2: Register Products (Week 2-3)

| # | Action | Entity Type | Details | Owner |
|---|--------|-------------|---------|-------|
| 2.1 | **Create Product: `ad-data-lake`** | Product | namespace: `pset`, owner: `ad-platform-infra` | Abhilash |
| 2.2 | **Create Product: `adp-studio`** | Product | namespace: `pset`, owner: `adp.ts.developer.team` | Abhilash + Sankalp |
| 2.3 | **Link systems to products** | Relations | `adp-central-data-lake` partOf `ad-data-lake`, etc. | Abhilash |

**Deliverable:** Two new Products in Beacon; navigable from Product → Systems.

### Phase 3: Register New Systems & Reorganize (Week 3-4)

| # | Action | Entity Type | Details | Owner |
|---|--------|-------------|---------|-------|
| 3.1 | **Create System: `ad-datalake-compute`** | System | Consolidate compute services | Abhilash |
| 3.2 | **Create System: `ad-datalake-orchestration`** | System | For OSS Airflow | Abhilash |
| 3.3 | **Create System: `ad-datalake-access-control`** | System | For Privacera/Lake Formation | Abhilash |
| 3.4 | **Create System: `ad-resource-management`** | System | For Infra API + MFE | Abhilash |
| 3.5 | **Create System: `adp-studio`** | System | Query platform | Abhilash + Trupal |

**Deliverable:** Clean system boundaries aligned with product architecture.

### Phase 4: Redistribute Existing APIs & Register New Ones (Week 4-5)

**Existing APIs to redistribute** (currently all on `adp-control-plane` — move to logical systems):

| # | API Name | Current System | Target System | Action |
|---|----------|---------------|---------------|--------|
| 4.1 | `datafile-storage-api` | adp-control-plane | adp-central-data-lake | Move |
| 4.2 | `hive-resource-api` | adp-control-plane | adp-central-data-lake | Move |
| 4.3 | `snowflake-resource-api` | adp-control-plane | adp-central-data-lake | Move |
| 4.4 | `domain-management-api` | adp-control-plane | adp-central-data-lake | Move |
| 4.5 | `emr-spark-cluster-api` | adp-control-plane | ad-datalake-compute | Move |
| 4.6 | `astro-tenant-api` | adp-control-plane | ad-datalake-orchestration | Move (mark deprecated) |
| 4.7 | `user-data-access-api` | adp-control-plane | ad-datalake-access-control | Move |
| 4.8 | `svc-role-data-access-api` | adp-control-plane | ad-datalake-access-control | Move |

**New APIs to register:**

| # | API Name | Type | System | Status |
|---|----------|------|--------|--------|
| 4.9 | `create-storage-api` | openapi | adp-central-data-lake | New registration |
| 4.10 | `cdl-schema-api` | openapi | adp-central-data-lake | New registration |
| 4.11 | `compute-api` | openapi | ad-datalake-compute | New registration |
| 4.12 | `infrastructure-api-v2` | openapi | ad-resource-management | New registration |
| 4.13 | `studio-query-api` | openapi | adp-studio | New registration |

**Deliverable:** APIs distributed to correct systems matching product architecture; new APIs discoverable with OpenAPI specs.

### Phase 5: Register Components & Resources (Week 5-6)

| # | Action | Count | Priority |
|---|--------|-------|----------|
| 5.1 | Register key Components for each System | ~15-20 | High — focus on services, MFEs, and workers |
| 5.2 | Register Resource entities (S3, Snowflake, Trino, Airflow DBs) | ~8-10 | Medium |
| 5.3 | Add `consumesApi` relationships for cross-system dependencies | ~10 | Medium |
| 5.4 | **Consolidate TechDocs into two repos** | 2 repos | High |

**TechDocs Consolidation (5.4 detail):**

The monolithic `adpdatalakedocs` repo splits into two Beacon-aligned TechDocs sites:

| Repo | Beacon Entity | Content |
|------|---------------|---------|
| `ADP/adpdatalakedocs` (update) | `product:pset/ad-data-lake` | Storage, Compute, Orchestration, APIs, architecture, getting started |
| `ADP/adp-studio-docs` (new) | `product:pset/adp-studio` | Query editor, Query Assistant, catalog browser, dashboards, troubleshooting |

**Key changes to `adpdatalakedocs`:**
- `catalog-info.yaml`: Component → Product (`ad-data-lake`)
- `mkdocs.yaml`: Remove `query.md` from nav
- `index.md`: Replace Query section with link to ADP Studio docs

**New `adp-studio-docs` structure** (split from `query.md`):
- `index.md` — Studio overview and quick start
- `getting-started.md` — VPN, access, prerequisites
- `query-editor.md` — Interface, editor, results, best practices
- `query-assistant.md` — AI features (generate, edit, fix, summarize)
- `catalog-browser.md` — Metastore browsing and documentation
- `dashboards.md` — Visualizations and dashboard management
- `troubleshooting.md` — Troubleshooting and FAQ

**Deliverable:** Full entity graph navigable in Beacon; TechDocs on both Products.


---

## 6. YAML Templates

All entity definitions live in the `pset-software-catalog` Git repository:
`https://git.autodesk.com/openatadsk/pset-software-catalog`

### Product YAML Template

```yaml
apiVersion: backstage.io/v1alpha1
kind: Product
metadata:
  name: ad-data-lake
  namespace: pset
  title: AD Data Lake
  description: >
    Enterprise-scale data platform for storing, processing, and analyzing
    data across Autodesk. Operates in two environments — commercial and
    corporate. Provides storage (S3), compute (EMR on EKS), orchestration
    (OSS Airflow), and governance capabilities.
  tags:
    - autodesk-system-model
    - data-platform
  links:
    - title: Data Portal
      url: https://data.autodesk.com
      type: website
    - title: Documentation
      url: https://autodesk.atlassian.net/wiki/spaces/CPDDPS
      type: wiki
    - title: Support
      url: https://autodesk.enterprise.slack.com/archives/pset-ad-infra-support
      type: slack
spec:
  type: platform
  owner: group:default/ad-platform-infra
  domain: domain:pset/ad-platform-infrastructure
  lifecycle: production
```

### System YAML Template (ADP Studio)

```yaml
apiVersion: backstage.io/v1alpha1
kind: System
metadata:
  name: adp-studio
  namespace: pset
  title: ADP Studio
  description: >
    Interactive SQL query platform with AI-powered assistance. Supports
    Trino (Data Lake) and Snowflake query engines with catalog browsing,
    dashboards, and the Query Assistant.
  tags:
    - autodesk-system-model
    - query-tool
  links:
    - title: ADP Studio
      url: https://data.autodesk.com/query-experience
      type: website
    - title: User Guide
      url: https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333930171
      type: wiki
spec:
  owner: group:default/adp.ts.developer.team
  domain: domain:pset/ad-platform-infrastructure
  lifecycle: production
```

### API YAML Template (Infrastructure API v2)

```yaml
apiVersion: backstage.io/v1alpha1
kind: API
metadata:
  name: infrastructure-api-v2
  namespace: pset
  title: AD Infrastructure API v2
  description: >
    Region-aware REST API for provisioning and managing Data Lake resources
    including storage, compute, orchestration, and lifecycle operations.
  tags:
    - resource-management
    - region-aware
spec:
  type: openapi
  owner: group:default/ad-platform-infra
  system: system:pset/ad-resource-management
  lifecycle: production
  definition:
    $text: https://path-to-openapi-spec/openapi.yaml
```

---

## 7. Stakeholder Communication Plan

Following the Mochary Method, here's how to manage stakeholder alignment:

| Stakeholder | Interest | Approach |
|-------------|----------|----------|
| **adp.ts.developer.team** (Studio team) | New Product and System for ADP Studio | Frame as *giving Studio the visibility it deserves*. They gain a dedicated Product entity. Ask them to validate Component breakdown. |
| **adp.csi.webnservices** (CSI team) | ADPCASE/ADPCSI reorganization | Discuss whether these should be Components within a system or remain separate. |
| **Alex Orr / Vaishak Suresh** | Control plane deduplication | Resolve `ADPCP` vs `adp-control-plane` — merge components into canonical `adp-control-plane`, retire `ADPCP.yaml`. Both share CloudDNA ID `94898117`. |

**Key Communication Principle:** Don't surprise anyone. Use the "I intend to..." pattern from Turn the Ship Around: "I intend to reorganize the ADP systems in Beacon under a new `ad-platform-infrastructure` domain. This will fix the broken `ad-infra` references and make our products discoverable. I'd like your feedback before I proceed."

---

## 8. Success Criteria

| Metric | Before | Target | Current (2026-03-05) |
|--------|--------|--------|---------------------|
| Products registered in Beacon | 0 | 2 (AD Data Lake, ADP Studio) | ✅ 2 — `ad-data-lake`, `adp-studio` (PR #712) |
| Systems with valid domain reference | 0 of 3 infra systems | All infra-owned systems have valid domain ref | ✅ 3 of 3 — all reference `domain:pset/ad-platform-infrastructure` |
| Split-brain duplicate | 1 (`ADPCP`/`adp-control-plane`) | 0 | ✅ 0 — `ADPCP.yaml` retired, 16 components merged |
| APIs registered and linked | 8 existing (all on wrong system) | 13+ on correct systems | 10 total (8 existing + 2 new Studio APIs); redistribution pending |
| `get_transitive_closure` from Product returns full tree | Fails (no Products exist) | Returns all systems, components, APIs | Pending verification post-merge |
| Broken domain references | 3 (`ad-infra` ×3) | 0 | ✅ 0 |

---

## 9. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **Merging `ADPCP` into `adp-control-plane` breaks references** — other teams may link to `ADPCP` by name | High | High | Audit all `consumesApi` and `dependsOn` refs before removing; use entity name aliases if supported; coordinate with Alex Orr |
| **API redistribution breaks existing links** — moving APIs off `adp-control-plane` to new systems changes their `system` ref | Medium | Medium | Update API YAML `spec.system` in a single coordinated PR; verify no external `consumesApi` references break |
| Breaking existing Beacon references (other teams link to current entity names) | Medium | High | Keep existing entity `name` fields; only update `domain` refs and add new relationships |
| YAML changes break production catalog | Low | High | Test in staging first; use PR reviews; coordinate with PSET catalog admins |

---

## 10. Timeline Summary

| Week | Phase | Key Deliverable |
|------|-------|----------------|
| 1-2 | Phase 1: Foundation | `ad-platform-infrastructure` domain created; broken refs fixed |
| 2-3 | Phase 2: Products | 2 Products registered (AD Data Lake, ADP Studio) |
| 3-4 | Phase 3: Systems | New systems created |
| 4-5 | Phase 4: APIs | All APIs registered with OpenAPI specs |
| 5-6 | Phase 5: Components & Resources | Full entity graph |

**Total estimated effort:** 5-6 weeks with parallel stakeholder alignment.

---

## Appendix A: Entity Count Summary (Production Baseline)

| Entity Kind | Current (Production) | Proposed Count | Change |
|-------------|---------------------|----------------|--------|
| Domain | 0 usable (3 broken refs in scope) | 1 (`ad-platform-infrastructure`) | +1 new, 3 refs fixed |
| Product | 0 | 2 | +2 |
| System | ~20 ADP-related (scattered, 1 duplicate pair in scope) | ~10 (consolidated) | 1 duplicate merged, new systems created |
| Component | ~80+ (split across `ADPCP`) | ~30 under correct systems | Reorganized, not all net-new |
| API | 8 existing on adp-control-plane + ~6 others | ~13 on correct systems | +5 new, 8 redistributed |
| Resource | 0 for infra systems | ~10 | +10 |

## Appendix B: File Locations in pset-software-catalog

```
pset-software-catalog/
├── domains/
│   └── ad-platform-infrastructure.yaml      # NEW
├── products/
│   ├── ad-data-lake.yaml                   # NEW
│   └── adp-studio.yaml                     # NEW
├── systems/
│   ├── adp-central-data-lake.yaml          # UPDATE domain ref
│   ├── adp-core-services.yaml              # UPDATE domain ref
│   ├── adp-control-plane.yaml              # UPDATE domain ref
│   ├── ad-datalake-compute.yaml            # NEW
│   ├── ad-datalake-orchestration.yaml      # NEW
│   ├── ad-datalake-access-control.yaml     # NEW
│   ├── ad-resource-management.yaml         # NEW
│   ├── adp-studio.yaml                     # NEW
├── components/
│   └── (new component YAMLs)               # NEW
├── apis/
│   ├── (new API YAMLs)                     # NEW
│   └── (existing API updates)              # UPDATE
└── resources/
    └── (new resource YAMLs)                # NEW
```

---

*This plan should be reviewed with the AD Platform Infrastructure triad and IDP admin before execution begins.*
