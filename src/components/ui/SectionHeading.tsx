type Props = {
  eyebrow: string;
  heading: string;
  lead?: string;
  className?: string;
  tone?: "light" | "dark";
};

export default function SectionHeading({
  eyebrow,
  heading,
  lead,
  className,
  tone = "light",
}: Props) {
  const dark = tone === "dark";

  return (
    <div className={className}>
      <p
        className={`eyebrow inline-block rounded-full px-4 py-2 ${
          dark ? "bg-white/15 text-white" : "bg-accent-soft text-accent-ink"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-6 text-[28px] leading-[1.4] lg:text-[36px] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {heading}
        <span className={dark ? "text-white/60" : "text-accent"}>.</span>
      </h2>
      {lead ? (
        <p
          className={`mt-6 max-w-2xl text-[15px] leading-[2] ${
            dark ? "text-white/85" : "text-ink-sub"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
