import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { articles } from "./data/articles";
import { projectsContent } from "./data/projectsContent";

export function getRoutes(): string[] {
  const base = ["/", "/projects", "/articles", "/experience", "/contact"];
  const articleRoutes = articles.map((a) => `/articles/${a.slug}`);
  const projectRoutes = projectsContent.map((p) => `/projects/${p.slug}`);
  return [...base, ...articleRoutes, ...projectRoutes];
}

type SEO = {
  title: string;
  description?: string;
  canonical?: string;
  og?: Record<string, string>;
  twitter?: Record<string, string>;
  jsonLd?: Array<Record<string, any>>; // multiple scripts if needed
};

const SITE_URL = (import.meta as any).env?.VITE_SITE_URL || "https://yuben.me";
const PERSON_IMAGE = `${SITE_URL.replace(/\/$/, "")}/images/profile.jpg`;
const SITE_NAME = "Yuben Bauty";
const PERSON_NAME = "Yuben Rizky Putra Bauty";

function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON_NAME,
    alternateName: "Yuben",
    url: SITE_URL,
    jobTitle: "Software Engineer",
    image: [PERSON_IMAGE],
  };
}

function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/articles/{search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

function getMeta(url: string): SEO {
  const fullUrl = SITE_URL.replace(/\/$/, "") + url;
  if (url.startsWith("/articles/")) {
    const slug = url.replace("/articles/", "");
    const a = articles.find((x) => x.slug === slug);
    if (a) {
      const title = `${a.title} | ${SITE_NAME}`;
      const description = a.excerpt;
      const jsonLd = [
        personJsonLd(),
        websiteJsonLd(),
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.excerpt,
          author: {
            "@type": "Person",
            name: PERSON_NAME,
            image: [PERSON_IMAGE],
          },
          datePublished: (() => {
            const d = new Date(a.date);
            return isNaN(d.getTime()) ? a.date : d.toISOString();
          })(),
          image: a.thumbnail ? [a.thumbnail] : undefined,
          mainEntityOfPage: fullUrl,
        },
      ];
      return {
        title,
        description,
        canonical: fullUrl,
        og: {
          "og:type": "article",
          "og:title": title,
          "og:description": description || "",
          "og:url": fullUrl,
          ...(a.thumbnail ? { "og:image": a.thumbnail } : {}),
          "og:site_name": SITE_NAME,
        },
        twitter: {
          "twitter:card": a.thumbnail ? "summary_large_image" : "summary",
          "twitter:title": title,
          "twitter:description": description || "",
          ...(a.thumbnail ? { "twitter:image": a.thumbnail } : {}),
        },
        jsonLd,
      };
    }
  }
  if (url.startsWith("/projects/")) {
    const slug = url.replace("/projects/", "");
    const p = projectsContent.find((x) => x.slug === slug);
    if (p) {
      const title = `${p.title} | ${SITE_NAME}`;
      const description = p.excerpt || `Case study: ${p.title}`;
      const jsonLd = [
        personJsonLd(),
        websiteJsonLd(),
        {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: p.title,
          description,
          url: fullUrl,
          image: p.images?.length
            ? p.images.map((i) => SITE_URL + i)
            : undefined,
          author: {
            "@type": "Person",
            name: PERSON_NAME,
            image: [PERSON_IMAGE],
          },
        },
      ];
      const preview = p.images?.[0]
        ? p.images[0].startsWith("http")
          ? p.images[0]
          : SITE_URL + p.images[0]
        : undefined;
      return {
        title,
        description,
        canonical: fullUrl,
        og: {
          "og:type": "website",
          "og:title": title,
          "og:description": description,
          "og:url": fullUrl,
          ...(preview ? { "og:image": preview } : {}),
          "og:site_name": SITE_NAME,
        },
        twitter: {
          "twitter:card": preview ? "summary_large_image" : "summary",
          "twitter:title": title,
          "twitter:description": description,
          ...(preview ? { "twitter:image": preview } : {}),
        },
        jsonLd,
      };
    }
  }
  switch (url) {
    case "/projects":
      return {
        title: `Projects | ${SITE_NAME}`,
        description: "Freelance & personal projects.",
        canonical: fullUrl,
        og: {
          "og:type": "website",
          "og:title": `Projects | ${SITE_NAME}`,
          "og:description": "Freelance & personal projects.",
          "og:url": fullUrl,
          "og:site_name": SITE_NAME,
        },
        twitter: {
          "twitter:card": "summary",
          "twitter:title": `Projects | ${SITE_NAME}`,
          "twitter:description": "Freelance & personal projects.",
        },
        jsonLd: [personJsonLd(), websiteJsonLd()],
      };
    case "/articles":
      return {
        title: `Articles | ${SITE_NAME}`,
        description: "Thoughts & insights on software development.",
        canonical: fullUrl,
        og: {
          "og:type": "website",
          "og:title": `Articles | ${SITE_NAME}`,
          "og:description": "Thoughts & insights on software development.",
          "og:url": fullUrl,
          "og:site_name": SITE_NAME,
        },
        twitter: {
          "twitter:card": "summary",
          "twitter:title": `Articles | ${SITE_NAME}`,
          "twitter:description": "Thoughts & insights on software development.",
        },
        jsonLd: [personJsonLd(), websiteJsonLd()],
      };
    case "/experience":
      return {
        title: `Experience | ${SITE_NAME}`,
        description: `${PERSON_NAME} - professional experience and roles.`,
        canonical: fullUrl,
        og: {
          "og:type": "profile",
          "og:title": `Experience | ${SITE_NAME}`,
          "og:description": `${PERSON_NAME} - professional experience and roles.`,
          "og:url": fullUrl,
          "og:site_name": SITE_NAME,
        },
        twitter: {
          "twitter:card": "summary",
          "twitter:title": `Experience | ${SITE_NAME}`,
          "twitter:description": `${PERSON_NAME} - professional experience and roles.`,
        },
        jsonLd: [personJsonLd(), websiteJsonLd()],
      };
    case "/contact":
      return {
        title: `Contact | ${SITE_NAME}`,
        description: `Get in touch with ${PERSON_NAME}.`,
        canonical: fullUrl,
        og: {
          "og:type": "website",
          "og:title": `Contact | ${SITE_NAME}`,
          "og:description": `Get in touch with ${PERSON_NAME}.`,
          "og:url": fullUrl,
          "og:site_name": SITE_NAME,
        },
        twitter: {
          "twitter:card": "summary",
          "twitter:title": `Contact | ${SITE_NAME}`,
          "twitter:description": `Get in touch with ${PERSON_NAME}.`,
        },
        jsonLd: [personJsonLd(), websiteJsonLd()],
      };
    default:
      return {
        title: `${SITE_NAME} | Software Engineer`,
        description: `${PERSON_NAME} builds modern web & mobile solutions with React, React Native, NestJS, and more.`,
        canonical: fullUrl,
        og: {
          "og:type": "website",
          "og:title": `${SITE_NAME} | Software Engineer`,
          "og:description": `${PERSON_NAME} builds modern web & mobile solutions with React, React Native, NestJS, and more.`,
          "og:url": fullUrl,
          "og:site_name": SITE_NAME,
        },
        twitter: {
          "twitter:card": "summary",
          "twitter:title": `${SITE_NAME} | Software Engineer`,
          "twitter:description": `${PERSON_NAME} builds modern web & mobile solutions with React, React Native, NestJS, and more.`,
        },
        jsonLd: [personJsonLd(), websiteJsonLd()],
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
