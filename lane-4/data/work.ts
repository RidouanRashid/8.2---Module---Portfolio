export type WorkItem = {
  title: string;
  year: string;
  language: string; // primary language (from GitHub)
  blurb: string;
  stack: string[];
  repo: string;
  live?: string;
};

// A fuller list of Ridouan's real work from github.com/RidouanRashid — modules,
// group projects and experiments. Newest first. (Empty/duplicate repos omitted.)
export const work: WorkItem[] = [
  {
    title: "Lane 2 — This Portfolio",
    year: "2026",
    language: "TypeScript",
    blurb:
      "The first-person 400m hurdles portfolio you're running through — projects line the track, hurdles are skills, the finish reveals the athlete. Built in React Three Fiber.",
    stack: ["Next.js", "TypeScript", "Tailwind", "React Three Fiber", "Three.js"],
    repo: "https://github.com/RidouanRashid/8.2---Module---Portfolio",
  },
  {
    title: "U-Festival 2026 — PWA",
    year: "2026",
    language: "Vue",
    blurb:
      "An installable festival web app — Home, Info, Schedule and Map — built with Vue 3. Reactive, component-driven and offline-capable.",
    stack: ["Vue 3", "Vite", "PWA", "JavaScript", "CSS"],
    repo: "https://github.com/RidouanRashid/8.1---Module---U-Festival-App---2026",
  },
  {
    title: "Remote Controller",
    year: "2026",
    language: "JavaScript",
    blurb:
      "A JavaScript remote-controller interface focused on responsive, real-time interaction.",
    stack: ["JavaScript", "HTML", "CSS"],
    repo: "https://github.com/RidouanRashid/7.2---Module---Remote-controller",
  },
  {
    title: "Kiosk System",
    year: "2026",
    language: "PHP",
    blurb:
      "A PHP kiosk system built as a team (with Han & Tianzi) — structured data behind a clean, touch-friendly interface.",
    stack: ["PHP", "HTML", "CSS"],
    repo: "https://github.com/RidouanRashid/7.1-Module-Kiosk-2026-Han-Tianzi",
  },
  {
    title: "PHP Code Base",
    year: "2026",
    language: "PHP",
    blurb: "A reusable PHP starter / code base used as a foundation for module projects.",
    stack: ["PHP"],
    repo: "https://github.com/RidouanRashid/code-base",
  },
  {
    title: "Canvas Retro Game",
    year: "2026",
    language: "JavaScript",
    blurb:
      "A retro game built as a duo (with Jelle Romijn) on the HTML5 canvas — game loop, collision and input handling written from scratch.",
    stack: ["JavaScript", "HTML5 Canvas"],
    repo: "https://github.com/RidouanRashid/module-6-2-duo-javascript-retrogame",
  },
  {
    title: "Archivers — Het Utrechts Archief",
    year: "2025",
    language: "PHP",
    blurb:
      "A PHP web application for Het Utrechts Archief: a zoom/pan panorama viewer with a minimap, interactive hotspots and a database-backed admin mode.",
    stack: ["PHP", "MySQL", "JavaScript"],
    repo: "https://github.com/RidouanRashid/Archivers",
  },
  {
    title: "WordPress Build",
    year: "2025",
    language: "PHP",
    blurb: "A WordPress project — theming and content management on top of PHP.",
    stack: ["WordPress", "PHP"],
    repo: "https://github.com/RidouanRashid/Wordpress_RidouanRashid",
  },
  {
    title: "ScreenStream",
    year: "2025",
    language: "CSS",
    blurb:
      "A streaming interface for the AnnexBios group assignment (group 4), with a strong focus on UI/UX and front-end polish.",
    stack: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/RidouanRashid/ScreenStream",
  },
];
