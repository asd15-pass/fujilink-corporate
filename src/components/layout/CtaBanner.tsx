import Link from "next/link";
import Reveal from "@/components/animations/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

type Props = {
  eyebrow?: string;
  heading?: string;
  lead?: string;
  ctaLabel?: string;
  href?: string;
};

export default function CtaBanner({
  eyebrow = "Contact",
  heading = "施工について、まず相談してみませんか",
  lead = "内装も看板もディスプレイも、窓口はひとつ。図面がなくても、現状の写真だけでかまいません。",
  ctaLabel = "お問い合わせ",
  href = "/contact",
}: Props) {
  return (
    <section className="bg-accent text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
        <Reveal className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading className="max-w-2xl" tone="dark" eyebrow={eyebrow} heading={heading} lead={lead} />

          <Link
            href={href}
            className="group inline-flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full bg-white px-10 py-5 text-[15px] font-bold text-accent transition-transform duration-300 hover:-translate-y-0.5"
          >
            {ctaLabel}
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
