"use client";

import { useCallback, useMemo } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { offsetPositionAt, headingAt, laneOffset, laneStaggerAt } from "@/lib/trackCurve";
import { hurdles, HURDLE_HEIGHT } from "@/data/hurdles";

// Hurdles in every occupied lane (you in lane 2 + the six rivals), drawn with
// two instanced meshes (bars + uprights) so all ~70 hurdles cost just 2 draw
// calls. The skill label shows once per mark, in your lane.
const LANES = [2, 3, 4, 5, 6, 7, 8];
const W = 1.1; // bar width

export function Hurdles() {
  const { bars, posts } = useMemo(() => {
    const bars: THREE.Matrix4[] = [];
    const posts: THREE.Matrix4[] = [];
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    const xAxis = new THREE.Vector3();

    for (const h of hurdles) {
      for (const lane of LANES) {
        // Stagger each lane's hurdle along the track — the offset is large on
        // the early bends and shrinks toward the finish, so the lanes' hurdles
        // fan out then converge (not a straight row, not a constant offset).
        const d = h.distanceMeters + laneStaggerAt(h.distanceMeters, lane);
        const p = offsetPositionAt(d, laneOffset(lane));
        q.setFromAxisAngle(up, headingAt(d));
        xAxis.set(1, 0, 0).applyQuaternion(q); // across-track direction

        // top bar
        m.compose(
          new THREE.Vector3(p.x, HURDLE_HEIGHT, p.z),
          q,
          new THREE.Vector3(W + 0.1, 0.07, 0.05),
        );
        bars.push(m.clone());

        // two uprights
        for (const sign of [-1, 1]) {
          m.compose(
            new THREE.Vector3(
              p.x + xAxis.x * sign * (W / 2),
              HURDLE_HEIGHT / 2,
              p.z + xAxis.z * sign * (W / 2),
            ),
            q,
            new THREE.Vector3(0.05, HURDLE_HEIGHT, 0.05),
          );
          posts.push(m.clone());
        }
      }
    }
    return { bars, posts };
  }, []);

  const barRef = useCallback(
    (mesh: THREE.InstancedMesh | null) => {
      if (!mesh) return;
      bars.forEach((mm, i) => mesh.setMatrixAt(i, mm));
      mesh.instanceMatrix.needsUpdate = true;
    },
    [bars],
  );
  const postRef = useCallback(
    (mesh: THREE.InstancedMesh | null) => {
      if (!mesh) return;
      posts.forEach((mm, i) => mesh.setMatrixAt(i, mm));
      mesh.instanceMatrix.needsUpdate = true;
    },
    [posts],
  );

  return (
    <group>
      <instancedMesh ref={barRef} args={[undefined, undefined, bars.length]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#e74b2a" emissive="#3a0f06" emissiveIntensity={0.3} />
      </instancedMesh>
      <instancedMesh ref={postRef} args={[undefined, undefined, posts.length]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#f3f1ea" />
      </instancedMesh>

      {/* skill labels — once per mark, above your lane */}
      {hurdles.map((h) => {
        const p = offsetPositionAt(h.distanceMeters, laneOffset(2));
        return (
          <Html
            key={h.distanceMeters}
            position={[p.x, HURDLE_HEIGHT + 0.55, p.z]}
            center
            distanceFactor={11}
            style={{ pointerEvents: "none" }}
          >
            <div className="select-none whitespace-nowrap font-mono text-[13px] font-semibold uppercase tracking-widest text-[#36e0ff] drop-shadow-[0_0_8px_rgba(54,224,255,0.6)]">
              {h.label}
            </div>
          </Html>
        );
      })}
    </group>
  );
}
