# カラールール

## カラーパレット

### 基本色

| 色名 | ライトモード | ダークモード | 用途 |
|------|------------|------------|------|
| `primary` | `#FFFFFF` (白) | `#171717` (ほぼ黒) | ページ背景、カード背景 |
| `accent` | `#7A8A53` (オリーブグリーン) | `#7A8A53` (オリーブグリーン) | アクセント色、アクティブ状態、ボーダー |

### グレースケール

| 色名 | 値 | 用途 |
|------|-----|------|
| `gray-100` | `#F5F5F5` | ライトモード背景 |
| `gray-200` | `#E5E5E5` | ライトモード目立つ背景 |
| `gray-300` | `#D4D4D4` | ライトモード控えめテキスト（反転） |
| `gray-400` | `#A3A3A3` | ライトモードボーダー（反転） |
| `gray-500` | `#737373` | ダークモードボーダー（反転） |
| `gray-600` | `#525252` | ダークモード目立つ背景 |
| `gray-700` | `#3D3D3D` | ライトモード背景（反転）、ダークモード背景 |
| `gray-800` | `#262626` | ライトモードテキスト、ダークモード目立つ背景（反転） |
| `gray-900` | `#171717` | ダークモード背景 |

### アプリケーションカラー

#### 背景色（Background）

| 色名 | ライトモード | ダークモード | 用途 |
|------|------------|------------|------|
| `app-bg` | `gray-100` | `gray-700` | カード背景、目次背景、リンクカード背景 |
| `app-bg-obvious` | `gray-200` | `gray-600` | より目立つ背景（インラインコード、JobCardアイコン） |
| `app-bg-default-reverse` | `gray-700` | `gray-100` | 反転背景（コードブロック、ボタンホバー） |
| `app-bg-obvious-reverse` | `gray-800` | `gray-200` | 反転目立つ背景（タグホバー） |
| `app-tag-default` | `gray-200` | `gray-800` | タグ背景 |

#### テキスト色（Text）

| 色名 | ライトモード | ダークモード | 用途 |
|------|------------|------------|------|
| `app-text` | `gray-800` | `gray-100` | メインテキスト（見出し、本文、記事タイトル） |
| `app-text-subtle` | `gray-700` | `gray-300` | 控えめなテキスト（日付、タグ、目次リンク、補助情報） |
| `app-text-default-reverse` | `gray-100` | `gray-800` | 反転テキスト（ボタンホバー） |
| `app-text-subtle-reverse` | `gray-300` | `gray-700` | 反転控えめテキスト（タグホバー） |

#### ボーダー色（Border）

| 色名 | ライトモード | ダークモード | 用途 |
|------|------------|------------|------|
| `app-border-default` | `gray-700` | `gray-400` | デフォルトボーダー |
| `app-border-default-reverse` | `gray-400` | `gray-500` | 反転ボーダー（コードブロック、JobCardアイコン、SideVector） |

### コード関連色

| 色名 | ライトモード | ダークモード | 用途 |
|------|------------|------------|------|
| `code-add` | `#1e4a1e` (濃い緑) | `#d4edda` (薄い緑) | コード追加行 |
| `code-remove` | `#4a2f35` (濃い赤) | `#f8d7da` (薄い赤) | コード削除行 |
| `code-highlight` | `#38444d` (濃いグレー) | `#e5e7eb` (薄いグレー) | コードハイライト |

## 使用パターン

### 1. 背景色の使い分け

