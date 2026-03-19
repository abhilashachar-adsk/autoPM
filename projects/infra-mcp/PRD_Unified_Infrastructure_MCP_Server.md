# Unified Infrastructure MCP Server — PRD

**Confluence Page:** [Unified Infrastructure MCP Server — PRD](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/745544869/Unified+Infrastructure+MCP+Server+PRD)

**Other working titles:** "One MCP for Infra", "ADP Data Lake MCP", "Infrastructure AI Tooling Layer"

| **Target Releases** | FY27 Q2–Q3 |
|---------------------|------------|
| **Document Status** | Draft |
| **Document Owner** | Abhilash Achar |
| **Team** | AD Platform Infrastructure Triad |
| **Program** | Data Lake as a Product |
| **Parent Initiative** | [AD Data Lake - PRD](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333859875/AD+Data+Lake+-+PRD) |
| **JIRA Epic** | [ADPPICSERV-392](https://jira.autodesk.com/browse/ADPPICSERV-392) |

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Problem Statement](#problem-statement)
3. [Goals & Success Outcomes](#goals--success-outcomes)
4. [User Personas](#user-personas)
5. [MCP Tool Requirements](#mcp-tool-requirements)
6. [Architecture Overview](#architecture-overview)
7. [User Stories](#user-stories)
8. [Non-Functional Requirements](#non-functional-requirements)
9. [Dependencies](#dependencies)
10. [Milestones & Delivery Plan](#milestones--delivery-plan)
11. [RAID Log](#raid-log)
12. [Appendix](#appendix)

---

## Executive Summary

This PRD defines the product requirements for a **Unified MCP (Model Context Protocol) Server** for the AD Platform Infrastructure — a single, cohesive AI tooling layer that enables developers using AI-powered code generation tools (IDEs, CLI tools), Autodesk Assistant, and other MCP-compatible clients to interact with the full breadth of Data Lake services: querying data, inspecting table schemas, viewing resource configurations, accessing job logs, and monitoring observability metrics.

| Trigger | What This PRD Covers |
|---------|---------------------|
| **Fragmented MCP efforts** | Four independent workstreams building MCP tools in isolation; need consolidation into a single governed server |
| **Query Assistant parity for IDE users** | Query Assistant's Generate/Edit/Fix/Summarize SQL capabilities are locked to Autodesk Assistant; users of code generation tools and IDEs get nothing |
| **Existing backlog item** (ADPPICSERV-392) | Single MCP for all infra APIs — provisioning, observability, and query services |
| **Community demand** ([#adp-community](https://autodesk.slack.com/archives/C0GF2K7Q9/p1772512342817839)) | Multiple users requesting MCP-accessible schema discovery and query execution from IDE tools |
| **AI Native Day (GDC)** | Internal demo of infrastructure operations via natural language |

**Why one MCP?** Today, multiple teams are building fragmented MCP tools independently — Spark observability, Query Assistant, storage/policy management for Snowflake Migration, and GDC operations demos. Without consolidation, this leads to:

1. **Duplicate tool registrations** — multiple MCP servers exposing overlapping functionality
2. **Inconsistent schemas** — different tool naming conventions, parameter shapes, and response formats
3. **Discovery friction** — users cannot find or trust a single source for Data Lake AI tooling
4. **Maintenance burden** — each effort maintains its own auth, error handling, and deployment pipeline

This PRD ensures:

1. **One server, one registry entry** — a single MCP server discoverable on the [MCP Registry](https://data.autodesk.com/mcp-registry)
2. **Read-first, write-later** — prioritize surfacing existing Data Portal functionality; resource creation via batch workflows in later phases
3. **Tool catalog governed by one schema** — consistent naming (`adp_*`), parameter conventions, and response shapes
4. **Seamless auth** — single authentication flow leveraging Entra SSO (internal) and CIMD/ApigeeX (external)
5. **Query Assistant parity** — Generate, Edit, Fix, and Summarize SQL tools available to IDE users, not just Autodesk Assistant

**Accelerator — Beacon Universal MCP Server Template:**
Developer Enablement has released a **Universal MCP Server Template** in Beacon that provides a production-ready bootstrap for MCP servers aligned with CloudOS, identity, and governance standards. This template eliminates the platform friction that previously blocked M1 delivery:
- CloudOS-aligned runtime and deployment definitions (no config drift)
- Encoded auth decisions: **Internal Entra SSO** (self-service, no identity team dependency) for employee-only servers; **CIMD + ApigeeX proxy** for external/MCP host clients (VS Code, Claude Desktop, Cursor)
- Hardened baseline for runtime support, token handling, and proxy integration
- This PRD adopts the Beacon template as the foundation, compressing M1 from 4 weeks to ~2 weeks

**Strategic Context:**
- Autodesk's AI Native strategy requires infrastructure services to be accessible via MCP for developer productivity
- The existing Query Assistant serves Autodesk Assistant users but is unavailable to users of code generation tools and IDEs
- ADPPICSERV-392 has been in the AMER backlog but not yet prioritized for sprints — this PRD formalizes scope and priority
- The [Regionalized Data Lake PRD](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/724544519) delivers region-aware APIs that this MCP server will consume
- The **Universal MCP Server Template** in Beacon provides the production bootstrap — runtime, identity, proxy, and CloudOS deployment — eliminating weeks of infrastructure setup

---

## Problem Statement

### Current State Challenges

| Challenge | Impact | Evidence |
|-----------|--------|----------|
| **No unified MCP server** | Developers using code generation tools must manually explain table structures every session | [Community requests in #adp-community](https://autodesk.slack.com/archives/C0GF2K7Q9/p1772512342817839) |
| **Four fragmented MCP efforts** | Duplicate work, inconsistent interfaces, no single entry point | Spark Observability, Query Assistant, Snowflake Migration tools, GDC AI Native Day — all building independently |
| **Query Assistant locked to AA** | Only Autodesk Assistant users benefit from AI-assisted querying; users of code generation tools and IDEs get nothing | Query Assistant is an AA-native feature, not an MCP server |
| **No schema discovery via AI tools** | Users re-explain table structures, column types, and relationships in every new AI conversation | No Glue Catalog or Hive Metastore MCP tool exists |
| **No job log access via AI tools** | Debugging Spark failures requires manual navigation through EMR/Airflow UIs | No MCP tool to retrieve or summarize job logs |
| **No resource visibility via AI tools** | Users cannot ask "what resources does my project have?" from their IDE | No MCP tool to list storage, compute, or orchestration resources |
| **Backlog item unprioritized** | ADPPICSERV-392 exists but has not been scheduled for any sprint | Epic created but never ranked |

### What Users Are Asking For

From [community channel discussions](https://autodesk.slack.com/archives/C0GF2K7Q9/p1772512342817839), developers are requesting MCP-accessible schema discovery, table search, and query execution directly from their code generation tools. The recurring theme: IDE-based developers have no programmatic access to the schema discovery, query generation, and error correction capabilities that the Query Assistant already provides inside ADP Studio. The MCP server bridges that gap.

---

## Goals & Success Outcomes

### Primary Objective

Deliver a **single, unified MCP server** for the AD Platform Infrastructure that enables developers to discover schemas, query data, inspect resources, access job logs, and view observability metrics — from any MCP-compatible AI client — through a governed set of tools with consistent naming, authentication, and response formats.

### Success Metrics

| Metric | Baseline (Current) | Q2 FY27 Target | Q3 FY27 Target | Measurement |
|--------|--------------------|-----------------|-----------------| ------------|
| **MCP server registered** | 0 unified servers | 1 server on MCP Registry | 1 server (production) | MCP Registry |
| **Tools available** | 0 (fragmented) | 12–15 read-only tools (incl. Query Assistant parity) | 15+ tools (read + limited write) | Tool catalog |
| **Weekly active tool invocations** | 0 | 100+ | 500+ | MCP server telemetry |
| **Unique MCP users (weekly)** | 0 | 20+ | 50+ | Auth token analysis |
| **Schema discovery without manual input** | 0% | >80% of sessions | >95% of sessions | User survey / telemetry |
| **Mean time to debug Spark failure** | 30+ min (manual log navigation) | <10 min (via MCP tool) | <5 min | User interviews |
| **Fragmented MCP efforts consolidated** | 4 independent efforts | 1 unified server | 1 server with plugin architecture | Code audit |

### Alignment with Strategic Initiatives

| Initiative | Contribution |
|-----------|-------------|
| **AI Native** | Infrastructure accessible via natural language for all developer tools |
| **Self Service Fulfillment** | Schema and resource information available without tickets or manual exploration |
| **Developer Experience** | Code generation tool and IDE users get first-class Data Lake AI assistance |
| **Platform as Product** | Infrastructure APIs exposed as a governed, discoverable MCP tool catalog |

---

## User Personas

### Primary Personas

| Persona | Description | MCP Needs |
|---------|-------------|-----------|
| **Data Engineer (IDE / CLI)** | Writes Trino SQL, Spark jobs, and pipeline code in AI-powered code generation tools | Search tables, get schemas, execute test queries, inspect job logs |
| **Data Analyst** | Explores data for insights; uses SQL and BI tools | Discover relevant tables, understand column descriptions, run exploratory queries |
| **Platform User (Data Portal)** | Manages data resources through the Data Portal; may also use AA | View project resources, check utilization, get recommendations from AA |

### Secondary Personas

| Persona | Description | MCP Needs |
|---------|-------------|-----------|
| **ML Engineer (AMP)** | Builds ML pipelines that consume Data Lake tables | Discover training data tables, check freshness, run validation queries |
| **Platform Administrator** | Manages platform-wide infrastructure | List all resources across projects, check compliance, review audit logs |
| **AA Domain Agent Developer** | Builds Autodesk Assistant integrations | Consume MCP tools as AA MCP Server for domain-specific orchestration |

---

## MCP Tool Requirements

### Design Principles

| Principle | Description |
|-----------|-------------|
| **Read-first** | Prioritize read-only tools (schema discovery, resource listing, log access); resource creation follows in later phases |
| **Consistent naming** | All tools prefixed with `adp_` (e.g., `adp_search_tables`, `adp_get_schema`) |
| **Predictable parameters** | Common parameters (`project_id`, `region`, `environment`) use consistent types across all tools |
| **Structured responses** | All tools return structured JSON with `status`, `data`, and optional `metadata` fields |
| **Fail-safe** | Tools never mutate state unless explicitly in the "write" category; write tools require confirmation parameter |
| **Scoped access** | Tools respect existing RBAC — users can only access resources they have permissions for |

### Phase 1: Schema Discovery, Query & Query Assistant Parity (Priority — Read-Only)

#### MCP-01: Table Search

**Tool Name:** `adp_search_tables`

**As a** Data Engineer using an AI-powered IDE  
**I want** to search for tables by name, keyword, or domain  
**So that** I can find relevant tables without leaving my code generation tool or manually browsing the Glue Catalog.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | Search term (table name, keyword, or pattern) |
| `database` | string | No | Filter to specific Glue database |
| `project_id` | string | No | Filter to specific project's tables |
| `limit` | integer | No | Max results (default: 20) |

| Response Field | Description |
|----------------|-------------|
| `tables` | Array of matching tables with name, database, description, column count, last updated |
| `total_count` | Total matches |

---

#### MCP-02: Table Schema

**Tool Name:** `adp_get_table_schema`

**As a** Data Engineer  
**I want** to get the full schema (columns, types, descriptions, partitions) for a specific table  
**So that** I can write accurate SQL without re-explaining table structure to my AI assistant.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `database` | string | Yes | Glue database name |
| `table` | string | Yes | Table name |
| `include_statistics` | boolean | No | Include row count, size, partition stats |

| Response Field | Description |
|----------------|-------------|
| `columns` | Array of column name, type, description, nullable, partition_key |
| `table_properties` | Location, format, compression, last modified, row count |
| `partitions` | Partition keys and recent partition values |

---

#### MCP-03: Execute Query

**Tool Name:** `adp_execute_query`

**As a** Data Engineer  
**I want** to execute a Trino SQL query from my IDE  
**So that** I can validate query results without switching to ADP Studio.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sql` | string | Yes | Trino SQL query to execute |
| `engine` | string | No | Query engine (default: `trino-data-lake`) |
| `limit` | integer | No | Row limit (default: 100, max: 1000) |
| `timeout_seconds` | integer | No | Query timeout (default: 60, max: 300) |

| Response Field | Description |
|----------------|-------------|
| `columns` | Column names and types |
| `rows` | Query result rows |
| `row_count` | Number of rows returned |
| `execution_time_ms` | Query execution time |
| `query_id` | Query ID for reference |
| `truncated` | Whether results were truncated |

**Safety Controls:**
- Read-only by default: only SELECT statements allowed in Phase 1
- Result set capped at `limit` rows to prevent memory issues
- Query timeout enforced server-side
- All queries logged with user identity and timestamp

---

#### MCP-04: Database List

**Tool Name:** `adp_list_databases`

**As a** Data Analyst  
**I want** to list all databases I have access to  
**So that** I can discover what data domains are available.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `project_id` | string | No | Filter to project's databases |
| `region` | string | No | Filter by region (e.g., `us-east-1`, `eu-west-1`) |

| Response Field | Description |
|----------------|-------------|
| `databases` | Array of database name, table count, region, project, description |

---

#### MCP-12: Generate SQL

**Tool Name:** `adp_generate_sql`

**As a** Data Analyst or Engineer  
**I want** to describe what data I need in plain English and receive a SQL query  
**So that** I can query Data Lake or Snowflake without memorizing table structures or SQL syntax.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `prompt` | string | Yes | Natural language description of the desired query |
| `engine` | string | No | Query engine / SQL dialect: `trino` (default), `snowflake` |
| `tables` | string[] | No | Hint specific table names to constrain generation |
| `project_id` | string | No | Scope table discovery to a project |

| Response Field | Description |
|----------------|-------------|
| `sql` | Generated SQL query |
| `dialect` | SQL dialect used (`trino` or `snowflake`) |
| `tables_used` | Tables referenced in the generated query |
| `explanation` | Plain-language summary of what the query does |

**Implementation Notes:**
- Reuses the same semantic search and metadata enrichment pipeline as the ADP Studio Query Assistant
- Table discovery uses vector search over Glue Data Catalog / Snowflake metadata
- Response includes `explanation` so the user can verify intent before executing
- Pairs naturally with MCP-03 (`adp_execute_query`) for a generate-then-run workflow

---

#### MCP-13: Edit SQL

**Tool Name:** `adp_edit_sql`

**As a** Data Analyst or Engineer  
**I want** to modify an existing SQL query using natural language instructions  
**So that** I can iteratively refine queries without rewriting them manually.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sql` | string | Yes | The existing SQL query to modify |
| `instruction` | string | Yes | Natural language edit instruction (e.g., "add a WHERE clause for last 7 days") |
| `engine` | string | No | SQL dialect: `trino` (default), `snowflake` |

| Response Field | Description |
|----------------|-------------|
| `sql` | Modified SQL query |
| `dialect` | SQL dialect used |
| `changes_made` | Summary of modifications applied |
| `explanation` | Plain-language summary of the updated query |

---

#### MCP-14: Fix SQL

**Tool Name:** `adp_fix_sql`

**As a** Data Analyst or Engineer  
**I want** to submit a failed SQL query and its error message and receive a corrected version  
**So that** I can resolve query errors without manually debugging SQL syntax or schema mismatches.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sql` | string | Yes | The failed SQL query |
| `error_message` | string | Yes | Error output from the query engine |
| `engine` | string | No | SQL dialect: `trino` (default), `snowflake` |

| Response Field | Description |
|----------------|-------------|
| `sql` | Corrected SQL query |
| `dialect` | SQL dialect used |
| `diagnosis` | What was wrong with the original query |
| `fix_applied` | Description of the correction |

**Common Fix Categories:**
- Column not found / ambiguous references → matched to correct column from metadata
- Syntax errors → corrected missing commas, wrong dialect keywords
- Type mismatches → adjusted type casting in JOIN/WHERE clauses
- Dialect differences → fixed Trino vs Snowflake syntax (e.g., `DATE_DIFF` vs `DATEDIFF`)
- Missing qualifiers → added schema/catalog qualifiers

---

#### MCP-15: Summarize SQL

**Tool Name:** `adp_summarize_sql`

**As a** Data Analyst or Engineer  
**I want** to get a plain-language explanation of a SQL query  
**So that** I can understand, document, or review queries written by others.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sql` | string | Yes | SQL query to summarize |
| `engine` | string | No | SQL dialect hint: `trino` (default), `snowflake` |

| Response Field | Description |
|----------------|-------------|
| `summary` | Plain-language explanation of the query |
| `data_sources` | Tables and joins identified |
| `filters` | WHERE conditions described |
| `aggregations` | GROUP BY, window functions, etc. |
| `output_description` | What the final result set contains |

---

### Phase 2: Resource Visibility & Job Logs

#### MCP-05: List Project Resources

**Tool Name:** `adp_list_resources`

**As a** Platform User  
**I want** to list all infrastructure resources (storage, compute, orchestration) for my project  
**So that** I can understand my project's footprint without navigating the Data Portal.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `project_id` | string | Yes | Project identifier |
| `resource_type` | string | No | Filter: `storage`, `compute`, `orchestration`, or `all` (default) |
| `region` | string | No | Filter by region |

| Response Field | Description |
|----------------|-------------|
| `storage` | Array of storage domains with name, region, size, status, retention |
| `compute` | Array of compute clusters with name, region, size, status, utilization |
| `orchestration` | Array of Airflow environments with name, region, status, DAG count |
| `summary` | Total counts and cost per resource type |

---

#### MCP-06: Get Spark Job Logs

**Tool Name:** `adp_get_job_logs`

**As a** Data Engineer debugging a failed Spark job  
**I want** to retrieve job logs and error details from my IDE  
**So that** I can diagnose failures without navigating EMR or Airflow UIs.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `job_id` | string | Yes | Spark job ID or application ID |
| `project_id` | string | No | Project context |
| `log_type` | string | No | `driver`, `executor`, `stderr`, `stdout` (default: `driver`) |
| `tail_lines` | integer | No | Number of lines from end (default: 200) |

| Response Field | Description |
|----------------|-------------|
| `log_content` | Log text |
| `job_status` | Job status (RUNNING, SUCCEEDED, FAILED) |
| `error_summary` | Extracted error message and stack trace (if FAILED) |
| `duration_seconds` | Job runtime |
| `cluster_id` | Cluster that ran the job |

---

#### MCP-07: Get Spark Config Recommendations

**Tool Name:** `adp_get_spark_recommendations`

**As a** Data Engineer  
**I want** recommendations for Spark configuration based on my job's historical performance  
**So that** I can optimize cost and execution time.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `project_id` | string | Yes | Project identifier |
| `job_name` | string | No | Filter to specific job |

| Response Field | Description |
|----------------|-------------|
| `recommendations` | Array of config key, current value, recommended value, rationale, estimated savings |
| `usage_summary` | Current resource consumption: vCPU hours, memory hours, cost/month |

---

#### MCP-08: Get Resource Utilization

**Tool Name:** `adp_get_utilization`

**As a** Data Owner  
**I want** to see utilization metrics for my project's resources  
**So that** I can identify waste and optimize spend from my IDE.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `project_id` | string | Yes | Project identifier |
| `resource_type` | string | No | `storage`, `compute`, or `all` (default) |
| `period_days` | integer | No | Lookback period (default: 30) |

| Response Field | Description |
|----------------|-------------|
| `storage_utilization` | Total size, growth rate, stale percentage, monthly cost |
| `compute_utilization` | Avg CPU, avg memory, idle hours, monthly cost |
| `cost_summary` | Total cost, cost by region, cost by resource type |
| `recommendations` | Optimization suggestions with estimated savings |

---

### Phase 3: Write Operations & Advanced

#### MCP-09: Manage Fivetran Whitelisting

**Tool Name:** `adp_manage_fivetran_whitelist`

**As a** Platform User onboarding a new data source  
**I want** to whitelist Fivetran IPs for my project's storage  
**So that** ingestion pipelines can connect without a support ticket.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `project_id` | string | Yes | Project identifier |
| `action` | string | Yes | `list`, `add`, `remove` |
| `ip_addresses` | array | Conditional | Required for `add`/`remove` |
| `confirm` | boolean | Yes (for write) | Must be `true` for `add`/`remove` |

---

#### MCP-10: Manage Access Policies

**Tool Name:** `adp_manage_access_policy`

**As a** Data Owner  
**I want** to view and modify access policies for my storage domains  
**So that** I can grant team access without filing tickets.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `domain` | string | Yes | Storage domain name |
| `action` | string | Yes | `get`, `add_principal`, `remove_principal` |
| `principal` | string | Conditional | IAM role or user ARN for add/remove |
| `access_level` | string | Conditional | `read`, `write`, `admin` |
| `confirm` | boolean | Yes (for write) | Must be `true` for mutations |

---

#### MCP-11: List Compute Clusters

**Tool Name:** `adp_list_compute`

**As a** Platform User  
**I want** to list all compute clusters for my project  
**So that** I can understand available compute capacity.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `project_id` | string | Yes | Project identifier |
| `status` | string | No | Filter: `running`, `stopped`, `all` (default) |
| `region` | string | No | Filter by region |

| Response Field | Description |
|----------------|-------------|
| `clusters` | Array of cluster ID, name, size, status, region, instance type, utilization |

---

## Architecture Overview

### MCP Server Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    MCP-Compatible AI Clients                        │
│  ┌──────────┐  ┌──────────────┐  ┌────────────┐  ┌──────────────┐  │
│  │ AI IDEs   │  │  AI CLI Tools  │  │  Autodesk  │  │  Other MCP   │  │
│  │(Cursor etc)│  │(Claude Code)  │  │  Assistant │  │  Clients     │  │
│  └────┬─────┘  └──────┬───────┘  └─────┬──────┘  └──────┬───────┘  │
└───────┼────────────────┼────────────────┼────────────────┼──────────┘
        │                │                │                │
        └────────────────┴───────┬────────┴────────────────┘
                                 │ MCP Protocol (stdio / SSE)
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│              Unified Infrastructure MCP Server                       │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                    Tool Registry (15 tools)                    │    │
│  │  adp_search_tables  │  adp_get_table_schema  │  adp_execute_ │    │
│  │  adp_list_databases │  adp_generate_sql      │  query         │    │
│  │  adp_edit_sql       │  adp_fix_sql           │  adp_summarize │    │
│  │  adp_list_resources │  adp_get_job_logs      │  _sql          │    │
│  │  adp_get_spark_recs │  adp_get_util          │  adp_list_comp │    │
│  │  adp_manage_fivetran│  adp_manage_access     │                │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐     │
│  │  Auth Layer   │  │  Rate Limiter │  │  Audit Logger         │     │
│  │  (Entra SSO / │  │  (per-user,   │  │  (all tool calls      │     │
│  │  CIMD+ApigeeX)│  │   per-tool)   │  │   with identity)      │     │
│  └──────────────┘  └──────────────┘  └───────────────────────┘     │
└─────────────────────────────────────────────────────────────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                   │
              ▼                  ▼                   ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  Query Layer      │ │  Resource Layer   │ │  Observability   │
│                   │ │                   │ │  Layer           │
│ ┌──────────────┐ │ │ ┌──────────────┐ │ │ ┌──────────────┐ │
│ │ Glue Catalog │ │ │ │ Infra API v2 │ │ │ │ Spark History │ │
│ │ (Schema)     │ │ │ │ (Resources)  │ │ │ │ Server       │ │
│ ├──────────────┤ │ │ ├──────────────┤ │ │ ├──────────────┤ │
│ │ Trino/Presto │ │ │ │ Spindle      │ │ │ │ CNS Alerts   │ │
│ │ (Query Exec) │ │ │ │ (Projects)   │ │ │ │              │ │
│ ├──────────────┤ │ │ ├──────────────┤ │ │ ├──────────────┤ │
│ │ Metadata Mgr │ │ │ │ EMR/EKS API  │ │ │ │ Cost Attrib. │ │
│ │ (MDM)        │ │ │ │ (Compute)    │ │ │ │ Service      │ │
│ └──────────────┘ │ │ └──────────────┘ │ │ └──────────────┘ │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

### Beacon Universal MCP Server Template

This server will be scaffolded using the **Universal MCP Server Template** in Beacon, which provides a production-ready foundation aligned with CloudOS, identity, and governance standards. The template eliminates the common pitfalls that have plagued earlier MCP server efforts at Autodesk:

| Previous Pain Point | How the Template Resolves It |
|---------------------|------------------------------|
| Template-to-CloudOS config mismatches | Runtime selections directly aligned with CloudOS deployment definitions |
| Auth ambiguity (which flow? which registration?) | Auth is a guided, opinionated choice — correct wiring generated automatically |
| Brittle deployment definitions | Deployment definitions are CloudOS-native from the start |
| Extra back-and-forth with identity and platform teams | Internal Entra SSO is self-service; no multi-day identity team dependency |

### Deployment Model

| Aspect | Decision |
|--------|----------|
| **Bootstrap** | Beacon Universal MCP Server Template (production-ready scaffold) |
| **Runtime** | Node.js (TypeScript) — selected via Beacon template, CloudOS-aligned |
| **Deployment** | CloudOS (containerized) — deployment definitions generated by template |
| **Protocol** | MCP over stdio for local clients; SSE for remote/AA integration |
| **Discovery** | Registered on Autodesk MCP Registry with product context: "AD Platform Infrastructure" |
| **Config** | Users add MCP server to `.cursor/mcp.json` or equivalent client config |
| **Environments** | dev → stg → prd (aligned with Data Portal environments) |
| **CI/CD** | CloudBees pipeline aligned with CloudOS deployment |

### Authentication Model

The template encodes two auth paths based on target audience. We will use **both**, phased:

**Phase 1 (M1): Internal Entra SSO — Employee-Only Access**

| Aspect | Detail |
|--------|--------|
| **Target audience** | Autodesk employees using AI-powered code generation tools (IDEs, CLI) or AA |
| **Auth flow** | Self-service Entra App Registration → Internal Entra SSO |
| **Benefit** | No dependency on manual identity team setup; unblocks immediately |
| **Token propagation** | Entra JWT passed via MCP client `env` config or token file |
| **Compliance** | Meets Trust requirements for internal-only servers |

**Phase 3 (M8+): CIMD + ApigeeX Proxy — External MCP Host Clients**

| Aspect | Detail |
|--------|--------|
| **Target audience** | External developers, MCP host applications (VS Code, Claude Desktop) |
| **Auth flow** | CIMD-based auth via ApigeeX MCP proxy |
| **Benefit** | Standards-based OAuth; no pre-registration of APIM clients in Dev Portal |
| **When needed** | Only required if we expose the MCP server beyond Autodesk network |

### API Integration Map

| MCP Tool | Backend Service | Endpoint |
|----------|----------------|----------|
| `adp_search_tables` | AWS Glue Data Catalog | `glue:SearchTables` / `glue:GetTables` |
| `adp_get_table_schema` | AWS Glue Data Catalog | `glue:GetTable` |
| `adp_execute_query` | Trino REST API (via internal proxy) | `POST /v1/statement` |
| `adp_list_databases` | AWS Glue Data Catalog | `glue:GetDatabases` |
| `adp_list_resources` | Infra API v2 | `GET /v2/resources/{projectId}` |
| `adp_get_job_logs` | Spark History Server / EMR API | `GET /api/v1/applications/{appId}/logs` |
| `adp_get_spark_recommendations` | Spark Observability Service | `GET /v1/recommendations/{projectId}` |
| `adp_get_utilization` | Cost Attribution Service + CloudWatch | `GET /v2/observability/{projectId}` |
| `adp_manage_fivetran_whitelist` | Infra API v2 | `POST /v2/fivetran/whitelist` |
| `adp_manage_access_policy` | Infra API v2 / Lake Formation | `GET/POST /v2/access-policies` |
| `adp_list_compute` | Infra API v2 | `GET /v2/compute/clusters/{projectId}` |
| `adp_generate_sql` | Query Assistant Backend (Metadata Search + LLM) | Semantic table search → LLM SQL generation |
| `adp_edit_sql` | Query Assistant Backend (LLM) | LLM SQL rewriting with schema context |
| `adp_fix_sql` | Query Assistant Backend (Metadata + LLM) | Error analysis + LLM SQL correction |
| `adp_summarize_sql` | Query Assistant Backend (LLM) | LLM SQL-to-natural-language explanation |

---

## User Stories

### Schema Discovery Stories

---

**US-SD-01: Search for Tables from IDE**

**As a** Data Engineer using an AI-powered IDE  
**I want** to search for Data Lake tables by keyword from my code generation tool  
**So that** I can find relevant data sources without manually browsing the Glue Catalog or Data Portal.

| Acceptance Criteria |
|---------------------|
| `adp_search_tables` returns matching tables with name, database, description |
| Results respect user's access permissions (only tables user can query) |
| Search supports partial matches and wildcards |
| Response includes table metadata (last updated, row count estimate) |
| Works from any MCP-compatible code generation tool (IDE or CLI) |

---

**US-SD-02: Get Table Schema for SQL Writing**

**As a** Data Engineer  
**I want** to get the full column schema for a table  
**So that** my AI assistant can write accurate SQL without me re-explaining structure.

| Acceptance Criteria |
|---------------------|
| `adp_get_table_schema` returns all columns with types and descriptions |
| Partition keys clearly identified |
| Table statistics (row count, size) included when available |
| Response format suitable for AI context injection |

---

**US-SD-03: Discover Available Databases**

**As a** Data Analyst new to the platform  
**I want** to list all databases I have access to  
**So that** I can understand what data domains are available before writing queries.

| Acceptance Criteria |
|---------------------|
| `adp_list_databases` returns all accessible databases |
| Regional context included per database (US, EMEA) |
| Project association shown per database |
| Table count per database included |

---

### Query Execution Stories

---

**US-QE-01: Execute Test Query from IDE**

**As a** Data Engineer  
**I want** to execute a Trino SQL query and see results directly in my IDE  
**So that** I can validate queries without switching to ADP Studio.

| Acceptance Criteria |
|---------------------|
| `adp_execute_query` runs SELECT queries against Trino |
| Results returned as structured data (columns + rows) |
| Execution time and query ID included in response |
| Only SELECT queries permitted in Phase 1 (DDL/DML blocked) |
| Row limit enforced (default 100, max 1000) |
| Timeout enforced server-side (default 60s, max 300s) |
| Query logged with user identity for audit |

---

### Query Assistant Parity Stories

---

**US-QA-01: Generate SQL from Natural Language**

**As a** Data Engineer or Analyst using an AI-powered IDE  
**I want** to describe the data I need in plain English and get a SQL query back  
**So that** I can query Data Lake or Snowflake without memorizing table structures or SQL syntax.

| Acceptance Criteria |
|---------------------|
| `adp_generate_sql` converts a natural language prompt to a valid SQL query |
| Generated SQL uses the correct dialect (Trino or Snowflake) based on `engine` |
| Table discovery works via semantic search over metadata — no need to specify exact names |
| Response includes `explanation` for the user to verify intent before execution |
| Works from any MCP-compatible code generation tool (same capabilities as ADP Studio Query Assistant) |

---

**US-QA-02: Edit SQL via Natural Language**

**As a** Data Engineer  
**I want** to give an edit instruction like "add a WHERE clause for last 7 days" and get the modified SQL back  
**So that** I can iteratively refine queries without rewriting them manually.

| Acceptance Criteria |
|---------------------|
| `adp_edit_sql` takes an existing SQL query + a natural language instruction and returns modified SQL |
| The edit respects the current dialect |
| Response includes `changes_made` summary |
| Non-destructive: original query preserved until user accepts the edit |

---

**US-QA-03: Fix Failed SQL Automatically**

**As a** Data Analyst  
**I want** to submit a failed query and its error message and get a corrected version  
**So that** I can recover from errors without manually diagnosing syntax or schema mismatches.

| Acceptance Criteria |
|---------------------|
| `adp_fix_sql` accepts a SQL query + error message and returns corrected SQL |
| Handles common error categories: column not found, syntax errors, type mismatches, dialect differences, missing qualifiers |
| Response includes `diagnosis` (what went wrong) and `fix_applied` (what was changed) |
| Pairs with MCP-03: user can execute → fail → fix → re-execute in a single workflow |

---

**US-QA-04: Summarize SQL in Plain English**

**As a** Data Analyst reviewing a colleague's query  
**I want** a plain-language explanation of what a SQL query does  
**So that** I can understand, document, or review queries without tracing complex SQL manually.

| Acceptance Criteria |
|---------------------|
| `adp_summarize_sql` returns a structured summary: data sources, filters, aggregations, output |
| Works for both Trino and Snowflake SQL |
| Useful for documentation and code review workflows |

---

### Resource & Observability Stories

---

**US-RO-01: View Project Resources from IDE**

**As a** Platform User  
**I want** to ask "what resources does my project have?" from my IDE  
**So that** I can get an infrastructure overview without opening the Data Portal.

| Acceptance Criteria |
|---------------------|
| `adp_list_resources` returns storage, compute, and orchestration resources |
| Each resource includes region, status, and summary metrics |
| Cost summary included per resource type |
| Response filterable by resource type and region |

---

**US-RO-02: Debug Spark Job Failure from IDE**

**As a** Data Engineer  
**I want** to retrieve Spark job logs and error details from my IDE  
**So that** I can diagnose failures in <10 minutes without navigating multiple UIs.

| Acceptance Criteria |
|---------------------|
| `adp_get_job_logs` returns log content for driver or executor |
| Error summary auto-extracted for failed jobs |
| Job status and duration included |
| Works for both running and completed jobs |

---

**US-RO-03: Get Spark Optimization Recommendations**

**As a** Data Engineer  
**I want** recommendations for Spark configuration tuning  
**So that** I can reduce cost and improve job performance.

| Acceptance Criteria |
|---------------------|
| `adp_get_spark_recommendations` returns config recommendations with rationale |
| Estimated cost savings shown per recommendation |
| Historical usage summary included |
| Recommendations actionable (specific config key + value) |

---

**US-RO-04: Check Resource Utilization**

**As a** Data Owner  
**I want** to check my project's resource utilization from my IDE  
**So that** I can identify unused or underutilized resources.

| Acceptance Criteria |
|---------------------|
| `adp_get_utilization` returns storage and compute utilization metrics |
| Stale storage percentage and idle compute hours highlighted |
| Cost summary with regional breakdown |
| Optimization recommendations included |

---

## Non-Functional Requirements

| ID | Requirement | Category | Target |
|----|-------------|----------|--------|
| NFR-01 | MCP tool response time SHALL be <5 seconds for metadata tools (search, schema, list) | Performance | <5s P95 |
| NFR-02 | Query execution tool SHALL respect timeout parameter (max 300s) | Performance | Configurable |
| NFR-03 | MCP server SHALL authenticate via Internal Entra SSO (Phase 1) and CIMD/ApigeeX proxy (Phase 3), using Beacon template auth wiring | Security | Zero plaintext credentials |
| NFR-04 | All tool invocations SHALL be logged with user identity, tool name, parameters, and response time | Compliance | 100% audit |
| NFR-05 | Write tools SHALL require explicit `confirm: true` parameter | Safety | No accidental mutations |
| NFR-06 | Query tool SHALL reject DDL/DML statements in Phase 1 | Safety | SELECT-only |
| NFR-07 | MCP server SHALL respect existing RBAC (users see only what they have access to) | Security | Zero privilege escalation |
| NFR-08 | MCP server SHALL support >50 concurrent connections | Scalability | 50+ connections |
| NFR-09 | MCP server SHALL be available 99.5% uptime | Reliability | 99.5% SLA |
| NFR-10 | All tool names SHALL use `adp_` prefix with snake_case naming | Consistency | 100% compliance |
| NFR-11 | Rate limiting SHALL be enforced per user per tool (max 60 requests/min for queries) | Safety | Abuse prevention |
| NFR-12 | MCP server SHALL be deployable per region (US and EMEA) | Regionalization | Multi-region |

---

## Dependencies

| Dependency | Owner / Team | Contribution | Status | Risk |
|------------|--------------|-------------|--------|------|
| **Beacon Universal MCP Server Template** | Developer Enablement | Production-ready scaffold: CloudOS runtime, Entra SSO / CIMD auth, deployment definitions | Available | Low — template exists; we select runtime + auth options |
| **Glue Data Catalog API** | AWS (existing) | Table and schema metadata | Available | Low |
| **Trino REST API (internal proxy)** | Platform Infra (APAC) | Query execution endpoint | Available (ADP Studio uses it) | Medium — needs IP whitelisting for MCP server pods |
| **Infrastructure API v2** | Platform Infra (APAC) | Region-aware resource listing | In Progress (ADPPICSERV-553) | Medium |
| **Spindle (Project Service)** | AnD Team | Project metadata, auth tokens | Available | Low |
| **Spark History Server** | Platform Infra (AMER) | Job logs and application history | Available | Low |
| **Spark Observability Service** | Platform Infra (AMER) | Config recommendations and usage data | In Progress | Medium |
| **Cost Attribution Service** | FinOps | Regional cost breakdown | Requires alignment | Medium |
| **CNS Integration** | CNS Team | Alert API for project resources | Requires alignment | Medium |
| **MCP Registry** | Intelligence Team | MCP server registration | Available (data.autodesk.com/mcp-registry) | Low |
| **DataOS (EKS)** | Platform Infra (AMER) | Deployment target for MCP server containers | In Progress (ADPINFRA-1264) | Medium |
| **Query Assistant Backend** | Platform Infra (APAC/Sankalp) | Semantic table search, LLM SQL generation/edit/fix/summarize pipeline | Available (deployed in ADP Studio) | Low — existing service; MCP tools wrap the same APIs |
| **Metadata Search Index** | Platform Infra (APAC) | Vector index over Glue/Snowflake metadata for semantic table discovery | Available (powers Query Assistant) | Low — shared dependency with Query Assistant |

---

## Milestones & Delivery Plan

### Q2 FY27: Foundation & Read-Only Tools

| Milestone | Capabilities | Target | Tools |
|-----------|-------------|--------|-------|
| **M1: MCP Server Scaffold** | Beacon template instantiation, CloudOS deployment, Internal Entra SSO, audit logging, MCP Registry registration, dev deployment | End of Week 2 | Infrastructure only (accelerated by Beacon template) |
| **M2: Schema Discovery** | Table search, schema retrieval, database listing | End of Month 2 | `adp_search_tables`, `adp_get_table_schema`, `adp_list_databases` |
| **M3: Query Execution & Query Assistant Tools** | Read-only Trino query execution + Generate/Edit/Fix/Summarize SQL (Query Assistant parity) | End of Month 2 | `adp_execute_query`, `adp_generate_sql`, `adp_edit_sql`, `adp_fix_sql`, `adp_summarize_sql` |
| **M4: Resource Visibility** | Project resource listing, compute cluster listing | End of Month 3 | `adp_list_resources`, `adp_list_compute` |

### Q2–Q3 FY27: Observability & Write Tools

| Milestone | Capabilities | Target | Tools |
|-----------|-------------|--------|-------|
| **M5: Job Logs & Spark Observability** | Spark job log retrieval, config recommendations | Month 4 | `adp_get_job_logs`, `adp_get_spark_recommendations` |
| **M6: Utilization & Cost** | Resource utilization metrics, cost breakdown | Month 5 | `adp_get_utilization` |
| **M7: Write Operations** | Fivetran whitelisting, access policy management | Month 6 | `adp_manage_fivetran_whitelist`, `adp_manage_access_policy` |

### Q3 FY27: Scale & Ecosystem

| Milestone | Capabilities | Target |
|-----------|-------------|--------|
| **M8: AA Integration** | MCP server consumable by Autodesk Assistant as domain agent backend | Month 7-9 |
| **M9: Plugin Architecture** | Extensible tool registry for teams to contribute new tools | Month 7-9 |
| **M10: EMEA Deployment** | MCP server deployed in eu-west-1 for EMEA users | Month 7-9 |

---

## RAID Log

### Risks

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|------------|--------|------------|
| R1 | Trino REST API not accessible from MCP server pods (IP whitelisting) | Medium | High | Coordinate with APAC infra team early; add MCP server pod CIDR to allowlist |
| R2 | Fragmented efforts continue independently after PRD | Medium | Medium | Stakeholder alignment meeting within 1 week; shared roadmap and code repo |
| R3 | Auth flow doesn't work seamlessly for IDE/CLI clients | Low | High | **Mitigated by Beacon template:** Internal Entra SSO for Phase 1 (self-service, no identity team dependency); CIMD + ApigeeX proxy for external MCP hosts in Phase 3. Auth wiring generated by template. |
| R4 | Query execution becomes abuse vector (expensive queries) | Low | High | Rate limiting, query timeout, row limit, cost attribution per user |
| R5 | Scope creep from write operations in Phase 1 | Medium | Medium | Strict Phase 1 = read-only; write tools gated behind `confirm` parameter and Phase 3 |
| R6 | Spark Observability service not ready in time | Medium | Medium | M5 can ship with basic log retrieval; advanced recommendations follow when service is ready |

### Assumptions

| ID | Assumption | Validation |
|----|------------|------------|
| A1 | Glue Data Catalog accessible from DataOS pods via IAM role | Confirm with AMER infra team |
| A2 | Trino REST API can be proxied for MCP server access | Confirm with APAC infra team (existing ADP Studio pattern) |
| A3 | Internal Entra SSO (via Beacon template) works for authenticating MCP tool calls from IDE/CLI clients | **Resolved:** Beacon template generates Entra SSO wiring; self-service registration |
| A4 | MCP Registry accepts external (non-AA) MCP servers | Confirm with Intelligence Team |
| A5 | MCP-compatible code generation tools support Entra SSO token flow (via env var or token file) | Validate during M1 template instantiation |
| A6 | Existing Infra API v2 endpoints return region-aware responses by Q2 | Dependent on Regionalization PRD delivery |

### Issues

| ID | Issue | Status | Owner |
|----|-------|--------|-------|
| I1 | Four independent MCP efforts with no coordination | Open | Abhilash → alignment meeting this week |
| I2 | ADPPICSERV-392 not prioritized for any sprint | Open | Abhilash → use this PRD to prioritize |
| I3 | No established auth pattern for MCP server ↔ Spindle integration | **Resolved** | Beacon template provides Internal Entra SSO (Phase 1) and CIMD/ApigeeX (Phase 3) |

### Decisions

| ID | Decision | Date | Rationale |
|----|----------|------|-----------|
| D1 | Single MCP server consolidating all fragmented efforts | Mar 2026 | Prevents duplicate work, ensures consistent UX, reduces maintenance |
| D2 | Read-first approach: Phase 1 is read-only tools | Mar 2026 | Reduces risk; write operations require more careful safety controls |
| D3 | `adp_` prefix for all tool names | Mar 2026 | Namespace isolation from other MCP servers; discoverability |
| D4 | Node.js (TypeScript) runtime | Mar 2026 | Aligns with existing MFE and AA MCP tooling patterns at Autodesk |
| D5 | Deploy on DataOS (EKS) | Mar 2026 | Co-located with data services; leverages existing IAM roles and network access |
| D6 | Query execution limited to SELECT in Phase 1 | Mar 2026 | Safety control; DDL/DML requires lineage integration (see Data Lineage PRD) |
| D7 | Use Beacon Universal MCP Server Template as foundation | Mar 2026 | Eliminates CloudOS config drift, encodes auth decisions, provides hardened production baseline; compresses M1 from 4 weeks to ~2 weeks |
| D8 | Internal Entra SSO for Phase 1; CIMD + ApigeeX proxy for Phase 3 | Mar 2026 | Beacon template encodes both paths; Internal Entra SSO is self-service (no identity team dependency); CIMD path needed only for external MCP host clients |

---

## Appendix

### A. Current Fragmented MCP Efforts

| Effort | Team/Owner | Scope | Status | PRD Alignment |
|--------|-----------|-------|--------|---------------|
| **Spark Observability** | Platform Infra (AMER) | Spark config recommendations and usage data | In Progress | → MCP-07 (`adp_get_spark_recommendations`) |
| **Query Assistant** | Platform Infra (APAC/Sankalp) | AI-assisted query writing in Autodesk Assistant | Deployed | → MCP-01 (Find Tables), MCP-02 (Schema), MCP-12 (Generate SQL), MCP-13 (Edit SQL), MCP-14 (Fix SQL), MCP-15 (Summarize SQL) |
| **Snowflake Migration Tools** | Platform Infra | Storage ops, Fivetran whitelisting, policy mgmt, compute listing | In Progress | → MCP-05, MCP-09, MCP-10, MCP-11 |
| **GDC AI Native Day** | Platform Infra | Infrastructure operations demo via natural language | Demo | → Architecture validation |

### B. Mapping to JIRA Epics

| Epic | PRD Requirements | Status |
|------|------------------|--------|
| ADPPICSERV-392: Single MCP for Infra APIs | All MCP tool requirements | Backlog (to be prioritized) |
| ADPPICSERV-553: Unified MFE - Configure & Maintain | Resource visibility tools (MCP-05, MCP-08, MCP-11) | In Progress |
| ADPINFRA-1264: DataOS MVP | Deployment target for MCP server | In Progress |

### C. Related Documentation

| Document | Link |
|----------|------|
| AD Data Lake - PRD | [Confluence](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333859875/AD+Data+Lake+-+PRD) |
| Regionalized Data Lake & Resource Management PRD | [Confluence](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/724544519) |
| AA Integration Exploration | [Confluence](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/730188375) |
| MCP Implementation Guidelines (Intelligence Team) | [Confluence](https://autodesk.atlassian.net/wiki/spaces/DATA/pages/709781812) |
| Data Lineage Integration with MDM | [Confluence](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/742040310) |
| Beacon Universal MCP Server Template | Beacon Template Catalog (Developer Enablement) |
| Original Community Request | [Slack #adp-community](https://autodesk.slack.com/archives/C0GF2K7Q9/p1772512342817839) |
| Consolidation Thread | [Slack #C07H420AQE5](https://autodesk.slack.com/archives/C07H420AQE5/p1772564301727309) |

### D. Glossary

| Term | Definition |
|------|------------|
| **MCP** | Model Context Protocol — an open standard for connecting AI assistants to external tools and data sources |
| **MCP Server** | A service that exposes tools via the MCP protocol for AI clients to discover and invoke |
| **MCP Registry** | Autodesk's internal registry for discovering available MCP servers |
| **Tool** | A discrete capability exposed by an MCP server (e.g., `adp_search_tables`) |
| **Glue Data Catalog** | AWS metadata store for table schemas, databases, and data locations |
| **Trino** | Distributed SQL query engine used by the Data Lake for interactive analytics |
| **ADP Studio** | Autodesk's data analytics workspace (built on Querybook) for writing and executing queries |
| **DataOS** | Platform-managed Kubernetes (EKS) clusters for running data workloads |
| **Spindle** | Project management service providing project metadata and auth tokens |
| **Query Assistant** | AI-powered query writing feature in Autodesk Assistant for Data Lake users |
| **AA** | Autodesk Assistant — Autodesk's enterprise AI assistant platform |
| **Beacon** | Autodesk's internal developer portal and service catalog (built on Backstage) |
| **CloudOS** | Autodesk's container orchestration platform for deploying production services |
| **Entra SSO** | Microsoft Entra (Azure AD) Single Sign-On — used for Autodesk employee authentication |
| **CIMD** | Customer Identity Management — Autodesk's external-facing identity service |
| **ApigeeX MCP Proxy** | API gateway proxy that handles OAuth for external MCP host applications (VS Code, Claude Desktop, Cursor) |
| **Beacon Universal MCP Server Template** | Production-ready MCP server scaffold in Beacon; provides CloudOS-aligned runtime, encoded auth (Entra SSO or CIMD), and deployment definitions |

### E. Example MCP Client Configuration

**Phase 1 — Internal Entra SSO (employee-only):**

```json
{
  "mcpServers": {
    "adp-data-lake": {
      "command": "npx",
      "args": ["@autodesk/adp-infra-mcp-server"],
      "env": {
        "ENTRA_CLIENT_ID": "${ENTRA_CLIENT_ID}",
        "ENTRA_TENANT_ID": "${ENTRA_TENANT_ID}",
        "ADP_ENVIRONMENT": "prd"
      }
    }
  }
}
```

**Phase 3 — External via ApigeeX MCP Proxy (MCP host applications):**

```json
{
  "mcpServers": {
    "adp-data-lake": {
      "url": "https://mcp-proxy.autodesk.com/adp-infra",
      "transport": "sse"
    }
  }
}
```

Authentication handled transparently by the ApigeeX MCP proxy — no pre-registration of APIM clients in the Dev Portal.

---

## Change Log

| Version | Description | Author | Date |
|---------|-------------|--------|------|
| 0.1 | Initial draft — Unified Infrastructure MCP Server PRD | Abhilash Achar | 2026-03-03 |
| 0.2 | Integrated Beacon Universal MCP Server Template: updated architecture (CloudOS deployment, Entra SSO / CIMD auth), compressed M1 timeline, mitigated R3 (auth risk), resolved I3 (auth pattern), added D7/D8 decisions | Abhilash Achar | 2026-03-03 |
| 0.3 | Added Query Assistant parity tools (MCP-12 Generate SQL, MCP-13 Edit SQL, MCP-14 Fix SQL, MCP-15 Summarize SQL); updated Phase 1 scope, M3 milestone, consolidation mapping, success metrics; reframed triggers around broader community demand; generalized tool references from Cursor-specific to "code generation tools/IDEs" | Abhilash Achar | 2026-03-03 |

---

*Document maintained by AD Platform Infrastructure Triad*
