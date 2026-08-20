# fujilink-corporate

株式会社フジリンクのコーポレートサイト。実装プランは **プランB（アドバンス）**。
第一段階では CMS・管理画面を導入せず、施工実績・会社情報などはローカルデータで管理する。

現状は **TOPページ（案6a / v2.0）** と共通レイアウトの実装まで。他ページは導線確認用の枠のみ。

## 技術構成

- Next.js 16（App Router / Turbopack）
- React 19 / TypeScript
- Tailwind CSS v4（`@theme` にデザイントークンを登録）
- Framer Motion 12（スクロール出現のみ）
- デプロイ: Vercel

## 開発

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
npx tsc --noEmit
```

環境変数は現時点で不要。

## デザイントークン

`src/app/globals.css` の `@theme` に定義。Tailwind のクラス名として使う。

### 面と文字

| トークン | 値 | 用途 |
| --- | --- | --- |
| `--color-bg` | `#FFFFFF` | ページ背景 |
| `--color-surface` / `--color-surface-hover` | `#F7F4EF` / `#F0EBE3` | 中立な面 |
| `--color-line` | `#E2DDD4` | 罫線（1色に統一） |
| `--color-ink` / `--color-ink-sub` | `#1C1917` / `#57534E` | 見出し / 本文 |

### アクセント4色

`accent`（テラコッタ）・`purple`・`teal`・`yellow`。すべてイラストから拾った色。
各色は必ず**3点セット**で持つ。

| 接尾辞 | 用途 | コントラスト条件 |
| --- | --- | --- |
| なし | 大きな数字・アイコン | 白地で 3:1 以上 |
| `-ink` | 小さい文字 | `-soft` の上で 4.5:1 以上 |
| `-soft` | カード地・チップ地 | — |

色を足すときは3点セットで追加する。小さい文字に無印を使うとコントラストが足りない。
`--color-accent-band`（`#F0D5C8`）は採用バナーの帯だけに使う指示書指定色。

**カードは背景色で区別する。** 事業カードはカテゴリごとに `-soft` を敷き、
中の文字は同じ色の `-ink`、タグは白地＋`-ink`。枠線は使わない。

### ボタン

| 種別 | スタイル |
| --- | --- |
| プライマリー | `bg-accent` ＋白文字、hover で `bg-accent-ink` |
| セカンダリー | 白地＋`border-2 border-accent`＋`text-accent-ink`、hover で `bg-accent-soft` |
| アクセント面の上 | 白地＋`text-accent` |

すべて角丸ピル（`rounded-full`）。

### タイポグラフィ

`next/font/google` で読み込み、`font-sans`（Noto Sans JP 400/700/900）/
`font-display`（Montserrat 700/800）/ `font-mono`（JetBrains Mono）で参照する。
見出しはセリフを使わず Noto Sans JP 900。

**最小フォントサイズは 12px。** スケールは以下。

| 役割 | サイズ |
| --- | --- |
| 注記・タグ（`note` / `chip`） | 12px |
| ラベル | 13px |
| 小さい本文・ナビ・フッター | 14px |
| 本文 | 15px |
| リード | 16px |
| カード見出し | 18–22px |
| セクション見出し（h2） | 28 / 36px |
| ページ見出し（h1） | 34 / 46 / 58px |
| 実績数値 | 44 / 56px |

`eyebrow`（Montserrat 800・13px・字間 .28em）/ `numeric` / `note` / `chip` は
`@utility` で定義した共通スタイル。

## ローカルデータ

データは JSX に直書きせず、`src/data/` に置いて `src/lib/repositories/` 経由で取得する。
将来 CMS へ移行する際は、リポジトリ層の実装だけを差し替える。

```
src/
├── data/          company / businesses / works / strengths / recruit / hero / stats /
│                  navigation / site / town
├── types/         上記に対応する型
└── lib/repositories/
    ├── worksRepository.ts   getAllWorks / getFeaturedWorks / getWorkBySlug / getRelatedWorks
    └── siteRepository.ts    getBusinessCategories / getStrengths / getStats /
                             getCompanyInfo / getHeroContent / getRecruitBanner / getTownScene
```

### 施工実績の追加・編集

`src/data/works.ts` の配列に `Work` を追加する。

- `slug`: URL に使う。半角英数とハイフン。既存と重複させない
- `mainImage`: `public/works/` に置いた画像のパス。未設定ならカードはプレースホルダー表示になる
- `featured`: `true` のものが TOP のピックアップに出る（`displayOrder` 昇順、上位3件）
- `displayOrder`: 小さいほど先頭
- `isPlaceholder`: 原稿・写真が未確定の枠。`true` のあいだは注記が表示される
- 必須は `id` / `slug` / `title` / `description` / `category` / `images` / `isPlaceholder`。他は任意

