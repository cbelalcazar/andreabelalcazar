export default function Faq({
  items,
  title = "Preguntas frecuentes",
}: {
  items: { q: string; a: string }[];
  title?: string;
}) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="faq-title" className="mt-14">
      <h2 id="faq-title" className="font-serif text-3xl text-white">
        {title}
      </h2>
      <dl className="mt-6 divide-y divide-line rounded-2xl border border-line">
        {items.map((f) => (
          <div key={f.q} className="px-6 py-5">
            <dt className="font-semibold text-paper">{f.q}</dt>
            <dd className="mt-2 leading-relaxed text-muted">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
