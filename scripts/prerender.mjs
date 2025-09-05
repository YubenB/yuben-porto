import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

const distClient = path.join(root, "dist");
const distServer = path.join(root, "dist-ssr");
const ssrEntry = path.join(distServer, "entry-server.js");

const SITE_URL = process.env.VITE_SITE_URL || "https://yuben.me";

function ensureLeadingSlash(p) {
  return p.startsWith("/") ? p : `/${p}`;
}

async function writeHtmlForRoute(routePath, html, meta, template) {
  const route = ensureLeadingSlash(routePath);
  const outDir = route === "/" ? distClient : path.join(distClient, route);
  const outPath =
    route === "/"
      ? path.join(outDir, "index.html")
      : path.join(outDir, "index.html");

  await fs.mkdir(outDir, { recursive: true });

  // inject app HTML
  let doc = template.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`
  );

  // remove default/meta/schema so we can inject page-specific ones
  doc = stripDefaultHeadTags(doc);

  // replace title
  if (meta?.title) {
    doc = doc.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);
  }
  // inject meta description if provided
  if (meta?.description) {
    const metaTag = `<meta name="description" content="${escapeHtml(
      meta.description
    )}">`;
    doc = doc.replace("</head>", `  ${metaTag}\n  </head>`);
  }

  // canonical link
  const canonical = meta?.canonical || SITE_URL.replace(/\/$/, "") + route;
  const canonicalTag = `<link rel="canonical" href="${canonical}">`;
  doc = doc.replace("</head>", `  ${canonicalTag}\n  </head>`);

  // Open Graph tags
  if (meta?.og) {
    const ogTags = Object.entries(meta.og)
      .map(([k, v]) => `<meta property="${k}" content="${escapeHtml(v)}">`)
      .join("\n  ");
    doc = doc.replace("</head>", `  ${ogTags}\n  </head>`);
  }
  // Twitter tags
  if (meta?.twitter) {
    const twTags = Object.entries(meta.twitter)
      .map(([k, v]) => `<meta name="${k}" content="${escapeHtml(v)}">`)
      .join("\n  ");
    doc = doc.replace("</head>", `  ${twTags}\n  </head>`);
  }

  // JSON-LD structured data
  if (meta?.jsonLd?.length) {
    const scripts = meta.jsonLd
      .map(
        (obj) =>
          `<script type="application/ld+json">${JSON.stringify(obj)}</script>`
      )
      .join("\n  ");
    doc = doc.replace("</head>", `  ${scripts}\n  </head>`);
  }

  await fs.writeFile(outPath, doc, "utf-8");
}

async function main() {
  let templatePath = path.join(distClient, "index.html");
  try {
    await fs.access(templatePath);
  } catch {
    // some setups put client html under dist/client
    templatePath = path.join(distClient, "client", "index.html");
  }
  const template = await fs.readFile(templatePath, "utf-8");
  const { render, getRoutes } = await import(pathToFileURL(ssrEntry).href);
  const routes = getRoutes();
  for (const route of routes) {
    const { html, meta } = await render(route);
    await writeHtmlForRoute(route, html, meta, template);
  }

  // generate sitemap.xml
  const urls = routes
    .map(
      (r) =>
        `  <url><loc>${SITE_URL.replace(/\/$/, "")}${ensureLeadingSlash(
          r
        )}</loc></url>`
    )
    .join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  await fs.writeFile(path.join(distClient, "sitemap.xml"), sitemap, "utf-8");

  // generate robots.txt
  const robots = `User-agent: *\nAllow: /\nSitemap: ${SITE_URL.replace(
    /\/$/,
    ""
  )}/sitemap.xml\n`;
  await fs.writeFile(path.join(distClient, "robots.txt"), robots, "utf-8");
  // create 404.html as the homepage for static hosts that use it
  const { html, meta } = await render("/");
  await fs.writeFile(
    path.join(distClient, "404.html"),
    template
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
      .replace(
        /<title>.*?<\/title>/,
        `<title>${meta?.title ?? "Not Found"}</title>`
      ),
    "utf-8"
  );
}

// helper to build file:// URL for dynamic import
function pathToFileURL(p) {
  const url = new URL("file://");
  const parts = path.resolve(p).split(path.sep);
  url.pathname = "/" + parts.join("/");
  return url;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function stripDefaultHeadTags(doc) {
  // remove description meta
  doc = doc.replace(/<meta[^>]+name=["']description["'][^>]*>\s*/gi, "");
  // remove canonical
  doc = doc.replace(/<link[^>]+rel=["']canonical["'][^>]*>\s*/gi, "");
  // remove OG
  doc = doc.replace(/<meta[^>]+property=["']og:[^"']+["'][^>]*>\s*/gi, "");
  // remove Twitter
  doc = doc.replace(/<meta[^>]+name=["']twitter:[^"']+["'][^>]*>\s*/gi, "");
  // remove JSON-LD scripts
  doc = doc.replace(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi,
    ""
  );
  return doc;
}
