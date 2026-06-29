"use client";

import { useEffect, useRef, useState } from "react";
import ScrollProvider from "./ScrollProvider";
import RaceScene from "./scene/RaceScene";
import Hud from "./ui/Hud";
import Startline from "./ui/Startline";
import ProjectModal from "./ui/ProjectModal";
import FinishReveal from "./ui/FinishReveal";
import ViewToggle from "./ui/ViewToggle";
import WorkLink from "./ui/WorkLink";
import TwoDPortfolio from "./fallback/TwoDPortfolio";
import { useRaceStore } from "@/lib/store";
import { projects } from "@/data/projects";
import { athlete } from "@/data/athlete";

// Scroll length → race pacing (taller = slower, more reading room).
const SCROLL_VH = 900;

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// All content as real text for screen readers / crawlers — the 3D run is the
// wrapper, never the only way to read the portfolio.
function AccessibleContent() {
  return (
    <div className="sr-only">
      <h1>{athlete.name} — Developer &amp; 400m hurdler</h1>
      <p>{athlete.bio}</p>
      <h2>Projects</h2>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong>: {p.blurb} ({p.stack.join(", ")}).
            {p.links.repo ? (
              <a href={p.links.repo}>Source</a>
            ) : null}
          </li>
        ))}
      </ul>
      <h2>Personal bests</h2>
      <ul>
        {athlete.pbs.map((pb) => (
          <li key={pb.event}>
            {pb.event}: {pb.time} {pb.note}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AppRoot() {
  // One-time client-only WebGL probe. This component never renders on the server
  // (loaded via dynamic ssr:false), so we can decide during the first render.
  const [mode] = useState<"3d" | "2d">(() => (hasWebGL() ? "3d" : "2d"));
  const sceneWrap = useRef<HTMLDivElement>(null);

  // Fade the canvas out as the finish reveal takes over.
  useEffect(() => {
    if (mode !== "3d") return;
    let raf = 0;
    const loop = () => {
      const st = useRaceStore.getState();
      if (sceneWrap.current) {
        // keep the canvas fully visible while the overhead "all projects" view is open
        const o = st.viewWork ? 1 : 1 - Math.max(0, Math.min((st.distance - 401) / 12, 1));
        sceneWrap.current.style.opacity = String(o);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [mode]);

  if (mode === "2d") return <TwoDPortfolio />;

  return (
    <ScrollProvider>
      {/* Tall spacer that the run is scrubbed against. */}
      <div style={{ height: `${SCROLL_VH}vh` }} aria-hidden />

      <div ref={sceneWrap} className="fixed inset-0">
        <RaceScene />
      </div>

      <Hud />
      <Startline />
      <ViewToggle />
      <WorkLink />
      <FinishReveal />
      <ProjectModal />
      <AccessibleContent />
    </ScrollProvider>
  );
}
