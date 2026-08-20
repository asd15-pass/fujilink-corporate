import type { Metadata } from "next";
import PagePlaceholder from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "会社概要",
  description: "株式会社フジリンクの会社情報・アクセス。",
  alternates: { canonical: "/company" },
};

export default function Page() {
  return <PagePlaceholder eyebrow="Company" heading="会社概要" />;
}
