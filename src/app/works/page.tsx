import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero, WorkThumb } from "@/components/ui";
import { INDUSTRIES, WORK_TAGS, WORKS } from "@/lib/site";

export const metadata: Metadata = { title: "施工実績" };

const PER_PAGE = 12;

type Query = { ind: string[]; tag: string[] };
type Group = { key: keyof Query; label: string; tags: string[] };

const GROUPS: Group[] = [
  { key: "ind", label: "業種", tags: INDUSTRIES },
  { key: "tag", label: "タグ", tags: WORK_TAGS },
];

const list = (v: string | string[] | undefined) => (v == null ? [] : Array.isArray(v) ? v : v.split(",")).filter(Boolean);

function href(q: Query, page = 1) {
  const sp = new URLSearchParams();
  for (const k of ["ind", "tag"] as const) if (q[k].length) sp.set(k, q[k].join(","));
  if (page > 1) sp.set("page", String(page));
  const s = sp.toString();
  return s ? `/works?${s}` : "/works";
}

export default async function WorksPage({ searchParams }: PageProps<"/works">) {
  const sp = await searchParams;
  const q: Query = { ind: list(sp.ind), tag: list(sp.tag) };

  // OR within a group, AND across groups.
  const filtered = WORKS.filter(w =>
    (!q.ind.length || q.ind.includes(w.industry)) && (!q.tag.length || q.tag.some(t => w.tags.includes(t))));
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const cur = Math.min(Math.max(1, Number(sp.page) || 1), pages);
  const shown = filtered.slice((cur - 1) * PER_PAGE, cur * PER_PAGE);

  const toggle = (k: keyof Query, v: string): Query => ({ ...q, [k]: q[k].includes(v) ? q[k].filter(x => x !== v) : [...q[k], v] });

  const pager: { label: string; page: number; on?: boolean; aria?: string }[] = [];
  if (cur > 1) pager.push({ label: "‹", page: cur - 1, aria: "前のページ" });
  for (let i = 1; i <= pages; i++) pager.push({ label: String(i), page: i, on: i === cur });
  if (cur < pages) pager.push({ label: "›", page: cur + 1, aria: "次のページ" });

  return (
    <>
      <PageHero en="WORKS" title="施工実績" lead="リード文が入ります。" />
      <Container className="flex flex-col gap-8 pb-[clamp(64px,8vw,104px)] pt-[clamp(40px,5vw,72px)]">
        <div className="flex flex-col gap-4 rounded-[20px] border-2 border-line bg-white p-[clamp(18px,2.4vw,28px)]">
          {GROUPS.map(g => (
            <div key={g.key} className="flex flex-col gap-x-4 gap-y-2.5 md:flex-row md:items-start">
              <p className="w-[72px] shrink-0 pt-[7px] text-[13px] font-bold text-label">{g.label}</p>
              <div className="flex flex-1 flex-wrap gap-2">
                {g.tags.map(t => {
                  const on = q[g.key].includes(t);
                  return (
                    <Link
                      key={t}
                      href={href(toggle(g.key, t))}
                      scroll={false}
                      aria-pressed={on}
                      className={`flex items-center gap-1.5 rounded-full border-[1.5px] px-3.5 py-[7px] text-[13px] font-bold ${on ? "border-navy bg-navy text-white hover:text-white" : "border-input bg-white text-ink"}`}
                    >
                      {t}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-line pt-3.5 text-[13px] text-sub">
            <span><b className="text-[15px] text-navy">全{filtered.length}件</b>　新着順</span>
            <Link href="/works" scroll={false} className="border-b border-num font-bold text-sub">条件をクリア</Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
          {shown.map(w => (
            <Link key={w.id} href={`/works/${w.id}`} className="group flex flex-col overflow-hidden rounded-[20px] border-2 border-line bg-white text-ink">
              <WorkThumb />
              <div className="flex flex-col gap-2 p-3 pb-3.5 md:px-5 md:pb-[22px] md:pt-[18px]">
                <p className="font-en text-xs font-semibold text-label">{w.date}</p>
                <p className="text-sm font-bold leading-normal md:text-[17px]">{w.title}</p>
                <p className="text-xs font-bold text-sub">{w.industry}</p>
              </div>
            </Link>
          ))}
        </div>

        {pages > 1 && (
          <nav aria-label="ページ送り" className="flex justify-center gap-2">
            {pager.map(p => (
              <Link
                key={p.label}
                href={href(q, p.page)}
                aria-label={p.aria}
                aria-current={p.on ? "page" : undefined}
                className={`grid size-[42px] place-items-center rounded-full border-[1.5px] font-en text-[15px] font-bold ${p.on ? "border-navy bg-navy text-white hover:text-white" : "border-num bg-white text-ink"}`}
              >
                {p.label}
              </Link>
            ))}
          </nav>
        )}
      </Container>
    </>
  );
}
