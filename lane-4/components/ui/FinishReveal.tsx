"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRaceStore } from "@/lib/store";
import { athlete } from "@/data/athlete";

// The scoreboard lighting up after the race — the athlete behind the code.
// Fades in over the last metres; pointer events switch on once it's readable.
export default function FinishReveal() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      // read straight from the store (no React re-render)
      const d = useRaceStore.getState().distance;
      if (root.current) {
        const o = Math.max(0, Math.min((d - 398) / 14, 1)); // 398→412m
        root.current.style.opacity = String(o);
        root.current.style.pointerEvents = o > 0.6 ? "auto" : "none";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const runAgain = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={root}
      className="fixed inset-0 z-40 overflow-y-auto opacity-0 [background:radial-gradient(120%_120%_at_50%_0%,#0d1426_0%,#05070d_60%)]"
    >
      <div className="mx-auto min-h-full max-w-4xl px-6 py-16">
        <div className="font-mono text-xs uppercase tracking-[0.5em] text-[color:var(--color-lane)]">
          Finish · Official result
        </div>

        <h1 className="mt-3 font-display text-6xl font-bold uppercase leading-[0.95] text-white sm:text-8xl">
          {athlete.name}
        </h1>
        <p className="mt-3 font-mono text-sm uppercase tracking-[0.3em] text-white/60">
          Lane {athlete.lane} · {athlete.club} · {athlete.category} ·{" "}
          {athlete.events.join(" / ")}
        </p>

        {/* Personal bests */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {athlete.pbs.map((pb) => (
            <div
              key={pb.event}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="font-mono text-[11px] uppercase tracking-widest text-white/50">
                {pb.event}
              </div>
              <div className="mt-1 font-display text-4xl font-bold text-[color:var(--color-lane)]">
                {pb.time}
              </div>
              {pb.note && (
                <div className="mt-1 font-mono text-[11px] text-white/40">
                  {pb.note}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Championships */}
        <div className="mt-10 space-y-3">
          {athlete.achievements.map((a) => (
            <div
              key={a.title}
              className="flex gap-4 border-l-2 border-[color:var(--color-lane)] pl-4"
            >
              <span className="font-mono text-sm text-white/50">{a.year}</span>
              <span>
                <span className="block font-display text-xl font-semibold text-white">
                  {a.title}
                </span>
                <span className="block text-sm text-white/60">{a.detail}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Story + contact */}
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/80">
          {athlete.bio}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {athlete.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/20 px-4 py-2 font-semibold text-white hover:bg-white/10"
            >
              {s.label} ↗
            </a>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <button
            onClick={runAgain}
            className="rounded-lg bg-[color:var(--color-lane)] px-6 py-3 font-display text-lg font-bold uppercase tracking-wider text-black hover:opacity-90"
          >
            Run it again ↑
          </button>
          <Link
            href="/work"
            className="rounded-lg border border-white/25 px-6 py-3 font-display text-lg font-bold uppercase tracking-wider text-white hover:bg-white/10"
          >
            ▦ All projects
          </Link>
        </div>
      </div>
    </div>
  );
}
