import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { getPosts, formatDate } from "@/lib/blog";

const TITLE = "Blog | Deuda Eliminada — Ley Segunda Oportunidad Barcelona";
const DESC = "Artículos sobre la Ley de la Segunda Oportunidad, casos prácticos y consejos para personas con deudas en Barcelona.";

export const Route = createFileRoute("/blog")({
  head: () => seo({ title: TITLE, description: DESC, path: "/blog" }),
  component: Page,
});

function Page() {
  const posts = getPosts();
  return (
    <main className="pt-32 pb-24 max-w-5xl mx-auto px-5 md:px-8">
      <p className="text-sm uppercase tracking-widest text-gold-ink mb-3">Blog</p>
      <h1 className="font-display text-4xl md:text-5xl text-primary">Conocimiento, sin tecnicismos</h1>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        Artículos prácticos sobre la Ley de la Segunda Oportunidad en Barcelona.
      </p>

      {posts.length === 0 ? (
        <p className="mt-12 text-muted-foreground">Estamos preparando los primeros artículos. Vuelve pronto.</p>
      ) : (
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {posts.map((p) => (
            <article key={p.slug} className="rounded-2xl bg-card border border-border p-6 hover:shadow-[var(--shadow-soft)] hover:-translate-y-1 transition">
              <div className="h-40 -mx-6 -mt-6 mb-5 rounded-t-2xl bg-gradient-to-br from-gold/30 via-sage/20 to-primary/10" />
              {p.category && <p className="text-xs uppercase tracking-widest text-gold-ink mb-2">{p.category}</p>}
              <h2 className="font-display text-xl text-primary leading-snug">{p.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>
              <p className="mt-3 text-xs text-muted-foreground">{formatDate(p.date)}</p>
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="mt-5 inline-flex text-sm text-gold-ink font-medium">
                Leer artículo →
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
