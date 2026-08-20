import type { Strength } from "@/types/strength";

// TODO: 正式なコピーは未確定。文言は支給後に差し替える。
export const strengths: Strength[] = [
  {
    id: "area",
    title: "埼玉拠点、全国対応",
    titleEn: "Nationwide",
    body: "草加の拠点から、首都圏はもちろん全国の現場へ。多店舗展開の一括施工にも対応します。",
    displayOrder: 1,
    isProvisional: true,
  },
  {
    id: "onestop",
    title: "ワンストップ対応",
    titleEn: "One-stop",
    body: "内装も看板もディスプレイも、窓口はひとつ。分離発注にともなう調整の手間がかかりません。",
    displayOrder: 2,
    isProvisional: true,
  },
  {
    id: "speed",
    title: "スピード感",
    titleEn: "Speed",
    body: "短い工期や急な修繕にも、自社の体制で動きます。まず現場を見て、動ける形を提案します。",
    displayOrder: 3,
    isProvisional: true,
  },
];
