import Link from "next/link";
import HeroTown from "@/components/sections/HeroTown";
import { getHeroContent } from "@/lib/repositories/siteRepository";

export default async function Hero() {
  const hero = await getHeroContent();

  return (
    <section className="relative -mt-20 overflow-hidden bg-white pt-20">
      <div className="mx-auto w-full max-w-[1680px] lg:grid">
        <div className="pointer-events-none px-5 pt-10 text-center lg:col-start-1 lg:row-start-1 lg:z-10 lg:max-w-[700px] lg:px-10 lg:pt-[3.5vw] lg:text-left">
          <p className="eyebrow inline-block rounded-full bg-accent-soft px-4 py-2 text-accent-ink">
            {hero.eyebrow}
          </p>

          <h1 className="mt-6 text-[34px] leading-[1.28] text-ink sm:text-[46px] lg:text-[58px]">
            {hero.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-[1.95] text-ink-sub lg:mx-0 lg:max-w-none lg:text-[16px]">
            {hero.lead}
          </p>

          <div className="pointer-events-auto mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start">
            <Link
              href={hero.primaryCta.href}
              className="group inline-flex w-full items-center justify-center gap-3 whitespace-nowrap rounded-full bg-accent px-9 py-4 text-[15px] font-bold text-white transition-colors duration-300 hover:bg-accent-ink sm:w-auto"
            >
              {hero.primaryCta.label}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border-2 border-accent bg-white px-9 py-4 text-[15px] font-bold text-accent-ink transition-colors duration-300 hover:bg-accent-soft sm:w-auto"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        {/* 左上のコピーが左側の建物にかからないよう、コピーの高さ（約505px）から
            画面幅に比例する建物の立ち上がり位置（28.53vw）を引いた分だけ下げる。 */}
        <div className="-ml-[17.5%] -mt-10 w-[135%] max-w-none lg:col-start-1 lg:row-start-1 lg:ml-0 lg:mt-[max(0px,calc(505px_-_28.53vw))] lg:w-full">
          <HeroTown />
        </div>
      </div>
    </section>
  );
}
