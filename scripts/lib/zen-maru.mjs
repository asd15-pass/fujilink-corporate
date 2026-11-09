// Zen Maru Gothic source fonts (SIL OFL, from github.com/google/fonts), downloaded once into node_modules/.cache.
// They are only build inputs: the site ships the subsets made by scripts/subset-fonts.mjs.
import fs from "node:fs";
import path from "node:path";

const BASE = "https://github.com/google/fonts/raw/main/ofl/zenmarugothic/";
const CACHE = "node_modules/.cache/zen-maru-gothic";
export const WEIGHTS = { 400: "Regular", 500: "Medium", 700: "Bold", 900: "Black" };

export async function zenMaru(weight) {
  const file = path.join(CACHE, `ZenMaruGothic-${WEIGHTS[weight]}.ttf`);
  if (!fs.existsSync(file)) {
    fs.mkdirSync(CACHE, { recursive: true });
    const res = await fetch(BASE + path.basename(file));
    if (!res.ok) throw new Error(`download failed: ${res.status} ${BASE + path.basename(file)}`);
    fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  }
  return fs.readFileSync(file);
}
