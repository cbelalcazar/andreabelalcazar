"use client"; // formulario con estado de envío (useActionState)

import { useActionState } from "react";
import { enviarContacto, type ContactState } from "./actions";

const initial: ContactState = { ok: false, message: "" };

const field =
  "mt-1 w-full rounded-lg border border-line bg-ground-2 px-4 py-3 text-ink placeholder:text-muted focus:border-gold";

export default function ContactForm() {
  const [state, action, pending] = useActionState(enviarContacto, initial);

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
        <select id="necesidad" name="necesidad" required className={field} defaultValue="prensa">
          <option value="prensa">Jefatura de prensa y medios</option>
          <option value="crisis">Gestión de crisis</option>
          <option value="digital">Estrategia digital y marketing</option>
          <option value="institucional">Comunicación institucional</option>
          <option value="otro">Otro</option>
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
