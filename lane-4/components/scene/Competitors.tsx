"use client";

import { useMemo, useRef } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  offsetPositionAt,
  headingAt,
  laneOffset,
  laneStaggerAt,
  LANE_OFFSET,
} from "@/lib/trackCurve";
import { useRaceStore } from "@/lib/store";
import { hurdles } from "@/data/hurdles";
import { competitors, PLAYER_TIME, type Competitor } from "@/data/competitors";

const PLAYER_PACE = 400 / PLAYER_TIME; // m/s
const MARKS = hurdles.map((h) => h.distanceMeters);
const vBase = new THREE.Vector3();

// ── a simple stylised runner that runs AND hurdles ──────────────────────
// `distRef.current` is the runner's race distance; the figure leaps into a
// hurdle stride as that distance crosses each hurdle mark (45, 80, …).
function RunnerFigure({
  color,
  distRef,
  phase = 0,
  animate = true,
}: {
  color: string;
  distRef: { current: number };
  phase?: number;
  animate?: boolean;
}) {
  const root = useRef<THREE.Group>(null);
  const ll = useRef<THREE.Group>(null);
  const rl = useRef<THREE.Group>(null);
  const la = useRef<THREE.Group>(null);
  const ra = useRef<THREE.Group>(null);

  useFrame((s) => {
    const t = s.clock.elapsedTime;

    // hurdle clearance: ramp 0→1→0 as the runner crosses a mark
    let air = 0;
    let pose = 0;
    if (animate) {
      const rd = distRef.current;
      for (const mk of MARKS) {
        if (rd > mk - 2.2 && rd < mk + 1.6) {
          const e = Math.sin(((rd - (mk - 2.2)) / 3.8) * Math.PI);
          air = e * 0.45; // hop height
          pose = e;
          break;
        }
      }
    }

    const sw = animate ? Math.sin(t * 11 + phase) * 0.9 : 0; // run cycle
    if (root.current) {
      root.current.position.y = air;
      root.current.rotation.x = 0.18 + pose * 0.5; // lean into the hurdle
    }
    // blend run cycle → hurdle stride (lead leg up, trail leg back, arms reach)
    if (ll.current) ll.current.rotation.x = THREE.MathUtils.lerp(sw, -1.4, pose);
    if (rl.current) rl.current.rotation.x = THREE.MathUtils.lerp(-sw, 1.0, pose);
    if (la.current) la.current.rotation.x = THREE.MathUtils.lerp(-sw * 0.8, 0.7, pose);
    if (ra.current) ra.current.rotation.x = THREE.MathUtils.lerp(sw * 0.8, -0.7, pose);
  });

  return (
    <group ref={root} rotation={[0.18, 0, 0]}>
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
  const distRef = useRef(0);
  const phase = data.lane * 1.7; // deterministic per-lane stride desync
  const lat = useMemo(() => laneOffset(data.lane), [data.lane]);
  const pace = 400 / data.time;

  useFrame(() => {
    const d = Math.min(useRaceStore.getState().distance, 400);
    const elapsed = d / PLAYER_PACE;
    const cd = Math.min(pace * elapsed, 400); // their true race distance
    distRef.current = cd; // hop timing on TRUE distance (hop at cd = mark)
    // Drawn position carries this lane's bend-aware stagger, matching its hurdles.
    const draw = Math.max(0, Math.min(cd + laneStaggerAt(cd, data.lane), 400));
    offsetPositionAt(draw, lat, vBase);
    if (grp.current) {
      grp.current.position.set(vBase.x, 0, vBase.z);
      grp.current.rotation.y = headingAt(draw);
    }
  });

  return (
    <group ref={grp}>
      <RunnerFigure color={data.color} distRef={distRef} phase={phase} animate={!reduced} />
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
  const distRef = useRef(0);

  useFrame(() => {
    const st = useRaceStore.getState();
    const run = Math.min(st.distance, 400);
    distRef.current = run;
    offsetPositionAt(run, LANE_OFFSET, vBase);
    if (grp.current) {
      grp.current.position.set(vBase.x, 0, vBase.z);
      grp.current.rotation.y = headingAt(run);
      grp.current.visible = st.thirdPerson;
    }
  });

  return (
    <group ref={grp} visible={false}>
      <RunnerFigure color="#36e0ff" distRef={distRef} animate={!reduced} />
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
