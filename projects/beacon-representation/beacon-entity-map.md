# AD Platform Infrastructure — Beacon Entity Relationship Map

**Last Updated:** 2026-03-04  
**PR:** [#909](https://git.autodesk.com/openatadsk/pset-software-catalog/pull/909)

---

## Full Entity Hierarchy

```mermaid
graph TD
    classDef domain fill:#1a237e,color:#fff,stroke:#0d47a1,stroke-width:2px
    classDef product fill:#004d40,color:#fff,stroke:#00695c,stroke-width:2px
    classDef system fill:#e65100,color:#fff,stroke:#bf360c,stroke-width:2px
    classDef component fill:#37474f,color:#fff,stroke:#263238,stroke-width:1px
    classDef api fill:#4a148c,color:#fff,stroke:#311b92,stroke-width:1px
    classDef docs fill:#0277bd,color:#fff,stroke:#01579b,stroke-width:1px
    classDef pending fill:#fff,color:#666,stroke:#999,stroke-width:1px,stroke-dasharray: 5 5

    DOM[/"🏛 Domain: ad-platform-infrastructure<br/>(PENDING — replaces broken ad-infra)"/]:::pending

    DOM -->|hasPart| PROD_DL
    DOM -->|hasPart| PROD_ST
    DOM -->|hasPart| SYS_CP

    subgraph product_dl ["Product: AD Data Lake"]
        PROD_DL["📦 product:pset/ad-data-lake<br/>owner: ad-platform-infra<br/>IN PR #909"]:::product
    end

    subgraph product_st ["Product: ADP Studio"]
        PROD_ST["📦 product:pset/adp-studio<br/>owner: ad-platform-infra<br/>IN PR #909"]:::product
    end

    %% AD Data Lake Product relationships
    PROD_DL -->|hasPart| SYS_CDL
    PROD_DL -->|hasPart| API_DFS
    PROD_DL -->|hasPart| API_DM
    PROD_DL -->|hasPart| API_HR
    PROD_DL -->|hasPart| API_EMR
    PROD_DL -->|hasPart| API_AT
    PROD_DL -->|hasPart| API_SRD
    PROD_DL -->|hasPart| API_UDA
    PROD_DL -->|hasPart| COMP_DL_DOCS

    subgraph sys_cdl ["System: AD Data Lake (adp-central-data-lake)"]
        SYS_CDL["⚙️ system:pset/adp-central-data-lake<br/>title: AD Data Lake<br/>EXISTS — title renamed"]:::system
    end

    %% Components on ADPCP (partOf AD Data Lake product)
    SYS_CDL ---|"16 components<br/>(currently on ADPCP)"| COMP_GROUP_CDL

    subgraph COMP_GROUP_CDL ["Components (on ADPCP — to be merged)"]
        C1["datafile-storage-api"]:::component
        C2["datafile-storage-api-pipeline"]:::component
        C3["domain-management-api"]:::component
        C4["hive-resource-api"]:::component
        C5["hive-domain-api"]:::component
        C6["hive-domain-api-pipeline"]:::component
        C7["snowflake-domain-api-pipeline"]:::component
        C8["emr-spark-cluster-api"]:::component
        C9["emr-spark-cluster-provision-api-pipeline"]:::component
        C10["astro-tenant-api"]:::component
        C11["svc-role-data-access-api"]:::component
        C12["user-data-access-api"]:::component
        C13["privacera-proxy-api"]:::component
        C14["iam-role-api"]:::component
        C15["iam-role-api-pipeline"]:::component
    end

    %% APIs on adp-control-plane (partOf AD Data Lake product)
    subgraph apis_dl ["APIs (on adp-control-plane — to be redistributed)"]
        API_DFS["🔌 datafile-storage-api"]:::api
        API_DM["🔌 domain-management-api"]:::api
        API_HR["🔌 hive-resource-api"]:::api
        API_EMR["🔌 emr-spark-cluster-api"]:::api
        API_AT["🔌 astro-tenant-api"]:::api
        API_SRD["🔌 svc-role-data-access-api"]:::api
        API_UDA["🔌 user-data-access-api"]:::api
    end

    COMP_DL_DOCS["📄 ad-data-lake-docs<br/>type: documentation<br/>TechDocs: ADP/adpdatalakedocs"]:::docs

    %% ADP Studio Product relationships
    PROD_ST -->|hasPart| SYS_STUDIO
    PROD_ST -->|hasPart| API_SQ
    PROD_ST -->|hasPart| API_SC
    PROD_ST -->|hasPart| COMP_WEB
    PROD_ST -->|hasPart| COMP_WORKER
    PROD_ST -->|hasPart| COMP_AI
    PROD_ST -->|hasPart| COMP_ST_DOCS

    subgraph sys_studio ["System: ADP Studio (NEW — IN PR #909)"]
        SYS_STUDIO["⚙️ system:pset/adp-studio<br/>Querybook on EKS<br/>NEW — IN PR #909"]:::system
    end

    subgraph comps_studio ["ADP Studio Components (NEW — IN PR #909)"]
        COMP_WEB["🔧 adp-studio-web<br/>Flask REST + WebSocket"]:::component
        COMP_WORKER["🔧 adp-studio-worker<br/>Celery async workers"]:::component
        COMP_AI["🔧 adp-studio-ai-assistant<br/>Query Assistant (text-to-SQL)"]:::component
    end

    subgraph apis_studio ["ADP Studio APIs (NEW — IN PR #909)"]
        API_SQ["🔌 adp-studio-query-api<br/>Query execution & validation"]:::api
        API_SC["🔌 adp-studio-catalog-api<br/>Metastore & lineage"]:::api
    end

    COMP_ST_DOCS["📄 adp-studio-docs<br/>type: documentation<br/>TechDocs: ADP/adp-studio-docs"]:::docs

    SYS_STUDIO --> COMP_WEB
    SYS_STUDIO --> COMP_WORKER
    SYS_STUDIO --> COMP_AI
    COMP_WEB -->|providesApi| API_SQ
    COMP_WEB -->|providesApi| API_SC

    %% Control Plane
    SYS_CP["⚙️ system:pset/adp-control-plane<br/>Infrastructure backbone<br/>EXISTS — broken domain ref"]:::system

    SYS_CP ---|"currently holds<br/>8 APIs + via ADPCP: 16 components"| NOTE_CP["⚠️ Split-brain: ADPCP duplicate<br/>APIs on adp-control-plane<br/>Components on ADPCP<br/>To be merged in Phase 1"]:::pending
```

---

## Simplified View — Product → hasPart

```mermaid
graph LR
    classDef product fill:#004d40,color:#fff,stroke:#00695c,stroke-width:2px
    classDef api fill:#4a148c,color:#fff,stroke:#311b92,stroke-width:1px
    classDef component fill:#37474f,color:#fff,stroke:#263238,stroke-width:1px
    classDef docs fill:#0277bd,color:#fff,stroke:#01579b,stroke-width:1px

    DL["📦 AD Data Lake<br/>product:pset/ad-data-lake"]:::product
    ST["📦 ADP Studio<br/>product:pset/adp-studio"]:::product

    DL --> DL_A1["datafile-storage-api"]:::api
    DL --> DL_A2["domain-management-api"]:::api
    DL --> DL_A3["hive-resource-api"]:::api
    DL --> DL_A4["emr-spark-cluster-api"]:::api
    DL --> DL_A5["astro-tenant-api"]:::api
    DL --> DL_A6["svc-role-data-access-api"]:::api
    DL --> DL_A7["user-data-access-api"]:::api
    DL --> DL_C["16 components<br/>(from ADPCP)"]:::component
    DL --> DL_D["ad-data-lake-docs"]:::docs

    ST --> ST_A1["adp-studio-query-api"]:::api
    ST --> ST_A2["adp-studio-catalog-api"]:::api
    ST --> ST_C1["adp-studio-web"]:::component
    ST --> ST_C2["adp-studio-worker"]:::component
    ST --> ST_C3["adp-studio-ai-assistant"]:::component
    ST --> ST_D["adp-studio-docs"]:::docs
```

---

## ADP Studio — Internal Architecture

```mermaid
graph TB
    classDef system fill:#e65100,color:#fff,stroke:#bf360c,stroke-width:2px
    classDef component fill:#37474f,color:#fff,stroke:#263238,stroke-width:1px
    classDef api fill:#4a148c,color:#fff,stroke:#311b92,stroke-width:1px
    classDef resource fill:#1b5e20,color:#fff,stroke:#2e7d32,stroke-width:1px
    classDef external fill:#fff,color:#666,stroke:#999,stroke-width:1px,stroke-dasharray: 5 5

    SYS["⚙️ system:pset/adp-studio<br/>Querybook on EKS"]:::system

    SYS --> WEB
    SYS --> WORKER
    SYS --> AI

    subgraph services ["Services"]
        WEB["🔧 adp-studio-web<br/>Flask + Socket.IO<br/>Port 10001"]:::component
        WORKER["🔧 adp-studio-worker<br/>Celery Workers<br/>Query execution, exports"]:::component
        AI["🔧 adp-studio-ai-assistant<br/>WebSocket namespace<br/>text-to-SQL, fix, complete, summarize"]:::component
    end

    WEB -->|providesApi| QA
    WEB -->|providesApi| CA

    subgraph apis ["APIs (~200+ endpoints under /ds/)"]
        QA["🔌 adp-studio-query-api<br/>Execute, validate, transpile<br/>Export, review workflow"]:::api
        CA["🔌 adp-studio-catalog-api<br/>Schema discovery, table metadata<br/>Lineage, search (text + vector)"]:::api
    end

    subgraph infra ["Infrastructure (future Resources)"]
        MYSQL["MySQL"]:::resource
        REDIS["Redis"]:::resource
        OPENSEARCH["OpenSearch"]:::resource
    end

    WEB --> MYSQL
    WEB --> REDIS
    WEB --> OPENSEARCH
    WORKER --> MYSQL
    WORKER --> REDIS

    subgraph external ["External Dependencies"]
        TRINO["Trino Cluster<br/>(Data Lake engine)"]:::external
        SNOWFLAKE["Snowflake<br/>(Warehouse engine)"]:::external
        METADATA["Metadata API<br/>(MDM)"]:::external
    end

    QA -.->|consumesApi| TRINO
    QA -.->|consumesApi| SNOWFLAKE
    CA -.->|consumesApi| METADATA
```

---

## Phase Execution Status

```mermaid
gantt
    title Beacon Representation — Execution Timeline
    dateFormat YYYY-MM-DD
    axisFormat %b %d

    section Phase 1 — Foundation
    Create ad-platform-infrastructure Domain    :p1a, 2026-03-10, 7d
    Merge ADPCP into adp-control-plane          :p1b, 2026-03-10, 10d
    Fix 3 broken domain refs                    :p1c, 2026-03-17, 5d

    section Phase 2 — Products & TechDocs
    PR #909 (Products + ADP Studio entities)    :active, p2a, 2026-03-04, 10d
    Fix TechDocs catalog-info.yaml              :done, p2b, 2026-03-04, 1d
    Register TechDocs in Beacon staging         :p2c, after p2b, 3d
    Verify TechDocs builds                      :p2d, after p2c, 3d

    section Phase 3 — Systems
    Create compute, orchestration, access-control, resource-mgmt systems :p3, after p1c, 7d

    section Phase 4 — APIs
    Redistribute 8 existing APIs                :p4a, after p3, 7d
    Register 4 new APIs                         :p4b, after p3, 7d

    section Phase 5 — Resources
    Register Resource entities                  :p5a, after p4a, 7d
    Add consumesApi relationships               :p5b, after p4a, 7d
```

---

## Legend

| Symbol | Meaning |
|--------|---------|
| 🏛 | Domain |
| 📦 | Product |
| ⚙️ | System |
| 🔧 | Component |
| 🔌 | API |
| 📄 | Documentation (TechDocs) |
| ⚠️ | Issue / needs attention |
| Dashed border | Pending / not yet created |
| Solid border | Exists or in PR #909 |
