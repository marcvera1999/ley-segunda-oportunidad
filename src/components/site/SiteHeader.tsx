import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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
            H
          </span>
          <span className="font-display text-lg md:text-xl text-primary">
            Horizonte <span className="text-gold">Legal</span>
          </span>
        </Link>
        <a
          href="/#contacto"
          className="inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-4 py-2 text-sm font-semibold hover:opacity-95 transition shadow-sm"
        >
          Consulta gratis
        </a>
      </div>
    </header>
  );
}
