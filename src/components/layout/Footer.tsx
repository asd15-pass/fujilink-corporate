import Link from "next/link";
import { footerNav } from "@/data/navigation";
import { site } from "@/data/site";
import { getCompanyInfo } from "@/lib/repositories/siteRepository";

export default async function Footer() {
  const company = await getCompanyInfo();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
          <div>
            <p className="font-display text-[23px] font-extrabold tracking-[0.1em]">
              {company.nameEn}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-3 text-[15px] font-bold">{company.name}</p>

            <address className="mt-6 space-y-1 text-[14px] not-italic leading-[1.9] text-white/65">
              {company.address ? (
                <p>
                  〒{company.postalCode} {company.address}
                </p>
              ) : null}
              {company.fax ? <p>FAX {company.fax}</p> : null}
              {company.email ? (
                <p>
                  <a
                    href={`mailto:${company.email}`}
                    className="underline underline-offset-4 transition-colors hover:text-accent"
                  >
                    {company.email}
                  </a>
                </p>
              ) : null}
            </address>
          </div>

          <nav aria-label="フッターナビゲーション">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-4 sm:grid-cols-3 lg:grid-cols-2">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="whitespace-nowrap text-[14px] text-white/65 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="note text-white/50">
            © {year} {site.name}
          </p>
          <p className="note text-white/50">
            電話番号・営業時間などの会社情報は支給待ちのため未掲載
          </p>
        </div>
      </div>
    </footer>
  );
}
