"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRaceStore } from "@/lib/store";
import { projects } from "@/data/projects";

// Expanded project view. Opening it pauses the run (handled in ScrollProvider
// by watching selectedProjectId); closing resumes it.
export default function ProjectModal() {
  const id = useRaceStore((s) => s.selectedProjectId);
  const close = useRaceStore((s) => s.closeProject);
  const project = projects.find((p) => p.id === id) ?? null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-white/10 bg-[#0b1020] p-6 shadow-2xl sm:p-8"
            initial={{ y: 28, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 hover:bg-white/10"
            >
              ✕
            </button>

            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-lane)]">
              {project.distanceMeters} m on the track
            </div>
            <h2 className="mt-1 font-display text-3xl font-bold text-white">
              {project.title}
            </h2>
            <p className="mt-3 text-white/70">{project.blurb}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-[color:var(--color-lane)]/30 bg-[color:var(--color-lane)]/10 px-3 py-1 text-xs font-medium text-[color:var(--color-lane)]"
                >
                  {s}
                </span>
              ))}
            </div>

            {project.codeSnippet && (
              <pre className="mt-5 overflow-x-auto rounded-lg border border-white/10 bg-black/50 p-4 font-mono text-[13px] leading-relaxed text-white/85">
                <code>{project.codeSnippet}</code>
              </pre>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-[color:var(--color-lane)] px-4 py-2 font-semibold text-black hover:opacity-90"
                >
                  Live ↗
                </a>
              )}
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/20 px-4 py-2 font-semibold text-white hover:bg-white/10"
                >
                  Source ↗
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
