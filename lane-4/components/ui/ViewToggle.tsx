"use client";

import { useEffect } from "react";
import { useRaceStore } from "@/lib/store";

// Switch between first-person and a 3rd-person chase cam (button or "V" key).
export default function ViewToggle() {
  const third = useRaceStore((s) => s.thirdPerson);
  const toggle = useRaceStore((s) => s.toggleView);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "v" || e.key === "V") toggle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-30 rounded-lg border border-white/20 bg-black/40 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white backdrop-blur transition-colors hover:bg-white/10"
    >
      {third ? "● 3rd person" : "○ 1st person"} · V
    </button>
  );
}
