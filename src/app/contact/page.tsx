import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { COMPANY } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "お問い合わせ" };

export default function ContactPage() {
  return (
    <>
      <PageHero en="CONTACT" title="お問い合わせ" lead="ご相談・お見積りは無料です。お気軽にお問い合わせください。" />
      <div className="mx-auto flex max-w-[760px] flex-col gap-[clamp(40px,5vw,56px)] px-5 pb-[clamp(64px,8vw,104px)] pt-[clamp(40px,5vw,72px)]">
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-[clamp(20px,2.2vw,24px)] font-bold">フォームでのお問い合わせ</h2>
            <p className="text-sm text-sub">2営業日以内に担当よりご連絡いたします</p>
          </div>
          <ContactForm />
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-[clamp(20px,2.2vw,24px)] font-bold">お電話でのお問い合わせ</h2>
          <div className="flex flex-col gap-1 rounded-[20px] bg-cream px-[26px] py-6">
            <a href={`tel:${COMPANY.tel}`} className="font-en text-[clamp(28px,3vw,34px)] font-extrabold text-navy">{COMPANY.tel}</a>
            <span className="text-sm text-sub">受付時間 {COMPANY.hours}</span>
          </div>
        </section>
      </div>
    </>
  );
}
