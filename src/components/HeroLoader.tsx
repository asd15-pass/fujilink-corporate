"use client";

import { useEffect, useState } from "react";
import { MARK_CENTER, Mark, Wordmark } from "@/components/LogoMark";
import { HERO_READY } from "@/components/hero/HeroMotion";

// Covers the top page until the hero has its images and fonts and has painted (HeroMotion announces it), then
// fades away. It is in the server HTML, so it is there from the first paint.
export function HeroLoader() {
  const [phase, setPhase] = useState<"on" | "fading" | "gone">("on");

  // Unmount after the fade; the timer covers browsers that skip animationend (hidden tabs, reduced motion).
  useEffect(() => {
    if (phase !== "fading") return;
    const t = window.setTimeout(() => setPhase("gone"), 700);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    const hide = () => setPhase(p => (p === "on" ? "fading" : p));
    if ((window as unknown as Record<string, boolean>)[HERO_READY]) hide();
    window.addEventListener(HERO_READY, hide);
    const fallback = window.setTimeout(hide, 8000);
    return () => {
      window.removeEventListener(HERO_READY, hide);
      window.clearTimeout(fallback);
    };
  }, []);

  if (phase === "gone") return null;
  return (
    <div
      role="status"
      aria-label="読み込み中"
      className={`fl-loader fixed inset-0 z-[100] grid place-items-center bg-white ${phase === "fading" ? "fl-loader-out" : ""}`}
    >
      <svg viewBox="0 0 844 232" className="w-[min(62vw,320px)]" aria-hidden="true">
        <g className="fl-loader-spin" style={{ transformOrigin: MARK_CENTER }}>
          <Mark />
        </g>
        <Wordmark />
      </svg>
    </div>
  );
}
