import { create } from "zustand";

// Total scrollable "distance": the 400m race + ~40m of finish run-out & the
// results reveal. Everything in the scene is driven off `distance`.
export const RACE_LENGTH = 440;

type RaceState = {
  progress: number; // 0..1 scroll progress (source of truth)
  velocity: number; // raw Lenis velocity
  speed: number; // normalised 0..1 — drives gait, blur, speed lines
  distance: number; // progress * RACE_LENGTH (metres)
  reduced: boolean; // prefers-reduced-motion
  selectedProjectId: string | null;
  thirdPerson: boolean; // camera view mode

  setScroll: (progress: number, velocity: number) => void;
  setReduced: (v: boolean) => void;
  openProject: (id: string) => void;
  closeProject: () => void;
  toggleView: () => void;
};

export const useRaceStore = create<RaceState>((set) => ({
  progress: 0,
  velocity: 0,
  speed: 0,
  distance: 0,
  reduced: false,
  selectedProjectId: null,
  thirdPerson: false,

  setScroll: (progress, velocity) =>
    set({
      progress,
      velocity,
      speed: Math.min(Math.abs(velocity) / 28, 1), // tune divisor to taste
      distance: progress * RACE_LENGTH,
    }),

  setReduced: (reduced) => set({ reduced }),
  openProject: (id) => set({ selectedProjectId: id }),
  closeProject: () => set({ selectedProjectId: null }),
  toggleView: () => set((s) => ({ thirdPerson: !s.thirdPerson })),
}));
