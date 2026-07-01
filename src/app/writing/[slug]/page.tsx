import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getArticleSlugs } from "@/lib/writing";
import { Markdown, InlineMarkdown } from "../markdown";

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: `${article.title} — Ethen Pociask`,
    description: article.description,
  };
}

export default async function WritingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const url = `https://ethen.me/writing/${article.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": article.schemaType ?? "Article",
    headline: article.title,
    description: article.schemaDescription ?? article.description,
    author: {
      "@type": "Person",
      name: "Ethen Pociask",
      url: "https://ethen.me",
    },
    url,
    ...(article.date ? { datePublished: article.date } : {}),
    ...(article.keywords ? { keywords: article.keywords } : {}),
    ...(article.about
      ? {
          about: {
            "@type": article.about.type,
            name: article.about.name,
            ...(article.about.applicationCategory
              ? { applicationCategory: article.about.applicationCategory }
              : {}),
            ...(article.about.operatingSystem
              ? { operatingSystem: article.about.operatingSystem }
              : {}),
          },
        }
      : {}),
  };

  return (
    <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 md:py-32">
      <Link
        href="/"
        className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors mb-8 inline-block"
      >
        ← back
      </Link>

      <article className="max-w-none">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          {article.title}
        </h1>
        {article.subtitle && (
          <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
            <InlineMarkdown>{article.subtitle}</InlineMarkdown>
          </p>
        )}

        <hr className="border-zinc-800 my-8" />

        <Markdown>{article.content}</Markdown>
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
}
