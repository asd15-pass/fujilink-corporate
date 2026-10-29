import type { Metadata } from "next";
import { ReasonIcon } from "@/components/ReasonIcon";
import { Container, PageHero, Placeholder, SectionHeading } from "@/components/ui";
import { REASONS } from "@/lib/site";

export const metadata: Metadata = { title: "選ばれる理由" };

const NUMBERS = [
  { v: "1,000", u: "件以上", t: "年間案件実績" },
  { v: "47", u: "都道府県", t: "対応実績" },
  { v: "80", u: "%", t: "リピート率" },
];

const VOICE = [
  ["ご依頼内容", "店舗外装工事：窓装飾、外看板の提案&設置"],
  ["依頼前のお困りごと", "テナントルールもあり、どのような装飾が出来るか困っていた"],
  ["FUJI LINKを選んだ決め手", "予算、条件も含めて出来る限りの内容を考えて頂けたこと。"],
  ["良かった点", "外装に関して、求めていたご提案を条件内で頂けた点。やり取り〜施工に至るまでも特に不満点は無かった。"],
  ["満足度（5段階）", "[5]大変満足"],
  ["どんな方におすすめしたいか", "内装や外装に関して、やりたいイメージはあるが実際どのようにしたら良いかわからずに考えている方。"],
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
        <article className="flex flex-col gap-[clamp(24px,3vw,40px)] rounded-[20px] border-2 border-line bg-white p-[clamp(20px,3.4vw,40px)] md:flex-row">
          <div className="flex w-full shrink-0 flex-col gap-2.5 md:w-[360px]">
            <Placeholder label="［施工写真：外観］" className="aspect-[4/3] rounded-[20px]" />
            <div className="grid grid-cols-2 gap-2.5">
              <Placeholder label="［施工写真］" className="aspect-square rounded-2xl" />
              <Placeholder label="［施工写真］" className="aspect-square rounded-2xl" />
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex flex-wrap items-center gap-3 border-b border-line pb-4">
              <h3 className="text-[22px] font-bold">Your Gym 福田様</h3>
              <span className="rounded-md border border-[#f6c9a5] bg-[#fdeadb] px-2 py-0.5 text-xs font-bold text-[#7a3f12]">店舗外装工事</span>
              <span className="text-lg leading-none tracking-[.06em] text-yellow" role="img" aria-label="評価 5段階中5">★★★★★</span>
            </div>
            <dl>
              {VOICE.map(([q, a], i) => (
                <div key={q} className="flex flex-col gap-1.5 border-b border-line py-4 last:border-b-0">
                  <dt className="flex items-center gap-2.5 text-sm font-bold">
                    <span className="grid size-[22px] shrink-0 place-items-center rounded-full bg-[#00b8ee] font-en text-xs text-white">{i + 1}</span>
                    {q}
                  </dt>
                  <dd className="pl-8 text-[15px] leading-[1.9] text-sub">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </article>
      </Container>
    </>
  );
}
