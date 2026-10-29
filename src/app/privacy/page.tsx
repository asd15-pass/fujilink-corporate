import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = { title: "プライバシーポリシー" };

const POLICY = [
  {
    t: "個人情報の取得",
    p: [
      "当社は、お問い合わせフォーム・採用エントリー・お電話などを通じて、氏名、会社名、メールアドレス、電話番号等の個人情報をお預かりします。",
      "取得の際は利用目的を明らかにし、適法かつ公正な手段で行います。",
      "また、当サイトではサービス向上のため、Cookieおよびアクセス解析ツールを使用することがあります。これらにより収集する情報に、個人を特定する情報は含まれません。",
    ],
  },
  {
    t: "利用目的",
    p: [
      "お預かりした個人情報は、次の目的の範囲内で利用します。",
      "・お問い合わせ・ご相談への回答、ご連絡のため",
      "・お見積りのご提案、施工・サービスのご提供のため",
      "・採用選考に関するご連絡のため",
      "・その他、上記に付随する業務のため",
    ],
  },
  { t: "第三者への提供", p: ["当社は、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供いたしません。"] },
  { t: "安全管理", p: ["当社は、個人情報の漏えい・滅失・き損などを防ぐため、必要かつ適切な安全管理措置を講じるとともに、従業者への教育・監督を行います。"] },
  {
    t: "開示・訂正・削除のご請求",
    p: [
      "ご本人からの個人情報の開示・訂正・利用停止・削除のご請求には、ご本人であることを確認のうえ、法令に従い速やかに対応いたします。",
      "下記のお問い合わせ窓口までご連絡ください。",
    ],
  },
  { t: "改定", p: ["本ポリシーの内容は、法令の改正や運用の見直しに応じて改定することがあります。改定後の内容は、当サイトに掲載した時点から適用されます。"] },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero en="PRIVACY POLICY" title="プライバシーポリシー" />
      <div className="mx-auto flex max-w-[860px] flex-col gap-9 px-5 pb-[clamp(64px,8vw,104px)] pt-[clamp(40px,5vw,72px)]">
        <p className="text-[15px] leading-loose text-sub">
          {COMPANY.name}（以下「当社」）は、お客様の個人情報を適切に取り扱うため、以下の方針を定めます。
        </p>
        {POLICY.map((s, i) => (
          <section key={s.t} className="flex flex-col gap-3 border-t border-line-2 pt-7">
            <h2 className="flex items-baseline gap-3 text-[clamp(18px,1.8vw,20px)] font-bold">
              <span className="font-en text-sm font-bold text-label">{String(i + 1).padStart(2, "0")}</span>
              {s.t}
            </h2>
            <div className="text-sm leading-loose text-sub">
              {s.p.map(line => <p key={line}>{line}</p>)}
            </div>
          </section>
        ))}
        <div className="flex flex-col gap-1 rounded-[20px] bg-beige px-[26px] py-6 text-sm leading-[1.8]">
          <b>お問い合わせ窓口</b>
          <span className="text-sub">{COMPANY.name}　{COMPANY.zip} {COMPANY.address}</span>
          <span className="text-sub">TEL：{COMPANY.tel}（受付時間 {COMPANY.hours}）</span>
        </div>
        <p className="text-right text-[13px] text-label">制定日：2026年11月19日</p>
      </div>
    </>
  );
}
