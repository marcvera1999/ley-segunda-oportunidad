import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

export function StickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <>
      {/* Mobile bar */}
      <a
        href="#contacto"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-primary text-primary-foreground px-5 py-3 flex items-center justify-between text-sm font-medium shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.3)]"
      >
        <span>¿Tienes deudas? Consulta gratuita</span>
        <span className="text-gold">→</span>
      </a>
      {/* Desktop floating */}
      <a
        href="#contacto"
        title="Consulta gratis"
        className="hidden md:flex pulse-gold fixed bottom-6 right-6 z-40 items-center gap-2 rounded-full bg-gold text-gold-foreground px-5 py-3.5 shadow-lg hover:scale-105 transition font-medium"
      >
        <MessageCircle className="h-5 w-5" />
        Consulta gratis
      </a>
    </>
  );
}
