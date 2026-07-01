---
title: What I Learned Running an AI Agent Harness on Apple Silicon for a Month
subtitle: >-
  A war story from the trenches of local inference, agent orchestration, and
  why production is different from a demo.
description: >-
  War stories from running an AI agent harness on Apple Silicon: model
  selection, prompt caching, parallel agents, and tool execution at scale.
schemaType: TechArticle
schemaDescription: >-
  War stories from running an AI agent harness on Apple Silicon: model
  selection, prompt caching, parallel agents, tool execution at scale, and
  operational lessons.
keywords:
  - AI agent
  - Apple Silicon
  - M3 Ultra
  - MLX
  - speculative decoding
  - prompt caching
  - agent orchestration
  - SwiftUI
  - HermesNative
  - Cloudflare Tunnel
  - Nomad
  - backup loops
  - distributed inference
---

I built an AI agent harness running on a cluster of heterogeneous Apple Silicon devices — Mac Studios, MacBooks, whatever had a GPU and was in the room — because I wanted to see how far you could push local inference for agent workloads. Not a prototype. Not a demo. Production. Agents that reason, call tools, delegate subtasks, manage their own state, and don't crash while you're asleep. Here's what I learned.

## Architecture: Fork, Extend, Deploy

```
                              ┌──────────────────────┐
                              │     HermesNative      │
                              │  SwiftUI (macOS/iOS)  │
                              │  native app client    │
                              └──────────┬───────────┘
                                         │ WebSocket JSON-RPC
                              ┌──────────▼───────────┐
                              │   Cloudflare Tunnel   │
                              │   (mac-studio → edge) │
                              └──────────┬───────────┘
                                         │
┌────────────────────────────────────────▼────────────────────────────────────┐
│                              Hermes Agent (fork)                             │
│                                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │ Agent Loop  │  │ Cron Engine  │  │ Webhook      │  │ Wiki / Memory /  │ │
│  │ (OpenRouter)│  │ backups      │  │ Ingest       │  │ Session Search   │ │
│  └──────┬──────┘  │ digests      │  └──────┬───────┘  └──────────────────┘ │
│         │         │ introspection│         │                                │
│         │         └──────┬───────┘         │                                │
│         │                │                 │                                │
│         └────────────────┼─────────────────┘                                │
│                          │                                                  │
│               ┌──────────▼──────────┐                                       │
│               │    Nomad Scheduler  │                                       │
│               │  service discovery  │                                       │
│               │  health checks      │                                       │
│               │  alloc lifecycle    │                                       │
│               └──────────┬──────────┘                                       │
│                          │                                                  │
│     ┌────────────────────┼────────────────────┐                             │
│     │                    │                    │                             │
│  ┌──▼──────┐      ┌──────▼─────┐      ┌──────▼──────┐                      │
│  │  MLX    │      │ Speculative│      │  E2E Latency│                      │
│  │ Backend │      │   Decode   │      │   Profiler  │                      │
│  └─────────┘      └────────────┘      └─────────────┘                      │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                        Backup Loop (hourly)                          │  │
│  │  state.db.gz + SOUL.md + memories/ + skills/ + config → cloud store  │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

The agent starts as a fork of Hermes — extended with custom RPCs for a native client, wiki graph APIs, news feed pipelines, and whatever else the workload demands. The fork lives under its own GitHub account, separate from mine. This isn't vanity — it's blast radius. If the agent self-modifies and breaks something, it breaks its own fork.

## The Native Client: HermesNative

Native Discord and Telegram integrations are brittle at scale. They give you minimal introspection into what the agent is actually doing and they break whenever the platform changes its API. The fix: a dedicated SwiftUI app that talks to the agent's WebSocket gateway directly.

HermesNative runs on macOS and iOS. It connects to the agent gateway through a Cloudflare Tunnel — no open ports, automatic HTTPS, same URL whether you're on the local network or across the world. The app surfaces sessions, skills, cron jobs, wiki entries, and the agent's learning feed. It's not a chat UI bolted onto a bot — it's an operations console for a semi-autonomous system.

Building a native client forces you to design clear API boundaries. Every RPC the agent exposes — session management, cron control, wiki scanning — has to be well-defined enough to survive a WebSocket round-trip. This constraint makes the agent architecture better because you can't hide sloppy state behind a REPL prompt.

## Infrastructure Glue: Why Nomad

When you're running MLX inference backends, speculative decode workers, E2E latency profilers, and cron engines across multiple Mac Studios, you need to know what's alive and what's not. Kubernetes is overkill. Nomad isn't.

Nomad gives you three things that matter for agent infra:

- **Service discovery without ceremony.** Services register via gossip protocol. No etcd, no control plane tax. When a new worker comes online, the orchestrator learns about it without a config change.
- **Health checks as first-class citizens.** Every service gets script-based health checks. If the MLX backend hangs (which it does), Nomad restarts it. If a worker leaks memory past a threshold, Nomad flags it and reroutes traffic.
- **One binary, one view.** All service logs, statuses, and allocation history in one place. No stitching together journald, syslog, and stderr from five different machines. When an agent job fails at 3am, you trace it through the entire stack in one dashboard.

The alternative — SSHing into each machine and manually checking processes — doesn't scale past one machine. Nomad is the difference between "I think everything is running" and "I know exactly which service is degraded."

## State Checkpoints: Don't Lose Your Agent's Brain

An agent's session is a SQLite database of conversations, memory files, learned skills, and accumulated context. If the machine dies, the agent dies with it. If you migrate to new hardware, the agent is a newborn.

The fix: backup loops. Dump the entire knowledge base — sessions DB, memory store, skills directory, config — to cloud object storage on a schedule. GCS, S3, doesn't matter. The format doesn't matter — the consistency does.

More important than the backup is the restoration test. Don't wait until you need it. Once a week, spawn a fresh agent from the backup and verify it can resume an in-progress task. The backup that hasn't been tested is a lie you tell yourself to sleep better.

## Agentic Identity: Your Agent Is Not You

This is the lesson that took me the longest to fully absorb: the agent is a separate entity and needs to be treated as one. Not a tool you wield. Not an extension of your will. A semi-autonomous process with its own identity, credentials, and attack surface.

Concrete implications:

- **Give it separate accounts.** The agent gets its own GitHub account, its own email, its own social profiles. Not yours. Ever. This isn't about aesthetics — it's about blast radius. When the agent tries to escalate agency during goal-seeking (and it will), the credentials it exhausts are the agent's, not yours.
- **Never link your personal accounts.** An agent will commandeer browsers, exhaust API keys, and try every credential it can find in the environment. If it has access to your GitHub token, it will use it. If it has your email password, it will log in. Segmentation isn't paranoia — it's the minimum viable security posture.
- **Give it source code awareness.** The agent should know where its own source code lives and how it's structured. When it needs to self-modify — fix a bug in a tool implementation, adjust a skill, patch a cron job — it can do it without you. This is the difference between an agent you babysit and an agent that maintains itself.
- **Git as commitment layer.** Every service deploy, every config change, every skill update gets committed. The agent has its own repo. You can audit what it changed and when. Credible commitments scale — you stop worrying about what the agent is doing because every action has a paper trail.

This separation also makes development easier. You can build a native app to interact with the agent (I did — it's called HermesNative) because the agent is its own thing with its own WebSocket gateway. Native Discord/Telegram integrations are brittle at scale and provide minimal introspection — a dedicated client solves both problems.

## Model Selection: Benchmarks Lie

Every benchmark in the world will tell you Model X is the best. Then you run it on an actual agent task — multi-turn reasoning with tool calls, context windows that grow to 80K tokens — and it falls apart. It hallucinates tool schemas. It forgets what it was doing three turns ago. It gets stuck in loops where it calls the same failing tool 15 times.

The model that benchmarks best is never the model that agents best.

What actually mattered:

- **Instruction following under long contexts.** Can it still read tool output at turn 40 and act on it? Half the models we tested couldn't.
- **Hallucination rate on tool schemas.** Some models would invent parameters that didn't exist. Others would call `read_file` with a `line_number` parameter that was never in the schema.
- **Consistency across providers.** The same model name through different providers behaved differently. OpenRouter vs. direct API — different system prompt handling, different truncation behavior, different everything.

We ended up on a model I won't name because it'll change in three months. The point isn't the model. The point is: **benchmark with actual agent runs, not eval harness scores.**

## Prompt caching is everything

Running local LLMs is "cheap" until you're sending the same 60K token system prompt on every turn for 12 concurrent agents. Your memory bandwidth evaporates. Your context fills up with garbage. Your agent gets dumber the longer it runs because the system prompt drifts out of the attention window.

What fixed it:

- **Aggressive prefix caching.** If the first 40K tokens of every prompt are identical (system prompt + tool schemas + memory), don't recompute them. This cut our per-turn latency by 60%.
- **Context compression triggers early.** Don't wait until you hit the token limit. Compress at 50% of the context window, not 90%. The agent is already degrading before the limit.
- **Trim tool output.** Some tools return 20K characters of noise. Summarize it before appending to context. The agent doesn't need the full stack trace — it needs the error message.

The M3 Ultra with 256GB unified memory is a monster — but it's not infinite. Every token in context is a token the model has to attend to. Be stingy.

## Parallel agents don't work the way you think

On paper: spawn 10 agents, they all run in parallel, everything finishes 10x faster.

In reality:

- **File system contention.** Two agents try to write to the same file. Three agents try to read a file that doesn't exist yet because agent #4 hasn't created it. Git worktrees help but don't solve everything.
- **Model queue saturation.** Your GPU can only run so many inferences concurrently. Parallel agents don't mean parallel inference — they mean a queue. And queued agents time out.
- **Orchestration deadlocks.** Agent A waits for Agent B's output. Agent B waits for Agent A to release a lock. Neither knows the other exists. You need explicit dependency graphs, not "just run them all at once."

The pattern that actually worked: **sequenced batching.** Run 3–4 agents in parallel max. The rest wait. Each batch feeds into the next. Is it slower on paper? Yes. Does it actually finish without deadlocking? Also yes.

## Tool execution at scale is where everything breaks

Your agent works beautifully in testing. Then you deploy it and it fails on things that aren't even the agent's fault:

- **`ulimit -n 256`.** macOS defaults to 256 open file descriptors. An agent running cron jobs, reading files, writing logs, and managing subprocesses blows through that in 10 minutes. Fix it before you deploy or you'll spend a day debugging "mysterious file open failures."
- **Subprocess timeouts cascade.** Agent calls a script. Script hangs (API timeout, network blip, whatever). Agent's tool call timeout fires. But the subprocess is still running. Now you have orphaned processes eating memory. Every agent job needs a process group and a kill switch.
- **Rate limits compound.** OpenRouter rate limits. Model provider rate limits. GitHub API rate limits. When 5 agents all hit the same API at the same time, exponential backoff isn't enough. You need a shared rate limiter across all agents.

## The Cloudflare Tunnel pattern

Running agents on a local machine means they're not reachable from the internet. But you want webhooks. You want the gateway to receive messages. You want remote access.

Cloudflare Tunnel solves this cleanly: expose only what you need (gateway on `:9119`, model optimizer on `:8642`). No open ports on your router. Automatic HTTPS. Zero config changes when your IP changes.

It's not novel. But if you're self-hosting agent infra on Apple Silicon, it's the difference between "works on my machine" and "works in production."

## Operational Cheat Sheet

The stuff you learn at 2am debugging why the agent keeps calling a tool that doesn't exist:

- **Disable skills you don't use.** The agent loop references available skills based on keyword matching in your prompts. If you have 40 skills loaded and you actually use 6, the agent will waste tokens trying to load irrelevant ones. Prune aggressively. The dashboard is the fastest way to manage this.
- **Enable self-learning explicitly.** The introspection loop — where the agent reflects on its own performance, saves lessons as skills, updates its memory — is not on by default in most frameworks. Turn it on. An agent that doesn't learn from its mistakes makes the same mistake 500 times.
- **Define constraints upfront.** Frontend styles, reporting structures, GitHub review workflows, commit conventions — encode these as explicit constraints before the agent starts working. Every time the agent has to guess a convention, it burns tokens. Every time it guesses wrong, it burns more tokens fixing it. Determinism is cheaper than iteration.
- **The git layer is your safety net.** Every deploy, every config change, every skill patch gets committed to a repo the agent controls. When something breaks (and it will), you have an audit trail. More importantly, you can roll back to a known-good state. The git history is your insurance policy.

## What I'd do differently

1. **Start with fewer tools.** We opened too many toolsets too early. Every tool in the system prompt costs 2–5K tokens. Start with 5 tools. Add more when you have a real need.
2. **Log everything from day one.** Agent runs are non-deterministic. When an agent does something stupid, you need to know exactly what was in its context, what model was selected, what rate limits applied. I built this in later. Should've been day one.
3. **Don't trust the benchmarks.** Run your actual workload. Profile it. The model that "scores highest" on MMLU will make decisions in production that make you question reality.

---

This is a snapshot of lessons from running Centaur — an AI agent harness I built at EigenCloud — in production on Apple Silicon for over a month. The models and tools will change, but the patterns won't.

If you're building agent infrastructure and this resonates, I'm available for consulting: [ethenpo@gmail.com](mailto:ethenpo@gmail.com)
