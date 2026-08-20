import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function ArrowLink({ href, children, className }: Props) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 whitespace-nowrap border-b border-ink pb-2 text-[14px] font-medium tracking-[0.04em] text-ink transition-colors hover:border-accent hover:text-accent ${className ?? ""}`}
    >
      {children}
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
