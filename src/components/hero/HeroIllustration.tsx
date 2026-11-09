import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { renderHeroSvg, type BakedLayer, type HeroLayer } from "./render";
import { HeroMotion } from "./HeroMotion";
import "./hero.css";

const IMAGES = ["center-cut7-graded.webp", "letters-on7.webp", "letters-led-off.webp"];
const ART_W = 1600, ART_H = 1100;

let cache: ReturnType<typeof renderHeroSvg> | undefined;
function hero() {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const dir = path.join(process.cwd(), "public", "hero");
  const withImages = IMAGES.every(f => fs.existsSync(path.join(dir, f)));
  const manifest = path.join(dir, "baked", "manifest.json");
  const baked: Record<string, BakedLayer> = fs.existsSync(manifest) ? JSON.parse(fs.readFileSync(manifest, "utf8")) : {};
  cache = renderHeroSvg(withImages, baked);
  return cache;
}

const pct = (n: number, of: number) => `${(n / of) * 100}%`;

// The art is 111.11vw wide from md up and 200.5vw below (see the hero section in app/page.tsx).
function Baked({ layer }: { layer: Extract<HeroLayer, { kind: "img" }> }) {
  const [x, y, w, h] = layer.box;
  const f = w / ART_W;
  return (
    <div className="fl-layer">
      <div className="absolute" style={{ left: pct(x, ART_W), top: pct(y, ART_H), width: pct(w, ART_W), height: pct(h, ART_H) }}>
        <Image src={layer.src} alt="" fill sizes={`(min-width: 768px) ${(f * 111.11).toFixed(1)}vw, ${(f * 200.5).toFixed(1)}vw`} quality={90} loading="eager" fetchPriority="high" />
      </div>
    </div>
  );
}

export function HeroIllustration({ className = "" }: { className?: string }) {
  const { defs, layers } = hero();
  return (
    <HeroMotion className={`fl-hero lp1 ${className}`}>
      <div role="img" aria-label="ひとつの街、9つの世界" className="relative aspect-[1600/1100] w-full overflow-hidden">
        <svg className="fl-defs" width="0" height="0" aria-hidden="true" style={{ position: "absolute" }} dangerouslySetInnerHTML={{ __html: `<defs>${defs}</defs>` }} />
        {layers.map((l, i) =>
          l.kind === "img"
            ? <Baked key={i} layer={l} />
            : <div key={i} className={`fl-layer ${l.cls}`} data-bake={l.id} dangerouslySetInnerHTML={{ __html: l.html }} />,
        )}
        <div className="fl-layer fl-paper" />
      </div>
    </HeroMotion>
  );
}
