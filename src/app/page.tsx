import Link from "next/link";
import { HeroIllustration } from "@/components/hero/HeroIllustration";
import { NavLinks, Logo } from "@/components/Header";
import { ReasonIcon } from "@/components/ReasonIcon";
import { Container, Dot, MoreLink, SectionHeading, WorkThumb } from "@/components/ui";

const PICKUP_SHADOW = ["#f08a4b", "#01a19a", "#9a72af"];
import { REASONS, SERVICES, TOP_PICKUP_IDS, TOP_SERVICES, WORKS } from "@/lib/site";

export default function Home() {
  const services = SERVICES.filter(s => TOP_SERVICES.includes(s.slug));
  const pickup = TOP_PICKUP_IDS.map(id => WORKS.find(w => w.id === id)!);

  return (
    <>
      {/* Spec §6: PC 1440 → 1670px art, left -115 / top -124 in a 900px frame; SP 390 → 782px at top 11 in 560px. Scaled by viewport width. */}
      <section className="relative h-[143.6vw] overflow-hidden bg-[#f6eedd] md:h-[62.5vw]">
        <HeroIllustration className="absolute left-1/2 top-[2.82vw] w-[200.5vw] -translate-x-1/2 md:top-[-8.61vw] md:w-[115.97vw]" />
        <div className="absolute inset-x-6 top-5 z-10 hidden h-16 items-center justify-between rounded-full bg-white/95 px-7 shadow-[0_4px_20px_rgba(0,0,0,.08)] md:flex">
          <Logo />
          <NavLinks className="!gap-[26px]" />
        </div>
        <div className="absolute inset-x-4 bottom-5 md:inset-x-auto md:bottom-12 md:left-12">
          <h1 className="inline-block rounded-xl bg-white px-4 py-2.5 text-xl font-black leading-normal tracking-[.04em] text-navy shadow-[0_6px_24px_rgba(0,0,0,.1)] md:rounded-2xl md:px-[26px] md:py-3.5 md:text-[34px] md:tracking-[.06em]">
            街に彩りを、<br className="md:hidden" />
            人につながりを。
          </h1>
        </div>
        <div className="absolute bottom-12 right-12 hidden flex-col items-center gap-2 font-en text-[11px] font-extrabold tracking-[.24em] text-navy md:flex">
          <span>SCROLL</span>
          <span className="h-10 w-0.5 bg-navy" />
        </div>
      </section>

      <Container className="section-y flex flex-col gap-8">
        <SectionHeading en="SERVICE">事業案内</SectionHeading>
        <div className="grid gap-5 md:grid-cols-4">
          {services.map(s => (
            <Link key={s.slug} href={`/service#${s.slug}`} className="group flex flex-col overflow-hidden rounded-[20px] border-2 bg-white text-ink" style={{ borderColor: s.color }}>
              <div className="overflow-hidden">
                <div className="grid aspect-[4/3] place-items-center text-xs text-[#8a8273] transition-transform duration-200 ease-out group-hover:scale-[1.03]" style={{ background: s.tint }}>
                  ［写真：Adobe Stock］
                </div>
              </div>
              <div className="flex flex-col gap-1.5 px-5 pb-[22px] pt-[18px]">
                <p className="flex items-center gap-2 font-en text-[11px] font-bold tracking-[.14em] text-label">
                  <Dot color={s.color} size={8} />
                  {s.en}
                </p>
                <p className="text-[17px] font-black">{s.name}</p>
                <p className="text-sm leading-[1.8] text-sub">説明テキストが入ります。</p>
              </div>
            </Link>
          ))}
        </div>
        <MoreLink href="/service">事業案内をくわしく見る →</MoreLink>
      </Container>

      <div className="bg-beige">
        <Container className="section-y flex flex-col gap-8">
          <SectionHeading en="WORKS">施工実績</SectionHeading>
          <div className="grid gap-6 md:grid-cols-3">
            {pickup.map((w, i) => (
              <Link key={w.id} href={`/works/${w.id}`} className="group flex flex-col overflow-hidden rounded-[20px] bg-white text-ink" style={{ boxShadow: `0 4px 0 ${PICKUP_SHADOW[i]}` }}>
                <WorkThumb />
                <div className="flex flex-col gap-2 px-5 pb-[22px] pt-[18px]">
                  <p className="text-[17px] font-black">{w.title}</p>
                  <p className="text-[13px] font-bold text-sub">{w.industry}</p>
                </div>
              </Link>
            ))}
          </div>
          <MoreLink href="/works">一覧を見る →</MoreLink>
        </Container>
      </div>

      <Container className="section-y flex flex-col gap-8">
        <SectionHeading en="REASON">選ばれる理由</SectionHeading>
        <div className="grid gap-5 md:grid-cols-3">
          {REASONS.map((r, i) => (
            <div key={r.title} className="flex flex-col gap-3 rounded-[20px] px-6 py-7" style={{ background: r.tint }}>
              <div className="flex items-center justify-between">
                <div className="grid size-[76px] place-items-center rounded-full bg-white">
                  <ReasonIcon index={i} color={r.color} size={52} />
                </div>
                <span className="font-en text-4xl font-semibold leading-none text-num">0{i + 1}</span>
              </div>
              <h3 className="text-lg font-bold">{r.title}</h3>
              <p className="text-sm leading-[1.8] text-sub">{r.sub}</p>
            </div>
          ))}
        </div>
        <MoreLink href="/reason">くわしく見る →</MoreLink>
        <Link href="/recruit" className="mt-6 flex flex-col overflow-hidden rounded-3xl border-2 border-navy bg-white text-navy hover:text-navy">
          <div className="rainbow-line h-2.5" />
          <div className="flex flex-wrap items-center justify-between gap-5 px-[clamp(24px,4vw,56px)] py-[clamp(28px,4vw,44px)]">
            <p className="text-[clamp(20px,2.4vw,28px)] font-black">一緒に街をつくる仲間を募集しています</p>
            <span className="rounded-full bg-green px-6 py-3 text-[15px] font-bold text-white">採用情報へ →</span>
          </div>
        </Link>
      </Container>
    </>
  );
}


