import type { Metadata } from "next";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "プライバシーポリシー" };

const POLICY = ["個人情報の取得", "利用目的", "第三者への提供", "安全管理", "開示・訂正・削除のご請求", "改定"];

export default function PrivacyPage() {
  return (
    <>
      <PageHero en="PRIVACY POLICY" title="プライバシーポリシー" />
      <div className="mx-auto flex max-w-[860px] flex-col gap-9 px-5 pb-[clamp(64px,8vw,104px)] pt-[clamp(40px,5vw,72px)]">
        <p className="text-[15px] leading-loose text-sub">
          株式会社FUJI LINK（以下「当社」）は、お客様の個人情報を適切に取り扱うため、以下の方針を定めます。［本文は要確認］
        </p>
        {POLICY.map((t, i) => (
          <section key={t} className="flex flex-col gap-3 border-t border-line-2 pt-7">
            <h2 className="flex items-baseline gap-3 text-[clamp(18px,1.8vw,20px)] font-bold">
              <span className="font-en text-sm font-bold text-label">{String(i + 1).padStart(2, "0")}</span>
              {t}
            </h2>
            <p className="text-sm leading-loose text-sub">本文が入ります。</p>
          </section>
        ))}
        <div className="flex flex-col gap-1 rounded-[20px] bg-beige px-[26px] py-6 text-sm leading-[1.8]">
          <b>お問い合わせ窓口</b>
          <span className="text-sub">株式会社FUJI LINK　［住所が入ります］</span>
          <span className="text-sub">TEL：000-000-0000（受付時間 9:00〜18:00）</span>
        </div>
        <p className="text-right text-[13px] text-label">制定日：［年月日］</p>
      </div>
    </>
  );
}
