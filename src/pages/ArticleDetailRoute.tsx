import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { articles } from "../data/articles";
import ArticleDetail from "./ArticleDetail";

const ArticleDetailRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const article = useMemo(() => articles.find((a) => a.slug === slug), [slug]);

  if (!article) {
    // simple not-found handling; could render a 404 page
    return (
      <div className="reading-page">
        <h1>Article not found.</h1>
        <Link className="back-link" to="/articles">Back to Articles ↗</Link>
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
