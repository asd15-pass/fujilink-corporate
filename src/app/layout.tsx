import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";
import "./globals.css";

// Zen Maru Gothic cut to the characters the site uses (scripts/subset-fonts.mjs): one file per weight, so the
// page is laid out once when the font arrives rather than once per Google Fonts slice.
const zen = localFont({
  variable: "--font-zen",
  src: [
    { path: "./fonts/zen-maru-400.woff2", weight: "400" },
    { path: "./fonts/zen-maru-500.woff2", weight: "500" },
    { path: "./fonts/zen-maru-700.woff2", weight: "700" },
    { path: "./fonts/zen-maru-900.woff2", weight: "900" },
  ],
  display: "swap",
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
