"use client"; // un solo listener delegado para todos los CTAs (evita hidratar cada enlace)

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

export default function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (!target) return;
      try {
        sendGAEvent("event", target.dataset.track ?? "click", {
          placement: target.dataset.placement ?? "",
          topic: target.dataset.topic ?? "",
          page_path: window.location.pathname,
        });
      } catch {
        /* GA no cargado: no bloquear la navegación */
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
