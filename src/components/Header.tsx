"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/LogoMark";
import { NAV } from "@/lib/site";

export function Logo() {
  return (
    <Link href="/" className="shrink-0">
      <LogoMark className="h-9 w-auto md:h-10" />
    </Link>
  );
}

export function NavLinks({ active, className = "" }: { active?: string; className?: string }) {
  return (
    <nav className={`flex items-center gap-7 text-sm font-bold ${className}`}>
      {NAV.map(n => (
        <Link
          key={n.label}
          href={n.href}
          className={`border-b-2 py-1.5 ${active === n.href ? "border-navy text-navy" : "border-transparent text-ink"}`}
        >
          {n.label}
        </Link>
      ))}
      <Link href="/contact" className="rounded-full bg-accent px-[22px] py-[11px] text-white hover:text-white hover:opacity-90">
        お問い合わせ
      </Link>
    </nav>
  );
}

export function Header() {
  const pathname = usePathname();
  const isTop = pathname === "/";
  const active = pathname.startsWith("/works") ? "/works" : pathname;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isTop) return;
    const onScroll = () => setScrolled(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isTop]);

  // On the PC top page the pill header inside the hero takes over until the hero scrolls away.
  const pcHidden = isTop && !scrolled;

  return (
    <>
      <header
        className={`top-0 z-40 bg-white shadow-[0_1px_0_#eee] ${
          isTop ? "sticky md:fixed md:inset-x-0 md:transition-transform md:duration-300" : "sticky"
        } ${pcHidden ? "md:-translate-y-full" : ""}`}
      >
        <div className="rainbow-line h-1.5" />
        <div className="mx-auto flex h-[68px] max-w-[1112px] items-center justify-between gap-5 px-5">
          <Logo />
          <NavLinks active={active} className="hidden md:flex" />
          <button
            type="button"
            className="flex w-11 flex-col gap-[5px] p-2.5 md:hidden"
            aria-label="メニューを開く"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <span className="h-0.5 rounded bg-navy" />
            <span className="h-0.5 rounded bg-navy" />
            <span className="h-0.5 rounded bg-navy" />
          </button>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-base md:hidden" role="dialog" aria-modal="true" aria-label="メニュー">
          <div className="flex h-[68px] items-center justify-between border-b border-line px-5">
            <Logo />
            <button type="button" className="p-2.5 text-2xl leading-none text-navy" aria-label="メニューを閉じる" onClick={() => setOpen(false)}>
              ×
            </button>
          </div>
          <nav className="flex flex-col px-5 py-6 text-lg font-bold">
            {NAV.map(n => (
              <Link key={n.label} href={n.href} onClick={() => setOpen(false)} className="border-b border-line py-4 text-ink">
                {n.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="mt-8 rounded-full bg-accent py-4 text-center text-white hover:text-white">
              お問い合わせ
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
