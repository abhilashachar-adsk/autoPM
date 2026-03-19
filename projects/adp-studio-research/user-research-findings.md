# ADP Studio — User Research Interview Highlights

---

## Interview Insights Digest

- **Participants:**

    - 2 participants representing distinct personas — data consumer and data publisher (sample size is small but each interviewee was chosen to represent a different end of the user spectrum)
    - Rio Wei — Data Analyst, COO - Marketing Analytics (data consumer)
    - Ashwini Joshi — Data Publisher / Data Engineer (data publisher)

- **Interviewer:** Abhilash Achar (PM, Platform Infrastructure)

- **Date:** March 2026

- **PRD:** [ADP Studio for Query, Data Analysis, and Workflow Development](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333819421)

- **Finding 1: AI tools are fragmenting the data analysis workflow — users combine ChatGPT, Cursor IDE, and ADP Studio's Query Assistant across a single analysis task**

    - Users gravitate toward whichever AI feels most capable in the moment — not necessarily the governed one. Queries run in Cursor bypass ADP Studio entirely, creating governance blind spots, security risks, and no audit trail. Despite this, ADP Studio adoption is real and growing.
    - Recommendation: Position ADP Studio as the **governed AI layer** — the execution backbone that AI tools route through — rather than competing with general-purpose AI tools on the frontend. The [Unified Infrastructure MCP Server PRD](https://autodesk.atlassian.net/wiki/spaces/~7120209934271da8d2458dbf161d06b5ffa685/pages/745544869) already moves in this direction, exposing ADP Studio capabilities (schema discovery, query execution, SQL generation) as MCP tools that Cursor, Claude, and Autodesk Assistant can invoke. Users get the AI tool they prefer; we get governance, lineage, and security.

- **Finding 2: Stakeholders arrive with vague analytics questions that AI cannot yet handle — analysts must still step in to shape the question**

    - End users "don't want to go too deep into the SQL, they just want answers from data" — but current AI tools, including the Query Assistant, assume the user already knows what to ask. Rio explicitly said "we're not there yet" for AI to handle vaguely defined questions.
    - Recommendation: Build a "Question Framing" mode in Query Assistant — a guided conversation that narrows a vague intent ("understand user engagement") into a specific, executable question ("show me MAU by product for the last 6 months, broken down by region").

- **Finding 3: Data publishers are underserved — they need visibility into who uses their data, what changed, and how to support migrations**

    - Publishers have zero visibility into dataset consumers, no change detection, and no migration support. The PRD's primary persona is "Data Analyst" (consumer). Data publishers are not represented.
    - Recommendation: Consider a "Publisher View" in ADP Studio with usage analytics per dataset, table change history, and consumer impact analysis. The ADP Studio Usage Dashboard project already has backend queries for some of this data.

- **Finding 4: ADP Studio's AI experience lags behind Cursor IDE across the build phase — from query writing to visualization to dashboarding**

    - Cursor provides inline code generation, automatic visualization, and persistent memory in one interface. ADP Studio requires users to switch between the chat widget, the editor, and the results panel. Users are building dashboards in Cursor — an IDE, not a BI tool — which signals significant friction in ADP Studio's dashboard creation.
    - Recommendation: 1) Inline AI completions (Copilot-style SQL suggestions); 2) "Generate & Run" mode for Assistant-generated SQL; 3) Auto-suggest visualizations based on data shape; 4) NL-to-Dashboard from a single prompt.

- **Finding 5: Debugging means data quality, not just SQL syntax — users need observability in their query results**

    - Users use AI for data quality checks — row counts, missing days, completeness — not just syntax fixes. Ashwini asked for automated change detection: "from this particular timestamp onwards, the source has changed the data from this to this." ADP Studio's "Ask AI to Fix" handles syntax but not data quality.
    - Recommendation: Offer automated data quality insights after query execution (completeness, anomalies, null percentages) and AI-powered query search ("find my query that calculated monthly churn by region").

---

## Findings by Journey Phase

The 10 stages from the Use Case 1 user journey are consolidated below into four overarching phases: **Discover** (finding and understanding data), **Access** (getting into the tool and connecting), **Build** (writing queries, executing, visualizing, and dashboarding), and **Maintain** (storing work, debugging, and assuring quality).

