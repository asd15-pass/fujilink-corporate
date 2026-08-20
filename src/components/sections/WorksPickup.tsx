import Reveal, { Stagger, StaggerItem } from "@/components/animations/Reveal";
import ArrowLink from "@/components/ui/ArrowLink";
import SectionHeading from "@/components/ui/SectionHeading";
import WorkCard from "@/components/works/WorkCard";
import { getFeaturedWorks } from "@/lib/repositories/worksRepository";

export default async function WorksPickup() {
  const works = await getFeaturedWorks(3);
  if (works.length === 0) return null;

  const hasPlaceholder = works.some((w) => w.isPlaceholder);

  return (
    <section className="border-t border-line bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <Reveal className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Works"
            heading="現場の数だけ、答えがあります"
            lead="業種・エリア・工事種別ごとに、近い条件の施工事例をご覧いただけます。"
          />
          <ArrowLink href="/works" className="shrink-0">
            実績一覧へ
          </ArrowLink>
        </Reveal>

        <Stagger className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-12">
          {works.map((work) => (
            <StaggerItem key={work.id} className="h-full">
              <WorkCard work={work} />
            </StaggerItem>
          ))}
        </Stagger>

        {hasPlaceholder ? (
          <p className="note mt-10 text-ink-sub">
            ※ 施工写真・案件原稿は支給待ち。カードは素材なしのプレースホルダー表示（src/data/works.ts で差し替え）
          </p>
        ) : null}
      </div>
    </section>
  );
}
