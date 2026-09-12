"use client"; // lee/escribe la decisión de consentimiento en localStorage

import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useSyncExternalStore } from "react";

const KEY = "ab-consent-v1";
const EVENT = "ab-consent-change";
type Choice = "granted" | "denied";
type Snapshot = Choice | "none" | "unknown";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function readChoice(): Snapshot {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : "none";
  } catch {
    return "none";
  }
}
const subscribe = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
};
const getServerSnapshot = (): Snapshot => "unknown";

function applyConsent(choice: Choice) {
  window.gtag?.("consent", "update", {
    analytics_storage: choice,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export default function ConsentBanner({ gaId }: { gaId: string }) {
  const choice = useSyncExternalStore(subscribe, readChoice, getServerSnapshot);

  // Sincroniza GA con la decisión guardada (sistema externo: gtag)
  useEffect(() => {
    if (choice === "granted" || choice === "denied") applyConsent(choice);
  }, [choice]);

  const decide = (c: Choice) => {
    try {
      localStorage.setItem(KEY, c);
    } catch {
      /* modo privado: la decisión vive solo en esta sesión */
    }
    window.dispatchEvent(new Event(EVENT));
    applyConsent(c);
  };

  return (
    <>
      {/* gtag.js (~190 KB) solo se descarga cuando el visitante acepta */}
      {choice === "granted" && <GoogleAnalytics gaId={gaId} />}
      {choice === "none" && (
        <div
          role="region"
          aria-label="Aviso de cookies"
          className="fixed inset-x-4 bottom-4 z-[95] mx-auto max-w-xl rounded-[20px] border border-line bg-surface p-5 text-sm text-ink shadow-[0_10px_40px_rgba(0,0,0,0.15)] md:right-6 md:left-auto"
        >
          <p>
            Uso Google Analytics para saber qué contenido resulta útil. Solo se activa si aceptas.{" "}
            <Link href="/privacidad" className="underline underline-offset-4 hover:text-accent">
              Política de privacidad
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => decide("granted")}
              className="min-h-11 rounded-full bg-ink px-5 font-semibold text-white hover:bg-ground-2"
            >
              Aceptar
            </button>
            <button
              type="button"
              onClick={() => decide("denied")}
              className="min-h-11 rounded-full border border-line px-5 font-semibold text-ink hover:bg-surface-2"
            >
              Rechazar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
