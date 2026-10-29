import type { Metadata } from "next";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "採用情報", description: "街をつくる仲間を募集しています。" };

export default function RecruitPage() {
  return (
    <>
      <PageHero en="RECRUIT" title="採用情報" lead="一緒に街をつくる仲間を募集しています。" />
      <p className="px-5 py-[clamp(48px,6vw,96px)] text-center text-sm text-sub">募集要項は準備中です。［本文は要確認］</p>
    </>
  );
}
