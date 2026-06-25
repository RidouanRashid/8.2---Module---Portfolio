"use client";

import { useEffect, useRef } from "react";
import { useRaceStore } from "@/lib/store";
import { athlete } from "@/data/athlete";

// The "blocks": a startlist entry + an on-your-marks cue. Fades out as the
// runner accelerates away from 0m.
export default function Startline() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const d = useRaceStore.getState().distance;
      if (root.current) {
        // fully visible at 0m, gone by ~14m
        const o = Math.max(0, 1 - d / 14);
        root.current.style.opacity = String(o);
        root.current.style.pointerEvents = o < 0.05 ? "none" : "auto";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-30 flex flex-col items-center justify-center px-6 text-center"
    >
      <div className="font-mono text-xs uppercase tracking-[0.5em] text-[color:var(--color-lane)]">
        On your marks…
      </div>

      <div className="mt-6 w-full max-w-md rounded-lg border border-white/10 bg-black/40 p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
          <span>Start list</span>
          <span>400m H</span>
        </div>
        <div className="mt-3 flex items-baseline gap-4">
          <span className="font-display text-5xl font-bold text-[color:var(--color-lane)]">
            {athlete.lane}
          </span>
          <span className="text-left">
            <span className="block font-display text-2xl font-bold uppercase leading-none text-white">
              {athlete.name}
            </span>
            <span className="block font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
              DEV / 400mH · {athlete.club}
            </span>
          </span>
        </div>
      </div>

      <div className="mt-10 animate-bounce font-mono text-sm uppercase tracking-[0.35em] text-white/70">
        Scroll to run ↓
      </div>
    </div>
  );
}
