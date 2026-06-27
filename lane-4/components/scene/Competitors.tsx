"use client";

import { useMemo, useRef } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  offsetPositionAt,
  headingAt,
  laneOffset,
  LANE_OFFSET,
  PLAYER_LANE,
} from "@/lib/trackCurve";
import { useRaceStore } from "@/lib/store";
import { competitors, PLAYER_TIME, type Competitor } from "@/data/competitors";

const PLAYER_PACE = 400 / PLAYER_TIME; // m/s
const STAGGER = 6; // metres of visual lane stagger (outer lanes start ahead)
const vBase = new THREE.Vector3();

// ── a simple stylised runner (faces +Z, feet on the ground) ─────────────
function RunnerFigure({
  color,
  phase = 0,
  animate = true,
}: {
  color: string;
  phase?: number;
  animate?: boolean;
}) {
  const ll = useRef<THREE.Group>(null);
  const rl = useRef<THREE.Group>(null);
  const la = useRef<THREE.Group>(null);
  const ra = useRef<THREE.Group>(null);

  useFrame((s) => {
    if (!animate) return;
    const sw = Math.sin(s.clock.elapsedTime * 11 + phase) * 0.9;
    if (ll.current) ll.current.rotation.x = sw;
    if (rl.current) rl.current.rotation.x = -sw;
    if (la.current) la.current.rotation.x = -sw * 0.8;
    if (ra.current) ra.current.rotation.x = sw * 0.8;
  });

  return (
    <group rotation={[0.18, 0, 0]}>
      {/* torso */}
      <mesh position={[0, 1.1, 0]}>
        <capsuleGeometry args={[0.16, 0.5, 4, 8]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      {/* head */}
      <mesh position={[0, 1.62, 0]}>
        <sphereGeometry args={[0.13, 12, 12]} />
        <meshStandardMaterial color="#caa07a" />
      </mesh>
      {/* legs (pivot at the hips) */}
      <group ref={ll} position={[-0.09, 0.8, 0]}>
        <mesh position={[0, -0.4, 0]}>
          <capsuleGeometry args={[0.07, 0.6, 4, 6]} />
          <meshStandardMaterial color="#1f2733" />
        </mesh>
      </group>
      <group ref={rl} position={[0.09, 0.8, 0]}>
        <mesh position={[0, -0.4, 0]}>
          <capsuleGeometry args={[0.07, 0.6, 4, 6]} />
          <meshStandardMaterial color="#1f2733" />
        </mesh>
      </group>
      {/* arms (pivot at the shoulders) */}
      <group ref={la} position={[-0.2, 1.35, 0]}>
        <mesh position={[0, -0.25, 0]}>
          <capsuleGeometry args={[0.05, 0.4, 4, 6]} />
          <meshStandardMaterial color={color} roughness={0.7} />
        </mesh>
      </group>
      <group ref={ra} position={[0.2, 1.35, 0]}>
        <mesh position={[0, -0.25, 0]}>
          <capsuleGeometry args={[0.05, 0.4, 4, 6]} />
          <meshStandardMaterial color={color} roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

// ── one competitor, paced relative to you by their finish time ──────────
function CompetitorRunner({ data, reduced }: { data: Competitor; reduced: boolean }) {
  const grp = useRef<THREE.Group>(null);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  const lat = useMemo(() => laneOffset(data.lane), [data.lane]);
  const pace = 400 / data.time;

  useFrame(() => {
    const d = Math.min(useRaceStore.getState().distance, 400);
    const elapsed = d / PLAYER_PACE; // your elapsed race time
    const cd = pace * elapsed; // their TRUE race distance (set purely by their time)
    // Lane stagger that UNWINDS toward the finish: the field is fanned out at the
    // start (so it's visible ahead of you) but converges so the finishing gaps
    // reflect the real times — outer lanes no longer sit permanently ahead.
    const f = d / 400; // your race fraction (0 → 1)
    const stagger = (data.lane - PLAYER_LANE) * STAGGER * (1 - f);
    const shown = Math.max(0, Math.min(cd + stagger, 400));
    offsetPositionAt(shown, lat, vBase);
    if (grp.current) {
      grp.current.position.set(vBase.x, 0, vBase.z);
      grp.current.rotation.y = headingAt(shown);
    }
  });

  return (
    <group ref={grp}>
      <RunnerFigure color={data.color} phase={phase} animate={!reduced} />
      <Html position={[0, 2.15, 0]} center distanceFactor={16} style={{ pointerEvents: "none" }}>
        <div className="select-none whitespace-nowrap rounded bg-black/60 px-2 py-0.5 text-center font-mono text-[11px] font-semibold text-white">
          {data.name}
          <span className="ml-1.5 text-[color:var(--color-lane)]">{data.result}</span>
        </div>
      </Html>
    </group>
  );
}

// Your own avatar — only shown in 3rd-person so it never blocks the 1st-person view.
function PlayerAvatar({ reduced }: { reduced: boolean }) {
  const grp = useRef<THREE.Group>(null);

  useFrame(() => {
    const st = useRaceStore.getState();
    const run = Math.min(st.distance, 400);
    offsetPositionAt(run, LANE_OFFSET, vBase);
    if (grp.current) {
      grp.current.position.set(vBase.x, 0, vBase.z);
      grp.current.rotation.y = headingAt(run);
      grp.current.visible = st.thirdPerson;
    }
  });

  return (
    <group ref={grp} visible={false}>
      <RunnerFigure color="#36e0ff" animate={!reduced} />
    </group>
  );
}

export function Competitors() {
  const reduced = useRaceStore((s) => s.reduced);
  return (
    <group>
      {competitors.map((c) => (
        <CompetitorRunner key={c.name} data={c} reduced={reduced} />
      ))}
      <PlayerAvatar reduced={reduced} />
    </group>
  );
}
