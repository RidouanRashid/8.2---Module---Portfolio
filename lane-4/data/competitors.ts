export type Competitor = {
  name: string; // full name
  lane: number; // their real lane in the heat
  time: number; // seconds — sets their running pace vs you
  result: string; // what to show on the label (official result, or "DQ")
  color: string; // jersey colour
};

// Your PR pace reference — you run lane 2 at this time.
export const PLAYER_TIME = 56.12; // Hilversum 2025, NK U18, Serie 3 — 2nd, PB, Q

// The REAL Serie 3 field (NK U18, Hilversum 2025), each in their real lane,
// paced by their actual time. Source: the official atletiek.nu heat sheet.
export const competitors: Competitor[] = [
  { name: "Aimé Suvaal", lane: 5, time: 55.81, result: "55.81", color: "#ffd23a" },
  { name: "Benjamin Johannes", lane: 8, time: 56.13, result: "56.13", color: "#ff5a3c" },
  { name: "Giel Scholte", lane: 6, time: 57.45, result: "57.45", color: "#46d36b" },
  { name: "Koen Scherpenzeel", lane: 4, time: 62.62, result: "1:02.62", color: "#b98cff" },
  { name: "Jesper de Groot", lane: 7, time: 66.15, result: "1:06.15", color: "#ff8a3a" },
  // DQ in the race — paced by their season best so the lane isn't empty.
  { name: "Tijn Striekwold", lane: 3, time: 63.32, result: "DQ", color: "#ff7fb0" },
];
