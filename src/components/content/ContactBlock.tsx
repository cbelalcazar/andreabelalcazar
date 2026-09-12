import Link from "next/link";
import WhatsAppLink from "@/components/analytics/WhatsAppLink";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import type { WhatsAppPlacement } from "@/lib/whatsapp";

export default function ContactBlock({
  title = "¿Hablamos de tu caso?",
  text = "Cuéntame tu situación en un mensaje. Respondo personalmente.",
  placement,
  topic,
}: {
  title?: string;
  text?: string;
  placement: WhatsAppPlacement;
  topic?: string;
}) {
  return (
    <aside className="theme-dark mt-16 rounded-[28px] bg-ground p-8 md:p-10">
      <h2 className="display-md text-balance">{title}</h2>
      <p className="mt-3 max-w-[48ch] text-[17px] leading-[1.55] text-muted">{text}</p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <WhatsAppLink placement={placement} topic={topic} className="btn-pill">
          <WhatsAppIcon className="h-5 w-5" /> Hablemos por WhatsApp
        </WhatsAppLink>
        <Link href="/contacto" className="btn-pill-ghost">
          Otras formas de contacto
        </Link>
      </div>
    </aside>
  );
}
