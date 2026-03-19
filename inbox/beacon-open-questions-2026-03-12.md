## Open Questions — Beacon System Model (2026-03-12)

*From sync with Nitin Kakkar & Kevin Sebastian*

| # | Open Question | Raised By | Owner | Status | Notes |
|---|---|---|---|---|---|
| 1 | **Runtime System vs Control Plane separation** — When Data Lake is modeled as one system, all relationships propagate to the control plane (e.g., control plane gets deployed in-region). How should runtime systems be separated from control plane services in the Beacon system model? | Kevin Sebastian | TBD (need guidance from Beacon/IDP team) | 🔴 Open | Kevin acknowledged he doesn't know the answer. Need to seek ASM/BSM guidance from IDP admin team. |
| 2 | **Business Service ID gaps** — Some systems don't have a Business Service ID. How should systems without a BSID be handled in the system model? | Kevin Sebastian | Abhilash / Nitin | 🔴 Open | CDL does have a BSID; other systems may not. Need to audit and decide on registration approach for systems lacking BSIDs. |
| 3 | **Centralized service representation in BSM/ASM** — How should centralized services (shared across regions but part of the same product) be represented in the Business Service Model / Application Service Model? | Abhilash / Nitin | TBD (need BSM/ASM guidance) | 🔴 Open | Neither Abhilash nor Nitin knows the correct representation. Kevin's guidance: follow the system model standard and adjust after registration. |
| 4 | **Capability-level reporting granularity** — Reporting should be at the capability level (Storage, Access, Query, Compute), not individual service level. Implementation details like KMS encryption should collapse under Storage. | Abhilash / Nitin | Abhilash | 🟡 Agreed in principle | Bottom-up inventory exists (repo-based); need to formalize top-down capability taxonomy for external reporting. |
| 5 | **Cloud OS team pushback on account requests** — Cloud OS is pushing back on how new accounts are being requested. Nitin is currently blocked. | Nitin Kakkar | Nitin Kakkar | 🔴 Blocked | Meeting with Cloud OS team at 10am (2026-03-12). Nitin to update Abhilash on outcome. |
| 6 | **Delivery timeline per capability** — Need start and end dates for each capability (Storage, Access, Query, Compute) to report progress externally. No timeline plan created yet. | Abhilash Achar | Abhilash / Nitin | 🔴 Open | Will report at capability level, not service level. Requires alignment on scope per capability. |
| 7 | **Minimum PR for account registration** — What is the bare minimum YAML content needed for the initial PR to get accounts provisioned? Agreed to submit a minimal PR first, then iterate. | Nitin Kakkar | Nitin / Abhilash | 🟡 Pending (after Cloud OS meeting) | Kevin's guidance: "Register first, then tweak." PR exists; scope down to essentials post-Cloud OS sync. |

### Agreed Actions

| Action | Owner | Timeline |
|---|---|---|
| Create bare-minimum PR after Cloud OS meeting outcome | Nitin / Abhilash | Today (2026-03-12) |
| Seek BSM/ASM guidance on centralizing services and runtime vs control plane split | Abhilash | This week |
| Define capability-level reporting taxonomy (Storage, Access, Query, Compute) | Abhilash | This week |
| Create delivery timeline with start/end dates per capability | Abhilash / Nitin | This week |
| Update Abhilash on Cloud OS meeting outcome | Nitin | Today (2026-03-12) |
