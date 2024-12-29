---
title: "Vercel CLIでデプロイする際の環境変数の取り回しにハマった"
description: "Vercel CLIでアプリケーションをデプロイする際、Vercelが提供する環境変数をうまく使えなくて困ったお話です。"
pubDate: 2024-04-13
tags: ["CI/CD"]
---

こんにちは。気がつけば最後の更新が1年以上前になっていました。

Vercelは自分で設定する環境変数のほかに、システム標準の環境変数が利用できます。プレビュー環境のドメイン名などを取得できて便利。

[System Environment Variables Overview](https://vercel.com/docs/projects/environment-variables/system-environment-variables)

便利なんですが、GitHub ActionsとVercel CLIの組み合わせで上記の環境変数を利用しようとしたら、まんまとハマったのでメモしておきます。

## 起こったこと

環境変数の `VERCEL_URL` を使って、コード内でドメイン名を用いた分岐を書いていました。デプロイ用のGitHub Actionsのワークフローの流れは下記の通り。

1. `vercel pull` で環境変数を取得
2. `vercel build` でビルド
3. `vercel deploy --prebuilt` でビルドしたファイルをVercelにデプロイ

設定ファイルはこんな感じ。

```yaml
- name: Pull Vercel Environment Information
  run: pnpm vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
- name: Build Project
  run: pnpm vercel build --token=${{ secrets.VERCEL_TOKEN }}
- name: Deploy Project to Vercel
  run: pnpm vercel deploy --prebuilt --archive=tgz --token=${{ secrets.VERCEL_TOKEN }})
```

デプロイは問題なくできたのですが、`VERCEL_URL` が空になってしまうという問題に直面しました。

## 原因

Vercel CLIの `vercel pull` を使うと、Vercelから環境変数の情報を取得して `.vercel/.env.preview.local` に配置してくれます。

が、このファイルに記述された環境変数は、GitHub Actionsでのビルドでは使用してくれないようです。

## 解決策

Vercel上でビルドすると環境変数がそのまま利用できるので、prebuildをやめればよいわけです。

設定ファイルは下記のようになります。

```yaml
- name: Deploy Project to Vercel
  run: pnpm vercel deploy --archive=tgz --token=${{ secrets.VERCEL_TOKEN }})
```

上記の変更で、`VERCEL_URL` の値を取得できるようになりました。めでたしめでたし。

## まとめ

これに気づくのにけっこうな時間を費やしました...

アプリケーションはNext.js製なのですが、Vercelでビルドするようにした結果、キャッシュがうまく効くようになり、CIが早くなる副次的効果もありました。

prebuildをやめてキューがたまりやすくなったので、全体としてはトントンかもですが。
