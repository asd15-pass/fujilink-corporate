import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/types/work";

type Props = {
  work: Work;
};

export default function WorkCard({ work }: Props) {
  const meta = [work.industry, work.area].filter(Boolean);

  return (
    <article className="group h-full">
      <Link href={`/works/${work.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-surface">
          {work.mainImage ? (
            <Image
              src={work.mainImage}
              alt={work.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center rounded-3xl border-2 border-line">
              <div
                aria-hidden
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(-45deg, transparent 0 10px, var(--color-line) 10px 11px)",
                }}
              />
              <p className="note relative text-ink-sub">施工写真（素材待ち）</p>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col pt-6">
          <p className="chip w-fit bg-accent-soft text-accent-ink">
            {work.category}
          </p>
          <h3 className="mt-3 text-[18px] leading-[1.6] text-ink transition-colors group-hover:text-accent">
            {work.title}
          </h3>
          {work.description ? (
            <p className="mt-3 line-clamp-2 text-[14px] leading-[1.9] text-ink-sub">
              {work.description}
            </p>
          ) : null}
          {meta.length > 0 ? (
            <p className="mt-4 text-[13px] text-ink-sub">{meta.join(" ／ ")}</p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
