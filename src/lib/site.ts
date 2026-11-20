export type Service = {
  slug: string;
  tag?: string;
  name: string;
  en: string;
  color: string;
  tint: string;
  items: string[];
  desc: string;
};

export const SERVICES: Service[] = [
  { slug: "interior", tag: "内装", name: "内外装工事", en: "INTERIOR", color: "#48b14b", tint: "#e3f3e2", items: ["店舗内装", "外装改修", "オフィス"], desc: "店舗・オフィス・商業施設の内装から外装改修まで、空間づくりをまるごとお任せいただけます。アミューズメント施設など、にぎやかで大規模な空間の施工経験が豊富です。新装・改装・原状回復まで、規模を問わずご相談ください。" },
  { slug: "sign", tag: "サイン", name: "看板・サイン", en: "SIGN", color: "#ec8aa3", tint: "#fce6ec", items: ["屋外看板", "LEDサイン", "館内サイン"], desc: "屋外看板・LEDサイン・館内サインまで、デザインから製作・取り付け工事まで一貫して対応します。お店の「顔」として目を引き、集客につながるサインをおつくりします。" },
  { slug: "display", tag: "ディスプレイ", name: "店舗ディスプレイ", en: "DISPLAY", color: "#f0a46a", tint: "#fdeadb", items: ["什器", "VMD", "ウィンドウ"], desc: "売場の什器やウィンドウディスプレイ、季節装飾など、商品が映える売場づくりをお手伝いします。「見やすく、手に取りやすく、買いたくなる」売場をつくります。" },
  { slug: "design", tag: "設計", name: "設計", en: "DESIGN", color: "#6cb4e4", tint: "#e2f0fa", items: ["店舗設計", "図面作成", "各種申請"], desc: "店舗の設計・図面作成から、出店に必要な各種申請まで対応します。「こんなお店にしたい」というイメージ段階からでも、図面に起こしてかたちにしていきます。" },
  { slug: "event", tag: "イベント", name: "イベント企画・提案", en: "EVENT", color: "#e8503f", tint: "#fbe2de", items: ["企画", "ブース施工", "運営"], desc: "展示会ブースや店頭イベントの企画から、設営・運営までトータルでサポートします。目的とご予算に合わせた、人が集まる企画をご提案します。" },
  { slug: "construction", name: "施工・修繕", en: "CONSTRUCTION", color: "#0aa39a", tint: "#d9f1ef", items: ["修繕", "メンテナンス", "撤去"], desc: "施工後の修繕・メンテナンスから、閉店時の撤去・原状回復まで対応します。「作って終わり」ではなく、お店の営業を長く支えるパートナーであり続けます。" },
];

export const TOP_SERVICES = ["interior", "sign", "display", "design"];

export const INDUSTRIES = ["オフィス", "飲食", "物販", "商業施設", "アミューズメント", "ジム", "学校", "展示会"];
export const CATEGORIES = ["内外装工事", "看板・サイン", "店舗ディスプレイ", "設計", "イベント企画・提案", "施工・修繕"];
export const WORK_TAGS = [
  "内装", "内装施工", "パーテーション", "ロールスクリーン",
  "屋外看板", "屋外懸垂幕", "野立て看板", "袖看板", "チャンネル文字", "屋外昇降機",
  "窓シート", "壁面シート", "エントランス壁面シート", "スモークシート", "アルポリ看板", "パネル",
  "ブース装飾", "レッドカーペット", "LEDオブジェ", "アクリルネオンLED",
  "鏡", "扉", "設計", "解体", "塗装", "植栽",
];

export type Work = {
  id: string;
  title: string;
  industry: string;
  category: string;
  tags: string[];
  date: string;
  description: string;
  point?: string;
  mainPhoto?: string;
  subPhotos: string[];
};

const WORK_PHOTO_COUNTS: Record<string, number> = {
  "1": 3, "2": 4, "3": 4, "4": 3, "5": 4, "6": 2, "7": 2, "8": 3, "9": 4,
  "10": 4, "11": 2, "12": 1, "13": 1, "14": 2, "15": 1, "16": 3, "17": 3, "18": 4,
};

type WorkMeta = { title: string; category: string; industry: string; tags: string[]; description: string; point?: string };

