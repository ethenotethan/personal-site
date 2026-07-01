import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Shared component map that reproduces the look of the original hand-written
 * article pages — zinc prose, brand-colored links, bordered code blocks,
 * GFM tables. Used for both article bodies and (inline) subtitles.
 */
const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-semibold text-white mt-10 mb-4">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-white mt-6 mb-3">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-zinc-400 leading-relaxed my-4">{children}</p>
  ),
  a: ({ href, children }) => {
    const external = !!href && /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className="text-brand hover:text-brand-glow transition-colors"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
  strong: ({ children }) => (
    <strong className="text-zinc-300 font-semibold">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => (
    <ul className="text-zinc-400 leading-relaxed space-y-2 list-disc pl-6 my-4">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="text-zinc-400 leading-relaxed space-y-2 list-decimal pl-6 my-4">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  hr: () => <hr className="border-zinc-800 my-8" />,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-zinc-700 pl-4 text-zinc-500 italic my-4">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    // Fenced code blocks carry a language- class; inline code does not.
    const isBlock = /language-/.test(className ?? "");
    if (isBlock) {
      return (
        <code className="text-xs text-zinc-400 font-mono leading-relaxed whitespace-pre">
          {children}
        </code>
      );
    }
    return (
      <code className="text-[0.85em] text-zinc-300 font-mono bg-zinc-800/60 px-1.5 py-0.5 rounded">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <div className="my-6 p-4 border border-zinc-800 rounded-lg bg-zinc-900/30 overflow-x-auto">
      <pre className="whitespace-pre">{children}</pre>
    </div>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  tr: ({ children }) => (
    <tr className="border-b border-zinc-800/50">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="text-left py-2 text-zinc-400 font-medium">{children}</th>
  ),
  td: ({ children }) => <td className="py-2 text-zinc-500">{children}</td>,
};

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}

/**
 * Inline markdown for short strings like subtitles — renders links/emphasis
 * but unwraps the outer paragraph so it can sit inside a styled <p>.
 */
export function InlineMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{ ...components, p: ({ children }) => <>{children}</> }}
    >
      {children}
    </ReactMarkdown>
  );
}
