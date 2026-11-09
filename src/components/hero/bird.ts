// The mahjong 1-sou bird drawn as a peacock, flying right to left across the sky. Flat fills, no outlines:
// feathers alternate two tones with a faint lattice on top. Motion lives in globals.css (.xmj and friends).
const f1 = (n: number) => Math.round(n * 10) / 10;

export const BIRD_DEFS = `<linearGradient id="mjBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf6"></stop><stop offset="1" stop-color="#e2ddcf"></stop></linearGradient>`
  + `<pattern id="mjLattice" width="4.5" height="4.5" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><path d="M0 0H4.5M0 0V4.5" stroke="#fffdf6" stroke-width=".7" opacity=".35"></path></pattern>`;

const MJ_INK = "#2b2f3a", MJ_INK_2 = "#3d4350", MJ_FAR = "#596070", MJ_GREEN = "#2f4a24", MJ_RED = "#e0685a";

// A leaf from the origin, pointing deg, len long and w wide.
const featherPath = (deg: number, len: number, w: number) => {
  const r = (deg * Math.PI) / 180, ux = Math.cos(r), uy = Math.sin(r), px = -uy * w, py = ux * w;
  const mx = ux * len * 0.55, my = uy * len * 0.55;
  return `M0 0Q${f1(mx + px)} ${f1(my + py)} ${f1(ux * len)} ${f1(uy * len)}Q${f1(mx - px)} ${f1(my - py)} 0 0Z`;
};

const feathers = (spread: number[][], w: number, tones: string[]) => spread.map(([d, l], i) => {
  const path = featherPath(d, l, w);
  return `<path d="${path}" fill="${tones[i % tones.length]}"></path><path d="${path}" fill="url(#mjLattice)"></path>`;
}).join("");

// White, green and red rings at 80% of the plume's length.
const tailEye = (deg: number, len: number) => {
  const r = (deg * Math.PI) / 180, x = f1(Math.cos(r) * len * 0.8), y = f1(Math.sin(r) * len * 0.8);
  return `<circle cx="${x}" cy="${y}" r="3.6" fill="#fffdf6" opacity=".9"></circle><circle cx="${x}" cy="${y}" r="2.6" fill="${MJ_GREEN}"></circle><circle cx="${x}" cy="${y}" r="1.1" fill="${MJ_RED}"></circle>`;
};

const COVERT = "M-5 2C-7-6 1-12 11-11C14-4 9 2 2 4Z";
// Wings are drawn upward from the shoulder, so a negative scaleY sweeps them down past the body.
const NEAR = [[-80, 28], [-66, 35], [-52, 38], [-38, 36], [-24, 31], [-10, 25]];
const FAR = [[-96, 24], [-82, 30], [-68, 33], [-54, 31], [-40, 26]];
const TAIL = [[-30, 36], [-15, 42], [0, 45], [15, 42], [30, 36]];

const MJBIRD =
  `<g transform="translate(12 -8)"><g class="xwing xwf">${feathers(FAR, 6.4, [MJ_FAR, "#666d7c"])}<path d="${COVERT}" fill="${MJ_FAR}"></path></g></g>`
  + `<g transform="translate(24 0)"><g class="xtail">${feathers(TAIL, 9.5, [MJ_INK, MJ_INK_2])}${TAIL.map(([d, l]) => tailEye(d, l)).join("")}</g></g>`
  + `<path d="M6 12C9 16 12 18 17 19M10 13C11 17 13 20 16 22M17 19L21 18M17 19L20 21M16 22L19 23" stroke="${MJ_RED}" stroke-width="1.8" stroke-linecap="round" fill="none"></path>`
  + `<path d="M-14-2C-21-8-22-16-20-22L-11-24C-11-17-9-11-3-8Z" fill="url(#mjBody)"></path>`
  + `<ellipse cx="4" cy="1" rx="22" ry="13" fill="url(#mjBody)"></ellipse>`
  + `<path d="M-15 5C-4 13 12 14 23 6C15 12 4 14-4 13C-9 12-13 9-15 5Z" fill="#d6d0c2"></path>`
  + `<g stroke="#d6d0c2" stroke-width="1" fill="none"><path d="M-12 4C-2 9 10 10 20 5M-8 8C0 11 8 11 16 8"></path></g>`
  + `<g class="xcrest"><path d="M-17-29C-18-33-17-37-15-40M-14-29C-13-33-11-36-8-38M-12-28C-9-31-6-32-3-32" stroke="${MJ_GREEN}" stroke-width="1.2" fill="none" stroke-linecap="round"></path>`
  + `<circle cx="-15" cy="-40" r="2" fill="${MJ_GREEN}"></circle><circle cx="-8" cy="-38" r="2" fill="${MJ_GREEN}"></circle><circle cx="-3" cy="-32" r="2" fill="${MJ_GREEN}"></circle></g>`
  + `<circle cx="-17" cy="-24" r="6.6" fill="#fffdf6"></circle>`
  + `<path d="M-22.5-26L-32-23.6L-22.5-22.4Z" fill="${MJ_RED}"></path><path d="M-22.5-23.8L-29-23.5" stroke="#b44a3e" stroke-width=".7" stroke-linecap="round"></path>`
  + `<circle cx="-18.5" cy="-25.5" r="1.9" fill="#1d2a36"></circle><circle cx="-18.1" cy="-26.1" r=".6" fill="#fff"></circle>`
  + `<g transform="translate(4 -8)"><g class="xwing">${feathers(NEAR, 6.4, [MJ_INK, MJ_INK_2])}<path d="${COVERT}" fill="${MJ_INK_2}"></path><path d="${COVERT}" fill="url(#mjLattice)"></path></g></g>`;

// Starts just off the right edge; with motion reduced it never enters the frame.
export const BIRD = `<g transform="translate(1640 285)"><g class="xmj"><g class="xmjbob"><g transform="scale(1.35)">${MJBIRD}</g></g></g></g>`;
