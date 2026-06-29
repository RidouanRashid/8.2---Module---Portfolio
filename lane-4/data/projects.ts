import type { Project } from "./types";

// Real projects from github.com/RidouanRashid, placed in the gaps *between*
// hurdles so the run alternates: clear a hurdle → read a project → clear a hurdle.
export const projects: Project[] = [
  {
    id: "u-festival",
    distanceMeters: 62,
    title: "❤️U Festival 2026 — PWA",
    blurb:
      "Installable festival web app with Home, Info, Schedule and Map. Component-driven and reactive, built with Vue 3.",
    stack: ["Vue 3", "Vite", "PWA", "JavaScript", "CSS"],
    codeSnippet: `// register the service worker so the app installs & works offline
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}`,
    links: { repo: "https://github.com/RidouanRashid/8.1---Module---U-Festival-App---2026" },
  },
  {
    id: "archivers",
    distanceMeters: 97,
    title: "Archivers — Het Utrechts Archief",
    blurb:
      "A PHP web application for Het Utrechts Archief: a zoom/pan panorama viewer with a minimap, interactive hotspots and a database-backed admin mode.",
    stack: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    codeSnippet: `// laad de panorama-volgorde uit de database
$res = $mysqli->query(
  "SELECT img FROM panorama_order ORDER BY position ASC"
);`,
    links: { repo: "https://github.com/RidouanRashid/Archivers" },
  },
  {
    id: "retro-game",
    distanceMeters: 132,
    title: "Canvas Retro Game",
    blurb:
      "A retro game built as a duo on the HTML5 canvas — game loop, collision and input handling written from scratch.",
    stack: ["JavaScript", "HTML5 Canvas"],
    links: { repo: "https://github.com/RidouanRashid/module-6-2-duo-javascript-retrogame" },
  },
  {
    id: "kiosk",
    distanceMeters: 167,
    title: "Kiosk System",
    blurb:
      "A team-built PHP kiosk: structured data handling behind a clean, touch-friendly interface.",
    stack: ["PHP", "HTML", "CSS"],
    links: { repo: "https://github.com/RidouanRashid/7.1-Module-Kiosk-2026-Han-Tianzi" },
  },
  {
    id: "remote-controller",
    distanceMeters: 237,
    title: "Remote Controller",
    blurb:
      "A JavaScript remote-controller interface focused on responsive, real-time interaction.",
    stack: ["JavaScript", "HTML", "CSS"],
    links: { repo: "https://github.com/RidouanRashid/7.2---Module---Remote-controller" },
  },
  {
    id: "screenstream",
    distanceMeters: 307,
    title: "ScreenStream",
    blurb:
      "A streaming interface for a group assignment, with a strong focus on UI/UX and front-end polish.",
    stack: ["HTML", "CSS", "JavaScript"],
    links: { repo: "https://github.com/RidouanRashid/ScreenStream" },
  },
  {
    id: "lane-2",
    distanceMeters: 342,
    title: "Lane 2 — This Portfolio",
    blurb:
      "The race you're running right now: a first-person 400m hurdles portfolio in React Three Fiber, driven entirely by scroll.",
    stack: ["Next.js", "TypeScript", "Tailwind", "React Three Fiber", "Three.js"],
    codeSnippet: `// scroll progress → a point + heading on the 400m oval
const { pos, tangent } = poseAtDistance(progress * 400);
camera.position.copy(pos).setY(eyeHeight);
camera.lookAt(pos.clone().add(tangent));`,
    links: { repo: "" }, // TODO: confirm repo URL
  },
];
