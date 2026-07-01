---
title: Darkbloom Centaur Agent
subtitle: >-
  Production GCP deployment of [Centaur](https://github.com/paradigmxyz/centaur)
  — a self-hosted, multiplayer AI agent platform — running on GKE with Slack
  integration, access policy overlays, and automated workflows.
description: >-
  Production GCP deployment of Centaur — a self-hosted AI agent platform running
  on GKE with Slack integration, access policy overlays, and automated
  workflows.
schemaType: TechArticle
schemaDescription: >-
  Production GCP deployment of Centaur — a self-hosted, multiplayer AI agent
  platform running on GKE with Slack integration, access policy overlays, and
  automated workflows.
about:
  type: SoftwareApplication
  name: Centaur
  applicationCategory: AI Agent Platform
  operatingSystem: Kubernetes (GKE)
keywords:
  - AI agent
  - Kubernetes
  - GKE
  - GCP
  - Slack bot
  - agent platform
  - multiplayer AI
  - access policy
  - automated workflows
  - Cloud SQL
  - Cloudflare
  - Centaur
  - agent orchestration
---

## What It Does

The agent lives in Slack. Team members mention it to delegate work: code reviews, PR summaries, issue triage, infrastructure changes, release monitoring. It has access to GitHub, Linear, Slack search, and a knowledge base built from ingestion of conversations, documents, and code. Every action is scoped by an access policy that gates tool availability based on the requester's identity.

Automated workflows run on schedules independent of any user request — a release watcher posts changelogs to the team channel when repos cut new versions, and a standup digest compiles activity across GitHub, Linear, and Slack into a morning briefing. The agent doesn't wait to be asked.

## Infrastructure

```
                              ┌──────────────────────┐
                              │    Slack Workspace    │
                              │  @Centaur mentions    │
                              │  Event Subscriptions  │
                              └──────────┬───────────┘
                                         │ HTTPS
                              ┌──────────▼───────────┐
                              │   Cloudflare Proxy    │
                              │ slackbot.model-       │
                              │ optimizors.com        │
                              └──────────┬───────────┘
                                         │
┌────────────────────────────────────────▼────────────────────────────────────┐
│                           GCP (us-central1)                                  │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                         GKE Cluster (centaur)                         │  │
│  │                                                                       │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                │  │
│  │  │  API Server  │  │  Slackbot    │  │  Console     │                │  │
│  │  │  (api-rs)    │  │  (slackbotv2)│  │  (iron-ctrl) │                │  │
│  │  └──────┬───────┘  └──────┬───────┘  └──────────────┘                │  │
│  │         │                 │                                           │  │
│  │         └────────┬────────┘                                           │  │
│  │                  │                                                    │  │
│  │     ┌────────────▼────────────┐     ┌──────────────────┐              │  │
│  │     │    Agent Sandboxes      │     │  Workflow Exec   │              │  │
│  │     │  (per-conversation)     │     │  release_watcher │              │  │
│  │     │  Claude + tool access   │     │  standup_digest  │              │  │
│  │     └─────────────────────────┘     └──────────────────┘              │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────────────┐  │
│  │  Cloud SQL   │  │  GCS Buckets │  │  Artifact Registry               │  │
│  │  (Postgres)  │  │  workspaces  │  │  centaur-docker (images)         │  │
│  │              │  │  slack-exports│  └──────────────────────────────────┘  │
│  └──────────────┘  │  logs        │                                         │
│                    └──────────────┘                                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

| Component | What It Runs |
| --- | --- |
| GKE | Kubernetes cluster across 3 zones — separate node pools for services and sandboxes. Agent sandboxes are ephemeral pods spun up per conversation. |
| Cloud SQL | PostgreSQL 16 with pg_search and pg_cron. Stores agent sessions, workflow state, and wiki page revisions. |
| GCS | Workspace files, Slack export archives, and agent audit logs — durable, versioned, cheap. |
| Cloudflare | Proxies the Slackbot ingress — no open GCP ports, automatic HTTPS, DDoS protection. |
| Datadog | Logs, metrics, and monitors across the cluster. Alert when sandbox spawn latency spikes or API error rate climbs. |

## Access Policy

Not everyone gets the same agent. The system prompt encodes a tiered access model loaded from an overlay mounted into every sandbox:

- **Admin tier** — full tool access: code generation, git operations, Linear issue management, infrastructure changes.
- **Read-only tier** — chatbot only: questions, summaries, lookups. No code execution, no git, no Linear mutations.

Authorization is determined by Slack identity per-request — no shared credentials, no ambient trust. If you aren't in the admin list, the agent simply doesn't have the tools you're asking for.

## The Context Graph: Real-Time Product Awareness

Most organizations run on status meetings. Someone asks what happened last week, someone else tries to reconstruct it from Slack scrollback and GitHub notifications, and the answer is always six days stale. The context graph replaces that loop with a continuously-updating knowledge base that the agent builds automatically.

Every Slack conversation the agent participates in gets ingested. Every code review, every merged PR, every Linear issue state change, every release — the agent captures it, extracts the salient information, and writes it into a structured wiki. Pages link to each other. Revisions are append-only with full diff history. The result is a living map of everything happening across the product: who's working on what, which decisions were made and why, what shipped, and what's blocked.

```
┌─────────────────────────────────────────────────────────────┐
│                      Context Graph                            │
│                                                               │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐                │
│  │  Slack   │    │  GitHub  │    │  Linear  │                │
│  │ threads  │    │ PRs,     │    │ issues,  │                │
│  │ DMs,     │    │ commits, │    │ projects,│                │
│  │ channels │    │ releases │    │ comments │                │
│  └────┬─────┘    └────┬─────┘    └────┬─────┘                │
│       │               │               │                      │
│       └───────────────┼───────────────┘                      │
│                       │                                      │
│               ┌───────▼───────┐                               │
│               │  Ingestion    │                               │
│               │  Pipeline     │  continuous, event-driven     │
│               └───────┬───────┘                               │
│                       │                                      │
│               ┌───────▼───────┐                               │
│               │  Wiki Pages   │  append-only revisions        │
│               │  + Timeline   │  full diff history            │
│               │  + Diffs      │  chronological view           │
│               └───────┬───────┘                               │
│                       │                                      │
│         ┌─────────────┼─────────────┐                        │
│         │             │             │                        │
│  ┌──────▼──────┐ ┌────▼─────┐ ┌────▼──────┐                  │
│  │  Executive  │ │  Engineer│ │  New Hire │                  │
│  │  "what      │ │  "why did│ │  "what is │                  │
│  │  shipped    │ │  we make │ │  going on │                  │
│  │  this week?"│ │  that     │ │  here?"   │                  │
│  │             │ │  choice?"│ │           │                  │
│  └─────────────┘ └──────────┘ └───────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

An executive who wants to know what shipped this week opens the wiki and sees the timeline — releases, merged PRs, decisions made, things flagged — without asking anyone to write a status report. An engineer who joins a project mid-stream can trace the full decision history through page diffs instead of scrolling Slack for three hours. A new hire can read the context graph like an onboarding document that writes itself.

### Operational Unlocks

- **No more "what did I miss?"** Skip the Slack backlog. The wiki is the canonical record of what happened while you were out. Every decision, every shipped feature, every escalation — organized, searchable, timestamped.
- **Onboarding that doesn't need a buddy.** A new hire reads the context graph like a living history of the product. No one has to spend two weeks walking them through Slack threads and stale docs. The knowledge base is the buddy.
- **Audit trail without the audit.** When something goes wrong, you can trace exactly when a decision was made, who was in the conversation, and what the alternatives were. No one has to remember — the agent was taking notes.
- **Cross-functional visibility.** Engineering, product, and leadership all read from the same source. No more "engineering has a different version of events than product." One narrative, one timeline, one truth.
- **Investor-ready updates on demand.** Need to tell investors what the team shipped in Q2? The timeline already has it. No frantic Slack searches, no begging engineers for summaries. The narrative is already written.

This isn't a dashboard of metrics. It's the actual narrative of the product — the conversations, the tradeoffs, the reasoning — preserved in a queryable, linkable, versioned knowledge base. The agent does the synthesis. The humans do the thinking. Everyone stays aligned without a single status meeting.

## Custom Extensions

The upstream Centaur platform is extended with org-specific modifications:

- **Wiki API.** A RESTful wiki backend storing append-only page revisions with full edit history, diffing, and timeline views. Pages are ingested from Slack conversations, documents, and codebases — the agent builds its own knowledge base over time.
- **Signed commits.** Every git operation from inside a sandbox produces a cryptographically signed commit with a dedicated agent identity. This is required by the org's branch protection rules.
- **Release watcher.** A scheduled workflow polls GitHub releases, generates an LLM changeset summary, attributes affected components from path diffs, and posts to the team Slack channel. Deduplicated by a persistent cursor.
- **Standup digest.** Every weekday morning, the agent compiles GitHub releases, merged PRs, Linear activity, and Slack discussions into a structured briefing document. Fully automated — no one has to remember to run it.

## Deployment

Everything is defined as code. Terraform provisions the GCP resources (GKE, Cloud SQL, GCS, Artifact Registry). Helm deploys the application layer. The overlay is built as a Docker image and mounted into every sandbox. Configuration lives in the repo — secrets are injected at deploy time, never committed.

The submodule tracks a fork of upstream Centaur with org-specific patches rebased onto it. When upstream ships fixes, the fork rebases, the images rebuild, and the cluster rolls forward. The patch surface is deliberately small — no rewrites of engine behavior, only additive extensions and thin config overrides.

---

This describes the infrastructure and operational surface of the Darkbloom Centaur deployment. Internal access policies, specific tool integrations, and runtime behavior are documented in the repository.
