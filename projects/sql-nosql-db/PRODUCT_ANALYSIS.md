# SQL and NoSQL Database Setup and Access - Product Analysis

**Epic:** PSETWRKIN-2906  
**Requesting Team:** AECGAIA  
**Program:** GAIA  
**Target:** End of FY26 Q4  
**Status:** Under Review  

---

## Executive Summary

This request from AECGAIA represents a **significant platform gap** in AMP's capabilities. It is not a "nice-to-have" but rather addresses a fundamental architectural limitation that is constraining ML workflow efficiency and blocking certain patterns of AI/ML development entirely.

---

## 1. Product Fit Within AMP Architecture

### Current AMP Data Layer

| Capability | Status | Limitation |
|------------|--------|------------|
| Blob Storage (S3) | ✅ Available | No query/indexing |
| Iceberg Tables (CDL) | ✅ Available | Poor write concurrency, immature Python tooling |
| Vector Database | ✅ Recently Added | Specialized for embeddings only |
| **Relational DB (SQL)** | ❌ Missing | — |
| **Key-Value Store (NoSQL)** | ❌ Missing | — |

### The Gap

AMP has optimized for large-scale data lake analytics but lacks **operational data stores** for:
- Fast point queries
- High-concurrency writes
- Temporary/ephemeral state management
- Lookup tables and indexes
- Application backend state

From the AMP Architecture documentation, there's recognition that ML workflows have "broader variety of personas" and "additional challenges" compared to standard SDLC. Database access is a missing piece of that puzzle.

---

## 2. Use Case Analysis

Based on the Jira comments and the AMP Requests page, there are **three distinct use case patterns**:

### Pattern A: Operational Metadata (AECGAIA Data Team)

Per Colt Chapin's comments, they need:
- High concurrency writes (3k+ concurrent writers)
- Key-value lookups for batch ID mapping
- Fast reads during training workflows

**Why Iceberg fails:** PyIceberg is single-threaded, lacks retry logic, and has no compaction support. Write conflicts on stale metadata corrupt tables.

### Pattern B: Research Enablement (Pete Meltzer's team)

From the comments:
> "We make POCs and apps that require backend state management using NoSQL DBs... temporary book-keeping such as creating lookup tables that map different batch ids and file urns to one another."

**Key insight:** This is NOT for storing customer data—it's for operational/experiment state. The data lake is overkill for these patterns.

### Pattern C: Row-Level Lineage (RFC Document)

The RFC reveals the scale challenge:
- 150M+ files, 1B+ derivatives
- 100M-1B write requests per pipeline run
- Forward lineage queries need O(1) lookups

They evaluated DynamoDB, Cassandra, PostgreSQL, and ultimately chose Iceberg as a compromise—acknowledging it's suboptimal for their access patterns.

---

## 3. Why S3/Iceberg Cannot Solve This

### S3 Per-Prefix Throttling Limits

S3 has a hard limit of **3,500 PUT/POST requests per second per partition prefix**. From the RFC:

> "We have encountered this problem with the BRepSeqGen and BRepDirectGen pipelines, which are suffering performance issues because we are hitting the 3.5k per-partition write limit."

### Partition Key Design is Limited

S3 partitions data based on the **object key prefix**. The AECGAIA team noted:

> "Since the entire prefix is taken into account as a partitioning key, it is also much more difficult to optimize this key for even distribution of data across partitions."

Unlike DynamoDB where you can hash partition keys for even distribution, S3's partitioning is based on lexicographic ordering of prefixes. This creates **hot partitions** when keys share common prefixes.

### No Native Indexing or Query Support

| Need | S3 Capability |
|------|---------------|
| Point query by key | ❌ Must know exact object path |
| Range queries | ❌ Must list + filter |
| Secondary indexes | ❌ None |
| Concurrent updates to same object | ❌ Last-write-wins, no locking |

### Iceberg on S3 Doesn't Fully Solve It

Even with Iceberg tables on S3, the underlying S3 limitations persist:
- **Metadata conflicts**: Concurrent writers updating Iceberg metadata cause commit failures
- **PyIceberg immaturity**: No automatic retries on stale metadata, single-threaded
- **Compaction overhead**: Many small files from concurrent writes degrade read performance

---

## 4. Database Solution Comparison

### Write Throughput Comparison

| Solution | Writes/Second | Time for 1B writes |
|----------|---------------|---------------------|
| **Firebase Firestore** | ~500/sec (indexed) | ~23 days |
| **Firebase Realtime DB** | ~10,000-50,000/sec | ~6-28 hours |
| **S3 per prefix** | 3,500/sec | ~3 days (single prefix) |
| **PostgreSQL (single)** | 1,000-10,000/sec | 1-12 days |
| **DynamoDB** | 1,000,000+/sec | **~17 minutes** |
| **Cassandra** | 500,000+/sec | ~33 minutes |
| **Redis** | 100,000+/sec | ~2.8 hours |

