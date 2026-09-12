import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { BackgroundLayer } from "./background";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://ethen.me"),
  title: "Ethen Pociask — Protocol Security & AI Infrastructure",
  description:
    "Protocol security and infrastructure engineer building decentralized and AI systems. Previously Coinbase and Shadow; currently at Eigen Labs.",
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ethen Pociask — Protocol Security & AI Infrastructure",
    description:
      "Protocol security and infrastructure engineer building decentralized and AI systems. Previously Coinbase and Shadow; currently at Eigen Labs.",
    url: "https://ethen.me",
    siteName: "Ethen Pociask",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ethen Pociask — Protocol Security & AI Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethen Pociask — Protocol Security & AI Infrastructure",
    description:
      "Protocol security and infrastructure engineer building decentralized and AI systems.",
    images: ["/og-image.png"],
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
        name: "Eigen Labs",
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
        "Protocol security and infrastructure engineer building decentralized and AI systems. Experience includes Coinbase protocol security, Shadow EVM engineering, EigenDA rollup infrastructure, production AI platforms, and distributed inference.",
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
        <main className="relative z-10">
          {children}
        </main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}