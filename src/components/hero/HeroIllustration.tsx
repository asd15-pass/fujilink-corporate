import fs from "node:fs";
import path from "node:path";
import { renderHeroSvg } from "./render";
import { HeroMotion } from "./HeroMotion";
import "./hero.css";

const IMAGES = ["center-cut7.webp", "letters-on7.webp", "letters-led-off.webp"];

let cache: string | undefined;
function heroMarkup() {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const dir = path.join(process.cwd(), "public", "hero");
  const withImages = IMAGES.every(f => fs.existsSync(path.join(dir, f)));
  cache = renderHeroSvg(withImages);
  return cache;
}

export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <HeroMotion className={`fl-hero ${className}`}>
      <div className="relative aspect-[1600/1100] w-full overflow-hidden" dangerouslySetInnerHTML={{ __html: heroMarkup() }} />
    </HeroMotion>
  );
}
