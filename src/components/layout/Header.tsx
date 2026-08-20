"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { contactNav, mainNav } from "@/data/navigation";
import { site } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onPanelKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setOpen(false);
      toggleRef.current?.focus();
      return;
    }
    if (event.key !== "Tab") return;
    const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
  }, [open]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-20 transition-[background-color,box-shadow] duration-300 ${
        solid ? "bg-white shadow-[0_1px_20px_rgba(28,25,23,0.07)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 lg:px-10">
        <Link
          href="/"
          className="font-display text-[22px] font-extrabold tracking-[0.1em] text-ink"
          aria-label={`${site.name} トップページ`}
        >
          {site.nameEn}
          <span className="text-accent">.</span>
        </Link>

        <nav aria-label="メインナビゲーション" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={`relative text-[14px] font-bold tracking-[0.04em] transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:bg-accent after:transition-all hover:text-accent ${
                    isCurrent(item.href)
                      ? "text-accent after:w-full"
                      : "text-ink after:w-0 hover:after:w-full"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={contactNav.href}
            className="hidden whitespace-nowrap rounded-full bg-accent px-7 py-3 text-[14px] font-bold tracking-[0.04em] text-white transition-colors duration-300 hover:bg-accent-ink lg:inline-block"
          >
            {contactNav.label}
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span className="sr-only">{open ? "メニューを閉じる" : "メニューを開く"}</span>
            <span
              aria-hidden
              className={`block h-[2px] w-6 bg-ink transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              aria-hidden
              className={`block h-[2px] w-6 bg-ink transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              aria-hidden
              className={`block h-[2px] w-6 bg-ink transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        ref={panelRef}
        onKeyDown={onPanelKeyDown}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-20 overflow-y-auto bg-white px-5 py-8 lg:hidden"
      >
        <nav aria-label="モバイルナビゲーション">
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-5"
                >
                  <span className="eyebrow text-accent">{item.labelEn}</span>
                  <span className="text-[16px] font-bold">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href={contactNav.href}
          onClick={() => setOpen(false)}
          className="mt-8 block whitespace-nowrap rounded-full bg-accent px-6 py-4 text-center text-[15px] font-bold text-white"
        >
          {contactNav.label}
        </Link>
      </div>
    </header>
  );
}
