---
slug: run-a-cloud-native-app-with-kubernetes
title: Run a Cloud-Native App With Kubernetes
date: 2025-08-05
readingTime: 15 min read
thumbnail: https://dcloud.co.id/blog/wp-content/uploads/2023/06/Komputasi-Kubernetes_Featured-Image.png
excerpt: This post shares our high-level infrastructure patterns for running modern web apps at scale. It’s technology-specific enough to be useful, but intentionally free of environment-specific details like IPs, node counts, or internal service names.
---

> This post shares high-level infrastructure patterns for running modern web apps at scale based on the project i had attended. It’s technology-specific enough to be useful.

---

## Why this setup

- **Reliability first.** Rolling updates, health probes, autoscaling, and graceful failures.
- **Security by default.** Private networking, zero-trust access, least privilege.
- **Observability everywhere.** Metrics, logs, and traces as first-class citizens.
- **Sane operations.** Automatable, debuggable, and cost-aware.

---

## Topology at a glance

```
Internet
  └─▶ DNS / CDN / WAF
        └─▶ Cloud Load Balancer (TLS)
              └─▶ Kubernetes Ingress Controller(s)
                    └─▶ App Services (HTTP/gRPC)
                          ├─▶ Data Stores (SQL/NoSQL)
                          ├─▶ Cache
                          └─▶ Message Broker
```

**Environments:** isolated clusters or namespaces for development, testing, staging, and production.
**Blast radius:** infra components (ingress, data, observability) are isolated from application workloads by namespace and RBAC.

---

## Edge layer

- **DNS & TLS:** Managed certificates, HSTS, automated renewals.
- **CDN/WAF (optional):** Static asset caching, bot/rate controls, basic L7 filtering.
- **Load Balancer:** Routes traffic to Ingress on healthy nodes; health checks enforce only-good backends.

---

## Kubernetes platform

- **Cluster:** Managed Kubernetes.
- **Node pools:** Separate “system” and “workload” pools; optionally GPU/compute-optimized pools for specific services.
- **Ingress:** NGINX Ingress Controller (or equivalent). Routes by host/path and supports gRPC, WebSocket, and canary routing.
- **Service mesh (optional):** For mTLS and richer traffic policies when needed.

### Namespaces (logical separation)

- **edge:** ingress controllers, gateways.
- **apps:** stateless services, APIs, web frontends.
- **data:** stateful services (databases, caches, queues) or service bindings to managed data stores.
- **observability:** metrics, logging, tracing stacks.
- **ci/cd:** controllers, runners, and release tooling (read-only into runtime namespaces).

---

## Application layer

- **Service types:** HTTP/REST and gRPC, fronted by standard Kubernetes Services (ClusterIP).
- **Contracts:** Clear API boundaries with backward-compatible versioning.
- **Background work:** Async jobs and workers consume tasks via the message broker.

**Sample (generic) Ingress rule**

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app
  annotations:
    nginx.ingress.kubernetes.io/proxy-body-size: "16m"
spec:
  ingressClassName: nginx
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: web
                port:
                  number: 80
```

---

## Data layer

- **Relational database:** Managed SQL (preferred) or StatefulSet with PersistentVolumeClaims. PITR backups, encryption at rest, automated failover for production.
- **Document store (when justified):** Managed NoSQL or operator-managed cluster with sharding/replica sets as needed.
- **Cache:** Redis for hot data, rate limits, sessions, and lightweight queues.
- **Message broker:** Durable queues and pub/sub for decoupled services, webhooks, and long-running tasks.

**Operational standards**

- Daily automated backups with restore tests.
- NetworkPolicies to restrict access (apps ↔ data only).
- Secrets via External Secrets + KMS or sealed secrets; short-lived credentials where possible.

---

## Observability

- **Metrics:** Prometheus scraping apps, ingress, databases, and brokers. SLO dashboards in Grafana.
- **Logs:** Aggregated, indexed logs with contextual labels (environment, namespace, app, version).
- **Tracing:** OpenTelemetry SDKs; traces sampled and exported to a distributed tracer (Jaeger/Tempo).
- **Alerts:** Noise-reduced, SLO-aligned alerts (latency, error rate, saturation, queue depth).

**Golden signals per service**

- Requests per second
- Error rate (4xx/5xx split)
- Latency (P50/P95/P99)
- Saturation (CPU, memory, concurrency)
- Dependency health (DB, cache, broker)

---

## Security

- **NetworkPolicies:** Default-deny; explicit allows only.
- **RBAC:** Teams scoped to their namespaces; service accounts with least privilege.
- **Ingress security:** TLS 1.2+, strong ciphers, secure headers, request size limits, optional rate limiting per route.
- **Image hygiene:** SBOMs, vulnerability scans, signature verification (Sigstore/cosign).
- **Secrets:** Encrypted at rest and in transit; rotated on schedule and on incident.

---

## Traffic policy: preserving client IP vs. load distribution

Two common Service behaviors at the edge:

- **Cluster-wide routing (default):** Any node can receive traffic and forward to any healthy pod.
  _Pro:_ even load distribution. _Trade-off:_ client IP is typically NATed.

- **Local node routing:** Load balancer only sends to nodes that have local endpoints (ingress pods).
  _Pro:_ preserves client IP (useful for audit/rate limits). _Trade-off:_ requires careful scheduling/health checks so every LB target node has a ready endpoint.

Choose per use case (observability & security needs vs. simplicity).

---

## Reliability & scaling

- **Autoscaling:** HPAs on CPU/memory and custom metrics (RPS, queue depth).
- **PodDisruptionBudgets:** Protect capacity during node maintenance.
- **Readiness/Liveness/Startup probes:** Fast rollouts without flapping.
- **Multi-AZ:** Spread workloads and stateful sets across zones.
- **Progressive delivery:** Canary or blue/green with automatic rollback on SLO breach.

---

## CI/CD

- **Pipeline:** Build → test → scan → sign → push → deploy (Helm or Kustomize).
- **Environments:** Ephemeral previews for PRs; promotion from testing → staging → production with approvals.
- **Config:** GitOps for manifests; image tags pinned by commit SHA; drift detection.
- **Secrets/config:** Managed outside repo; injected at deploy time.

---

## Runbooks (public-safe)

- **Incident triage:** Check dashboards → recent deploys → error budgets → logs/traces for top failing routes.
- **Edge 5xx:** Inspect ingress logs and upstream timeouts; verify service selectors and pod health.
- **Hot shard/table:** Enable slow-query log; review indexes; apply short-term read replicas or cache rules; plan a migration window.
- **Queue backlog:** Scale workers via HPA on queue depth; investigate poison messages with DLQs.

---

## Cost & sustainability

- Rightsize requests/limits; enable VPA for stateful components where safe.
- Use spot/preemptible nodes for stateless workers with PDBs.
- Cache aggressively; compress responses; ship only what users need.

---

## Compliance & privacy

- Data residency honored via region pinning.
- Access audited; production data masked in non-prod.
- Backups encrypted and lifecycle-managed with retention policies.

---

## What’s next

- Stronger policy-as-code (OPA/Gatekeeper or Kyverno).
- More automated chaos testing and DR drills.
- Deeper SLO-based rollouts and error-budget policies.

---

### Final notes

This overview describes patterns we apply across environments. Specific capacity, instance types, and internal addresses are intentionally omitted. If you’re designing a similar setup, treat this as a reference—adapt the components to your scale, compliance, and team workflows.
