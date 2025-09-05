import { articles } from "../data/articles";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// React import not necessary with automatic JSX runtime

const Articles = () => (
  <div>
    <h2 className="text-3xl font-bold tracking-tighter">Thoughts & Insights</h2>
    <p className="mt-2 text-neutral-400">
      Exploring topics in software development, from backend architecture to
      frontend magic.
    </p>
    <div className="mt-8 space-y-6">
      {articles.map((article, index) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group"
        >
          <Link
            to={`/articles/${article.slug}`}
            className="block p-2 md:p-4 rounded-lg hover:bg-neutral-900/50 transition-colors duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-neutral-500">
                  {article.date} • {article.readingTime}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {article.title}
                </h3>
                {article.thumbnail && (
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="mt-2 w-full h-auto rounded-md"
                    loading="lazy"
                    decoding="async"
                    width="1200"
                    height="630"
                  />
                )}
                <p className="mt-2 text-sm text-neutral-400 max-w-xl">
                  {article.excerpt}
                </p>
              </div>
              {/* <ArrowRight
                size={20}
                className="mt-4 sm:mt-0 text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
              /> */}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Articles;
