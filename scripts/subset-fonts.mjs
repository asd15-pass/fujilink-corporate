// Cuts Zen Maru Gothic down to the characters the site actually uses: one WOFF2 per weight instead of the ~60
// unicode-range slices Google Fonts serves, each of which made the browser lay the page out again on arrival.
// Re-run after adding copy with new characters (anything missing falls back to the system sans-serif).
// usage: node scripts/subset-fonts.mjs
import fs from "node:fs";
import path from "node:path";
import subsetFont from "subset-font";
import { WEIGHTS, zenMaru } from "./lib/zen-maru.mjs";

const OUT = "src/app/fonts";
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
  const p = path.join(dir, e.name);
  return e.isDirectory() ? walk(p) : /\.(tsx?|css|md|json)$/.test(e.name) ? [p] : [];
});

const chars = new Set();
for (let c = 0x20; c < 0x7f; c++) chars.add(String.fromCharCode(c));
// Punctuation and symbols that commonly turn up in Japanese copy and form input.
for (const c of "、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈〉《》「」『』【】＋－±×÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇◆□■△▲▽▼※〒→←↑↓〓〜") chars.add(c);
for (const f of walk("src")) for (const c of fs.readFileSync(f, "utf8")) if (c.codePointAt(0) > 0x7e) chars.add(c);
const text = [...chars].join("");

fs.mkdirSync(OUT, { recursive: true });
for (const w of Object.keys(WEIGHTS)) {
  const out = await subsetFont(await zenMaru(w), text, { targetFormat: "woff2" });
  fs.writeFileSync(path.join(OUT, `zen-maru-${w}.woff2`), out);
  console.log(`zen-maru-${w}.woff2`, `${Math.round(out.length / 1024)}KB`);
}
console.log(chars.size, "characters");
