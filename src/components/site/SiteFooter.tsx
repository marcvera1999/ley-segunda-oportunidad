import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="h-9 w-9 rounded-full bg-gold flex items-center justify-center text-primary font-display font-bold">
            H
          </span>
          <span className="font-display text-xl">Horizonte Legal</span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-primary-foreground/80">
          <Link to="/aviso-legal" className="hover:text-gold transition">Aviso Legal</Link>
          <Link to="/politica-privacidad" className="hover:text-gold transition">Privacidad</Link>
          <Link to="/politica-cookies" className="hover:text-gold transition">Cookies</Link>
          <Link to="/preguntas-frecuentes" className="hover:text-gold transition">FAQ</Link>
        </nav>
        <div className="flex items-center gap-4 text-sm">
          <a href="tel:+34625349097" className="inline-flex items-center gap-1.5 hover:text-gold transition">
            <Phone className="h-4 w-4" /> 625 349 097
          </a>
          <a
            href="https://wa.me/34625349097"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-gold transition"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-5 text-center text-xs text-primary-foreground/60 space-y-1">
          <p>© {new Date().getFullYear()} Horizonte Legal · ICAB Colegiados · Barcelona</p>
          <p>Passeig de Gràcia Passeig de Gràcia 120 2ndo Derecha Barcelona 008008</p>
        </div>
      </div>
    </footer>
  );
}
