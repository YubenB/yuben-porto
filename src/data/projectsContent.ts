export type ProjectContent = {
  slug: string;
  title: string;
  category: string;
  excerpt?: string;
  stack: string[];
  liveUrl?: string;
  images: string[];
  content: string; // markdown body
};

// Load markdown content at build time
const files = import.meta.glob("../content/projects/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

function parseFrontmatter(raw: string) {
  const fmMatch = raw.match(/^\uFEFF?\s*---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const fm: Record<string, any> = {};
  let body = raw;
  if (fmMatch) {
    const block = fmMatch[1];
    body = raw.slice(fmMatch[0].length);
    const lines = block.split(/\r?\n/);
    let currentArrayKey: string | null = null;
    for (const line of lines) {
      const arrayItem = line.match(/^\s*-\s*(.+)$/);
      if (currentArrayKey && arrayItem) {
        fm[currentArrayKey].push(arrayItem[1].replace(/^['"]|['"]$/g, ""));
        continue;
      }
      const kv = line.match(/^(\w[\w-]*)\s*:\s*(.*)$/);
      if (kv) {
        const key = kv[1];
        const value = kv[2];
        if (!value) {
          // Start of array
          currentArrayKey = key;
          fm[currentArrayKey] = [];
        } else {
          currentArrayKey = null;
          fm[key] = value.replace(/^['"]|['"]$/g, "");
        }
      } else {
        currentArrayKey = null;
      }
    }
  }
  body = body.replace(/^\s+/, "");
  return { frontmatter: fm, body };
}

export const projectsContent: ProjectContent[] = Object.entries(files)
  .map(([path, raw]) => {
    const { frontmatter, body } = parseFrontmatter(raw as string);
    const slug =
      frontmatter.slug || path.split("/").pop()!.replace(/\.md$/, "");
    const title = frontmatter.title || slug;
    const category = frontmatter.category || "";
    const excerpt = frontmatter.excerpt || "";
    const liveUrl = frontmatter.liveUrl || "";
    const stack: string[] = Array.isArray(frontmatter.stack)
      ? frontmatter.stack
      : [];
    const images: string[] = Array.isArray(frontmatter.images)
      ? frontmatter.images
      : [];
    const content = body.trim();
    return { slug, title, category, excerpt, stack, images, content, liveUrl };
  })
  .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
