import { useRaceStore } from "./store";

// Convenience hook for 2D/DOM components that want the scroll-driven values.
// (Inside the Canvas, read `useRaceStore.getState()` in useFrame instead — it
// avoids per-frame React re-renders.)
export function useScrollProgress() {
  const progress = useRaceStore((s) => s.progress);
  const distance = useRaceStore((s) => s.distance);
  const speed = useRaceStore((s) => s.speed);
  return { progress, distance, speed };
}
