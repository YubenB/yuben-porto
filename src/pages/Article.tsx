import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { articles } from "../data/articles";

const Articles = () => (
  <div className="inner-page articles-page">
    <div className="page-intro"><p className="section-kicker">Articles</p><h1>What I've learned <em>building things.</em></h1><p>Notes on backend systems, mobile development, infrastructure, and the decisions behind shipping software.</p></div>
    <div className="article-list">
      {articles.map((article) => (
        <Link key={article.slug} to={`/articles/${article.slug}`} className={`article-list-item${article.thumbnail ? "" : " no-image"}`}>
          {article.thumbnail && <div className="article-list-image"><img src={article.thumbnail} alt="" loading="lazy" /></div>}
          <div className="article-list-copy"><span>{article.date} · {article.readingTime}</span><h2>{article.title}</h2><p>{article.excerpt}</p></div>
          <ArrowUpRight className="article-arrow" size={24} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      ))}
    </div>
  </div>
);

export default Articles;
