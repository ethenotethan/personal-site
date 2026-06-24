"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const experiences = [
  { title: "Senior Infrastructure Engineer", company: "EigenCloud", url: "https://www.eigencloud.xyz/", start: "Apr 2024", end: "Present", points: ["Embedded with teams to productionize a distributed inference harness (Centaur) running on Apple Silicon clusters — deployed and stable in production 1+ month", "Managed development of Arbitrum orbit fork integrated with EigenDA with Stage 1 decentralization", "Built cross-platform native AI agent client (HermesNative) in SwiftUI — macOS + iOS, WebSocket JSON-RPC gateway, wiki graph, cron pipelines", "Worked closely with key RaaS partners and blockchain customers to triage bugs and stand up blockchain infra", "Ideated and help manage a unified DA server used across EigenDA rollup integrations — unblocking >$1Bn TVS"] },
  { title: "Senior Protocol Security Engineer", company: "Coinbase", url: "https://www.coinbase.com/", start: "May 2024", end: "Dec 2024", points: ["Designed and operationalized security assessment frameworks for novel smart contract execution environments", "Built in-house monitoring service for real-time threat detection on OP Stack blockchains; worked closely with BASE protocol team", "Designed interview pipelines, trained new hires, and lead daily meetings to upskill/unblock coworkers", "Catalyzed creation of internal smart contract monitoring — full coverage of 200+ assets across blockchain protocols"] },
  { title: "Senior EVM Engineer", company: "Shadow", url: "https://www.shadow.xyz/", start: "Dec 2023", end: "Apr 2024", points: ["Architected and productionized a distributed Ethereum RPC API handling 100+ reqs/second with minimal latency", "Production hardened an internal EVM environment and identified key security vulnerabilities in execution", "Established robust monitoring and resiliency routines for internally hosted node integrations"] },
  { title: "Blockchain Security Engineer", company: "Coinbase", url: "https://www.coinbase.com/", start: "May 2021", end: "May 2024", points: ["Designed and operationalized risk analysis frameworks for analyzing onchain tokenized assets for secure listings on Coinbase exchange", "Designed and implemented REST API for smart contract analysis tool enabling quicker turnaround on security intake requests"] },
  { title: "Product Engineering Intern", company: "Lucid", url: "https://lucid.co/", start: "Jun 2020", end: "May 2021", points: ["Migrated AWS data streams from Kafka to Kinesis in a Java ETL microservice, saving ~$60K/year", "Dockerized legacy MSSQL database for improved developer experience", "Assembled Go data processing microservice with layered REST API using Redis, DynamoDB, S3, and Kinesis"] },
  { title: "Wannabe Cofounder", company: "Volatrade", start: "Nov 2019", end: "May 2021", points: ["Built end-to-end fullstack crypto trade simulation system", "Built ML pipeline for training, deploying, and integrating with TensorFlow models", "Operated simulation strategies around model outputs with 60% accuracy"] },
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
  { emoji: "⚡", text: "Most meetings could've been a Slack message. Most Slack messages could've been nothing." },
  { emoji: "🔮", text: "Decentralization isn't about ideology — it's about removing single points of failure, including people." },
  { emoji: "🌊", text: "Your job won't love you back. Build skills, not loyalty." },
  { emoji: "🎯", text: "The best code is the code that solves a real problem. Everything else is cosplay." },
  { emoji: "🪦", text: "We're all going to die. Spread good vibes in this entropic universe. Might as well work on interesting problems." },
];

const building = [
  { label: "Centaur", url: "", desc: "AI agent harness — production inference on Apple Silicon clusters, agent orchestration, cron pipelines. Stable in prod 1+ month." },
  { label: "HermesNative", url: "https://github.com/researchoors/hermes-native", desc: "Cross-platform AI agent client in SwiftUI (macOS + iOS). WebSocket JSON-RPC gateway, wiki graph, skills browser, cron management." },
  { label: "d‑inference", url: "https://github.com/Layr-Labs/d-inference", desc: "Distributed inference engine integration — MLX backend debugging, speculative decoding benchmarks, E2E latency profiling on Apple Silicon." },
];

