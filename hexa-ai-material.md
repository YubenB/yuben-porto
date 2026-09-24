Catatan istilah: saya mengganti kata “agnostic” dengan **“vendor-independent”** atau **“tidak terikat pada satu vendor”**, karena lebih natural dan mudah dipahami recruiter maupun pembaca nonteknis. Annotation 1

Berikut paket lengkap untuk proyek `hexa-ai`, berdasarkan source code dan dokumentasi aktual di repository.

## Recommended project title

**Hexa.AI — Sovereign Enterprise AI Platform and Control Plane**

Alternatif:

- **Hexa.AI — Governed AI Capability Platform**
- **Hexa.AI — Enterprise AI Solution Factory**
- **Hexa.AI — Secure On-Premise AI Orchestration and Governance Platform**

## One-line description

Hexa.AI is a sovereign enterprise AI platform for building, governing, deploying, and operating reusable AI capabilities across on-premise and hybrid infrastructure.

## Short brief

Hexa.AI is a sovereign and hybrid enterprise AI platform that enables organizations to build reusable AI capabilities from models, prompts, knowledge, connectors, agents, and workflows; govern them through controlled review and immutable releases; deploy them into managed environments; and trace every production execution through operational and audit evidence.

The platform is designed for organizations that require customer-controlled infrastructure, strict access boundaries, model and data governance, and freedom to use local or approved external AI providers.

## Long portfolio description

Hexa.AI is an enterprise AI capability platform designed for organizations that need to adopt generative AI without giving up control over their models, data, infrastructure, security policies, and approval processes.

Instead of operating as a standalone chatbot, Hexa.AI provides the control plane required to build, govern, release, deploy, and operate reusable AI capabilities. These capabilities can then be consumed by independent business applications, enterprise workflows, APIs, MCP interfaces, and digital channels.

The product is structured around four primary jobs: **Build, Govern, Deliver, and Operate**, with Trust embedded throughout the platform.

The Build layer allows teams to compose AI capabilities using versioned prompts, knowledge bases, model definitions, provider connections, connector operations, agents, and workflows. Each capability follows a controlled lifecycle from a mutable definition to an immutable revision, release candidate, reviewed release, deployment, and production exposure.

The Govern layer provides a Review Hub, review policies, an AI Portfolio, governance assurance, audit evidence, and traceable approval decisions. Reviews are bound to exact immutable subjects and digests, preventing approved content from silently changing after a decision. The platform separates business review evidence, technical traces, and accountable audit events so each can serve its proper governance purpose.

The Deliver layer turns approved releases into environment-specific deployments and controlled exposures. A release remains portable and free from environment credentials or infrastructure identifiers. Runtime configuration, provider realization, credentials, worker placement, and network policy are resolved only when the release is deployed into a governed environment.

The Operate layer provides an Execution Fabric for workers, pools, jobs, capacity, placement, leases, retries, and failure recovery. Production executions can be investigated across deployments, exposures, runs, traces, workers, dependencies, and accountable audit activity. Platform operators also receive monitoring, diagnostics, backup, recovery, licensing, and lifecycle-management capabilities.

Knowledge is handled as a governed production capability rather than a simple document-upload feature. Source documents, revisions, retrieval tests, qualification evidence, citations, release candidates, and published releases are independently traceable. Grounded AI responses can therefore be linked back to the exact approved knowledge version and original source evidence.

Model management is separated into two responsibilities. Model Foundry governs model definitions, versions, evaluation, provenance, fine-tuning foundations, release candidates, and immutable model releases. Provider Registry governs connections to approved serving infrastructure such as Ollama, vLLM, and OpenAI-compatible endpoints. This separation prevents runtime configuration or credentials from contaminating portable model releases.

The platform uses PostgreSQL as its authoritative production store, with scoped repositories, row-level security, transactional migrations, and durable outbox/inbox patterns. Redis is treated only as a coordination and acceleration layer, while local content-addressed or S3-compatible object storage handles protected artifacts and documents.

The frontend is built with Svelte 5 and SvelteKit, providing a large enterprise administration console with English and Indonesian localization. The backend is a modular Go control plane and runtime composed of bounded product contexts for Build, Govern, Deliver, Operate, IAM, licensing, events, recovery, and execution.

