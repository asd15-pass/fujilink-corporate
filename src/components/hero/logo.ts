// Logo sign lighting, pattern lp1: a 16 s loop. Dark letters, then the eight letters light left to right with a
// flicker (their outline bulbs with them), a blurred colour flare behind the logo, a marquee on the bulbs while lit,
// and a 0.4 s fade back to dark. Sparkles twinkle on their own loop. The letter shapes, masks and colour filters
// (lpU / mkRB / rbF) come from the design's defs in static.ts.
import { HERO_LETTERS_OFF } from "./static";

const f1 = (n: number) => Math.round(n * 10) / 10;
const LETTER_COLORS = ["#ec7c92", "#f08a4b", "#f8cc03", "#48b14b", "#01a19a", "#00b8ee", "#9a72af", "#e7373e"];

const LETTERS = LETTER_COLORS.map((c, i) =>
  `<g class="xlet xl${i}" style="--i:${i}"><g>`
  + `<use href="#lpU${i}" fill="${c}" stroke="${c}" stroke-width="2.6" stroke-linejoin="round"></use>`
  + `<g mask="url(#mkRB${i})"><g style="filter:saturate(1.25) brightness(1.08)"><g filter="url(#rbF${i})">`
  + `<g transform="translate(55 42)"><foreignObject width="1512" height="1040"><img src="/hero/letters-on7.webp" style="width:1512px;height:1040px;display:block"></foreignObject></g>`
  + `</g></g></g></g></g>`,
).join("");

// Under the letters, so the light bleeds out from their edges.
const GLOW = `<g class="xglow" style="filter:blur(6px)">`
  + LETTER_COLORS.map((c, i) => `<use href="#lpU${i}" fill="${c}" stroke="${c}" stroke-width="12" stroke-linejoin="round"></use>`).join("")
  + `</g>`;

// A dash pattern of 0 7 with round caps puts a bulb every 7 units along the outline; a second set offset by 3.5
// sits between them and blinks in turn. Each bulb is a halo, a colour and a white core.
const BULBS = LETTER_COLORS.map((c, i) => {
  const set = (cls: string, off: number) =>
    `<use href="#lpU${i}" class="${cls}" fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round" stroke-dasharray="0 7" stroke-dashoffset="${off}" opacity=".3"></use>`
    + `<use href="#lpU${i}" class="${cls}" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round" stroke-dasharray="0 7" stroke-dashoffset="${off}"></use>`
    + `<use href="#lpU${i}" class="${cls}" fill="none" stroke="#fffbe8" stroke-width="2" stroke-linecap="round" stroke-dasharray="0 7" stroke-dashoffset="${off}"></use>`;
  return `<g class="xb${i}">${set("bA", 0)}${set("bB", -3.5)}</g>`;
}).join("");

const SPARKS = [[662, 386, 1.4], [750, 358, 1.1], [955, 408, 1.2], [1050, 442, 1.5], [1145, 516, 1.2], [690, 516, 1], [1110, 574, 1], [862, 376, 1.3]]
  .map(([x, y, sc], i) => `<g transform="translate(${x} ${y}) scale(${sc})"><path class="xspark" d="M0-7L1.6-1.6L7 0L1.6 1.6L0 7L-1.6 1.6L-7 0L-1.6-1.6Z" fill="${i % 2 ? "#fff4c2" : "#ffffff"}" style="animation-delay:${f1(-i * 0.45)}s"></path></g>`).join("");

const SEQ = 16, FIRST = 1.5, STEP = 0.6, FLARE = FIRST + STEP * 8 + 0.3, OFF = 14;
const pc = (t: number) => f1((t / SEQ) * 100);
const LOGO_SEQ_CSS = LETTER_COLORS.map((_, i) => {
  const on = FIRST + STEP * i;
  return `@keyframes xl${i}{0%,${pc(on) - 0.1}%{opacity:0}${pc(on)}%{opacity:1}${pc(on + 0.08)}%{opacity:.3}${pc(on + 0.16)}%,${pc(OFF)}%{opacity:1}${pc(OFF + 0.4)}%,100%{opacity:0}}`
    + `.lp1 .xl${i},.lp1 .xb${i}{animation:xl${i} ${SEQ}s linear infinite}`;
}).join("")
  + `@keyframes xglow{0%,${pc(FLARE) - 0.1}%{opacity:0}${pc(FLARE)}%{opacity:1}${pc(FLARE + 0.5)}%{opacity:.45}${pc(FLARE + 0.9)}%{opacity:.85}${pc(FLARE + 1.6)}%,${pc(OFF)}%{opacity:.5}${pc(OFF + 0.4)}%,100%{opacity:0}}`
  + `.lp1 .xglow{animation:xglow ${SEQ}s ease-out infinite}`;

// Dark letters, flare and lit letters. The always-blinking bulbs and sparkles go in a layer of their own above,
// so their blinking never repaints the masked, filtered letter textures.
export const LOGO_SIGN = `<g style="pointer-events:none">${HERO_LETTERS_OFF}<style>${LOGO_SEQ_CSS}</style>${GLOW}${LETTERS}</g>`;
export const LOGO_LIGHTS = `<g style="pointer-events:none">${BULBS}${SPARKS}</g>`;
