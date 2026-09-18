"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

const experiences = [
  { title: "Senior Infrastructure Engineer", company: "Eigen Labs", url: "https://www.eigencloud.xyz/", start: "Apr 2024", end: "Present", points: ["Built and operated a personal AI agent harness on Apple Silicon — Hermes fork, Nomad orchestration, Cloudflare Tunnel, cross-platform native client", "Managed development of an Arbitrum Orbit fork integrated with EigenDA through Stage 1 decentralization", "Built cross-platform native AI agent client (HermesNative) in SwiftUI — macOS + iOS, WebSocket JSON-RPC gateway, wiki graph, cron pipelines", "Worked closely with key RaaS partners and blockchain customers to triage bugs and stand up blockchain infrastructure", "Proposed and helped manage a unified DA server used across EigenDA rollup integrations — unblocking more than $1B in TVS"] },
  { title: "Senior Protocol Security Engineer", company: "Coinbase", url: "https://www.coinbase.com/", start: "May 2024", end: "Dec 2024", points: ["Designed and operationalized security assessment frameworks for novel smart contract execution environments", "Built an in-house monitoring service for real-time threat detection on OP Stack blockchains; worked closely with the Base protocol team", "Designed interview pipelines, trained new hires, and led daily meetings to upskill and unblock coworkers", "Catalyzed creation of internal smart contract monitoring — full coverage of 200+ assets across blockchain protocols"] },
  { title: "Senior EVM Engineer", company: "Shadow", url: "https://www.shadow.xyz/", start: "Dec 2023", end: "Apr 2024", points: ["Architected and productionized a distributed Ethereum RPC API handling 100+ reqs/second with minimal latency", "Production hardened an internal EVM environment and identified key security vulnerabilities in execution", "Established robust monitoring and resiliency routines for internally hosted node integrations"] },
  { title: "Blockchain Security Engineer", company: "Coinbase", url: "https://www.coinbase.com/", start: "May 2021", end: "May 2024", points: ["Designed and operationalized risk analysis frameworks for analyzing onchain tokenized assets for secure listings on Coinbase exchange", "Designed and implemented REST API for smart contract analysis tool enabling quicker turnaround on security intake requests"] },
  { title: "Product Engineering Intern", company: "Lucid", url: "https://lucid.co/", start: "Jun 2020", end: "May 2021", points: ["Migrated AWS data streams from Kafka to Kinesis in a Java ETL microservice, saving ~$60K/year", "Dockerized legacy MSSQL database for improved developer experience", "Assembled Go data processing microservice with layered REST API using Redis, DynamoDB, S3, and Kinesis"] },
  { title: "Cofounder", company: "Volatrade", start: "Nov 2019", end: "May 2021", points: ["Built an end-to-end crypto trade simulation system", "Built an ML pipeline for training, deploying, and integrating TensorFlow models", "Operated simulation strategies driven by model outputs"] },
];

const awards = [
  { title: "ETH New York 2023 Hackathon Winner", org: "ETHGlobal", date: "Sep 2023", url: "https://ethglobal.com/showcase/style-check-85zy7", detail: "Automation tool for the Arbitrum Stylus smart contract platform" },
  { title: "ETH Denver 2023 Binance Hackathon Winner", org: "ETH Denver", date: "Feb 2023", detail: "Smart contract risk automation tool PoC — real-time threat detection via user wallet" },
  { title: "ETH Denver 2023 NEAR Hackathon Winner", org: "ETH Denver", date: "Feb 2023", detail: "Light client proofs via storage proofs — added accessor logic to state trie traversal" },
  { title: "ETH San Francisco 2022 Hackathon Participant", org: "ETHGlobal", date: "Oct 2022", detail: "Novel implementation of TSTORE and TLOAD opcodes on op-geth; hand-wrote EVM bytecode for testing" },
  { title: "ETH Online 2022 Hackathon Participant", org: "ETHGlobal", date: "Dec 2022", detail: "Hacked pre-bedrock OP Stack to settle calldata batches and state commitments on FileCoin via FEVM" },
];

