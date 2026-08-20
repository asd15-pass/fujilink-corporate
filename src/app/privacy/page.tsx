import type { Metadata } from "next";
import PagePlaceholder from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "個人情報の取り扱いについて。",
  alternates: { canonical: "/privacy" },
  robots: { index: false },
};

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Privacy Policy"
      heading="プライバシーポリシー"
      note="本文が未提供のため未掲載です（後続フェーズで実装）。"
    />
  );
}
