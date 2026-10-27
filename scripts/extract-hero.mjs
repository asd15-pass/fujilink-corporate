import fs from "node:fs";
import path from "node:path";

const [src, outDir] = process.argv.slice(2);
const html = fs.readFileSync(src, "utf8");
const lines = html.split(/\r?\n/);
const between = (s, a, b, from = 0) => {
  const i = s.indexOf(a, from);
  if (i < 0) throw new Error("missing " + a);
  const j = s.indexOf(b, i + a.length);
  if (j < 0) throw new Error("missing " + b);
  return s.slice(i + a.length, j);
};
const assets = s => s.replaceAll("assets/", "/hero/");

// CSS: prefix every top-level selector with .fl-hero, drop page-level rules
const css = between(html, "<style>", "</style>");
let out = "", i = 0;
const scope = sel => sel.split(",").map(x => x.trim()).map(x => (x === "body" || x === "a" || x === "a:hover") ? null : `.fl-hero ${x}`).filter(Boolean).join(",");
const block = (s, start) => { let d = 0; for (let k = start; k < s.length; k++) { if (s[k] === "{") d++; else if (s[k] === "}") { d--; if (!d) return k; } } return s.length; };
while (i < css.length) {
  const ob = css.indexOf("{", i);
  if (ob < 0) break;
  const head = css.slice(i, ob).trim();
  const end = block(css, ob);
  const body = css.slice(ob + 1, end);
  if (head.startsWith("@keyframes")) out += `${head}{${body}}\n`;
  else if (head.startsWith("@media")) {
    const inner = body.replace(/([^{}]+)\{/g, (_, s) => `${scope(s)}{`);
    out += `${head}{${inner}}\n`;
  } else {
    const sc = scope(head);
    if (sc) out += `${sc}{${body}}\n`;
  }
  i = end + 1;
}
fs.writeFileSync(path.join(outDir, "hero.css"), out);

// DEFS
let defs = between(html, "<defs>", "</defs>");
defs = defs.replace(/<sc-if value="\{\{ svcText \}\}"[^>]*>/g, "").replace(/<\/sc-if>/g, "");
defs = defs.replace(/<sc-for list="\{\{ clips \}\}"[\s\S]*?<\/sc-for>/, "");
defs = defs.replace("{{ ccx }}", "745").replace("{{ ccy }}", "610").replace("{{ crx }}", "236").replace("{{ cry }}", "120");
if (defs.includes("{{")) throw new Error("unresolved in defs: " + defs.slice(defs.indexOf("{{"), defs.indexOf("{{") + 40));

const l380 = lines.find(l => l.startsWith('<sc-if value="{{ cImg }}"'));
const center = assets(l380.slice(l380.indexOf(">") + 1)).replaceAll("{{ calmCls }}", "calm");

const l385 = lines.find(l => l.startsWith('<sc-if value="{{ traceOn }}"'));
const dark = assets(l385.slice('<sc-if value="{{ traceOn }}" hint-placeholder-val="{{ false }}"><g style="pointer-events:none">'.length));
const l386 = lines.find(l => l.startsWith('<sc-if value="{{ rbOn }}" hint-placeholder-val="{{ false }}"><g fill'));
const trace = between(l386, '<sc-if value="{{ wOn }}" hint-placeholder-val="{{ true }}">', "</sc-if>", l386.indexOf('<sc-if value="{{ wOn }}"') - 1);
const traceRb = between(l386, '<sc-if value="{{ rbOn }}" hint-placeholder-val="{{ false }}">', "</sc-if>");

const wf = lines.findIndex(l => l.startsWith('<sc-if value="{{ whaleFront }}"'));
const whale = lines.slice(wf + 1, wf + 12).join("\n").replace("{{ whaleT }}", "translate(0 360)");

for (const [k, v] of Object.entries({ center, dark, trace, traceRb, whale })) if (v.includes("{{")) throw new Error("unresolved in " + k);

const ts = `export const HERO_DEFS = ${JSON.stringify(defs)};
export const HERO_CENTER = ${JSON.stringify(center)};
export const HERO_LETTERS_OFF = ${JSON.stringify(dark)};
export const HERO_TRACE = ${JSON.stringify(trace)};
export const HERO_TRACE_RB = ${JSON.stringify(traceRb)};
export const HERO_WHALE = ${JSON.stringify(whale)};
`;
fs.writeFileSync(path.join(outDir, "static.ts"), ts);

// geo(): copy method body verbatim, run against a plain { props, state } object
const geoStart = html.indexOf("  geo() {");
const rvStart = html.indexOf("  renderVals() {");
const geoSrc = html.slice(geoStart, rvStart).trim().replace(/^geo\(\) \{/, "").replace(/\}\s*$/, "");
fs.writeFileSync(path.join(outDir, "geo.js"), `/* eslint-disable */
// Ported verbatim from the design handoff (FUJI LINK Hero.dc.html). Regenerate rather than hand-edit.
export function buildGeo(props) {
  return function () {${geoSrc}}.call({ props, state: {} });
}
`);
console.log("css", out.length, "defs", defs.length, "center", center.length, "trace", trace.length, "whale", whale.length, "geo", geoSrc.length);
