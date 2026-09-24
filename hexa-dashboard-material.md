Berikut paket lengkap untuk `hexa-dashboard`, berdasarkan source, dokumentasi, dan verification evidence di repository.

## Recommended project title

**Hexa.Dashboard — Standalone Operational Intelligence and Analytics Workspace**

Alternatif:

- **Hexa.Dashboard — Embedded Business Intelligence Platform**
- **Hexa.Dashboard — Forestry Operations Analytics Platform**
- **Hexa.Dashboard — Secure Self-Hosted Analytics Workspace**
- **Hexa.Dashboard — Data, Spatial, and AI-Assisted Analytics Platform**

## One-line description

Hexa.Dashboard is a self-hosted operational intelligence platform that combines data ingestion, semantic modelling, reusable metrics, dashboards, spatial analytics, and governed AI-assisted analysis in a lightweight standalone application.

## Short brief

Hexa.Dashboard is a standalone analytics workspace designed initially for end-to-end forestry operations, covering nursery, plantation, research, harvest, transportation, and mill delivery.

It combines data ingestion, governed semantic models, reusable metrics, 30 visualizations, offline-capable maps, dashboard authoring, scheduled refresh, role-based access, and evidence-backed AI analysis. The production application runs as one Go executable with static Svelte assets and an embedded SQLite database—without requiring Node.js, Docker, or a separate database server.

## Long portfolio description

Hexa.Dashboard is a self-hosted operational intelligence and analytics platform designed to turn fragmented operational data into understandable, traceable, and actionable insights.

The first product journey focuses on forestry operations. It connects information across nursery, plantation, research, harvesting, transportation, and mill delivery activities, allowing users to analyse performance across estates, periods, process stages, and operational datasets.

Unlike a static reporting portal, Hexa.Dashboard includes a complete bounded analytics workflow. Users can upload CSV or JSON data, configure approved HTTPS data sources, define typed datasets, create governed semantic models, reuse centrally defined metrics, build visualizations and dashboards, inspect lineage, export data, and schedule source refreshes.

The platform provides 30 registered visualization types: 26 analytical visualizations powered by ECharts and four spatial views powered by MapLibre. Available views include KPI cards, tables, pivots, line and area charts, waterfall charts, Sankey diagrams, Pareto charts, heatmaps, histograms, box plots, treemaps, radar charts, gauges, scatter and bubble charts, plus point, bubble, region, and path maps.

A shared visualization registry describes each visualization’s renderer, required fields, supported data shapes, configuration controls, defaults, and capabilities. Both the Go backend and Svelte frontend use this contract, preventing unsupported chart configurations from reaching the browser.

The Metric Catalog introduces reusable and versioned business calculations. Authors can define a metric once, control its permitted dimensions, validate it against a semantic model, and bind it to multiple widgets. Dashboards always resolve the current approved definition while retaining metric and version information in their lineage. Optimistic versioning and transactional dependency validation prevent incompatible model or metric changes from silently breaking saved dashboards.

Spatial analytics follow the same authorization boundaries as ordinary queries. Administrators and data stewards can import bounded GeoJSON layers, while point and bubble maps can use validated coordinate fields from existing models. Geometry is filtered by the current user’s estate and period scope before it is serialized. Ambiguous coordinates, mismatched estates, malformed geometry, duplicate keys, and unsupported coordinate systems are rejected instead of being plotted inaccurately.

The default map experience works offline. MapLibre, its worker, styles, and a coarse Natural Earth land overview are bundled with the application. Organizations may configure an approved public raster background, but customer geometry and calculated business values are never sent to that service.

Hexa.Dashboard also provides an evidence-based analyst experience. A local Go planner can answer supported operational questions without an external language model. Each analysis retains the executed query, filters, authorized aggregates, comparison context, snapshot lineage, and synthetic-data status.

