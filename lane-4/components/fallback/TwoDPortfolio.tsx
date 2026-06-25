"use client";

import { projects } from "@/data/projects";
import { hurdles } from "@/data/hurdles";
import { athlete } from "@/data/athlete";

// Plain vertical-scroll fallback for no-WebGL / low-end devices. Same content
// as the run — projects as cards, hurdles as a skills row, the athlete reveal
// at the bottom — with a parallax-ish track header instead of the 3D lane.
export default function TwoDPortfolio() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      {/* Track header */}
      <header className="relative overflow-hidden rounded-2xl border border-white/10 p-8 [background:repeating-linear-gradient(115deg,#b4502e_0,#b4502e_46px,#f3f1ea_46px,#f3f1ea_48px)]">
        <div className="rounded-xl bg-black/70 p-6 backdrop-blur-sm">
          <div className="font-mono text-xs uppercase tracking-[0.4em] text-[color:var(--color-lane)]">
            Lane {athlete.lane} · 400m H
          </div>
          <h1 className="mt-2 font-display text-5xl font-bold uppercase text-white">
            {athlete.name}
          </h1>
          <p className="mt-2 text-white/70">
            Developer &amp; sprinter — {athlete.events.join(" / ")} for {athlete.club}.
          </p>
        </div>
      </header>

      {/* Skills cleared (the hurdles) */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold uppercase text-white">
          Hurdles cleared
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {hurdles.map((h) => (
            <span
              key={h.distanceMeters}
              className="rounded-full border border-[color:var(--color-lane)]/30 bg-[color:var(--color-lane)]/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-[color:var(--color-lane)]"
            >
              {h.label}
            </span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold uppercase text-white">
          The work
        </h2>
        <div className="mt-4 grid gap-4">
          {projects.map((p) => (
            <article
              key={p.id}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
            >
              <h3 className="font-display text-xl font-bold text-white">
                {p.title}
              </h3>
              <p className="mt-2 text-white/70">{p.blurb}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/15 px-2 py-0.5 text-xs text-white/70"
                  >
                    {s}
                  </span>
                ))}
              </div>
              {p.links.repo && (
                <a
                  href={p.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-[color:var(--color-lane)]"
                >
                  Source ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Athlete reveal */}
      <section className="mt-12 border-t border-white/10 pt-12">
        <div className="font-mono text-xs uppercase tracking-[0.4em] text-[color:var(--color-lane)]">
          The athlete behind the code
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {athlete.pbs.map((pb) => (
            <div key={pb.event} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <div className="font-mono text-[11px] uppercase tracking-widest text-white/50">
                {pb.event}
              </div>
              <div className="mt-1 font-display text-3xl font-bold text-[color:var(--color-lane)]">
                {pb.time}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-lg leading-relaxed text-white/80">{athlete.bio}</p>
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
      </section>
    </main>
  );
}
