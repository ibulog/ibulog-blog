# スペーシングルール

## スペーシングスケール

### Tailwindの基本単位
- `0`: 0px
- `1`: 4px (0.25rem)
- `2`: 8px (0.5rem)
- `2.5`: 10px (0.625rem)
- `3`: 12px (0.75rem)
- `4`: 16px (1rem)
- `6`: 24px (1.5rem)
- `8`: 32px (2rem)
- `9`: 36px (2.25rem)
- `10`: 40px (2.5rem)
- `12`: 48px (3rem)
- `14`: 56px (3.5rem)
- `16`: 64px (4rem)
- `20`: 80px (5rem)
- `24`: 96px (6rem)

## 使用パターン

### 1. コンテナのPadding

| 要素 | モバイル | デスクトップ | 用途 |
|------|---------|-------------|------|
| ページコンテナ（body） | `px-6 py-6` | `px-6 py-6` | 全体の余白 |
| メインコンテンツ（main） | `px-3 py-12` | `px-20 py-24` | 記事コンテンツエリア |
| Header | `px-6 py-4` | `px-6 py-4` | ヘッダー |
| Footer | `px-6 py-6` | `px-6 py-6` | フッター |
| カードコンテナ | `p-6` | `p-6` | LinkCardBase |
| 目次コンテナ | `px-6 py-4` | `px-6 py-4` | ArticleIndex（外側） |
| 目次リンクエリア | `pt-3 px-3` | `pt-3 px-3` | ArticleIndex（内側） |
| 目次リンク項目 | `p-2.5` | `p-2.5` | ArticleIndex内の各リンク |
| コードブロック | `p-3` | `p-3` | CodeBlock |
| コードブロック内 | `p-3` | `p-3` | CodeBlock内のコードエリア |
| 見出し（H2） | `p-6` | `p-6` | セクション見出し |
| 見出し（H3） | `p-2` | `p-2` | サブセクション見出し |
| 見出し（H4） | `py-4 px-6` | `py-4 px-6` | 小見出し |
| 本文（Text） | `px-3` | `px-3` | テキストコンテンツ |
| ボタン | `px-8` | `px-8` | Button |
| タグ | `px-1.5` | `px-1.5` | Tag |
| インラインコード | `mx-1 px-1` | `mx-1 px-1` | InlineCode |
| モバイルナビ項目 | `p-2.5` | `py-2.5 px-2.5` | MobileNavDropdown |
| 目次バーボタン | `px-3` | `px-3` | ArticleIndexBar |
| JobCardセクション | `px-6 py-4` | `px-6 py-4` | JobCard内のセクション |
| JobCardタイムライン | `pt-8` | `pt-8` | JobCardタイムラインアイコン |
| JobCardアイコン | `p-1`, `p-2` | `p-1`, `p-2` | JobCardタイムラインアイコン内 |

### 2. コンポーネント間のGap

| 用途 | サイズ | 使用例 |
|------|--------|--------|
| 小さな要素間 | `gap-2.5` | ArticleHeader内の要素、LinkCard内の要素、ArticleIndex内のリンク、H2/H3/H4内の要素、CodeBlock内、MobileNavDropdown、Pagination、JobCard内の要素、Tagsページのタグ間、タグ間 |
| カード間 | `gap-6` | ArticleCard間、セクション間、Header内の要素間、DesktopNavMenu |
| セクション間 | `gap-9` | 記事詳細ページのセクション間、ArticleCard内の要素間、JobCard内の要素間、404ページ、トップページのセクション間、Tagsページ |
| 特大セクション間 | `gap-14` | ArticleListSection内、ArticleList内 |
| 最大セクション間 | `gap-16` | トップページの主要セクション間 |

### 3. セクション間のMargin

| 用途 | サイズ | 使用例 |
|------|--------|--------|
| 見出しの上余白 | `mt-6` | H3, H4 |
| 見出しの上余白（大） | `mt-8` | H2 |
| セクション区切り | `mt-12` | Previous/Next Article間 |
| セクション区切り（上） | `pt-12` | Previous/Next Article上部 |