Optional AI providers include Ollama, vLLM, compatible chat-completion services, and the native Hexa.AI Solution Invocation protocol. AI is treated as an untrusted planner rather than a database authority. It cannot supply SQL, change the user’s scope, select an unauthorized model, or invent executable calculations. Go validates the complete typed plan, executes it against authorized data, and generates the numerical explanation. AI-assisted highlights may select only existing server-generated observations.

Security is enforced on the server. Hexa.Dashboard supports owner, administrator, data steward, analyst, and viewer roles, along with estate-level access grants. Every request re-resolves the active user and their permissions. Input snapshots are authorized before joins and aggregation. Mutations require valid Origin and CSRF evidence, sessions are stored server-side, and sensitive credentials never reach the browser.

Operationally, the application is deliberately simple. SvelteKit generates the frontend, while a Go application serves the compiled UI, authenticated API, embedded SQLite database, and refresh scheduler. Production requires only one executable, its static assets, and a writable data directory. Bun and Go are build tools rather than runtime dependencies.

Background refresh uses durable leases, bounded scheduling, failure backoff, schema-drift protection, and immutable snapshots. A failed refresh preserves the last known good snapshot rather than replacing it with incomplete or invalid data.

The project is delivered through GitLab CI and Hexa.Build. Exact-source Change Proposals are validated in disposable workspaces before merge. Accepted releases are built immutably, activated behind HTTP health verification, and can be rolled back without using the developer checkout as runtime state.

## Core capabilities

### Data ingestion

- CSV and JSON upload
- Nested JSON flattening with strict validation
- Approved HTTPS data-source adapters
- Named server-side credentials
- Typed field inference and validation
- Immutable source snapshots
- Schema-drift detection
- Snapshot lineage and refresh history

### Semantic modelling

- Base datasets with up to two joins
- Composite join keys
- Left and inner joins
- Estate-aware partitioning
- Unique-key validation to prevent multiplying measures
- Typed calculated fields
- Optimistic version control
- Model-impact validation

### Metrics and calculations

- Reusable Metric Catalog
- Versioned definitions
- Sum, average, minimum, maximum, count, and distinct count
- Ratio-of-sums calculations
- Allowed-dimension restrictions
- Preview under current reporting scope
- Dashboard dependency protection
- Metric and version lineage

### Dashboard authoring

- Query preview
- Widget reorder and resize
- Duplicate, undo, and redo
- Optimistic saving
- Unsaved-navigation protection
- Fixed estate and period scopes
- Saved dashboard links
- Print and CSV export
- Light, dark, and system themes
- Responsive desktop and mobile layouts

### Visualizations

- 26 ECharts analytical views
- Four MapLibre spatial views
- KPI and data tables
- Pivot tables
- Line, area, and column charts
- Sankey and waterfall
- Pareto and histogram
- Heatmap and box plot
- Scatter and bubble charts
- Treemap, radar, funnel, and gauges
- Point, bubble, region, and path maps

### AI-assisted analysis

- Local deterministic analyst without an LLM
- Follow-up questions
- Period comparisons
- Evidence tables
- Scoped chart pinning
- Scenario-sensitivity calculator
- Ollama integration contract
- vLLM and compatible endpoint contracts
- Native Hexa.AI Solution Invocation contract
- Explicit fallback or strict-failure policies
- Private analyst history

### Administration and security

- Five predefined roles
- Estate-level grants
- First-owner secure setup
- No default password
- Expiring server-side sessions
- Account suspension and session revocation
- Password changes
- Origin and CSRF validation
- Versioned branding and AI configuration
- Durable activity log

## Technical architecture

```text
 CSV / JSON files       Approved HTTPS sources
        │                       │
        └───────────┬───────────┘
                    ▼
             Go ingestion layer
                    │
       Validate → Type → Normalize
                    │
                    ▼
         Immutable SQLite snapshot
                    │
                    ▼
            Semantic data model
     Base data → Joins → Calculations
                    │
                    ▼
          Versioned Metric Catalog
                    │
          Authorize and calculate
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
   ECharts analytics      MapLibre GIS
          │                   │
          └─────────┬─────────┘
                    ▼
           Svelte dashboard UI
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
   Local Go analyst       Optional AI provider
                              │
                   Typed plan/evidence only
```

