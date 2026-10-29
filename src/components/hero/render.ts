import { buildGeo } from "./geo";
import { HERO_CENTER, HERO_DEFS, HERO_LETTERS_OFF, HERO_TRACE_RB, HERO_WHALE } from "./static";

type Shape = { d: string; f: string; o: number; s?: string; w?: number };
type Prop = { h: string; m: string };

const q = (v: unknown) => String(v).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const join = <T,>(list: T[] | undefined, fn: (x: T) => string) => (list || []).map(fn).join("");

const stroked = (s: Shape) => `<path d="${q(s.d)}" fill="${q(s.f)}" opacity="${s.o}" stroke="${q(s.s)}" stroke-width="${s.w}" stroke-linecap="round"></path>`;
const filled = (s: Shape) => `<path d="${q(s.d)}" fill="${q(s.f)}" opacity="${s.o}"></path>`;
const use = (p: Prop) => `<use href="${p.h}" transform="${q(p.m)}"></use>`;

// rainbow=true (design 1a v2): each letter lights in its own logo colour.
const LETTER_COLORS = ["#ec7c92", "#f08a4b", "#f8cc03", "#48b14b", "#01a19a", "#00b8ee", "#9a72af", "#e7373e"];
const LETTERS = LETTER_COLORS.map((c, i) =>
  `<g class="lfc${i}"><g><use href="#lpU${i}" fill="${c}" stroke="${c}" stroke-width="2.6" stroke-linejoin="round"></use><g mask="url(#mkRB${i})"><g style="filter:saturate(1.25) brightness(1.08)"><g filter="url(#rbF${i})"><g transform="translate(55 42)"><foreignObject width="1512" height="1040"><img src="/hero/letters-on7.webp" style="width:1512px;height:1040px;display:block"></foreignObject></g></g></g></g></g></g>`,
).join("");

export function renderHeroSvg(withImages: boolean) {
  // v05 "d" draws the centre fountain from the raster cut-outs; "a" is the all-SVG plaza used when those files are absent.
  const g = buildGeo({ pattern: "town", svcText: true, v05: withImages ? "d" : "a" });
  const S = g.S;
  const isle = g.isle;
  const islet = isle.islet;

  const sky = join(g.sky, c =>
    `<g transform="translate(0 ${c.y})"><g class="mv" style="${c.st}"><use href="#cl" transform="scale(${c.s})"></use></g></g>`);

  const island = `<g transform="translate(-20 125) scale(1)"><g class="isf">${join(isle.sh, stroked)}${join(isle.props, use)}`
    + `<path d="${isle.fall}" stroke="#bfeaf5" stroke-width="7" fill="none" stroke-dasharray="14 10" class="fall" stroke-linecap="round"></path>`
    + `<path d="${isle.fall}" stroke="#ffffff" stroke-width="2.4" fill="none" stroke-dasharray="6 18" class="fall" stroke-linecap="round" opacity=".9"></path>`
    + join(isle.petals, p => `<ellipse class="petal" style="${p.st}" cx="${p.x}" cy="${p.y}" rx="2.4" ry="1.4" fill="#f39db6"></ellipse>`)
    + `</g><g class="isf2">${join(islet.sh, stroked)}${join(islet.props, use)}</g>`
    + `<g class="brs"><path d="${isle.bridge}" stroke="#7a5640" stroke-width="1.4" fill="none"></path><path d="${isle.deck}" stroke="#a8743d" stroke-width="3.4" fill="none" stroke-dasharray="2.5 1.5"></path>${join(isle.blan, p => `<use href="#cho" transform="${p.m}"></use>`)}</g></g>`;

  const waves = join(S.waves, w => `<path class="${w.c}" d="${w.d}" stroke="#e9fbff" stroke-width="2" stroke-linecap="round" fill="none"></path>`);
  const ships = join(S.ships, s => `<g style="${q(s.st)}"><use href="${s.h}" transform="${s.m}"></use></g>`);
  const shipMasks = `<mask id="shipB" maskUnits="userSpaceOnUse" x="-200" y="-200" width="2000" height="1500"><rect x="-200" y="-200" width="2000" height="${S.shipLine + 200}" fill="#fff"></rect><path d="${S.isleHex}" fill="#000"></path></mask>`
    + `<mask id="shipF" maskUnits="userSpaceOnUse" x="-200" y="-200" width="2000" height="1500"><rect x="-200" y="${S.shipLine - 90}" width="2000" height="1500" fill="#fff"></rect></mask>`;

  const layers = join(S.layers, L =>
    `<g class="lyr">`
    + join(L.movers, c => `<g clip-path="${c.clip}"><g transform="translate(${c.x} ${c.y})"><g class="drv" style="${c.st}">${join(c.sh, filled)}${join(c.props, use)}</g></g></g>`)
    + join(L.items, it => `<g opacity="${it.op}">${join(it.sh, stroked)}${join(it.props, use)}`
      + join(it.walk, w => `<g transform="translate(${w.x} ${w.y})"><g class="wk2" style="${w.st}"><g class="wf" style="${w.st}"><use href="${w.h}" transform="${w.tr}"></use></g></g></g>`)
      + `</g>`)
    + `</g>`);

  const scene = `<g class="calm cr-paper">${sky}${island}<g class="gnd">${join(S.ground, stroked)}</g>${waves}${shipMasks}`
    + `<g mask="url(#shipB)">${ships}</g><g mask="url(#shipF)">${ships}</g>${layers}</g>`;

  const center = withImages
    ? HERO_CENTER
      + `<g class="calm" style="pointer-events:none">${join(g.rim, use)}</g>`
      + `<g style="pointer-events:none"><g style="pointer-events:none">${HERO_LETTERS_OFF}${HERO_TRACE_RB}</g><g>${LETTERS}</g></g>`
    : "";

  return `<svg viewBox="0 0 1600 1100" style="position:absolute;inset:0;width:100%;height:100%;display:block" role="img" aria-label="ひとつの街、9つの世界">`
    + `<defs>${HERO_DEFS}</defs>`
    + `<g style="transform-origin:0 0;transform:translate(0px, -34px) scale(1)">${scene}${center}<g style="pointer-events:none">${HERO_WHALE}</g></g>`
    + `<rect width="1600" height="1100" filter="url(#paperTex)" opacity=".06" style="mix-blend-mode:multiply;pointer-events:none"></rect>`
    + `</svg>`;
}
