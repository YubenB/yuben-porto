I explored the repository and its current development state. Below is a reusable content kit for your CV, LinkedIn, portfolio, and personal website.

Important positioning: Hexa.Sensor is an advanced development-stage product, not yet a completed customer production deployment. Use “designed for” or “built to support” 1,500 devices—not “deployed to 1,500 devices.”

## Recommended project title

**Hexa.Sensor — On-Premise IoT and Real-Time Detection Platform**

Alternative:

**Hexa.Sensor — Vendor-Agnostic Industrial IoT Platform for Fleet and Field Operations**

## One-line description

Hexa.Sensor is a secure, on-premise IoT platform that connects heterogeneous field devices, normalises telemetry, detects operational conditions in real time, and exposes trusted data to dashboards, AI systems, GIS, and enterprise applications.

## Short brief

Hexa.Sensor is an on-premise, vendor-agnostic IoT platform designed initially for approximately 1,500 GPS trackers operating across forestry vehicles and heavy equipment. It provides device and asset management, configurable telemetry ingestion, live fleet monitoring, geofences, real-time rules and alarms, and secure enterprise integration—all through a single deployable Go application with an embedded Svelte administration console.

## Long portfolio description

Hexa.Sensor is an industrial IoT platform designed to become the single, trusted gateway between field devices and the wider Hexa ecosystem. Its first target use case is GPS fleet tracking for forestry operations, covering approximately 1,500 Teltonika and Sitepat devices installed on trucks, excavators, and other heavy equipment.

The project addresses a common enterprise problem: telemetry is often fragmented across vendor clouds, device protocols, scripts, brokers, and proprietary GIS components. Hexa.Sensor introduces a vendor-neutral integration layer so downstream applications no longer need to understand each device manufacturer’s API or payload format.

Every data source connects through a catalogued plugin. Incoming payloads pass through a configurable pipeline that validates records, resolves device identities, associates devices with assets and estates, applies storage policies, removes duplicates, and commits telemetry transactionally. Records are normalised into a canonical telemetry model while raw payloads and rejected records remain available for audit and diagnostics.

A key architectural feature is the ingest policy. High-frequency devices can continue reporting every five seconds to live views and the detection engine, while history is selectively thinned to a lower frequency. This preserves real-time operational fidelity without unnecessarily multiplying long-term storage requirements.

Detection happens close to the data. Hexa.Sensor supports PostGIS-backed geofences, configurable rule templates, and an alarm lifecycle covering raised, acknowledged, commented, and cleared states. Live telemetry and alarm changes are distributed through resumable Server-Sent Events, enabling responsive fleet maps and operational interfaces without introducing a separate message broker into the MVP architecture.

The administration console is built with SvelteKit and embedded into the Go binary. It includes device and asset workspaces, registry imports, plugin and device-type configuration, pipeline monitoring, live maps, per-device telemetry, geofence editing, alarm handling, security settings, and an operations wallboard. MapLibre provides the geospatial interface, including asset positions, trails, geofences, and alarm indicators.

Security is designed into the platform rather than added at the edge. Human access uses Argon2id-protected passwords and RFC 6238 TOTP multi-factor authentication. The platform also provides recovery codes, step-up authentication, tenant- and estate-scoped RBAC, scoped API credentials, append-only audit records, encrypted MFA secrets, CSRF protection, strict content-security policies, and secret-redacted structured logging.

Hexa.Sensor uses a modular-monolith architecture implemented in Go. It is deployable as a single binary and can run control-plane and ingestion responsibilities together or as separate roles. PostgreSQL 16 and PostGIS provide transactional storage, geospatial operations, daily telemetry partitioning, latest-state projections, raw-payload retention, and dead-letter diagnostics.

The current pipeline load proof processed 18,000 records across 1,500 simulated devices at approximately 2,888 records per second, with zero queue lag and a p95 batch-commit time of 996 milliseconds. This is roughly ten times the projected peak rate of a 1,500-device fleet reporting every five seconds.

