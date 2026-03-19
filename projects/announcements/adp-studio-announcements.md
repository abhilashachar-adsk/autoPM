# ADP Studio Announcements

## Announcement 1: Query Assistant — New Feature

:sparkles: **Introducing Query Assistant — AI-Powered Data Analysis in ADP Studio**

Analytics Data is excited to announce the **Query Assistant**, a new AI-powered feature in ADP Studio that helps anyone get answers from data — even without SQL experience.

**What can you do with it?**

- :speech_balloon: **Ask in plain English** — Describe the data you need ("Show me top 10 warehouses by cost last month") and the assistant writes the SQL for you
- :wrench: **Fix errors instantly** — When a query fails, click "Ask AI to Fix" and the assistant corrects it automatically
- :mag: **Understand any query** — Ask the assistant to explain what a complex query does in plain language
- :card_file_box: **Discover data** — Find relevant tables across Data Lake and Snowflake without knowing exact table names

The assistant works with both **Data Lake (Trino)** and **Snowflake** — just select your query engine and start asking.

**Try it now:** [data.autodesk.com/query-experience](https://data.autodesk.com/query-experience) → click the **Assistant** icon (bottom right)

**Resources:**
:book: [Query Assistant User Guide](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/729522869)
:speech_balloon: [Support & Feedback — #ad-query-support](https://autodesk.enterprise.slack.com/archives/C099A91SXAN)

:raised_hands: A huge shoutout to our engineering team — Trupal Patel, Riya Sanjay Loya, Harivams Sai Gudalwar, Mohit Arora — and leadership from Sankalp Vairat, Sarang Kejriwal, and tariq siddiqui for making this happen.

---

## Announcement 2: ADP Studio — What's New & What's Next

:rocket: **ADP Studio Update — Improvements Now in Production**

Since the ADP Studio preview launch in August 2025, we've shipped a wave of improvements based on your feedback. Here's what's new, what's better, and what's coming.

---

**New Capabilities Now Available:**

:star: **AI-Powered Query Assistant**
Ask questions in plain English and get SQL generated for you. The assistant discovers the right tables, writes queries in the correct dialect, fixes errors, and explains complex SQL — all within ADP Studio. Powered by Autodesk Assistant.

:star: **Snowflake Support**
Query both **Data Lake** and **Snowflake** environments from a single interface. Switch engines with one click — your SSO credentials work seamlessly across both.

:star: **Catalog Browser**
Browse all available schemas, tables, and columns across Data Lake and Snowflake directly in ADP Studio. Add descriptions and example questions to help the AI assistant generate better queries for your team's data.

:star: **Resizable Dashboards**
Create charts from query results and organize them into dashboards with new resizing and layout controls. Share privately or make them available to your team.

---

**What's Better:**

| What You Told Us | What We Fixed |
|------------------|--------------|
| "Autocomplete is slow" | Faster autocomplete with caching and better column/table suggestions |
| "Snowflake queries hang" | Fixed long-running Snowflake query timeouts |
| "CTE queries break" | Common Table Expressions now work reliably |
| "Can't share dashboards" | Fixed dashboard sharing user lookup |
| "Search doesn't find my tables" | Improved search accuracy across table and query results |
| "Assistant suggests tables I can't access" | SQL generation now respects your actual permissions |
| "App feels slow under load" | Increased production capacity and resolved background task bottlenecks |

---

**Rolling Out Soon:**

- **Multiple Scratchpads** — Work across multiple SQL tabs, each with its own state. Plus a reusable **SQL Snippets** sidebar for common patterns.
- **Smoother Engine Switching** — Changing query engines now auto-updates the catalog browser without a page refresh.
- **Better Chart Rendering** — Fixed date and number formatting in visualizations.

---

**What's Coming Next:**

| Feature | What It Means for You | Timeline |
|---------|----------------------|----------|
| **Workspaces & Collaboration** | Organize, share, and reuse queries with tabs, file management, and GitHub integration | FY27 Q1-Q2 |
| **PopSQL Migration** | Your saved PopSQL queries will be automatically migrated to ADP Studio | FY27 Q1 |
| **Notebook Environment** | Combine SQL with programmatic analysis for deeper data exploration | FY27 Q2 |
| **Enhanced Dashboards** | Editable charts, auto-refresh, and richer visualization widgets | FY27 Q2 |
| **AI Query Optimization** | See cost estimates before running queries and get performance recommendations | FY27 Q2 |
| **Looker & Power BI** | Self-service BI tool connections via SSO directly from Data Portal | FY27 Q2 |

---

**Try it:** [data.autodesk.com/query-experience](https://data.autodesk.com/query-experience)
**Get help:** [#ad-query-support](https://autodesk.enterprise.slack.com/archives/C099A91SXAN)
**User guides:** [ADP Studio](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/333930171) | [Query Assistant](https://autodesk.atlassian.net/wiki/spaces/CPDDPS/pages/729522869)

Your feedback shapes what we build — keep it coming.

:raised_hands: Thank you to the ADP Studio team — Harivams Sai Gudalwar, Mohit Arora, Riya Sanjay Loya, Trupal Patel, Gandhar Tandale, Naga Ashok Reddy Bommareddy — and leadership from Sankalp Vairat, Sarang Kejriwal, tariq siddiqui, and Vaishak Suresh for the continued investment in making data accessible to everyone at Autodesk.
