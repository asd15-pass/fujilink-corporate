import type { Metadata } from "next";
import PagePlaceholder from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "施工のご相談・採用・その他のお問い合わせ。",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Contact"
      heading="お問い合わせ"
      note="フォームは後続フェーズで実装します。現時点の連絡先は r-fujita@fujilink.co.jp / FAX 048-633-9656 です。"
    />
  );
}
