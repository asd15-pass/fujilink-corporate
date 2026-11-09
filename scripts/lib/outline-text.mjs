// Replaces <text> set in Zen Maru Gothic with the glyph outlines as <path>, so the hero's signs no longer depend
// on (or wait for) the web font. Handles what the design uses: single x/y, text-anchor, font-size, font-weight,
// letter-spacing, fill/stroke/opacity/transform.
import opentype from "opentype.js";
import { zenMaru } from "./zen-maru.mjs";

const fonts = {};
const font = async w => (fonts[w] ??= opentype.parse((await zenMaru(w)).buffer.slice(0)));
const attr = (a, n) => a.match(new RegExp(`(?:^|\\s)${n}="([^"]*)"`))?.[1];
const KEEP = ["fill", "stroke", "stroke-width", "stroke-linejoin", "opacity", "transform", "class", "style"];

export async function outlineZenText(markup) {
  const parts = [];
  let last = 0, n = 0;
  for (const m of markup.matchAll(/<text\s([^>]*)>([^<]*)<\/text>/g)) {
    const [whole, a, str] = m;
    if (!/Zen Maru Gothic/.test(attr(a, "font-family") || "")) continue;
    const xs = (attr(a, "x") || "0").trim().split(/[\s,]+/), ys = (attr(a, "y") || "0").trim().split(/[\s,]+/);
    if (xs.length > 1 || ys.length > 1) throw new Error("multi-position text not supported: " + whole);
    const size = +(attr(a, "font-size") || 16), ls = +(attr(a, "letter-spacing") || 0);
    const weight = +(attr(a, "font-weight") || 400);
    const f = await font(weight >= 800 ? 900 : weight >= 600 ? 700 : weight >= 500 ? 500 : 400);
    const glyphs = [...str].map(ch => f.charToGlyph(ch));
    const advance = g => (g.advanceWidth * size) / f.unitsPerEm + ls;
    const width = glyphs.reduce((s, g) => s + advance(g), 0);
    const anchor = attr(a, "text-anchor");
    let x = +xs[0] - (anchor === "middle" ? width / 2 : anchor === "end" ? width : 0);
    const y = +ys[0];
    let d = "";
    for (const g of glyphs) { d += g.getPath(x, y, size).toPathData(1); x += advance(g); }
    const keep = KEEP.map(k => [k, attr(a, k)]).filter(([, v]) => v != null).map(([k, v]) => ` ${k}="${v}"`).join("");
    parts.push(markup.slice(last, m.index), `<path d="${d}"${keep}></path>`);
    last = m.index + whole.length;
    n++;
  }
  parts.push(markup.slice(last));
  return { markup: parts.join(""), count: n };
}
