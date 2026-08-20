import type { Metadata } from "next";
import PagePlaceholder from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "施工実績",
  description: "カテゴリ・業種・エリアから、条件の近い施工事例を探せます。",
  alternates: { canonical: "/works" },
};

export default function Page() {
  return <PagePlaceholder eyebrow="Works" heading="施工実績" />;
}
