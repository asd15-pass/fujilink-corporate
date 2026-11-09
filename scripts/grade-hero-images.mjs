// Bakes the hero's `saturate(.74) brightness(1.02)` grade into the centre raster (see src/components/hero/bake.ts).
// usage: node scripts/grade-hero-images.mjs
import sharp from "sharp";

const S = 0.74, B = 1.02;
const M = [
  [0.213 + 0.787 * S, 0.715 - 0.715 * S, 0.072 - 0.072 * S],
  [0.213 - 0.213 * S, 0.715 + 0.285 * S, 0.072 - 0.072 * S],
  [0.213 - 0.213 * S, 0.715 - 0.715 * S, 0.072 + 0.928 * S],
].map(r => r.map(v => v * B));

for (const name of ["center-cut7"]) {
  const src = `public/hero/${name}.webp`;
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    for (let c = 0; c < 3; c++) data[i + c] = Math.max(0, Math.min(255, Math.round(M[c][0] * r + M[c][1] * g + M[c][2] * b)));
  }
  await sharp(data, { raw: info }).webp({ quality: 90, alphaQuality: 100 }).toFile(`public/hero/${name}-graded.webp`);
  console.log(name, info.width, info.height);
}