### 事業カテゴリの追加

`src/data/businesses.ts` に追加し、`displayOrder` で並べる。
TOP に出すものは `featuredOnTop: true`（現在は4件表示）。

### ヒーローのコピー

`src/data/hero.ts`。eyebrow・見出し行・リード文・CTA2つを保持する。

### 実績数値（数値バー）

`src/data/stats.ts`。ヒーロー直下の横並び3指標。ラベルを数字の上に置き、
ラベルと単位は同じ 16px にそろえる（アピール要素なので小さくしない）。
`isUnconfirmed` が1件でも `true` のあいだ、「実績数値は掲載前に要確認」の注記が表示される。
確定後に `false` にする。

## ヒーローイラスト

TOP のメインビジュアルは動画ではなくアニメーションイラスト（指示書 §4）。

- 素材: `public/town/`（PNG 10点。座標系は元イラスト 1472×934 のピクセル座標）
- マークアップ: `src/components/sections/HeroTown.tsx`（`viewBox="0 0 1472 934"` の SVG。幅は親要素で決まる）
- アニメーション: `src/app/town-animations.css`（`@keyframes` のみ。JavaScript 不要）

ヒーロー（`lg` 以上）はコピーとイラストを同じグリッドセルに重ね、コピーを左上に置く。
ビルを画角の中心に置くため、SVG の `viewBox` を看板の中心（x=670）が
画角中心（x=736）に来る分だけずらしている。
イラストを下げる量は `max(0px, calc(505px - 28.53vw))`
（コピーの高さ − 左側の建物が立ち上がる位置）。コピーの行数を変えたら要調整。
`lg` 未満はコピーとイラストを縦積みにし、イラストを画面幅の135%まで広げる。

車・歩行者10人・雲・鳥・浮遊岩は透過スプライト。木・クレーンの看板・配送バンだけ
`base-trans.png` の矩形を入れ子 `<svg>` で切り出してその場で変形させる（指示書 §4.3 のパッチ方式）。

**パッチ方式で人物を動かさないこと。** パッチは元画像の同じ矩形を重ねているだけなので、
変形させると矩形の中の背景ごと動き、芝生の上に建物の壁が乗るなどの継ぎ目が出る。
矩形でクリップすると今度は頭が欠ける（切り抜きに頭上の余白がない）。
人物に動きを足す場合は、透過スプライトの歩行者を増やす。

建物側は窓明かり22箇所、1階店舗の灯り2箇所、屋上ビーコン、デジタルサイネージの
色替えとスキャンライン、FUJI LINK 看板を横切る光沢。矩形はすべて `base-trans.png` から実測した値。

`prefers-reduced-motion: reduce` では全アニメーションを停止し、経路移動する要素
（車・歩行者・雲・鳥）を非表示にする。浮遊岩は静止位置に固定するため、
`town-animations.css` の `[data-rock]` に座標を持たせている。

`HeroTown` は差し替え可能な独立コンポーネントで、将来の動画背景に置き換える場合も
ここだけを入れ替えればよい。

## アニメーション方針

- スクロール出現のみ Framer Motion（`src/components/animations/Reveal.tsx`）
- イラストの常時アニメーションは CSS keyframes（`transform` / `opacity` のみ）
- `prefers-reduced-motion: reduce` で移動系（車・歩行者・雲・鳥）・浮遊系ともに停止
- JavaScript 無効時は `<noscript>` のスタイルで出現アニメーションを無効化し、内容を表示する

## 未対応事項 / TODO

- [ ] 正式ロゴ（現在はテキスト "FUJILINK." / Montserrat 800）
- [ ] ブランドカラー・使用フォントの確定
- [ ] 施工写真と施工実績の正式原稿
- [ ] 実績数値（年間約1,000件 / 47都道府県 / 6領域）の確認
- [ ] 事業カテゴリの正式名称・説明文
- [ ] 強みの正式コピー
- [ ] 採用キャッチコピーの確定、募集要項
- [ ] 会社情報（電話番号・設立・代表者・資本金・営業時間・許認可）
- [ ] プライバシーポリシー本文
- [ ] お問い合わせフォーム（UI・バリデーション・送信処理）
- [ ] 事業案内 / 施工実績一覧 / 施工実績詳細 / Before・After / 選ばれる理由 / 会社概要 / 採用情報の各ページ
- [ ] 構造化データ（Organization / LocalBusiness など。実在情報が揃ってから）
- [ ] OGP 画像

架空の会社情報・施工実績・顧客名・採用条件は掲載しない。
未提供の項目はデータ側で `undefined` のままにするか、`isProvisional` / `isPlaceholder` で明示する。
