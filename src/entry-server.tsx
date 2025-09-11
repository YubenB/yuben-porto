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

const RAW_SITE_URL = (import.meta as any).env?.VITE_SITE_URL || "https://yuben.me";
const SITE_URL = normalizeSiteUrl(RAW_SITE_URL);
const PERSON_IMAGE = `${SITE_URL.replace(/\/$/, "")}/images/profile.jpg`;
const SITE_NAME = "Yuben Bauty";
const PERSON_NAME = "Yuben Rizky Putra Bauty";
const PERSON_GIVEN = "Yuben";
const PERSON_FAMILY = "Bauty";

function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON_NAME,
    givenName: PERSON_GIVEN,
    familyName: PERSON_FAMILY,
    alternateName: "Yuben",
    url: SITE_URL,
    jobTitle: "Software Engineer",
    image: [PERSON_IMAGE],
    worksFor: {
      "@type": "Organization",
      name: "Rakhasa Artha Wisesa",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Bina Nusantara University (BINUS) - Online Learning",
      },
    ],
    knowsAbout: [
      "React",
      "React Native",
      "NestJS",
      "Node.js",
      "RabbitMQ",
      "Event-driven architecture",
      "Microservices",
      "PostgreSQL",
      "TypeScript",
      "Go",
    ],
    sameAs: [
      "https://www.linkedin.com/in/yuben-bauty/",
      "https://github.com/yubenB",
      "https://www.instagram.com/yuben.rpb",
      SITE_URL,
    ],
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

function normalizeSiteUrl(url: string): string {
  try {
    const u = new URL(url);
    // force https and apex (non-www) host to avoid duplicate canonicals
    u.protocol = "https:";
    u.hostname = u.hostname.replace(/^www\./, "");
    // strip trailing slash
    return u.origin;
  } catch {
    // fallback to default
    return "https://yuben.me";
  }
}

function canonicalizePath(p: string): string {
  // remove trailing slash except for root
  if (p !== "/" && p.endsWith("/")) return p.slice(0, -1);
  return p;
}

function getMeta(url: string): SEO {
  const cleanPath = canonicalizePath(url);
  const fullUrl = SITE_URL.replace(/\/$/, "") + cleanPath;
  if (cleanPath.startsWith("/articles/")) {
    const slug = cleanPath.replace("/articles/", "");
    const a = articles.find((x) => x.slug === slug);
    if (a) {
      const title = `${a.title} | ${SITE_NAME}`;
      const description = a.excerpt;
      const preview = a.thumbnail
        ? a.thumbnail.startsWith("http")
          ? a.thumbnail
          : SITE_URL.replace(/\/$/, "") + a.thumbnail
        : undefined;
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
          publisher: {
            "@type": "Person",
            name: PERSON_NAME,
            image: [PERSON_IMAGE],
            url: SITE_URL,
          },
          datePublished: (() => {
            const d = new Date(a.date);
            return isNaN(d.getTime()) ? a.date : d.toISOString();
          })(),
          image: preview ? [preview] : undefined,
          mainEntityOfPage: fullUrl,
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Articles",
              item: SITE_URL.replace(/\/$/, "") + "/articles",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: a.title,
              item: fullUrl,
            },
          ],
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
          ...(preview ? { "og:image": preview } : {}),
          "og:site_name": SITE_NAME,
        },
        twitter: {
          "twitter:card": preview ? "summary_large_image" : "summary",
          "twitter:title": title,
          "twitter:description": description || "",
          ...(preview ? { "twitter:image": preview } : {}),
        },
        jsonLd,
      };
    }
  }
  if (cleanPath.startsWith("/projects/")) {
    const slug = cleanPath.replace("/projects/", "");
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
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Projects",
              item: SITE_URL.replace(/\/$/, "") + "/projects",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: p.title,
              item: fullUrl,
            },
          ],
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
  switch (cleanPath) {
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
          "profile:first_name": PERSON_GIVEN,
          "profile:last_name": PERSON_FAMILY,
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
          "og:type": "profile",
          "og:title": `${SITE_NAME} | Software Engineer`,
          "og:description": `${PERSON_NAME} builds modern web & mobile solutions with React, React Native, NestJS, and more.`,
          "og:url": fullUrl,
          "og:site_name": SITE_NAME,
          "profile:first_name": PERSON_GIVEN,
          "profile:last_name": PERSON_FAMILY,
          "og:image": PERSON_IMAGE,
        },
        twitter: {
          "twitter:card": "summary",
          "twitter:title": `${SITE_NAME} | Software Engineer`,
          "twitter:description": `${PERSON_NAME} builds modern web & mobile solutions with React, React Native, NestJS, and more.`,
          "twitter:image": PERSON_IMAGE,
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

// Extra helpers for prerender scripts
export type SitemapEntry = { url: string; lastmod?: string };
export function getSitemapEntries(): SitemapEntry[] {
  const baseNow = new Date().toISOString();
  const entries: SitemapEntry[] = [
    { url: "/", lastmod: baseNow },
    { url: "/projects", lastmod: baseNow },
    { url: "/articles", lastmod: baseNow },
    { url: "/experience", lastmod: baseNow },
    { url: "/contact", lastmod: baseNow },
  ];
  for (const a of articles) {
    const d = new Date(a.date);
    entries.push({
      url: `/articles/${a.slug}`,
      lastmod: isNaN(d.getTime()) ? undefined : d.toISOString(),
    });
  }
  for (const p of projectsContent) {
    entries.push({ url: `/projects/${p.slug}`, lastmod: baseNow });
  }
  return entries;
}

export type FeedItem = {
  title: string;
  url: string;
  description?: string;
  date?: string;
};
export function getFeedItems(): FeedItem[] {
  return articles.map((a) => ({
    title: a.title,
    url: `${SITE_URL.replace(/\/$/, "")}/articles/${a.slug}`,
    description: a.excerpt,
    date: (() => {
      const d = new Date(a.date);
      return isNaN(d.getTime()) ? undefined : d.toUTCString();
    })(),
  }));
}
