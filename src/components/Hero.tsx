import { portfolio } from "@/data/portfolio";
import { ArrowRight } from "./Icons";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-[calc(var(--header-h)+3rem)] sm:pt-[calc(var(--header-h)+5rem)]">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="hero-grid absolute inset-0" />
        <div className="absolute left-1/2 top-0 h-[28rem] w-[46rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl dark-glow" />
      </div>

      <div className="wrap flex flex-col items-center pb-16 text-center lg:pb-24">
        <p className="fade-up inline-flex items-center gap-2 rounded-full border border-line/25 px-3.5 py-1.5 text-sm text-muted" style={{ "--delay": "50ms" } as React.CSSProperties}>
          <span className="h-2 w-2 rounded-full bg-good" aria-hidden="true" />
          Open to new opportunities
        </p>
        <h1 className="fade-up mt-7 font-display text-5xl font-semibold leading-[1.08] tracking-tight text-text sm:text-6xl lg:text-7xl" style={{ "--delay": "120ms" } as React.CSSProperties}>
          Ali Hasnain
        </h1>
        <p className="fade-up mt-3 font-display text-lg font-medium text-accent sm:text-xl" style={{ "--delay": "190ms" } as React.CSSProperties}>
          {portfolio.title}
        </p>
        <p className="fade-up mt-6 max-w-xl leading-7 text-muted sm:text-lg sm:leading-8" style={{ "--delay": "260ms" } as React.CSSProperties}>
          {portfolio.tagline}
        </p>
        <div className="fade-up mt-9 flex flex-wrap justify-center gap-3" style={{ "--delay": "330ms" } as React.CSSProperties}>
          <a href="#projects" className="btn btn-primary">
            View projects <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#contact" className="btn btn-ghost">Contact me</a>
        </div>
      </div>

      <div className="wrap pb-20 sm:pb-24">
        <Reveal>
          <div className="grid gap-4 border-t border-line/15 pt-10 md:grid-cols-[12rem_1fr] md:gap-10">
            <h2 className="eyebrow pt-1">About me</h2>
            <p className="max-w-3xl leading-8 text-muted">{portfolio.summary}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
