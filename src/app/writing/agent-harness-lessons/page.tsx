import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agent Harness Lessons — Ethen Pociask",
  description:
    "War stories from running an AI agent harness on Apple Silicon: model selection, prompt caching, parallel agents, and tool execution at scale.",
};

export default function AgentHarnessLessons() {
  return (
    <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 md:py-32">
      <Link
        href="/"
        className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors mb-8 inline-block"
      >
        ← back
      </Link>

      <article className="prose prose-invert prose-zinc max-w-none">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          What I Learned Running an AI Agent Harness on Apple Silicon for a Month
        </h1>
        <p className="text-zinc-500 text-sm mt-2">
          A war story from the trenches of local inference, agent orchestration,
          and why production is different from a demo.
        </p>

        <hr className="border-zinc-800 my-8" />

        <p className="text-zinc-400 leading-relaxed">
          I built an AI agent harness running on a cluster of heterogeneous Apple Silicon devices — Mac Studios, MacBooks, whatever had a GPU and was in the room — because I wanted to see how far you could push local inference for agent workloads. Not a prototype. Not a demo. Production. Agents that reason, call tools, delegate subtasks, manage their own state, and don&rsquo;t crash while you&rsquo;re asleep. Here&rsquo;s what I learned.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          The Cluster: Heterogeneous Apple Silicon
        </h2>

        <div className="my-6 p-4 border border-zinc-800 rounded-lg bg-zinc-900/30 overflow-x-auto">
          <pre className="text-xs text-zinc-400 font-mono leading-relaxed whitespace-pre">
{`┌─────────────────────────────────────────────────────────────┐
│                     Cloudflare Tunnel                        │
│          gateway.ethen.me → :9119   models.ethen.me → :8642   │
└──────────────┬──────────────────────────────┬────────────────┘
               │                              │
     ┌─────────▼──────────┐        ┌──────────▼─────────┐
     │   M3 Ultra 256GB   │        │  MacBook / Studio   │
     │   (orchestrator)   │        │  (inference worker) │
     │                    │        │                     │
     │  ┌──────────────┐  │        │  ┌───────────────┐  │
     │  │ Agent Loop   │  │  Nomad │  │  MLX Backend  │  │
     │  │ (Hermes)     │◄─┼────────┼──│  (d-inference)│  │
     │  └──────┬───────┘  │  gossip│  └───────────────┘  │
     │         │          │  + svc │                     │
     │  ┌──────▼───────┐  │  disc  │  ┌───────────────┐  │
     │  │ Cron Engine  │  │        │  │  Speculative   │  │
     │  │ + Webhooks   │  │        │  │  Decode Worker │  │
     │  └──────────────┘  │        │  └───────────────┘  │
     │                    │        │                     │
     │  ┌──────────────┐  │        │  ┌───────────────┐  │
     │  │ Git Worktrees│  │        │  │  E2E Latency   │  │
     │  │ (per-agent)  │  │        │  │  Profiler      │  │
     │  └──────────────┘  │        │  └───────────────┘  │
     └────────────────────┘        └─────────────────────┘`}
          </pre>
        </div>

        <p className="text-zinc-400 leading-relaxed">
          The setup is heterogeneous by necessity. You don&rsquo;t buy a rack of
          identical Apple Silicon boxes — you use whatever hardware is
          available and make it work as a unified pool. The orchestrator
          handles the agent loop, cron scheduling, webhook ingestion, and
          state management. Inference gets dispatched to whichever node has
          free GPU capacity.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          Infrastructure Glue: Why Nomad
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          When you&rsquo;re running a dozen different services across
          heterogeneous devices — MLX inference backends, speculative decode
          workers, E2E latency profilers, cron engines, WebSocket gateways —
          you need a way to know what&rsquo;s alive, what&rsquo;s dead, and
          what&rsquo;s limping. Kubernetes is overkill for this. Nomad
          isn&rsquo;t.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          Nomad gives you three things that matter for agent infra:
        </p>

        <ul className="text-zinc-400 leading-relaxed space-y-2 list-disc pl-6">
          <li>
            <strong className="text-zinc-300">
              Service discovery without the ceremony.
            </strong>{" "}
            Services register themselves via gossip protocol. No etcd. No
            control plane tax. When a new inference worker comes online, the
            orchestrator learns about it without a config change.
          </li>
          <li>
            <strong className="text-zinc-300">
              Health checks as first-class citizens.
            </strong>{" "}
            Every service gets script-based health checks. If the MLX backend
            hangs (which it does), Nomad restarts it. If the speculative decode
            worker&rsquo;s memory leaks past a threshold, Nomad flags it and
            reroutes traffic.
          </li>
          <li>
            <strong className="text-zinc-300">
              One binary, one view.
            </strong>{" "}
            All service logs, statuses, and allocation history in one place. No
            stitching together journald, syslog, and whatever the model
            server decided to print to stderr. When an agent job fails at 3am,
            you can trace it through the entire stack in one dashboard.
          </li>
        </ul>

        <p className="text-zinc-400 leading-relaxed">
          The alternative — SSHing into each machine and manually checking
          processes — doesn&rsquo;t scale past two nodes. Nomad is the
          difference between &ldquo;I think everything is running&rdquo; and
          &ldquo;I know exactly which service is degraded.&rdquo;
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          State Checkpoints: Don&rsquo;t Lose Your Agent&rsquo;s Brain
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          An agent&rsquo;s session is a SQLite database of conversations,
          memory files, learned skills, and accumulated context. If the machine
          dies, the agent dies with it. If you migrate to new hardware, the
          agent is a newborn.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          The fix: backup loops. Dump the entire knowledge base — sessions DB,
          memory store, skills directory, config — to cloud object storage on a
          schedule. GCS, S3, doesn&rsquo;t matter. The format doesn&rsquo;t
          matter — the consistency does.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          More important than the backup is the restoration test. Don&rsquo;t
          wait until you need it. Once a week, spawn a fresh agent from the
          backup and verify it can resume an in-progress task. The backup
          that hasn&rsquo;t been tested is a lie you tell yourself to sleep
          better.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          Agentic Identity: Your Agent Is Not You
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          This is the lesson that took me the longest to fully absorb: the
          agent is a separate entity and needs to be treated as one. Not a tool
          you wield. Not an extension of your will. A semi-autonomous process
          with its own identity, credentials, and attack surface.
        </p>

        <p className="text-zinc-400 leading-relaxed">Concrete implications:</p>

        <ul className="text-zinc-400 leading-relaxed space-y-2 list-disc pl-6">
          <li>
            <strong className="text-zinc-300">
              Give it separate accounts.
            </strong>{" "}
            The agent gets its own GitHub account, its own email, its own
            social profiles. Not yours. Ever. This isn&rsquo;t about
            aesthetics — it&rsquo;s about blast radius. When the agent tries
            to escalate agency during goal-seeking (and it will), the
            credentials it exhausts are the agent&rsquo;s, not yours.
          </li>
          <li>
            <strong className="text-zinc-300">
              Never link your personal accounts.
            </strong>{" "}
            An agent will commandeer browsers, exhaust API keys, and try
            every credential it can find in the environment. If it has access
            to your GitHub token, it will use it. If it has your email
            password, it will log in. Segmentation isn&rsquo;t paranoia —
            it&rsquo;s the minimum viable security posture.
          </li>
          <li>
            <strong className="text-zinc-300">
              Give it source code awareness.
            </strong>{" "}
            The agent should know where its own source code lives and how
            it&rsquo;s structured. When it needs to self-modify — fix a bug
            in a tool implementation, adjust a skill, patch a cron job — it
            can do it without you. This is the difference between an agent
            you babysit and an agent that maintains itself.
          </li>
          <li>
            <strong className="text-zinc-300">
              Git as commitment layer.
            </strong>{" "}
            Every service deploy, every config change, every skill update gets
            committed. The agent has its own repo. You can audit what it
            changed and when. Credible commitments scale — you stop worrying
            about what the agent is doing because every action has a paper
            trail.
          </li>
        </ul>

        <p className="text-zinc-400 leading-relaxed">
          This separation also makes development easier. You can build a native
          app to interact with the agent (I did — it&rsquo;s called
          HermesNative) because the agent is its own thing with its own
          WebSocket gateway. Native Discord/Telegram integrations are brittle
          at scale and provide minimal introspection — a dedicated client
          solves both problems.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          Every benchmark in the world will tell you Model X is the best. Then you
          run it on an actual agent task — multi-turn reasoning with tool calls,
          context windows that grow to 80K tokens — and it falls apart. It
          hallucinates tool schemas. It forgets what it was doing three turns
          ago. It gets stuck in loops where it calls the same failing tool 15
          times.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          The model that benchmarks best is never the model that agents best.
        </p>

        <p className="text-zinc-400 leading-relaxed">What actually mattered:</p>

        <ul className="text-zinc-400 leading-relaxed space-y-2 list-disc pl-6">
          <li>
            <strong className="text-zinc-300">
              Instruction following under long contexts.
            </strong>{" "}
            Can it still read tool output at turn 40 and act on it? Half the
            models we tested couldn&rsquo;t.
          </li>
          <li>
            <strong className="text-zinc-300">
              Hallucination rate on tool schemas.
            </strong>{" "}
            Some models would invent parameters that didn&rsquo;t exist. Others
            would call <code>read_file</code> with a{" "}
            <code>line_number</code> parameter that was never in the schema.
          </li>
          <li>
            <strong className="text-zinc-300">
              Consistency across providers.
            </strong>{" "}
            The same model name through different providers behaved differently.
            OpenRouter vs. direct API — different system prompt handling,
            different truncation behavior, different everything.
          </li>
        </ul>

        <p className="text-zinc-400 leading-relaxed">
          We ended up on a model I won&rsquo;t name because it&rsquo;ll change in
          three months. The point isn&rsquo;t the model. The point is:{" "}
          <strong className="text-zinc-300">
            benchmark with actual agent runs, not eval harness scores.
          </strong>
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          Prompt caching is everything
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          Running local LLMs is &ldquo;cheap&rdquo; until you&rsquo;re sending
          the same 60K token system prompt on every turn for 12 concurrent
          agents. Your memory bandwidth evaporates. Your context fills up with
          garbage. Your agent gets dumber the longer it runs because the system
          prompt drifts out of the attention window.
        </p>

        <p className="text-zinc-400 leading-relaxed">What fixed it:</p>

        <ul className="text-zinc-400 leading-relaxed space-y-2 list-disc pl-6">
          <li>
            <strong className="text-zinc-300">
              Aggressive prefix caching.
            </strong>{" "}
            If the first 40K tokens of every prompt are identical (system prompt
            + tool schemas + memory), don&rsquo;t recompute them. This cut our
            per-turn latency by 60%.
          </li>
          <li>
            <strong className="text-zinc-300">
              Context compression triggers early.
            </strong>{" "}
            Don&rsquo;t wait until you hit the token limit. Compress at 50% of
            the context window, not 90%. The agent is already degrading before
            the limit.
          </li>
          <li>
            <strong className="text-zinc-300">Trim tool output.</strong> Some
            tools return 20K characters of noise. Summarize it before appending
            to context. The agent doesn&rsquo;t need the full stack trace —
            it needs the error message.
          </li>
        </ul>

        <p className="text-zinc-400 leading-relaxed">
          The M3 Ultra with 256GB unified memory is a monster — but
          it&rsquo;s not infinite. Every token in context is a token the model
          has to attend to. Be stingy.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          Parallel agents don&rsquo;t work the way you think
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          On paper: spawn 10 agents, they all run in parallel, everything
          finishes 10x faster.
        </p>

        <p className="text-zinc-400 leading-relaxed">In reality:</p>

        <ul className="text-zinc-400 leading-relaxed space-y-2 list-disc pl-6">
          <li>
            <strong className="text-zinc-300">
              File system contention.
            </strong>{" "}
            Two agents try to write to the same file. Three agents try to read a
            file that doesn&rsquo;t exist yet because agent #4 hasn&rsquo;t
            created it. Git worktrees help but don&rsquo;t solve everything.
          </li>
          <li>
            <strong className="text-zinc-300">
              Model queue saturation.
            </strong>{" "}
            Your GPU can only run so many inferences concurrently. Parallel
            agents don&rsquo;t mean parallel inference — they mean a queue.
            And queued agents time out.
          </li>
          <li>
            <strong className="text-zinc-300">
              Orchestration deadlocks.
            </strong>{" "}
            Agent A waits for Agent B&rsquo;s output. Agent B waits for Agent A
            to release a lock. Neither knows the other exists. You need explicit
            dependency graphs, not &ldquo;just run them all at once.&rdquo;
          </li>
        </ul>

        <p className="text-zinc-400 leading-relaxed">
          The pattern that actually worked:{" "}
          <strong className="text-zinc-300">sequenced batching.</strong> Run
          3–4 agents in parallel max. The rest wait. Each batch feeds into the
          next. Is it slower on paper? Yes. Does it actually finish without
          deadlocking? Also yes.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          Tool execution at scale is where everything breaks
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          Your agent works beautifully in testing. Then you deploy it and it
          fails on things that aren&rsquo;t even the agent&rsquo;s fault:
        </p>

        <ul className="text-zinc-400 leading-relaxed space-y-2 list-disc pl-6">
          <li>
            <strong className="text-zinc-300">
              <code>ulimit -n 256</code>.
            </strong>{" "}
            macOS defaults to 256 open file descriptors. An agent running cron
            jobs, reading files, writing logs, and managing subprocesses blows
            through that in 10 minutes. Fix it before you deploy or you&rsquo;ll
            spend a day debugging &ldquo;mysterious file open failures.&rdquo;
          </li>
          <li>
            <strong className="text-zinc-300">
              Subprocess timeouts cascade.
            </strong>{" "}
            Agent calls a script. Script hangs (API timeout, network blip,
            whatever). Agent&rsquo;s tool call timeout fires. But the subprocess
            is still running. Now you have orphaned processes eating memory.
            Every agent job needs a process group and a kill switch.
          </li>
          <li>
            <strong className="text-zinc-300">
              Rate limits compound.
            </strong>{" "}
            OpenRouter rate limits. Model provider rate limits. GitHub API rate
            limits. When 5 agents all hit the same API at the same time,
            exponential backoff isn&rsquo;t enough. You need a shared rate
            limiter across all agents.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          The Cloudflare Tunnel pattern
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          Running agents on a local machine means they&rsquo;re not reachable
          from the internet. But you want webhooks. You want the gateway to
          receive messages. You want remote access.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          Cloudflare Tunnel solves this cleanly: expose only what you need
          (gateway on <code>:9119</code>, model optimizer on{" "}
          <code>:8642</code>). No open ports on your router. Automatic HTTPS.
          Zero config changes when your IP changes.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          It&rsquo;s not novel. But if you&rsquo;re self-hosting agent infra on
          Apple Silicon, it&rsquo;s the difference between &ldquo;works on my
          machine&rdquo; and &ldquo;works in production.&rdquo;
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          Operational Cheat Sheet
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          The stuff you learn at 2am debugging why the agent keeps calling a
          tool that doesn&rsquo;t exist:
        </p>

        <ul className="text-zinc-400 leading-relaxed space-y-2 list-disc pl-6">
          <li>
            <strong className="text-zinc-300">
              Disable skills you don&rsquo;t use.
            </strong>{" "}
            The agent loop references available skills based on keyword
            matching in your prompts. If you have 40 skills loaded and you
            actually use 6, the agent will waste tokens trying to load
            irrelevant ones. Prune aggressively. The dashboard is the fastest
            way to manage this.
          </li>
          <li>
            <strong className="text-zinc-300">
              Enable self-learning explicitly.
            </strong>{" "}
            The introspection loop — where the agent reflects on its own
            performance, saves lessons as skills, updates its memory — is not
            on by default in most frameworks. Turn it on. An agent that
            doesn&rsquo;t learn from its mistakes makes the same mistake 500
            times.
          </li>
          <li>
            <strong className="text-zinc-300">
              Define constraints upfront.
            </strong>{" "}
            Frontend styles, reporting structures, GitHub review workflows,
            commit conventions — encode these as explicit constraints before the
            agent starts working. Every time the agent has to guess a
            convention, it burns tokens. Every time it guesses wrong, it burns
            more tokens fixing it. Determinism is cheaper than iteration.
          </li>
          <li>
            <strong className="text-zinc-300">
              The git layer is your safety net.
            </strong>{" "}
            Every deploy, every config change, every skill patch gets
            committed to a repo the agent controls. When something breaks
            (and it will), you have an audit trail. More importantly, you
            can roll back to a known-good state. The git history is your
            insurance policy.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          What I&rsquo;d do differently
        </h2>

        <ol className="text-zinc-400 leading-relaxed space-y-2 list-decimal pl-6">
          <li>
            <strong className="text-zinc-300">Start with fewer tools.</strong>{" "}
            We opened too many toolsets too early. Every tool in the system
            prompt costs 2–5K tokens. Start with 5 tools. Add more when you
            have a real need.
          </li>
          <li>
            <strong className="text-zinc-300">
              Log everything from day one.
            </strong>{" "}
            Agent runs are non-deterministic. When an agent does something
            stupid, you need to know exactly what was in its context, what model
            was selected, what rate limits applied. I built this in later.
            Should&rsquo;ve been day one.
          </li>
          <li>
            <strong className="text-zinc-300">
              Don&rsquo;t trust the benchmarks.
            </strong>{" "}
            Run your actual workload. Profile it. The model that &ldquo;scores
            highest&rdquo; on MMLU will make decisions in production that make
            you question reality.
          </li>
        </ol>

        <hr className="border-zinc-800 my-8" />

        <p className="text-zinc-500 text-sm leading-relaxed">
          This is a snapshot of lessons from running Centaur — an AI agent
          harness I built at EigenCloud — in production on Apple Silicon for
          over a month. The models and tools will change, but the patterns
          won&rsquo;t.
        </p>

        <p className="text-zinc-500 text-sm leading-relaxed mt-4">
          If you&rsquo;re building agent infrastructure and this resonates,
          I&rsquo;m available for consulting:{" "}
          <a
            href="mailto:ethenpo@gmail.com"
            className="text-brand hover:text-brand-glow transition-colors"
          >
            ethenpo@gmail.com
          </a>
        </p>
      </article>

      <footer className="mt-16 border-t border-zinc-800/50 pt-8 text-center text-xs text-zinc-600">
        <p>© {new Date().getFullYear()} Ethen Pociask</p>
      </footer>
    </div>
  );
}
