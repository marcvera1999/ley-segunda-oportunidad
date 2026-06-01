import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Wallet, ShieldAlert, Briefcase, Users, MessageSquare,
  Search, Landmark, Sunrise, Star, Lock, ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { EligibilityQuiz } from "@/components/site/EligibilityQuiz";
import { ContactForm } from "@/components/site/ContactForm";
import { StickyCTA } from "@/components/site/StickyCTA";

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
    a: "Durante el procedimiento puedes seguir apareciendo en ficheros como ASNEF o RAI. Sin embargo, una vez obtenida la cancelación definitiva de tus deudas (EPI), tienes derecho a solicitar la baja de estos registros. Te acompañamos en ese proceso para que recuperes tu reputación financiera lo antes posible.",
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
      "@type": ["LegalService", "LocalBusiness"],
      name: "Horizonte Legal",
      description: DESC,
      url: "/",
      areaServed: { "@type": "City", name: "Barcelona" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Carrer de Pau Claris, 100",
        addressLocality: "Barcelona",
        postalCode: "08009",
        addressCountry: "ES",
      },
      telephone: "+34900000000",
      priceRange: "€€",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "127",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:locale", content: "es_ES" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Identificacion />
      <ComoFunciona />
      <Eligibilidad />
      <SocialProof />
      <SeoContent />
      <Contacto />
      <FAQ />
      <StickyCTA />
    </main>
  );
}

/* ============ HERO ============ */
function Hero() {
  return (
    <section
      className="relative pt-28 pb-20 md:pt-40 md:pb-32 grain"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="max-w-5xl mx-auto px-5 md:px-8 text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-block text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-5"
        >
          Abogados en Barcelona · Ley 25/2015
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary leading-[1.05] tracking-tight"
        >
          ¿Las deudas no te dejan vivir?
          <br />
          <span className="italic text-gold">Existe una salida legal.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          La Ley de la Segunda Oportunidad te permite cancelar tus deudas
          definitivamente. En Horizonte Legal te acompañamos desde el primer día.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-9 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href="#contacto"
            className="pulse-gold inline-flex items-center justify-center gap-2 rounded-full bg-gold text-gold-foreground px-7 py-4 font-semibold hover:opacity-95 transition"
          >
            Consulta gratuita en 24h →
          </a>
          <a
            href="#eligibilidad"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-transparent border border-primary/20 text-primary px-7 py-4 font-medium hover:bg-primary/5 transition"
          >
            ¿Cumplo los requisitos? →
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
        >
          <span>🔒 Confidencial</span>
          <span>✓ Sin compromiso</span>
          <span>📍 Barcelona</span>
          <span>⚖️ +500 casos resueltos</span>
        </motion.div>
      </div>
    </section>
  );
}