| 要素 | 背景色 | 理由 |
|------|--------|------|
| ページ背景 | `bg-primary` | メイン背景色 |
| カードコンテナ | `bg-app-bg` | カードを区別するため |
| 目次コンテナ | `bg-app-bg` | カードと同じスタイル |
| 目次バー | `bg-app-bg` | カードと同じスタイル |
| リンクカード | `bg-app-bg` | カードと同じスタイル |
| 見出し（H2） | `bg-app-bg` | カードと同じスタイル |
| ヘッダー | `bg-app-bg` | カードと同じスタイル |
| フッター | `bg-app-bg` | カードと同じスタイル |
| コードブロック | `bg-app-bg-default-reverse` | コードを強調するため |
| コードブロックタイトル | `bg-app-bg-default-reverse` | コードブロック背景に合わせる |
| インラインコード | `bg-app-bg-obvious` | 本文から区別するため |
| タグ | `bg-app-tag-default` | タグ専用の背景色 |
| ボタン | `bg-app-bg` | デフォルト背景 |
| ボタンホバー | `bg-app-bg-default-reverse` | ホバー時の反転 |
| JobCardアイコン外側 | `bg-primary` | メイン背景色 |
| JobCardアイコン（非アクティブ） | `bg-app-bg-obvious` | 目立つ背景 |
| JobCardアイコン（アクティブ） | `bg-accent` | アクセント色で強調 |
| ArticleHeader | `bg-primary` | メイン背景色 |
| Quote（引用） | `bg-app-bg` | カードと同じスタイル |
| テーマアイコン | `bg-transparent` | 透明背景 |
| モバイルナビボタン | `bg-transparent` | 透明背景 |

### 2. テキスト色の使い分け

| 要素 | テキスト色 | 理由 |
|------|----------|------|
| 見出し（H2, H3, H4） | `text-app-text` | メインテキスト色 |
| 本文（Text） | `text-app-text` | メインテキスト色 |
| 記事タイトル | `text-app-text` | メインテキスト色 |
| リンクカードタイトル | `text-app-text` | メインテキスト色 |
| リンクカード補助情報 | `text-app-text-subtle` | 控えめな色でメタ情報を表示（ドメイン、説明） |
| 日付 | `text-app-text-subtle` | 控えめな色でメタ情報を表示 |
| タグ | `text-app-text-subtle` | 控えめな色でメタ情報を表示 |
| 目次リンク | `text-app-text-subtle` | 控えめな色で補助情報を表示 |
| 目次バーインジケーター | `bg-app-text-subtle` | 控えめな色で補助情報を表示 |
| フッター | `text-app-text-subtle` | 控えめな色で補助情報を表示 |
| ヘッダータイトル | `text-app-text` | メインテキスト色（デフォルト） |
| ナビゲーション（非アクティブ） | `text-app-text-subtle` | 控えめな色 |
| ナビゲーション（アクティブ） | `text-accent` | アクセント色で強調 |
| インラインコード | `text-app-text-subtle` | 本文から区別するため |
| コードブロックタイトル | `text-app-border-default-reverse` | コードブロック背景に合わせる |
| ボタン | `text-app-text` | メインテキスト色 |
| ボタンホバー | `text-app-text-default-reverse` | ホバー時の反転 |
| タグホバー | `text-app-text-subtle-reverse` | ホバー時の反転 |
| Quote（引用） | `text-app-text-subtle` | 控えめな色で補助情報を表示 |
| テーマアイコン | `var(--color-app-text-subtle)` | 控えめな色（CSS変数直接使用） |
| 404ページ | `text-app-text` | メインテキスト色（デフォルト） |
| Previous/Next見出し | `text-app-text` | メインテキスト色 |

### 3. ボーダー色の使い分け

| 要素 | ボーダー色 | 理由 |
|------|----------|------|
| タグ | `border-accent` | アクセント色で強調 |
| インラインコード | `border-accent` | アクセント色で強調 |
| ボタン | `border-accent` | アクセント色で強調 |
| コードブロックタイトル | `border-app-border-default-reverse` | コードブロック背景に合わせる |
| JobCardアイコン | `border-app-border-default-reverse` | 反転ボーダー |
| SideVector | `border-app-border-default-reverse` | 反転ボーダー |
| Header（初期状態） | `border-transparent` | 透明ボーダー |
| Header（スクロール時） | `border-app-border-default-reverse` | スクロール時の強調 |
| トップページアイコン枠 | `border-app-bg-obvious` | 目立つ背景色のボーダー（2px） |
| Previous/Next区切り | `border-app-border-default-reverse` | セクション区切り |
| テーマアイコン | `border-0` | ボーダーなし |
| モバイルナビボタン | `border-0` | ボーダーなし |