const WORK_META: Record<string, WorkMeta> = {
  "1":  {
    title: "印刷会社（都内）パーテーション工事",
    category: "内外装工事", industry: "オフィス",
    tags: ["内装", "パーテーション", "ロールスクリーン"],
    description: "印刷会社様の新規オフィス内に、パーテーション工事を実施致しました。",
    point: "施工後のデスクレイアウトや、人員の動線・セキュリティ面も考慮し、パーテーションの位置を決定。来客時の目隠しとして、給湯室にロールカーテンも設置しました。",
  },
  "2":  {
    title: "Your Gym（都内）屋外看板施工",
    category: "看板・サイン", industry: "ジム",
    tags: ["屋外看板", "窓シート"],
    description: "フィットネスジムの開業にあたり、地上からも視認性がある突き出しフラッグ看板と窓シートを作成・施工。",
    point: "テナントのベランダの現状復帰が条件な為、壁面を傷めないように特注の金属器具を作成し、フラッグを取り付け。",
  },
  "3":  {
    title: "スポーツジムエントランス施工（埼玉県）",
    category: "看板・サイン", industry: "ジム",
    tags: ["屋外懸垂幕", "窓シート", "エントランス壁面シート"],
    description: "大手スポーツジムの屋内外のサイン施工を実施。ビルの入口が目立たなかった点・営業日の記載をする為、視認性の高い箇所に施工。",
    point: "全てデザイン・設置箇所のご提案・施工設置まで一貫して行いました。",
  },
  "4":  {
    title: "Coffee house Le Vent（都内）屋外看板・内装施工",
    category: "看板・サイン", industry: "飲食",
    tags: ["屋外看板", "壁面シート", "内装施工"],
    description: "店舗のリニューアルに際し、内装（カウンター・クロス・ソファ）・店頭看板の施工実施",
    point: "全てデザインから施工まで一貫して行いました。店頭はシックに。店内は明るくする事ができました。",
  },
  "5":  {
    title: "展示会ブース（都内）",
    category: "看板・サイン", industry: "展示会",
    tags: ["ブース装飾", "壁面シート"],
    description: "クライアント様が展示会に出展するにあたり、ブース内のシート貼り施工〜撤去まで実施。",
    point: "ご予算に合わせたご提案で実施頂けました。",
  },
  "6":  {
    title: "屋外昇降機施工（都内）",
    category: "看板・サイン", industry: "学校",
    tags: ["屋外昇降機", "屋外懸垂幕"],
    description: "学校の敷地内の壁面に大会受賞者名の懸垂幕を掲示する為の昇降機を施工。",
    point: "ご要望に合わせた台数・大きさで提案させて頂き、施工を実施。",
  },
  "7":  {
    title: "体育館鏡工事",
    category: "内外装工事", industry: "学校",
    tags: ["鏡", "扉", "内装施工"],
    description: "学校の体育館の古くなった鏡と引き戸を解体〜新設。",
    point: "壁面の下地が特殊だった為、現調を重ね無事施工できました。",
  },
  "8":  {
    title: "GLOVE CAMP463 LED看板工事（埼玉県）",
    category: "看板・サイン", industry: "物販",
    tags: ["チャンネル文字", "袖看板"],
    description: "新規OPENの野球専門ショップ様の袖看板とLEDのチャンネル文字看板を作成・施工しました。",
  },
  "9":  {
    title: "オフィス兼自社工場（都内）",
    category: "内外装工事", industry: "オフィス",
    tags: ["内装施工", "設計", "解体", "塗装"],
    description: "都内の路面と地下にオフィス兼倉庫兼自社工場を設立するにあたり、設計〜解体〜施工（内装・塗装）まで実施しました。",
    point: "倉庫内は予算を抑える為にクロス貼り等はせず、オフィスは来客も想定しておしゃれに仕上げました。",
  },
  "10": {
    title: "新橋Bar（都内）",
    category: "内外装工事", industry: "飲食",
    tags: ["内装施工", "設計", "解体", "塗装"],
    description: "都内の雑居ビルの4階に新規OPENするBarの設計・解体〜施工まで実施しました。",
    point: "バーカウンターにこだわりたいとのお声があり、高さや天面の色等、細部までこだわりおしゃれな内装に仕上がりました。",
  },
  "11": {
    title: "つけ麺屋",
    category: "看板・サイン", industry: "飲食",
    tags: ["屋外看板", "屋外懸垂幕"],
    description: "つけ麺屋がOPENするにあたり、店頭看板と懸垂幕を作成・設置しました。",
  },
  "12": {
    title: "商業施設ショーケース内装飾",
    category: "店舗ディスプレイ", industry: "商業施設",
    tags: ["パネル"],
    description: "商業施設内のショーケースに飲食店のパネルを設置しました。",
  },
  "13": {
    title: "アル・サナドスクールジャパン（埼玉県）",
    category: "看板・サイン", industry: "学校",
    tags: ["野立て看板"],
    description: "弊社HPをご覧になられ問い合わせを頂き、現調〜施工まで実施しました。",
  },
  "14": {
    title: "パチンコホールLEDアクリルネオン（都内）",
    category: "店舗ディスプレイ", industry: "アミューズメント",
    tags: ["アクリルネオンLED"],
    description: "店舗のロゴをLEDアクリルネオンにて作成致しました。",
    point: "店舗の目立つ所に天吊りにて設置しました。",
  },
  "15": {
    title: "パチンコホールレッドカーぺット敷設",
    category: "内外装工事", industry: "アミューズメント",
    tags: ["レッドカーペット"],
    description: "店舗内の目立つ通路にレッドカーペットを敷設。",
  },
  "16": {
    title: "パチンコホール屋外ブース装飾",
    category: "店舗ディスプレイ", industry: "アミューズメント",
    tags: ["LEDオブジェ", "壁面シート", "アルポリ看板"],
    description: "店舗メイン入口横の壁面にフォトスポット兼オススメ機種のブースを装飾しました。",
    point: "定期的に装飾変更を行なっており、通行人が撮影している姿も散見されます。",
  },
  "17": {
    title: "本社ビルエントランス前植栽工事",
    category: "施工・修繕", industry: "オフィス",
    tags: ["植栽"],
    description: "某本社ビル前の植栽の植え替えを実施しました。",
    point: "土が露出し、一部が枯れていた為、植え替えを行い、綺麗になりました。",
  },
  "18": {
    title: "パチンコ店風除室スモークシート貼り工事",
    category: "施工・修繕", industry: "アミューズメント",
    tags: ["スモークシート", "アルポリ看板"],
    description: "店舗の古くなったシートを剥がし、西日対策の為半透明のスモークシートに貼り替えを実施。合わせて目の前の県道に向けて、壁面看板を新設。",
    point: "県道側からの視認性もあがり、夜でも目立つ看板に仕上がりました。",
  },
};

