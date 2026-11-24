import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { PHONE_HREF } from "@/lib/seo";

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
        <Link to="/" className="flex items-center gap-2 group min-w-0">
          <span className="shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-gold to-[oklch(0.60_0.09_72)] flex items-center justify-center text-primary font-display font-bold text-sm">
            D
          </span>
          <span className="font-display text-[15px] min-[400px]:text-lg md:text-xl text-primary whitespace-nowrap">
            Deuda <span className="text-gold-ink">Eliminada</span>
          </span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 shrink-0">
          <Link
            to="/blog"
            className="inline-flex items-center rounded-full px-2 md:px-4 py-2 text-sm md:text-base font-semibold whitespace-nowrap text-primary hover:bg-gold/10 transition"
            activeProps={{ className: "text-gold-ink" }}
          >
            Blog
          </Link>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-1.5 md:gap-2 rounded-full bg-gold text-gold-foreground px-3 md:px-5 py-2 text-[13px] min-[400px]:text-sm md:text-base font-bold whitespace-nowrap shadow-sm hover:opacity-90 transition"
            aria-label="Llamar al 932 426 252"
          >
            <Phone className="h-4 w-4 shrink-0" />
            <span className="tabular-nums max-[350px]:sr-only">932 426 252</span>
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
