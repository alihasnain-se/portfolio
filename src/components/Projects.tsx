"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { portfolio, type Project } from "@/data/portfolio";
import { ChevronLeft, ChevronRight } from "./Icons";
import { ProjectCard } from "./ProjectCard";
import { ProjectVideoModal } from "./ProjectVideoModal";
import { Reveal } from "./Reveal";

const projects = portfolio.projects;
const N = projects.length;
const HALF = Math.floor((N - 1) / 2);

/** Signed, wrapped distance of card `i` from the active card: …-1, 0, 1, 2… */
const offsetOf = (i: number, active: number) => ((((i - active + HALF) % N) + N) % N) - HALF;

export function Projects() {
  const [active, setActive] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [video, setVideo] = useState<Project | null>(null);

  const prevOffsets = useRef<number[]>(projects.map((_, i) => offsetOf(i, 0)));
  const start = useRef<{ x: number; id: number } | null>(null);
  const moved = useRef(false);
  const wheelLock = useRef(false);

  const go = useCallback((dir: 1 | -1) => setActive((a) => (a + dir + N) % N), []);

  // Cards that wrap round the loop (jump by more than one slot) should
  // teleport instead of sweeping across the viewport.
  const offsets = projects.map((_, i) => offsetOf(i, active));
  const snapping = offsets.map((o, i) => Math.abs(o - prevOffsets.current[i]) > 1);
  useEffect(() => {
    prevOffsets.current = projects.map((_, i) => offsetOf(i, active));
  }, [active]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    start.current = { x: e.clientX, id: e.pointerId };
    moved.current = false;
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const s = start.current;
    if (!s || s.id !== e.pointerId) return;
    const dx = e.clientX - s.x;
    if (!moved.current && Math.abs(dx) > 8) {
      moved.current = true;
      setDragging(true);
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
    }
    if (moved.current) setDrag(dx);
  };
  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    const s = start.current;
    if (!s || s.id !== e.pointerId) return;
    start.current = null;
    const dx = e.clientX - s.x;
    const threshold = Math.min(70, e.currentTarget.clientWidth * 0.12);
    setDragging(false);
    setDrag(0);
    if (moved.current && Math.abs(dx) > threshold) go(dx < 0 ? 1 : -1);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
  };

  // Horizontal trackpad swipes
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaX) < 30 || Math.abs(e.deltaX) < Math.abs(e.deltaY) || wheelLock.current) return;
    wheelLock.current = true;
    go(e.deltaX > 0 ? 1 : -1);
    setTimeout(() => (wheelLock.current = false), 600);
  };

  return (
    <section id="projects" className="overflow-x-clip border-t border-line/10 py-16 sm:py-24">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Selected work</p>
          <h2 className="section-title">Projects</h2>
          <p className="mt-4 max-w-xl leading-7 text-muted">
            A marketplace app, a hospital network, a cryptography lab and an NLP pipeline. Swipe, drag or use the arrows.
          </p>
        </Reveal>
      </div>

      <Reveal delay={100} className="mt-12">
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Projects"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onWheel={onWheel}
          className="outline-offset-8"
        >
          <div
            className="pc-viewport"
            data-dragging={dragging}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={(e) => {
              if (moved.current) {
                e.preventDefault();
                e.stopPropagation();
                moved.current = false;
              }
            }}
          >
            {projects.map((p, i) => {
              const d = offsets[i];
              const ad = Math.abs(d);
              const pos = d === 0 ? "center" : ad === 1 ? "side" : ad === 2 && N === 4 ? "back" : "far";
              return (
                <div
                  key={p.id}
                  className="pc-card"
                  data-pos={pos}
                  data-snap={snapping[i]}
                  aria-hidden={d !== 0}
                  aria-roledescription="slide"
                  style={
                    {
                      "--d": d,
                      "--ad": ad,
                      "--drag": `${drag}px`,
                      zIndex: 10 - ad,
                    } as CSSProperties
                  }
                >
                  <div inert={d !== 0} className="h-full">
                    <ProjectCard project={p} index={i} total={N} onWatch={setVideo} />
                  </div>
                  {d !== 0 && ad === 1 && (
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-label={`Show ${p.title}`}
                      onClick={() => setActive(i)}
                      className="absolute inset-0 z-10 cursor-pointer"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      <div className="wrap mt-10 flex items-center justify-center gap-4">
        <button type="button" onClick={() => go(-1)} aria-label="Previous project" className="grid h-11 w-11 place-items-center rounded-lg border border-line/30 text-muted transition hover:border-accent hover:text-accent">
          <ChevronLeft />
        </button>
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose project">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`${p.title} (${i + 1} of ${N})`}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-7 bg-accent" : "w-2 bg-line/40 hover:bg-line/70"}`}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Next project" className="grid h-11 w-11 place-items-center rounded-lg border border-line/30 text-muted transition hover:border-accent hover:text-accent">
          <ChevronRight />
        </button>
      </div>
      <p className="mt-4 text-center text-sm text-muted" aria-live="polite">
        {active + 1} / {N} · {projects[active].title}
      </p>

      {video && <ProjectVideoModal video={video.video} onClose={() => setVideo(null)} />}
    </section>
  );
}
