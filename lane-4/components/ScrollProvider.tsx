"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useRaceStore } from "@/lib/store";

// Owns the Lenis smooth-scroll instance and feeds progress + velocity into the
// store every frame. Also pauses scrolling while a project modal is open.
export default function ScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    useRaceStore.getState().setReduced(reduced);

    const lenis = new Lenis({
      lerp: reduced ? 1 : 0.1, // no smoothing when reduced motion is requested
      smoothWheel: !reduced,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    });

    // The scroll callback receives the Lenis instance.
    lenis.on("scroll", (l: Lenis) => {
      useRaceStore.getState().setScroll(l.progress ?? 0, l.velocity ?? 0);
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Pause/resume the run when a project modal or the work view is open.
    const unsub = useRaceStore.subscribe((s, prev) => {
      const blocked = !!(s.selectedProjectId || s.viewWork);
      const wasBlocked = !!(prev.selectedProjectId || prev.viewWork);
      if (blocked !== wasBlocked) {
        if (blocked) lenis.stop();
        else lenis.start();
      }
    });

    return () => {
      cancelAnimationFrame(raf);
      unsub();
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
