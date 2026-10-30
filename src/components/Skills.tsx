"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { portfolio } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { TechIcon } from "./TechIcon";

const CIRC = 2 * Math.PI * 46;

export function Skills() {
  const [activeName, setActiveName] = useState<string | null>(null);

  // Tap anywhere outside a tile to close the open one (touch devices).
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (!(e.target as HTMLElement).closest("[data-skill]")) setActiveName(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  return (
    <section id="skills" className="border-t border-line/10 bg-surface/40 py-16 sm:py-24">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Capabilities</p>
          <h2 className="section-title">Skills &amp; tools</h2>
          <p className="mt-4 max-w-xl leading-7 text-muted">
            What I use across mobile, web, cloud, AI/ML and networking.{" "}
            <span className="text-text/80 [@media(hover:hover)]:hidden">Tap a skill to see my proficiency.</span>
            <span className="hidden text-text/80 [@media(hover:hover)]:inline">Hover a skill to see my proficiency.</span>
          </p>
        </Reveal>

        <ul className="mx-auto mt-12 grid max-w-3xl grid-cols-3 justify-items-center gap-x-2 gap-y-8 sm:grid-cols-5" aria-label="Skills and proficiency">
          {portfolio.skills.map((skill, i) => {
            const active = activeName === skill.name;
            return (
              <li key={skill.name} className="skill-enter flex flex-col items-center" style={{ "--delay": `${i * 50}ms` } as CSSProperties}>
                <button
                  type="button"
                  data-skill
                  data-active={active}
                  aria-pressed={active}
                  aria-label={`${skill.label}, proficiency ${skill.level} percent`}
                  onClick={() => setActiveName(active ? null : skill.name)}
                  style={{ "--off": CIRC * (1 - skill.level / 100) } as CSSProperties}
                  className="skill grid h-[84px] w-[84px] place-items-center rounded-full [touch-action:manipulation] sm:h-[96px] sm:w-[96px]"
                >
                  <span className="skill-icon pointer-events-none grid place-items-center">
                    <TechIcon name={skill.name} className="h-9 w-9 sm:h-10 sm:w-10" />
                  </span>
                  <span className="skill-meter pointer-events-none absolute inset-0 grid place-items-center" aria-hidden="true">
                    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90 p-[3px]">
                      <circle cx="50" cy="50" r="46" fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="4" />
                      <circle cx="50" cy="50" r="46" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" className="skill-ring" />
                    </svg>
                    <span className="font-display text-xl font-semibold leading-none">
                      {skill.level}<span className="text-xs font-medium">%</span>
                    </span>
                  </span>
                </button>
                <span className="mt-2.5 text-center text-xs leading-tight text-muted">{skill.label}</span>
              </li>
            );
          })}
        </ul>

        <Reveal delay={100}>
          <div className="mx-auto mt-14 max-w-3xl border-t border-line/15 pt-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Also working with</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {portfolio.alsoWorkingWith.map((t) => (
                <li key={t} className="chip">{t}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
