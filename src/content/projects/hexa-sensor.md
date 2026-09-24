---
slug: hexa-sensor
title: Hexa.Sensor
category: Industrial IoT / Real-Time Monitoring Platform
excerpt: An on-premise IoT platform that normalizes field telemetry, monitors fleets, detects operational events, and supplies trusted live data to enterprise systems.
stack:
  - Go
  - Svelte 5
  - SvelteKit 2
  - TypeScript
  - PostgreSQL 16
  - PostGIS
  - MapLibre GL
  - Server-Sent Events
  - Playwright
  - GitLab CI/CD
images:
  - /images/projects/hexa-sensor/live-map.png
  - /images/projects/hexa-sensor/overview.png
  - /images/projects/hexa-sensor/pipeline.png
  - /images/projects/hexa-sensor/alarms.png
  - /images/projects/hexa-sensor/device-detail-live.png
  - /images/projects/hexa-sensor/device-detail.png
  - /images/projects/hexa-sensor/devices.png
  - /images/projects/hexa-sensor/assets.png
  - /images/projects/hexa-sensor/assets-detail.png
  - /images/projects/hexa-sensor/device-types.png
  - /images/projects/hexa-sensor/device-type-detail.png
  - /images/projects/hexa-sensor/plugin-http-push.png
---

Hexa.Sensor is a vendor-agnostic industrial IoT platform for enterprise field operations. Its first use case supports GPS trackers installed across forestry trucks and heavy equipment, with an initial operating model of approximately 1,500 devices.

The platform connects devices and vendor systems, converts their payloads into canonical telemetry, detects operational events, and securely supplies live data to dashboards, GIS, AI, and enterprise applications.

## The challenge

Field operations depend on heterogeneous trackers, vendor clouds, unreliable connectivity, manual data transfers, and disconnected monitoring tools. Every device family may use a different payload, identity model, protocol, or reporting interval.

Telemetry also behaves differently from ordinary web traffic. Devices can buffer records, reconnect after long gaps, send duplicate messages, or deliver old events out of order. The platform has to preserve the correct latest state while retaining enough history for investigation and reporting.

## The solution

I helped design a single integration boundary for every authorized device family. A plugin-based ingestion layer decodes source-specific payloads and converts them into canonical telemetry. The pipeline then validates, resolves identity, attributes assets, enriches, deduplicates, and applies configurable storage policies before committing data transactionally.

PostgreSQL and PostGIS provide durable storage, geospatial operations, daily telemetry partitioning, latest-state projections, raw-payload retention, and dead-letter diagnostics. Resumable Server-Sent Events deliver live updates to the operational console without introducing a separate message broker into the initial architecture.

## Operational workflows

The embedded SvelteKit console brings the core fleet workflow into one place:

- Register devices, device profiles, assets, estates, and assignments.
- Import registry data through validated CSV workflows.
- Monitor ingestion plugins and telemetry pipeline health.
- Inspect device history and high-frequency live telemetry.
- Track assets, trails, geofences, and alarm indicators on a MapLibre map.
- Detect speed, dwell, sensor-range, and geofence violations in real time.
- Acknowledge, comment on, clear, and audit operational alarms.

## Security and reliability

Human access uses Argon2id-protected passwords and TOTP multi-factor authentication. Tenant and estate scope is enforced in database queries and live streams. Scoped API credentials, CSRF protection, strict content-security policies, encrypted MFA secrets, append-only audit records, and secret-redacted logging protect both administration and ingestion paths.

The deployment remains compact. A modular Go application can run control-plane and ingestion responsibilities together or as separate roles, while the Svelte console is embedded into the binary for on-premise installation.

## My contribution

I contributed across product definition, system architecture, backend engineering, frontend development, security design, data modelling, testing, and delivery automation.

My work included defining platform boundaries, designing the telemetry pipeline and storage model, implementing live operational interfaces, establishing security controls, and validating the system through integration, browser, and load testing.

## Outcome

- Demonstrated approximately **2,888 telemetry records per second** across **1,500 simulated devices**.
- Completed an **18,000-record load run** with zero final queue lag.
- Recorded a **996 ms p95 batch-commit time** during the load proof.
- Verified the administration console through **24 Playwright browser journeys** with no console errors or CSP violations.
- Designed capacity for approximately **2.49 million telemetry records per day** under the default device duty-cycle model.
- Reduced projected storage by thinning historical five-second reports to 30-second intervals while retaining full-rate live detection.

The result is a scalable on-premise foundation for transactional telemetry processing, real-time detection, geospatial monitoring, secure administration, and reliable integration with downstream enterprise systems.
