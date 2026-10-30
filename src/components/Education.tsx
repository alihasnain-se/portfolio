import { portfolio } from "@/data/portfolio";
import { Cap, Check } from "./Icons";
import { Reveal } from "./Reveal";

export function Education() {
  const e = portfolio.education;
  return (
    <section id="education" className="border-t border-line/10 bg-surface/40 py-16 sm:py-24">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Background</p>
          <h2 className="section-title">Education</h2>
        </Reveal>

        <Reveal delay={100} className="mt-10 max-w-3xl">
          <div className="card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8">
            <span
              className="grid h-14 w-14 shrink-0 place-items-center rounded-xl text-white"
              style={{ backgroundImage: "linear-gradient(135deg, rgb(var(--accent)), rgb(var(--accent-2)))" }}
            >
              <Cap className="h-7 w-7" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium text-accent">{e.period}</p>
              <h3 className="mt-1 font-display text-xl font-semibold sm:text-2xl">{e.degree}</h3>
              <p className="mt-1 text-muted">{e.institution}</p>
            </div>
            <p className="inline-flex items-center gap-1.5 self-start rounded-full border border-good/30 bg-good/10 px-3 py-1 text-sm font-medium text-good sm:self-center">
              <Check className="h-4 w-4" /> {e.status}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
