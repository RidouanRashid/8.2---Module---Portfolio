"use client";

import { useRef } from "react";
import { Vector2 } from "three";
import { useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { useRaceStore } from "@/lib/store";

// "Speed feel": subtle bloom + vignette, with chromatic aberration that grows
// with scroll velocity (calm when idle, electric when sprinting).
// NOTE: true per-pixel motion blur needs a velocity buffer; we approximate the
// feel here + with the 2D speed-lines overlay. // TODO: real motion blur.
export default function Effects() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ca = useRef<any>(null);

  useFrame(() => {
    const sp = useRaceStore.getState().speed;
    if (ca.current?.offset) {
      ca.current.offset.set(0.0009 * sp, 0.0009 * sp);
    }
  });

  return (
    <EffectComposer>
      <Bloom intensity={0.35} luminanceThreshold={0.75} mipmapBlur />
      <ChromaticAberration ref={ca} offset={new Vector2(0, 0)} />
      <Vignette offset={0.2} darkness={0.85} />
    </EffectComposer>
  );
}
