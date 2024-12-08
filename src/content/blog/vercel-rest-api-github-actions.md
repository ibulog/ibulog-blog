---
title: "Vercel REST APIとGitHub Actionsを使ってデプロイする"
description: "Vercel REST APIとGitHub Actionsを使って、便利にお安くデプロイする方法を説明します。"
pubDate: 2024-12-10
tags: ["CI/CD"]
heroImage: ""
---

この記事は [SmartHR Advent Calendar 2024](https://qiita.com/advent-calendar/2024/smarthr) 10日目の記事です。5日目の [sh-miyoshiさんの記事](https://qiita.com/sh-miyoshi/items/855cd33bd74622d5a32c) と若干ネタかぶりですが気にしない。

---

今さらFate/stay nightのアニメと映画を一気見しまして、たいへん感動したibulogです。

会社ではヘルプページの情報設計からヘルプセンターそのものの開発まで、主にヘルプセンター全般に関わるお仕事をしておりまして、
今日はヘルプセンターのデプロイに利用しているVercelとGitHub Actionsまわりのあれこれを整えたお話です。

## VercelとGitHubの連携、便利だけど

Vercelへデプロイする手段として一番てっとり早いのは、GitHubリポジトリとVercelの連携機能を使うことです。

[Deploying GitHub Projects with Vercel](https://vercel.com/docs/deployments/git/vercel-for-github)

設定を有効にするだけで、プルリクエスト作成時に自動でプレビューを生成してくれるので、めちゃくちゃ楽。

ただ一つ難点がありまして、素直に使うと「プルリクエスト作成者ごとにVercelのアカウントを発行する」必要があります。

つまり、コストがめっちゃかかります。

ただ画面を確認するためだけに、安くないアカウントを利用者全員に発行するのはちょっとツライですね。

そこでコストを抑えるため、[Vercel CLI](https://vercel.com/docs/cli)で対象ブランチをデプロイするGitHub Actionsを作成し、プルリクエスト作成時に実行されるようにしていました。

以下はGitHub Actionsの設定イメージ。

```yaml
name: Vercel Preview Deploy
on: pull_request

jobs:
  Deploy-Preview:
    env:
      VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
      VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 8
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version-file: '.node-version'
          cache: 'pnpm'
      - name: Install dependencies
        run: pnpm install
      - name: Deploy Project Artifacts to Vercel
        run: pnpm --silent vercel deploy --archive=tgz --token=${{ secrets.VERCEL_TOKEN }})
```

## もうちょっとだけ便利にしたい

Vercel CLIを使ったデプロイ環境でおおむね満足でしたが、もうちょっとだけ便利にしたいな〜という点がいくつか出てきました。

### 1. デプロイのキューがパンパンになる

ある日、利用者から「プレビューが生成されるのに時間がかかる」という声が届きました。1時間待ってもプレビューが生成されない、と。

静的ページを1,000ページ以上ビルドする必要があるので、ビルドに時間がかかるのは一定しょうがないのですが、それにしても遅い。

VercelのInspectを確認すると、デプロイ待ちのキューがパンパンになっておりました😇

キューがパンパンになっていた理由は主に3つ。
1. そもそもビルドにそこそこ時間がかかる（10分くらい）
2. 同時に5〜6人程度がプルリクエストを作ることがあるが、Vercelの現プランで並列実行できるデプロイは2件
3. 同じプルリクエストに間髪入れずPushされている

上記のうち、1と2はすぐに解決するのが難しかったり、解決にお金がかかったりするので、一旦保留するとして、3はGitHub Actionsにconcurrency設定を入れればなんとかなるかな？と思っていました。

が、すでにVercel側でデプロイが始まっている場合、Vercel CLIの実行をキャンセルしても、デプロイはキャンセルされません。

つまり、GitHub Actionsのワークフローをキャンセルするようconcurrencyを設定しても、Vercelのデプロイキューが詰まるのは解消されない......。

とはいえ、プレビューされるまでに1時間かかるのはさすがにアレなので、なんとかしたいお気持ちでした。

### 2. ブランチ共通のドメインが生成されない

素直にGitHub連携を使った場合、ブランチごとに下記のようなドメインが生成されます。

`https://{プロジェクト名}-{ブランチ名}-example.vercel.app`

上記のドメインに最新デプロイのドメインがエイリアスされるので、同一ブランチの最新のプレビューを確認するには、常に同じURLにアクセスすればよいというわけです。

これが割と使い勝手がよくて、プレビューを確認してほしい関係者に「このURLでプレビュー確認できます！」と共有しておけば、あとで変更を加えてもURLを共有し直さずに済みます。

ですが、Vercel CLIを使ってデプロイした場合、先述のエイリアスは使えず、デプロイごとのドメインのみ生成されていました（自分がVercel CLIを使いこなせていないだけかもですが）。

関係者へのプレビュー共有がやや手間になってしまっていたので、なんとかしたいお気持ちでした。

## Vercel REST APIを使う

結局、上記2つの課題は、Vercel CLIではなくVercel REST APIをGitHub Actionsで実行することで解決しました。

[Vercel REST API](https://vercel.com/docs/rest-api)

### 「1. デプロイのキューがパンパンになる問題」への対応

Vercel REST APIには、デプロイをキャンセルできるエンドポイントが用意されています。

[Deployments](https://vercel.com/docs/rest-api/endpoints/deployments#cancel-a-deployment)

デプロイを実行する前に同一ブランチのデプロイが実行されていないか確認し、実行されていればそのデプロイをキャンセルすればよさそう。

GitHub Actionsのワークフローはこんなイメージです。

```yaml
name: Vercel Preview Deploy
on: pull_request
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  Deploy-Preview:
    env:
      VERCEL_TEAM_ID: ${{ secrets.VERCEL_TEAM_ID }}
      VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 8
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version-file: '.node-version'
          cache: 'pnpm'
      - name: Install dependencies
        run: pnpm install
      - name: Cancel Same Branch Deploy
        run: pnpm run cancel-same-branch-deploy --branch ${{ github.head_ref }}
      - name: Deploy Preview
        run: pnpm deploy-branch-to-vercel --branch ${{ github.head_ref }}
```

まず、`concurrency` で `cancel-in-progress: true` を指定し、同一ブランチで新たにワークフローが実行された場合は、ワークフローがキャンセルされるようにしています。

ただし、ワークフローのconcurrency設定は、あくまでGitHub Actionsのキャンセル処理で、Vercel上ですでに実行されたデプロイはキャンセルされません。

Vercel上のデプロイもキャンセルするために、 `pnpm run cancel-same-branch-deploy --branch ${{ github.head_ref }}` で、プルリクエストのブランチ名を引数にして自作のスクリプトを実行しています。

スクリプト実装は詳細には説明しませんが、下記のようなことをVercel REST APIでやっています。

1. ブランチ名をもとにVercel上で実行中のデプロイを取得するAPIを叩く
2. デプロイが存在する場合は、そのデプロイをキャンセルするAPIを叩く

キャンセル処理が終わったらデプロイを実行するだけ。`pnpm deploy-branch-to-vercel --branch ${{ github.head_ref }}` がデプロイ処理で、こちらも自作のスクリプトを実行しています。

またまた詳細は割愛しますが、下記のようなことを同じくREST APIでやっています。

1. ブランチ名をもとにVercelのデプロイを実行するAPIを叩く
2. デプロイが完了したか定期的にAPIを叩いて確認する

デプロイ状況の取得、もうちょっとスマートにやりたかったんですが、いい方法が思い浮かばず......。

### 「2. ブランチ共通のドメインが生成されない」への対応

Vercel REST APIでは、ブランチを指定したデプロイを実行するために、GitHub連携を利用します。つまり、最新のデプロイがブランチごとのドメインにエイリアスされる機能を使えるので、自動的にこの課題は解決します。

ただし、単純にGitHub連携を有効にしてしまうと、GitHub連携がプレビューを自動生成しようとデプロイ処理を走らせるので、Vercelアカウントを持っていない人がプルリクエストを作るとCIが落ちます。

![](/20241210-vercel-github-actions/image00.png)

GitHub Actions経由でデプロイするため、GitHub連携の自動生成は不要。 `.vercel.json` で止めておくとよいです。

[Git Configuration](https://vercel.com/docs/projects/project-configuration/git-configuration)

```json
{
  "git": {
    "deploymentEnabled": false
  }
}
```

## おわりに

Vercel CLIからVercel REST APIに移行することで、コストを抑えてデプロイ環境を整えることができました 🎉

GitHub連携を有効にしたことで、プルリクエスト上にVercelのBotがデプロイ状況をコメントしてくれたりと、他にもよいことがいくつかあったので、乗り換えてよかったです。

## ふろく：実は他にも動機がありました

今回のVercel CLIからVercel REST APIへの乗り換え、書いた2つの課題を解決したかったのは確かなのですが、実は他にもう一つ大きな理由がありました。

### なんらかのサイズ制限がある？

Vercel CLIを使ったデプロイ体制時代に、「Request Entity Too Large」というエラーが出て、デプロイできない、という問い合わせがありました。

リポジトリのサイズが大きすぎるのかな？と当たりをつけて、あまり重要でない大きめの画像などを削除すると、デプロイが成功するようになりました。

上記から、なんらかのアップロード制限があると考えてVercel CLIからVercel REST APIへの乗り換えを考えることに。

- GitHub Actions→VercelへのArtifactsアップロード時に、なにか制限がある
- 今後も画像などは増える一方なので、いずれはまた制限に引っかかる日が来る
- Vercel REST APIを使えば、GitHubからVercelへのアップロードは発生しなくなるので、問題は解決しそう

### 何もしてないのに直った

で、この記事を書く前にエラーを再現させようと、当時エラーでデプロイできなかったブランチを再デプロイしたら......。

なんということでしょう。デプロイできてしまいました😇

何もしていないのに直った理由を深ぼろうと思ったのですが、ちょっと時間が足りなかったので、記事の構成を変更してお届けしました。