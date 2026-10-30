"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Props = { children: ReactNode; className?: string; delay?: number };

/** Fades/slides content in the first time it scrolls into view. */
export function Reveal({ children, className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState<boolean | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Already on screen (or no observer support): just show it, no hiding.
    const r = el.getBoundingClientRect();
    if (typeof IntersectionObserver === "undefined" || r.top < window.innerHeight * 0.94) {
      setShown(true);
      return;
    }
    setShown(false);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-in={shown === null ? undefined : shown}
      className={`reveal ${className}`}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
