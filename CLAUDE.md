@AGENTS.md

# fujilink-corporate — プロジェクトルール

## プロジェクト概要

FUJILINK のコーポレートサイト。Next.js App Router + TypeScript + Tailwind CSS で構築する。

## 技術スタック

- Next.js（App Router）
- TypeScript
- Tailwind CSS v4
- デプロイ: Vercel

## ディレクトリ構成

```
src/
  app/          # ルート・ページ
  components/   # 再利用コンポーネント
  lib/          # ユーティリティ
public/         # 画像・フォントなど静的ファイル
```

## コーディングルール

- コンポーネントは `src/components/` に置く
- `'use client'` は必要最小限にとどめる（デフォルトはサーバーコンポーネント）
- 画像は `next/image` を使う
- リンクは `next/link` を使う
- フォントは `next/font/google` で読み込む
- コメントは原則書かない（コードで自明でない場合のみ）

## デザイン方針

- モバイルファーストでレスポンシブ対応
- アクセシビリティ: コントラスト比 4.5:1 以上、キーボード操作対応
- パフォーマンス: 画像は WebP/AVIF、Lazy loading
