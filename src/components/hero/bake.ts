// The design applies `filter: saturate(.74) brightness(1.02)` to the whole scene. As a CSS filter Chrome re-runs
// it across the full scene on every animation frame, so the colours are graded here instead, in sRGB (which
// matches Chrome's own output exactly).

const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
const S = 0.74, B = 1.02;

export function grade(hex: string) {
  const h = hex.length === 4 ? hex.replace(/^#(.)(.)(.)$/, "#$1$1$2$2$3$3") : hex;
  const [r, g, b] = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const out = [
    (0.213 + 0.787 * S) * r + (0.715 - 0.715 * S) * g + (0.072 - 0.072 * S) * b,
    (0.213 - 0.213 * S) * r + (0.715 + 0.285 * S) * g + (0.072 - 0.072 * S) * b,
    (0.213 - 0.213 * S) * r + (0.715 - 0.715 * S) * g + (0.072 + 0.928 * S) * b,
  ];
  return "#" + out.map(v => clamp(v * B).toString(16).padStart(2, "0")).join("");
}

const HEX = "#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![0-9a-zA-Z])";
const ATTR = new RegExp(`((?:fill|stroke|stop-color|flood-color)=")(${HEX})`, "g");
const STYLE = new RegExp(`((?:fill|stroke|stop-color|background|color):\\s*)(${HEX})`, "g");

export const gradeMarkup = (s: string) => s.replace(ATTR, (_, a, c) => a + grade(c)).replace(STYLE, (_, a, c) => a + grade(c));

type Top = { tag: string; id?: string; el: string };

export function splitTop(src: string): Top[] {
  const out: Top[] = [];
  let i = 0;
  while (i < src.length) {
    const head = /<([a-zA-Z]+)\b[^>]*?(\/?)>/y;
    head.lastIndex = i;
    const r = head.exec(src);
    if (!r) { i++; continue; }
    let j = head.lastIndex;
    if (!r[2]) {
      const re = new RegExp(`<(/?)${r[1]}\\b[^>]*?(/?)>`, "g");
      re.lastIndex = i;
      let depth = 0, x;
      while ((x = re.exec(src))) {
        if (x[1]) depth--; else if (!x[2]) depth++;
        if (!depth) { j = re.lastIndex; break; }
      }
    }
    const el = src.slice(i, j);
    out.push({ tag: r[1], id: el.match(/^<[^>]*\sid="([^"]+)"/)?.[1], el });
    i = j;
  }
  return out;
}

const UNGRADED_TAGS = new Set(["mask", "clipPath", "filter"]);
const UNGRADED_ID = /^(whG|lpU\d|mkRB\d|rbF\d)$/;

const FROZEN = "__f";

// Copies a symbol under a new id: nested ids are dropped (no duplicates) and nested <use>s point at the same variant.
const variant = (el: string, suffix: string) => el
  .replace(/^<g\b[^>]*?\sid="([^"]+)"/, (m, id) => m.replace(`id="${id}"`, `id="${id}${suffix}"`))
  .replace(/(<[^>]+?)\sid="[^"]*"/g, (m, a, off) => (off === 0 ? m : a))
  .replace(/\sclass="[^"]*"/g, "")
  .replace(/href="#([\w-]+)"/g, `href="#$1${suffix}"`);

// Grades the defs used by the scene and adds animation-free copies of the symbols that are drawn still.
export function bakeDefs(defs: string, frozen: Iterable<string>) {
  // The handoff defines flogoM twice; references always resolve to the first, so later duplicates are dropped.
  const seen = new Set<string>();
  const tops = splitTop(defs).filter(t => !t.id || (!seen.has(t.id) && seen.add(t.id)));
  const byId = new Map(tops.filter(t => t.id).map(t => [t.id!, t]));
  const closure = (ids: Iterable<string>) => {
    const need = new Set<string>();
    const stack = [...ids];
    while (stack.length) {
      const id = stack.pop()!;
      const t = byId.get(id);
      if (need.has(id) || t?.tag !== "g") continue;
      need.add(id);
      for (const m of t.el.matchAll(/href="#([\w-]+)"/g)) stack.push(m[1]);
    }
    return [...need].map(id => byId.get(id)!.el);
  };
  const isGraded = (t: Top) => !UNGRADED_TAGS.has(t.tag) && !(t.id && UNGRADED_ID.test(t.id));
  const graded = tops.map(t => (isGraded(t) ? gradeMarkup(t.el) : t.el)).join("");
  const still = closure(frozen).map(el => variant(gradeMarkup(el), FROZEN)).join("");
  return graded + still;
}

export const frozen = (href: string) => href + FROZEN;

const refs = (s: string) => [...s.matchAll(/(?:href="#|url\(#)([\w-]+)/g)].map(m => m[1]);

// Keeps only the defs that the given markup (and the defs themselves) still reference: once the still layers are
// images, most symbols have nothing left to draw.
export function pruneDefs(defs: string, used: string) {
  const tops = splitTop(defs);
  const byId = new Map(tops.filter(t => t.id).map(t => [t.id!, t]));
  const keep = new Set<string>();
  const stack = refs(used);
  while (stack.length) {
    const id = stack.pop()!;
    if (keep.has(id) || !byId.has(id)) continue;
    keep.add(id);
    stack.push(...refs(byId.get(id)!.el));
  }
  return tops.filter(t => !t.id || keep.has(t.id)).map(t => t.el).join("");
}
