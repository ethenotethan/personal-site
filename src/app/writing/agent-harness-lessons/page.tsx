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
          Six months ago I was told to build an AI agent harness that ran on
          Apple Silicon clusters. Not a prototype. Not a demo. Production.
          Agents that reason, call tools, manage state, and don&rsquo;t crash
          while you&rsquo;re asleep. Here&rsquo;s what I learned.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          Model selection is a trap
        </h2>

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
