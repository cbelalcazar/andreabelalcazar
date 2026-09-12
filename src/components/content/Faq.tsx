export default function Faq({
  items,
  title = "Preguntas frecuentes",
}: {
  items: { q: string; a: string }[];
  title?: string;
}) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="faq-title" className="not-prose mt-16">
      <h2 id="faq-title" className="display-md">
        {title}
      </h2>
      <dl className="mt-6 divide-y divide-line rounded-[20px] bg-surface shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        {items.map((f) => (
          <div key={f.q} className="px-6 py-5">
            <dt className="text-[17px] font-semibold text-ink">{f.q}</dt>
            <dd className="mt-2 text-[16px] leading-[1.6] text-muted">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
