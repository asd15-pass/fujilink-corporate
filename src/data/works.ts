import type { Work } from "@/types/work";

// TODO: 施工実績の正式原稿・写真が未提供のため、すべて isPlaceholder のダミー枠。
// 架空の案件名・顧客名・数値は入れない。原稿と写真の支給後にこのファイルを差し替える。
export const works: Work[] = [
  {
    id: "placeholder-1",
    slug: "placeholder-1",
    title: "案件名（原稿待ち）",
    description: "案件概要（原稿待ち）",
    category: "内外装工事",
    images: [],
    featured: true,
    displayOrder: 1,
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    slug: "placeholder-2",
    title: "案件名（原稿待ち）",
    description: "案件概要（原稿待ち）",
    category: "看板・サイン",
    images: [],
    featured: true,
    displayOrder: 2,
    isPlaceholder: true,
  },
  {
    id: "placeholder-3",
    slug: "placeholder-3",
    title: "案件名（原稿待ち）",
    description: "案件概要（原稿待ち）",
    category: "店舗ディスプレイ",
    images: [],
    featured: true,
    displayOrder: 3,
    isPlaceholder: true,
  },
];
