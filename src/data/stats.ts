import type { StatItem } from "@/types/stat";

// TODO: 実績数値は掲載前に要確認（暫定値）。確定後に isUnconfirmed を false にする。
export const stats: StatItem[] = [
  { id: "annual", value: "1,000", unit: "件 / 年", label: "年間対応件数", isUnconfirmed: true },
  { id: "area", value: "47", unit: "都道府県", label: "対応エリア", isUnconfirmed: true },
  { id: "fields", value: "6", unit: "領域", label: "対応領域", isUnconfirmed: true },
];
