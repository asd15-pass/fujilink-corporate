export type Shape = { d: string; f: string; o: number; s?: string; w?: number };
export type Prop = { h: string; m: string };
export type Walk = { x: number; y: number; h: string; tr: string; st: string };
type Item = { key: number; sh: Shape[]; props: Prop[]; walk: Walk[]; op: number };

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Projection = {
  K: number;
  ground: Shape[];
  layers: { items: Item[]; movers: unknown[] }[];
  P: (u: number, v: number, z?: number) => [number, number];
  P0: (u: number, v: number, z?: number) => [number, number];
  at: (u: number, v: number, z?: number) => [number, number];
  fl: (A: Shape[], u: number, v: number, W: number, D: number, f: string, z?: number, o?: number) => void;
  bx: (A: Shape[], u: number, v: number, W: number, D: number, H: number, c: string | string[], z0?: number, pr?: any) => void;
  fL: (A: Shape[], u1: number, u2: number, v: number, z1: number, z2: number, c: string, o?: number) => void;
  fR: (A: Shape[], u: number, v1: number, v2: number, z1: number, z2: number, c: string, o?: number) => void;
  ln: (A: Shape[], pts: [number, number][], s: string, w: number, o?: number) => void;
  cyl: (A: Shape[], cu: number, cv: number, r: number, H: number, c: string, z0?: number, o?: Record<string, unknown>) => void;
  dome: (A: Shape[], cu: number, cv: number, r: number, z: number, c: string, op?: number) => void;
  item: (key: number, g: number, blk?: number) => Item;
  prop: (it: Item, h: string, u: number, v: number, z?: number, s?: number) => void;
  bld: (o: Record<string, any>) => Item;
};

export type HeroGeo = {
  mk: (OX: number, OY: number, K: number, NL: number, ZF?: number, WP?: (t: number) => number) => Projection;
  lt: (c: string, k?: number) => string;
  dk: (c: string, k?: number) => string;
  merge: (A: Shape[]) => Shape[];
  rim: Prop[];
  sky: { y: number; s: number; st: string }[];
  isle: {
    sh: Shape[];
    props: Prop[];
    fall: string;
    bridge: string;
    deck: string;
    petals: { x: number; y: number; st: string }[];
    blan: { m: string }[];
    islet: { sh: Shape[]; props: Prop[] };
  };
  S: {
    ground: Shape[];
    waves: { d: string; c: string }[];
    ships?: { st: string; h: string; m: string }[];
    isleHex: string;
    shipLine: number;
    layers: {
      items: Item[];
      movers: { x: number; y: number; sh: Shape[]; props: Prop[]; st: string; clip: string }[];
    }[];
  };
};

export function buildGeo(props: { pattern: string; svcText: boolean; v05: string }): HeroGeo;
