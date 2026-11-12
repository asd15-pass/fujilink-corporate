import { buildGeo } from "./geo";
import type { Prop, Shape, Walk } from "./geo";
import { HERO_ANIMATED_CLASSES, HERO_CENTER, HERO_DEFS, HERO_WHALE } from "./static";
import { LOGO_LIGHTS, LOGO_SIGN } from "./logo";
import { createHash } from "node:crypto";
import { bakeDefs, frozen, gradeMarkup, pruneDefs, splitTop } from "./bake";
import { buildMainland } from "./mainland";
import { BIRD, BIRD_DEFS } from "./bird";
import { type B, type Unit, slice, union, pathBox, symbolBox, grow, shift, touches } from "./slice";
import BOXES from "./symbol-boxes.json";

const q = (v: unknown) => String(v).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const join = <T,>(list: T[] | undefined, fn: (x: T) => string) => (list || []).map(fn).join("");

const op = (o: number) => (o === 1 ? "" : ` opacity="${o}"`);
const stroked = (s: Shape) => `<path d="${q(s.d)}" fill="${q(s.f)}"${op(s.o)}${s.s && s.s !== "none" ? ` stroke="${q(s.s)}" stroke-width="${s.w}" stroke-linecap="round"` : ""}></path>`;
const filled = (s: Shape) => `<path d="${q(s.d)}" fill="${q(s.f)}"${op(s.o)}></path>`;
const ref = (p: Prop) => `<use href="${p.h}" transform="${q(p.m)}"></use>`;
const walker = (w: Walk) => `<g transform="translate(${w.x} ${w.y})"><g class="wk2" style="${w.st}"><g class="wf" style="${w.st}"><use href="${w.h}" transform="${w.tr}"></use></g></g></g>`;

