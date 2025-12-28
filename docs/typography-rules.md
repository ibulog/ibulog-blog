# タイポグラフィルール

## フォントサイズスケール

| 要素 | モバイル | デスクトップ | フォントウェイト | 行間 | 用途 |
|------|---------|-------------|----------------|------|------|
| H2 | `text-lg` (18px) | `text-lg` (18px) | `font-bold` (700) | デフォルト | セクション見出し |
| H3 | `text-lg` (18px) | `text-lg` (18px) | `font-bold` (700) | デフォルト | サブセクション見出し |
| H4 | `text-base` (16px) | `text-base` (16px) | `font-bold` (700) | デフォルト | 小見出し |
| 本文 (Text) | `text-base` (16px) | `text-base` (16px) | `font-normal` (400) | `leading-[1.8em]` (1.8em) | 記事本文、説明文 |
| 記事タイトル | `text-lg` (18px) | `text-lg` (18px) | `font-medium` (500) | デフォルト | ArticleCard、ArticleHeader |
| リンクカードタイトル | `text-base` (16px) | `text-base` (16px) | `font-bold` (700) | デフォルト | LinkCard |
| ナビゲーション | `text-base` (16px) | `text-sm` (14px) | `font-medium` (500) | デフォルト | モバイルメニュー、デスクトップメニュー |
| 目次リンク | `text-base` (16px) | `text-base` (16px) | `font-medium` (500) | デフォルト | ArticleIndex |
| 補助テキスト | `text-xs` (12px) | `text-xs` (12px) | `font-medium` (500) | デフォルト | 日付、タグ、ボタン |
| フッター | `text-sm` (14px) | `text-sm` (14px) | `font-normal` (400) | デフォルト | Footer |
| サイトタイトル | `text-xl` (20px) | `text-xl` (20px) | `font-medium` (500) | デフォルト | Header |

## ルール

### 1. 見出し系（H2, H3, H4）
- **統一**: モバイル・デスクトップで同じサイズ
- **理由**: 見出しは階層構造が重要で、サイズを変えると階層が崩れる

### 2. 本文（Text）
- **統一**: モバイル・デスクトップで同じサイズ（16px）
- **理由**: 可読性を保つため、本文は一定のサイズを維持

### 3. 記事タイトル（ArticleCard, ArticleHeader）
- **統一**: モバイル・デスクトップで同じサイズ（18px）
- **理由**: 一貫性を保ち、H2/H3と同じサイズで階層を明確にする

### 4. 補助テキスト（日付、タグ、ボタン）
- **統一**: モバイル・デスクトップで同じサイズ（12px）
- **理由**: メタ情報は小さく統一して、コンテンツを邪魔しない

## 実装ガイドライン

### Tailwindクラスの使用
- 基本サイズ: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`
- レスポンシブ: ナビゲーションなど、必要に応じて `text-base md:text-sm` のように使用
- 注意: カスタムサイズ（`text-l`など）は使用しない。標準のTailwindクラスを使用する

### フォントウェイト
- `font-normal` (400): 本文
- `font-medium` (500): 記事タイトル、ナビゲーション、補助テキスト
- `font-semibold` (600): アクティブなナビゲーション
- `font-bold` (700): 見出し、リンクカードタイトル

### 行間（line-height）
- **デフォルト**: 見出し、補助テキスト、ナビゲーションなど（`flex items-center`で配置が制御されているため、明示的な行間指定は不要）
- `leading-[1.5em]`: 記事タイトル（複数行になる可能性があるため）
- `leading-[1.8em]`: 本文（デフォルト、`global.css`で設定）
- `leading-normal`: インラインコード（`InlineCode`コンポーネント）

### 行間の原則
- `flex items-center`や親要素の`flex items-center`で配置が制御されている場合、明示的な行間指定（`leading-none`など）は不要
- 複数行になる可能性があるテキスト（記事タイトル、本文）のみ、明示的な行間を指定