const interests = ["Ethereum Rollups", "Zero Knowledge Cryptography", "Distributed Systems", "LLMs & AI Agents", "EVM Scalability", "Systems Design", "Computer Networks", "Utilitarian Web3"];

const beliefs = [
  { emoji: "🤖", text: "Local LLMs are the only real democratization. Everything else is renting your intelligence from someone else's server." },
  { emoji: "⚡", text: "AI will transform human societies in ways most of us aren't prepared for." },
  { emoji: "🔮", text: "Decentralization isn't about ideology — it's about removing single points of failure, including people." },
  { emoji: "🌊", text: "Your job won't love you back. Build skills, not loyalty." },
  { emoji: "🎯", text: "The best code is the code that solves a real problem. Everything else is cosplay." },
  { emoji: "🪦", text: "We're all going to die. Spread good vibes in this entropic universe. Might as well work on interesting problems." },
];

const taglines = [
  "at Eigen Labs — building AI infrastructure and agent systems",
  "protocol security, EVM infrastructure, and production AI systems",
  "building systems that survive contact with production",
  "running inference on a Mac Studio like a responsible adult",
];

const links = {
  github: "https://github.com/ethenotethan",
  twitter: "https://x.com/ethen_not_ethan",
  linkedin: "https://www.linkedin.com/in/ethen-p-5bb640148",
  email: "mailto:ethenpo@gmail.com",
};

const proofPoints = [
  { value: "6+ years", label: "engineering production systems" },
  { value: "200+", label: "onchain assets monitored" },
  { value: "$1B+", label: "rollup integrations supported" },
  { value: "3×", label: "ETH hackathon winner" },
];

const selectedWork = [
  {
    eyebrow: "AI agent infrastructure",
    title: "Hermes agent harness",
    desc: "Built and operate a self-hosted agent system on Apple Silicon with tool execution, parallel subagents, durable memory, scheduled workflows, and native clients.",
    href: "/writing/agent-harness-lessons",
  },
  {
    eyebrow: "Native AI systems",
    title: "Portal",
    desc: "Built an open-source macOS and iOS operations console for AI agents: streaming chat, multi-gateway sessions, knowledge graphs, artifacts, skills, cron, and learning tools.",
    href: "https://ethenotethan.github.io/portal/",
  },
  {
    eyebrow: "Real-time voice agents",
    title: "Google Meet conversation agent",
    desc: "Built a meeting agent that joins calls, consumes live transcripts, routes context through LLMs and memory, and streams generated speech back into the conversation.",
    href: "https://github.com/ethenotethan/gmeet-pipeline",
  },
  {
    eyebrow: "Protocol security",
    title: "OP Stack threat monitoring",
    desc: "Built real-time monitoring used in production to secure Base, then helped expand internal coverage across 200+ onchain assets.",
    href: "https://blog.base.org/embracing-optimism-with-pessimism",
  },
];

const technicalWriting = [
  {
    title: "How to Evaluate Forked EVMs for Security Risks",
    source: "Coinbase Blog · May 2023",
    desc: "A practical framework for assessing security risk in Ethereum Virtual Machine forks.",
    href: "https://www.coinbase.com/blog/how-to-evaluate-forked-evms-for-security-risks",
  },
  {
    title: "Open Source Monitoring for OP Stack Blockchains",
    source: "Base Blog · Jul 2024",
    desc: "The monitoring system built for real-time protocol threat detection on Base.",
    href: "https://blog.base.org/embracing-optimism-with-pessimism",
  },
];

const footerLine = "Nothing on this page matters, but I enjoyed making it.";