| Phase | PRD Requirement | AI Usage | Highlight | Lowlight | Opportunity |
|-------|----------------|----------|-----------|----------|-------------|
| **Discover** — Search Data Catalog, Lookup Terms, Open Data Product Details | *Navigation:* "I want to be able to refer metadata from the data catalog, so that I completely understand Data Quality, Sample SQL, and answer any other data discovery questions." *Navigation:* "I want to be able to search for specific tables or columns, so that I can quickly find the data I need." | Rio uses ChatGPT to frame exploratory questions *before* searching — feeding it behavioral data context and historical project notes to brainstorm possible metrics. This happens entirely outside ADP Studio. She is essentially doing data discovery through conversation rather than browsing a catalog. | Rio's team is actively using the Data Catalog and ADP Studio together. The Catalog Browser enrichment features (example Q&A, column descriptions) are working as designed. The Catalog Browser provides schema browsing, table descriptions, and column metadata. | Ashwini's team has no visibility into who is using their published datasets or how — critical for the ADP-to-EDH migration: "I do not have absolutely 0 information" about Hive users. Ashwini's primary pain is understanding **table evolution** — how data definitions change over time, what source changes occurred, and communicating those changes to consumers. "I was looking at the data yesterday. My data was showing XYZ, how it changed." The current Data Catalog is a snapshot, not a timeline. | **Usage Analytics per Dataset** — Surface query counts, top users, and last-accessed timestamps in the Data Catalog view. Directly addresses the publisher's need to understand consumers and is a prerequisite for the ADP-to-EDH migration. **Table Change History** — Show a changelog for table definitions (schema evolution, source changes, row count trends) in the Catalog view. Ashwini described this as an "everyday" need. |
| **Access** — Login via SSO, Open ADP Studio, Connect to Data Sources | *Access:* "I want to access and work the tool simply without having to step through pages." *Connectivity:* "I want seamless connectivity to data sources like data lake and snowflake, unlike the current experience wherein I have to set warehouse, role, and database." | Rio bypasses ADP Studio's connection entirely for AI-assisted workflows, using Cursor IDE which connects directly to datasets. "I've already talked to Cursor so many times. Cursor now knows what I'm referring to." Neither user mentioned access friction. | Rio's team has adopted ADP Studio actively — "We're using ADP Studio very actively lately." Team members are posting in Slack channels and building an internal wiki page to capture their experience. This signals strong organic adoption. ADP Studio's engine selector (Data-Lake-Prd, Snowflake-Prd) simplifies what used to be a multi-step connection process. | Users who rely on Cursor for analysis have built up a persistent context that ADP Studio's Query Assistant lacks. Cursor "remembers" past conversations and table contexts; ADP Studio does not. This persistent context is the key reason Rio defaults to Cursor over ADP Studio for query work. | **Session Memory for Query Assistant** — Introduce conversation persistence or workspace context so the Assistant can learn a user's frequent tables, preferred metrics, and analytical patterns over time. This directly competes with the advantage Cursor has today. Leverage Rio's team as a lighthouse customer — their internal wiki could be a rich source of community-generated content for the Data Catalog's "Example Questions" feature. |
| **Build** — Write SQL, Execute Query, Interpret Results, Create Dashboards | *SQL Editor:* "I want to be able to use tools that can help me write optimized SQL." *Visualization:* "I want to use out-of-the-box visualization to share with my stakeholders." *Dashboards:* "I want to be able to easily create dashboards with underlying data access that can be easily shared with my stakeholders." | **This is the phase where AI has the most disruptive impact.** Rio uses Cursor to write queries via natural language: "I want to do some analysis. Can you query the PhD underlying table and tell me the monthly active user?" Cursor generates and executes SQL on her behalf. Cursor also creates visualizations automatically as part of the analysis output — Rio described bar charts showing seasonality (higher weekday usage, lower weekends). Louise (Rio's colleague) builds full interactive dashboards in Cursor with filtering and drill-down capability. In ADP Studio, execution is still manual (click Run). | ADP Studio's Query Assistant already supports NL-to-SQL, SQL editing, and SQL fixing — the core capabilities Rio is using Cursor for. Execution in ADP Studio is fast, status indicators are clear, and query history provides easy re-run. ADP Studio dashboards support privacy levels, sharing, and multiple chart types. | **ADP Studio's Query Assistant is a chat widget; Cursor is a full IDE.** The experience gap is significant — Cursor provides inline code generation, multi-file context, visualization within the same interface, and persistent memory. ADP Studio requires the user to switch between the chat widget, the editor, and the results panel. Visualizations require manual configuration (choose chart type, configure axes, customize), while Cursor generates them contextually — "it creates pretty interesting visualizations" without the user configuring anything. Users building dashboards in Cursor (an IDE, not a BI tool) signals significant friction in ADP Studio's dashboard creation. | **Inline AI Completions** — Move beyond the docked chat widget toward inline SQL suggestions (like GitHub Copilot for SQL) to reduce context-switching. **Auto-Execute on Assistant-Generated SQL** — Offer an optional "Generate & Run" mode that executes generated SQL immediately (with confirmation). Reduces the 3-step process (generate → paste → run) to 1 step. **AI-Suggested Visualizations** — When results return, auto-suggest the most appropriate chart type and configuration based on data shape (time series → line, categorical → bar). One-click to accept. **NL-to-Dashboard** — "Create a dashboard showing monthly active users by product, with a date range filter." Generate SQL, execute, suggest visualization, assemble dashboard — all from a single prompt. |
| **Maintain** — Save Queries, Debug, Retrieve Versions, Data Quality | *SQL Editor:* "I want to be able to save and organize my SQL queries, so that I can easily access, share and reuse them in the future." *SQL Editor:* "I want to be able to use tools that can help me debug my SQL." | Rio uses Cursor for data quality checks — validating row counts, checking for blank days, confirming data completeness. "I want to get a row count for the command that users use... I don't have any blank bars, so that means every day I get data." No specific AI usage for query storage or versioning. | ADP Studio has query history, saved queries, and execution sharing. The "Ask AI to Fix" button on query errors is well-positioned for debugging. | Debugging goes beyond fixing syntax errors. Users want to debug **data quality** — missing days, unexpected nulls, source changes. This is closer to data observability than SQL debugging. Ashwini explicitly asked for change detection: "from this particular timestamp onwards, the source has changed the data from this to this." The PopSQL migration (360 users, 5,000+ queries) will test query organization at scale. | **Data Quality Checks in Results** — After query execution, offer automated data quality insights: completeness (are there gaps?), distribution anomalies, null percentages, cardinality checks. Consider AI-powered query search ("find my query that calculated monthly churn by region"). Ensure PopSQL import (GAP-11) preserves folder structures and query metadata. |

---

## Opportunities (Ranked by Impact)

| Priority | Opportunity | Phase | Effort | Impact |
|----------|------------|-------|--------|--------|
| P0 | MCP Server for IDE-native query execution (Cursor/Claude) | Build | High | Brings governed execution into the tools users already prefer |
| P1 | AI-suggested visualizations from query results | Build | Medium | Closes the biggest experience gap with Cursor |
| P1 | Question Framing mode in Query Assistant | Discover / Build | Medium | Unique differentiator; addresses the "vague question" problem |
| P1 | Dataset usage analytics for publishers | Discover | Medium | Unblocks ADP-to-EDH migration; serves publisher persona |
| P2 | Session memory / workspace context for Assistant | Access / Build | Medium | Matches Cursor's persistent context advantage |
| P2 | NL-to-Dashboard ("create a dashboard showing X") | Build | High | Would leapfrog Cursor for dashboard use cases |
| P2 | Table change history / schema evolution timeline | Discover | Medium | Everyday need for data publishers |
| P3 | Inline SQL completions (Copilot-style) | Build | High | Reduces context switching between Assistant and Editor |
| P3 | Auto-execute on Assistant-generated SQL | Build | Low | Small UX improvement with outsized productivity impact |
| P3 | Data quality checks on query results | Maintain | Medium | Bridges gap between SQL debugging and data observability |

---

## Synthesized Notes from Individual Sessions

### P1 — Rio Wei, Data Analyst, COO - Marketing Analytics (Data Consumer)

- Uses ChatGPT as a "thinking partner" — feeds it behavioral data context and historical project notes to brainstorm metrics and frame analytical questions before writing SQL
- Uses Cursor IDE as primary query tool — generates SQL from natural language, executes queries, produces visualizations automatically. "Cursor can do that on my behalf because I've already talked to Cursor so many times. Cursor now knows what I'm referring to."
- Cursor does "junior analyst work" — quality checks, visualizations, data completeness validation
- Colleague Louise builds full interactive dashboards with filtering directly in Cursor
- Team is actively using ADP Studio and posting in Slack channels — building internal wiki page to capture experience
- End users "don't want to go too deep into the SQL, they just want answers from data"
- Stakeholders "don't have ideas on what they want to know" — very exploratory, vague analytics questions
- "As of today, as an analyst, I would still want to jump in to help those people shape the question"
- "We're not there yet" for AI to handle vaguely defined questions
- Expressed gratitude for the team's work: "I just want to take this opportunity to thank you and the team to really work very hard on this"
- Team has internal wiki page to "sanitize our ideas and maybe prioritize what's most important things that we need to remain productivity"

### P2 — Ashwini Joshi, Data Publisher / Data Engineer (Data Publisher)

- Data publisher perspective — publishes and maintains data products, needs to understand table definitions and changes
- Daily pain is understanding data changes: "I was looking at the data yesterday. My data was showing XYZ, how it changed"
- Wants automated change detection: "from this particular timestamp onwards, the source has changed the data from this to this. That would be amazing"
- Envisions putting change detection into Slack for automatic user answers — "but that's a future one"
- "At least till the point like a primary analysis, if we could do, it would be such a helper"
- Zero visibility into dataset consumers — critical blocker for ADP-to-EDH migration
- ADP-to-EDH migration is not table-for-table: "It's not like X to X or Y to Y. It's a different scenario how we are building in EDH"
- Needs a tracker for migration — "I think this ADP Studio can help us out there"
- Data publisher use case: concerned with table definitions, how they've changed, communicating changes to consumers
- Quality assurance is an everyday need — "that is almost like every day"
- Was asked to share negative examples of what Query Assistant can't do in Snowflake — promised to follow up

---

## Interview Script

| **Section** | **Question #** | **Prompt/Question** | **Notes** |
| --- | --- | --- | --- |
| Intro | / | Thank you for taking the time to speak with us about your experience with ADP Studio. We'd like to understand how you work with data today, where AI fits into your workflow, and what's working or not working for you. This should take around 25-30 minutes. We'll start with structured questions and leave time for open-ended feedback. Do you have any questions before we start? Facilitator starts recording. |  |
| User Profile | 1 | Could you tell us about your role and how it relates to data analysis or data engineering? |  |
|  | 2 | What projects are you or your team currently working on? |  |
|  | 3 | How is your team structured around analytics / data work? |  |
|  | 4 | What are the most challenging parts of your job when it comes to working with data? (Top 3 challenges/pain points) Why? |  |
| ADP Studio Usage | 5 | You've used ADP Studio. Could you elaborate on your use case? |  |
|  | 6 | (Screen share) Could you show us how you use ADP Studio? Walk us through a typical workflow. |  |
|  | 7 | What aspects of ADP Studio are you most satisfied with? Could you elaborate on why? |  |
|  | 8 | What aspects of ADP Studio are you least satisfied with or find frustrating? Could you elaborate on why? |  |
| AI & Tooling | 9 | Are you using any AI tools (ChatGPT, Copilot, Cursor, etc.) in your data workflow today? If so, how? |  |
|  | 10 | (Screen share) Could you show us how you use AI tools alongside or instead of ADP Studio? |  |
|  | 11 | Where does AI help you the most? Where does it fall short? |  |
|  | 12 | How do you use the Query Assistant in ADP Studio? What works well? What doesn't? |  |
| Data Discovery & Catalog | 13 | How do you find the data you need? Walk us through your discovery process. |  |
|  | 14 | Do you use the Data Catalog in ADP Studio? What's helpful? What's missing? |  |
| Visualization & Sharing | 15 | How do you share results with stakeholders? What tools do you use for dashboards or visualizations? |  |
|  | 16 | What would an ideal experience for creating and sharing dashboards look like to you? |  |
| Data Quality & Maintenance | 17 | How do you check data quality? What tools or processes do you use? |  |
|  | 18 | How do you understand when data has changed or what changed? |  |
| Wishlist | 19 | What is one feature or capability you'd really like to see in ADP Studio? |  |
|  | 20 | Magic wand question: If you could redesign the data analysis experience from scratch, what would it look like? |  |
| Conclusion | / | Thank you for the feedback. Open for any additional feedback or questions. Conclude session. |  |

---

## Appendix: Persona Mapping

| Research Participant | PRD Persona | User Journey | Key Use Case |
|---------------------|-------------|--------------|--------------|
| Rio Wei | Data Analyst (Use Case 1 — "Sarah") | SQL-based data analysis on ADP datasets | Behavioral analytics, MAU reporting, data quality checks |
| Ashwini Joshi | Data Publisher (not in PRD) | Publish and maintain data products; understand consumer impact | Table change detection, migration impact analysis, quality assurance |

---

## Appendix: PRD Requirement Gap Analysis

| PRD Requirement | Status | Research Evidence |
|----------------|--------|-------------------|
| Access — simple tool access | **Met** | No friction reported |
| Connectivity — seamless data source connection | **Partially Met** | Met for ADP Studio; users bypass it for Cursor-based workflows |
| Navigation — refer metadata from data catalog | **Met** | Catalog Browser is used actively |
| SQL Editor — auto-complete and syntax highlighting | **Met** | No complaints |
| SQL Editor — tools to debug SQL | **Partially Met** | "Ask AI to Fix" works; data quality debugging is unaddressed |
| SQL Editor — tools to write optimized SQL | **Partially Met** | Query Assistant generates SQL; no optimization suggestions |
| SQL Editor — history and change tracking | **Met** | Execution history works as designed |
| SQL Editor — save and organize queries | **Met** | Working; PopSQL migration will test at scale |
| SQL Editor — create dashboards for stakeholders | **Partially Met** | Available but less fluid than Cursor-based dashboard creation |
| Visualization — out-of-the-box charts | **Partially Met** | Available but requires manual configuration vs. AI-generated alternatives |
| Sharing — share with non-technical users | **Partially Met** | Dashboard sharing works; stakeholders still need analyst help to frame questions |

---

*Last Updated: 2026-03-17*
*Related Projects: [[PopSQL → ADP Studio Migration]], [[Unified Infrastructure MCP Server — PRD]], [[ADP Studio Usage Dashboard]]*
