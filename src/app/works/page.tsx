import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero, WorkThumb } from "@/components/ui";
import { INDUSTRIES, WORK_TAGS, WORKS } from "@/lib/site";

export const metadata: Metadata = { title: "施工実績" };

const PER_PAGE = 12;

type Query = { ind: string[]; tag: string[] };
type Group = { key: keyof Query; label: string; note: string; badge: string; tags: string[] };

const GROUPS: Group[] = [
  { key: "ind", label: "業種", note: "お店・施設の種類", badge: "#f08a4b", tags: INDUSTRIES },
  { key: "tag", label: "タグ", note: "施工内容", badge: "#00b8ee", tags: WORK_TAGS },
];

const chipCls = {
  ind: (on: boolean) => `rounded-lg px-4 py-[7px] ${on ? "border-[#f08a4b] bg-[#f08a4b] text-white hover:text-white" : "border-[#f6c9a5] bg-[#fdeadb] text-[#7a3f12]"}`,
  tag: (on: boolean) => `rounded-full px-3 py-[7px] ${on ? "border-[#00b8ee] bg-[#00b8ee] text-white hover:text-white" : "border-line-2 bg-white text-ink"}`,
};

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
        <div className="flex flex-col rounded-[20px] border-2 border-line bg-white p-[clamp(18px,2.4vw,28px)]">
          {GROUPS.map((g, gi) => (
            <div key={g.key} className={`flex flex-col gap-x-4 gap-y-2.5 md:flex-row md:items-start ${gi ? "border-t border-dashed border-line-2 pt-4" : "pb-4"}`}>
              <div className="flex w-[76px] shrink-0 flex-row items-center gap-2 md:flex-col md:items-start md:gap-1 md:pt-1">
                <span className="rounded px-2 py-0.5 text-xs font-bold text-white" style={{ background: g.badge }}>{g.label}</span>
                <span className="text-[11px] leading-snug text-label">{g.note}</span>
              </div>
              <div className="flex flex-1 flex-wrap gap-2">
                {g.tags.map(t => {
                  const on = q[g.key].includes(t);
                  return (
                    <Link
                      key={t}
                      href={href(toggle(g.key, t))}
                      scroll={false}
                      aria-pressed={on}
                      className={`border-[1.5px] text-[13px] font-bold ${chipCls[g.key](on)}`}
                    >
                      {g.key === "tag" && "# "}{t}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-2.5 border-t border-line pt-4 text-[13px] text-sub">
            <span>
              全{WORKS.length}件中 <b className="text-[15px] text-navy">{filtered.length}件（{filtered.length ? `${(cur - 1) * PER_PAGE + 1}〜${(cur - 1) * PER_PAGE + shown.length}` : 0}件目）</b> を表示（新着順）
            </span>
            <Link href="/works" scroll={false} className="border-b border-sub font-bold text-sub">条件をクリア</Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
          {shown.map(w => (
            <Link key={w.id} href={`/works/${w.id}`} className="group flex flex-col overflow-hidden rounded-[20px] border-2 border-line bg-white text-ink">
              <WorkThumb />
              <div className="flex flex-col gap-2 p-3 pb-3.5 md:px-5 md:pb-[22px] md:pt-[18px]">
                <p className="font-en text-xs font-semibold text-label">{w.date}</p>
                <p className="text-sm font-bold leading-normal md:text-[17px]">{w.title}</p>
                <span className="self-start rounded-md border border-[#f6c9a5] bg-[#fdeadb] px-2 py-0.5 text-[11px] font-bold text-[#7a3f12]">{w.industry}</span>
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
