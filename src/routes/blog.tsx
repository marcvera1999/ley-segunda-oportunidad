import { createFileRoute, Link } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

const TITLE = "Blog | Vida Sin Deudas — Ley Segunda Oportunidad Barcelona";
const DESC = "Artículos sobre la Ley de la Segunda Oportunidad, casos prácticos y consejos para personas con deudas en Barcelona.";

const posts = [
  { slug: "cuanto-tarda-ley-segunda-oportunidad-barcelona", title: "¿Cuánto tarda la Ley de la Segunda Oportunidad en Barcelona?", excerpt: "Plazos reales del procedimiento ante los Juzgados Mercantiles." },
  { slug: "salvar-mi-casa-ley-segunda-oportunidad", title: "¿Puedo salvar mi casa con la Ley de la Segunda Oportunidad?", excerpt: "Cuándo es posible mantener la vivienda habitual." },
  { slug: "autonomos-deudas-empezar-de-cero-barcelona", title: "Autónomos y deudas: cómo empezar de cero en Barcelona", excerpt: "Guía completa para autónomos sobreendeudados." },
];

export const Route = createFileRoute("/blog")({
  head: () => seo({ title: TITLE, description: DESC, path: "/blog" }),
  component: Page,
});

function Page() {
  return (
    <main className="pt-32 pb-24 max-w-5xl mx-auto px-5 md:px-8">
      <p className="text-sm uppercase tracking-widest text-gold mb-3">Blog</p>
      <h1 className="font-display text-4xl md:text-5xl text-primary">Conocimiento, sin tecnicismos</h1>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        Artículos prácticos sobre la Ley de la Segunda Oportunidad en Barcelona.
      </p>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {posts.map((p) => (
          <article key={p.slug} className="rounded-2xl bg-card border border-border p-6 hover:shadow-[var(--shadow-soft)] hover:-translate-y-1 transition">
            <div className="h-40 -mx-6 -mt-6 mb-5 rounded-t-2xl bg-gradient-to-br from-gold/30 via-sage/20 to-primary/10" />
            <h2 className="font-display text-xl text-primary leading-snug">{p.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
            <Link to="/blog" className="mt-5 inline-flex text-sm text-gold font-medium">Próximamente →</Link>
          </article>
        ))}
      </div>
    </main>
  );
}
