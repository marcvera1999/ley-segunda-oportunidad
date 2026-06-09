import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 grid gap-10 md:grid-cols-4">
        {/* Marca + contacto */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="h-9 w-9 rounded-full bg-gold flex items-center justify-center text-primary font-display font-bold">
              V
            </span>
            <span className="font-display text-xl">Vida Sin Deudas</span>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/70 leading-relaxed">
            Abogados especialistas en la Ley de la Segunda Oportunidad. Cancela tus
            deudas legalmente. Primera consulta gratuita y sin compromiso.
          </p>
          <a
            href="tel:+34932426252"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-4 py-2 text-sm font-bold hover:opacity-95 transition"
          >
            <Phone className="h-4 w-4" /> 93 242 62 52
          </a>
        </div>

        {/* Servicios (enlaces SEO) */}
        <nav aria-label="Servicios">
          <h2 className="text-xs uppercase tracking-[0.15em] text-gold font-semibold mb-4">Servicios</h2>
          <ul className="space-y-2.5 text-sm text-primary-foreground/80">
            <li><Link to="/ley-segunda-oportunidad-barcelona" className="hover:text-gold transition">Ley de la Segunda Oportunidad en Barcelona</Link></li>
            <li><Link to="/autonomos-ley-segunda-oportunidad-barcelona" className="hover:text-gold transition">Autónomos con deudas</Link></li>
            <li><Link to="/cancelar-deudas-hacienda-barcelona" className="hover:text-gold transition">Cancelar deudas con Hacienda</Link></li>
          </ul>
        </nav>

        {/* Información */}
        <nav aria-label="Información">
          <h2 className="text-xs uppercase tracking-[0.15em] text-gold font-semibold mb-4">Información</h2>
          <ul className="space-y-2.5 text-sm text-primary-foreground/80">
            <li><Link to="/preguntas-frecuentes" className="hover:text-gold transition">Preguntas frecuentes</Link></li>
            <li><Link to="/blog" className="hover:text-gold transition">Blog</Link></li>
            <li><Link to="/aviso-legal" className="hover:text-gold transition">Aviso legal</Link></li>
            <li><Link to="/politica-privacidad" className="hover:text-gold transition">Política de privacidad</Link></li>
            <li><Link to="/politica-cookies" className="hover:text-gold transition">Política de cookies</Link></li>
          </ul>
        </nav>

        {/* Contacto */}
        <div>
          <h2 className="text-xs uppercase tracking-[0.15em] text-gold font-semibold mb-4">Contacto</h2>
          <ul className="space-y-2.5 text-sm text-primary-foreground/80">
            <li>
              <a href="tel:+34932426252" className="inline-flex items-center gap-2 hover:text-gold transition">
                <Phone className="h-4 w-4" /> 93 242 62 52
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/34659924695"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-gold transition"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            <li className="text-primary-foreground/70 leading-relaxed pt-1">
              Passeig de Gràcia 120, 2º Derecha<br />08008 Barcelona
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-5 text-center text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} Vida Sin Deudas · Colegiados en el ICAB · Barcelona
        </div>
      </div>
    </footer>
  );
}
