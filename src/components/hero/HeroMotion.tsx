"use client";

import { useEffect, useRef, useState } from "react";

const SEQ = /^(tc\d|dark|veil|fullon|fullglow)$/;

// Restart the 12s logo-glow keyframes together so the letters stay in step after the tab comes back.
function syncSeq(el: HTMLElement) {
  for (const a of el.getAnimations({ subtree: true })) {
    if (a instanceof CSSAnimation && SEQ.test(a.animationName)) a.currentTime = 0;
  }
}

export function HeroMotion({ className, children }: { className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    const onVis = () => {
      setHidden(document.hidden);
      if (!document.hidden) requestAnimationFrame(() => syncSeq(el));
    };
    document.addEventListener("visibilitychange", onVis);
    requestAnimationFrame(() => syncSeq(el));
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div ref={ref} className={`${className} ${visible && !hidden ? "" : "paused"}`}>
      {children}
    </div>
  );
}
