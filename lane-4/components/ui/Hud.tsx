"use client";

import { useEffect, useRef } from "react";
import { useRaceStore } from "@/lib/store";
import { athlete } from "@/data/athlete";
import { PLAYER_TIME } from "@/data/competitors";

// Clock maps your distance → time at your real PR pace, so it reads ~56.12 at 400m.
const PACE = 400 / PLAYER_TIME;

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = (sec % 60).toFixed(1).padStart(4, "0");
  return `${m}:${s}`;
}

// Kinetic heads-up display. Updated via rAF straight to the DOM (no React
// re-renders), reading the store each frame.
export default function Hud() {
  const root = useRef<HTMLDivElement>(null);
  const distEl = useRef<HTMLSpanElement>(null);
  const splitEl = useRef<HTMLSpanElement>(null);
  const pulse = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const s = useRaceStore.getState();
      const run = Math.min(s.distance, 400);

      if (distEl.current) distEl.current.textContent = run.toFixed(0);
      if (splitEl.current) splitEl.current.textContent = fmt(run / PACE);

      // Show after the gun (~6m), hide at the finish (>400m).
      if (root.current) {
        const vis = s.distance > 6 && s.distance < 401 ? 1 : 0;
        root.current.style.opacity = String(vis);
      }
      if (pulse.current) {
        pulse.current.style.transform = `scaleX(${0.2 + s.speed})`;
        pulse.current.style.opacity = String(0.35 + s.speed * 0.65);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={root}
      className="pointer-events-none fixed inset-0 z-20 font-mono text-[color:var(--color-line)] opacity-0 transition-opacity duration-300"
    >
      {/* top-left: distance */}
      <div className="absolute left-6 top-6">
        <div className="text-[11px] uppercase tracking-[0.3em] text-white/50">
          Distance
        </div>
        <div className="font-display text-5xl font-bold leading-none text-white">
          <span ref={distEl}>0</span>
          <span className="ml-1 text-2xl text-[color:var(--color-lane)]">/ 400 m</span>
        </div>
      </div>

      {/* top-right: lane + event */}
      <div className="absolute right-6 top-6 text-right">
        <div className="text-[11px] uppercase tracking-[0.3em] text-white/50">
          Lane {athlete.lane} · 400mH
        </div>
        <div className="mt-1 font-display text-2xl font-semibold uppercase text-white">
          {athlete.name}
        </div>
      </div>

      {/* bottom-left: split + heart-rate line */}
      <div className="absolute bottom-6 left-6">
        <div className="text-[11px] uppercase tracking-[0.3em] text-white/50">
          Split
        </div>
        <div className="font-display text-4xl font-bold text-[color:var(--color-lane)]">
          <span ref={splitEl}>0:00.0</span>
        </div>
        <div className="mt-2 h-6 w-40 overflow-hidden">
          <div
            ref={pulse}
            className="h-full w-full origin-left bg-[repeating-linear-gradient(90deg,transparent_0,transparent_6px,var(--color-lane)_6px,var(--color-lane)_7px)]"
          />
        </div>
      </div>
    </div>
  );
}
