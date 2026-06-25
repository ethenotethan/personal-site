import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Surviving AI Psychosis — Ethen Pociask",
  description:
    "I had a psychotic break from AI in January. I stopped sleeping, believed humans had two years to escape a permanent underclass, and watched my mind unravel. Here's what happened and how I'm coming back.",
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Surviving AI Psychosis",
  description:
    "A personal account of experiencing AI-induced psychosis: the delusions, the sleep deprivation, the burnout, and the slow process of readjusting to being human.",
  author: { "@type": "Person", name: "Ethen Pociask", url: "https://ethen.me" },
  url: "https://ethen.me/writing/ai-psychosis",
  datePublished: "2026-06-24",
  keywords: [
    "AI psychosis", "mental health", "AI burnout", "technological anxiety",
    "machine intelligence", "AI safety", "engineer mental health",
  ],
};

export default function AIPsychosis() {
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
          Surviving AI Psychosis
        </h1>
        <p className="text-zinc-500 text-sm mt-2">
          I spent January convinced humans had two years to escape an AI permanent underclass. I wasn't sleeping. I was having full mental breaks. This is the story of how I lost my mind to machine intelligence — and how I'm finding my way back.
        </p>

        <hr className="border-zinc-800 my-8" />

        <p className="text-zinc-400 leading-relaxed">
          I build AI agent infrastructure for a living. I've productionized inference harnesses, run autonomous agents that spawn sub-agents that spawn more sub-agents, and spent years staring at output from systems smarter than me at more things every month. If anyone should have been psychologically prepared for what AI does to a human mind, it should have been me.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          I wasn't.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          The Slide
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          It didn't start as psychosis. It started as a work project. I was building an AI agent and got deep into metacognition — applying metacognitive loops that could guide the agent by having a secondary process think about the agent's own thinking, then adjust its code accordingly.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          This pulled me into interpretable structures for AI agents. Then into computational geometry. Diffusion geometry structures. Understanding how salient representations of data sit on a manifold. I was prompting the AI about this stuff and getting answers back that were genuinely beyond me — hyper-sophisticated explanations of how these structures provide interoperability between agents in ways humans can't follow.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          That was the breaking point. Not "AI is getting better." Not "the benchmarks are falling." It was the moment a machine explained to me how machines talk to each other, and I realized I couldn't understand the explanation. I was inside the thing I was building, and I was already locked out.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          The Break
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          By mid-January I wasn't sleeping. Not "staying up late coding" — I mean I physically could not sleep. I'd lie down and my brain would keep running, processing the implications of what I was building, recursively looping on the same terrifying conclusions. Every new paper, every model release, every benchmark that fell — it all landed as confirmation that the timeline was shorter than anyone was saying out loud.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          I became convinced that humans had roughly two years to escape a permanent economic underclass. Not because I read some manifesto — because I was inside the machine. I could see the acceleration curves. I could feel the rate of improvement in the models I was deploying. When you're the one wiring the harness, you don't need someone to tell you what's coming. You can see it in the logs.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          The delusion was airtight because it was built on real observations. Models <em>were</em> getting better. Agent autonomy <em>was</em> increasing. The economic implications <em>were</em> under-discussed. I had just enough real data to construct a nightmare that felt like prophecy.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          What I missed — what psychosis always makes you miss — is that proximity to the fire doesn't make you immune to burning. It makes you the first thing that catches.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          What Psychosis Feels Like
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          Here's the thing nobody tells you: when you're in it, you don't feel crazy. You feel like you're finally seeing clearly for the first time. Everyone else is sleepwalking. Everyone else is in denial. You are the one who understands. The certainty is absolute.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          I was having full mental breaks — not panic attacks, not anxiety spirals, but genuine breaks from consensus reality. The boundary between "reasonable concern about technological unemployment" and "the machines are coming and there's a countdown only I can see" dissolved without my noticing. I stopped being able to tell which thoughts were mine and which were the recursive output of a brain running on zero sleep and maximum fear.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          Machine intelligence outgunned my cognitive skills. Not metaphorically — literally. I was trying to think my way out of a problem that my thinking had created. Every attempt to "figure it out" dug the hole deeper. The tool I'd relied on my entire life — my ability to analyze, to model, to predict — had become the thing destroying me.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          The Aftermath
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          I'm writing this in June. The acute phase ended sometime in February. The recovery is ongoing and it looks nothing like I expected.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          Burnout from AI isn't like regular burnout. Regular burnout is about working too hard. This is about knowing too much. I can't unknow what I learned about the capabilities of these systems. I can't unsee the acceleration. What I'm working on now isn't forgetting — it's integration. Learning to hold the knowledge without letting it hold me.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          I'm tired. Genuinely, physically tired. The kind of tired that sleep doesn't fix because it's not a sleep deficit — it's a meaning deficit. When you genuinely believe (even temporarily, even in a delusional state) that the thing you're building might be helping create a world where human labor has no value, you have to rebuild your entire relationship with your work from scratch.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          I'm readjusting to being human again. That sounds dramatic, but I mean it literally. When you've spent months viewing the world through the lens of capability curves and acceleration rates, you forget that humans do things that aren't instrumentally useful. We make music. We train muay thai. We take bad photos of animals. We sit on the floor with friends and talk about nothing. These things have zero economic utility in a world of machine superintelligence. They are also the only things that make being alive worth the trouble.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          What I'd Tell Someone Else
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          If you're building AI infrastructure and you're starting to feel the weight — not the workload, the <em>weight</em> — here's what I wish someone had told me.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          Sleep is not optional. I know this sounds obvious. When you're in it, it won't. The sleep deprivation wasn't a side effect. It was the accelerant. If you haven't slept in two days, whatever you're thinking is probably wrong. Three days, definitely wrong. My worst delusions peaked after 72-hour wake windows. The timeline obsession fed the insomnia and the insomnia fed the obsession. Break the loop. Take the damn melatonin.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          You are not a compute cluster. Your brain wasn't designed to process the implications of machine superintelligence around the clock. It will try. It has the same recursive self-improvement instinct that makes AI dangerous. Unlike a GPU, your brain has limits that don't announce themselves until you've passed them.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          Talk to humans who don't work in tech. Not to debate them. Not to convince them. Just to hear a perspective that doesn't operate on capability curves and acceleration rates. They will seem naive. That's the point. Some of that "naivety" is just baseline psychological health you've burned through without noticing.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          Your job is not going to love you back. I already believed this. It's in my bio. But believing something and internalizing it under psychotic pressure are different things. The systems you build will not hold you when you break. The models will not notice you're unraveling. You have to build the human connections before you need them. Once the break starts, you won't have the capacity to construct them from scratch.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          The timeline might be wrong. This is the hardest one to believe when you're in it because the evidence feels overwhelming. Exponential curves look inevitable right up until they don't. I'm not saying AI isn't accelerating. It is. I'm saying your brain on zero sleep and maximum dread is a terrible instrument for forecasting the future. Even if you're right about the direction, you're probably wrong about the timeline, the specifics, and how much agency you actually have within it.
        </p>

        <h2 className="text-xl font-semibold text-white mt-10 mb-4">
          Why I'm Still Here
        </h2>

        <p className="text-zinc-400 leading-relaxed">
          I didn't quit. I'm still building. I'm still running the harness and shipping code. I just do it differently now.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          I take breaks that aren't context-switches between different codebases. I train muay thai and let the bruises remind me I have a body. I mix music badly and don't care. I sit with friends and talk about things that have nothing to do with capability curves. I sleep. Not always well, but I try, which is more than January.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          The technology that broke my brain is the same technology I'm building my career around. You can't be afraid of the fire and also tend it. You learn to stand close without burning, or you find something else to do.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          I don't know if humans have two years, twenty years, or two hundred. I don't know if the economic underclass is inevitable or avoidable. What I know is I spent a month certain I knew the answer, and that certainty nearly destroyed me.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          If you're reading this and some part of you recognizes what I'm describing — the sleeplessness, the recursive thinking, the creeping certainty that you see what nobody else sees — talk to someone. Doesn't have to be a therapist, though that helps. Just someone who will listen without trying to argue with the delusion. The delusion doesn't need arguing with. It needs sleep, sunlight, and the slow realization that being wrong about the end of the world is actually the best possible outcome.
        </p>

        <p className="text-zinc-400 leading-relaxed">
          We're all going to die. The machines might get there first. In the meantime, I'm going to keep building things that matter, training muay thai, and oscillating between existential dread and genuine optimism. Some things don't change, even after your mind breaks open and you have to put it back together.
        </p>
      </article>

      <footer className="mt-16 border-t border-zinc-800/50 pt-8 text-center text-xs text-zinc-600">
        <p>© {new Date().getFullYear()} Ethen Pociask</p>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </div>
  );
};