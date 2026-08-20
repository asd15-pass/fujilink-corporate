import type { Metadata } from "next";
import PagePlaceholder from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "採用情報",
  description: "街をつくる仲間を募集しています。",
  alternates: { canonical: "/recruit" },
};

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Recruit"
      heading="採用情報"
      note="募集職種・条件が未提供のため、募集要項は掲載していません（後続フェーズで実装）。"
    />
  );
}
