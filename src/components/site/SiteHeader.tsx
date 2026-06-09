import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="h-8 w-8 rounded-full bg-gradient-to-br from-gold to-[oklch(0.7_0.13_70)] flex items-center justify-center text-primary font-display font-bold text-sm">
            V
          </span>
          <span className="font-display text-lg md:text-xl text-primary">
            Vida <span className="text-gold">Sin Deudas</span>
          </span>
        </Link>
        <div className="flex items-center gap-2 md:gap-3">
          <a
            href="tel:+34932426252"
            className="inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-3.5 md:px-5 py-2 text-sm md:text-base font-bold hover:opacity-95 transition shadow-sm"
            aria-label="Llámanos al 93 242 62 52"
          >
            <Phone className="h-4 w-4" />
            <span className="tabular-nums">93 242 62 52</span>
          </a>
          <a
            href="/#contacto"
            className="hidden sm:inline-flex items-center rounded-full border border-gold/60 text-primary px-4 py-2 text-sm font-semibold hover:bg-gold/10 transition"
          >
            Consulta gratis
          </a>
        </div>
      </div>
    </header>
  );
}
