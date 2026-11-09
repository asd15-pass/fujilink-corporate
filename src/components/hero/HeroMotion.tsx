"use client";

import { useEffect, useRef, useState } from "react";

const SEQ = /^(xl\d|xglow)$/;
// Window event (and flag, for listeners that attach late) sent once the hero is fully painted; HeroLoader waits on it.
export const HERO_READY = "fl:hero-ready";

// Restart the 16s logo-lighting keyframes together so the letters stay in step after the tab comes back.
function syncSeq(el: HTMLElement) {
  for (const a of el.getAnimations({ subtree: true })) {
    if (a instanceof CSSAnimation && SEQ.test(a.animationName)) a.currentTime = 0;
  }
}

const frame = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

// Everything holds still until the images are decoded and the fonts are in, so the first paint is not competing
// with ~150 animations; then the hero is revealed and starts moving from the first frame of every loop.
async function settled(el: HTMLElement) {
  const imgs = [...el.querySelectorAll("img")];
  await Promise.race([
    Promise.all([document.fonts.ready, ...imgs.map(i => (i.complete ? i.decode() : new Promise(r => i.addEventListener("load", r, { once: true })).then(() => i.decode())).catch(() => {}))]),
    new Promise(r => setTimeout(r, 6000)),
  ]);
  await frame();
}

export function HeroMotion({ className, children }: { className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let live = true;
    settled(el).then(() => {
      if (!live) return;
      setReady(true);
      syncSeq(el);
      performance.mark(HERO_READY);
      (window as unknown as Record<string, boolean>)[HERO_READY] = true;
      window.dispatchEvent(new Event(HERO_READY));
    });
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    const onVis = () => {
      setHidden(document.hidden);
      if (!document.hidden) requestAnimationFrame(() => syncSeq(el));
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      live = false;
      (window as unknown as Record<string, boolean>)[HERO_READY] = false;
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div ref={ref} className={`${className} ${ready && visible && !hidden ? "" : "paused"}`}>
      {children}
    </div>
  );
}
