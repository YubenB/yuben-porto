import React from "react";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // for GitHub-flavored markdown
import rehypeRaw from "rehype-raw"; // optional, allows raw HTML inside MD
import CodeBlock from "../components/ui/CodeBlock";

export type ArticleDetailProps = {
  title: string;
  date: string;
  readingTime: string;
  content: string; // Markdown string
  onBack: () => void;
  thumbnail?: string;
};

const ArticleDetail: React.FC<ArticleDetailProps> = ({
  title,
  date,
  readingTime,
  content,
  onBack,
  thumbnail,
}) => {
  return (
    <article>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white"
      >
        <ArrowLeft size={16} /> Back to Articles
      </button>
      <h1 className="mt-4 text-3xl font-bold tracking-tighter">{title}</h1>
      <p className="mt-1 text-sm text-neutral-500">
        {date} • {readingTime}
      </p>
      {thumbnail && (
        <img
          src={thumbnail}
          alt={title}
          className="mt-2 w-full h-auto rounded-md"
          loading="lazy"
          decoding="async"
          width="1200"
          height="630"
        />
      )}

      <div className="prose prose-invert prose-neutral max-w-none mt-6">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || "");
              const code = String(children).replace(/\n$/, "");
              if (inline) {
                return (
                  <code
                    className="px-1.5 py-0.5 rounded-md  border border-neutral-800 text-neutral-200"
                    {...props}
                  >
                    {children}
                  </code>
                );
              }
              return <CodeBlock code={code} language={match?.[1] || "tsx"} />;
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default ArticleDetail;
