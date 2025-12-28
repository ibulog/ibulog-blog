# いぶろぐ雑記

個人ブログサイト「いぶろぐ雑記」のソースコードです。

## 技術スタック

### フレームワーク・ビルドツール
- **Astro** - 静的サイトジェネレーター
- **TypeScript** - 型安全性の確保
- **Vite** - ビルドツール

### スタイリング
- **Tailwind CSS** - ユーティリティファーストのCSSフレームワーク

### コンテンツ管理
- **Astro Content Layer API** - ブログ記事の管理
  - **MDX** - Markdown拡張
  - **microCMS** - 外部コンテンツ管理（自己紹介、職歴）

### コードハイライト
- **Shiki** - シンタックスハイライト
- **@shikijs/transformers** - コードブロックの拡張機能（diff、highlight、focus）

### その他の主要ライブラリ
- **@astrojs/rss** - RSSフィード生成
- **@astrojs/sitemap** - サイトマップ生成
- **@astrojs/partytown** - サードパーティスクリプトの最適化（Google Analytics）
- **open-graph-scraper** - OGPデータの取得（リンクカード用）
- **remark-breaks** - Markdownの改行処理
- **カスタムremarkプラグイン** - コードブロック、リンクカードの拡張

## ディレクトリ構成

```
ibulog-blog/
├── docs/              # デザインルールドキュメント
├── public/            # 静的ファイル
├── src/
│   ├── assets/        # 画像アセット（Astroで最適化）
│   ├── components/    # コンポーネント
│   │   └── ui/        # UIコンポーネント
│   ├── data/          # コンテンツデータ（MDXファイル）
│   ├── layouts/       # レイアウトコンポーネント
│   ├── pages/         # ページ（ファイルベースルーティング）
│   ├── remark/        # カスタムremarkプラグイン
│   ├── styles/        # グローバルスタイル
│   ├── utils/         # ユーティリティ関数
│   ├── config.ts      # グローバル設定
│   └── content.config.ts  # コンテンツコレクション設定
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## 主要な設計思想

### コンポーネント構成
- **`components/ui/`**: 再利用可能な基本的なUIコンポーネント
- **`components/`**: 機能を持つ複合コンポーネント
- **`layouts/`**: ページレイアウトを定義するコンポーネント

### スタイリングルール
プロジェクトでは一貫性のあるデザインシステムを維持するため、以下のルールドキュメントを定義しています：

- **`docs/typography-rules.md`**: フォントサイズ、フォントウェイト、行間の統一ルール
- **`docs/spacing-rules.md`**: パディング、マージン、ギャップの統一ルール
- **`docs/color-rules.md`**: カラーパレットと使用パターンの統一ルール

### 設定の一元管理
- **`src/config.ts`**: サイト全体で使用する定数（タイトル、URL、ナビゲーション、ページ種別、タグなど）
- **`src/content.config.ts`**: コンテンツコレクションのスキーマ定義

## 開発

### セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

### 環境変数

`.env`ファイルに以下の環境変数を設定してください：

```
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

## 機能

### ブログ機能
- 記事一覧（ページネーション対応）
- 記事詳細ページ
- タグによる記事フィルタリング
- 記事目次（自動生成、スティッキー対応）
- RSSフィード

### その他の機能
- ダークモード対応
- レスポンシブデザイン
- 画像最適化（Astro Image）
- OGP対応
- サイトマップ自動生成
- Google Analytics統合（Partytown経由）