The engineering workflow includes race-tested Go suites, database integration tests, Svelte and TypeScript checks, browser-based Playwright journeys, CSP and console-error validation, architecture dependency tests, GitLab CI, and immutable runtime releases managed through Hexa.Build.

## Key capabilities

- Device, device-profile, asset, estate, and assignment registry
- CSV-based bulk registration and validation
- Plugin catalogue for multiple ingestion sources
- Authenticated HTTP telemetry ingestion
- Configurable field mapping and ingest policies
- Telemetry validation, enrichment, deduplication, and dead-letter handling
- High-frequency live telemetry with selective historical storage
- Live fleet map, device trails, and per-device telemetry charts
- PostGIS-backed polygon and circular geofences
- Real-time rules, including speed, geofence, dwell, and sensor-range detection
- Alarm acknowledgement, comments, clearing, and audit history
- Resumable live updates using Server-Sent Events
- Tenant- and estate-scoped access control
- Password and TOTP multi-factor authentication
- Operational metrics, structured logs, health checks, and readiness checks
- On-premise deployment without a mandatory cloud dependency

## Technical architecture

```text
Devices and vendor systems
            │
            ▼
    Catalogue-based plugins
            │
            ▼
Decode → Validate → Resolve identity → Enrich
            │
            ▼
 Configurable ingest policy
  ├─ drop unwanted records
  ├─ thin historical storage
  └─ preserve live visibility
            │
            ▼
 Transactional PostgreSQL commit
  ├─ telemetry history
  ├─ latest device state
  ├─ raw payloads
  ├─ dead letters
  └─ processing watermarks
            │
            ├────────► Rules → Geofences → Alarms
            │
            └────────► SSE → Console and consumers
```

## Technology stack

| Area            | Technologies                                                                         |
| --------------- | ------------------------------------------------------------------------------------ |
| Backend         | Go 1.23, standard HTTP stack, pgx                                                    |
| Frontend        | Svelte 5, SvelteKit 2, TypeScript 5, Vite                                            |
| Runtime/tooling | Bun                                                                                  |
| Mapping         | MapLibre GL                                                                          |
| Database        | PostgreSQL 16, PostGIS 3.4                                                           |
| Data design     | Native daily partitioning, JSONB, GiST and BRIN indexes, UUIDv7                      |
| APIs            | REST/JSON, RFC 9457 Problem Details, Server-Sent Events, CSV, GeoJSON                |
| Security        | Argon2id, RFC 6238 TOTP, AES-256-GCM, RBAC, scoped API keys, CSRF and CSP            |
| Observability   | Prometheus metrics, structured JSON logging, health/readiness endpoints              |
| Testing         | Go race detector, unit and integration tests, Bun Test, Playwright, load testing     |
| Delivery        | GitLab CI, Docker Compose, systemd user services, Hexa.Build                         |
| Deployment      | Single-binary on-premise runtime with immutable releases, health gates, and rollback |

## Measurable results

Use these exact claims:

- Demonstrated approximately **2,888 telemetry records per second** across **1,500 simulated devices**.
- Completed an **18,000-record load run** with **zero final queue lag**.
- Recorded a **996 ms p95 batch-commit time** during the load proof.
- Verified the administration console through **24 Playwright browser journeys** with no console errors or CSP violations.
- Designed capacity for approximately **2.49 million telemetry records per day** under the default 1,500-device duty-cycle model.
- Reduced projected storage for five-second reporting by allowing history to be thinned to 30-second intervals while retaining full-rate live detection.

## CV version

**Hexa.Sensor — Industrial IoT Platform**  
_Software Engineer / Solution Architect / Product Engineer — choose the title that matches your actual role_

- Designed and developed an on-premise, vendor-agnostic IoT platform for GPS tracking and operational monitoring of a projected 1,500-device forestry fleet.
- Engineered a Go and PostgreSQL/PostGIS telemetry pipeline covering validation, identity resolution, asset attribution, configurable storage policies, deduplication, live streaming, and dead-letter diagnostics.
- Implemented real-time geofencing, typed detection rules, alarm lifecycle management, and a SvelteKit operations console with live maps and device-level telemetry.
- Delivered security controls including TOTP MFA, Argon2id password hashing, estate-scoped RBAC, encrypted secrets, scoped API credentials, and append-only auditing.
- Demonstrated approximately 2,888 records/second with 1,500 simulated devices, zero queue lag, and a 996 ms p95 batch-commit time.
- Established automated quality gates using Go race tests, database integration testing, Playwright browser journeys, GitLab CI, and immutable runtime releases.

