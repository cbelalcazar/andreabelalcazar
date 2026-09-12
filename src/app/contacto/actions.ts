"use server";

import { z } from "zod";
import { Resend } from "resend";
import { site } from "@/content/site";

const Schema = z.object({
  nombre: z.string().trim().min(2).max(80),
  organizacion: z.string().trim().max(120).optional().default(""),
  contacto: z.string().trim().min(5).max(120),
  necesidad: z.enum(["prensa", "crisis", "digital", "institucional", "otro"]),
  mensaje: z.string().trim().min(20).max(2000),
  // honeypot: debe llegar vacío
  sitio_web: z.string().max(0).optional().default(""),
});

export type ContactState = { ok: boolean; message: string; detail?: string; errors?: Record<string, string> };

const buckets = new Map<string, { count: number; reset: number }>();
function rateLimited(key: string): boolean {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.reset < now) {
    buckets.set(key, { count: 1, reset: now + 60 * 60 * 1000 });
    return false;
  }
  b.count += 1;
  return b.count > 5;
}

export async function enviarContacto(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = Schema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const i of parsed.error.issues) errors[String(i.path[0])] = "Revisa este campo.";
    return { ok: false, message: "Faltan datos o hay campos incompletos.", errors };
  }
  const d = parsed.data;
  if (d.sitio_web) return { ok: true, message: "Gracias, tu mensaje fue enviado." }; // bot: fingir éxito

  if (rateLimited(d.contacto.toLowerCase())) {
    return { ok: false, message: "Demasiados envíos seguidos. Escríbeme por WhatsApp mientras tanto." };
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return { ok: false, message: "El formulario no está disponible en este momento. Usa WhatsApp o el correo." };
  }
  const resend = new Resend(key);
  const to = (process.env.CONTACT_TO_EMAIL ?? site.email).trim().replace(/^"|"$/g, "");
  // Remitente: debe ser "Nombre <correo@dominio-verificado>" en ASCII. Si la variable de entorno viene mal
  // formada (comillas, tildes, sin <...>), se usa el valor por defecto del dominio verificado.
  const DEFAULT_FROM = "Web Andrea Belalcazar <web@labrujaa.com>";
  const envFrom = (process.env.CONTACT_FROM_EMAIL ?? "")
    .trim()
    .replace(/^["']|["']$/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const fromOk = /^(?:[^<>@\s][^<>@]*<[^\s@<>]+@[^\s@<>]+>|[^\s@<>]+@[^\s@<>]+)$/.test(envFrom);
  const from = fromOk ? envFrom : DEFAULT_FROM;
  const { error } = await resend.emails.send({
    // El remitente debe pertenecer a un dominio verificado en Resend. Hoy el único verificado en la cuenta
    // es labrujaa.com; al verificar andreabelalcazar.com basta cambiar CONTACT_FROM_EMAIL en Vercel.
    from,
    to,
    replyTo: d.contacto.includes("@") ? d.contacto : undefined,
    subject: `[andreabelalcazar.com] ${d.necesidad} · ${d.nombre}${d.organizacion ? ` (${d.organizacion})` : ""}`,
    text: `Nombre: ${d.nombre}\nOrganización: ${d.organizacion || "-"}\nContacto: ${d.contacto}\nNecesidad: ${d.necesidad}\n\n${d.mensaje}`,
  });
  if (error) {
    console.error("[contacto] Resend error:", error.name, error.message, { from, to });
    return {
      ok: false,
      message: "No se pudo enviar. Intenta de nuevo o escríbeme por WhatsApp.",
      detail: `${error.name}: ${error.message} (from usado: ${from}; variable válida: ${fromOk})`,
    };
  }
  return { ok: true, message: "Gracias, tu mensaje fue enviado. Te respondo personalmente." };
}
