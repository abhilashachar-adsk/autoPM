# Unified Resource MFE - Mockup Specifications

**Version:** 0.1  
**Author:** Abhilash Achar  
**Date:** February 11, 2026  
**Target Repository:** [adp-infra-project-resources-mfe](https://git.autodesk.com/ADP/adp-infra-project-resources-mfe)  
**Design System:** Weave MUI (Autodesk Design System)  
**Related PRD:** Central Data Lake - Regionalized Resource Management PRD

---

## Table of Contents

1. [Design Principles](#design-principles)
2. [Navigation & Layout](#navigation--layout)
3. [Shared Components](#shared-components)
4. [Screen 1: Overview Dashboard](#screen-1-overview-dashboard)
5. [Screen 2: Storage Page (Updated)](#screen-2-storage-page-updated)
6. [Screen 3: Compute Page (New)](#screen-3-compute-page-new)
7. [Screen 4: Orchestration Page (Updated)](#screen-4-orchestration-page-updated)
8. [Screen 5: Observability Page (New)](#screen-5-observability-page-new)
9. [Modals & Dialogs](#modals--dialogs)
10. [Responsive Behavior](#responsive-behavior)
11. [Component Specifications](#component-specifications)
12. [State Management](#state-management)
13. [API Integration Map](#api-integration-map)

---

## Design Principles

| Principle | Application |
|-----------|-------------|
| **Region-first** | Every resource view leads with region context; users always know "where" |
| **Progressive disclosure** | Overview → List → Detail → Action; don't overwhelm on first load |
| **Compliance by default** | Compliance status visible at every level; non-compliant items visually prominent |
| **Self-service first** | Every view has an action button; every detail has a "manage" option |
| **Consistent with ADP patterns** | Follow existing `adp-bi-mfe` Weave patterns for cards, modals, badges |

---

## Navigation & Layout

### Top-Level Navigation (Tab Bar)

```
┌─────────────────────────────────────────────────────────────────┐
│  Project Resources                           [Region: US-East-1 ▼]  │
├──────────┬──────────┬──────────┬──────────────┬────────────────┤
│ Overview │ Storage  │ Compute  │ Orchestration │ Observability  │
│  (active)│          │          │               │                │
└──────────┴──────────┴──────────┴──────────────┴────────────────┘
```

**Layout Rules:**
- Tab bar is persistent across all views
- Region indicator in header shows project's assigned region
- Active tab is underlined with Weave primary color
- Mobile: tabs collapse to a horizontal scrollable row
- Each tab has a badge count for actionable items (e.g., "Storage (2)" means 2 items need attention)

### Route Structure

| Route | Component | Description |
|-------|-----------|-------------|
| `/overview` (default) | `OverviewDashboard` | Summary of all resources |
| `/storage` | `StoragePage` | Storage domain management |
| `/storage/:domainName` | `DomainDetails` | Storage domain detail |
| `/compute` | `ComputePage` | Compute cluster management |
| `/compute/:clusterId` | `ClusterDetails` | Compute cluster detail |
| `/orchestration` | `OrchestrationPage` | OSS Airflow environment & DAG management |
| `/orchestration/:dagId` | `DagDetails` | DAG run history and detail |
| `/observability` | `ObservabilityPage` | Utilization, cost, alerts |

---

## Shared Components

### RegionBadge

```
┌────────────────┐
│ 🌐 US-East-1   │   ← Blue background, white text
└────────────────┘

┌────────────────┐
│ 🌐 EU-West-1   │   ← Green background, white text
└────────────────┘

┌────────────────┐
│ 🌐 AP-SE-1     │   ← Orange background, white text (future)
└────────────────┘
```

**Props:**
```typescript
interface RegionBadgeProps {
  region: 'us-east-1' | 'eu-west-1' | 'ap-southeast-1';
  size?: 'small' | 'medium';  // small for list items, medium for headers
}
```

**Color Map:**
| Region | Background | Text | Label |
|--------|-----------|------|-------|
| us-east-1 | `#1976D2` (Blue 700) | White | US-East-1 |
| eu-west-1 | `#388E3C` (Green 700) | White | EU-West-1 |
| ap-southeast-1 | `#F57C00` (Orange 700) | White | AP-SE-1 |

---

### LifecycleStatusBadge

```
┌─────────────┐  ┌──────────────┐  ┌────────────────┐  ┌──────────────┐
│ ● Active    │  │ ● Idle       │  │ ● Stale        │  │ ● Deprecated │
│   (green)   │  │   (yellow)   │  │   (orange)     │  │   (red)      │
└─────────────┘  └──────────────┘  └────────────────┘  └──────────────┘
```

**Props:**
```typescript
interface LifecycleStatusBadgeProps {
  status: 'active' | 'idle' | 'stale' | 'deprecated' | 'provisioning';
}
```

---

### ComplianceBadge

```
┌────────────────┐  ┌──────────────────┐  ┌─────────────────┐  ┌──────────────┐
│ ✓ Compliant    │  │ ⚠ Expiring Soon  │  │ ! Action Req'd  │  │ ⊘ Legal Hold │
│   (green)      │  │   (yellow)       │  │   (red)         │  │   (blue)     │
└────────────────┘  └──────────────────┘  └─────────────────┘  └──────────────┘
```

---

### ClassificationBadge

```
┌──────────────────────────┐  ┌──────────────────┐  ┌──────────────────────────┐
│ 🔒 Confidential-Restrict │  │ 🔑 Need-to-Know  │  │ 📂 Internal-Use-Only     │
│   (red outline)          │  │   (orange outline)│  │   (gray outline)         │
└──────────────────────────┘  └──────────────────┘  └──────────────────────────┘
```

---

### ResourceCountCard (used in Overview)

```
┌─────────────────────────────────────┐
│  📦 Storage                         │
│                                     │
│   12 domains                        │
│   3.4 TB total   │  $487/mo         │
│                                     │
│   US-East-1: 10  │  EU-West-1: 2    │
│                                     │
│   ✓ All Compliant                   │
│                          [View All →]│
└─────────────────────────────────────┘
```

---

## Screen 1: Overview Dashboard

### Wireframe

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Project Resources                              [Region: US-East-1 ▼]  │
├───────────┬──────────┬──────────┬──────────────┬───────────────────────┤
│ Overview* │ Storage  │ Compute  │ Orchestration │ Observability         │
├───────────┴──────────┴──────────┴──────────────┴───────────────────────┤
│                                                                         │
│  Project: AECGAIA        Region: 🌐 US-East-1       Owner: J. Smith    │
│                                                                         │
│  ┌─── Resource Summary ───────────────────────────────────────────────┐ │
│  │                                                                     │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │ │
│  │  │ 📦 Storage   │  │ ⚡ Compute   │  │ 🔄 Orchestr. │              │ │
│  │  │              │  │              │  │              │              │ │
│  │  │  12 domains  │  │  3 clusters  │  │  2 workers   │              │ │
│  │  │  3.4 TB      │  │  24 vCPU     │  │  4 tasks     │              │ │
│  │  │  $487/mo     │  │  $312/mo     │  │  $89/mo      │              │ │
│  │  │              │  │              │  │              │              │ │
│  │  │  US: 10      │  │  US: 2       │  │  US: 2       │              │ │
│  │  │  EU: 2       │  │  EU: 1       │  │  EU: 0       │              │ │
│  │  │              │  │              │  │              │              │ │
│  │  │  ✓ Compliant │  │  ✓ Compliant │  │  ✓ Compliant │              │ │
│  │  │  [View All →]│  │  [View All →]│  │  [View All →]│              │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘              │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─── Cost & Compliance ──────────────────────────────────────────────┐ │
│  │                                                                     │ │
│  │  ┌─── Monthly Cost ─────────────┐  ┌─── Compliance ──────────────┐ │ │
│  │  │                               │  │                             │ │ │
│  │  │   Total: $888/mo              │  │   ✓ Regional Compliance     │ │ │
│  │  │   ▲ 3% vs last month          │  │     0 cross-region events   │ │ │
│  │  │                               │  │                             │ │ │
│  │  │   ┌──────────────────────┐    │  │   ✓ Retention Compliance    │ │ │
│  │  │   │  ████████  Storage   │    │  │     10/12 domains OK        │ │ │
│  │  │   │  █████     Compute   │    │  │     2 expiring in 30 days   │ │ │
│  │  │   │  ██        Orchestr. │    │  │                             │ │ │
│  │  │   └──────────────────────┘    │  │   ⚠ 1 action required       │ │ │
│  │  │                               │  │     [View Details →]        │ │ │
│  │  └───────────────────────────────┘  └─────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─── Recent Activity ────────────────────────────────────────────────┐ │
│  │                                                                     │ │
│  │  🟢 2h ago   Domain "raw-events" created in EU-West-1              │ │
│  │  🟡 1d ago   Compute cluster "spark-prod" scaled to Large          │ │
│  │  🔴 3d ago   Retention expiring: domain "user-profiles" (14 days)  │ │
│  │  🟢 5d ago   Worker "etl-daily" deployed to US-East-1              │ │
│  │                                                     [View All →]    │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
OverviewDashboard
├── ProjectHeader (project name, region badge, owner)
├── ResourceSummarySection
│   ├── ResourceCountCard (storage)
│   ├── ResourceCountCard (compute)
│   └── ResourceCountCard (orchestration)
├── CostComplianceSection
│   ├── CostSummaryWidget
│   │   ├── TotalCostDisplay
│   │   └── CostBreakdownBar
│   └── ComplianceStatusWidget
│       ├── RegionalComplianceStatus
│       └── RetentionComplianceStatus
└── RecentActivitySection
    └── ActivityList
        └── ActivityItem[]
```

### Data Requirements

```typescript
interface OverviewData {
  project: {
    id: string;
    name: string;
    region: string;
    owner: string;
  };
  summary: {
    storage: { count: number; totalSize: string; monthlyCost: number; byRegion: Record<string, number> };
    compute: { count: number; totalVcpu: number; monthlyCost: number; byRegion: Record<string, number> };
    orchestration: { count: number; taskCount: number; monthlyCost: number; byRegion: Record<string, number> };
  };
  compliance: {
    regional: { status: 'compliant' | 'violation'; crossRegionEvents: number };
    retention: { compliant: number; total: number; expiringCount: number; actionRequired: number };
  };
  cost: {
    totalMonthly: number;
    changePercent: number;
    breakdown: { storage: number; compute: number; orchestration: number };
  };
  recentActivity: Array<{
    timestamp: string;
    type: 'create' | 'update' | 'alert' | 'lifecycle';
    severity: 'info' | 'warning' | 'error';
    message: string;
    region: string;
  }>;
}
```

---

## Screen 2: Storage Page (Updated)

### Wireframe

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Project Resources                              [Region: US-East-1 ▼]  │
├───────────┬──────────┬──────────┬──────────────┬───────────────────────┤
│ Overview  │ Storage* │ Compute  │ Orchestration │ Observability         │
├───────────┴──────────┴──────────┴──────────────┴───────────────────────┤
│                                                                         │
│  Storage Domains (12)                               [+ Create Domain]   │
│  Filter: [All Regions ▼] [All Classifications ▼] [All Statuses ▼]      │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ ▶ raw-events                                                        ││
│  │   🌐 US-East-1  │  📂 Internal  │  ✓ Compliant  │  ● Active       ││
│  │   HIVE  SNOWFLAKE                │  1.2 TB  │  $174/mo             ││
│  │   Created: 2025-08-15            │  Last Access: 2h ago             ││
│  └─────────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ ▶ user-profiles                                                     ││
│  │   🌐 US-East-1  │  🔑 NTK       │  ⚠ Expiring   │  ● Active       ││
│  │   HIVE                           │  800 GB  │  $115/mo             ││
│  │   Created: 2024-11-03            │  Last Access: 45d ago            ││
│  │   ⚠ Retention expires in 14 days │  [Request Extension]             ││
│  └─────────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ ▶ gdpr-events                                                       ││
│  │   🌐 EU-West-1  │  🔒 C-R       │  ✓ Compliant  │  ● Active       ││
│  │   HIVE                           │  200 GB  │  $29/mo              ││
│  │   Created: 2026-02-10            │  Last Access: 1d ago             ││
│  └─────────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ ▼ analytics-exports    (expanded)                                   ││
│  │   🌐 US-East-1  │  📂 Internal  │  ✓ Compliant  │  ● Active       ││
│  │   HIVE  SNOWFLAKE                │  450 GB  │  $65/mo              ││
│  │                                                                     ││
│  │   ┌───────────────────────────────────────────────────────────────┐ ││
│  │   │  Resources │ Retention │                                      │ ││
│  │   ├────────────┴───────────┤                                      │ ││
│  │   │                                                               │ ││
│  │   │  Environment: [dev] [stg] [prd*]                              │ ││
│  │   │                                                               │ ││
│  │   │  ┌── RAW ──────────────────────────────────────────────────┐  │ ││
│  │   │  │  analytics_exports_raw_prd                               │  │ ││
│  │   │  │  s3://adp-cdl-prd/raw/analytics_exports/                │  │ ││
│  │   │  └──────────────────────────────────────────────────────────┘  │ ││
│  │   │  ┌── INTERNAL ─────────────────────────────────────────────┐  │ ││
│  │   │  │  analytics_exports_internal_prd                          │  │ ││
│  │   │  │  s3://adp-cdl-prd/internal/analytics_exports/           │  │ ││
│  │   │  └──────────────────────────────────────────────────────────┘  │ ││
│  │   │  ┌── EXPORT ───────────────────────────────────────────────┐  │ ││
│  │   │  │  analytics_exports_export_prd                            │  │ ││
│  │   │  │  s3://adp-cdl-prd/export/analytics_exports/             │  │ ││
│  │   │  └──────────────────────────────────────────────────────────┘  │ ││
│  │   └───────────────────────────────────────────────────────────────┘ ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Changes from Current MFE

| Current Component | Change |
|-------------------|--------|
| `DomainListItem` | Add: RegionBadge, ClassificationBadge, ComplianceBadge, LifecycleBadge, size, cost, last access |
| `DomainDetails` | Add: "Retention" tab alongside "Resources" |
| `CreateDomainModal` | Add: region (auto-populated, read-only), retain data classification |
| `StoragePage` | Add: filter bar (region, classification, status) |

### Retention Tab (within DomainDetails)

```
┌───────────────────────────────────────────────────────────────────────┐
│  Resources │ Retention* │                                              │
├────────────┴────────────┤                                              │
│                                                                        │
│  Retention Policy for "analytics-exports"                              │
│                                                                        │
│  ┌── Policy Details ───────────────────────────────────────────────┐   │
│  │                                                                  │   │
│  │  Data Classification:  📂 Internal-Use-Only                     │   │
│  │  Retention Period:     730 days (2 years)                        │   │
│  │  Policy Start:         2025-08-15                                │   │
│  │  Policy Expiry:        2027-08-15                                │   │
│  │  Days Remaining:       553 days                                  │   │
│  │  Region:               🌐 US-East-1                              │   │
│  │                                                                  │   │
│  │  Status: ✓ Compliant                                             │   │
│  │                                                                  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│  ┌── Retention Actions ────────────────────────────────────────────┐   │
│  │                                                                  │   │
│  │  [Request Extension]  [Initiate Deprecation]  [View Audit Log]  │   │
│  │                                                                  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                        │
│  ┌── Audit History ────────────────────────────────────────────────┐   │
│  │                                                                  │   │
│  │  2026-02-10  Policy assigned (auto)     Classification: Internal │   │
│  │  2025-08-15  Domain created             Region: US-East-1       │   │
│  │                                                                  │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Screen 3: Compute Page (New)

### Wireframe

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Project Resources                              [Region: US-East-1 ▼]  │
├───────────┬──────────┬──────────┬──────────────┬───────────────────────┤
│ Overview  │ Storage  │ Compute* │ Orchestration │ Observability         │
├───────────┴──────────┴──────────┴──────────────┴───────────────────────┤
│                                                                         │
│  Compute Clusters (3)                               [+ Create Cluster]  │
│  Filter: [All Regions ▼] [All Sizes ▼] [All Statuses ▼]                │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │  spark-prod-01                                         [● Running]  ││
│  │  🌐 US-East-1  │  Large (16 vCPU, 64 GB)  │  🦾 Graviton          ││
│  │                                                                     ││
│  │  ┌── Utilization (last 24h) ────────────────────────────────────┐   ││
│  │  │  CPU: ████████░░ 78%    Memory: █████░░░░░ 52%               │   ││
│  │  │  Jobs today: 47         Success rate: 97.9%                  │   ││
│  │  └──────────────────────────────────────────────────────────────┘   ││
│  │                                                                     ││
│  │  Est. Cost: $0.65/hr ($468/mo)          Created: 2026-01-15        ││
│  │                                                                     ││
│  │  [View Details]  [Configure]  [Stop]                                ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │  spark-dev-01                                         [● Running]   ││
│  │  🌐 US-East-1  │  Small (4 vCPU, 16 GB)   │  🦾 Graviton          ││
│  │                                                                     ││
│  │  ┌── Utilization (last 24h) ────────────────────────────────────┐   ││
│  │  │  CPU: ██░░░░░░░░ 15%    Memory: ███░░░░░░░ 28%              │   ││
│  │  │  Jobs today: 3          Success rate: 100%                   │   ││
│  │  └──────────────────────────────────────────────────────────────┘   ││
│  │                                                                     ││
│  │  ⚠ Low utilization — consider scaling down                          ││
│  │                                                                     ││
│  │  Est. Cost: $0.16/hr ($115/mo)          Created: 2026-02-01        ││
│  │                                                                     ││
│  │  [View Details]  [Configure]  [Stop]                                ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │  spark-emea-01                                        [● Running]   ││
│  │  🌐 EU-West-1  │  Medium (8 vCPU, 32 GB)  │  🦾 Graviton          ││
│  │                                                                     ││
│  │  ┌── Utilization (last 24h) ────────────────────────────────────┐   ││
│  │  │  CPU: ██████░░░░ 62%    Memory: ████████░░ 75%              │   ││
│  │  │  Jobs today: 22         Success rate: 95.5%                  │   ││
│  │  └──────────────────────────────────────────────────────────────┘   ││
│  │                                                                     ││
│  │  Est. Cost: $0.33/hr ($238/mo)          Created: 2026-02-10        ││
│  │                                                                     ││
│  │  [View Details]  [Configure]  [Stop]                                ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Cluster Detail View

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ← Back to Compute                                                      │
│                                                                         │
│  spark-prod-01                                           [● Running]    │
│  🌐 US-East-1  │  Large (16 vCPU, 64 GB)  │  🦾 Graviton              │
│                                                                         │
│  ┌─── Configuration ───────────────────────────────────────────────────┐│
│  │                                                                      ││
│  │  Cluster Type:    EMR on EKS (Virtual Cluster)                      ││
│  │  Instance Type:   m7g.4xlarge (Graviton 3)                          ││
│  │  Size:            Large                                              ││
│  │  vCPU:            16                                                 ││
│  │  Memory:          64 GB                                              ││
│  │  Region:          🌐 US-East-1                                       ││
│  │  DataOS Cluster:  dataos-us-east-1-prd                              ││
│  │  Namespace:       project-aecgaia-compute                            ││
│  │  Created:         2026-01-15 by j.smith@autodesk.com                ││
│  │  Status:          Running (uptime: 27d 4h)                          ││
│  │                                                                      ││
│  │  [Configure Size]  [Stop Cluster]  [View Logs]                      ││
│  └──────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  ┌─── Utilization (30 day) ────────────────────────────────────────────┐│
│  │                                                                      ││
│  │  CPU Utilization                     Memory Utilization              ││
│  │  ┌────────────────────────┐         ┌────────────────────────┐      ││
│  │  │     __    __           │         │          ___            │      ││
│  │  │    /  \__/  \____      │         │    __   /   \__         │      ││
│  │  │ __/              \     │         │   /  \_/       \___     │      ││
│  │  │/                  \___ │         │__/                  \_  │      ││
│  │  │ Jan 15   Jan 25   Feb 5│         │ Jan 15   Jan 25   Feb 5│      ││
│  │  └────────────────────────┘         └────────────────────────┘      ││
│  │                                                                      ││
│  │  Avg CPU: 72%   Peak: 95%          Avg Mem: 58%    Peak: 82%       ││
│  │                                                                      ││
│  └──────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  ┌─── Job History (last 7 days) ───────────────────────────────────────┐│
│  │                                                                      ││
│  │  Total Jobs: 312    Success: 306 (98.1%)    Failed: 6 (1.9%)       ││
│  │                                                                      ││
│  │  Recent:                                                             ││
│  │  ✓ 10:32  etl-daily-events        12 min    CPU: 85%               ││
│  │  ✓ 09:15  aggregate-metrics       8 min     CPU: 72%               ││
│  │  ✗ 08:45  export-quarterly        FAILED    OOM at 64GB            ││
│  │  ✓ 08:00  ingest-raw-logs         22 min    CPU: 91%               ││
│  │                                                                      ││
│  └──────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  ┌─── Cost ────────────────────────────────────────────────────────────┐│
│  │                                                                      ││
│  │  Current Month:  $312.45     Last Month: $468.00     ▼ 33%          ││
│  │  Daily Average:  $15.60      Est. Monthly: $468.00                  ││
│  │                                                                      ││
│  └──────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Screen 4: Orchestration Page (Updated) — OSS Airflow

**Strategy Change (Feb 2026):** Orchestration has shifted from Astro (managed Airflow) + Temporal to **OSS Apache Airflow** deployed on DataOS (EKS). The orchestration page now manages Airflow environments, DAGs, and component health — not Temporal workers.

### Wireframe

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Project Resources                              [Region: US-East-1 ▼]  │
├───────────┬──────────┬──────────┬──────────────┬───────────────────────┤
│ Overview  │ Storage  │ Compute  │ Orchestration*│ Observability         │
├───────────┴──────────┴──────────┴──────────────┴───────────────────────┤
│                                                                         │
│  Airflow Environment                     [Open Airflow UI ↗]           │
│  🌐 US-East-1  │  OSS Airflow 2.9  │  DataOS: dataos-us-east-1-prd    │
│                                                                         │
│  ┌─── Component Health ────────────────────────────────────────────────┐│
│  │  ✅ Scheduler: Running (2 replicas)     Last heartbeat: 30s ago     ││
│  │  ✅ Webserver: Running (2 replicas)     Response time: 120ms        ││
│  │  ✅ Workers: 4/4 healthy                Executor: KubernetesExecutor││
│  │  ✅ Metadata DB: PostgreSQL (RDS)       Region: us-east-1           ││
│  │  ✅ Redis (Broker): Running             Connections: 12              ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  DAGs (23 active)                            Filter: [All Statuses ▼]  │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │  etl-daily-events                                     [● Active]    ││
│  │  Schedule: 0 6 * * *  (daily 6:00 UTC)                              ││
│  │                                                                     ││
│  │  Last Run: 2026-02-11 06:00  │  Duration: 12 min  │  ✓ Success     ││
│  │  Runs (7d): ✓✓✓✓✓✓✗   (6/7 success, 85.7%)                        ││
│  │  Next Run: 2026-02-12 06:00                                         ││
│  │                                                                     ││
│  │  [View Runs]  [View in Airflow UI ↗]  [View Logs]                  ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │  aggregate-metrics                                    [● Active]    ││
│  │  Schedule: 0 */4 * * *  (every 4 hours)                             ││
│  │                                                                     ││
│  │  Last Run: 2026-02-11 12:00  │  Duration: 8 min   │  ✓ Success     ││
│  │  Runs (7d): ✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓✓ (42/42, 100%)  ││
│  │  Next Run: 2026-02-11 16:00                                         ││
│  │                                                                     ││
│  │  [View Runs]  [View in Airflow UI ↗]  [View Logs]                  ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │  sync-snowflake                                       [● Active]    ││
│  │  Schedule: 30 * * * *  (every hour at :30)                          ││
│  │                                                                     ││
│  │  Last Run: 2026-02-11 13:30  │  Duration: 5 min   │  ✓ Success     ││
│  │  Runs (7d): ✓✓✓✓✓✓✓✓✓✓...  (168/168, 100%)                        ││
│  │  Next Run: 2026-02-11 14:30                                         ││
│  │                                                                     ││
│  │  [View Runs]  [View in Airflow UI ↗]  [View Logs]                  ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  ┌─── Summary ─────────────────────────────────────────────────────────┐│
│  │  Total DAGs: 23 active, 2 paused     DAG Runs (7d): 487            ││
│  │  Overall Success Rate: 98.6%         Avg Duration: 9 min            ││
│  │  Est. Cost: $89/mo                   Executor Pods (avg): 4.2       ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Screen 5: Observability Page (New)

### Wireframe

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Project Resources                              [Region: US-East-1 ▼]  │
├───────────┬──────────┬──────────┬──────────────┬───────────────────────┤
│ Overview  │ Storage  │ Compute  │ Orchestration │ Observability*        │
├───────────┴──────────┴──────────┴──────────────┴───────────────────────┤
│                                                                         │
│  Time Range: [Last 30 days ▼]    Region: [All ▼]                        │
│                                                                         │
│  ┌─── Cost Dashboard ─────────────────────────────────────────────────┐ │
│  │                                                                     │ │
│  │  Total Monthly Cost: $888.00                    ▲ 3% vs last month  │ │
│  │                                                                     │ │
│  │  By Resource Type              By Region                            │ │
│  │  ┌──────────────────────┐      ┌──────────────────────┐             │ │
│  │  │ Storage    $487 55%  │      │ US-East-1  $750  84% │             │ │
│  │  │ Compute    $312 35%  │      │ EU-West-1  $138  16% │             │ │
│  │  │ Orchestr.   $89 10%  │      └──────────────────────┘             │ │
│  │  └──────────────────────┘                                           │ │
│  │                                                                     │ │
│  │  Monthly Trend                                                      │ │
│  │  ┌──────────────────────────────────────────────────────────────┐   │ │
│  │  │  $1000 ┤                                                      │   │ │
│  │  │   $900 ┤              ___                                     │   │ │
│  │  │   $800 ┤    ___   ___/   \___   ___                          │   │ │
│  │  │   $700 ┤___/   \_/              /   \___                     │   │ │
│  │  │   $600 ┤                                                      │   │ │
│  │  │        └──────────────────────────────────────────────────    │   │ │
│  │  │         Sep   Oct   Nov   Dec   Jan   Feb                     │   │ │
│  │  └──────────────────────────────────────────────────────────────┘   │ │
│  │                                                                     │ │
│  │                                              [Export Report]        │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─── Utilization ────────────────────────────────────────────────────┐ │
│  │                                                                     │ │
│  │  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐       │ │
│  │  │  Storage         │ │  Compute         │ │  Orchestration   │       │ │
│  │  │  Used: 3.4 TB    │ │  Avg CPU: 52%    │ │  Success: 99.6%  │       │ │
│  │  │  Stale: 0.8 TB   │ │  Avg Mem: 45%    │ │  Workers: 2/2 up │       │ │
│  │  │  Stale %: 23.5%  │ │  Idle hrs: 142   │ │  Avg dur: 8 min  │       │ │
│  │  │  [View Stale →]  │ │  [Right-size →]  │ │  [View Trends →] │       │ │
│  │  └─────────────────┘ └─────────────────┘ └─────────────────┘       │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─── Active Alerts ──────────────────────────────────────────────────┐ │
│  │                                                                     │ │
│  │  🔴 CRITICAL  spark-dev-01: Memory utilization >90% (2h ago)       │ │
│  │              🌐 US-East-1  │  Compute  │  [View →]                  │ │
│  │                                                                     │ │
│  │  🟡 WARNING   user-profiles: Retention expiring in 14 days          │ │
│  │              🌐 US-East-1  │  Storage   │  [Request Extension →]    │ │
│  │                                                                     │ │
│  │  🟡 WARNING   spark-dev-01: Low utilization (CPU 15% avg, 7 days)  │ │
│  │              🌐 US-East-1  │  Compute   │  [Right-size →]           │ │
│  │                                                                     │ │
│  │  No alerts for EU-West-1 resources ✓                                │ │
│  │                                                                     │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─── Lifecycle Status ───────────────────────────────────────────────┐ │
│  │                                                                     │ │
│  │  Resource Lifecycle Summary                                         │ │
│  │                                                                     │ │
│  │  ● Active: 15    ● Idle: 2    ● Stale: 1    ● Deprecated: 0       │ │
│  │                                                                     │ │
│  │  Recommendations:                                                   │ │
│  │  ⚡ Scale down spark-dev-01 (Small → free tier?)     [Apply →]      │ │
│  │  🗑️ Review stale domain "legacy-exports" (180+ days)  [Review →]    │ │
│  │  💰 Potential savings: $127/mo                                      │ │
│  │                                                                     │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Modals & Dialogs

### Create Cluster Modal

```
┌──────────────────────────────────────────────────────────────────┐
│  Create Compute Cluster                                    [✕]   │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Cluster Name *                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  spark-analytics-01                                       │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Region                                                          │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  🌐 US-East-1 (from project assignment)           🔒      │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Cluster Size *                                                  │
│                                                                  │
│  ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌───────────┐        │
│  │  Small   │  │  Medium   │  │  Large*  │  │  X-Large   │        │
│  │  4 vCPU  │  │  8 vCPU   │  │  16 vCPU │  │  32 vCPU   │        │
│  │  16 GB   │  │  32 GB    │  │  64 GB   │  │  128 GB    │        │
│  │ $0.16/hr │  │ $0.33/hr  │  │ $0.65/hr │  │ $1.30/hr   │        │
│  └─────────┘  └──────────┘  └──────────┘  └───────────┘        │
│                                                                  │
│  Instance Type                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  🦾 Graviton (m7g) - Recommended              ▼          │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Estimated Cost                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  $0.65/hour  │  ~$468/month (24/7)  │  ~$156/mo (8h/day)│    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│                              [Cancel]  [Create Cluster]          │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Retention Extension Modal

```
┌──────────────────────────────────────────────────────────────────┐
│  Request Retention Extension                               [✕]   │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Domain: user-profiles                                           │
│  Region: 🌐 US-East-1                                            │
│  Classification: 🔑 Need-to-Know                                 │
│  Current Retention: 730 days                                     │
│  Remaining: 14 days                                              │
│                                                                  │
│  ─────────────────────────────────────────────────────────────   │
│                                                                  │
│  Requested Extension *                                           │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  90 days                                          ▼       │    │
│  └──────────────────────────────────────────────────────────┘    │
│  Options: 30 days, 60 days, 90 days, 180 days, 365 days         │
│                                                                  │
│  Business Justification * (required)                             │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  This dataset is used for quarterly compliance reporting  │    │
│  │  and is accessed every 90 days for regulatory audit       │    │
│  │  preparation. The next audit is scheduled for May 2026.   │    │
│  │                                                           │    │
│  └──────────────────────────────────────────────────────────┘    │
│  Minimum 50 characters                                           │
│                                                                  │
│  Approver                                                        │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  Auto-routed to: Project Owner (j.smith@autodesk.com)     │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ℹ️ Extension requests are reviewed within 5 business days.      │
│     You will receive an email notification of the decision.      │
│                                                                  │
│                              [Cancel]  [Submit Request]          │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Create Domain Modal (Updated)

```
┌──────────────────────────────────────────────────────────────────┐
│  Create Storage Domain                                     [✕]   │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Storage Name *                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  gdpr-events                                              │    │
│  └──────────────────────────────────────────────────────────┘    │
│  adp-{name}-{env}                                                │
│                                                                  │
│  Description                                                     │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  GDPR event data for European customers                   │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Region                                                          │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  🌐 EU-West-1 (from project assignment)           🔒      │    │
│  └──────────────────────────────────────────────────────────┘    │
│  ℹ️ Region is determined by your project's regional assignment    │
│                                                                  │
│  Workspace Type *                                                │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  HIVE (Data Lake)                                 ▼       │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  Data Classification *                                           │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  🔒 Confidential - Restricted                     ▼       │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  □ This domain contains Third-Party Watchlist (TWL) data         │
│                                                                  │
│  ┌─── Retention Policy (auto-assigned) ─────────────────────┐   │
│  │  Classification: Confidential-Restricted                   │   │
│  │  Retention Period: 365 days (1 year)                       │   │
│  │  Regional Enforcement: EU-West-1 only                      │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│                              [Cancel]  [Create Domain]           │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Desktop (>1200px) | Full layout as shown in wireframes; 3-column resource cards |
| Tablet (768-1200px) | 2-column resource cards; side-by-side cost/compliance widgets |
| Mobile (<768px) | Single column; tabs become horizontal scroll; modals full-screen |

---

## Component Specifications

### New Components

| Component | File | Props | State |
|-----------|------|-------|-------|
| `OverviewDashboard` | `components/overview/OverviewDashboard.tsx` | `projectId: string` | Fetches all summary data |
| `ResourceCountCard` | `components/overview/ResourceCountCard.tsx` | `type, count, size, cost, byRegion, compliance` | Stateless |
| `CostSummaryWidget` | `components/overview/CostSummaryWidget.tsx` | `total, change, breakdown` | Stateless |
| `ComplianceStatusWidget` | `components/overview/ComplianceStatusWidget.tsx` | `regional, retention` | Stateless |
| `ComputePage` | `components/compute/ComputePage.tsx` | `projectId: string` | Fetches compute clusters |
| `ComputeClusterCard` | `components/compute/ComputeClusterCard.tsx` | `cluster: ComputeCluster` | Stateless |
| `CreateClusterModal` | `components/compute/CreateClusterModal.tsx` | `open, onClose, onSubmit, region` | Form state |
| `ClusterDetails` | `components/compute/ClusterDetails.tsx` | `clusterId: string` | Fetches cluster detail |
| `RetentionTab` | `components/storage/RetentionTab.tsx` | `domain: Domain` | Fetches retention data |
| `RetentionExtensionModal` | `components/storage/RetentionExtensionModal.tsx` | `open, domain, onSubmit` | Form state |
| `ObservabilityPage` | `components/observability/ObservabilityPage.tsx` | `projectId: string` | Fetches metrics |
| `CostBreakdownChart` | `components/observability/CostBreakdownChart.tsx` | `data, timeRange` | Stateless |
| `UtilizationChart` | `components/observability/UtilizationChart.tsx` | `data, resourceType` | Stateless |
| `AlertsList` | `components/observability/AlertsList.tsx` | `alerts: Alert[]` | Stateless |
| `RegionBadge` | `components/shared/RegionBadge.tsx` | `region, size?` | Stateless |
| `LifecycleStatusBadge` | `components/shared/LifecycleStatusBadge.tsx` | `status` | Stateless |
| `ComplianceBadge` | `components/shared/ComplianceBadge.tsx` | `status` | Stateless |
| `ClassificationBadge` | `components/shared/ClassificationBadge.tsx` | `classification` | Stateless |
| `RegionFilter` | `components/shared/RegionFilter.tsx` | `regions, selected, onChange` | Controlled |

### Updated Components

| Component | Changes |
|-----------|---------|
| `StoragePage` | Add RegionFilter, ComplianceBadge, cost display |
| `DomainListItem` | Add RegionBadge, ClassificationBadge, ComplianceBadge, LifecycleStatusBadge, size, cost |
| `DomainDetails` | Add "Retention" tab; pass region to children |
| `CreateDomainModal` | Add region field (read-only), retention policy preview |
| `OrchestrationPage` | Full implementation: Airflow env health, DAG list, component status, link to Airflow UI |
| `index.tsx` | Add routes: `/overview`, `/compute`, `/observability` |

---

## State Management

### New Hooks

| Hook | Purpose | API |
|------|---------|-----|
| `useGetOverviewData` | Fetch overview summary | `GET /v2/overview/{projectId}` |
| `useGetComputeClusters` | List compute clusters | `GET /v2/compute/clusters/{projectId}` |
| `useGetClusterDetail` | Single cluster detail | `GET /v2/compute/clusters/{projectId}/{clusterId}` |
| `useCreateCluster` | Provision new cluster | `POST /v2/compute/clusters` |
| `useUpdateCluster` | Update cluster config | `PATCH /v2/compute/clusters/{clusterId}` |
| `useGetRetentionPolicy` | Retention for domain | `GET /v2/lifecycle/retention/{domainName}` |
| `useRequestExtension` | Submit extension request | `POST /v2/lifecycle/extension` |
| `useGetObservabilityData` | Utilization, cost, alerts | `GET /v2/observability/{projectId}` |
| `useGetAlerts` | Active CNS alerts | `GET /v2/alerts/{projectId}` |
| `useGetAirflowEnvironment` | Airflow env health & config | `GET /v2/orchestration/airflow/{projectId}` |
| `useGetAirflowDags` | List DAGs with run history | `GET /v2/orchestration/airflow/{projectId}/dags` |

### New Types

```typescript
// types/compute.d.ts
export interface ComputeCluster {
  clusterId: string;
  name: string;
  projectId: string;
  region: string;
  size: 'small' | 'medium' | 'large' | 'xlarge';
  instanceType: string;
  isGraviton: boolean;
  vcpu: number;
  memoryGb: number;
  status: 'provisioning' | 'running' | 'stopped' | 'terminating' | 'terminated';
  costPerHour: number;
  estimatedMonthlyCost: number;
  utilization: {
    cpuPercent: number;
    memoryPercent: number;
    idleHours: number;
  };
  jobs: {
    total: number;
    successful: number;
    failed: number;
    avgDurationMinutes: number;
  };
  dataosCluster: string;
  namespace: string;
  createdBy: string;
  createdAt: string;
}

export interface CreateClusterRequest {
  name: string;
  projectId: string;
  region: string;
  size: 'small' | 'medium' | 'large' | 'xlarge';
  instanceType?: string; // defaults to Graviton
}

// types/retention.d.ts
export interface RetentionPolicy {
  domainName: string;
  region: string;
  dataClassification: 'confidential-restricted' | 'need-to-know' | 'internal-use-only';
  retentionPeriodDays: number;
  policyStartDate: string;
  policyExpiryDate: string;
  daysRemaining: number;
  status: 'compliant' | 'expiring-soon' | 'action-required' | 'legal-hold';
  isLegalHold: boolean;
  auditHistory: Array<{
    timestamp: string;
    action: string;
    actor: string;
    details: string;
  }>;
}

export interface ExtensionRequest {
  domainName: string;
  region: string;
  extensionDays: 30 | 60 | 90 | 180 | 365;
  justification: string; // min 50 chars
}

// types/observability.d.ts
export interface ObservabilityData {
  cost: {
    totalMonthly: number;
    changePercent: number;
    byResourceType: Record<'storage' | 'compute' | 'orchestration', number>;
    byRegion: Record<string, number>;
    trend: Array<{ month: string; amount: number }>;
  };
  utilization: {
    storage: { usedTb: number; staleTb: number; stalePercent: number };
    compute: { avgCpuPercent: number; avgMemoryPercent: number; idleHours: number };
    orchestration: { successRate: number; workersUp: number; workersTotal: number; avgDurationMin: number };
  };
  lifecycle: {
    active: number;
    idle: number;
    stale: number;
    deprecated: number;
  };
  recommendations: Array<{
    type: 'scale-down' | 'cleanup' | 'right-size';
    resource: string;
    description: string;
    potentialSavings: number;
  }>;
}

// types/alert.d.ts
export interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  resource: string;
  resourceType: 'storage' | 'compute' | 'orchestration';
  region: string;
  message: string;
  timestamp: string;
  actionUrl?: string;
  actionLabel?: string;
}

// types/orchestration.d.ts
export interface AirflowEnvironment {
  projectId: string;
  region: string;
  airflowVersion: string;
  dataosCluster: string;
  namespace: string;
  airflowUiUrl: string;
  executor: 'KubernetesExecutor' | 'CeleryExecutor';
  components: {
    scheduler: { status: 'running' | 'degraded' | 'down'; replicas: number; lastHeartbeat: string };
    webserver: { status: 'running' | 'degraded' | 'down'; replicas: number; responseTimeMs: number };
    workers: { healthy: number; total: number };
    metadataDb: { status: 'running' | 'down'; engine: string; region: string };
    broker: { status: 'running' | 'down'; type: string; connections: number };
  };
  dagSummary: {
    active: number;
    paused: number;
    totalRuns7d: number;
    successRate: number;
    avgDurationMinutes: number;
  };
  estimatedMonthlyCost: number;
  createdBy: string;
  createdAt: string;
}

export interface AirflowDag {
  dagId: string;
  projectId: string;
  schedule: string; // cron expression
  scheduleDescription: string; // human-readable
  status: 'active' | 'paused';
  lastRun: {
    executionDate: string;
    durationMinutes: number;
    state: 'success' | 'failed' | 'running' | 'queued';
  } | null;
  nextRun: string | null;
  runs7d: {
    total: number;
    successful: number;
    failed: number;
    successRate: number;
    recentStates: Array<'success' | 'failed'>; // last N runs for sparkline
  };
  airflowUiUrl: string;
}
```

---

## API Integration Map

| MFE Page | API Endpoint | Method | Description |
|----------|-------------|--------|-------------|
| Overview | `/v2/overview/{projectId}` | GET | Summary of all resources |
| Storage | `/v1/domains/{tenantKey}` | GET | List domains (existing, + region) |
| Storage | `/v1/domains` | POST | Create domain (existing, + region) |
| Storage | `/v1/domains/{name}/resources` | GET | Domain resources (existing) |
| Storage | `/v2/lifecycle/retention/{domainName}` | GET | Retention policy for domain |
| Storage | `/v2/lifecycle/extension` | POST | Submit extension request |
| Compute | `/v2/compute/clusters/{projectId}` | GET | List compute clusters |
| Compute | `/v2/compute/clusters` | POST | Create compute cluster |
| Compute | `/v2/compute/clusters/{clusterId}` | GET | Cluster detail + metrics |
| Compute | `/v2/compute/clusters/{clusterId}` | PATCH | Update cluster config |
| Orchestration | `/v2/orchestration/airflow/{projectId}` | GET | Airflow environment health & config |
| Orchestration | `/v2/orchestration/airflow/{projectId}/dags` | GET | List DAGs with run history |
| Observability | `/v2/observability/{projectId}` | GET | Cost, utilization, lifecycle |
| Observability | `/v2/alerts/{projectId}` | GET | Active CNS alerts |
| Observability | `/v2/compliance/{projectId}` | GET | Regional compliance status |

---

## Implementation Priority

| Phase | Components | Target |
|-------|-----------|--------|
| **Phase 1: Region Foundation** | RegionBadge, RegionFilter, updated DomainListItem, updated CreateDomainModal | Week 1-2 |
| **Phase 2: Compute Page** | ComputePage, ComputeClusterCard, CreateClusterModal, ClusterDetails | Week 3-4 |
| **Phase 3: Overview Dashboard** | OverviewDashboard, ResourceCountCard, CostSummaryWidget, ComplianceStatusWidget | Week 5-6 |
| **Phase 4: Retention Integration** | RetentionTab, RetentionExtensionModal, ClassificationBadge, ComplianceBadge | Week 7-8 |
| **Phase 5: Orchestration** | Updated OrchestrationPage (OSS Airflow env, DAG list, component health) | Week 9-10 |
| **Phase 6: Observability** | ObservabilityPage, charts, alerts, lifecycle recommendations | Week 11-12 |

---

## Change Log

| Version | Description | Author | Date |
|---------|-------------|--------|------|
| 0.1 | Initial mockup specifications | Abhilash Achar | 2026-02-11 |
| 0.2 | Strategy change: Orchestration updated from Temporal to OSS Airflow on DataOS | Abhilash Achar | 2026-02-11 |

---

*Document maintained by AD Platform Infrastructure Triad*
