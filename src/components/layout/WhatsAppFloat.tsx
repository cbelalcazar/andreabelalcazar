"use client"; // se oculta mientras el hero es visible (IntersectionObserver)

import { useEffect, useState } from "react";
import WhatsAppLink from "@/components/analytics/WhatsAppLink";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      // Sin hero (p. ej. 404): mostrar en el siguiente frame, fuera del cuerpo del efecto
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(([entry]) => setVisible(entry.intersectionRatio < 0.35), {
      threshold: [0, 0.35, 1],
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed right-4 z-[85] transition-opacity duration-300 motion-reduce:transition-none ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={{ bottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      aria-hidden={!visible}
    >
      <WhatsAppLink
        placement="float"
        aria-label="Escribir a Andrea por WhatsApp"
        tabIndex={visible ? 0 : -1}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-ink shadow-[0_12px_32px_rgba(37,211,102,0.35)] transition-transform hover:scale-105 motion-reduce:transition-none"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </WhatsAppLink>
    </div>
  );
}