Hexa.AI also follows a governed engineering and delivery model. Changes are validated through risk-based CI qualification, security scanning, exact-source evidence, immutable runtime releases, health gates, and rollback support managed through Hexa.Build.

The first product milestone, R1 RC1, completed all 18 required release gates with no failures or pending gates and received Product Owner UI/UX acceptance. Development has since moved into R2, expanding PostgreSQL authority, execution infrastructure, governed Agent and Workflow runtimes, AI governance, production delivery, model operations, and multi-node foundations.

## Product capability map

### Build

- Prompt Registry and versioned prompt lifecycle
- Knowledge bases, document processing, retrieval, and citations
- Model Foundry and governed model releases
- Provider Registry for local and compatible external AI runtimes
- Governed connectors and connector operations
- Reusable Agent definitions and immutable Agent releases
- Visual and durable Workflow capabilities
- Model operations and fine-tuning foundations
- Solution composition and reusable AI building blocks

### Govern

- Review Hub with cases, evidence, tasks, and decisions
- Configurable review policies and approval modes
- Immutable, digest-bound review subjects
- AI Portfolio and AI System inventory
- Governance Assurance dashboard
- Accountable audit records
- Qualification and release evidence
- Separation-of-duty controls

### Deliver

- Environments as governed runtime boundaries
- Immutable deployments and deployment generations
- API and application-facing exposures
- Runtime provider realization
- Service identities and consumer credentials
- Launchpad discovery and access
- Deployment health, replacement, deactivation, and rollback
- Controlled release-to-runtime traceability

### Operate

- Workers, execution pools, jobs, and runs
- Capacity-aware workload placement
- Job claims, leases, retries, and fencing
- Runs, traces, and audit correlation
- Component and infrastructure monitoring
- Platform diagnostics
- Backup and recovery workflows
- Installation, upgrade, and rollback foundations
- Licensing and entitlement enforcement

### Trust and security

- Realm, organization, workspace, and environment boundaries
- Human and machine identities
- Scoped roles, permissions, and access grants
- Managed credentials and API keys
- PostgreSQL row-level security
- Protected document and evidence access
- Review-bound production activation
- Secret redaction and secure runtime configuration
- Recovery quarantine and fail-closed behavior

## Technical architecture

```text
                         BUILD
     Prompt ─┐
     Model ──┤
  Knowledge ─┼──► Agent / Workflow / Solution
 Connectors ─┤
  Providers ─┘
                │
                ▼
                       GOVERN
       Qualification → Review Hub → Decision
                │          │
                │          └── Evidence and Audit
                ▼
                       DELIVER
   Immutable Release → Environment → Deployment
                                      │
                                      ▼
                                  Exposure
                                      │
                    ┌─────────────────┴────────────────┐
                    ▼                                  ▼
             External application              Enterprise API/MCP
                    │                                  │
                    └─────────────────┬────────────────┘
                                      ▼
                       OPERATE
        Job → Pool → Worker → Runtime → Model/Tool
                                      │
                                      ▼
                  Run → Trace → Investigation
                                      │
                                      ▼
                Monitoring, Assurance, and Audit
```

## Technology stack

| Area                 | Technology                                                                          |
| -------------------- | ----------------------------------------------------------------------------------- |
| Backend              | Go 1.25 modular control plane and runtime                                           |
| Frontend             | Svelte 5, SvelteKit 2, TypeScript 6                                                 |
| Styling              | Tailwind CSS 4, shared design tokens and component grammar                          |
| Toolchain            | Bun 1.3.14, Vite 8                                                                  |
| Database             | PostgreSQL with row-level security and transactional migrations                     |
| Vector direction     | PostgreSQL/pgvector                                                                 |
| Coordination         | Redis as a non-authoritative acceleration layer                                     |
| Object storage       | Local content-addressed storage and S3-compatible storage                           |
| AI providers         | Ollama, vLLM, OpenAI-compatible endpoints                                           |
| AI integration       | Model Context Protocol Go SDK                                                       |
| Workflow UI          | XYFlow for Svelte                                                                   |
| Document UI          | EmbedPDF/PDFium                                                                     |
| Internationalization | Paraglide, English and Indonesian                                                   |
| APIs                 | REST/JSON, published API exposures, MCP foundations                                 |
| Authentication       | Sessions, CSRF protection, service identities, scoped credentials                   |
| Infrastructure       | Docker Compose, systemd, future optional Kubernetes adapters                        |
| Testing              | Go tests, Bun component tests, Svelte checks, Playwright, shell architecture guards |
| CI/CD                | GitLab CI with risk-based qualification profiles                                    |
| Delivery             | Hexa.Build Change Proposals and immutable Runtime releases                          |
| Supply chain         | Dependency auditing, vulnerability analysis, SBOM and container scanning            |