### 4. レスポンシブ対応

| 要素 | モバイル | デスクトップ | 理由 |
|------|---------|-------------|------|
| メインコンテンツ | `px-3` | `px-20` | デスクトップではより広い余白 |
| メインコンテンツ（縦） | `py-12` | `py-24` | デスクトップではより広い余白 |

## ルール

### 1. コンテナのPadding
- **統一**: 同じ用途のコンテナは同じpaddingを使用
- **例**: すべてのカードコンテナは`p-6`を使用

### 2. Gapの使い分け
- **小さな要素**: `gap-2.5`（コンポーネント内の要素間、タグ間など）
- **通常の要素間**: `gap-6`（カード間、セクション間、ナビゲーションなど）
- **セクション間**: `gap-9`（ページセクション間、大きな要素間など）
- **大きなセクション間**: `gap-12`（トップページ内のサブセクション間）
- **特大セクション間**: `gap-14`（ArticleListSection内、ArticleList内）
- **最大セクション間**: `gap-16`（トップページの主要セクション間）

### 3. 見出しのMargin
- **H2**: `mt-8 first:mt-0`（最初の要素は上余白なし）
- **H3, H4**: `mt-6 first:mt-0`

### 4. コンテンツの横余白
- **ページレベル**: `px-3`（モバイル）、`px-20`（デスクトップ）
- **コンポーネント内**: `px-3`（Text, ArticleCardラッパーなど）

## 実装ガイドライン

### Padding
- カードコンテナ: `p-6`（LinkCardBase）
- 目次コンテナ: `p-6 pb-3`（ArticleIndex外側）
- 目次リンクエリア: `pt-3 px-3`（ArticleIndex内側）
- 目次リンク項目: `p-2.5`（ArticleIndex内の各リンク）
- コードブロック: `p-3`（CodeBlock）
- コードブロック内: `p-3`（CodeBlock内のコードエリア）
- 見出し（H2）: `p-6`
- 見出し（H3）: `p-2`
- 見出し（H4）: `py-4 px-6`
- 本文: `px-3`
- ボタン: `px-8`
- タグ: `px-1.5`
- インラインコード: `mx-1 px-1`
- モバイルナビ項目: `py-2.5 px-2.5`
- 目次バーボタン: `px-3`
- JobCardセクション: `px-6 py-4`
- JobCardタイムライン: `pt-8`
- JobCardアイコン: `p-1`（外側）、`p-2`（内側）

### Gap
- 小さな要素: `gap-2.5`（ArticleHeader内、LinkCard内、ArticleIndex内、H2/H3/H4内、CodeBlock内、MobileNavDropdown、Pagination、JobCard内、Tagsページのタグ間、タグ間）
- 通常の要素: `gap-6`（ArticleCard間、Header内の要素間、DesktopNavMenu）
- セクション: `gap-9`（記事詳細ページのセクション間、ArticleCard内、JobCard内、404ページ、トップページ、Tagsページ）
- 大きなセクション: `gap-12`（トップページ内のサブセクション間）
- 特大セクション: `gap-14`（ArticleListSection内、ArticleList内）
- 最大セクション: `gap-16`（トップページの主要セクション間）

### Margin
- 見出しの上余白: `mt-6`（H3, H4）、`mt-8`（H2）
- 最初の要素: `first:mt-0`を使用して上余白を削除

### レスポンシブ
- メインコンテンツ: `px-3 md:px-20`
- メインコンテンツ（縦）: `py-12 md:py-24`

## 注意事項

1. **一貫性**: 同じ用途の要素は同じスペーシングを使用する
2. **階層**: 要素の階層に応じて適切なgapを使用する
3. **レスポンシブ**: モバイルとデスクトップで適切に使い分ける
4. **first:mt-0**: 最初の見出しには必ず`first:mt-0`を追加する

