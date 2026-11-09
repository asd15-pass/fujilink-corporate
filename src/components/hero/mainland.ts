import type { HeroGeo, Shape, Prop, Walk } from "./geo";

// The town around the island, built with the island's own projection helpers (geo's mk) so angle, scale,
// palette and outlines match. Coordinates are in island units: the sea ring ends at u = -80 / v = -80, so the
// mainland is the L-shaped band behind it. The island's warp is replaced by the affine map that lands on the
// sea plate's corners, which keeps the quay edges flush with the sea.

const WD = 88 * 0.6;
const SEA = -80;
const STRETCH = (692 + 2 * WD - SEA) / (692 - SEA);
const FAR = -720;
const END = 692;

export type Mainland = {
  ground: Shape[];
  items: { key: number; sh: Shape[]; props: Prop[]; walk: Walk[]; op: number }[];
  boats: { m: string; h?: string; sh?: Shape[]; st: string }[];
  walkers: Walk[];
};

export function buildMainland(g: HeroGeo): Mainland {
  const S = g.mk(800, 372 - 0.9 * WD + 0.9 * 18, 0.9, 1, 1.45, (t: number) => SEA + (t - SEA) * STRETCH);
  const G = S.ground;
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const pick = <T,>(a: T[]) => a[Math.floor(rnd() * a.length)];
  const r1 = (n: number) => Math.round(n * 10) / 10;
  const PS = 0.31;

  const WALL = ["#fffaf0", "#f6eedd", "#f2e6cf", "#e9dcc4", "#fbe6d4", "#eef3f6"];
  const BRIGHT = ["#F2B48C", "#e3b04b", "#cbc3e3", "#a9d4e6", "#f5a3b4", "#b9dcc4", "#e8b77a"];
  const ROOF = ["#E8614F", "#58A6DC", "#8f7cc4", "#2f9cb0", "#e39a3a", "#c0496a", "#4f5d70", "#3a7d5c", "#c0583c"];
  const AWN = ["#E8614F", "#2f9c8f", "#F5C842", "#58A6DC", "#c0496a", "#8f7cc4"];
  const WIN = ["#cfe8f3", "#bfe0ee", "#fff4d6", "#ffe7b0"];
  const PAVE = "#f3e8d2", STREET = "#d9d2c3", ROAD = "#b6bbc3", GRASS = "#a9d78a", WATER = "#5fb4cf";

  const walkers: Walk[] = [];
  const boats: Mainland["boats"] = [];

  // ---- land plate, quay walls and the two canals
  const land = (pts: [number, number][]) => G.push({ d: "M" + pts.map(([u, v]) => S.at(u, v, 0).join(" ")).join("L") + "Z", f: "#efe3c8", o: 1, s: "none", w: 0 });
  land([[FAR, FAR], [END, FAR], [END, SEA], [SEA, SEA], [SEA, END], [FAR, END]]);
  const QH = -12, CL = 300, CR = 326, CU = 452, CU2 = 474;
  for (const [a, b] of [[SEA, CL], [CR, END]]) { S.fR(G, SEA, a, b, QH, 0, "#c7b28d"); S.fR(G, SEA, a, b, -1.2, 0, "#e6d8b8"); }
  for (const [a, b] of [[SEA, CU], [CU2, END]]) { S.fL(G, a, b, SEA, QH, 0, "#d8c6a2"); S.fL(G, a, b, SEA, -1.2, 0, "#efe3c8"); }
  S.fL(G, FAR, SEA, END, QH, 0, "#d8c6a2");
  S.fR(G, END, FAR, SEA, QH, 0, "#c7b28d");
  S.fl(G, FAR, CL, SEA - FAR, CR - CL, "#3a8fb0", -9);
  S.fl(G, FAR, CL + 2, SEA - FAR, CR - CL - 4, WATER, -9);
  S.fL(G, FAR, SEA, CL, -9, 0, "#c7b28d");
  S.fl(G, CU, FAR, CU2 - CU, SEA - FAR, "#3a8fb0", -9);
  S.fl(G, CU + 2, FAR, CU2 - CU - 4, SEA - FAR, WATER, -9);
  S.fR(G, CU, FAR, SEA, -9, 0, "#b9a37e");

  // ---- streets: promenade on the quay, then two streets per band, cross streets
  const strip = (u: number, v: number, W: number, D: number, c: string) => S.fl(G, u, v, W, D, c, 0.2);
  strip(SEA - 26, SEA, 26, CL - SEA, PAVE); strip(SEA - 26, CR, 26, END - CR, PAVE);
  strip(SEA, SEA - 26, CU - SEA, 26, PAVE); strip(CU2, SEA - 26, END - CU2, 26, PAVE);
  strip(SEA - 26, SEA - 26, 26, 26, PAVE);
  for (let v = SEA + 6; v < END; v += 9) if (v < CL - 2 || v > CR + 2) S.ln(G, [S.P(SEA - 1, v, 0.3), S.P(SEA - 1, v, 4)], "#b9a37e", 0.8);
  for (let u = SEA + 6; u < END; u += 9) if (u < CU - 2 || u > CU2 + 2) S.ln(G, [S.P(u, SEA - 1, 0.3), S.P(u, SEA - 1, 4)], "#b9a37e", 0.8);
  S.ln(G, [S.P(SEA - 1, SEA - 1, 4), S.P(SEA - 1, CL - 2, 4)], "#d8c6a2", 1.2); S.ln(G, [S.P(SEA - 1, CR + 2, 4), S.P(SEA - 1, END, 4)], "#d8c6a2", 1.2);
  S.ln(G, [S.P(SEA - 1, SEA - 1, 4), S.P(CU - 2, SEA - 1, 4)], "#d8c6a2", 1.2); S.ln(G, [S.P(CU2 + 2, SEA - 1, 4), S.P(END, SEA - 1, 4)], "#d8c6a2", 1.2);

  const road = (u: number, v: number, W: number, D: number) => {
    S.fl(G, u, v, W, D, ROAD, 0.2);
    const along = D > W;
    for (let k = 6; k < (along ? D : W) - 6; k += 16) {
      if (along) S.fl(G, u + W / 2 - 0.6, v + k, 1.2, 7, "#f4f1ea", 0.3);
      else S.fl(G, u + k, v + D / 2 - 0.6, 7, 1.2, "#f4f1ea", 0.3);
    }
  };
  const walk = (u: number, v: number, W: number, D: number) => strip(u, v, W, D, STREET);
  // left band (u < -80): streets run along v
  const L1 = [-176, -158], L2 = [-286, -268];
  walk(-180, SEA, 26, END - SEA); road(L1[0], SEA, L1[1] - L1[0], END - SEA);
  walk(-290, SEA, 26, END - SEA); road(L2[0], SEA, L2[1] - L2[0], END - SEA);
  // right band (v < -80): streets run along u
  walk(SEA, -180, END - SEA, 26); road(SEA, L1[0], END - SEA, L1[1] - L1[0]);
  walk(SEA, -290, END - SEA, 26); road(SEA, L2[0], END - SEA, L2[1] - L2[0]);
  // the corner block joins the two bands
  walk(-290, -290, 26, 210); walk(-290, -290, 210, 26);
  road(L2[0], L2[0], 18, SEA - L2[0]); road(L2[0], L2[0], SEA - L2[0], 18);
  // cross streets
  for (const v of [96, 520]) { walk(FAR, v - 4, SEA - FAR - 26, 26); road(FAR, v, SEA - FAR - 26, 18); }
  for (const u of [140, 600]) { walk(u - 4, FAR, 26, SEA - FAR - 26); road(u, FAR, 18, SEA - FAR - 26); }

  // bridges over the canals (deck + rails)
  const bridgeU = (u: number, W: number) => { S.bx(G, u, CL - 3, W, CR - CL + 6, 1.6, ["#e6d8b8", "#c9b48f", "#b49d78"], -0.6); S.ln(G, [S.P(u, CL - 2, 4), S.P(u, CR + 2, 4)], "#fffaf0", 1.2); S.ln(G, [S.P(u + W, CL - 2, 4), S.P(u + W, CR + 2, 4)], "#fffaf0", 1.2); };
  const bridgeV = (v: number, D: number) => { S.bx(G, CU - 3, v, CU2 - CU + 6, D, 1.6, ["#e6d8b8", "#c9b48f", "#b49d78"], -0.6); S.ln(G, [S.P(CU - 2, v, 4), S.P(CU2 + 2, v, 4)], "#fffaf0", 1.2); S.ln(G, [S.P(CU - 2, v + D, 4), S.P(CU2 + 2, v + D, 4)], "#fffaf0", 1.2); };
  bridgeU(SEA - 26, 26); bridgeU(-180, 26); bridgeU(-290, 26);
  bridgeV(SEA - 26, 26); bridgeV(-180, 26); bridgeV(-290, 26);

  // ---- helpers
  const item = (key: number) => S.item(key, 0, 0);
  const tree = (u: number, v: number, s = 1, h = "#tr") => { const it = item(u + v); S.prop(it, h, u, v, 0, s); return it; };
  const person = (u: number, v: number, n: number) => { const it = item(u + v + 0.5); const p = S.at(u, v, 0); it.props.push({ h: "#p" + n, m: `translate(${p[0]} ${r1(p[1] - 15 * PS)}) scale(${PS})` }); };
  const walker = (u: number, v: number, du: number, dv: number, t: number, d: number) => {
    const p0 = S.at(u, v, 0); const [dx, dy] = S.P(u + du, v + dv, 0).map((x: number, i: number) => x - S.P(u, v, 0)[i]);
    walkers.push({ x: p0[0], y: r1(p0[1] - 15 * PS), h: "#p" + (1 + Math.floor(rnd() * 6)), tr: `scale(${PS})`, st: `--dx:${r1(dx)}px;--dy:${r1(dy)}px;--t:${t}s;--d:${d}s;--f:${dx >= 0 ? 1 : -1}` });
  };
  const lamp = (u: number, v: number) => { const it = item(u + v); S.prop(it, "#lampP", u, v, 0, 0.85); };
  const bench = (u: number, v: number, alongV: boolean) => S.bx(item(u + v).sh, u, v, alongV ? 3 : 9, alongV ? 9 : 3, 2.2, "#a8743d");
  const bed = (u: number, v: number) => { const it = item(u + v); S.prop(it, "#fbed", u, v, 0, 0.8); };
  const house = (u: number, v: number, W: number, D: number, o: Record<string, unknown> = {}) => {
    const H = 12 + Math.floor(rnd() * 3) * 5;
    const roof = pick(["gu", "gv", "hip", "gu"]);
    return S.bld({ u, v, W, D, H, c: rnd() < 0.3 ? pick(BRIGHT) : pick(WALL), roof, rh: roof === "hip" ? 8 : 9 + rnd() * 4, rc: pick(ROOF), ov: 2.5, wl: [Math.max(1, Math.round(W / 11)), 1, 4, H - 3], wr: [Math.max(1, Math.round(D / 11)), 1, 4, H - 3], wc: pick(WIN), door: rnd() < 0.6 ? 0.3 + rnd() * 0.4 : undefined, g: 0, ...o });
  };
  const shop = (u: number, v: number, W: number, D: number, o: Record<string, unknown> = {}) => {
    const H = 14 + Math.floor(rnd() * 3) * 6;
    return S.bld({ u, v, W, D, H, c: rnd() < 0.5 ? pick(BRIGHT) : pick(WALL), awn: pick(AWN), awnZ: 10, show: [3, W - 3, 0, 8], wl: [Math.max(1, Math.round(W / 10)), 1, 12, H - 2], wr: [Math.max(1, Math.round(D / 10)), 1, 12, H - 2], wc: pick(WIN), par: 1, band: rnd() < 0.4 ? pick(AWN) : undefined, g: 0, ...o });
  };
  const flat = (u: number, v: number, W: number, D: number, H: number, c: string) =>
    S.bld({ u, v, W, D, H, c, wl: [Math.max(1, Math.round(W / 9)), Math.max(1, Math.round(H / 12)), 4, H - 4], wr: [Math.max(1, Math.round(D / 9)), Math.max(1, Math.round(H / 12)), 4, H - 4], wc: pick(WIN), par: 1, ru: H > 30 && rnd() < 0.5 ? 1 : undefined, g: 0 });
  const far = (u: number, v: number, W: number, D: number) => {
    const H = 10 + Math.floor(rnd() * 4) * 6;
    if (rnd() < 0.55) return S.bld({ u, v, W, D, H, c: pick(WALL), roof: pick(["gu", "gv", "hip"]), rh: 8, rc: pick(ROOF), ov: 2, g: 0 });
    return S.bld({ u, v, W, D, H: H + 8, c: rnd() < 0.3 ? pick(BRIGHT) : pick(WALL), wl: [Math.max(1, Math.round(W / 12)), 2, 5, H + 4], wr: [Math.max(1, Math.round(D / 12)), 2, 5, H + 4], wc: pick(WIN), par: 1, band: rnd() < 0.3 ? pick(AWN) : undefined, g: 0 });
  };
  // a garden plot breaking up a row: lawn, a tree or two, sometimes flowers
  const garden = (u: number, v: number, W: number, D: number) => {
    S.fl(G, u, v, W, D, GRASS, 0.25);
    tree(u + W * 0.35, v + D * 0.4, 0.9 + rnd() * 0.3, pick(["#tr", "#tr2", "#sak"]));
    if (rnd() < 0.6) tree(u + W * 0.75, v + D * 0.7, 0.75, "#tr2");
    if (rnd() < 0.5) bed(u + W * 0.7, v + D * 0.25);
  };

  // fills a lot with a row of buildings along one axis, leaving irregular gaps for gardens and trees
  const lot = (u0: number, u1: number, v0: number, v1: number, kind: "shop" | "house" | "mix", alongV: boolean) => {
    const depth = alongV ? u1 - u0 : v1 - v0;
    let p = alongV ? v0 : u0; const end = alongV ? v1 : u1;
    while (p < end - 14) {
      const w = Math.min(end - p - 2, 18 + Math.floor(rnd() * 16));
      if (w < 14) break;
      const d = Math.min(depth - 4, 20 + Math.floor(rnd() * 10));
      const off = depth - d - 2 - Math.floor(rnd() * 3);
      const [u, v, W, D] = alongV ? [u0 + off, p, d, w] : [p, v0 + off, w, d];
      const k = kind === "mix" ? (rnd() < 0.45 ? "shop" : "house") : kind;
      const r = rnd();
      if (r < 0.16) garden(u, v, W, D);
      else if (r < 0.26 && k === "house") flat(u, v, W, D, 26 + Math.floor(rnd() * 3) * 6, pick([...WALL, ...BRIGHT]));
      else (k === "shop" ? shop : house)(u, v, W, D);
      p += w + 3 + Math.floor(rnd() * 4);
    }
  };

  // ---- A. left band: harbour town and shopping street
  // promenade furniture
  for (const v of [-40, 30, 150, 236, 360, 430, 560, 640]) lamp(SEA - 6, v);
  for (const v of [8, 190, 400, 600]) bench(SEA - 14, v, true);
  for (const [v, h] of [[-58, "#sak"], [70, "#tr"], [118, "#tr2"], [270, "#sak"], [348, "#tr"], [470, "#tr2"], [586, "#sak"], [668, "#tr"]] as const) tree(SEA - 20, v, 0.85, h);
  for (const [v, n] of [[54, 2], [212, 5], [382, 3], [618, 6]] as const) person(SEA - 12, v, n);
  walker(SEA - 10, -20, 0, 120, 28, -4); walker(SEA - 16, 380, 0, -50, 22, -11); walker(SEA - 9, 560, 0, 90, 26, -17);
  // piers into the sea with moored boats
  for (const v of [40, 236, 560]) {
    S.bx(G, SEA, v, 34, 10, 1.6, ["#c9955a", "#a8743d", "#8a5c2e"], -3);
    for (let k = 3; k < 34; k += 5) S.ln(G, [S.P(SEA + k, v, -1.4), S.P(SEA + k, v + 10, -1.4)], "#a8743d", 0.8);
    for (const k of [10, 22, 32]) S.ln(G, [S.P(SEA + k, v + 10, -1.4), S.P(SEA + k, v + 10, -10)], "#7a5a3a", 1.4);
  }
  const boatAt = (u: number, v: number, kind: "sail" | "row", c: string, d: number) => {
    const p = S.at(u, v, -12);
    if (kind === "sail") boats.push({ m: `translate(${p[0]} ${p[1]}) scale(.55)`, h: "#sailb", st: `animation-delay:${d}s` });
    else { const A: Shape[] = []; S.bx(A, -9, -4, 18, 8, 2.4, ["#ffffff", "#f4f1ea", "#dcd8cf"], 0, S.P0); S.bx(A, -9, -4, 18, 8, 0.9, c, 0, S.P0); boats.push({ m: `translate(${p[0]} ${p[1]})`, sh: g.merge(A), st: `animation-delay:${d}s` }); }
  };
  boatAt(SEA + 18, 58, "row", "#E8614F", -0.4); boatAt(SEA + 26, 26, "sail", "", -1.3);
  boatAt(SEA + 20, 254, "row", "#58A6DC", -2.1); boatAt(SEA + 14, 222, "row", "#F5C842", -0.9);
  boatAt(SEA + 24, 578, "sail", "", -1.8); boatAt(SEA + 16, 546, "row", "#2f9c8f", -2.6);

  // seafront row: cafes with terraces and a small square
  lot(-150, -110, SEA + 4, 92, "shop", true);
  lot(-150, -110, 126, 214, "shop", true);
  { // square with a fountain and terrace tables
    S.fl(G, -150, 222, 44, 72, "#e6dcc8", 0.25);
    for (let k = 0; k < 72; k += 9) S.fl(G, -150, 222 + k, 44, 0.7, "#d6cab2", 0.3);
    const it = item(-128 + 258); S.prop(it, "#ftn", -128, 258, 0, 0.7);
    for (const [u, v] of [[-142, 230], [-116, 232], [-140, 284], [-114, 286]]) { const t = item(u + v); S.cyl(t.sh, u, v, 2.6, 4.5, "#fffaf0", 0, { n: 10 }); S.prop(t, "#kasa", u, v, 4.5, 0.55); }
    tree(-148, 252, 0.8, "#tr2"); tree(-108, 290, 0.8, "#sak"); bed(-108, 226);
  }
  lot(-150, -110, 334, 512, "shop", true);
  lot(-150, -110, 546, END - 4, "mix", true);
  // second row: colourful houses mixed with shops, a church-like tower as a local landmark
  lot(-260, -182, SEA + 4, 92, "mix", true);
  {
    S.bld({ u: -236, v: 128, W: 30, D: 26, H: 26, c: "#f6eedd", roof: "gv", rh: 16, rc: "#3a7d5c", ov: 3, wl: [2, 2, 5, 22], wr: [2, 2, 5, 22], wc: "#cfe8f3", door: 0.5, band: "#c9a24a", g: 0 });
    S.bld({ u: -252, v: 132, W: 12, D: 12, H: 56, c: "#f6eedd", roof: "hip", rh: 14, rc: "#3a7d5c", ov: 2, wl: [1, 3, 10, 52], wr: [1, 3, 10, 52], wc: "#ffe7b0", band: "#c9a24a", g: 0 });
    tree(-200, 150, 0.9, "#tr"); tree(-204, 172, 0.8, "#tr2");
  }
  lot(-260, -182, 180, 296, "house", true);
  lot(-260, -182, 334, 512, "mix", true);
  lot(-260, -182, 546, END - 4, "house", true);
  // back rows get simpler: fewer details the further they are from the island
  for (const [u0, u1] of [[-380, -292], [-500, -392], [-620, -512]]) for (const [v0, v1] of [[SEA + 4, 92], [126, 296], [334, 512], [546, END - 4]]) {
    let v = v0;
    while (v < v1 - 16) { const w = 20 + Math.floor(rnd() * 18); if (v + w > v1) break; if (rnd() < 0.12) tree(u1 - 18, v + w / 2, 1, "#tr"); else far(u0 + 6 + Math.floor(rnd() * 8), v, u1 - u0 - 16 - Math.floor(rnd() * 10), w); v += w + 4 + Math.floor(rnd() * 5); }
  }
  // canal side trees
  for (const u of [-130, -214, -240, -330, -360, -430]) { tree(u, CL - 6, 0.8, pick(["#tr", "#sak", "#tr2"])); }

  // ---- C. right band: residential streets and a park on the water
  for (const u of [-30, 60, 190, 300, 400, 520, 640]) lamp(u, SEA - 6);
  for (const u of [24, 250, 560]) bench(u, SEA - 14, false);
  for (const [u, h] of [[-10, "#sak"], [96, "#sak"], [212, "#tr"], [350, "#sak"], [500, "#tr2"], [610, "#sak"], [676, "#tr"]] as const) tree(u, SEA - 20, 0.85, h);
  for (const [u, n] of [[40, 4], [330, 1], [580, 3]] as const) person(u, SEA - 12, n);
  walker(10, SEA - 11, 110, 0, 30, -7); walker(380, SEA - 15, -60, 0, 24, -13); walker(540, SEA - 9, 80, 0, 27, -3);
  // houses on the first row, with garden gaps
  lot(SEA + 4, 134, -150, -110, "house", false);
  // the park: lawn, pond with a bridge, paths, cherry trees
  {
    const u0 = 166, u1 = 440, v0 = -152, v1 = -106;
    S.fl(G, u0, v0, u1 - u0, v1 - v0, GRASS, 0.25);
    S.fl(G, u0, -134, u1 - u0, 6, PAVE, 0.3);
    S.fl(G, 300, v0, 6, v1 - v0, PAVE, 0.3);
    S.fl(G, 214, -150, 60, 14, "#3a8fb0", 0.3); S.fl(G, 216, -149, 56, 12, "#7fd0de", 0.35);
    S.fl(G, 336, -128, 70, 20, "#3a8fb0", 0.3); S.fl(G, 338, -127, 66, 18, "#7fd0de", 0.35);
    S.bx(G, 362, -130, 12, 24, 1.4, ["#c9955a", "#a8743d", "#8a5c2e"], 0.4);
    for (const [u, v, h, s] of [[178, -148, "#sak", 0.9], [196, -116, "#sak", 1], [250, -112, "#tr", 0.9], [284, -150, "#sak", 0.8], [322, -146, "#tr2", 0.9], [420, -150, "#sak", 1], [428, -112, "#tr", 0.85], [186, -128, "#tr2", 0.7]] as const) tree(u, v, s, h);
    for (const [u, v] of [[240, -126], [314, -118], [392, -140]]) bed(u, v);
    bench(268, -128, false); bench(318, -128, false);
    person(236, -130, 5); person(330, -132, 2);
    walker(176, -131, 110, 0, 26, -9);
  }
  lot(452, 590, -150, -110, "house", false);
  lot(606, END - 4, -150, -110, "shop", false);
  // second row: low-rise shops facing the street, then houses
  lot(SEA + 4, 134, -260, -182, "shop", false);
  lot(166, 440, -260, -182, "house", false);
  lot(482, 590, -260, -182, "mix", false);
  lot(626, END - 4, -260, -182, "house", false);
  for (const [v0, v1] of [[-380, -292], [-500, -392], [-620, -512]]) for (const [u0, u1] of [[SEA + 4, 134], [166, CU - 4], [CU2 + 6, 590], [626, END - 4]]) {
    let u = u0;
    while (u < u1 - 16) { const w = 20 + Math.floor(rnd() * 18); if (u + w > u1) break; if (rnd() < 0.14) tree(u + w / 2, v1 - 18, 1, pick(["#tr", "#sak"])); else far(u, v0 + 6 + Math.floor(rnd() * 8), w, v1 - v0 - 16 - Math.floor(rnd() * 10)); u += w + 4 + Math.floor(rnd() * 5); }
  }
  for (const v of [-130, -214, -240, -330, -380]) tree(CU - 6, v, 0.8, pick(["#tr", "#sak"]));

  // ---- B. corner: civic square behind the island's station
  {
    S.fl(G, -154, -154, 74, 74, "#e6dcc8", 0.25);
    for (let k = 0; k < 74; k += 10) { S.fl(G, -154 + k, -154, 0.7, 74, "#d6cab2", 0.3); S.fl(G, -154, -154 + k, 74, 0.7, "#d6cab2", 0.3); }
    S.fl(G, -134, -134, 34, 34, GRASS, 0.32);
    const it = item(-117 * 2); S.prop(it, "#ftn", -117, -117, 0, 0.75);
    tree(-150, -112, 0.9, "#tr"); tree(-112, -150, 0.9, "#tr"); tree(-96, -96, 0.8, "#sak");
    bed(-140, -96); bed(-96, -140);
    person(-126, -100, 1); person(-100, -124, 6);
  }
  // city hall with a dome, offices around it
  {
    const h = S.bld({ u: -262, v: -262, W: 70, D: 70, H: 30, c: "#f6eedd", cols: ["#fffaf0", "#f6eedd", "#dccfb6"], wl: [6, 2, 6, 26], wr: [6, 2, 6, 26], wc: "#cfe8f3", par: 1, band: "#c9a24a", door: 0.5, g: 0 });
    S.cyl(h.sh, -227, -227, 14, 10, "#f6eedd", 30, { n: 16 });
    S.dome(h.sh, -227, -227, 14, 40, "#58A6DC");
    S.prop(h, "#flag", -227, -227, 58, 0.9);
  }
  flat(-178, -262, 22, 34, 46, "#e9dcc4"); flat(-262, -178, 34, 22, 40, "#eef3f6");
  flat(-176, -220, 20, 20, 28, "#cbc3e3"); flat(-220, -176, 20, 20, 24, "#f2e6cf");
  for (const [u, v, W, D, H, c] of [[-380, -262, 40, 30, 58, "#e9dcc4"], [-262, -380, 30, 40, 64, "#eef3f6"], [-372, -372, 44, 44, 82, "#cfe8f3"], [-470, -300, 34, 34, 44, "#f2e6cf"], [-300, -470, 34, 34, 50, "#e9dcc4"], [-480, -420, 40, 40, 70, "#eef3f6"], [-420, -480, 40, 40, 56, "#f6eedd"]] as const) flat(u, v, W, D, H, c);
  for (const [u, v] of [[-196, -150], [-150, -196], [-196, -110], [-110, -196]]) tree(u, v, 0.85, "#tr2");

  return { ground: G, items: S.layers[0].items, boats, walkers };
}