## ルール

### 1. 背景色の階層
- **メイン背景**: `bg-primary`（ページ全体、ArticleHeader）
- **カード背景**: `bg-app-bg`（カード、目次、見出し）
- **目立つ背景**: `bg-app-bg-obvious`（インラインコード、JobCardアイコン）
- **反転背景**: `bg-app-bg-default-reverse`（コードブロック、ボタンホバー）

### 2. テキスト色の階層
- **メインテキスト**: `text-app-text`（見出し、本文、記事タイトル）
- **控えめテキスト**: `text-app-text-subtle`（日付、タグ、目次リンク、補助情報）
- **アクセントテキスト**: `text-accent`（アクティブなナビゲーション）

### 3. ボーダー色の使い分け
- **アクセントボーダー**: `border-accent`（タグ、インラインコード、ボタン）
- **反転ボーダー**: `border-app-border-default-reverse`（コードブロック、JobCardアイコン、SideVector）

### 4. ホバー状態
- **ボタン**: `hover:bg-app-bg-default-reverse hover:text-app-text-default-reverse`
- **タグ**: `hover:bg-app-bg-obvious-reverse hover:text-app-text-subtle-reverse`
- **リンク**: `hover:underline`（テキスト色は変更しない）

### 5. アクティブ状態
- **ナビゲーション**: `text-accent font-semibold`（アクティブな項目）
- **JobCardアイコン**: `bg-accent`（最初の項目）

## 実装ガイドライン

### 背景色クラス
- ページ背景: `bg-primary`
- カード背景: `bg-app-bg`
- 目立つ背景: `bg-app-bg-obvious`
- 反転背景: `bg-app-bg-default-reverse`
- 反転目立つ背景: `bg-app-bg-obvious-reverse`
- タグ背景: `bg-app-tag-default`
- アクセント背景: `bg-accent`

### テキスト色クラス
- メインテキスト: `text-app-text`
- 控えめテキスト: `text-app-text-subtle`
- 反転テキスト: `text-app-text-default-reverse`
- 反転控えめテキスト: `text-app-text-subtle-reverse`
- アクセントテキスト: `text-accent`

### ボーダー色クラス
- デフォルトボーダー: `border-app-border-default`
- 反転ボーダー: `border-app-border-default-reverse`
- アクセントボーダー: `border-accent`

### ダークモード対応
- すべてのカラーは自動的にダークモードに対応
- `.dark`クラスが適用されると、CSS変数が自動的に切り替わる
- カスタムクラスを使用する場合は、ダークモード対応を確認する

## 一貫性の確認事項

### 確認済みの一貫性
- ✅ カード系コンポーネント（目次、リンクカード、見出し、ヘッダー、フッター）はすべて`bg-app-bg`を使用
- ✅ メインテキスト（見出し、本文、記事タイトル）はすべて`text-app-text`を使用
- ✅ 控えめなテキスト（日付、タグ、目次リンク、フッター）はすべて`text-app-text-subtle`を使用
- ✅ アクセントボーダー（タグ、インラインコード、ボタン）はすべて`border-accent`を使用
- ✅ 反転ボーダー（コードブロック、JobCardアイコン、SideVector）はすべて`border-app-border-default-reverse`を使用


## 注意事項

1. **一貫性**: 同じ用途の要素は同じ色を使用する
2. **階層**: テキストの重要度に応じて適切な色を使用する
3. **アクセシビリティ**: コントラスト比を確保する（WCAG 2.1 AA準拠）
4. **ダークモード**: すべての色はダークモードに対応している
5. **カスタム色の追加**: 新しい色を追加する場合は、`global.css`の`@theme`セクションに定義し、ダークモード対応も追加する
6. **CSS変数の直接使用**: `ThemeIcon`のように、TailwindクラスではなくCSS変数を直接使用する場合もある（`var(--color-app-text-subtle)`）

