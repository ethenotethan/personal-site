import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { BackgroundLayer } from "./background";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ethen Pociask — Senior Infrastructure Engineer",
  description:
    "Senior Infrastructure Engineer at EigenCloud — AI infra, decentralized systems, protocol security. Previously Coinbase, Shadow. Building inference harnesses, cross-platform agent clients, and distributed systems.",
  openGraph: {
    title: "Ethen Pociask",
    description:
      "Senior Infrastructure Engineer. AI infra, decentralized systems, distributed inference. Previously Coinbase.",
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
        <BackgroundLayer />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}