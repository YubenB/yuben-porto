---
slug: hexa-dashboard
title: Hexa.Dashboard
category: Operational Intelligence / Analytics Platform
excerpt: A self-hosted analytics workspace that turns fragmented forestry data into governed metrics, spatial analysis, reusable dashboards, and evidence-backed insights.
stack:
  - Go
  - Svelte 5
  - SvelteKit 2
  - TypeScript
  - SQLite
  - Apache ECharts
  - MapLibre GL
  - Playwright
  - GitLab CI/CD
images:
  - /images/projects/hexa-dashboard/overview.png
  - /images/projects/hexa-dashboard/ai-analyst.png
  - /images/projects/hexa-dashboard/data-studio.png
  - /images/projects/hexa-dashboard/map-layers.png
  - /images/projects/hexa-dashboard/my-dashboard.png
  - /images/projects/hexa-dashboard/data-explorer.png
  - /images/projects/hexa-dashboard/visualization-library.png
  - /images/projects/hexa-dashboard/detailed-visualization-library-template.png
  - /images/projects/hexa-dashboard/report-library.png
  - /images/projects/hexa-dashboard/detailed-report-library-template.png
  - /images/projects/hexa-dashboard/performance-through-the-months.png
  - /images/projects/hexa-dashboard/mill-delivery-performance.png
---

Hexa.Dashboard is a standalone operational intelligence platform designed to make complex forestry data understandable, traceable, and useful. It connects information from nursery, plantation, research, harvesting, transportation, and mill delivery in one governed analytics workflow.

## The challenge

Forestry operations generate data across different systems, estates, contractors, process stages, and reporting periods. These sources often use different structures and calculation rules, which makes consistent reporting difficult.

Traditional dashboards can also hide serious risks. Unsafe joins can duplicate measures, failed refreshes can leave users with incomplete data, broad permissions can expose cross-estate information, and AI-generated explanations can become impossible to verify.

## The solution

I helped build a controlled analytics pipeline that validates incoming data and stores each successful import as an immutable snapshot. Typed semantic models define safe joins and calculations, while a reusable Metric Catalog keeps business definitions consistent across dashboards and reports.

Every query is scoped to the active user before data is joined, aggregated, or serialized. Unsafe relationships, ambiguous coordinates, malformed geometry, and incompatible metric changes are rejected instead of producing misleading output.

The workspace supports CSV, JSON, and approved HTTPS sources. Users can explore data, author dashboards, schedule refreshes, export results, and work with 30 registered visualization types. These include 26 analytical views powered by ECharts and four spatial views powered by MapLibre.

## Evidence-first analysis

The built-in analyst can answer supported operational questions without requiring an external language model. Each response retains the executed query, filters, authorized aggregates, comparison context, and snapshot lineage.

Optional AI providers can help plan an analysis or select existing server-generated observations. They cannot submit SQL, change a user's access scope, choose an unauthorized model, or invent executable calculations. The Go backend validates the typed plan and produces the numerical explanation from authorized evidence.

## Technical decisions

- **Governed metrics:** Versioned definitions can be reused across widgets without copying calculation logic.
- **Safe modelling:** Composite-key validation prevents joins that would silently multiply measures.
- **Reliable refreshes:** A failed refresh keeps the last known good snapshot available and applies bounded retry backoff.
- **Private spatial data:** Geometry is filtered by estate and reporting scope before it reaches the browser.
- **Offline-capable maps:** MapLibre, its worker, base styles, and a coarse land overview ship with the application.
- **Simple operations:** The production application runs as one Go executable with static Svelte assets and embedded SQLite storage.

## My contribution

I contributed across product definition, application architecture, backend and frontend implementation, semantic data modelling, visualization infrastructure, geospatial capabilities, AI integration, security controls, testing, and delivery automation.

My focus was making sophisticated analytics understandable and deployable without introducing unnecessary infrastructure complexity. That included defining platform boundaries, protecting calculation integrity, designing authorization-aware data flows, and validating complete browser journeys.

## Outcome

- Delivered **30 registered visualization types**, including 26 analytical views and four spatial views.
- Implemented governed access for **five user roles** with estate-level grants.
- Modelled a synthetic showcase with **720 forestry facts**, nine semantic models, and six report templates.
- Verified **15 compiled-application browser journeys** across analytics, GIS, administration, AI configuration, responsive layouts, and authentication.
- Packaged production as a standalone Go application with no Node.js server, Docker requirement, or external database server.

The result is a compact analytics foundation that combines reusable metrics, dashboard authoring, offline GIS, scheduled refreshes, secure data access, and evidence-backed analysis in one deployable workspace.
