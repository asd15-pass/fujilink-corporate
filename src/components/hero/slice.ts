// Splits the scene into a stack of static and animated layers without changing what is drawn on top of what.
// Browsers repaint a whole <svg> whenever anything inside it moves, so the ~5000 still shapes must not share an
// <svg> with the ~300 moving ones. Walking the units in paint order, an animated unit sinks below later still
// units whose boxes it does not touch. Where a still unit covers a small animated one (a tree, a passer-by), a copy
// of the still unit clipped to the overlap goes into the animated layer; only large movers (ships, clouds) force a
// new pair of layers.

// [x0, y0, x1, y1] in scene units. null = unknown (treated as overlapping everything), undefined = draws nothing.
export type Box = [number, number, number, number];
export type B = Box | null | undefined;
// cover: the part of this still unit that touches the given rects, used when it is copied over an animated one.
// shade: building layer whose drop shadow this still unit casts. The shadow is an SVG filter, which is only
// affordable in still layers because those are painted once.
export type Unit = { html: string; box: B; anim: boolean; cover?: (rects: Box[]) => string; shade?: number };

const shaded = (us: Unit[]) => {
  let out = "", run: Unit[] = [];
  const end = () => {
    if (run.length) out += run[0].shade == null ? run.map(u => u.html).join("") : `<g filter="url(#flShade)">${run.map(u => u.html).join("")}</g>`;
    run = [];
  };
  for (const u of us) { if (run.length && run[0].shade !== u.shade) end(); run.push(u); }
  end();
  return out;
};
export const touches = (b: B, rects: Box[]) => rects.some(r => overlaps(b, r));

const SMALL = 220 * 220;
const small = (b: B) => !!b && (b[2] - b[0]) * (b[3] - b[1]) < SMALL;
const meet = (a: Box, b: Box): Box => [Math.max(a[0], b[0]), Math.max(a[1], b[1]), Math.min(a[2], b[2]), Math.min(a[3], b[3])];

export function union(...bs: B[]): B {
  let out: Box | undefined;
  for (const b of bs) {
    if (b === null) return null;
    if (!b) continue;
    out = out ? [Math.min(out[0], b[0]), Math.min(out[1], b[1]), Math.max(out[2], b[2]), Math.max(out[3], b[3])] : [...b];
  }
  return out;
}

export const grow = (b: B, n: number): B => (b ? [b[0] - n, b[1] - n, b[2] + n, b[3] + n] : b);
export const shift = (b: B, x: number, y: number): B => (b ? [b[0] + x, b[1] + y, b[2] + x, b[3] + y] : b);

// Bounding box of the absolute path data the geometry code emits (M/L/H/V/C/S/Q/T/A/Z).
export function pathBox(d: string): B {
  const tok = d.match(/[A-Za-z]|-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?/g);
  if (!tok) return undefined;
  if (/[a-y]/.test(d.replace(/e-?\d/g, ""))) return null;
  const xs: number[] = [], ys: number[] = [];
  let cmd = "M";
  for (let i = 0; i < tok.length;) {
    if (/[A-Za-z]/.test(tok[i])) { cmd = tok[i++]; if (cmd === "Z") continue; }
    const n = (k: number) => Number(tok[i + k]);
    if (cmd === "H") { xs.push(n(0)); i += 1; }
    else if (cmd === "V") { ys.push(n(0)); i += 1; }
    else if (cmd === "A") {
      const r = Math.max(n(0), n(1));
      xs.push(n(5) - r, n(5) + r); ys.push(n(6) - r, n(6) + r); i += 7;
    } else { xs.push(n(0)); ys.push(n(1)); i += 2; }
  }
  return xs.length && ys.length ? [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)] : undefined;
}

type M = [number, number, number, number, number, number];
const mul = (a: M, b: M): M => [a[0] * b[0] + a[2] * b[1], a[1] * b[0] + a[3] * b[1], a[0] * b[2] + a[2] * b[3], a[1] * b[2] + a[3] * b[3], a[0] * b[4] + a[2] * b[5] + a[4], a[1] * b[4] + a[3] * b[5] + a[5]];

// Box of a <use> with an SVG transform list, given the symbol's own box [x, y, w, h].
export function symbolBox(transform: string, sym: number[] | undefined): B {
  if (!sym) return null;
  let m: M = [1, 0, 0, 1, 0, 0];
  for (const [, fn, args] of transform.matchAll(/(\w+)\(([^)]*)\)/g)) {
    const a = args.split(/[\s,]+/).filter(Boolean).map(Number);
    if (fn === "translate") m = mul(m, [1, 0, 0, 1, a[0], a[1] || 0]);
    else if (fn === "scale") m = mul(m, [a[0], 0, 0, a[1] ?? a[0], 0, 0]);
    else if (fn === "matrix") m = mul(m, a as M);
    else if (fn === "rotate") { const t = (a[0] * Math.PI) / 180, c = Math.cos(t), s = Math.sin(t); m = mul(m, [c, s, -s, c, 0, 0]); }
    else return null;
  }
  const [x, y, w, h] = sym;
  const pts = [[x, y], [x + w, y], [x, y + h], [x + w, y + h]].map(([u, v]) => [m[0] * u + m[2] * v + m[4], m[1] * u + m[3] * v + m[5]]);
  return [Math.min(...pts.map(p => p[0])), Math.min(...pts.map(p => p[1])), Math.max(...pts.map(p => p[0])), Math.max(...pts.map(p => p[1]))];
}

const overlaps = (a: B, b: B) => a === null || b === null || (!!a && !!b && a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3]);

export function slice(units: Unit[]) {
  const runs: { anim: boolean; html: string }[] = [];
  const clips: string[] = [];
  let still: Unit[] = [], live: Unit[] = [];
  const flush = () => {
    if (still.length) runs.push({ anim: false, html: shaded(still) });
    if (live.length) runs.push({ anim: true, html: live.map(u => u.html).join("") });
    still = []; live = [];
  };
  for (const u of units) {
    if (u.anim) { live.push(u); continue; }
    const hit = live.filter(a => a.anim && overlaps(a.box, u.box));
    if (!hit.length) still.push(u);
    else if (u.box && hit.every(a => small(a.box))) {
      const rects = hit.map(a => meet(a.box as Box, u.box as Box));
      const id = `fc${clips.length}`;
      clips.push(`<clipPath id="${id}">${rects.map(([x0, y0, x1, y1]) => `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}"></rect>`).join("")}</clipPath>`);
      still.push(u);
      live.push({ html: `<g clip-path="url(#${id})">${u.cover ? u.cover(rects) : u.html}</g>`, box: u.box, anim: false });
    } else { flush(); still.push(u); }
  }
  flush();
  return { runs, clips: clips.join("") };
}
