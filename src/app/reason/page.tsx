import type { Metadata } from "next";
import { ReasonIcon } from "@/components/ReasonIcon";
import { Container, PageHero, SectionHeading } from "@/components/ui";
import { REASONS } from "@/lib/site";

export const metadata: Metadata = { title: "選ばれる理由" };

const NUMBERS = [
  { v: "1,000", u: "件以上", t: "年間案件実績" },
  { v: "47", u: "都道府県", t: "対応実績" },
  { v: "80", u: "%", t: "リピート率" },
];

export default function ReasonPage() {
  return (
    <>
      <PageHero en="WHY FUJI LINK" title="選ばれる理由" lead="リード文が入ります。" />
      <Container className="grid gap-6 py-[clamp(48px,6vw,96px)] md:grid-cols-3">
        {REASONS.map((r, i) => (
          <article key={r.title} className="flex flex-col overflow-hidden rounded-[20px] border-2 border-line bg-white">
            <div className="h-1.5" style={{ background: r.color }} />
            <div className="flex flex-col gap-3 px-[26px] pb-[30px] pt-7">
              <div className="flex items-center justify-between">
                <div className="grid size-24 place-items-center rounded-full bg-cream">
                  <ReasonIcon index={i} color={r.color} size={64} />
                </div>
                <span className="font-en text-[40px] font-semibold leading-none text-num">0{i + 1}</span>
              </div>
              <h2 className="text-[21px] font-bold">{r.title}</h2>
              <p className="text-[15px] font-bold text-navy">{r.sub}</p>
              <p className="text-sm leading-[1.9] text-sub">{r.body}</p>
            </div>
          </article>
        ))}
      </Container>
      <div className="bg-beige">
        <Container className="flex flex-col gap-8 py-[clamp(56px,7vw,96px)]">
          <SectionHeading en="NUMBERS" small>数字で見るフジリンク</SectionHeading>
          <div className="grid gap-5 md:grid-cols-3">
            {NUMBERS.map(n => (
              <div key={n.t} className="flex flex-col items-center gap-2 rounded-[20px] border-2 border-line bg-white px-5 py-8">
                <p className="flex items-baseline gap-1 text-navy">
                  <span className="font-en text-[clamp(48px,4.4vw,64px)] font-extrabold leading-none">{n.v}</span>
                  <span className="text-xl font-bold">{n.u}</span>
                </p>
                <p className="text-[15px] font-bold">{n.t}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1 text-xs text-sub">
            <p>※ 2026年9月時点</p>
            <p>※ リピート率は2022年10月〜2026年9月の取引実績より</p>
          </div>
        </Container>
      </div>
      <Container className="flex flex-col gap-8 py-[clamp(56px,7vw,96px)]">
        <SectionHeading en="VOICE" small>お客様の声</SectionHeading>
        <div className="grid gap-5 md:grid-cols-2">
          {[0, 1].map(i => (
            <figure key={i} className="flex flex-col gap-3 rounded-[20px] border-2 border-line bg-white p-[26px]">
              <blockquote className="text-sm leading-[1.9] text-sub">お客様のコメントが入ります。</blockquote>
              <figcaption className="text-[13px] font-bold">業種・企業名（掲載許可分）</figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </>
  );
}