/* ============ ¿Eres tú? ============ */
function Identificacion() {
  const items = [
    { icon: Wallet, text: "No puedo pagar mis préstamos cada mes" },
    { icon: ShieldAlert, text: "Tengo miedo de que me embarguen" },
    { icon: Briefcase, text: "Soy autónomo y mi negocio quebró" },
    { icon: Users, text: "Avalé a alguien y ahora la deuda es mía" },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal className="text-center mb-14">
          <p className="text-sm uppercase tracking-widest text-gold mb-3">¿Eres tú?</p>
          <h2 className="font-display text-3xl md:text-5xl text-primary">
            Sabemos cómo te sientes
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(({ icon: Icon, text }, i) => (
            <Reveal key={text} delay={i * 0.1}>
              <div className="h-full rounded-2xl bg-card border border-border p-6 hover:shadow-[var(--shadow-soft)] hover:-translate-y-1 transition-all duration-300">
                <div className="h-11 w-11 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-5">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-display text-lg text-primary leading-snug italic">
                  "{text}"
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <p className="text-center mt-12 text-muted-foreground max-w-2xl mx-auto text-lg">
            Si alguna de estas situaciones te suena familiar, la Ley de la Segunda
            Oportunidad puede ser para ti.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ Cómo funciona ============ */
function ComoFunciona() {
  const steps = [
    { icon: MessageSquare, t: "Cuéntanos tu caso", d: "Una primera conversación honesta y sin compromiso." },
    { icon: Search, t: "Analizamos tu situación", d: "Estudio gratuito de viabilidad por un abogado especializado." },
    { icon: Landmark, t: "Presentamos tu expediente", d: "Tramitamos todo ante los Juzgados Mercantiles de Barcelona." },
    { icon: Sunrise, t: "Tus deudas se cancelan", d: "Resolución judicial firme. Empiezas de cero." },
  ];

  return (
    <section id="como-funciona" className="py-24 md:py-32 bg-secondary/40">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-gold mb-3">El proceso</p>
          <h2 className="font-display text-3xl md:text-5xl text-primary">
            ¿Cómo funciona? Simple y claro.
          </h2>
        </Reveal>

        <div className="relative grid md:grid-cols-4 gap-8 md:gap-5">
          <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          {steps.map(({ icon: Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 0.12}>
              <div className="relative text-center">
                <div className="relative mx-auto h-14 w-14 rounded-full bg-background border-2 border-gold flex items-center justify-center text-gold mb-5">
                  <Icon className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl text-primary mb-2">{t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.5}>
          <p className="text-center mt-14 text-muted-foreground italic">
            El proceso dura entre <span className="text-primary font-medium">3 y 18 meses</span> según cada caso.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ Eligibilidad ============ */
function Eligibilidad() {
  return (
    <section id="eligibilidad" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-gold mb-3">Test rápido</p>
          <h2 className="font-display text-3xl md:text-5xl text-primary">
            Descubre en 60 segundos si puedes acogerte a la ley
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            5 preguntas. Respuestas confidenciales. Sin formularios ni emails.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <EligibilityQuiz />
        </Reveal>
      </div>
    </section>
  );
}

/* ============ Social proof ============ */
function SocialProof() {
  const testimonials = [
    {
      name: "Carlos", city: "Barcelona", amount: "68.000€",
      quote: "Llegué con miedo y vergüenza. Me trataron como a una persona, no como a un expediente. Hoy duermo tranquilo.",
    },
    {
      name: "María", city: "L'Hospitalet", amount: "41.500€",
      quote: "No sabía que esto existía. En 9 meses cancelaron todas mis deudas de tarjetas y préstamos personales.",
    },
    {
      name: "Ahmed", city: "Badalona", amount: "93.000€",
      quote: "Mi negocio quebró durante la pandemia. Pensaba que estaba acabado. Ahora tengo una nueva oportunidad.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-secondary/40">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal className="text-center mb-14">
          <p className="text-sm uppercase tracking-widest text-gold mb-3">Casos reales</p>
          <h2 className="font-display text-3xl md:text-5xl text-primary">
            Casos reales, vidas transformadas
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12}>
              <article className="h-full rounded-2xl bg-card border border-border p-7 hover:shadow-[var(--shadow-warm)] hover:-translate-y-1 transition-all duration-300">
                <div className="flex gap-0.5 text-gold mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="italic text-primary/85 leading-relaxed mb-6">"{t.quote}"</p>
                <div className="pt-4 border-t border-border">
                  <p className="font-display text-lg text-primary">{t.name}, {t.city}</p>
                  <p className="text-sm text-sage font-semibold">{t.amount} cancelados</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-14 rounded-2xl bg-primary text-primary-foreground p-8 md:p-10 grid sm:grid-cols-3 gap-6 text-center">
            <Stat n="+500" l="procedimientos iniciados" />
            <Stat n="98%" l="tasa de éxito" />
            <Stat n="2015" l="en Barcelona desde" />
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <p className="text-center mt-10 text-xs text-muted-foreground uppercase tracking-widest">
            Colegiados en el Il·lustre Col·legi de l'Advocacia de Barcelona (ICAB) · Juzgados Mercantiles de Barcelona
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <p className="font-display text-4xl md:text-5xl text-gold">{n}</p>
      <p className="text-sm text-primary-foreground/70 mt-1">{l}</p>
    </div>
  );
}

/* ============ SEO content block ============ */
function SeoContent() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-5 md:px-8 prose-content">
        <Reveal className="mb-10">
          <p className="text-sm uppercase tracking-widest text-gold mb-3">La ley</p>
          <h2 className="font-display text-3xl md:text-5xl text-primary leading-tight">
            ¿Qué es la Ley de la Segunda Oportunidad?
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-5 text-[17px] leading-relaxed text-primary/85">
            <p>
              La <strong>Ley de la Segunda Oportunidad</strong> (Ley 25/2015, profundamente reformada en 2022) es un mecanismo legal que permite a particulares y autónomos en situación de insolvencia cancelar definitivamente sus deudas a través de un procedimiento judicial. En Barcelona, este procedimiento se tramita ante los Juzgados de lo Mercantil y ofrece una salida real a personas atrapadas en una espiral de deudas imposibles de pagar.
            </p>

            <h3 className="font-display text-2xl text-primary pt-4">¿Quién puede acogerse?</h3>
            <p>
              Pueden acogerse tanto <strong>particulares</strong> como <strong>autónomos</strong> (no sociedades S.L. ni S.A.) que estén actuando de buena fe, no hayan ocultado bienes y no hayan sido condenados por delitos económicos en los últimos diez años. No importa el origen de las deudas: préstamos bancarios, tarjetas de crédito, microcréditos, deudas de la actividad empresarial, avales por terceros o incluso parte de las deudas con Hacienda y la Seguridad Social pueden cancelarse mediante la <strong>exoneración de deudas</strong> (EPI – exoneración del pasivo insatisfecho).
            </p>

            <h3 className="font-display text-2xl text-primary pt-4">¿Qué deudas se pueden cancelar y cuáles no?</h3>
            <p>
              La <strong>cancelación de deudas en Barcelona</strong> mediante esta ley incluye préstamos personales, tarjetas, créditos al consumo, financiación de vehículos, deudas con proveedores y, desde la reforma de 2022, hasta 10.000€ de deuda con Hacienda y otros 10.000€ con la Seguridad Social. No se pueden cancelar pensiones de alimentos ni multas penales. Como <strong>abogados especialistas en segunda oportunidad en Barcelona</strong>, llevamos cada expediente desde el primer informe de viabilidad hasta la resolución judicial firme, normalmente en un plazo de 3 a 18 meses. El <strong>concurso de acreedores para persona física en Barcelona</strong> es un proceso técnico, pero cuando se gestiona con experiencia, devuelve a la persona la tranquilidad de empezar de nuevo.
            </p>

            <p className="italic text-primary pt-2">
              Si quieres saber si tu caso es viable, solicita tu consulta gratuita hoy.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ Contacto ============ */
function Contacto() {
  return (
    <section id="contacto" className="py-24 md:py-32 bg-secondary/40 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <Reveal className="text-center mb-10">
          <p className="text-sm uppercase tracking-widest text-gold mb-3">Tu primer paso</p>
          <h2 className="font-display text-3xl md:text-5xl text-primary leading-tight">
            Cuéntanos tu situación. <span className="italic">Es confidencial.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Un abogado de nuestro equipo te contactará en menos de 24 horas.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

/* ============ FAQ ============ */
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <Reveal className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-gold mb-3">Preguntas frecuentes</p>
          <h2 className="font-display text-3xl md:text-5xl text-primary">
            Todo lo que querías saber
          </h2>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className="rounded-2xl bg-card border border-border overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-secondary/30 transition"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg text-primary">{f.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-gold flex-shrink-0 mt-1 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-primary/75 leading-relaxed">{f.a}</p>
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
