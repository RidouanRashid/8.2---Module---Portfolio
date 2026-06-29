"use client";

import { useRaceStore } from "@/lib/store";

// Toggles the overhead "all projects" view — the camera flies up over the
// infield where the project documents are laid out.
export default function WorkLink() {
  const viewWork = useRaceStore((s) => s.viewWork);
  const toggleWork = useRaceStore((s) => s.toggleWork);

  return (
    <button
      onClick={toggleWork}
      className="fixed left-1/2 top-4 z-40 -translate-x-1/2 rounded-full border border-white/20 bg-black/40 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white backdrop-blur transition-colors hover:bg-white/10"
    >
      {viewWork ? "✕ Back to the race" : "▦ View all projects"}
    </button>
  );
}
