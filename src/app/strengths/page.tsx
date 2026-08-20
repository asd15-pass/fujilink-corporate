import type { Metadata } from "next";
import PagePlaceholder from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "選ばれる理由",
  description: "埼玉拠点の全国対応、ワンストップ対応、スピード感。フジリンクの強み。",
  alternates: { canonical: "/strengths" },
};

export default function Page() {
  return <PagePlaceholder eyebrow="Why FUJILINK" heading="選ばれる理由" />;
}
