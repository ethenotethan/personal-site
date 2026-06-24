"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";

const experiences = [
  {
    title: "Senior Blockchain Engineer",
    company: "EigenCloud",
    url: "https://www.eigencloud.xyz/",
    start: "Apr 2024",
    end: "Present",
    points: [
      "Managed development of Arbitrum orbit fork integrated with EigenDA with Stage 1 decentralization",
      "Worked closely with key RaaS partners and blockchain customers to triage bugs and stand up blockchain infra",
      "Ideated and help manage a unified DA server used across EigenDA rollup integrations — unblocking >$1Bn TVS",
    ],
  },
  {
    title: "Senior Protocol Security Engineer",
    company: "Coinbase",
    url: "https://www.coinbase.com/",
    start: "May 2024",
    end: "Dec 2024",
    points: [
      "Designed and operationalized security assessment frameworks for novel smart contract execution environments",
      "Built in-house monitoring service for real-time threat detection on OP Stack blockchains; worked closely with BASE protocol team",
      "Designed interview pipelines, trained new hires, and lead daily meetings to upskill/unblock coworkers",
      "Catalyzed creation of internal smart contract monitoring — full coverage of 200+ assets across blockchain protocols",
    ],
  },
  {
    title: "Senior EVM Engineer",
    company: "Shadow",
    url: "https://www.shadow.xyz/",
    start: "Dec 2023",
    end: "Apr 2024",
    points: [
      "Architected and productionized a distributed Ethereum RPC API handling 100+ reqs/second with minimal latency",
      "Production hardened an internal EVM environment and identified key security vulnerabilities in execution",
      "Established robust monitoring and resiliency routines for internally hosted node integrations",
    ],
  },
  {
    title: "Blockchain Security Engineer",
    company: "Coinbase",
    url: "https://www.coinbase.com/",
    start: "May 2021",
    end: "May 2024",
    points: [
      "Designed and operationalized risk analysis frameworks for analyzing onchain tokenized assets for secure listings on Coinbase exchange",
      "Designed and implemented REST API for smart contract analysis tool enabling quicker turnaround on security intake requests",
    ],
  },
  {
    title: "Product Engineering Intern",
    company: "Lucid",
    url: "https://lucid.co/",
    start: "Jun 2020",
    end: "May 2021",
    points: [
      "Migrated AWS data streams from Kafka to Kinesis in a Java ETL microservice, saving ~$60K/year",
      "Dockerized legacy MSSQL database for improved developer experience",
      "Assembled Go data processing microservice with layered REST API using Redis, DynamoDB, S3, and Kinesis",
    ],
  },
  {
    title: "Wannabe Cofounder",
    company: "Volatrade",
    start: "Nov 2019",
    end: "May 2021",
    points: [
      "Built end-to-end fullstack crypto trade simulation system",
      "Built ML pipeline for training, deploying, and integrating with TensorFlow models",
      "Operated simulation strategies around model outputs with 60% accuracy",
    ],
  },
];

const awards = [
  {
    title: "ETH New York 2023 Hackathon Winner",
    org: "ETHGlobal",
    date: "Sep 2023",
    url: "https://ethglobal.com/showcase/style-check-85zy7",
    detail: "Automation tool for the Arbitrum Stylus smart contract platform",
  },
  {
    title: "ETH Denver 2023 Binance Hackathon Winner",
    org: "ETH Denver",
    date: "Feb 2023",
    detail: "Smart contract risk automation tool PoC — real-time threat detection via user wallet",
  },
  {
    title: "ETH Denver 2023 NEAR Hackathon Winner",
    org: "ETH Denver",
    date: "Feb 2023",
    detail: "Light client proofs via storage proofs — added accessor logic to state trie traversal",
  },
  {
    title: "ETH San Francisco 2022 Hackathon Participant",
    org: "ETHGlobal",
    date: "Oct 2022",
    detail: "Novel implementation of TSTORE and TLOAD opcodes on op-geth; hand-wrote EVM bytecode for testing",
  },
  {
    title: "ETH Online 2022 Hackathon Participant",
    org: "ETHGlobal",
    date: "Dec 2022",
    detail: "Hacked pre-bedrock OP Stack to settle calldata batches and state commitments on FileCoin via FEVM",
  },
];

const interests = [
  "Ethereum Rollups",
  "Zero Knowledge Cryptography",
  "Distributed Systems",
  "LLMs & AI Agents",
  "EVM Scalability",
  "Systems Design",
  "Computer Networks",
  "Utilitarian Web3",
];

