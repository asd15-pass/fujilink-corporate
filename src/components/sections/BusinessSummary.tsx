import Reveal, { Stagger, StaggerItem } from "@/components/animations/Reveal";
import ArrowLink from "@/components/ui/ArrowLink";
import SectionHeading from "@/components/ui/SectionHeading";
import { getBusinessCategories } from "@/lib/repositories/siteRepository";
import type { BusinessColor } from "@/types/business";

const COLOR: Record<BusinessColor, { bg: string; ink: string; chip: string }> = {
  purple: { bg: "bg-purple-soft", ink: "text-purple-ink", chip: "bg-white text-purple-ink" },
  teal: { bg: "bg-teal-soft", ink: "text-teal-ink", chip: "bg-white text-teal-ink" },
  yellow: { bg: "bg-yellow-soft", ink: "text-yellow-ink", chip: "bg-white text-yellow-ink" },
  accent: { bg: "bg-accent-soft", ink: "text-accent-ink", chip: "bg-white text-accent-ink" },
};

export default async function BusinessSummary() {
  const categories = await getBusinessCategories({ featuredOnly: true });
  const all = await getBusinessCategories();
  const hasProvisional = categories.some((c) => c.isProvisional);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Business"
            heading="内装から看板、サイネージまで"
            lead="つくるものが違っても、現場はひとつ。フジリンクは設計・製作・施工・保守を横断して引き受けるため、業者ごとの調整をお客様が抱え込む必要がありません。"
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {categories.map((category, index) => {
            const c = COLOR[category.color];
            return (
              <StaggerItem key={category.id} className="h-full">
                <article
                  className={`group flex h-full flex-col rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1 lg:p-9 ${c.bg}`}
                >
                  <p className={`numeric text-[14px] tracking-[0.18em] ${c.ink}`}>
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-6 text-[21px] leading-[1.5] text-ink">{category.name}</h3>
                  <p className={`eyebrow mt-2 ${c.ink}`}>{category.nameEn}</p>
                  <p className="mt-5 flex-1 text-[14px] leading-[1.95] text-ink-sub">
                    {category.summary}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {category.services.map((service) => (
                      <li
                        key={service}
                        className={`chip ${c.chip}`}
                      >
                        {service}
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-[14px] leading-[1.95] text-ink-sub">
            上記のほか、イベント企画・提案、施工後の修繕まで全{all.length}領域に対応しています。
            対応可否の判断がつかない案件も、まずはご相談ください。
          </p>
          <ArrowLink href="/business">すべての事業を見る</ArrowLink>
        </div>

        {hasProvisional ? (
          <p className="note mt-6 text-ink-sub">
            ※ 事業カテゴリの正式名称・説明文は支給待ち（仮テキスト）
          </p>
        ) : null}
      </div>
    </section>
  );
}