const ANIMATED = new Set(HERO_ANIMATED_CLASSES);
const TOPS = new Map(splitTop(HERO_DEFS).filter(t => t.id).map(t => [t.id!, t.el]));
const moving = new Map<string, boolean>();
// Whether a symbol (or anything it references) carries an animated class.
function isMoving(id: string): boolean {
  if (moving.has(id)) return moving.get(id)!;
  moving.set(id, false);
  const el = TOPS.get(id) || "";
  const r = [...el.matchAll(/class="([^"]+)"/g)].some(m => m[1].split(/\s+/).some(c => ANIMATED.has(c)))
    || [...el.matchAll(/href="#([\w-]+)"/g)].some(m => isMoving(m[1]));
  moving.set(id, r);
  return r;
}
const sym = (h: string) => h.replace(/^#/, "");
const boxOf = (p: Prop) => symbolBox(p.m, (BOXES as Record<string, number[]>)[sym(p.h)]);
const offset = (st: string) => [+(st.match(/--dx:(-?[\d.]+)px/)?.[1] ?? 0), +(st.match(/--dy:(-?[\d.]+)px/)?.[1] ?? 0)] as const;
const walkBox = (w: Walk): B => {
  const b = symbolBox(`translate(${w.x} ${w.y}) ${w.tr}`, (BOXES as Record<string, number[]>)[sym(w.h)]);
  if (!b) return null;
  const [dx, dy] = offset(w.st);
  return union(b, shift(b, dx, dy));
};

// Trees sway by ±2.5°: barely visible at this size, but there are ~80 of them, so they are drawn still.
// Standing figures swing four limbs each in the design (~400 animations for ~100 people); they get one idle
// motion instead (a hop and a turn now and then, see .fl-idle). Walkers keep their stride.
const CALM = new Set(["tr", "tr2", "sak", "p1", "p2", "p3", "p4", "p5", "p6"]);
const PEOPLE = /^p[1-6]$/;
const person = (p: Prop) => PEOPLE.test(sym(p.h));
const live = (p: Prop) => person(p) || (isMoving(sym(p.h)) && !CALM.has(sym(p.h)));
const still = (p: Prop) => (CALM.has(sym(p.h)) ? { h: frozen(p.h), m: p.m } : p);
let idleN = 0;
const idle = (p: Prop) => {
  const k = idleN++;
  return `<g transform="${q(p.m)}"><use href="${frozen(p.h)}" class="fl-idle" style="animation-duration:${(6 + (k * 7) % 5).toFixed(1)}s;animation-delay:-${((k * 2.3) % 9).toFixed(1)}s"></use></g>`;
};
const liveRef = (p: Prop) => (person(p) ? idle(p) : ref(p));
// The rocket lifts off from its pad (see .fl-launch), so its box covers the climb.
const ROCKET_CLIMB = 820;
const f1 = (n: number) => Math.round(n * 10) / 10;

// The two jets in the pool are part of the centre raster. A live jet is drawn over each, a little larger so the
// still one disappears inside it: a tapering column with streaks running up it, water arcing off the crown on both
// sides and dripping back down, foam and rings at the foot, and the whole jet slowly rising and settling.
// Feet measured off the raster (the painted jets are ~50 and ~80 tall, ~20 and ~16 wide); both live jets share one
// height and are wide enough to cover the painted ones at the shortest point of their rise. [x, y of the foot]
const JET_H = 88;
const JETS = [[629, 622], [973.5, 675]].map(([x, y], j) => {
  const h = JET_H, w = 11, top = -h, d = (n: number) => `animation-delay:-${f1(n)}s`;
  const column = `<path d="M${-w} 0C${-w} ${f1(-h * 0.35)} -9 ${f1(-h * 0.6)} -4 ${top}Q0 ${top - 4} 4 ${top}C9 ${f1(-h * 0.6)} ${w} ${f1(-h * 0.35)} ${w} 0Z" fill="#dcf4fb"></path>`;
  const streaks = [[-w * 0.35, 1.3, 0], [w * 0.25, 0.9, 0.3]].map(([sx, sw, dl]) =>
    `<path class="fl-flow" d="M${f1(sx)} -2L${f1(sx * 0.4)} ${f1(top + 3)}" stroke="#fff" stroke-width="${sw}" stroke-linecap="round" stroke-dasharray="7 9" style="${d(dl + j * 0.2)}"></path>`).join("");
  const arc = (s: number, r: number, k: number) => {
    const path = `M0 ${f1(top + 1)}Q${f1(s * r * 0.55)} ${f1(top - r * 0.35)} ${f1(s * r)} ${f1(top + r * 0.9)}`;
    return `<path d="${path}" stroke="#d6f1f9" stroke-width="${k ? 2.6 : 3.8}" fill="none" stroke-linecap="round" opacity=".75"></path>`
      + `<path class="fl-fall" d="${path}" stroke="#fff" stroke-width="${k ? 1 : 1.5}" fill="none" stroke-linecap="round" stroke-dasharray="6 6" style="${d(k * 0.25 + j * 0.15)}"></path>`
      + `<circle class="fl-drop" cx="${f1(s * r)}" cy="${f1(top + r * 0.9)}" r="1.4" fill="#f4fdff" style="--dx:${f1(s * 2)}px;--dy:${f1(-top - r * 0.9 - 2)}px;${d(k * 0.4 + (s > 0 ? 0.7 : 0) + j * 0.3)}"></circle>`;
  };
  const crown = [-1, 1].map(s => arc(s, h * 0.3, 0) + arc(s, h * 0.18, 1)).join("");
  const foot = `<ellipse class="rip${j ? " rp2" : ""}" rx="${f1(w * 1.9)}" ry="${f1(w * 0.75)}" fill="none" stroke="#fff" stroke-width="1.4" opacity=".75"></ellipse>`
    + `<ellipse class="rip${j ? "" : " rp2"}" rx="${f1(w * 1.9)}" ry="${f1(w * 0.75)}" fill="none" stroke="#fff" stroke-width="1" opacity=".55"></ellipse>`
    + `<ellipse class="fl-foam" rx="${f1(w * 1.35)}" ry="${f1(w * 0.5)}" fill="#f4fdff" opacity=".85" style="${d(j * 0.5)}"></ellipse>`;
  return `<g transform="translate(${x} ${y})">${foot}<g class="fl-jet" style="${d(j * 1.1)}">${column}${streaks}${crown}</g></g>`;
}).join("");
const liveBox = (p: Prop) => {
  const b = grow(boxOf(p), 8);
  return sym(p.h) === "rkt" ? union(b, shift(b, 0, -ROCKET_CLIMB)) : b;
};

type Item = { sh: Shape[]; props: Prop[]; walk: Walk[]; op: number };
// One building/prop group: still parts in one unit (shadowed per building layer), moving props and walkers in another.
// In the town everything is still except its people.
function itemUnits(it: Item, shade: number, town = false): Unit[] {
  const moves = (p: Prop) => (town ? person(p) : live(p));
  const fixed = it.props.filter(p => !moves(p));
  const moving = it.props.filter(moves);
  const out: Unit[] = [];
  const box = union(...it.sh.map(s => grow(pathBox(s.d), (s.w || 1) + 4)), ...fixed.map(boxOf));
  const prop = (p: Prop) => ref(town ? { h: frozen(p.h), m: p.m } : still(p));
  const body = (sh: Shape[], props: Prop[]) => `<g class="lyr"><g${op(it.op)}>${join(sh, stroked)}${join(props, prop)}</g></g>`;
  out.push({
    html: body(it.sh, fixed),
    cover: rects => body(it.sh.filter(s => touches(grow(pathBox(s.d), (s.w || 1) + 2), rects)), fixed.filter(p => touches(boxOf(p), rects))),
    box: box && grow(box, 4),
    anim: false,
    shade,
  });
  if (moving.length || it.walk.length)
    out.push({
      html: `<g class="lyr"><g opacity="${it.op}">${join(moving, liveRef)}${join(it.walk, walker)}</g></g>`,
      box: union(...moving.map(liveBox), ...it.walk.map(walkBox)),
      anim: true,
    });
  return out;
}

export type BakedLayer = { src: string; box: [number, number, number, number] };
export type HeroLayer = { kind: "svg"; cls: string; html: string; id?: string } | ({ kind: "img"; id: string } & BakedLayer);

export function renderHeroSvg(withImages: boolean, baked: Record<string, BakedLayer> = {}) {
  idleN = 0;
  // v05 "d" draws the centre fountain from the raster cut-outs; "a" is the all-SVG plaza used when those files are absent.
  const g = buildGeo({ pattern: "town", svcText: true, v05: withImages ? "d" : "a" });
  const S = g.S;
  const isle = g.isle;
  const islet = isle.islet;
  const land = buildMainland(g);
  land.items.sort((a, b) => a.key - b.key);

  const frozenIds = new Set([...CALM, ...land.items.flatMap(it => it.props.map(p => sym(p.h)))]);

  // The design hides ships behind the island with two full-canvas masks, which re-rasterise on every frame a
  // ship moves. The masks are plain black/white shapes, so clip paths give the same cut at a fraction of the cost.
  const shipClips = `<clipPath id="shipB"><rect x="-200" y="-200" width="2000" height="${S.shipLine + 200}"></rect></clipPath>`
    + `<clipPath id="shipH"><path d="M-200 -200H1800V1300H-200Z${S.isleHex}" clip-rule="evenodd"></path></clipPath>`
    + `<clipPath id="shipF"><rect x="-200" y="${S.shipLine - 90}" width="2000" height="1500"></rect></clipPath>`;
  // The design's drop-shadow(3px 3.5px 0 rgba(90,60,30,.2)) on building layers, graded like the scene. As an SVG
  // filter it is rasterised with the still layer once; a CSS filter would be re-applied by the compositor every frame.
  const shade = `<filter id="flShade" x="-2%" y="-2%" width="104%" height="104%"><feDropShadow dx="3" dy="3.5" stdDeviation="0" flood-color="#553e28" flood-opacity=".2"></feDropShadow></filter>`;
  // The rocket's body (inside its "hov" group, the gantry stays put) lifts off instead of hovering.
  const launch = (d: string) => { const j = d.indexOf('<g class="hov">', d.indexOf('<g id="rkt">')); return d.slice(0, j) + '<g class="fl-launch">' + d.slice(j + 15); };
  const defs = launch(bakeDefs(HERO_DEFS, frozenIds)) + shipClips + shade + BIRD_DEFS;

  const units: Unit[] = [];
  const add = (html: string, box: B, anim: boolean) => units.push({ html, box, anim });

  // town behind the sea: entirely static
  add(`<g class="gnd">${join(land.ground, stroked)}</g>`, null, false);
  for (const it of land.items) units.push(...itemUnits({ ...it, sh: g.merge(it.sh), walk: [] }, -1, true));

  add(join(g.sky, c => `<g transform="translate(0 ${c.y})"><g class="mv" style="${c.st}"><use href="#cl" transform="scale(${c.s})"></use></g></g>`), [-300, 0, 1900, 520], true);

  // The page behind the hero is the sea colour, so the design's pale band around the sea is left out.
  add(`<g class="gnd">${join(S.ground.filter(s => s.f !== "#d9efe9"), stroked)}</g>`, null, false);
  for (const w of S.waves) add(`<path class="${w.c}" d="${w.d}" stroke="#e9fbff" stroke-width="2" stroke-linecap="round" fill="none"></path>`, grow(pathBox(w.d), 10), true);
  for (const b of land.boats) {
    const [x, y] = b.m.match(/-?[\d.]+/g)!.map(Number);
    add(`<g transform="${b.m}"><g class="bob" style="transform-box:fill-box;transform-origin:50% 100%;${b.st}">${b.h ? `<use href="${b.h}"></use>` : join(b.sh, filled)}</g></g>`, [x - 30, y - 50, x + 30, y + 14], true);
  }
  for (const w of land.walkers) add(walker(w), walkBox(w), true);
  for (const s of S.ships || []) {
    const pts = (s.st.match(/path\('([^']+)'\)/)?.[1] || "");
    const b = grow(pathBox(pts), 70);
    const ship = `<g style="${q(s.st)}"><use href="${s.h}" transform="${s.m}"></use></g>`;
    add(`<g clip-path="url(#shipB)"><g clip-path="url(#shipH)">${ship}</g></g><g clip-path="url(#shipF)">${ship}</g>`, pts ? b : null, true);
  }
  S.layers.forEach((L, li) => {
    for (const c of L.movers) {
      const [dx, dy] = offset(c.st);
      const b = union(...c.sh.map(s => shift(pathBox(s.d), c.x, c.y)));
      add(`<g class="lyr"><g clip-path="${c.clip}"><g transform="translate(${c.x} ${c.y})"><g class="drv" style="${c.st}">${join(c.sh, filled)}${join(c.props, ref)}</g></g></g></g>`,
        b && grow(union(b, shift(b, dx, dy)), 6), true);
    }
    for (const it of L.items) units.push(...itemUnits({ ...it, sh: g.merge(it.sh) }, li));
  });

  if (withImages) {
    const c = HERO_CENTER.replace("/hero/center-cut7.webp", "/hero/center-cut7-graded.webp");
    const wrap = '<g transform="translate(55 42)" style="pointer-events:none">';
    const i = c.indexOf(wrap), r = c.indexOf('<g opacity=".55">', i), e = c.indexOf("</g>", r) + 4;
    add(c.slice(0, i) + "</g>", null, false);
    add(`<g transform="translate(55 42)">${c.slice(r, e)}</g>`, [640, 580, 960, 720], true);
    add(JETS, [600, 520, 1000, 700], true);
    add(wrap + c.slice(e, -4), null, false);
    for (const p of g.rim) add(live(p) ? liveRef(p) : ref(still(p)), live(p) ? grow(boxOf(p), 8) : boxOf(p), live(p));
  }

  // The floating island is drawn over the whole island (the design tucks its underside behind the rail and towers).
  add(`<g transform="translate(-20 125) scale(1)"><g class="isf">${join(isle.sh, stroked)}${join(isle.props, ref)}`
    + `<path d="${isle.fall}" stroke="#bfeaf5" stroke-width="7" fill="none" stroke-dasharray="14 10" class="fall" stroke-linecap="round"></path>`
    + `<path d="${isle.fall}" stroke="#ffffff" stroke-width="2.4" fill="none" stroke-dasharray="6 18" class="fall" stroke-linecap="round" opacity=".9"></path>`
    + join(isle.petals, p => `<ellipse class="petal" style="${p.st}" cx="${p.x}" cy="${p.y}" rx="2.4" ry="1.4" fill="#f39db6"></ellipse>`)
    + `</g><g class="isf2">${join(islet.sh, stroked)}${join(islet.props, ref)}</g>`
    + `<g class="brs"><path d="${isle.bridge}" stroke="#7a5640" stroke-width="1.4" fill="none"></path><path d="${isle.deck}" stroke="#a8743d" stroke-width="3.4" fill="none" stroke-dasharray="2.5 1.5"></path>${join(isle.blan, p => `<use href="#cho" transform="${p.m}"></use>`)}</g></g>`,
    shift(grow(union(...isle.sh.map(s => pathBox(s.d)), ...islet.sh.map(s => pathBox(s.d)), ...isle.props.map(boxOf), ...islet.props.map(boxOf))!, 24), -20, 125), true);

  const { runs, clips } = slice(units);

  const svg = (body: string) => `<svg viewBox="0 0 1600 1100" aria-hidden="true"><g style="transform:translate(0px, -34px)">${body}</g></svg>`;
  // A still run that scripts/bake-hero-layers.mjs has rendered to an image is drawn from that image; its id hashes
  // its markup and the defs, so an edited scene falls back to inline SVG until the images are baked again.
  const layers: HeroLayer[] = runs.map(r => {
    const html = svg(`<g class="cr-paper">${gradeMarkup(r.html)}</g>`);
    if (r.anim) return { kind: "svg", cls: "fl-live", html };
    // The centre raster is already an image (and Chrome misplaces foreignObject content in the bake capture).
    if (html.includes("<foreignObject")) return { kind: "svg", cls: "", html };
    const id = createHash("sha1").update(html).update(defs).digest("hex").slice(0, 12);
    const img = baked[id];
    return img ? { kind: "img", id, ...img } : { kind: "svg", cls: "", html, id };
  });
  if (withImages) layers.push({ kind: "svg", cls: "", html: svg(LOGO_SIGN) }, { kind: "svg", cls: "", html: svg(LOGO_LIGHTS) });
  layers.push({ kind: "svg", cls: "fl-swim", html: svg(HERO_WHALE.replace('class="wswim"', "")) }, { kind: "svg", cls: "fl-bird", html: svg(BIRD) });

  const inline = layers.map(l => (l.kind === "svg" ? l.html : "")).join("");
  return { defs: (layers.some(l => l.kind === "img") ? pruneDefs(defs, inline) : defs) + clips, layers };
}
