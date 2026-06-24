import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Darkbloom Centaur Agent — Ethen Pociask",
  description:
    "Production GCP deployment of Centaur — a self-hosted AI agent platform running on GKE with Slack integration, access policy overlays, and automated workflows.",
};

export default function DarkbloomCentaur() {
  return (
    <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 md:py-32">
      <Link
        href="/"
        className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors mb-8 inline-block"
      >
        ← back
      </Link>

      <article className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Darkbloom Centaur Agent
          </h1>
          <p className="text-sm text-zinc-500 mt-2">
            Production GCP deployment of{" "}
            <a
              href="https://github.com/paradigmxyz/centaur"
              className="text-brand hover:text-brand-glow transition-colors"
              target="_blank"
              rel="noopener"
            >
              Centaur
            </a>{" "}
            — a self-hosted, multiplayer AI agent platform — running on GKE
            with Slack integration, access policy overlays, and automated
            workflows.
          </p>
          <a
            href="https://github.com/Layr-Labs/darkbloom-centaur-agent"
            className="text-xs text-brand hover:text-brand-glow transition-colors mt-2 inline-block"
            target="_blank"
            rel="noopener"
          >
            github.com/Layr-Labs/darkbloom-centaur-agent →
          </a>
        </header>

        <hr className="border-zinc-800" />

        <h2 className="text-xl font-semibold text-white">
          What It Does
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          The agent lives in Slack. Team members mention it to delegate work:
          code reviews, PR summaries, issue triage, infrastructure changes,
          release monitoring. It has access to GitHub, Linear, Slack search,
          and a knowledge base built from ingestion of conversations,
          documents, and code. Every action is scoped by an access policy that
          gates tool availability based on the requester&rsquo;s identity.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          Automated workflows run on schedules independent of any user
          request — a release watcher posts changelogs to the team channel
          when repos cut new versions, and a standup digest compiles activity
          across GitHub, Linear, and Slack into a morning briefing. The agent
          doesn&rsquo;t wait to be asked.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10">
          Infrastructure
        </h2>

        <div className="my-6 p-4 border border-zinc-800 rounded-lg bg-zinc-900/30 overflow-x-auto">
          <pre className="text-xs text-zinc-400 font-mono leading-relaxed whitespace-pre">
{`                              ┌──────────────────────┐
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
└─────────────────────────────────────────────────────────────────────────────┘`}
          </pre>
        </div>

        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left py-2 text-zinc-400 font-medium">Component</th>
              <th className="text-left py-2 text-zinc-400 font-medium">What It Runs</th>
            </tr>
          </thead>
          <tbody className="text-zinc-500">
            <tr className="border-b border-zinc-800/50">
              <td className="py-2 text-white font-mono text-xs">GKE</td>
              <td className="py-2">
                Kubernetes cluster across 3 zones — separate node pools for
                services and sandboxes. Agent sandboxes are ephemeral pods
                spun up per conversation.
              </td>
            </tr>
            <tr className="border-b border-zinc-800/50">
              <td className="py-2 text-white font-mono text-xs">Cloud SQL</td>
              <td className="py-2">
                PostgreSQL 16 with pg_search and pg_cron. Stores agent
                sessions, workflow state, and wiki page revisions.
              </td>
            </tr>
            <tr className="border-b border-zinc-800/50">
              <td className="py-2 text-white font-mono text-xs">GCS</td>
              <td className="py-2">
                Workspace files, Slack export archives, and agent audit
                logs — durable, versioned, cheap.
              </td>
            </tr>
            <tr className="border-b border-zinc-800/50">
              <td className="py-2 text-white font-mono text-xs">Cloudflare</td>
              <td className="py-2">
                Proxies the Slackbot ingress — no open GCP ports, automatic
                HTTPS, DDoS protection.
              </td>
            </tr>
            <tr className="border-b border-zinc-800/50">
              <td className="py-2 text-white font-mono text-xs">Datadog</td>
              <td className="py-2">
                Logs, metrics, and monitors across the cluster. Alert when
                sandbox spawn latency spikes or API error rate climbs.
              </td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-xl font-semibold text-white mt-10">
          Access Policy
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          Not everyone gets the same agent. The system prompt encodes a
          tiered access model loaded from an overlay mounted into every
          sandbox:
        </p>

        <ul className="text-zinc-400 leading-relaxed space-y-2 list-disc pl-6">
          <li>
            <strong className="text-zinc-300">Admin tier</strong> — full tool
            access: code generation, git operations, Linear issue management,
            infrastructure changes.
          </li>
          <li>
            <strong className="text-zinc-300">Read-only tier</strong> —
            chatbot only: questions, summaries, lookups. No code execution,
            no git, no Linear mutations.
          </li>
        </ul>

        <p className="text-zinc-400 leading-relaxed">
          Authorization is determined by Slack identity per-request — no
          shared credentials, no ambient trust. If you aren&rsquo;t in the
          admin list, the agent simply doesn&rsquo;t have the tools you&rsquo;re
          asking for.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10">
          Custom Extensions
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          The upstream Centaur platform is extended with org-specific
          modifications:
        </p>

        <ul className="text-zinc-400 leading-relaxed space-y-2 list-disc pl-6">
          <li>
            <strong className="text-zinc-300">Wiki API.</strong> A RESTful
            wiki backend storing append-only page revisions with full edit
            history, diffing, and timeline views. Pages are ingested from
            Slack conversations, documents, and codebases — the agent builds
            its own knowledge base over time.
          </li>
          <li>
            <strong className="text-zinc-300">Signed commits.</strong> Every
            git operation from inside a sandbox produces a cryptographically
            signed commit with a dedicated agent identity. This is required
            by the org&rsquo;s branch protection rules.
          </li>
          <li>
            <strong className="text-zinc-300">Release watcher.</strong> A
            scheduled workflow polls GitHub releases, generates an LLM
            changeset summary, attributes affected components from path
            diffs, and posts to the team Slack channel. Deduplicated by a
            persistent cursor.
          </li>
          <li>
            <strong className="text-zinc-300">Standup digest.</strong> Every
            weekday morning, the agent compiles GitHub releases, merged PRs,
            Linear activity, and Slack discussions into a structured briefing
            document. Fully automated — no one has to remember to run it.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-10">
          Deployment
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          Everything is defined as code. Terraform provisions the GCP
          resources (GKE, Cloud SQL, GCS, Artifact Registry). Helm deploys
          the application layer. The overlay is built as a Docker image and
          mounted into every sandbox. Configuration lives in the repo —
          secrets are injected at deploy time, never committed.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          The submodule tracks a fork of upstream Centaur with org-specific
          patches rebased onto it. When upstream ships fixes, the fork
          rebases, the images rebuild, and the cluster rolls forward. The
          patch surface is deliberately small — no rewrites of engine
          behavior, only additive extensions and thin config overrides.
        </p>

        <hr className="border-zinc-800 my-8" />

        <p className="text-zinc-500 text-sm leading-relaxed">
          This describes the infrastructure and operational surface of the
          Darkbloom Centaur deployment. Internal access policies, specific
          tool integrations, and runtime behavior are documented in the
          repository.
        </p>
      </article>

      <footer className="mt-16 border-t border-zinc-800/50 pt-8 text-center text-xs text-zinc-600">
        <p>© {new Date().getFullYear()} Ethen Pociask</p>
      </footer>
    </div>
  );
}