const links = {
  github: "https://github.com/ethenotethan",
  twitter: "https://x.com/ethen_not_ethan",
  linkedin: "https://www.linkedin.com/in/ethen-p-5bb640148",
  email: "mailto:ethenpo@gmail.com",
};

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

  return (
    <div className="mb-12">
      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center gap-3 text-left"
      >
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs text-zinc-600 shrink-0 mt-0.5 font-mono select-none"
        >
          ▸
        </motion.span>
        <div className="min-w-0 flex-1">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-400 transition-colors">
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

  return (
    <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 md:py-32">
      {/* Hero — always visible */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-20"
      >
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
        >
          <span className="gradient-text">Ethen Pociask</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-2 text-lg text-zinc-400 md:text-xl"
        >
          Senior Infrastructure Engineer at{" "}
          <a href="https://www.eigencloud.xyz/" className="text-brand hover:text-brand-glow transition-colors" target="_blank" rel="noopener">EigenCloud</a>
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-1 text-sm text-zinc-600 font-mono"
        >
          // currently: building AI infra, shipping cross-platform apps, questioning everything
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400"
        >
          I build infrastructure for AI and decentralized systems — embedding with teams to diagnose problems, ship solutions, and move on. 6+ years across protocol security, distributed systems, and ML infrastructure. I've productionized inference harnesses, built cross-platform native apps, and designed monitoring systems that protected billions in onchain assets. The universe is indifferent, so I write code that actually matters. Between commits I train muay thai, mix music, and oscillate between existential dread and genuine optimism.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 flex gap-5 text-sm"
        >
          {[
            { label: "GitHub", href: links.github },
            { label: "X / Twitter", href: links.twitter },
            { label: "LinkedIn", href: links.linkedin },
            { label: "Email", href: links.email },
          ].map((link) => (
            <motion.a key={link.label} href={link.href} target={link.label !== "Email" ? "_blank" : undefined} rel={link.label !== "Email" ? "noopener" : undefined} className="text-zinc-400 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-brand hover:after:w-full after:transition-all" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {link.label}
            </motion.a>
          ))}
        </motion.div>
      </motion.section>

      {/* Building — always visible, not collapsible */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <div className="flex items-baseline gap-3 mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">BUILDING</h2>
          <p className="text-[11px] text-zinc-700 font-mono">// what I'm shipping right now</p>
        </div>
        <div className="grid gap-2">
          {building.map((proj, i) => (
            <motion.div
              key={proj.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="group flex items-start gap-3 rounded-lg border border-zinc-800/40 bg-zinc-900/15 px-4 py-3"
            >
              <span className="text-xs font-semibold text-brand mt-0.5 shrink-0">
                {proj.url ? (
                  <a href={proj.url} target="_blank" rel="noopener" className="hover:text-brand-glow transition-colors">{proj.label}</a>
                ) : proj.label}
              </span>
              <span className="text-xs text-zinc-500 leading-relaxed">
                {proj.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* What I Believe */}
      <CollapsibleSection title="What I Believe" subtitle="// things I tell myself at 2am" teaser="6 principles — click to expand" defaultOpen>
        <div className="space-y-3">
          {beliefs.map((b, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-4">
              <span className="text-lg mt-0.5 shrink-0">{b.emoji}</span>
              <p className="text-sm text-zinc-400 leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Experience */}
      <CollapsibleSection title="Experience" subtitle="// things I've done for money" teaser="6 roles — EigenCloud, Coinbase, Shadow, Lucid, Volatrade">
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

      {/* Writings */}
      <CollapsibleSection title="Writings" subtitle="// things I've written that people seemed to like" teaser="Coinbase Blog · Base Blog · HackMD">
        <div className="space-y-4">
          <div className="rounded-lg border border-zinc-800/60 bg-zinc-900/30 p-4">
            <h3 className="font-medium text-white text-sm">
              <Link href="/writing/darkbloom-centaur-agent" className="hover:text-brand transition-colors">
                Darkbloom Centaur Agent — Production GCP Deployment
              </Link>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">ethen.me · Jun 2026</p>
            <p className="text-xs text-zinc-500 mt-1">Architecture deep-dive on deploying a self-hosted AI agent platform on GKE: Slack integration, access policy overlays, signed commits, and automated workflows running in us-central1.</p>
          </div>
          <div className="rounded-lg border border-zinc-800/60 bg-zinc-900/30 p-4">
            <h3 className="font-medium text-white text-sm">
              <Link href="/writing/agent-harness-lessons" className="hover:text-brand transition-colors">
                What I Learned Running an AI Agent Harness on Apple Silicon
              </Link>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">ethen.me · Jun 2026</p>
            <p className="text-xs text-zinc-500 mt-1">War stories from the trenches: model selection, prompt caching, parallel agents, and why every tool call is a liability when you're running production agent infrastructure on a Mac Studio.</p>
          </div>
          <div className="rounded-lg border border-zinc-800/60 bg-zinc-900/30 p-4">
            <h3 className="font-medium text-white text-sm">
              <a href="https://www.coinbase.com/blog/how-to-evaluate-forked-evms-for-security-risks" className="hover:text-brand transition-colors" target="_blank" rel="noopener">
                How to Evaluate Forked EVMs for Security Risks
              </a>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">Coinbase Blog · May 2023</p>
            <p className="text-xs text-zinc-500 mt-1">Theoretical analysis of security implications when analyzing Ethereum Virtual Machine forks — motivated by Coinbase's need to securely support onchain tokenized assets across EVM-compatible chains.</p>
          </div>
          <div className="rounded-lg border border-zinc-800/60 bg-zinc-900/30 p-4">
            <h3 className="font-medium text-white text-sm">
              <a href="https://blog.base.org/embracing-optimism-with-pessimism" className="hover:text-brand transition-colors" target="_blank" rel="noopener">
                Open Source Monitoring for OP Stack Blockchains
              </a>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">Base Blog · Jul 2024</p>
            <p className="text-xs text-zinc-500 mt-1">Built an open-source service for real-time protocol threat monitoring on OP Stack blockchains — ran in production to secure the BASE chain.</p>
          </div>
          <div className="rounded-lg border border-zinc-800/60 bg-zinc-900/30 p-4">
            <h3 className="font-medium text-white text-sm">
              <a href="https://hackmd.io/@epociask" className="hover:text-brand transition-colors" target="_blank" rel="noopener">
                Technical Writeups
              </a>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">HackMD</p>
            <p className="text-xs text-zinc-500 mt-1">Personal collection of technical notes and analysis around software systems that pique my interest.</p>
          </div>
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
        <p className="mt-1 text-zinc-700">Built with caffeine, nihilism, and Next.js. Nothing on this page matters, but I enjoyed making it.</p>
      </motion.footer>
    </div>
  );
}