import type { AthleteProfile } from "./types";

// Real data from atletiek.nu / AAV'36 (athlete 7572) + github.com/RidouanRashid.
export const athlete: AthleteProfile = {
  name: "Ridouan Rashid",
  lane: 2,
  club: "AAV'36",
  category: "Men U20",
  events: ["400m", "400m hurdles"],
  pbs: [
    { event: "100 m", time: "11.79", note: "+0.7 · Den Haag '25" },
    { event: "200 m", time: "24.06", note: "indoor · Apeldoorn '25" },
    { event: "400 m", time: "52.00", note: "Alphen a/d Rijn '26" },
    { event: "400 m H", time: "56.12", note: "Hilversum '25" },
  ],
  achievements: [
    {
      year: "2026",
      title: "NK Indoor U20 — 400 m",
      detail: "8th in the national U20 indoor final (52.51), Apeldoorn.",
    },
    {
      year: "2025",
      title: "NK U18 — 400 m hurdles",
      detail: "2nd in the heat and a PB of 56.12 (lane 2), qualifying from Serie 3 — Hilversum.",
    },
  ],
  bio:
    "I sprint and run the 400m hurdles for AAV'36, and I build for the web. They run on the same loop: measure, refine, repeat, and chase the marginal gains that eventually add up to whole seconds. The code came first — the track is where I learned to keep showing up.",
  photos: [], // TODO: add /public photos — falls back to a clean scoreboard look
  socials: [
    { label: "GitHub", href: "https://github.com/RidouanRashid" },
    { label: "Email", href: "mailto:ridouanrashid@gmail.com" },
    // { label: "LinkedIn", href: "" }, // TODO: add your LinkedIn URL
  ],
};