## Engineering and release evidence

Strong claims you can safely use:

- Delivered the **R1 Release Candidate with 18 of 18 required gates passed**, zero failures, and zero pending gates.
- Received explicit **Product Owner UI/UX acceptance** for the R1 RC surface.
- Built a substantial R2 codebase containing more than **500 tracked Go files**, including approximately **188 Go test files**.
- Established **35 numbered PostgreSQL schema migrations** in the current source.
- Implemented a governed lifecycle connecting capability definitions, immutable revisions, release candidates, reviews, releases, deployments, exposures, runs, traces, and audit evidence.
- Created risk-aware CI profiles that automatically escalate security, dependency, container, and release-related changes to full qualification.
- Supported a controlled single-node on-premise deployment profile while designing an evolution path toward multi-node execution and high availability.

## CV version

**Hexa.AI — Sovereign Enterprise AI Platform**  
_Product Engineer / Software Engineer / Solution Architect — select according to your actual role_

- Architected and developed a sovereign enterprise AI platform for composing, governing, deploying, and operating reusable AI capabilities across customer-controlled infrastructure.
- Built governed lifecycles for prompts, knowledge, models, providers, connectors, agents, and workflows, progressing from mutable definitions to immutable reviewed releases.
- Designed a Go and PostgreSQL control plane with modular product contexts, row-level security, transactional migrations, scoped repositories, and durable execution evidence.
- Developed a SvelteKit enterprise console covering AI builders, Review Hub, deployments, Execution Fabric, monitoring, governance, licensing, and platform administration.
- Implemented an execution architecture with workers, pools, jobs, capacity-aware placement, claims, leases, retry controls, and failure recovery.
- Established traceability from published AI endpoints through deployment, runtime, model and tool execution, Runs, Traces, Review Evidence, and Audit.
- Integrated local and compatible external model providers through Ollama, vLLM, and OpenAI-compatible interfaces.
- Delivered the R1 Release Candidate with 18/18 required gates passed, no failures or pending gates, and Product Owner UI/UX acceptance.
- Established security and delivery gates including dependency auditing, vulnerability checks, browser validation, SBOM generation, container scanning, immutable runtime releases, and rollback.

### Compact CV version

Built a sovereign enterprise AI platform using Go, SvelteKit, PostgreSQL, Redis, and containerized AI runtimes. Designed governed lifecycles for models, prompts, knowledge, connectors, agents, workflows, reviews, releases, deployments, and execution evidence. Delivered the R1 Release Candidate with 18/18 required gates passed and Product Owner UI/UX acceptance.

## LinkedIn project entry

**Hexa.AI — Sovereign Enterprise AI Platform**

Hexa.AI is a customer-controlled enterprise AI platform for building reusable AI capabilities, governing their release, deploying them into controlled environments, and operating them with end-to-end evidence.

I worked across product architecture, backend and frontend engineering, AI governance, runtime orchestration, security, testing, and delivery automation. The platform combines Models, Prompts, Knowledge, Connectors, Agents, and Workflows through immutable releases and governed deployment contracts.

Its architecture includes a Go control plane and runtime, a SvelteKit enterprise console, PostgreSQL authority with row-level security, Redis coordination, governed workers and execution pools, Review Hub approval workflows, deployment exposures, and Runs/Traces/Audit correlation.

The R1 Release Candidate completed all 18 required release gates with no failures or pending checks. R2 development expands the platform with PostgreSQL-backed bounded contexts, distributed execution, production delivery lifecycles, governance assurance, model operations, and fine-tuning foundations.

