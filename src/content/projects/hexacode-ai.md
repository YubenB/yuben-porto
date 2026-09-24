---
slug: hexa-ai
title: Hexa.AI — Sovereign Enterprise AI Platform and Control Plane
category: Enterprise AI / Platform Engineering
excerpt: A sovereign enterprise AI platform for building, governing, deploying, and operating reusable AI capabilities across on-premise and hybrid infrastructure.
stack:
  - Go 1.25
  - Svelte 5 / SvelteKit 2
  - TypeScript 6
  - PostgreSQL / pgvector
  - Redis
  - Tailwind CSS 4
  - Docker
  - Ollama / vLLM
  - Model Context Protocol
  - GitLab CI/CD
images:
  - /images/projects/hexa-ai/control-plane-hero.webp
  - /images/projects/hexa-ai/workflow.webp
  - /images/projects/hexa-ai/model-foundry.webp
  - /images/projects/hexa-ai/deployments.webp
  - /images/projects/hexa-ai/access.webp
---

Hexa.AI is a sovereign and hybrid enterprise AI platform that helps organizations adopt generative AI without giving up control over their models, data, infrastructure, security policies, or approval processes.

Rather than operating as a standalone chatbot, Hexa.AI provides the control plane required to build, govern, release, deploy, and operate reusable AI capabilities. Those capabilities can serve independent business applications, enterprise workflows, governed APIs, MCP interfaces, and digital channels.

## The enterprise AI problem

Enterprise AI systems often begin as isolated prototypes connected directly to a model API. That approach becomes risky when an organization needs to protect sensitive data, switch model providers, approve AI behavior, track production decisions, support multiple applications, or operate without a mandatory external cloud control plane.

AI assets can also drift independently. Prompts change without evaluation, knowledge sources become outdated, credentials leak into configuration, and deployed applications no longer match the exact version that reviewers approved.

Hexa.AI addresses that problem with a governed AI supply chain. Every important capability has a clear owner, version, lifecycle, permission model, qualification evidence, and immutable release. Production deployments reference approved releases rather than mutable builder resources, while runtime configuration and credentials remain environment-specific.

## My contribution

I contributed across product definition, system architecture, backend and frontend engineering, security design, execution infrastructure, AI governance, testing strategy, and delivery workflow. My work included defining bounded product contexts, implementing governed capability lifecycles, designing PostgreSQL authority and execution semantics, building enterprise administration experiences, and establishing repeatable security and release evidence.

## Build, Govern, Deliver, and Operate

The product is organized around four primary jobs, with trust embedded throughout the platform.

### Build

Teams compose reusable intelligence from versioned prompts, knowledge bases, model definitions, provider connections, governed connector operations, agents, and visual workflows. Each capability moves from a mutable definition to an immutable revision and release candidate.

### Govern

The Review Hub connects review policies, evidence, tasks, and accountable decisions. Reviews bind to exact immutable subjects and digests, preventing approved content from silently changing afterward. The platform also provides an AI Portfolio, governance assurance, audit evidence, and separation-of-duty controls.

### Deliver

Approved releases become environment-specific deployments and controlled exposures. Releases remain portable and contain no environment credentials or infrastructure identifiers. Provider realization, credentials, worker placement, and network policy are resolved only when a release enters a governed environment.

### Operate

The Execution Fabric coordinates workers, pools, jobs, capacity, placement, leases, retries, and failure recovery. Operators can investigate production activity across deployments, exposures, runs, traces, workers, dependencies, and accountable audit events. Monitoring, diagnostics, backup, recovery, licensing, and lifecycle management complete the operational layer.

## A governed capability lifecycle

```text
Mutable definition
      ↓
Immutable revision
      ↓
Release candidate → Qualification evidence
      ↓
Review Hub → Approval decision + audit record
      ↓
Immutable release
      ↓
Environment-specific deployment → Exposure
      ↓
Run → Trace → Investigation evidence
```

This lifecycle ensures that the capability deployed to production is the exact capability that was evaluated and approved. Any change produces a new revision and release instead of silently altering production behavior.

## Knowledge and grounded AI

Knowledge is treated as a governed production capability, not a basic document-upload feature. Source documents, revisions, retrieval tests, qualification evidence, citations, release candidates, and published releases remain independently traceable.

