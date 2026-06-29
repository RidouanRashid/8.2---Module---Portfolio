"use client";

import dynamic from "next/dynamic";

// The whole experience is client-only (WebGL, Lenis, window). Load it without
// SSR so there are no hydration mismatches.
const AppRoot = dynamic(() => import("@/components/AppRoot"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 grid place-items-center font-mono text-sm uppercase tracking-[0.4em] text-white/50">
      Loading lane 2…
    </div>
  ),
});

export default function Page() {
  return <AppRoot />;
}
