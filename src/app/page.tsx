"use client";

import { useState } from "react";

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

const links = {
  github: "https://github.com/ethenotethan",
  twitter: "https://x.com/ethen_not_ethan",
  linkedin:
    "https://www.linkedin.com/in/ethen-p-5bb640148",
  email: "mailto:ethenpo@gmail.com",
};

export default function Home() {
  const [showAllAwards, setShowAllAwards] = useState(false);
  const visibleAwards = showAllAwards ? awards : awards.slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:py-32">
      {/* Hero */}
      <section className="mb-24">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/20 text-2xl">
            🌍
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Ethen Pociask
            </h1>
            <p className="mt-1 text-lg text-zinc-400">
              Senior Blockchain Engineer at{" "}
              <a
                href="https://www.eigencloud.xyz/"
                className="text-brand hover:underline"
                target="_blank"
              >
                EigenCloud
              </a>
            </p>
          </div>
        </div>

        <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
          I have 6+ years across software engineering, security
          analysis/auditing, and product development. I spend my days removing
          trust assumptions in decentralized systems — and my free time training
          muay thai, mixing music, or shooting amateur photography. I like to
          travel the world and value being able to work from anywhere.
        </p>

        {/* Links */}
        <div className="mt-6 flex gap-4 text-sm">
          <a href={links.github} className="text-zinc-400 hover:text-white transition-colors" target="_blank">
            GitHub
          </a>
          <a href={links.twitter} className="text-zinc-400 hover:text-white transition-colors" target="_blank">
            X / Twitter
          </a>
          <a href={links.linkedin} className="text-zinc-400 hover:text-white transition-colors" target="_blank">
            LinkedIn
          </a>
          <a href={links.email} className="text-zinc-400 hover:text-white transition-colors">
            Email
          </a>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-24">
        <h2 className="mb-8 text-sm font-semibold uppercase tracking-widest text-zinc-500">
          Experience
        </h2>
        <div className="space-y-10">
          {experiences.map((exp, i) => (
            <div key={i} className="relative border-l border-zinc-800 pl-6">
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand" />
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <h3 className="font-semibold text-white">{exp.title}</h3>
                <span className="text-zinc-500">·</span>
                {exp.url ? (
                  <a
                    href={exp.url}
                    className="text-brand hover:underline text-sm"
                    target="_blank"
                  >
                    {exp.company}
                  </a>
                ) : (
                  <span className="text-zinc-400 text-sm">{exp.company}</span>
                )}
              </div>
              <p className="mb-2 text-xs text-zinc-600">
                {exp.start} — {exp.end}
              </p>
              <ul className="space-y-1.5">
                {exp.points.map((point, j) => (
                  <li
                    key={j}
                    className="text-sm leading-relaxed text-zinc-400"
                  >
                    — {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Interests */}
      <section className="mb-24">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-zinc-500">
          Interests
        </h2>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <span
              key={interest}
              className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400"
            >
              {interest}
            </span>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-24">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-zinc-500">
          Education
        </h2>
        <div className="relative border-l border-zinc-800 pl-6">
          <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand" />
          <h3 className="font-semibold text-white">
            BS Computer Science
          </h3>
          <p className="text-sm text-zinc-400">
            University of San Francisco
          </p>
          <p className="text-xs text-zinc-600">2017 — 2021</p>
          <p className="mt-1 text-sm text-zinc-500">
            Minored in Mathematics. Tinkered with algorithmic trading and machine learning.
          </p>
        </div>
      </section>

      {/* Awards */}
      <section className="mb-24">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-zinc-500">
          Awards & Hackathons
        </h2>
        <div className="space-y-4">
          {visibleAwards.map((award, i) => (
            <div
              key={i}
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-white text-sm">
                    {award.url ? (
                      <a
                        href={award.url}
                        className="hover:text-brand transition-colors"
                        target="_blank"
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
            </div>
          ))}
        </div>
        {awards.length > 3 && (
          <button
            onClick={() => setShowAllAwards(!showAllAwards)}
            className="mt-4 text-xs text-brand hover:text-brand-dim transition-colors"
          >
            {showAllAwards ? "Show less" : `Show all ${awards.length} awards`}
          </button>
        )}
      </section>

      {/* Hobbies */}
      <section className="mb-24">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-zinc-500">
          Hobbies
        </h2>
        <p className="text-sm leading-relaxed text-zinc-400 mb-6">
          Work-life balance is hard — creative outlets are a great means to decompress and connect with others.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-white text-sm mb-2">
              🎵 Mixing Music
            </h3>
            <p className="text-sm text-zinc-500">
              I like to mix music sometimes (preferably from a quiet bedroom).
              Was an unknown{" "}
              <a href="https://soundcloud.com/ethen-pociask" className="text-brand hover:underline" target="_blank">
                SoundCloud
              </a>{" "}
              artist for a few years. Genres include drum and bass, house, and hip-hop.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-white text-sm mb-2">
              🥊 Muay Thai
            </h3>
            <p className="text-sm text-zinc-500">
              Started training in 2022 for fitness and self-defense. Trained in San Francisco, New York, and now in Chiang Mai, Thailand.
              Mix of traditional and modern styles.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-zinc-500">
          Contact
        </h2>
        <p className="text-sm text-zinc-400">
          Feel free to reach out for business inquiries or just to chat.{" "}
          <a href={links.email} className="text-brand hover:underline">
            ethenpo@gmail.com
          </a>
        </p>
      </section>

      {/* Footer */}
      <footer className="mt-24 border-t border-zinc-800 pt-8 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} Ethen Pociask
      </footer>
    </div>
  );
}