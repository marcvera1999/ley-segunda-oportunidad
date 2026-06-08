import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Phone, Search, FileText, Sunrise, Star } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { EligibilityQuiz } from "@/components/site/EligibilityQuiz";
import { ContactForm } from "@/components/site/ContactForm";
import { StickyCTA } from "@/components/site/StickyCTA";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { ExitIntent } from "@/components/site/ExitIntent";
import { TrustBar } from "@/components/site/TrustBar";
import { seo, SITE, localBusinessJsonLd } from "@/lib/seo";

const TITLE = "Abogados Ley Segunda Oportunidad Barcelona | Horizonte Legal";
const DESC =
  "Especialistas en Ley de la Segunda Oportunidad en Barcelona. Cancela tus deudas legalmente. Consulta gratuita y sin compromiso. +500 casos resueltos. Llámanos hoy.";

const faqs = [
  {
    q: "¿Cuánto cuesta acogerse a la Ley de la Segunda Oportunidad?",
    a: "La primera consulta con Horizonte Legal en Barcelona es siempre gratuita y sin compromiso. Los honorarios profesionales para llevar todo el proceso se acuerdan de forma transparente desde el inicio, adaptados a tu situación económica y al volumen de tu deuda. Trabajamos con planes de pago fraccionado para que tu situación actual no sea un obstáculo para empezar de nuevo.",
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
    a: "Sí, aunque con límites. Desde la reforma de 2022, la Ley de la Segunda Oportunidad permite cancelar hasta 10.000€ de deuda con Hacienda y otros 10.000€ con la Seguridad Social por deudor. El resto puede aplazarse en condiciones favorables. Es un cambio importante: antes estas deudas eran totalmente inexonerables.",
  },
  {
    q: "¿Qué pasa si soy autónomo con deudas de mi negocio?",
    a: "Los autónomos están plenamente protegidos por la ley. Puedes cancelar deudas con proveedores, bancos, líneas de crédito, leasing y, dentro de los límites legales, también con Hacienda y la Seguridad Social. Muchos de nuestros clientes en Barcelona son autónomos cuyo negocio quebró y que ahora pueden empezar una nueva actividad sin la mochila del pasado.",
  },
  {
    q: "¿Apareceré en ASNEF o ficheros de morosos durante el proceso?",
    a: "Durante el procedimiento puedes seguir apareciendo en ficheros como ASNEF o RAI. Una vez obtenida la cancelación definitiva de tus deudas (EPI), tus deudas se eliminan directamente y se solicita la baja de estos registros para que recuperes tu reputación financiera lo antes posible.",
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
    localBusinessJsonLd({
      // NOTA: aggregateRating debe reflejar reseñas reales y verificables.
      // Si no las hay, elimínalo para no incumplir las directrices de Google.
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "127" },
    }),
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
      <SocialProof />
      <Eligibilidad />
      <FAQ />
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
    <span className={`block ${italic ? "italic" : ""} ${gold ? "text-gold" : ""}`}>
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
      style={{ background: "linear-gradient(180deg, #FAF8F4 0%, #F5F0E8 100%)" }}
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
          className="inline-block text-[11px] md:text-xs uppercase tracking-[0.18em] text-gold font-semibold border border-gold/50 rounded-full px-4 py-1.5 mb-8 bg-gold/5"
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
          <strong className="text-primary font-semibold">Cancela todas tus deudas</strong> legalmente.
          Miles de personas en Barcelona ya lo han hecho.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="mt-3 text-sm md:text-[15px] text-primary/80"
        >
          📍 Te atendemos en <span className="font-semibold">Paseo de Gracia 120, 2º Derecha · Barcelona</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-9 flex justify-center"
        >
          <a
            href="#contacto"
            className="pulse-gold inline-flex items-center justify-center rounded-full bg-gold text-gold-foreground px-7 min-h-[56px] w-full sm:w-auto font-semibold hover:opacity-95 transition text-base"
          >
            Descubre si puedes cancelar tus deudas →
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-6 text-xs text-muted-foreground"
        >
          ⭐⭐⭐⭐⭐&nbsp; Valorado por +500 familias en Barcelona
        </motion.p>
      </div>
    </section>
  );
}

