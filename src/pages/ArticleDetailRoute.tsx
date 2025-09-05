import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { articles } from "../data/articles";
import ArticleDetail from "./ArticleDetail";

const ArticleDetailRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const article = useMemo(() => articles.find((a) => a.slug === slug), [slug]);

  if (!article) {
    // simple not-found handling; could render a 404 page
    return (
      <div className="py-10">
        <p className="text-neutral-400">Article not found.</p>
        <button
          className="mt-4 underline"
          onClick={() => navigate("/articles")}
        >
          Back to Articles
        </button>
      </div>
    );
  }

  return (
    <ArticleDetail
      title={article.title}
      date={article.date}
      readingTime={article.readingTime}
      thumbnail={article.thumbnail}
      content={article.content || "<p>Content coming soon.</p>"}
      onBack={() => navigate("/articles")}
    />
  );
};

export default ArticleDetailRoute;
