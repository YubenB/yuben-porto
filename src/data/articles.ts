export type Article = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readingTime: string;
  thumbnail?: string;
  content?: string;
};

// Load markdown content at build time
const files = import.meta.glob("../content/articles/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

function parseFrontmatter(raw: string) {
  // Handle optional BOM and both LF/CRLF newlines
  const fmMatch = raw.match(/^\uFEFF?\s*---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const fm: Record<string, string> = {};
  let body = raw;
  if (fmMatch) {
    const fmBlock = fmMatch[1];
    body = raw.slice(fmMatch[0].length);
    fmBlock.split(/\r?\n/).forEach((line) => {
      const idx = line.indexOf(":");
      if (idx !== -1) {
        const k = line.slice(0, idx).trim();
        const v = line.slice(idx + 1).trim();
        fm[k] = v.replace(/^['"]|['"]$/g, "");
      }
    });
  }
  // Clean leading whitespace or stray separators
  body = body.replace(/^\s+/, "");
  return { frontmatter: fm, body };
}

let idCounter = 1;
export const articles: Article[] = Object.entries(files)
  .map(([path, raw]) => {
    const { frontmatter, body } = parseFrontmatter(raw as string);
    const slug =
      frontmatter.slug || path.split("/").pop()!.replace(/\.md$/, "");
    const title = frontmatter.title || slug;
    const date = frontmatter.date || "";
    const readingTime = frontmatter.readingTime || "";
    const thumbnail = frontmatter.thumbnail;
    const cleanBody = body.replace(/^---[\s\S]*?---\r?\n?/, "").trimStart();
    const excerptSource = frontmatter.excerpt || cleanBody;
    const excerpt = excerptSource
      ? excerptSource.slice(0, 140) + (excerptSource.length > 140 ? "..." : "")
      : "";
    return {
      id: idCounter++,
      title,
      slug,
      excerpt,
      date,
      readingTime,
      thumbnail,
      content: body,
    } as Article;
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));