## Technology stack

| Area           | Technology                                                          |
| -------------- | ------------------------------------------------------------------- |
| Backend        | Go 1.25                                                             |
| Frontend       | Svelte 5, SvelteKit 2, TypeScript 5                                 |
| Toolchain      | Bun 1.3.14, Vite 8                                                  |
| Database       | Embedded SQLite with WAL                                            |
| SQLite driver  | Pure-Go `modernc.org/sqlite`                                        |
| Visualizations | Apache ECharts 6                                                    |
| Mapping        | MapLibre GL JS 6                                                    |
| Icons          | Lucide Svelte                                                       |
| Authentication | Server-side opaque sessions                                         |
| Security       | CSRF, Origin validation, RBAC, estate-level scope                   |
| AI providers   | Local analyst, Ollama, vLLM, compatible endpoints, Hexa.AI Solution |
| Testing        | Go race tests, Svelte checks, Playwright browser journeys           |
| Delivery       | GitLab CI and Hexa.Build                                            |
| Runtime        | Statically linked Linux Go executable and static assets             |
| Deployment     | Standalone process or immutable systemd-supervised release          |

## Measurable results

Safe portfolio claims:

- Delivered **30 registered visualization types**, consisting of 26 analytical views and four spatial views.
- Verified **15 compiled-application browser journeys** with no unexpected browser errors in the HD-004.2 local qualification.
- Preserved and modelled a synthetic showcase containing **720 forestry facts**, three 120-row sources, nine semantic models, and six report templates.
- Implemented access control for **five user roles** with estate-level data grants.
- Created a production package that requires no Node.js server, Docker container, or external database server.
- Added deterministic browser coverage for setup, navigation, analytics, dashboard editing, imports, AI settings, metrics, GIS, administration, branding, mobile layout, and sign-out.
- Qualified HD-004.1 through project verification, GitLab CI, accepted-main proof, immutable Runtime activation, HTTP health, and zero restart attempts.
- Merged HD-004.2 metrics and spatial analytics into `main`; its latest recorded evidence proves local qualification, while matching Runtime activation and owner acceptance remain separate.

## CV version

**Hexa.Dashboard — Operational Intelligence Platform**  
_Software Engineer / Product Engineer / Solution Architect — select according to your role_

- Designed and developed a standalone operational intelligence platform covering end-to-end forestry processes from nursery and plantation to harvesting, transportation, and mill delivery.
- Built a Go and SQLite analytics backend supporting typed ingestion, semantic models, composite joins, calculated fields, reusable metrics, snapshot lineage, and scheduled refresh.
- Developed a responsive SvelteKit dashboard studio with 30 analytical and spatial visualization types using ECharts and MapLibre.
- Implemented versioned Metric Catalog definitions with optimistic concurrency, dependency validation, authorized execution, and dashboard lineage.
- Engineered secure GeoJSON and coordinate-based mapping with estate-level filtering before geometry serialization.
- Built an evidence-based analyst supporting follow-up questions, comparisons, scenario analysis, local deterministic answers, and optional governed AI providers.
- Implemented five-role access control, estate grants, server-side sessions, Origin/CSRF protection, session revocation, and audited administrative actions.
- Packaged the application as a statically linked Go runtime with embedded SQLite and no required Node, Docker, or external database service.
- Established race-tested Go verification, strict Svelte checks, 15 Playwright browser journeys, GitLab CI, and immutable Hexa.Build Runtime delivery.

### Compact CV version

Built a standalone analytics platform using Go, SvelteKit, TypeScript, SQLite, ECharts, and MapLibre. Implemented data ingestion, semantic modelling, reusable metrics, 30 visualizations, offline GIS, secure dashboard authoring, scheduled refresh, role-based access, and evidence-backed AI analysis in a lightweight single-application runtime.

## LinkedIn project entry

