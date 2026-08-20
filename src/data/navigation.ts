import type { NavItem } from "@/types/navigation";

export const mainNav: NavItem[] = [
  { label: "事業案内", labelEn: "Business", href: "/business" },
  { label: "施工実績", labelEn: "Works", href: "/works" },
  { label: "選ばれる理由", labelEn: "Strengths", href: "/strengths" },
  { label: "会社概要", labelEn: "Company", href: "/company" },
  { label: "採用情報", labelEn: "Recruit", href: "/recruit" },
];

export const contactNav: NavItem = {
  label: "お問い合わせ",
  labelEn: "Contact",
  href: "/contact",
};

export const footerNav: NavItem[] = [
  ...mainNav,
  contactNav,
  { label: "プライバシーポリシー", labelEn: "Privacy Policy", href: "/privacy" },
];
