import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

const HREF =
  "https://wa.me/34659924695?text=Hola,%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20la%20Ley%20de%20la%20Segunda%20Oportunidad";

export function WhatsAppFab() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      href={HREF}
      target="_blank"
      rel="noopener noreferrer"
      title="Escríbenos por WhatsApp"
      aria-label="Escríbenos por WhatsApp"
      className={`group fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 transition-all duration-500 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden md:block opacity-0 group-hover:opacity-100 transition whitespace-nowrap bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-full">
        Escríbenos por WhatsApp
      </span>
      <span className="pulse-whatsapp flex h-14 w-14 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg">
        <MessageCircle className="h-7 w-7" fill="currentColor" strokeWidth={0} />
      </span>
    </a>
  );
}
