import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "writing");

export interface AboutSchema {
  type: string;
  name: string;
  applicationCategory?: string;
  operatingSystem?: string;
}

export interface ArticleFrontmatter {
  title: string;
  subtitle?: string;
  description: string;
  date?: string;
  schemaType?: string;
  schemaDescription?: string;
  keywords?: string[];
  about?: AboutSchema;
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  content: string;
}

/** All article slugs, derived from the markdown files on disk. */
export function getArticleSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

/** Load and parse a single article by slug. Returns null if it doesn't exist. */
export function getArticle(slug: string): Article | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return { slug, content, ...(data as ArticleFrontmatter) };
}

/** All articles, for sitemap and listings. */
export function getAllArticles(): Article[] {
  return getArticleSlugs()
    .map((slug) => getArticle(slug))
    .filter((a): a is Article => a !== null);
}
