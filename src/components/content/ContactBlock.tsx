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
    <aside className="mt-16 rounded-2xl border border-gold/30 bg-gold/5 p-8 md:p-10">
      <h2 className="font-serif text-2xl text-white md:text-3xl">{title}</h2>
      <p className="mt-3 max-w-xl text-muted">{text}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <WhatsAppLink
          placement={placement}
          topic={topic}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-7 text-sm font-semibold text-ink hover:bg-gold-deep"
        >
          <WhatsAppIcon className="h-5 w-5" /> Hablemos por WhatsApp
        </WhatsAppLink>
        <Link
          href="/contacto"
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-7 text-sm font-semibold text-white hover:bg-white/5"
        >
          Otras formas de contacto
        </Link>
      </div>
    </aside>
  );
}
