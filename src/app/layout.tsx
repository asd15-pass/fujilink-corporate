import type { Metadata } from "next";
import { Montserrat, Zen_Maru_Gothic } from "next/font/google";
import { Header } from "@/components/Header";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";
import "./globals.css";

const zen = Zen_Maru_Gothic({
  variable: "--font-zen",
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  preload: false,
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "株式会社FUJI LINK｜街に彩りを、人につながりを。",
    template: "%s｜株式会社FUJI LINK",
  },
  description: "内外装工事・看板・サイン・店舗ディスプレイ・設計・イベント企画・施工修繕まで、お店づくりをワンストップで。株式会社FUJI LINK。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${zen.variable} ${montserrat.variable} antialiased`}>
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <CtaBand />
        <Footer />
      </body>
    </html>
  );
}
