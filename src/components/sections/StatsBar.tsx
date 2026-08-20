import Reveal from "@/components/animations/Reveal";
import { getStats } from "@/lib/repositories/siteRepository";

const UNIT_COLOR = ["text-accent-ink", "text-teal-ink", "text-purple-ink"];

export default async function StatsBar() {
  const stats = await getStats();
  const hasUnconfirmed = stats.some((s) => s.isUnconfirmed);

  return (
    <section aria-label="実績数値" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <Reveal className="border-t border-line pt-12 pb-16 lg:pt-14 lg:pb-20">
          <dl className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-6">
            {stats.map((stat, index) => (
              <div key={stat.id} className="flex flex-col gap-3 sm:items-center">
                <dt className="text-[16px] font-bold tracking-[0.06em] text-ink">{stat.label}</dt>
                <dd className="numeric flex items-baseline gap-2.5 text-[44px] leading-none text-ink lg:text-[56px]">
                  {stat.value}
                  {stat.unit ? (
                    <span
                      className={`font-sans text-[16px] font-bold ${UNIT_COLOR[index % UNIT_COLOR.length]}`}
                    >
                      {stat.unit}
                    </span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>

          {hasUnconfirmed ? (
            <p className="note mt-10 text-ink-sub sm:text-center">
              ※ 実績数値は掲載前に要確認（暫定値）
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