const beliefs = [
  { emoji: "🫠", text: "The universe is indifferent. Ship good code anyway." },
  { emoji: "⚡", text: "Most meetings could've been a Slack message. Most Slack messages could've been nothing." },
  { emoji: "🔮", text: "Decentralization isn't about ideology — it's about removing single points of failure, including people." },
  { emoji: "🌊", text: "Your job won't love you back. Build skills, not loyalty." },
  { emoji: "🎯", text: "The best code is the code that solves a real problem. Everything else is cosplay." },
  { emoji: "🪦", text: "We're all going to die. Might as well work on interesting problems." },
];

const links = {
  github: "https://github.com/ethenotethan",
  twitter: "https://x.com/ethen_not_ethan",
  linkedin: "https://www.linkedin.com/in/ethen-p-5bb640148",
  email: "mailto:ethenpo@gmail.com",
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      variants={fadeIn}
      className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500"
    >
      {children}
    </motion.h2>
  );
}

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TimelineItem({
  title,
  company,
  url,
  start,
  end,
  points,
  index,
}: {
  title: string;
  company: string;
  url?: string;
  start: string;
  end: string;
  points: string[];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className="relative border-l border-zinc-800 pl-6 pb-2 group"
    >
      <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand timeline-dot group-hover:bg-brand-glow transition-colors" />
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h3 className="font-semibold text-white text-sm md:text-base">{title}</h3>
        <span className="text-zinc-600">·</span>
        {url ? (
          <a
            href={url}
            className="text-brand hover:text-brand-glow transition-colors text-sm"
            target="_blank"
            rel="noopener"
          >
            {company}
          </a>
        ) : (
          <span className="text-zinc-400 text-sm">{company}</span>
        )}
      </div>
      <p className="mb-2 text-xs text-zinc-600">{start} — {end}</p>
      <ul className="space-y-1.5">
        {points.map((point, j) => (
          <li key={j} className="text-sm leading-relaxed text-zinc-400">
            — {point}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Home() {
  const [showAllAwards, setShowAllAwards] = useState(false);
  const visibleAwards = showAllAwards ? awards : awards.slice(0, 3);

  return (
    <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 md:py-32">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-24"
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
          Senior Blockchain Engineer at{" "}
          <a
            href="https://www.eigencloud.xyz/"
            className="text-brand hover:text-brand-glow transition-colors"
            target="_blank"
            rel="noopener"
          >
            EigenCloud
          </a>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-1 text-sm text-zinc-600 font-mono"
        >
          // currently: writing code, questioning everything
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400"
        >
          I build decentralized systems and break things for a living — then fix them
          better than they were. 6+ years across software engineering, protocol
          security, and infrastructure. The universe is indifferent to our existence,
          so I write code that actually matters. Between commits I train muay thai,
          mix music, and oscillate between existential dread and genuine optimism.
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
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel={link.label !== "Email" ? "noopener" : undefined}
              className="text-zinc-400 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-brand hover:after:w-full after:transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>
      </motion.section>

      {/* Manifesto */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-24"
      >
        <SectionHeading>What I Believe</SectionHeading>
        <motion.p variants={fadeIn} className="text-xs text-zinc-600 mb-6 font-mono">
          // or: things I tell myself at 2am
        </motion.p>
        <div className="space-y-3">
          {beliefs.map((belief, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              className="flex items-start gap-3 rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-4"
            >
              <span className="text-lg mt-0.5 shrink-0">{belief.emoji}</span>
              <p className="text-sm text-zinc-400 leading-relaxed">{belief.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Experience */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-24"
      >
        <SectionHeading>Experience</SectionHeading>
        <motion.p variants={fadeIn} className="text-xs text-zinc-600 mb-6 font-mono">
          // things I&apos;ve done for money
        </motion.p>
        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <TimelineItem key={i} {...exp} index={i} />
          ))}
        </div>
      </motion.section>

      {/* Interests */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-24"
      >
        <SectionHeading>Interests</SectionHeading>
        <motion.p variants={fadeIn} className="text-xs text-zinc-600 mb-6 font-mono">
          // rabbit holes I&apos;ve fallen into
        </motion.p>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <motion.span
              key={interest}
              variants={fadeIn}
              whileHover={{ scale: 1.05, borderColor: "rgba(99, 102, 241, 0.5)", backgroundColor: "rgba(99, 102, 241, 0.1)" }}
              className="cursor-default rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-xs text-zinc-400 transition-colors"
            >
              {interest}
            </motion.span>
          ))}
        </div>
      </motion.section>

      {/* Education */}
      <Reveal className="mb-24">
        <SectionHeading>Education</SectionHeading>
        <motion.p variants={fadeIn} className="text-xs text-zinc-600 mb-6 font-mono">
          // paid money to learn things I mostly taught myself anyway
        </motion.p>
        <div className="relative border-l border-zinc-800 pl-6">
          <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand timeline-dot" />
          <h3 className="font-semibold text-white">BS Computer Science</h3>
          <p className="text-sm text-zinc-400">University of San Francisco</p>
          <p className="text-xs text-zinc-600">2017 — 2021</p>
          <p className="mt-1 text-sm text-zinc-500">
            Minored in Mathematics. Tinkered with algorithmic trading and machine learning.
          </p>
        </div>
      </Reveal>

      {/* Awards */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-24"
      >
        <SectionHeading>Awards & Hackathons</SectionHeading>
        <motion.p variants={fadeIn} className="text-xs text-zinc-600 mb-6 font-mono">
          // sleep-deprived weekends that paid off
        </motion.p>
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {visibleAwards.map((award) => (
              <motion.div
                key={award.title}
                variants={fadeIn}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                whileHover={{ borderColor: "rgba(99, 102, 241, 0.3)", scale: 1.01 }}
                className="rounded-lg border border-zinc-800/60 bg-zinc-900/30 p-4 transition-colors cursor-default"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-white text-sm">
                      {award.url ? (
                        <a
                          href={award.url}
                          className="hover:text-brand transition-colors"
                          target="_blank"
                          rel="noopener"
                        >
                          {award.title}
                        </a>
                      ) : (
                        award.title
                      )}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {award.org} · {award.date}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">{award.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {awards.length > 3 && (
          <motion.button
            onClick={() => setShowAllAwards(!showAllAwards)}
            className="mt-4 text-xs text-brand hover:text-brand-glow transition-colors"
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAllAwards ? "ok that's enough ↑" : `Show all ${awards.length} →`}
          </motion.button>
        )}
      </motion.section>

      {/* Hobbies */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-24"
      >
        <SectionHeading>Hobbies</SectionHeading>
        <motion.p variants={fadeIn} className="text-xs text-zinc-600 mb-6 font-mono">
          // distractions from the void
        </motion.p>
        <div className="space-y-4">
          <motion.div variants={fadeIn} className="rounded-lg border border-zinc-800/60 bg-zinc-900/30 p-5">
            <h3 className="font-medium text-white text-sm mb-2">🎵 Mixing Music</h3>
            <p className="text-sm text-zinc-500">
              Bedroom DJ since before it was cool. Drum and bass, house, hip-hop — anything
              with a beat that drowns out the intrusive thoughts. Formerly unknown{" "}
              <a href="https://soundcloud.com/dj_filo" className="text-brand hover:text-brand-glow transition-colors" target="_blank" rel="noopener">
                SoundCloud
              </a>{" "}
              artist (still unknown, technically).
            </p>
          </motion.div>
          <motion.div variants={fadeIn} className="rounded-lg border border-zinc-800/60 bg-zinc-900/30 p-5">
            <h3 className="font-medium text-white text-sm mb-2">🥊 Muay Thai</h3>
            <p className="text-sm text-zinc-500">
              Started in 2022 to feel something other than VS Code frustration. Trained in San
              Francisco, New York, and Chiang Mai. The bruises remind me I&apos;m still alive. Also,
              nothing teaches you about iteration speed like getting kicked in the ribs.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeading>Contact</SectionHeading>
        <motion.p variants={fadeIn} className="text-xs text-zinc-600 mb-6 font-mono">
          // I read every email. whether I reply is a different question
        </motion.p>
        <p className="text-sm text-zinc-400">
          Business, collaboration, or existential debates:{" "}
          <a href={links.email} className="text-brand hover:text-brand-glow transition-colors">
            ethenpo@gmail.com
          </a>
        </p>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-24 border-t border-zinc-800/50 pt-8 text-center text-xs text-zinc-600"
      >
        <p>© {new Date().getFullYear()} Ethen Pociask</p>
        <p className="mt-1 text-zinc-700">
          Built with caffeine, nihilism, and Next.js. Nothing on this page matters, but I
          enjoyed making it.
        </p>
      </motion.footer>
    </div>
  );
}