### Compact CV version

Built an on-premise industrial IoT platform using Go, SvelteKit, PostgreSQL, and PostGIS. Designed a configurable telemetry pipeline, live fleet monitoring, geofences, rules, alarms, MFA/RBAC security, and immutable delivery workflow. Validated approximately 2,888 records/second across 1,500 simulated devices with zero queue lag.

## LinkedIn project entry

**Hexa.Sensor — On-Premise Industrial IoT Platform**

Hexa.Sensor is a vendor-agnostic IoT and real-time detection platform designed for enterprise field operations. Its first use case supports a projected fleet of approximately 1,500 GPS trackers across forestry trucks and heavy equipment.

I worked on the architecture and development of its device registry, telemetry-ingestion pipeline, configurable storage policies, live monitoring, PostGIS geofences, rule evaluation, alarm lifecycle, secure administration console, and governed delivery workflow.

The platform is built with Go, SvelteKit, TypeScript, PostgreSQL/PostGIS, MapLibre, Docker, GitLab CI, and Hexa.Build. A load proof sustained approximately 2,888 records per second across 1,500 simulated devices with zero queue lag.

**Suggested LinkedIn skills:** Go, Svelte, TypeScript, PostgreSQL, PostGIS, IoT, System Architecture, Geospatial Systems, API Design, Cybersecurity, DevOps, GitLab CI/CD, Load Testing, Real-Time Systems.

## Personal website copy

### Hero

**Turning fragmented field telemetry into trusted operational intelligence**

Hexa.Sensor is an on-premise IoT platform that connects devices and vendor systems, normalises their telemetry, detects operational events, and securely supplies live data to dashboards, GIS, AI, and enterprise applications.

### The challenge

Forestry field operations depend on heterogeneous trackers, vendor clouds, unreliable connectivity, manual data transfers, and disconnected monitoring tools. Each device family may use a different payload, identity model, protocol, or reporting interval. Direct integrations create duplicated logic and make it difficult to guarantee data quality, security, and operational visibility.

### The solution

Hexa.Sensor provides one integration boundary for every authorised device family. A plugin-based ingestion layer converts source-specific data into canonical telemetry. The platform then validates, enriches, filters, stores, and distributes that data through a consistent API and live event model.

The platform separates device connectivity from downstream consumers, allowing dashboards, GIS systems, AI applications, and enterprise integrations to work with one stable contract.

### My contribution

Use this version only after adjusting it to your real role:

> I contributed across product definition, system architecture, backend engineering, frontend development, security design, data modelling, testing, and delivery automation. My work included defining platform boundaries, designing the telemetry pipeline and storage model, implementing live operational interfaces, establishing security controls, and validating the platform through integration, browser, and load testing.

### Outcome

The resulting platform demonstrates a compact but scalable approach to industrial IoT: a single deployable application, transactional telemetry processing, real-time detection, an embedded operational console, and no mandatory cloud dependency.

Its load proof sustained roughly 2,888 records per second—around ten times the projected five-second reporting peak for the initial 1,500-device fleet.

## Interview talking points

If asked what made the project technically interesting:

- Buffered and out-of-order device data cannot be treated like normal web events.
- Device time and receipt time must be tracked separately.
- Latest state must never move backward when old records arrive.
- Storage costs can dominate compute costs at five-second reporting intervals.
- Geospatial detection requires both correct PostGIS modelling and fast live evaluation.
- Tenant and estate isolation must be enforced in database queries and live streams.
- Keeping the MVP brokerless reduced operational complexity while PostgreSQL supplied durability.
- Embedding the Svelte console inside the Go binary simplified on-premise installation.
