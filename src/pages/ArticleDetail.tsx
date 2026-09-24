import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import CodeBlock from "../components/ui/CodeBlock";

export type ArticleDetailProps = {
  title: string;
  date: string;
  readingTime: string;
  content: string;
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
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <article className="reading-page article-detail" id="article-top">
      <button
        onClick={onBack}
        className="back-link"
      >
        <ArrowLeft size={16} /> Back to Articles
      </button>
      <h1>{title}</h1>
      <p className="reading-meta">
        {date} • {readingTime}
      </p>
      {thumbnail && (
        <img
          src={thumbnail}
          alt={title}
          className="reading-hero-image"
          loading="lazy"
          decoding="async"
          width="1200"
          height="630"
        />
      )}

      <div className="prose prose-neutral max-w-none">
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
                    className="px-1.5 py-0.5"
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

      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="back-to-top"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </article>
  );
};

export default ArticleDetail;
