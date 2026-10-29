type Shape = { d: string; f: string; o: number; s?: string; w?: number };
type Prop = { h: string; m: string };
type Walk = { x: number; y: number; h: string; tr: string; st: string };

export type HeroGeo = {
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
      items: { sh: Shape[]; props: Prop[]; walk: Walk[]; op: number }[];
      movers: { x: number; y: number; sh: Shape[]; props: Prop[]; st: string; clip: string }[];
    }[];
  };
};

export function buildGeo(props: { pattern: string; svcText: boolean; v05: string }): HeroGeo;
