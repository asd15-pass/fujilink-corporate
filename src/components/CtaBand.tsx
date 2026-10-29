import Link from "next/link";

export function CtaBand() {
  return (
    <div className="flex flex-col items-center gap-6 bg-navy px-5 py-[clamp(48px,6vw,72px)] text-center text-white">
      <p className="text-[clamp(20px,2.4vw,26px)] font-black">まずはお気軽にご相談ください</p>
      <div className="flex justify-center gap-3">
        <Link href="/contact" className="whitespace-nowrap rounded-full bg-accent px-[clamp(20px,2.5vw,36px)] py-[15px] font-bold text-white hover:text-white hover:opacity-90">
          お問い合わせ
        </Link>
        <Link href="/recruit" className="whitespace-nowrap rounded-full bg-yellow px-[clamp(20px,2.5vw,36px)] py-[15px] font-bold text-navy hover:text-navy hover:opacity-90">
          採用エントリー
        </Link>
      </div>
    </div>
  );
}
