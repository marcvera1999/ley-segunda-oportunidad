import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { seo, absUrl, SITE, PHONE_HREF } from "@/lib/seo";
import { getPost, formatDate } from "@/lib/blog";
import { Markdown } from "@/components/site/Markdown";
import { WHATSAPP_HREF } from "@/components/site/whatsapp";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return seo({ title: "Artículo no encontrado | Deuda Eliminada", noindex: true });
    const path = `/blog/${post.slug}`;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: absUrl(path),
      publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    };
    const base = seo({
      title: `${post.title} | Deuda Eliminada`,
      description: post.description,
      path,
      type: "article",
    });
    return { ...base, scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] };
  },
  component: Page,
});

function Page() {
  const { post } = Route.useLoaderData();
  return (
    <main className="pt-32 pb-24 max-w-3xl mx-auto px-5 md:px-8">
      <Link to="/blog" className="text-sm text-gold-ink font-medium">← Volver al blog</Link>
      {post.category && <p className="mt-6 text-sm uppercase tracking-widest text-gold-ink">{post.category}</p>}
      <h1 className="mt-2 font-display text-3xl md:text-5xl text-primary leading-tight">{post.title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">{formatDate(post.date)}</p>

      <div className="mt-8">
        <Markdown source={post.body} />
      </div>

      <section className="mt-12 rounded-2xl bg-card border border-border p-6 md:p-8">
        <h2 className="font-display text-2xl text-primary">¿Quieres que estudiemos tu caso?</h2>
        <p className="mt-2 text-muted-foreground">
          La primera consulta es gratuita y sin compromiso. Te explicamos tus opciones con claridad.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/consulta-gratuita" className="inline-flex rounded-full bg-gold text-gold-foreground px-6 py-3 font-medium">
            Pedir consulta gratuita
          </Link>
          <a href={PHONE_HREF} className="inline-flex rounded-full border border-border px-6 py-3 font-medium text-primary">
            Llamar ahora
          </a>
          <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-border px-6 py-3 font-medium text-primary">
            WhatsApp
          </a>
        </div>
      </section>

      <p className="mt-8 text-xs text-muted-foreground">
        Este artículo es informativo y no sustituye al asesoramiento jurídico sobre tu caso concreto.
      </p>
    </main>
  );
}
