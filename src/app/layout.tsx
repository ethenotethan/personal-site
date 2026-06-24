import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ethen Pociask — Senior Blockchain Engineer",
  description:
    "Senior Blockchain Engineer at EigenCloud. Previously Coinbase, Shadow. Building decentralized systems, EVM infrastructure, and AI agents.",
  openGraph: {
    title: "Ethen Pociask",
    description:
      "Senior Blockchain Engineer. Previously Coinbase, Shadow. Distributed systems, EVM, AI.",
  },
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
        {children}
      </body>
    </html>
  );
}