/* ============ IDENTIFICACIÓN ============ */
function Identificacion() {
  const items = [
    { e: "💳", t: "No llego a fin de mes pagando mis préstamos", c: "Tarjetas, préstamos, financieras… la deuda crece sola." },
    { e: "🏠", t: "Tengo miedo de perder mi casa o que me embarguen", c: "El embargo puede detenerse. Existe un proceso legal para esto." },
    { e: "🧾", t: "Mi negocio cerró y me quedé con las deudas", c: "Los autónomos también tienen derecho a empezar de cero." },
    { e: "🤝", t: "Avalé a alguien y ahora la deuda es mía", c: "La ley protege también a los avalistas. Podemos ayudarte." },
    { e: "📵", t: "Estoy cansado de las llamadas del banco y de los recobros", c: "Cuando inicias el proceso, los acreedores deben dejar de llamarte." },
  ];
  return (
    <section className="py-32 md:py-44">
      <div className="max-w-[760px] mx-auto px-5 md:px-8">
        <Reveal className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.18em] text-gold font-semibold mb-3">¿Eres tú?</p>
          <h2 className="font-display text-3xl md:text-5xl text-primary leading-tight">
            Sabemos exactamente cómo te sientes
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.08}>
              <div className="h-full rounded-2xl bg-card border border-[color:var(--border-warm)] p-6 md:hover:shadow-[var(--shadow-soft)] md:hover:-translate-y-1 transition-all duration-300">
                <div className="text-[40px] leading-none mb-3 text-center">{it.e}</div>
                <p className="font-semibold text-[18px] text-primary leading-snug">{it.t}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{it.c}</p>
              </div>
            </Reveal>
          ))}
        </div>
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
    { Icon: Search, t: "Lo analizamos juntos", d: "Nuestros abogados estudian tu viabilidad en la misma llamada." },
    { Icon: FileText, t: "Presentamos el expediente", d: "Nos encargamos de todo ante los Juzgados" },
    { Icon: Sunrise, t: "Tus deudas se cancelan", d: "Resolución judicial firme. Empiezas de cero." },
  ];
  return (
    <section className="py-32 md:py-44">
      <div className="max-w-[900px] mx-auto px-5 md:px-8">
        <Reveal className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.18em] text-gold font-semibold mb-3">El proceso</p>
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
                <div className="relative mx-auto h-14 w-14 rounded-full bg-background border-2 border-gold flex items-center justify-center text-gold mb-4">
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

