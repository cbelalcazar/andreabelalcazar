import { methodology } from "@/content/site";

export default function Methodology() {
  return (
    <section id="metodologia" className="bg-ground-2 px-4 py-24 md:px-6 md:py-36" aria-labelledby="metodologia-title">
      <div className="mx-auto max-w-[1024px]">
        <div className="reveal text-center">
          <p className="eyebrow">{methodology.eyebrow}</p>
          <h2 id="metodologia-title" className="display-lg mx-auto mt-4 max-w-[20ch] text-balance">
            {methodology.title}
          </h2>
          <p className="lead-xl mx-auto mt-6 max-w-[52ch] text-balance">{methodology.lead}</p>
        </div>
        <ol className="reveal mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {methodology.steps.map((step, i) => (
            <li key={step.name} className="tile flex flex-col">
              <span className="font-display text-[13px] font-semibold text-muted tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-[22px] leading-tight font-semibold tracking-[-0.02em] text-ink">
                {step.name}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.55] text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
