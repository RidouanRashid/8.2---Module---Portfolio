import type { Hurdle } from "./types";

// The 10 official 400m hurdles marks (metres). First at 45m, 35m between,
// 40m run-in to the finish: 45 + 9×35 + 40 = 400.
// Each bar is labelled with a skill "cleared" — drawn from Ridouan's real stack.
export const hurdles: Hurdle[] = [
  { distanceMeters: 45, label: "TypeScript" },
  { distanceMeters: 80, label: "Vue 3" },
  { distanceMeters: 115, label: "PHP" },
  { distanceMeters: 150, label: "PWA" },
  { distanceMeters: 185, label: "JavaScript" },
  { distanceMeters: 220, label: "WebGL / R3F" },
  { distanceMeters: 255, label: "Tailwind" },
  { distanceMeters: 290, label: "MySQL" },
  { distanceMeters: 325, label: "Git / CI" },
  { distanceMeters: 360, label: "Performance" },
];

// Men's hurdle height. // TODO: confirm — switch to 0.762 for women's.
export const HURDLE_HEIGHT = 0.914;
