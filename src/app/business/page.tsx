import type { Metadata } from "next";
import PagePlaceholder from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "事業案内",
  description: "内外装工事・看板・サイン・店舗ディスプレイ・デジタルサイネージなどの対応領域。",
  alternates: { canonical: "/business" },
};

export default function Page() {
  return <PagePlaceholder eyebrow="Business" heading="事業案内" />;
}
