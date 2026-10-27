import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero, SectionHeading } from "@/components/ui";
import { SERVICES } from "@/lib/site";

export const metadata: Metadata = { title: "事業案内" };

const FLOW = ["お問い合わせ", "ヒアリング・お見積り", "設計・施工", "アフターフォロー"];

export default function ServicePage() {
  return (
    <>
      <PageHero en="SERVICE" title="事業案内" lead="企画・設計から製作・施工まで、お店づくりに関わる6つの事業をワンストップでお引き受けします。" />
      <div className="flex h-1.5">
        {SERVICES.map(s => <div key={s.slug} className="flex-1" style={{ background: s.color }} />)}
      </div>
      <Container className="flex flex-wrap gap-2.5 pt-[clamp(40px,5vw,64px)]">
        {SERVICES.map(s => (
          <a key={s.slug} href={`#${s.slug}`} className="flex items-center gap-2 rounded-full border border-line-2 bg-white px-4 py-[9px] text-sm font-bold text-ink">
            <span className="size-2.5 rounded-full" style={{ background: s.color }} />
            {s.name}
          </a>
        ))}
      </Container>
      <Container className="flex flex-col gap-[clamp(48px,6vw,72px)] pb-[clamp(64px,8vw,104px)] pt-[clamp(48px,6vw,80px)]">
        {SERVICES.map((s, i) => (
          <section key={s.slug} id={s.slug} className={`flex scroll-mt-24 flex-col items-center gap-[clamp(20px,4vw,48px)] rounded-[20px] border-2 bg-white p-[clamp(16px,2.4vw,28px)] ${i % 2 ? "md:flex-row-reverse" : "md:flex-row"}`} style={{ borderColor: s.color }}>
            <div className="relative w-full min-w-0 md:flex-1">
              <div className="grid aspect-[16/10] place-items-center rounded-2xl text-[13px] text-[#8a8273]" style={{ background: s.tint }}>
                ［{s.name}の写真：Adobe Stockより選定］
              </div>
            </div>
            <div className="flex min-w-0 flex-col gap-3.5 md:flex-1">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full font-en text-sm font-bold text-white" style={{ background: s.color }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-en text-xs font-bold tracking-[.18em] text-label">{s.en}</span>
              </div>
              <h2 className="text-[clamp(22px,2.2vw,26px)] font-bold text-navy">{s.name}</h2>
              <p className="text-[15px] leading-[1.9] text-sub">サービスの説明テキストが入ります。対応内容・得意分野・事例への言及など。</p>
              <div className="flex flex-wrap gap-1.5">
                {s.items.map(it => (
                  <span key={it} className="rounded-md px-2.5 py-[5px] text-xs font-bold text-sub" style={{ background: s.tint }}>{it}</span>
                ))}
              </div>
              <Link href={s.tag ? `/works?tag=${encodeURIComponent(s.tag)}` : "/works"} className="self-start border-b-[1.5px] pb-[3px] text-sm font-bold text-navy" style={{ borderColor: s.color }}>
                {s.name}の実績を見る →
              </Link>
            </div>
          </section>
        ))}
      </Container>
      <div className="bg-beige">
        <Container className="flex flex-col gap-8 py-[clamp(56px,7vw,96px)]">
          <SectionHeading en="FLOW" small>ご依頼の流れ</SectionHeading>
          <ol className="grid gap-4 md:grid-cols-4">
            {FLOW.map((t, i) => (
              <li key={t} className="flex flex-col gap-2 rounded-[20px] border-2 border-line bg-white px-[22px] pb-6 pt-[22px]">
                <span className="font-en text-[13px] font-bold text-label">STEP {i + 1}</span>
                <span className="text-base font-bold">{t}</span>
                <span className="text-sm leading-[1.8] text-sub">説明が入ります。</span>
              </li>
            ))}
          </ol>
        </Container>
      </div>
    </>
  );
}