### Solution Fit Analysis

| Solution | Pros | Cons | Fit for AECGAIA |
|----------|------|------|-----------------|
| **DynamoDB** | AWS-native, auto-scaling, 1M+ writes/sec | Per-operation cost | ✅ Best fit |
| **Aurora Serverless (PostgreSQL)** | SQL support, familiar tooling | Lower write throughput | ✅ Good for relational needs |
| **Redis/ElastiCache** | Sub-ms latency, simple | Not persistent by default | ✅ Good for ephemeral lookups |
| **Cassandra (Amazon Keyspaces)** | High throughput, tunable | More operational overhead | ⚠️ Viable alternative |
| **Firebase** | Easy to use | GCP (not AWS), cost at scale | ❌ Wrong ecosystem |

---

## 5. Strategic Alignment

### Why this matters from a platform perspective:

1. **Self-Service is a Core AMP Value Proposition**
   - AMP's goal is to enable ML teams without requiring infrastructure expertise
   - Forcing teams through ADP processes for every table/index need contradicts self-service

2. **Competitive Parity with Modern ML Platforms**
   - AWS SageMaker offers RDS/DynamoDB integration
   - Databricks offers Delta Lake with better write performance
   - Most ML platforms provide database primitives

3. **Reduces Shadow IT Risk**
   - Without this, teams may create their own AWS accounts/databases outside AMP
   - This fragments governance and increases security exposure

4. **Supports Trusted AI Requirements**
   - The GAIA RFC shows they need databases for lineage/provenance tracking
   - This is directly tied to Trust team requirements

---

## 6. Product Recommendation

### Tier the Solution Based on Use Case

| Tier | Solution | Use Case | Governance Level |
|------|----------|----------|------------------|
| **Tier 1: Ephemeral/Temp** | Redis or Memcached | Fast lookup tables, caching during training | Low (auto-TTL) |
| **Tier 2: Persistent NoSQL** | DynamoDB (managed) | Key-value stores, experiment metadata | Medium |
| **Tier 3: Relational** | Aurora Serverless (PostgreSQL) | Structured metadata, app backends | High |

### Key Design Principles

1. **Tenant Isolation** - Per-project databases with IAM-based access control
2. **No Customer Data** - Clear policy that these are for operational data only (customer data stays in CDL)
3. **Self-Service Provisioning** - API/UI to request database instances within guardrails
4. **Cost Attribution** - FinOps integration to charge back to requesting teams
5. **Lifecycle Management** - Auto-expire unused resources

---

## 7. Recommended Next Actions

| Action | Owner | Timing |
|--------|-------|--------|
| Schedule sync with Ratti/Colt/Pete to clarify exact access patterns | Aniket Awchare | Immediate |
| Document Iceberg workarounds already applied for 3k concurrent writes | AECGAIA team | Before meeting |
| Evaluate DynamoDB as managed, tenant-isolated solution | AMP Platform | FY27 Q1 |
| Create RFC for "AMP Operational Data Stores" capability | AMP Architecture | FY27 Q1 |
| Update AMP Roadmap with database capabilities | Product/PM | FY27 planning |

---

## 8. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Scope creep (every team wants databases) | High | Medium | Clear policy: operational data only |
| Security exposure from user-managed DBs | Medium | High | Managed service only, no self-hosted |
| Cost overrun | Medium | Medium | Auto-scaling limits, cost alerts |
| Delay impacts GAIA Q4 commitments | High | High | Provide interim workaround guidance |

---

## 9. Key Stakeholders

- **Ratti Sonthi** - AECGAIA, original requester
- **Pete Meltzer** - Research Enablement team
- **Colt Chapin** - AECGAIA Data Team
- **Aniket Awchare** - AMP Intake reviewer
- **Wilson Lau, Tony Zhang, Hamidreza Mahyar** - AMP Platform

---

## 10. Reference Links

- **Jira Epic:** PSETWRKIN-2906
- **AMP Requests Page:** https://autodesk.atlassian.net/wiki/spaces/GAIA/pages/521022867/AMP+Requests
- **GAIA RFC on Row-Level Lineage:** https://autodesk.atlassian.net/wiki/spaces/GAIA/pages/521057525
- **AMP Architecture:** https://autodesk.atlassian.net/wiki/spaces/AMPS/pages/621782589/AMP+Architecture

---

*Last Updated: January 2026*
