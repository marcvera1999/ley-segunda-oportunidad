// ============================================================
// MOTOR DEL BLOG
// ------------------------------------------------------------
// Cada artículo es un archivo Markdown en src/content/blog/*.md
// con "frontmatter" (título, fecha, estado...). Solo se muestran
// los que tienen status: published y fecha igual o anterior a hoy.
// Para publicar: cambiar status a published y hacer merge.
// ============================================================

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  category: string;
  keyword: string;
  status: "draft" | "published";
  body: string; // markdown sin frontmatter
};

const files = import.meta.glob("/src/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parse(raw: string, filePath: string): Post | null {
  const m = raw.replace(/^﻿/, "").match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return null;
  const data: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    val = val.replace(/\s+#.*$/, ""); // comentario al final de la línea
    val = val.replace(/^["'](.*)["']$/, "$1");
    data[key] = val;
  }
  const fallbackSlug = filePath.split("/").pop()!.replace(/\.md$/, "");
  const slug = data.slug || fallbackSlug;
  if (!data.title) return null;
  return {
    slug,
    title: data.title,
    description: data.description ?? "",
    date: data.date ?? "1970-01-01",
    category: data.category ?? "",
    keyword: data.keyword ?? "",
    status: data.status === "published" ? "published" : "draft",
    body: m[2].trim(),
  };
}

const all: Post[] = Object.entries(files)
  .map(([p, raw]) => parse(raw, p))
  .filter((p): p is Post => p !== null);

/** Artículos visibles en la web, del más nuevo al más antiguo. */
export function getPosts(): Post[] {
  const today = new Date().toISOString().slice(0, 10);
  return all
    .filter((p) => p.status === "published" && p.date <= today)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(iso + "T12:00:00").toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
