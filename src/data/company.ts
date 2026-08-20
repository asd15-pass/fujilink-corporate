import type { CompanyInfo } from "@/types/company";

// 確定情報のみを保持する。未提供の項目は追加せず undefined のままにする（TODO: 支給待ち）。
// TODO: 電話番号 / 設立 / 代表者 / 資本金 / 営業時間 / 許認可 が未提供
export const company: CompanyInfo = {
  name: "株式会社フジリンク",
  nameEn: "FUJILINK",
  postalCode: "340-0006",
  address: "埼玉県草加市八幡町1168-13",
  fax: "048-633-9656",
  email: "r-fujita@fujilink.co.jp",
};
