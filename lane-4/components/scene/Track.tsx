"use client";

import { useMemo } from "react";
import * as THREE from "three";
import {
  pose2D,
  TOTAL,
  TRACK_HALF_WIDTH,
  LANE_WIDTH,
  N_LANES,
} from "@/lib/trackCurve";

// Build a ribbon that follows the oval from dStart→dEnd. `latCenter` shifts the
// ribbon sideways (left-hand normal); `halfWidth` is its half-thickness across.
function buildRibbon(
  dStart: number,
  dEnd: number,
  latCenter: number,
  halfWidth: number,
  y: number,
  samples: number,
): THREE.BufferGeometry {
  const pos: number[] = [];
  const idx: number[] = [];
  for (let i = 0; i <= samples; i++) {
    const d = dStart + ((dEnd - dStart) * i) / samples;
    const p = pose2D(d);
    const lx = -p.tz; // left-hand perpendicular (unit)
    const lz = p.tx;
    const cx = p.x + lx * latCenter;
    const cz = p.z + lz * latCenter;
    pos.push(cx + lx * halfWidth, y, cz + lz * halfWidth);
    pos.push(cx - lx * halfWidth, y, cz - lz * halfWidth);
  }
  for (let i = 0; i < samples; i++) {
    const k = i * 2;
    idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

export function Track() {
  const surface = useMemo(
    () => buildRibbon(0, TOTAL, 0, TRACK_HALF_WIDTH, 0, 220),
    [],
  );

  // One white line per lane boundary (converges to the vanishing point).
  const laneLines = useMemo(() => {
    const lines: THREE.BufferGeometry[] = [];
    for (let i = 0; i <= N_LANES; i++) {
      const lat = -TRACK_HALF_WIDTH + i * LANE_WIDTH;
      lines.push(buildRibbon(0, TOTAL, lat, 0.03, 0.012, 220));
    }
    return lines;
  }, []);

  // Finish line band (a short across-track ribbon at 0m / 400m).
  const finish = useMemo(
    () => buildRibbon(0, 0.5, 0, TRACK_HALF_WIDTH, 0.014, 2),
    [],
  );

  return (
    <group>
      {/* Grass infield / stadium floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[600, 600]} />
        <meshStandardMaterial color="#34532f" roughness={1} />
      </mesh>

      {/* Running surface — double-sided + emissive so it reads from eye level
          even at dusk (the generated ribbon's faces would otherwise cull). */}
      <mesh geometry={surface} receiveShadow>
        <meshStandardMaterial
          color="#b4502e"
          roughness={0.85}
          metalness={0}
          emissive="#3a1408"
          emissiveIntensity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Lane lines */}
      {laneLines.map((g, i) => (
        <mesh key={i} geometry={g}>
          <meshStandardMaterial
            color="#f3f1ea"
            emissive="#e8e6df"
            emissiveIntensity={0.15}
            roughness={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Finish line */}
      <mesh geometry={finish}>
        <meshStandardMaterial
          color="#ffffff"
          emissive="#cccccc"
          emissiveIntensity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
