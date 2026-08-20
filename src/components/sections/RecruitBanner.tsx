import Link from "next/link";
import Reveal from "@/components/animations/Reveal";
import { getRecruitBanner } from "@/lib/repositories/siteRepository";

export default async function RecruitBanner() {
  const banner = await getRecruitBanner();

  return (
    <section className="bg-accent-band">
      <div className="mx-auto max-w-[1440px] px-5 py-14 lg:px-10 lg:py-16">
        <Reveal className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow text-accent">Recruit</p>
            <p className="mt-4 text-[21px] font-black leading-[1.45] text-ink lg:text-[25px]">
              {banner.catchCopy}
            </p>
            {banner.lead ? (
              <p className="mt-3 text-[14px] leading-[1.9] text-ink-sub">{banner.lead}</p>
            ) : null}
          </div>

          <Link
            href={banner.href}
            className="group inline-flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full bg-accent px-8 py-4 text-[14px] font-bold text-white transition-colors duration-300 hover:bg-accent-ink"
          >
            {banner.ctaLabel}
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
