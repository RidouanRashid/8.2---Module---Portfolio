"use client";

import Link from "next/link";

// Always-available link to the full projects grid (a calmer, thorough view of
// the work than the trackside boards).
export default function WorkLink() {
  return (
    <Link
      href="/work"
      className="fixed left-1/2 top-4 z-40 -translate-x-1/2 rounded-full border border-white/20 bg-black/40 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white backdrop-blur transition-colors hover:bg-white/10"
    >
      ▦ All projects ↗
    </Link>
  );
}
