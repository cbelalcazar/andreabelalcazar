"use client"; // formulario con estado de envío (useActionState)

import { useActionState, useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { services } from "@/content/site";
import { enviarContacto, type ContactState } from "./actions";

const initial: ContactState = { ok: false, message: "" };

const field =
  "mt-1 w-full rounded-lg border border-line bg-ground-2 px-4 py-3 text-ink placeholder:text-muted focus:border-gold";

export default function ContactForm() {
  const [state, action, pending] = useActionState(enviarContacto, initial);

  // Evento clave de GA4 (plan G-12/C-02); sin consentimiento gtag no existe y no se envía nada
  useEffect(() => {
    if (!state.sent || typeof window.gtag !== "function") return;
    try {
      sendGAEvent("event", "contact_form_submit", { topic: state.sent.necesidad, plazo: state.sent.plazo });
    } catch {
      /* GA no cargado */
    }
  }, [state.sent]);

  if (state.ok) {
    return (
      <div role="status" className="rounded-2xl border border-line bg-surface p-6 text-ink">
        {state.message}
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5" noValidate>
      <div>
        <label htmlFor="nombre" className="text-sm font-medium text-ink">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          required
          minLength={2}
          maxLength={80}
          autoComplete="name"
          className={field}
          aria-invalid={!!state.errors?.nombre}
        />
        {state.errors?.nombre && <p className="mt-1 text-sm text-accent">{state.errors.nombre}</p>}
      </div>
      <div>
        <label htmlFor="organizacion" className="text-sm font-medium text-ink">
          Entidad u organización <span className="text-muted">(opcional)</span>
        </label>
        <input id="organizacion" name="organizacion" maxLength={120} autoComplete="organization" className={field} />
      </div>
      <div>
        <label htmlFor="contacto" className="text-sm font-medium text-ink">
          Correo o WhatsApp para responderte
        </label>
        <input
          id="contacto"
          name="contacto"
          required
          minLength={5}
          maxLength={120}
          autoComplete="email"
          className={field}
          aria-invalid={!!state.errors?.contacto}
        />
        {state.errors?.contacto && <p className="mt-1 text-sm text-accent">{state.errors.contacto}</p>}
      </div>
      <div>
        <label htmlFor="necesidad" className="text-sm font-medium text-ink">
          Qué necesitas
        </label>
        <select id="necesidad" name="necesidad" required className={field} defaultValue={services[0].id}>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
          <option value="otro">Otro</option>
        </select>
      </div>
      <div>
        <label htmlFor="plazo" className="text-sm font-medium text-ink">
          ¿Para cuándo?
        </label>
        <select id="plazo" name="plazo" required className={field} defaultValue="este-mes">
          <option value="esta-semana">Esta semana</option>
          <option value="este-mes">Este mes</option>
          <option value="explorando">Estoy explorando opciones</option>
        </select>
      </div>
      <div>
        <label htmlFor="mensaje" className="text-sm font-medium text-ink">
          Cuéntame la situación
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          minLength={20}
          maxLength={2000}
          rows={5}
          className={field}
          aria-invalid={!!state.errors?.mensaje}
        />
        {state.errors?.mensaje && <p className="mt-1 text-sm text-accent">{state.errors.mensaje}</p>}
      </div>
      {/* Honeypot: oculto para personas, tentador para bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="sitio_web">Sitio web</label>
        <input id="sitio_web" name="sitio_web" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="text-xs text-muted">
        Al enviar aceptas la{" "}
        <a href="/privacidad" className="underline underline-offset-4 hover:text-accent">
          política de privacidad
        </a>
        . Solo uso estos datos para responderte.
      </p>
      {state.message && !state.ok && (
        <p role="alert" className="text-sm text-accent">
          {state.message}
          {state.detail ? (
            <span className="mt-1 block text-[12px] text-muted">Detalle técnico: {state.detail}</span>
          ) : null}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-8 text-sm font-semibold text-white hover:bg-ground-2 disabled:opacity-60"
      >
        {pending ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
