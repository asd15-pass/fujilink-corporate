import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHero, Placeholder, SectionHeading, WorkThumb } from "@/components/ui";
import { WORKS } from "@/lib/site";

export function generateStaticParams() {
  return WORKS.map(w => ({ id: w.id }));
}

export async function generateMetadata({ params }: PageProps<"/works/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: WORKS.find(w => w.id === id)?.title ?? "施工実績" };
}

export default async function WorkDetailPage({ params }: PageProps<"/works/[id]">) {
  const { id } = await params;
  const work = WORKS.find(w => w.id === id);
  if (!work) notFound();

  const related = WORKS.filter(w => w.id !== work.id && w.tags.some(t => work.tags.includes(t))).slice(0, 3);
  const outline = [
    ["業種", work.industry],
    ["施工内容", work.tags.join("／")],
    ["概要", "簡単な概要テキストが入ります（2〜3行程度）"],
  ];

  return (
    <>
      <PageHero en="WORKS" title={work.title} lead={work.industry} crumbs={[{ label: "施工実績", href: "/works" }]} />
      <Container className="flex flex-col gap-[clamp(40px,5vw,56px)] pb-[clamp(64px,8vw,104px)] pt-[clamp(40px,5vw,72px)]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1.5 font-en text-[13px] font-semibold text-label">{work.date}</span>
          <span className="rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">{work.industry}</span>
        </div>
        <div className="flex flex-col gap-4">
          <Placeholder label="［メイン写真］" className="aspect-[16/8] rounded-[20px]" />
          <div className="grid grid-cols-3 gap-[clamp(8px,1.4vw,16px)]">
            {["施工前", "施工後", "サブ写真"].map(l => <Placeholder key={l} label={`［${l}］`} className="aspect-[4/3] rounded-xl text-xs" />)}
          </div>
        </div>
        <section className="flex flex-col gap-5">
          <SectionHeading en="OUTLINE" small>案件概要</SectionHeading>
          <dl className="overflow-hidden rounded-[20px] border-2 border-line bg-white">
            {outline.map(([k, v], i) => (
              <div key={k} className={`grid grid-cols-[110px_1fr] md:grid-cols-[240px_1fr] ${i ? "border-t border-line" : ""}`}>
                <dt className="bg-beige px-5 py-4 text-sm font-bold text-sub">{k}</dt>
                <dd className="px-5 py-4 text-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="flex flex-col gap-5">
          <SectionHeading en="POINT" small>施工のポイント</SectionHeading>
          <p className="text-[15px] leading-[1.9] text-sub">本文テキストが入ります。ご要望・工夫した点・お客様の声など。</p>
        </section>
        <section className="flex flex-col gap-5 border-t border-line-2 pt-10">
          <h2 className="text-[clamp(20px,2.2vw,24px)] font-bold">関連する実績</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map(w => (
              <Link key={w.id} href={`/works/${w.id}`} className="group flex flex-col gap-2.5 text-ink">
                <WorkThumb className="rounded-xl" />
                <p className="text-[15px] font-bold">{w.title}</p>
                <span className="text-xs font-bold text-sub">{w.industry}</span>
              </Link>
            ))}
          </div>
        </section>
        <Link href="/works" className="self-center rounded-full border-[1.5px] border-navy px-8 py-[13px] text-[15px] font-bold text-navy">
          ← 実績一覧へ戻る
        </Link>
      </Container>
    </>
  );
}
