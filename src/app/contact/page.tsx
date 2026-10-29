import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "お問い合わせ" };

export default function ContactPage() {
  return (
    <>
      <PageHero en="CONTACT" title="お問い合わせ" lead="ご相談・お見積りは無料です。お気軽にお問い合わせください。" />
      <div className="mx-auto flex max-w-[760px] flex-col gap-7 px-5 pb-[clamp(64px,8vw,104px)] pt-[clamp(40px,5vw,72px)]">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex flex-col gap-1 rounded-[20px] border-2 border-line bg-white px-[22px] py-[18px]">
            <span className="text-xs font-bold text-label">お電話でのお問い合わせ</span>
            <a href="tel:000-000-0000" className="font-en text-[22px] font-bold text-navy">000-000-0000</a>
            <span className="text-xs text-sub">受付時間 9:00〜18:00</span>
          </div>
          <div className="flex flex-col justify-center gap-1 rounded-[20px] border-2 border-line bg-white px-[22px] py-[18px]">
            <span className="text-xs font-bold text-label">フォームでのお問い合わせ</span>
            <span className="text-sm leading-[1.7] text-sub">2営業日以内に担当よりご連絡します。</span>
          </div>
        </div>
        <ContactForm />
      </div>
    </>
  );
}