// Placeholder works until the CMS is connected; mirrors the prototype's generator.
export const WORKS: Work[] = Array.from({ length: 18 }, (_, i) => {
  const d = new Date(2026, 9, 20 - i * 4);
  const pad = (n: number) => String(n).padStart(2, "0");
  const id = String(i + 1);
  const count = WORK_PHOTO_COUNTS[id] ?? 0;
  const photos = Array.from({ length: count }, (_, j) => `/works/${id.padStart(3, "0")}-${pad(j + 1)}.webp`);
  const meta = WORK_META[id];
  return {
    id,
    title: meta?.title ?? "案件名が入ります",
    industry: meta?.industry ?? INDUSTRIES[(i * 7) % INDUSTRIES.length],
    category: meta?.category ?? CATEGORIES[i % CATEGORIES.length],
    tags: meta?.tags ?? [WORK_TAGS[i % WORK_TAGS.length]],
    date: `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`,
    description: meta?.description ?? "簡単な概要テキストが入ります（2〜3行程度）",
    point: meta?.point,
    mainPhoto: photos[0],
    subPhotos: photos.slice(1),
  };
});

export const TOP_PICKUP_IDS = ["1", "2", "4"];

export const REASONS = [
  {
    title: "ワンストップ対応",
    sub: "相談から施工まで、窓口はひとつ。",
    color: "#ec8aa3",
    tint: "#fde9ee",
    body: "企画・設計・製作・施工まで、すべてフジリンクが窓口になります。内装・看板から販促物まで、お店の「見せ方」に関わるものはまとめてご相談ください。社内に設計担当がいるので、図面づくりから話が早く進みます。",
  },
  {
    title: "規模を問わない対応力",
    sub: "小さなご依頼から、全国一斉の展開まで。",
    color: "#6cb4e4",
    tint: "#dcf3fc",
    body: "店舗1軒の看板交換から、多店舗チェーンの全国一斉リニューアルまで対応します。拠点ごとの施工手配や進行管理もまとめて引き受けるので、規模が大きくなっても窓口は変わりません。",
  },
  {
    title: "「できない」と言わない",
    sub: "完全オーダーメイドでお応えします。",
    color: "#48b14b",
    tint: "#e3f3e2",
    body: "既製品では合わない形や素材、短納期のご相談も、まずはお聞かせください。製作方法や代替案まで含めて検討し、ご要望を形にする方法を一緒に探します。",
  },
];

export const LOGO_COLORS = ["#ec7c92", "#f08a4b", "#f8cc03", "#48b14b", "#01a19a", "#00b8ee", "#9a72af", "#e7373e"];

export const COMPANY = {
  name: "株式会社FUJI LINK",
  zip: "〒340-0006",
  address: "埼玉県草加市八幡町1168-13",
  tel: "048-633-9656",
  hours: "9:00〜18:00",
};

export const SITE_URL = "https://fujilink.co.jp";

export const NAV = [
  { label: "事業案内", href: "/service" },
  { label: "施工実績", href: "/works" },
  { label: "選ばれる理由", href: "/reason" },
  { label: "会社概要", href: "/company" },
  { label: "採用情報", href: "/recruit" },
];

export const FOOTER_NAV = [...NAV, { label: "お問い合わせ", href: "/contact" }, { label: "プライバシーポリシー", href: "/privacy" }];
