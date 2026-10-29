import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "送信完了", robots: { index: false } };

export default function ThanksPage() {
  return (
    <>
      <PageHero en="CONTACT" title="送信完了" />
      <section className="mx-auto flex max-w-[760px] flex-col items-center gap-[22px] px-5 py-[clamp(56px,7vw,104px)] text-center">
        <div className="grid size-[84px] place-items-center rounded-full bg-cream">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="#2b2f3a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 23l7 7 15-16" />
          </svg>
        </div>
        <h2 className="text-[clamp(22px,2.4vw,28px)] font-bold text-navy">お問い合わせありがとうございます</h2>
        <p className="text-[15px] leading-loose text-sub text-pretty">
          内容を確認のうえ、2営業日以内に担当よりご連絡いたします。
          <br />
          ご入力いただいたメールアドレスに確認メールをお送りしました。
        </p>
        <Link href="/" className="mt-3 rounded-full border-[1.5px] border-navy px-8 py-[13px] text-[15px] font-bold text-navy">
          トップへ戻る
        </Link>
      </section>
    </>
  );
}
