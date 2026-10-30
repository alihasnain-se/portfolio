"use client";

import { useState } from "react";
import { portfolio, type Contact as ContactItem } from "@/data/portfolio";
import { ArrowUpRight, Check, Copy, GitHub, LinkedIn, Mail, Pin } from "./Icons";
import { Reveal } from "./Reveal";

const icons = { email: Mail, linkedin: LinkedIn, github: GitHub } as const;

function CopyEmail({ value }: { value: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        } catch {}
      }}
      aria-label={done ? "Email address copied" : "Copy email address"}
      className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line/25 text-muted transition hover:border-accent hover:text-accent"
    >
      {done ? <Check className="h-4 w-4 text-good" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

function Item({ c }: { c: ContactItem }) {
  const Icon = icons[c.id];
  return (
    <div className="card group relative flex items-center gap-4 p-4 transition duration-300 hover:border-accent/50 sm:p-5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-raised text-accent transition group-hover:bg-accent group-hover:text-white">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted">{c.label}</p>
        <a
          href={c.href}
          {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="block truncate font-medium after:absolute after:inset-0 after:content-['']"
        >
          {c.value}
          {c.external && <span className="sr-only"> (opens in a new tab)</span>}
        </a>
      </div>
      {c.id === "email" ? (
        <CopyEmail value={c.value} />
      ) : (
        <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition group-hover:text-accent" />
      )}
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="border-t border-line/10 py-16 sm:py-24">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="section-title">Let&apos;s talk</h2>
          <p className="mt-4 max-w-xl leading-7 text-muted">
            I&apos;m looking for opportunities in mobile and full-stack development, software QA/testing, and practical
            AI/ML and NLP work. The quickest way to reach me is any of these.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {portfolio.contacts.map((c) => (
              <Item key={c.id} c={c} />
            ))}
          </div>
          <p className="mt-8 flex items-center gap-2 text-sm text-muted">
            <Pin className="h-4 w-4 text-accent2" /> Based in {portfolio.location}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
