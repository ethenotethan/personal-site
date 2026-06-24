import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { BackgroundLayer } from "./background";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://ethen.me"),
  title: "Ethen Pociask",
  description:
    "Senior Infrastructure Engineer at EigenCloud — AI infra, decentralized systems, protocol security. Previously Coinbase, Shadow. Building inference harnesses, cross-platform agent clients, and distributed systems.",
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ethen Pociask",
    description:
      "AI infra, decentralized systems, distributed inference. Previously Coinbase. Building Centaur, Hermes, d‑inference, and HermesNative.",
    url: "https://ethen.me",
    siteName: "Ethen Pociask",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethen Pociask",
    description:
      "Senior Infrastructure Engineer. AI infra, decentralized systems, distributed inference. Previously Coinbase.",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://ethen.me/#person",
      name: "Ethen Pociask",
      givenName: "Ethen",
      familyName: "Pociask",
      url: "https://ethen.me",
      image: "https://ethen.me/favicon.ico",
      jobTitle: "Senior Infrastructure Engineer",
      worksFor: {
        "@type": "Organization",
        name: "EigenCloud",
        url: "https://www.eigencloud.xyz/",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of San Francisco",
      },
      sameAs: [
        "https://github.com/ethenotethan",
        "https://x.com/ethen_not_ethan",
        "https://www.linkedin.com/in/ethen-p-5bb640148",
      ],
      knowsAbout: [
        "AI Infrastructure",
        "Distributed Systems",
        "Protocol Security",
        "Ethereum Rollups",
        "Zero Knowledge Cryptography",
        "LLMs & AI Agents",
        "EVM Scalability",
        "Systems Design",
      ],
      description:
        "Senior Infrastructure Engineer building AI agent platforms, distributed inference engines, and cross-platform native clients. Previously Coinbase (protocol security), Shadow (EVM engineering). BS Computer Science, University of San Francisco.",
    },
    {
      "@type": "WebSite",
      "@id": "https://ethen.me/#website",
      url: "https://ethen.me",
      name: "Ethen Pociask",
      description:
        "Personal site of Ethen Pociask — Senior Infrastructure Engineer building AI infra and decentralized systems.",
      inLanguage: "en-US",
      about: { "@id": "https://ethen.me/#person" },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-zinc-950 text-zinc-200 antialiased`}
      >
        <BackgroundLayer />
        <div className="relative z-10">
          {children}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}