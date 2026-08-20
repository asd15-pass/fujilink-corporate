import ArrowLink from "@/components/ui/ArrowLink";

type Props = {
  eyebrow: string;
  heading: string;
  note?: string;
};

export default function PagePlaceholder({ eyebrow, heading, note }: Props) {
  return (
    <section className="py-24 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <p className="eyebrow text-accent">{eyebrow}</p>
        <h1 className="mt-5 text-[30px] leading-[1.4] text-ink lg:text-[40px]">{heading}</h1>
        <p className="note mt-8 text-ink-sub">
          {note ?? "このページは後続フェーズで実装します（TOPページの導線確認用の枠のみ）。"}
        </p>
        <div className="mt-12">
          <ArrowLink href="/">トップへ戻る</ArrowLink>
        </div>
      </div>
    </section>
  );
}