**Suggested skills:** Enterprise AI, Generative AI, Go, Svelte, TypeScript, PostgreSQL, AI Governance, System Architecture, MLOps, LLMOps, Model Serving, RAG, Workflow Orchestration, IAM, DevSecOps, GitLab CI/CD.

## Personal website copy

### Hero

**Building enterprise AI that organizations can govern, deploy, and trust**

Hexa.AI is a sovereign AI platform for composing reusable intelligence from models, prompts, knowledge, connectors, agents, and workflows—then governing, releasing, deploying, and operating it through controlled enterprise infrastructure.

### The challenge

Enterprise AI systems often begin as isolated prototypes connected directly to a model API. That approach becomes risky when an organization needs to control sensitive data, switch model providers, approve AI behavior, track production decisions, manage multiple applications, or operate without a mandatory external cloud control plane.

AI assets can also drift independently. Prompts change without evaluation, knowledge sources become outdated, credentials are copied into configuration, and deployed applications no longer match the version that was reviewed.

### The solution

Hexa.AI introduces a governed AI supply chain.

Every important capability has a clear owner, version, lifecycle, permission model, qualification evidence, and immutable release. Production deployments reference approved releases rather than mutable builder resources. Runtime configuration and credentials remain environment-specific and are resolved only during deployment.

The same released capability can be consumed by multiple independent applications through governed APIs, MCP interfaces, workflows, or other supported exposures without duplicating its intelligence configuration.

### My contribution

Adjust this paragraph to match your actual responsibilities:

> I contributed to the product definition, system architecture, backend and frontend engineering, security design, execution infrastructure, AI governance, testing strategy, and delivery workflow. My work included defining bounded product contexts, implementing governed capability lifecycles, designing PostgreSQL authority and execution semantics, building enterprise administration experiences, and establishing repeatable security and release evidence.

### Outcome

The project produced a validated single-node on-premise Release Candidate and a substantial R2 platform foundation. R1 completed 18/18 required release gates with Product Owner UI/UX acceptance. R2 extends that foundation into PostgreSQL-backed capability domains, governed execution infrastructure, immutable deployment generations, runtime evidence, governance assurance, model operations, and recovery workflows.

## Recommended case-study sections

For a detailed website page, use this order:

1. Project introduction
2. Enterprise AI problem
3. Product vision
4. Your role and responsibilities
5. Build–Govern–Deliver–Operate architecture
6. Governed AI lifecycle
7. Knowledge and RAG architecture
8. Model and provider separation
9. Agent and workflow composition
10. Execution Fabric
11. Security and governance
12. UI/UX design approach
13. Testing and release evidence
14. Technical challenges
15. Outcomes and lessons learned
16. Current status and future direction

## Interview talking points

### Why is this more than a chatbot?

Because Hexa.AI governs reusable AI capabilities across their complete lifecycle. Chat is only one possible consumer. The platform owns model, prompt, knowledge, tool, evaluation, review, deployment, execution, and evidence contracts.

### Why separate Model Foundry and Provider Registry?

A model release should remain portable and immutable. Runtime endpoints, credentials, worker placement, and environment configuration change independently. Combining them would make a model release environment-specific and difficult to govern.

### Why use immutable releases?

They ensure that the exact capability reviewed is the capability deployed. Changes create new revisions and releases instead of silently modifying production behavior.

### Why PostgreSQL instead of making Redis authoritative?

Review decisions, releases, credentials, deployments, audit events, and execution claims need durable transactional authority. Redis is useful for acceleration and coordination but should not become the only source of critical enterprise state.

### What was technically difficult?

- Separating build-time capability definitions from environment-specific runtime realization
- Maintaining exact review and release integrity across interconnected AI assets
- Enforcing tenant and workspace scope in both API and persistence layers
- Coordinating worker claims, leases, retries, and uncertain execution outcomes
- Preserving end-to-end correlation without exposing protected content
- Designing backup and recovery around databases, documents, credentials, and runtime identity
- Keeping a large enterprise console understandable across builders, reviewers, operators, and consumers
