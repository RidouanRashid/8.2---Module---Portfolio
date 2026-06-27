import type { Metadata } from "next";
import Link from "next/link";
import { work } from "@/data/work";
import { athlete } from "@/data/athlete";

export const metadata: Metadata = {
  title: "All projects — Ridouan Rashid",
  description:
    "A fuller look at Ridouan Rashid's work — modules, group projects and experiments.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#0a0e16] text-[color:var(--color-line)] [background:radial-gradient(120%_90%_at_50%_-10%,#12233f_0%,#070a12_55%)]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        {/* back to the race */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-[color:var(--color-lane)]"
        >
          ← Back to the race
        </Link>

        {/* header */}
        <header className="mt-8 border-b border-white/10 pb-8">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[color:var(--color-lane)]">
            Selected work · {athlete.name}
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-none sm:text-7xl">
            All projects
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">
            The fuller picture — every module, group project and experiment, newest
            first. Each links straight to the source on GitHub.
          </p>
        </header>

        {/* 3-column grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {work.map((p) => (
            <article
              key={p.title}
              className="group flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-[color:var(--color-lane)]/40"
            >
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-white/45">
                <span>{p.year}</span>
                <span>{p.language}</span>
              </div>

              <h2 className="mt-3 font-display text-xl font-bold leading-tight text-white">
                {p.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65">
                {p.blurb}
              </p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-white/15 px-2 py-0.5 text-[11px] text-white/70"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex gap-3 border-t border-white/10 pt-4 text-sm font-semibold">
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[color:var(--color-lane)] hover:underline"
                  >
                    Live ↗
                  </a>
                )}
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[color:var(--color-lane)]"
                >
                  Source ↗
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-12 font-mono text-xs text-white/40">
          {work.length} projects · github.com/RidouanRashid
        </p>
      </div>
    </main>
  );
}
