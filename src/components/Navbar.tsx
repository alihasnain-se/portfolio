"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      barRef.current?.style.setProperty("transform", `scaleX(${p})`);
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line/15 bg-bg/85 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="wrap flex h-[var(--header-h)] items-center justify-between">
        <a href="#home" aria-label="Ali Hasnain, back to top" className="block transition-transform duration-300 hover:scale-105">
          <Image src="/logo.svg" alt="AH logo" width={362} height={256} priority unoptimized className="h-12 w-auto sm:h-14" />
        </a>
        <ThemeToggle />
      </div>
      <div ref={barRef} aria-hidden="true" className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left scale-x-0 bg-gradient-to-r from-accent to-accent2" />
    </header>
  );
}