function CollapsibleSection({
  title,
  subtitle,
  teaser,
  children,
  defaultOpen = false,
}: {
  title: string;
  subtitle: string;
  teaser: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const sectionId = useId();
  const headingId = `${sectionId}-heading`;
  const contentId = `${sectionId}-content`;

  return (
    <div className="mb-12">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={open ? contentId : undefined}
        className="group flex w-full items-center gap-3 rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      >
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs text-zinc-600 shrink-0 mt-0.5 font-mono select-none"
        >
          ▸
        </motion.span>
        <div className="min-w-0 flex-1">
          <h2 id={headingId} className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-400 transition-colors">
            {title}
          </h2>
          {open ? (
            <p className="text-[11px] text-zinc-700 font-mono mt-0.5">{subtitle}</p>
          ) : (
            <p className="text-[11px] text-zinc-600 font-mono mt-0.5 truncate">{teaser}</p>
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={headingId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-6 pl-7">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const [showAllAwards, setShowAllAwards] = useState(false);
  const visibleAwards = showAllAwards ? awards : awards.slice(0, 3);

  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
    <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 md:py-32">
      {/* Hero — always visible */}
      <motion.section
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-10"
      >
        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
        >
          <span className="gradient-text">Ethen Pociask</span>
        </motion.h1>
        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-2 text-lg text-zinc-400 md:text-xl"
        >
          <span className="text-zinc-300">Senior Infrastructure Engineer at Eigen Labs.</span>{" "}
          Protocol security, blockchain infrastructure & AI systems.
        </motion.p>
        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-1 text-sm text-zinc-600 font-mono"
        >
          {"// currently: "}
          <AnimatePresence mode="wait">
            <motion.span
              key={taglineIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
              className="inline-block"
            >
              {taglines[taglineIndex]}
            </motion.span>
          </AnimatePresence>
          <span className="inline-block w-[7px] h-[14px] bg-brand ml-[3px] align-[-1px] animate-pulse" />
        </motion.p>
        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400"
        >
          I build and secure infrastructure for decentralized and AI systems. Across 6+ years in software—including roles at Eigen Labs, Coinbase, and Shadow—I&apos;ve worked on forked EVM analysis, real-time protocol monitoring, rollup infrastructure, and production AI platforms. Based in Bangkok, working globally.
        </motion.p>
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 flex flex-wrap gap-3 text-sm"
        >
          <a href="#selected-work" className="on-brand rounded-md bg-brand-dim px-4 py-2 font-medium text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-glow">
            Selected work ↓
          </a>
          <a href="#writing" className="rounded-md border border-zinc-700 px-4 py-2 text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
            Technical writing
          </a>
          <a href={links.email} className="rounded-md border border-zinc-800 px-4 py-2 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
            Email
          </a>
        </motion.div>
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-5 flex gap-5 text-xs"
        >
          {[
            { label: "GitHub", href: links.github },
            { label: "X / Twitter", href: links.twitter },
            { label: "LinkedIn", href: links.linkedin },
          ].map((link) => (
            <motion.a key={link.label} href={link.href} target="_blank" rel="noopener" className="text-zinc-500 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-brand hover:after:w-full after:transition-all" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {link.label}
            </motion.a>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        aria-label="Career highlights"
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-zinc-800/60 bg-zinc-800/60 sm:grid-cols-4"
      >
        {proofPoints.map((proof) => (
          <div key={proof.label} className="bg-zinc-950/90 px-4 py-4">
            <p className="text-lg font-semibold text-white">{proof.value}</p>
            <p className="mt-0.5 text-[11px] leading-snug text-zinc-500">{proof.label}</p>
          </div>
        ))}
      </motion.section>

      {/* Selected Work — always visible */}
      <motion.section
        id="selected-work"
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-20 scroll-mt-12"
      >
        <div className="flex items-baseline gap-3 mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">SELECTED WORK</h2>
          <p className="hidden text-[11px] text-zinc-700 font-mono sm:block">{"// systems that made it to production"}</p>
        </div>
        <div className="grid gap-3">
          {selectedWork.map((work, i) => (
            <motion.div
              key={work.title}
              initial={false}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="group rounded-lg border border-zinc-800/60 bg-zinc-900/25 p-5 transition-colors hover:border-zinc-700"
            >
              <p className="text-[11px] font-mono text-brand">{work.eyebrow}</p>
              <h3 className="mt-1 text-base font-semibold text-white">{work.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{work.desc}</p>
              {work.href.startsWith("/") ? (
                <Link href={work.href} aria-label={`Read the ${work.title} case study`} className="mt-3 inline-block text-xs text-zinc-500 transition-colors group-hover:text-brand">Read the case study →</Link>
              ) : (
                <a href={work.href} target="_blank" rel="noopener" aria-label={`View ${work.title}`} className="mt-3 inline-block text-xs text-zinc-500 transition-colors group-hover:text-brand">View the work →</a>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Experience */}
      <CollapsibleSection title="Experience" subtitle="// things I've done for money" teaser="6 roles — Eigen Labs, Coinbase, Shadow, Lucid, Volatrade">
        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="relative border-l border-zinc-800 pl-6 pb-2 group"
            >
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand timeline-dot group-hover:bg-brand-glow transition-colors" />
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <h3 className="font-semibold text-white text-sm">{exp.title}</h3>
                <span className="text-zinc-600">·</span>
                {exp.url ? (
                  <a href={exp.url} className="text-brand hover:text-brand-glow transition-colors text-sm" target="_blank" rel="noopener">{exp.company}</a>
                ) : (
                  <span className="text-zinc-400 text-sm">{exp.company}</span>
                )}
              </div>
              <p className="mb-2 text-xs text-zinc-600">{exp.start} — {exp.end}</p>
              <ul className="space-y-1.5">
                {exp.points.map((p, j) => (
                  <li key={j} className="text-sm leading-relaxed text-zinc-400">— {p}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Interests */}
      <CollapsibleSection title="Interests" subtitle="// rabbit holes I've fallen into" teaser="Ethereum Rollups, ZK Crypto, Distributed Systems, LLMs & more">
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <span key={interest} className="rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-xs text-zinc-400">
              {interest}
            </span>
          ))}
        </div>
      </CollapsibleSection>

      {/* Education */}
      <CollapsibleSection title="Education" subtitle="// paid money to learn things I mostly taught myself anyway" teaser="BS Computer Science, University of San Francisco">
        <div className="relative border-l border-zinc-800 pl-6">
          <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand timeline-dot" />
          <h3 className="font-semibold text-white">BS Computer Science</h3>
          <p className="text-sm text-zinc-400">University of San Francisco</p>
          <p className="text-xs text-zinc-600">2017 — 2021</p>
          <p className="mt-1 text-sm text-zinc-500">Minored in Mathematics. Tinkered with algorithmic trading and machine learning.</p>
        </div>
      </CollapsibleSection>

      {/* Awards */}
      <CollapsibleSection title="Awards & Hackathons" subtitle="// sleep-deprived weekends that paid off" teaser="5 hackathons — 3 wins across ETH Global">
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {visibleAwards.map((award) => (
              <motion.div
                key={award.title}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="rounded-lg border border-zinc-800/60 bg-zinc-900/30 p-4"
              >
                <h3 className="font-medium text-white text-sm">
                  {award.url ? <a href={award.url} className="hover:text-brand transition-colors" target="_blank" rel="noopener">{award.title}</a> : award.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">{award.org} · {award.date}</p>
                <p className="text-xs text-zinc-500 mt-1">{award.detail}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {awards.length > 3 && (
          <button onClick={() => setShowAllAwards(!showAllAwards)} className="mt-4 text-xs text-brand hover:text-brand-glow transition-colors">
            {showAllAwards ? "ok that's enough ↑" : `Show all ${awards.length} →`}
          </button>
        )}
      </CollapsibleSection>

      {/* Technical writing — always visible */}
      <motion.section
        id="writing"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 scroll-mt-12"
      >
        <div className="mb-6 flex items-baseline gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">TECHNICAL WRITING</h2>
          <a href="https://hackmd.io/@epociask" target="_blank" rel="noopener" className="hidden text-[11px] font-mono text-zinc-700 transition-colors hover:text-brand sm:block">{"// more notes on HackMD →"}</a>
        </div>
        <div className="space-y-3">
          {technicalWriting.map((writing) => (
            <div key={writing.title} className="rounded-lg border border-zinc-800/60 bg-zinc-900/30 p-4">
              <h3 className="text-sm font-medium text-white">
                {writing.href.startsWith("/") ? (
                  <Link href={writing.href} className="transition-colors hover:text-brand">{writing.title}</Link>
                ) : (
                  <a href={writing.href} target="_blank" rel="noopener" className="transition-colors hover:text-brand">{writing.title}</a>
                )}
              </h3>
              <p className="mt-0.5 text-xs text-zinc-400">{writing.source}</p>
              <p className="mt-1 text-xs text-zinc-500">{writing.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <CollapsibleSection title="Personal Writing" subtitle="// the less technical parts of being alive" teaser="Surviving AI Psychosis">
        <div className="rounded-lg border border-zinc-800/60 bg-zinc-900/30 p-4">
          <h3 className="text-sm font-medium text-white">
            <Link href="/writing/ai-psychosis" className="transition-colors hover:text-brand">Surviving AI Psychosis</Link>
          </h3>
          <p className="mt-0.5 text-xs text-zinc-400">ethen.me · Jun 2026</p>
          <p className="mt-1 text-xs text-zinc-500">What happened when AI, sleep deprivation, and certainty fed each other until my mind broke.</p>
        </div>
      </CollapsibleSection>

      {/* What I Believe */}
      <CollapsibleSection title="What I Believe" subtitle="// things I tell myself at 2am" teaser="6 principles — click to expand">
        <div className="space-y-3">
          {beliefs.map((belief) => (
            <div key={belief.text} className="flex items-start gap-3 rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-4">
              <span className="text-lg mt-0.5 shrink-0">{belief.emoji}</span>
              <p className="text-sm text-zinc-400 leading-relaxed">{belief.text}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Hobbies */}
      <CollapsibleSection title="Hobbies" subtitle="// things that aren't computers" teaser="Mixing music · Photography · Muay Thai">
        <div className="space-y-4">
          <div className="rounded-lg border border-zinc-800/60 bg-zinc-900/30 p-5">
            <h3 className="font-medium text-white text-sm mb-2">🎵 Mixing Music</h3>
            <p className="text-sm text-zinc-500">
              Bedroom DJ since before it was cool. Drum and bass, house, hip-hop. Formerly unknown{" "}
              <a href="https://soundcloud.com/dj_filo" className="text-brand hover:text-brand-glow transition-colors" target="_blank" rel="noopener">SoundCloud</a>{" "}
              artist (still unknown, technically). I do 2-3 performances a year and mostly mix for close friends.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800/60 bg-zinc-900/30 p-5">
            <h3 className="font-medium text-white text-sm mb-2">📸 Photography</h3>
            <p className="text-sm text-zinc-500">
              Noob photos of animals, landscapes, and people I encounter while travelling.{" "}
              <a href="https://vsco.co/epociask/gallery" className="text-brand hover:text-brand-glow transition-colors" target="_blank" rel="noopener">See some favorites →</a>
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800/60 bg-zinc-900/30 p-5">
            <h3 className="font-medium text-white text-sm mb-2">🥊 Muay Thai</h3>
            <p className="text-sm text-zinc-500">
              Started in 2022 to feel something other than VS Code frustration. Trained in San Francisco, New York, and Chiang Mai. The bruises remind me I&apos;m still alive. Nothing teaches iteration speed like getting kicked in the ribs.
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* Contact */}
      <CollapsibleSection title="Contact" subtitle="// I read every email. whether I reply is a different question" teaser="ethenpo@gmail.com">
        <p className="text-sm text-zinc-400">
          Business, collaboration, or existential debates:{" "}
          <a href={links.email} className="text-brand hover:text-brand-glow transition-colors">ethenpo@gmail.com</a>
        </p>
      </CollapsibleSection>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-16 border-t border-zinc-800/50 pt-8 text-center text-xs text-zinc-600"
      >
        <p>© {new Date().getFullYear()} Ethen Pociask</p>
        <p className="mt-1 text-zinc-700">Built with caffeine, nihilism, and Next.js. {footerLine}</p>
      </motion.footer>
    </div>
    </MotionConfig>
  );
}