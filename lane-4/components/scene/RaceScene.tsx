"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import * as THREE from "three";
import { Track } from "./Track";
import { Stadium } from "./Stadium";
import { Hurdle } from "./Hurdle";
import { ProjectBoard } from "./ProjectBoard";
import FirstPersonRunner from "./FirstPersonRunner";
import Effects from "./Effects";
import { hurdles } from "@/data/hurdles";
import { projects } from "@/data/projects";
import { useRaceStore } from "@/lib/store";

// The fixed, full-screen 3D run. The page scrolls a tall spacer behind it; the
// camera reads scroll distance from the store (see FirstPersonRunner).
export default function RaceScene() {
  const reduced = useRaceStore((s) => s.reduced);

  return (
    <Canvas
      className="!fixed inset-0"
      dpr={[1, 1.75]}
      camera={{ fov: 78, near: 0.1, far: 800, position: [0, 1.55, 0] }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ scene }) => {
        scene.background = new THREE.Color("#aacbee");
        scene.fog = new THREE.Fog("#cfe0f2", 130, 520);
      }}
    >
      <Sky
        sunPosition={[120, 80, 100]}
        turbidity={5}
        rayleigh={1.2}
        mieCoefficient={0.005}
        mieDirectionalG={0.85}
      />

      <ambientLight intensity={0.7} />
      <hemisphereLight args={["#bfe0ff", "#caa37a", 1.2]} />
      <directionalLight position={[120, 80, 100]} intensity={2.7} color="#fff6e8" />

      <Suspense fallback={null}>
        <Stadium />
        <Track />
        {hurdles.map((h) => (
          <Hurdle key={h.distanceMeters} mark={h.distanceMeters} label={h.label} />
        ))}
        {projects.map((p) => (
          <ProjectBoard key={p.id} project={p} />
        ))}
      </Suspense>

      <FirstPersonRunner />
      {!reduced && <Effects />}
    </Canvas>
  );
}
