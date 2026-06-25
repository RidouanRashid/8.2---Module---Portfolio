"use client";

import { useMemo } from "react";
import { Html } from "@react-three/drei";
import { offsetPositionAt, headingAt, LANE_OFFSET } from "@/lib/trackCurve";
import { HURDLE_HEIGHT } from "@/data/hurdles";

// A single 400mH hurdle placed across the lane at its official mark, with the
// "skill cleared" label floating above the bar. The jump beat itself lives in
// FirstPersonRunner (it's a camera move, not a hurdle move).
export function Hurdle({ mark, label }: { mark: number; label: string }) {
  const pos = useMemo(() => offsetPositionAt(mark, LANE_OFFSET), [mark]);
  const rot = useMemo(() => headingAt(mark), [mark]);

  const W = 1.1; // bar width — fits within the lane
  const h = HURDLE_HEIGHT;

  return (
    <group position={[pos.x, 0, pos.z]} rotation={[0, rot, 0]}>
      {/* uprights */}
      <mesh position={[-W / 2, h / 2, 0]}>
        <boxGeometry args={[0.05, h, 0.05]} />
        <meshStandardMaterial color="#f3f1ea" />
      </mesh>
      <mesh position={[W / 2, h / 2, 0]}>
        <boxGeometry args={[0.05, h, 0.05]} />
        <meshStandardMaterial color="#f3f1ea" />
      </mesh>
      {/* feet — point back toward the approaching runner (the base the hurdle
          tips away from), so it reads the right way round */}
      <mesh position={[-W / 2, 0.02, -0.3]}>
        <boxGeometry args={[0.05, 0.04, 0.6]} />
        <meshStandardMaterial color="#cfccc4" />
      </mesh>
      <mesh position={[W / 2, 0.02, -0.3]}>
        <boxGeometry args={[0.05, 0.04, 0.6]} />
        <meshStandardMaterial color="#cfccc4" />
      </mesh>
      {/* top bar — banded white/terracotta */}
      <mesh position={[0, h, 0]}>
        <boxGeometry args={[W + 0.1, 0.07, 0.05]} />
        <meshStandardMaterial color="#e74b2a" emissive="#3a0f06" />
      </mesh>

      {/* skill label */}
      <Html position={[0, h + 0.55, 0]} center distanceFactor={11} style={{ pointerEvents: "none" }}>
        <div className="select-none whitespace-nowrap font-mono text-[13px] font-semibold uppercase tracking-widest text-[#36e0ff] drop-shadow-[0_0_8px_rgba(54,224,255,0.6)]">
          {label}
        </div>
      </Html>
    </group>
  );
}