**Hexa.Dashboard — Standalone Operational Intelligence Platform**

Hexa.Dashboard is a self-hosted analytics workspace designed initially for forestry operations across nursery, plantation, research, harvest, transportation, and mill delivery.

I worked across product architecture, backend and frontend development, data modelling, visualization, geospatial analytics, AI integration, security, testing, and governed delivery.

The platform supports CSV/JSON and approved HTTPS ingestion, semantic models, reusable versioned metrics, dashboard authoring, 26 ECharts visualizations, four MapLibre spatial views, evidence-backed analysis, scheduled refresh, estate-level access control, and operational auditing.

It is implemented with Go, SvelteKit, TypeScript, SQLite, ECharts, MapLibre, Bun, Playwright, GitLab CI, and Hexa.Build. Production runs as a single Go application with static web assets and embedded storage—without requiring Docker, Node.js, or a separate database server.

**Suggested skills:** Go, Svelte, TypeScript, SQLite, Data Visualization, Business Intelligence, Analytics Engineering, Geospatial Analytics, MapLibre, ECharts, Data Modelling, RBAC, AI Integration, Playwright, GitLab CI/CD.

## Personal website copy

### Hero

**Transforming operational data into governed, explainable intelligence**

Hexa.Dashboard is a standalone analytics workspace that brings together data ingestion, semantic modelling, reusable metrics, visualization, spatial analysis, and evidence-backed AI assistance.

### The challenge

Forestry operations generate information across multiple stages, systems, contractors, estates, and reporting periods. These datasets often use different structures and calculation rules, making it difficult to create consistent operational insights.

Traditional dashboards can also hide important risks: duplicated measures caused by unsafe joins, unrestricted access to cross-estate data, stale results after failed refreshes, and AI-generated explanations that cannot be traced to actual calculations.

### The solution

Hexa.Dashboard introduces a controlled analytics pipeline.

Incoming data is validated and stored as immutable snapshots. Semantic models define safe joins and calculations. Reusable metrics provide consistent business definitions. Every query is scoped to the active user before data is joined or serialized.

The resulting analytics can be explored through 30 registered visualizations, reusable dashboards, reports, exports, and offline-capable maps.

An evidence-first analyst provides understandable explanations, comparisons, follow-up questions, and scenario calculations. External AI may help plan an analysis or select existing observations, but it never controls authorization or executes arbitrary queries.

### My contribution

Adapt this to your actual involvement:

> I contributed to the product definition, application architecture, backend and frontend implementation, semantic data model, visualization system, geospatial capabilities, AI integration, security controls, testing strategy, and governed delivery workflow. My work focused on making sophisticated analytics understandable and deployable without introducing unnecessary infrastructure complexity.

### Outcome

The project produced a working standalone analytics foundation with 30 visualization types, reusable metrics, offline GIS, dashboard authoring, secure data access, scheduled refresh, and evidence-backed AI analysis.

The compiled application passed 15 browser journeys across desktop, mobile, light, dark, analytics, GIS, administration, and AI configuration scenarios. The production runtime requires only one Go executable, static web assets, and a writable data directory.

## Strong technical talking points

### Preventing incorrect analytics

Both sides of a join must have unique composite keys. Input data is scoped before blending, and unsafe one-to-many or many-to-many joins are rejected. Ratio metrics use raw totals instead of averaging displayed ratios.

### Preserving availability during refresh failures

Each successful refresh publishes an immutable snapshot. HTTP, parsing, or schema failures retain the previous working snapshot and apply bounded backoff.

### Controlling AI-generated analysis

The model may suggest only a typed query and supported visualization. Go validates the request, applies current authorization, performs the calculation, and generates the evidence-backed explanation.

### Securing geospatial information

Geometry is filtered by access scope, estate, period, and calculated group before reaching the browser. Uploaded values cannot override server-calculated metrics.

### Keeping deployment simple

The production runtime has no Node.js server, Docker requirement, Python service, or separate database server. SQLite and the refresh scheduler run inside the Go application.
