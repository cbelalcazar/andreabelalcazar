import type { ComponentProps } from "react";
import { buildWhatsAppUrl, type WhatsAppPlacement } from "@/lib/whatsapp";

type Props = Omit<ComponentProps<"a">, "href"> & {
  placement: WhatsAppPlacement;
  topic?: string;
};

/**
 * Enlace a WhatsApp con texto prellenado. Es un Server Component: no añade
 * JavaScript por cada CTA. El evento de conversión lo captura un único
 * listener delegado en <AnalyticsEvents /> leyendo data-placement/data-topic.
 */
export default function WhatsAppLink({ placement, topic, children, ...rest }: Props) {
  return (
    <a
      href={buildWhatsAppUrl(placement, topic)}
      target="_blank"
      rel="noopener noreferrer"
      data-placement={placement}
      data-topic={topic}
      data-track="contact_whatsapp"
      {...rest}
    >
      {children}
    </a>
  );
}
