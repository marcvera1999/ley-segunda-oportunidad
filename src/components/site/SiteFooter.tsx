import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="h-9 w-9 rounded-full bg-gold flex items-center justify-center text-primary font-display font-bold">
              H
            </span>
            <span className="font-display text-xl">Horizonte Legal</span>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/70 leading-relaxed">
            Tu deuda tiene solución. Nosotros la encontramos.
          </p>
        </div>

        <div>
          <h4 className="font-display text-base mb-4 text-gold">Servicios</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/ley-segunda-oportunidad-barcelona" className="hover:text-gold">Ley Segunda Oportunidad</Link></li>
            <li><Link to="/autonomos-ley-segunda-oportunidad-barcelona" className="hover:text-gold">Autónomos</Link></li>
            <li><Link to="/cancelar-deudas-hacienda-barcelona" className="hover:text-gold">Deudas con Hacienda</Link></li>
            <li><Link to="/preguntas-frecuentes" className="hover:text-gold">Preguntas frecuentes</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base mb-4 text-gold">Legal</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/aviso-legal" className="hover:text-gold">Aviso Legal</Link></li>
            <li><Link to="/politica-privacidad" className="hover:text-gold">Política de Privacidad</Link></li>
            <li><Link to="/politica-cookies" className="hover:text-gold">Política de Cookies</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-base mb-4 text-gold">Contacto</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>Carrer de Pau Claris, 100</li>
            <li>08009 Barcelona</li>
            <li>Tel: <a href="tel:+34900000000" className="hover:text-gold">+34 900 000 000</a></li>
            <li>Email: <a href="mailto:hola@horizontelegal.es" className="hover:text-gold">hola@horizontelegal.es</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-primary-foreground/60">
          <p>Miembros del Il·lustre Col·legi de l'Advocacia de Barcelona (ICAB).</p>
          <p>© {new Date().getFullYear()} Horizonte Legal. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
