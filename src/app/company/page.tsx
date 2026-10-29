import type { Metadata } from "next";
import { Container, PageHero, Placeholder, SectionHeading } from "@/components/ui";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = { title: "会社概要" };

const PROFILE = [
  ["会社名", "株式会社FUJI LINK"],
  ["所在地", `${COMPANY.zip} ${COMPANY.address}`],
  ["設立", "2022年10月"],
  ["代表者", "藤田 稜"],
  ["資本金", "300万円"],
  ["事業内容", "内外装工事／看板・サイン／店舗ディスプレイ／設計／イベント企画・提案／施工・修繕"],
  ["許認可・登録", "［建設業許可番号など。要確認］"],
  ["電話番号", COMPANY.tel],
];

export default function CompanyPage() {
  return (
    <>
      <PageHero en="COMPANY" title="会社概要" lead="リード文が入ります。" />
      <Container className="flex flex-col gap-7 py-[clamp(48px,6vw,96px)]">
        <SectionHeading en="MESSAGE" small>代表挨拶</SectionHeading>
        <div className="flex flex-col items-start gap-[clamp(24px,4vw,56px)] md:flex-row">
          <Placeholder label="［代表写真］" className="aspect-[4/5] w-full shrink-0 rounded-[20px] md:w-80" />
          <div className="flex min-w-0 flex-1 flex-col gap-[18px]">
            <p className="text-[clamp(20px,2.2vw,26px)] font-bold leading-[1.6] text-navy">見出しが入ります</p>
            <p className="text-[15px] leading-loose text-sub">代表メッセージが入ります。草加・埼玉への想いなど。</p>
            <p className="flex flex-col gap-0.5 self-end text-right">
              <span className="text-[13px] text-sub">株式会社FUJI LINK 代表取締役</span>
              <span className="text-lg font-bold">藤田 稜</span>
            </p>
          </div>
        </div>
      </Container>
      <div className="bg-beige">
        <Container className="flex flex-col gap-7 py-[clamp(56px,7vw,96px)]">
          <SectionHeading en="PROFILE" small>会社概要</SectionHeading>
          <dl className="overflow-hidden rounded-[20px] border-2 border-line bg-white">
            {PROFILE.map(([k, v], i) => (
              <div key={k} className={`grid grid-cols-[110px_1fr] md:grid-cols-[240px_1fr] ${i ? "border-t border-line" : ""}`}>
                <dt className="bg-[#fffbea] px-[22px] py-[18px] text-sm font-bold text-sub">{k}</dt>
                <dd className="px-[22px] py-[18px] text-sm leading-[1.8]">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
      <Container className="flex flex-col gap-7 py-[clamp(56px,7vw,96px)]">
        <SectionHeading en="ACCESS" small>アクセス</SectionHeading>
        <iframe
          title={`${COMPANY.name}の地図`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(COMPANY.address)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="aspect-[4/3] w-full rounded-[20px] border-0 md:aspect-[16/6]"
        />
        <div className="flex flex-col gap-1 text-sm leading-[1.8] text-sub">
          <p>{COMPANY.zip} {COMPANY.address}</p>
          <p className="mt-2 font-bold text-ink">【電車・バスでお越しの場合】</p>
          <p>東武スカイツリーライン「新田（しんでん）」駅 東口よりバスで約5分、「草加高校入口」バス停下車 徒歩4分。</p>
        </div>
      </Container>
    </>
  );
}
