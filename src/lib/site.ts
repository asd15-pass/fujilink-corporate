export type Service = {
  slug: string;
  tag?: string;
  name: string;
  en: string;
  color: string;
  tint: string;
  items: string[];
};

export const SERVICES: Service[] = [
  { slug: "interior", tag: "内装", name: "内外装工事", en: "INTERIOR", color: "#e8c21a", tint: "#fbf3d0", items: ["店舗内装", "外装改修", "オフィス"] },
  { slug: "sign", tag: "サイン", name: "看板・サイン", en: "SIGN", color: "#ec8aa3", tint: "#fce6ec", items: ["屋外看板", "LEDサイン", "館内サイン"] },
  { slug: "display", tag: "ディスプレイ", name: "店舗ディスプレイ", en: "DISPLAY", color: "#f0a46a", tint: "#fdeadb", items: ["什器", "VMD", "ウィンドウ"] },
  { slug: "design", tag: "設計", name: "設計", en: "DESIGN", color: "#6cb4e4", tint: "#e2f0fa", items: ["店舗設計", "図面作成", "各種申請"] },
  { slug: "event", tag: "イベント", name: "イベント企画・提案", en: "EVENT", color: "#e8503f", tint: "#fbe2de", items: ["企画", "ブース施工", "運営"] },
  { slug: "construction", name: "施工・修繕", en: "CONSTRUCTION", color: "#0aa39a", tint: "#d9f1ef", items: ["修繕", "メンテナンス", "撤去"] },
];

export const TOP_SERVICES = ["interior", "sign", "display", "design"];

export const INDUSTRIES = ["飲食店", "アミューズメント", "オフィス", "店舗・物販", "商業施設", "医療・クリニック"];
export const WORK_TAGS = ["内装", "外装・ファサード", "看板", "屋外広告", "懸垂幕・バナー", "サイン", "ディスプレイ", "設計", "イベント"];

export type Work = {
  id: string;
  title: string;
  industry: string;
  tags: string[];
  date: string;
};

// Placeholder works until the CMS is connected; mirrors the prototype's generator.
export const WORKS: Work[] = Array.from({ length: 96 }, (_, i) => {
  const d = new Date(2026, 9, 20 - i * 4);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    id: String(i + 1),
    title: "案件名が入ります",
    industry: INDUSTRIES[(i * 7) % 6],
    tags: [...new Set([WORK_TAGS[i % 9], WORK_TAGS[(i * 4 + 2) % 9], WORK_TAGS[(i * 2 + 5) % 9]])],
    date: `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`,
  };
});

export const TOP_PICKUP_IDS = ["1", "2", "4"];

export const REASONS = [
  {
    title: "ワンストップ対応",
    sub: "相談から施工まで、窓口はひとつ。",
    color: "#ec8aa3",
    tint: "#fde9ee",
    body: "企画・設計・製作・施工まで、すべてフジリンクが窓口になります。内装・看板から販促物まで、お店の「見せ方」に関わるものはまとめてご相談ください。社内に設計担当がいるので、図面づくりから話が早く進みます。",
  },
  {
    title: "規模を問わない対応力",
    sub: "小さなご依頼から、全国一斉の展開まで。",
    color: "#6cb4e4",
    tint: "#dcf3fc",
    body: "店舗1軒の看板交換から、多店舗チェーンの全国一斉リニューアルまで対応します。拠点ごとの施工手配や進行管理もまとめて引き受けるので、規模が大きくなっても窓口は変わりません。",
  },
  {
    title: "「できない」と言わない",
    sub: "完全オーダーメイドでお応えします。",
    color: "#e8c21a",
    tint: "#fff6cc",
    body: "既製品では合わない形や素材、短納期のご相談も、まずはお聞かせください。製作方法や代替案まで含めて検討し、ご要望を形にする方法を一緒に探します。",
  },
];

export const LOGO_COLORS = ["#ec7c92", "#f08a4b", "#f8cc03", "#48b14b", "#01a19a", "#00b8ee", "#9a72af", "#e7373e"];

export const NAV = [
  { label: "事業案内", href: "/service" },
  { label: "施工実績", href: "/works" },
  { label: "選ばれる理由", href: "/reason" },
  { label: "会社概要", href: "/company" },
  { label: "採用情報", href: "#" },
];

export const FOOTER_NAV = [...NAV, { label: "お問い合わせ", href: "/contact" }, { label: "プライバシーポリシー", href: "/privacy" }];
