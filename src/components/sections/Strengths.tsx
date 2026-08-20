import Reveal, { Stagger, StaggerItem } from "@/components/animations/Reveal";
import ArrowLink from "@/components/ui/ArrowLink";
import SectionHeading from "@/components/ui/SectionHeading";
import { getStrengths } from "@/lib/repositories/siteRepository";

const TONE = [
  { bg: "bg-purple-soft", num: "text-purple-ink", chip: "bg-white text-purple-ink" },
  { bg: "bg-teal-soft", num: "text-teal-ink", chip: "bg-white text-teal-ink" },
  { bg: "bg-accent-soft", num: "text-accent-ink", chip: "bg-white text-accent-ink" },
];

export default async function Strengths() {
  const strengths = await getStrengths();
  const hasProvisional = strengths.some((s) => s.isProvisional);

  return (
    <section className="border-t border-line bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <Reveal>
          <SectionHeading eyebrow="Why FUJILINK" heading="まとめて頼める会社が、近くにある" />
        </Reveal>

        <Stagger className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-3">
          {strengths.map((strength, index) => {
            const t = TONE[index % TONE.length];
            return (
              <StaggerItem key={strength.id} className="h-full">
                <article className={`h-full rounded-3xl p-9 transition-transform duration-300 hover:-translate-y-1 lg:p-10 ${t.bg}`}>
                  <div className="flex items-center gap-4">
                    <span className={`numeric text-[38px] leading-none ${t.num}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={`eyebrow rounded-full px-3.5 py-1.5 ${t.chip}`}>
                      {strength.titleEn}
                    </span>
                  </div>
                  <h3 className="mt-7 text-[22px] leading-[1.5] text-ink">{strength.title}</h3>
                  <p className="mt-4 text-[14px] leading-[2] text-ink-sub">{strength.body}</p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="mt-12">
          <ArrowLink href="/strengths">選ばれる理由を詳しく見る</ArrowLink>
        </div>

        {hasProvisional ? (
          <p className="note mt-6 text-ink-sub">※ 強みの文言は仮テキスト（正式コピー確定前）</p>
        ) : null}
      </div>
    </section>
  );
}
