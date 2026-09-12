"use client"; // se oculta mientras el hero es visible (IntersectionObserver)

import { useEffect, useState } from "react";
import WhatsAppLink from "@/components/analytics/WhatsAppLink";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
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
      className={`fixed right-4 z-[85] transition-opacity duration-300 motion-reduce:transition-none md:right-6 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={{ bottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      aria-hidden={!visible}
    >
      <WhatsAppLink
        placement="float"
        aria-label="Escribir a Andrea por WhatsApp"
        tabIndex={visible ? 0 : -1}
        className="flex h-13 items-center gap-2 rounded-full bg-[#1d1d1f] px-4 text-[15px] font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-transform hover:scale-[1.03] motion-reduce:transition-none md:px-5"
      >
        <WhatsAppIcon className="h-5 w-5 text-[#25d366]" />
        <span className="hidden sm:inline">Hablemos</span>
      </WhatsAppLink>
    </div>
  );
}
