import { useEffect, useState } from "react";

export function StickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <a
      href="#contacto"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-gold text-gold-foreground h-14 flex items-center justify-center text-sm font-semibold shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.25)]"
    >
      Consulta gratuita → Respuesta en 2h
    </a>
  );
}
