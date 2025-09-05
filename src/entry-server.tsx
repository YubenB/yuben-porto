import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { articles } from "./data/articles";
import { projectsContent } from "./data/projectsContent";

export function getRoutes(): string[] {
  const base = ["/", "/projects", "/articles", "/contact"];
  const articleRoutes = articles.map((a) => `/articles/${a.slug}`);
  const projectRoutes = projectsContent.map((p) => `/projects/${p.slug}`);
  return [...base, ...articleRoutes, ...projectRoutes];
}

function getMeta(url: string): { title: string; description?: string } {
  if (url.startsWith("/articles/")) {
    const slug = url.replace("/articles/", "");
    const a = articles.find((x) => x.slug === slug);
    if (a) {
      return {
        title: `${a.title} | Yuben Bauty`,
        description: a.excerpt,
      };
    }
  }
  if (url.startsWith("/projects/")) {
    const slug = url.replace("/projects/", "");
    const p = projectsContent.find((x) => x.slug === slug);
    if (p) {
      return {
        title: `${p.title} | Yuben Bauty`,
        description: p.excerpt || `Case study: ${p.title}`,
      };
    }
  }
  switch (url) {
    case "/projects":
      return {
        title: "Projects | Yuben Bauty",
        description: "Freelance & personal projects.",
      };
    case "/articles":
      return {
        title: "Articles | Yuben Bauty",
        description: "Thoughts & insights on software development.",
      };
    case "/contact":
      return {
        title: "Contact | Yuben Bauty",
        description: "Get in touch with Yuben.",
      };
    default:
      return {
        title: "Yuben Bauty | Software Engineer",
        description: "Modern web & mobile solutions.",
      };
  }
}

export async function render(url: string) {
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
  const meta = getMeta(url);
  return { html, meta };
}
