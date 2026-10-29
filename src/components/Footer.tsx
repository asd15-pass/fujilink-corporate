import Link from "next/link";
import { COMPANY, FOOTER_NAV } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-footer text-[#c9ccd3]">
      <div className="mx-auto flex max-w-[1112px] flex-wrap justify-between gap-6 px-5 py-10">
        <div className="flex flex-col gap-1 text-[13px] leading-[1.7]">
          <p className="text-[15px] font-bold text-white">{COMPANY.name}</p>
          <p>{COMPANY.zip} {COMPANY.address}</p>
          <p>TEL：{COMPANY.tel}（受付時間 {COMPANY.hours}）</p>
        </div>
        <nav className="flex flex-wrap content-start gap-x-5 gap-y-2.5 text-[13px] font-bold">
          {FOOTER_NAV.map(n => (
            <Link key={n.label} href={n.href} className="text-[#c9ccd3]">
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="rainbow-line h-1" />
      <p className="p-4 text-center text-xs text-label">© FUJI LINK Inc.</p>
    </footer>
  );
}
