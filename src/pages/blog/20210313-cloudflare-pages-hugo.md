---
layout: "../../layouts/BlogPost.astro"
title: "Cloudflare Pages + Hugoでウェブアルバムをつくった"
description: "Hugoで静的サイトを構築し、Cloudflare Pagesにデプロイする手順を説明します。"
pubDate: "2021/3/13"
tags: ["Frontend"]
---

ずっと前にベータ版の利用申込みをしていて、ずっと前に利用案内がきていたCloudflare Pagesをなんとか成仏させたいと思い、Hugo製のアルバムっぽいウェブサイトをデプロイしてみました。


ものは試しということで。


## つくったウェブサイト

[ibulog Photo Gallery](https://ibulog.art/)

## Cloudflare Pagesってどうなん？

Zennのcatnoseさんがまとめてくださっていますね。

[Cloudflare Pages・Vercel ・Netlify の違いや使い分けをまとめる](https://zenn.dev/catnose99/scraps/6780379210136f)

ホスティング性能はVercelと同等、Netlifyより上。デプロイ体験はVercelとNetlifyにやや劣る、というのが現在地点のようです。

Cloudflare Pagesは無料で帯域制限なしというのが素晴らしいですが、デプロイ速度が遅すぎる...正式版リリース時には改善していることを願います。

## 手順

### Hugoでサイト作成

とりあえずHugoで簡単な画像表示サイトをつくっていきます。

```shell
hugo new site ibulog-art
```

今回選んだテーマはこれ。画像をグリッド表示できるやつです。

https://themes.gohugo.io/photo-grid/

テーマはsubmoduleで管理することに。

```
git init
git submodule add https://github.com/Chen-Zhe/photo-grid.git themes/photo-grid
```

`config.toml`を以下のように設定。

```
baseURL = "https://ibulog.art/"
languageCode = "ja-jp"
title = "ibulog Photo Gallery"
theme = "photo-grid"

[params]
  # Meta
  no_exif = false
  title = "ibulog Photo Gallery"
  subtitle = "自分で撮って「きれいだな」と思った写真を置いておく場所。アルバム。静的サイトジェネレーターの練習場所。あとなにか。"
  author = "ibulog"
  description = "ibulog Photo Gallery by Hugo"

  # Footer text
  copyright_since_year = 2014
  copyright_text = "All images"
  # footertext = "Made by [Hugo](http://gohugo.io), [Photo Grid](https://themes.gohugo.io/photo-grid/), and [ibulog](https://ibulog-iblog.hateblo.jp/archive)."
```

`content/photo/1-everyday/index.md`に、表示する画像のファイル名を画像の説明とともに記述し、同じ階層に画像を配置すればOK。

```
resources:

- src: kibidango.JPG
 name: きびだんご
 params:
  order: 1
  description: 広島旅行の道中、鈍行の中で食べたきびだんご。のどがめちゃくちゃかわいた記憶がある。

- src: fushimi-snow.JPG
 name: 雪の伏見稲荷
 params:
  order: 2
  description: 雪降る正月の伏見稲荷。こんなに雪が降っていても京阪は動く。

- src: keage-blossom.JPG
 name: 蹴上の桜
 params:
  order: 3
  description: 蹴上に咲く満開の桜。インクラインにはたくさんの人が花見に来ていた。
```

ローカルで表示を確認できたら、ウェブサイト作成の工程は終了。めちゃくちゃ簡単です。

```shell
hugo server
```

### Cloudflare Pagesにデプロイ

作成したウェブサイトをGitHubにpushしておき、Cloudflare Pagesにアクセス。

[Cloudflare Pages](https://pages.cloudflare.com/)

GitHubとの連携を促されるので、言われるがままに連携します。

![](/20210313-cloudflare-pages-hugo/image01.png)

連携が完了したら、セットアップ画面が表示されます。このへんは基本、適当に入力していればOKですが...

![](/20210313-cloudflare-pages-hugo/image02.png)

環境変数の`HUGO_VERSION`だけは必ず指定しましょう。これを指定しないと古いバージョンのHugoが使われ、ビルドに失敗します(失敗しました)。

![](/20210313-cloudflare-pages-hugo/image03.png)

あとはデプロイすれば、サイト自体は外から閲覧できるようになります。

![](/20210313-cloudflare-pages-hugo/image04.png)

### カスタムドメインを設定する

デプロイそのものは完了しましたが、HugoのbaseURLに「ibulog.art」を指定しているので、カスタムドメインを設定しないとページがうまく表示されません。

取得しておいた「ibulog.art」ドメインを、Cloudflare Pagesのカスタムドメインに設定していきます。

![](/20210313-cloudflare-pages-hugo/image05.png)

いざ設定を進めようとすると、CloudflareでDNSを管理しろ！と怒られました。

![](/20210313-cloudflare-pages-hugo/image06.png)

ドメインのレジストラ側でCloudflareのネームサーバーを指定しなさい、ということなので、おとなしく指定。案内された下記のネームサーバーを設定します。

![](/20210313-cloudflare-pages-hugo/image07.png)

ネームサーバーを指定したら、あとは特筆すべき設定項目はありません。「次へ」的なボタンをポチポチやるだけで、カスタムドメインの設定が完了します。

![](/20210313-cloudflare-pages-hugo/image08.png)

SSLが有効になるまでの時間がめちゃくちゃ早いです。1分もかからずにSSLが有効になりました。Netlifyのときはもっとかかっていた記憶があります。

あとはウェブサイトにアクセスして、表示されることを確認できれば作業完了！

![](/20210313-cloudflare-pages-hugo/image09.png)

うん、いい感じ。

![](/20210313-cloudflare-pages-hugo/image10.png)

### QUICをお試しする

Cloudflare PagesはQUICに対応しているらしいので、ちょっと使ってみました。Cloudflareのコンパネの「ネットワーク」タブから、QUICを有効化します。

![](/20210313-cloudflare-pages-hugo/image11.png)

DevToolで確認すると、たしかに一部QUICになってはいるものの...大抵の通信はHTTP/2です。他になにか設定がいるのだろうなあ。時間あるときに調べます。

![](/20210313-cloudflare-pages-hugo/image12.png)

## まとめ

というわけで、発表があった12月時点で利用申請をしていたCloudflare Pagesを、ようやく使うことができました。

まだまだベータ版ということで、今後の機能強化が楽しみです。