/* ============ SOCIAL PROOF ============ */
function SocialProof() {
  const t = [
    { name: "Carlos", city: "Barcelona", amount: "68.000€", quote: "Llegué con miedo y vergüenza. Me trataron como a una persona, no como a un expediente. Hoy duermo tranquilo." },
    { name: "María", city: "L'Hospitalet", amount: "41.500€", quote: "No sabía que esto existía. En 9 meses cancelaron todas mis deudas de tarjetas y préstamos personales." },
    { name: "Ahmed", city: "Badalona", amount: "93.000€", quote: "Mi negocio quebró durante la pandemia. Pensaba que estaba acabado. Ahora tengo una nueva oportunidad." },
  ];
  return (
    <section className="py-32 md:py-44 bg-secondary/40">
      <div className="max-w-[900px] mx-auto px-5 md:px-8">
        <Reveal className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.18em] text-gold font-semibold mb-3">Casos reales</p>
          <h2 className="font-display text-3xl md:text-5xl text-primary leading-tight">
            Personas que ya empezaron de cero
          </h2>
        </Reveal>

        <div className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0 pb-2">
          {t.map((it, i) => (
            <Reveal key={it.name} delay={i * 0.1} className="snap-center shrink-0 w-[85%] md:w-auto">
              <article className="h-full rounded-2xl bg-card border-l-4 border-l-gold border border-[color:var(--border-warm)] p-7 md:hover:-translate-y-1 md:hover:shadow-lg transition-all duration-200">
                <div className="flex gap-0.5 text-gold mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="italic text-primary/85 leading-relaxed mb-6">{it.quote}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[color:var(--border-warm)]">
                  <span className="h-10 w-10 rounded-full bg-sage text-sage-foreground flex items-center justify-center font-display font-semibold text-sm">
                    {it.name[0]}
                  </span>
                  <div>
                    <p className="font-display text-base text-primary leading-tight">{it.name}, {it.city}</p>
                    <p className="text-sm text-gold font-bold">{it.amount} cancelados</p>
                  </div>
                </div>
              </article>
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
    <section id="eligibilidad" className="py-32 md:py-44">
      <div className="max-w-[760px] mx-auto px-5 md:px-8">
        <Reveal className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.18em] text-gold font-semibold mb-3">Test rápido</p>
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
          <p className="text-xs uppercase tracking-[0.18em] text-gold font-semibold mb-3">Preguntas frecuentes</p>
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
                      className={`h-5 w-5 text-gold flex-shrink-0 mt-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 pr-8 text-[16px] leading-[1.7] text-muted-foreground">{f.a}</p>
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

/* ============ SEO CONTENT (collapsible) ============ */
function SeoContent() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="py-32 md:py-44">
      <div className="max-w-[760px] mx-auto px-5 md:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-gold font-semibold mb-3">La ley</p>
          <h2 className="font-display text-3xl md:text-5xl text-primary leading-tight mb-8">
            ¿Qué es la Ley de la Segunda Oportunidad?
          </h2>
          <p className="text-[17px] leading-relaxed text-primary/85">
            La <strong>Ley de la Segunda Oportunidad</strong> (Ley 25/2015, profundamente reformada en 2022) es un mecanismo legal que permite a particulares y autónomos en situación de insolvencia cancelar definitivamente sus deudas a través de un procedimiento judicial. En Barcelona, este procedimiento se tramita ante los Juzgados de lo Mercantil y ofrece una salida real a personas atrapadas en una espiral de deudas imposibles de pagar.
          </p>

          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="space-y-5 pt-5 text-[17px] leading-relaxed text-primary/85">
              <h3 className="font-display text-2xl text-primary pt-2">¿Quién puede acogerse?</h3>
              <p>
                Pueden acogerse tanto <strong>particulares</strong> como <strong>autónomos</strong> (no sociedades S.L. ni S.A.) que estén actuando de buena fe, no hayan ocultado bienes y no hayan sido condenados por delitos económicos en los últimos diez años. No importa el origen de las deudas: préstamos bancarios, tarjetas de crédito, microcréditos, deudas de la actividad empresarial, avales por terceros o incluso parte de las deudas con Hacienda y la Seguridad Social pueden cancelarse mediante la <strong>exoneración de deudas</strong> (EPI – exoneración del pasivo insatisfecho).
              </p>
              <h3 className="font-display text-2xl text-primary pt-2">¿Qué deudas se pueden cancelar y cuáles no?</h3>
              <p>
                La <strong>cancelación de deudas en Barcelona</strong> mediante esta ley incluye préstamos personales, tarjetas, créditos al consumo, financiación de vehículos, deudas con proveedores y, desde la reforma de 2022, hasta 10.000€ de deuda con Hacienda y otros 10.000€ con la Seguridad Social. No se pueden cancelar pensiones de alimentos ni multas penales. Como <strong>abogados especialistas en segunda oportunidad en Barcelona</strong>, llevamos cada expediente desde el primer informe de viabilidad hasta la resolución judicial firme, normalmente en un plazo de 3 a 18 meses.
              </p>
              <p className="italic text-primary">
                Si quieres saber si tu caso es viable, solicita tu consulta gratuita hoy.
              </p>
            </div>
          </motion.div>

          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-primary transition"
          >
            {expanded ? "Leer menos" : "Leer más"}
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