This structure lets grounded responses link back to the exact approved knowledge version and original source evidence. It also makes outdated or unqualified sources visible before they can influence a production capability.

## Models and providers stay independent

Hexa.AI deliberately separates model governance from serving infrastructure.

- **Model Foundry** manages model definitions, versions, evaluations, provenance, fine-tuning foundations, release candidates, and immutable model releases.
- **Provider Registry** manages approved runtime connections such as Ollama, vLLM, and OpenAI-compatible endpoints.

A model release therefore stays portable and vendor-independent. Endpoints, credentials, worker placement, and environment configuration can change without contaminating the reviewed model artifact.

## Agents, workflows, and reusable solutions

The platform combines prompts, models, knowledge, connectors, and provider capabilities into reusable Agents and Workflows. A visual workflow canvas supports branching, parallel operations, connector calls, human approval, and explicit outputs while preserving the same versioned release discipline as other platform assets.

The same released capability can be consumed by multiple independent applications through governed APIs, MCP interfaces, workflows, or other approved exposures without duplicating its intelligence configuration.

## Execution Fabric

Runtime execution is coordinated through governed workers and pools rather than being coupled directly to the control plane. Capacity-aware placement, job claims, leases, retries, fencing, and recovery controls help the system handle uncertain execution outcomes safely.

Every production request can be correlated across the published exposure, deployment generation, runtime, model or tool execution, run, trace, review evidence, and accountable audit activity.

## Security and trust boundaries

Security is enforced across realm, organization, workspace, and environment boundaries. The platform supports human and machine identities, scoped roles and permissions, managed credentials, service identities, and consumer API keys.

PostgreSQL row-level security reinforces application-level scoping. Protected documents and evidence remain access-controlled, secrets are redacted from operational views, production activation stays review-bound, and recovery follows fail-closed and quarantine behavior when integrity cannot be established.

## Technical architecture

| Area                 | Technology                                                                                |
| -------------------- | ----------------------------------------------------------------------------------------- |
| Backend              | Go 1.25 modular control plane and runtime                                                 |
| Frontend             | Svelte 5, SvelteKit 2, and TypeScript 6                                                   |
| Data authority       | PostgreSQL with row-level security, transactional migrations, and pgvector direction      |
| Coordination         | Redis as a non-authoritative acceleration layer                                           |
| Object storage       | Local content-addressed and S3-compatible storage                                         |
| AI providers         | Ollama, vLLM, and OpenAI-compatible endpoints                                             |
| AI integration       | Model Context Protocol Go SDK                                                             |
| Workflow UI          | XYFlow for Svelte                                                                         |
| Internationalization | English and Indonesian via Paraglide                                                      |
| Infrastructure       | Docker Compose and systemd, with an evolution path to optional Kubernetes adapters        |
| Quality              | Go tests, component tests, Svelte checks, Playwright, and architecture guards             |
| Delivery             | GitLab CI, Hexa.Build change proposals, immutable releases, SBOMs, and container scanning |

PostgreSQL is the authoritative production store for review decisions, releases, credentials, deployments, audit events, and execution claims. Redis accelerates coordination but never becomes the only source of critical enterprise state.

## Enterprise console design

The SvelteKit console brings builders, reviewers, platform operators, and application consumers into one coherent product. Its information architecture follows the same Build, Govern, Deliver, and Operate model as the backend, while English and Indonesian localization supports real deployment contexts.

Interfaces such as Model Foundry, Workflow Canvas, Deployment Hub, Review Hub, Trace Explorer, and Access & IAM expose complex lifecycle state without hiding approvals, evidence, or operational consequences.

## The hardest engineering problems

- Separating build-time capability definitions from environment-specific runtime realization.
- Preserving exact review and release integrity across interconnected AI assets.
- Enforcing tenant and workspace scope in both API and persistence layers.
- Coordinating worker claims, leases, retries, and uncertain execution outcomes.
- Maintaining end-to-end correlation without exposing protected content.
- Designing backup and recovery around databases, documents, credentials, and runtime identity.
- Keeping a large administration console understandable for builders, reviewers, operators, and consumers.

## Outcome and direction

The result is an enterprise AI platform built around a simple principle: organizations should be able to use generative AI while retaining control of the infrastructure, evidence, approvals, and operational decisions that make it trustworthy.
