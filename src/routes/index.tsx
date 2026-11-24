import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Phone, Search, FileText, Sunrise, Check, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { EligibilityQuiz } from "@/components/site/EligibilityQuiz";
import { ContactForm } from "@/components/site/ContactForm";
import { StickyCTA } from "@/components/site/StickyCTA";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { ExitIntent } from "@/components/site/ExitIntent";
import { TrustBar } from "@/components/site/TrustBar";
import { seo, SITE, PHONE_HREF, localBusinessJsonLd } from "@/lib/seo";
import { getPosts, formatDate } from "@/lib/blog";

const TITLE = "Abogados Ley Segunda Oportunidad Barcelona | Deuda Eliminada";
const DESC =
  "Especialistas en Ley de la Segunda Oportunidad en Barcelona. Cancela tus deudas legalmente. Consulta gratuita y sin compromiso. +1000 casos resueltos.";

const faqs = [
  {
    q: "¿Cuánto cuesta acogerse a la Ley de la Segunda Oportunidad?",
    a: "La primera consulta con Deuda Eliminada en Barcelona es siempre gratuita y sin compromiso. Los honorarios profesionales para llevar todo el proceso se acuerdan de forma transparente desde el inicio, adaptados a tu situación económica y al volumen de tu deuda. Trabajamos con planes de pago fraccionado para que tu situación actual no sea un obstáculo para empezar de nuevo.",
  },
  {
    q: "¿Cuánto tiempo dura el proceso?",
    a: "Cada caso es único, pero la mayoría de procedimientos en los Juzgados de lo Mercantil de Barcelona se resuelven entre 3 y 18 meses. Los casos sencillos con pocas deudas suelen ir más rápido, mientras que situaciones más complejas (autónomos con varios acreedores, deudas hipotecarias) pueden alargarse algo más. Te informamos del calendario realista desde la primera reunión.",
  },
  {
    q: "¿Puedo conservar mi vivienda habitual?",
    a: "En muchos casos sí. La ley contempla mecanismos específicos para proteger la vivienda habitual cuando es proporcional a las necesidades del deudor. Estudiamos tu caso concreto: tipo de hipoteca, valor de tasación, situación familiar y posibilidades de mantener al día los pagos hipotecarios. La estrategia se diseña a medida.",
  },
  {
    q: "¿Se pueden cancelar las deudas con Hacienda?",
    a: "Sí, en parte. Desde la reforma de 2022 se puede exonerar una parte de la deuda con Hacienda y con la Seguridad Social: la ley fija un límite de 10.000 € por organismo, con los primeros 5.000 € exonerados íntegramente y el 50 % del importe entre 5.000 € y 10.000 €. Los tribunales están interpretando estos límites, así que estudiamos qué parte de tu deuda pública se puede exonerar en tu caso. Antes de la reforma, estas deudas no se podían cancelar.",
  },
  {
    q: "¿Qué pasa si soy autónomo con deudas de mi negocio?",
    a: "Los autónomos pueden acogerse a la Ley de la Segunda Oportunidad. Se pueden exonerar deudas con proveedores, bancos, líneas de crédito y leasing y, dentro de los límites legales, una parte de las deudas con Hacienda y la Seguridad Social. Muchos de nuestros clientes en Barcelona son autónomos cuyo negocio quebró y que ahora pueden empezar una nueva actividad sin la mochila del pasado.",
  },
  {
    q: "¿Apareceré en ASNEF o ficheros de morosos durante el proceso?",
    a: "Durante el procedimiento puedes seguir apareciendo en ficheros como ASNEF o RAI. Si el juzgado concede la exoneración (EPI), las deudas exoneradas dejan de poder reclamarse y solicitamos la baja de estos registros.",
  },
  {
    q: "¿Funciona si tengo deudas en varias entidades bancarias?",
    a: "Sí, de hecho es lo más habitual. La ley está pensada precisamente para situaciones de sobreendeudamiento con múltiples acreedores: bancos, tarjetas, préstamos personales, microcréditos online, financieras del automóvil, etc. Todas las deudas se tratan conjuntamente en un único procedimiento ante el Juzgado Mercantil de Barcelona.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      inLanguage: SITE.lang,
      publisher: { "@id": `${SITE.url}/#business` },
    },
    localBusinessJsonLd(),
    {
      "@type": "FAQPage",
      "@id": `${SITE.url}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => {
    const { meta, links } = seo({ title: TITLE, description: DESC, path: "/" });
    return {
      meta,
      links,
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
    };
  },
  component: Landing,
});

function Landing() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <TrustBar />
      <Identificacion />
      <Contacto />
      <ComoFunciona />
      <Eligibilidad />
      <FAQ />
      <BlogPreview />
      <SeoContent />
      <StickyCTA />
      <WhatsAppFab />
      <ExitIntent />
    </main>
  );
}

/* ============ HERO ============ */
function Hero() {
  const words = ["¿Y", "si", "pudieras"];
  const words2 = ["borrar", "tus", "deudas"];
  const words3 = ["legalmente?"];

  const Line = ({ ws, delay = 0, italic = false, gold = false }: { ws: string[]; delay?: number; italic?: boolean; gold?: boolean }) => (
    <span className={`block ${italic ? "italic" : ""} ${gold ? "text-gold-ink" : ""}`}>
      {ws.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mr-[0.25em]"
        >
          {w}
        </motion.span>
      ))}
    </span>
  );

  return (
    <section
      className="relative min-h-screen flex items-center pt-28 pb-20 md:pt-32 md:pb-24"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* faint geometric */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full"
        style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 60%)", opacity: 0.04 }}
      />
      <div className="relative z-10 max-w-[760px] mx-auto px-5 md:px-8 text-center w-full">
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-block text-[11px] md:text-xs uppercase tracking-[0.18em] text-gold-ink font-semibold border border-gold/50 rounded-full px-4 py-1.5 mb-8 bg-gold/5"
        >
          Abogados en Barcelona · Ley 25/2015 · Reformada 2022
        </motion.span>

        <h1 className="font-display font-bold text-primary leading-[1.05] tracking-tight text-[38px] md:text-[56px]">
          <Line ws={words} delay={0.2} />
          <Line ws={words2} delay={0.5} />
          <Line ws={words3} delay={0.95} italic gold />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-7 text-[18px] md:text-[20px] text-muted-foreground max-w-[560px] mx-auto leading-relaxed"
        >
          <strong className="text-primary font-semibold">Una salida legal a tus deudas</strong> para particulares y autónomos.
          Te decimos gratis si puedes acogerte a la ley.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="mt-3 text-sm md:text-[15px] text-primary/80"
        >
          📍 Te atendemos en <span className="font-semibold">Paseo de Gracia 120, 2º Derecha · Barcelona</span>
        </motion.p>

        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="mt-8 mx-auto max-w-[520px] space-y-3 text-left"
        >
          {[
            "Te explicamos cómo afecta el procedimiento a los embargos y reclamaciones que tengas en curso",
            "Si se cancelan tus deudas, pedimos tu baja de los ficheros de morosos",
          ].map((b) => (
            <li key={b} className="flex items-start gap-3 text-[15px] md:text-base text-primary/90">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-sage text-sage-foreground">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <span>{b}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-9 flex flex-col items-center gap-3"
        >
          <a
            href={PHONE_HREF}
            aria-label="Llamar al 932 426 252"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold text-gold-foreground px-7 min-h-[56px] w-full sm:w-auto font-bold text-lg hover:opacity-95 transition"
          >
            <Phone className="h-5 w-5" />
            <span>
              Llámanos: <span className="tabular-nums">932 426 252</span>
            </span>
          </a>
          <a
            href="#contacto"
            className="inline-flex items-center gap-1.5 text-primary font-semibold hover:text-gold-ink transition"
          >
            o solicita tu consulta gratuita →
          </a>
        </motion.div>

      </div>
    </section>
  );
}

/* ============ IDENTIFICACIÓN ============ */
function Identificacion() {
  const items = [
    { e: "💳", t: "No llego a fin de mes pagando mis préstamos", c: "Tarjetas, préstamos, financieras… la deuda crece sola." },
    { e: "🏠", t: "Tengo miedo de perder mi casa o que me embarguen", c: "Existe un procedimiento legal que puede ayudarte. Lo estudiamos contigo." },
    { e: "🧾", t: "Mi negocio cerró y me quedé con las deudas", c: "Los autónomos también tienen derecho a empezar de cero." },
    { e: "🤝", t: "Avalé a alguien y ahora la deuda es mía", c: "Los avalistas también pueden acogerse a la ley. Estudiamos tu caso." },
    { e: "📵", t: "Estoy cansado de las llamadas del banco y de los recobros", c: "Te explicamos cómo afecta el procedimiento a las reclamaciones de tus acreedores." },
  ];
  return (
    <section className="py-32 md:py-44">
      <div className="max-w-[760px] mx-auto px-5 md:px-8">
        <Reveal className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.18em] text-gold-ink font-semibold mb-3">¿Eres tú?</p>
          <h2 className="font-display text-3xl md:text-5xl text-primary leading-tight">
            Sabemos exactamente cómo te sientes
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-4">
          {items.slice(0, 4).map((it, i) => (
            <Reveal key={it.t} delay={i * 0.08}>
              <div className="h-full rounded-2xl bg-card border border-[color:var(--border-warm)] p-6 md:hover:shadow-[var(--shadow-soft)] md:hover:-translate-y-1 transition-all duration-300">
                <div className="text-[40px] leading-none mb-3 text-center">{it.e}</div>
                <p className="font-semibold text-[18px] text-primary leading-snug">{it.t}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{it.c}</p>
              </div>
            </Reveal>
          ))}
        </div>
        {items[4] && (
          <div className="mt-4 sm:mx-auto sm:w-[calc(50%-0.5rem)]">
            <Reveal delay={0.4}>
              <div className="h-full rounded-2xl bg-card border border-[color:var(--border-warm)] p-6 md:hover:shadow-[var(--shadow-soft)] md:hover:-translate-y-1 transition-all duration-300">
                <div className="text-[40px] leading-none mb-3 text-center">{items[4].e}</div>
                <p className="font-semibold text-[18px] text-primary leading-snug">{items[4].t}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{items[4].c}</p>
              </div>
            </Reveal>
          </div>
        )}
        <Reveal delay={0.3}>
          <p className="text-center mt-12 italic text-[18px] text-sage leading-relaxed max-w-xl mx-auto">
            Si te has reconocido en alguna de estas situaciones, tienes derecho a saber si puedes salir de esto.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ CONTACTO (mini-form) ============ */
function Contacto() {
  return (
    <section id="contacto" className="py-24 md:py-36 bg-secondary/40 scroll-mt-20">
      <div className="max-w-[760px] mx-auto px-5 md:px-8">
        <Reveal>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

/* ============ CÓMO FUNCIONA ============ */
function ComoFunciona() {
  const steps = [
    { Icon: Phone, t: "Nos cuentas tu caso", d: "Una llamada confidencial. Sin papeles, sin compromisos." },
    { Icon: Search, t: "Lo analizamos juntos", d: "Un abogado estudia gratis si puedes acogerte a la ley." },
    { Icon: FileText, t: "Presentamos el expediente", d: "Nos encargamos de todo ante los Juzgados" },
    { Icon: Sunrise, t: "Pedimos la exoneración", d: "El juzgado resuelve qué deudas quedan canceladas." },
  ];
  return (
    <section className="py-32 md:py-44">
      <div className="max-w-[900px] mx-auto px-5 md:px-8">
        <Reveal className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.18em] text-gold-ink font-semibold mb-3">El proceso</p>
          <h2 className="font-display text-3xl md:text-5xl text-primary leading-tight">
            Cuatro pasos. Sin burocracia.
          </h2>
        </Reveal>
        <div className="relative grid md:grid-cols-4 gap-10 md:gap-5">
          <div
            aria-hidden
            className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px"
            style={{ backgroundImage: "repeating-linear-gradient(to right, var(--gold) 0 6px, transparent 6px 12px)" }}
          />
          {steps.map(({ Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 0.1}>
              <div className="relative text-center">
                <div className="relative mx-auto h-14 w-14 rounded-full bg-background border-2 border-gold flex items-center justify-center text-gold-ink mb-4">
                  <Icon className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl text-primary mb-2 min-h-[3.5rem] flex items-center justify-center">{t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed py-0">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ ELIGIBILIDAD ============ */
function Eligibilidad() {
  return (
    <section id="eligibilidad" className="py-32 md:py-44 bg-secondary/40">
      <div className="max-w-[760px] mx-auto px-5 md:px-8">
        <Reveal className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.18em] text-gold-ink font-semibold mb-3">Test rápido</p>
          <h2 className="font-display text-3xl md:text-5xl text-primary leading-tight">
            Descubre en 60 segundos si puedes acogerte
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <EligibilityQuiz />
        </Reveal>
      </div>
    </section>
  );
}

/* ============ FAQ ============ */
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-32 md:py-44">
      <div className="max-w-[760px] mx-auto px-5 md:px-8">
        <Reveal className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.18em] text-gold-ink font-semibold mb-3">Preguntas frecuentes</p>
          <h2 className="font-display text-3xl md:text-5xl text-primary leading-tight">
            Lo que todo el mundo pregunta
          </h2>
        </Reveal>
        <div>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <div className="border-b border-[color:var(--border-warm)]">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full text-left py-5 flex items-start justify-between gap-4"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[17px] font-semibold text-primary">{f.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-gold-ink flex-shrink-0 mt-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 pr-8 text-[16px] leading-[1.7] text-muted-foreground text-justify hyphens-auto">{f.a}</p>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ BLOG (últimos artículos) ============ */
function BlogPreview() {
  const posts = getPosts().slice(0, 3);
  if (posts.length === 0) return null;
  return (
    <section id="blog" className="py-24 md:py-36 bg-secondary/40">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <Reveal className="mb-10 md:mb-12">
          <p className="text-xs uppercase tracking-[0.18em] text-gold-ink font-semibold mb-3">Blog</p>
          <h2 className="font-display text-3xl md:text-5xl text-primary leading-tight">
            Respuestas claras a tus dudas
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Artículos sencillos sobre deudas y la Ley de la Segunda Oportunidad, sin tecnicismos.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group block rounded-2xl bg-card border border-border p-6 hover:shadow-[var(--shadow-soft)] hover:-translate-y-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {p.category && <p className="text-xs uppercase tracking-widest text-gold-ink mb-2">{p.category}</p>}
              <h3 className="font-display text-xl text-primary leading-snug group-hover:underline decoration-gold/60 underline-offset-4">{p.title}</h3>
              <p className="mt-3 text-xs text-muted-foreground">{formatDate(p.date)}</p>
              <span className="mt-4 inline-flex text-sm text-gold-ink font-medium">Leer artículo →</span>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-gold/60 text-primary px-6 py-3 font-semibold hover:bg-gold/10 transition"
          >
            Ver todos los artículos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============ SEO CONTENT (collapsible) ============ */
function SeoContent() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="py-32 md:py-44">
      <div className="max-w-[760px] mx-auto px-5 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-gold-ink font-semibold mb-3">La ley</p>
          <h2 className="font-display text-3xl md:text-5xl text-primary leading-tight mb-8">
            ¿Qué es la Ley de la Segunda Oportunidad?
          </h2>
          <p className="text-[17px] leading-relaxed text-primary/85 text-justify hyphens-auto">
            La <strong>Ley de la Segunda Oportunidad</strong> (Ley 25/2015, profundamente reformada en 2022) es un mecanismo legal que permite a particulares y autónomos en situación de insolvencia cancelar definitivamente sus deudas a través de un procedimiento judicial. En Barcelona, este procedimiento se tramita ante los Juzgados de lo Mercantil y ofrece una salida real a personas atrapadas en una espiral de deudas imposibles de pagar.
          </p>

          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="space-y-5 pt-5 text-[17px] leading-relaxed text-primary/85 text-justify hyphens-auto">
              <h3 className="font-display text-2xl text-primary pt-2">¿Quién puede acogerse?</h3>
              <p>
                Pueden acogerse tanto <strong>particulares</strong> como <strong>autónomos</strong> (no sociedades S.L. ni S.A.) que estén actuando de buena fe, no hayan ocultado bienes y no hayan sido condenados por delitos económicos en los últimos diez años. No importa el origen de las deudas: préstamos bancarios, tarjetas de crédito, microcréditos, deudas de la actividad empresarial, avales por terceros o incluso parte de las deudas con Hacienda y la Seguridad Social pueden cancelarse mediante la <strong>exoneración de deudas</strong> (EPI – exoneración del pasivo insatisfecho).
              </p>
              <h3 className="font-display text-2xl text-primary pt-2">¿Qué deudas se pueden cancelar y cuáles no?</h3>
              <p>
                La <strong>cancelación de deudas en Barcelona</strong> mediante esta ley incluye préstamos personales, tarjetas, créditos al consumo, financiación de vehículos, deudas con proveedores y, desde la reforma de 2022, una parte de la deuda con Hacienda y con la Seguridad Social, con los límites que marca la ley. No se pueden cancelar pensiones de alimentos ni multas penales. Como <strong>abogados especialistas en segunda oportunidad en Barcelona</strong>, llevamos cada expediente desde el primer informe de viabilidad hasta la resolución judicial firme, normalmente en un plazo de 3 a 18 meses.
              </p>
              <p className="italic text-primary">
                Si quieres saber si tu caso es viable, solicita tu consulta gratuita hoy.
              </p>
            </div>
          </motion.div>

          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-ink hover:text-primary transition"
          >
            {expanded ? "Leer menos" : "Leer más"}
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
