import Link from "next/link";
import { LOGO_COLORS } from "@/lib/site";

export function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto max-w-[1112px] px-5 ${className}`}>{children}</div>;
}

export function RainbowDots({ className = "" }: { className?: string }) {
  return (
    <span className={`flex gap-1.5 ${className}`} aria-hidden="true">
      {LOGO_COLORS.map(c => <span key={c} className="size-2 rounded-full" style={{ background: c }} />)}
    </span>
  );
}

export function SectionHeading({ children, as: Tag = "h2", small = false }: { en?: string; children: React.ReactNode; as?: "h2" | "h3"; small?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <RainbowDots />
      <Tag className={`font-black ${small ? "text-[clamp(24px,2.6vw,32px)]" : "text-[clamp(26px,3vw,36px)]"}`}>{children}</Tag>
    </div>
  );
}

export function MoreLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`self-center rounded-full bg-navy px-7 py-[13px] text-[15px] font-bold text-white hover:text-white hover:opacity-90 ${className}`}>
      {children}
    </Link>
  );
}

export function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return <div className={`grid place-items-center bg-ph text-[13px] text-ph-text ${className}`}>{label}</div>;
}

export function Dot({ color, size = 7 }: { color: string; size?: number }) {
  return <span className="inline-block shrink-0 rounded-full" style={{ background: color, width: size, height: size }} />;
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-num px-3 py-[3px] text-xs font-bold text-sub">{children}</span>;
}

export function PageHero({ title, lead, crumbs = [] }: { en?: string; title: string; lead?: string; crumbs?: { label: string; href: string }[] }) {
  return (
    <div className="bg-cream">
      <Container className="flex flex-col items-center gap-3.5 py-[clamp(40px,5vw,72px)] text-center">
        <nav aria-label="パンくずリスト" className="flex flex-wrap justify-center gap-2 text-xs text-label">
          <Link href="/" className="font-bold text-navy">HOME</Link>
          <span>/</span>
          {crumbs.map(c => (
            <span key={c.href} className="flex gap-2">
              <Link href={c.href} className="font-bold text-navy">{c.label}</Link>
              <span>/</span>
            </span>
          ))}
          <span>{title}</span>
        </nav>
        <RainbowDots />
        <h1 className="text-[clamp(28px,3vw,40px)] font-black text-navy">{title}</h1>
        {lead && <p className="text-[15px] leading-[1.9] text-sub">{lead}</p>}
      </Container>
    </div>
  );
}

export function WorkThumb({ className = "", label = "［実績写真］" }: { className?: string; label?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <Placeholder label={label} className="aspect-[3/2] transition-transform duration-200 ease-out group-hover:scale-[1.03]" />
    </div>
  );
}
