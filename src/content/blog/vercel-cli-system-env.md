---
title: "Vercel CLIでデプロイする際の環境変数の取り回しにハマった"
description: "Vercel CLIでNext.jsのアプリケーションをデプロイする際、Vercelが提供する環境変数をうまく使えなくて困ったお話です。"
pubDate: 2024-04-13
tags: ["Frontend"]
heroImage: ""
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

このファイルに記述された環境変数は、GitHub Actionsでのビルドでは使用してくれないようです。
Next.js公式を確認してみても、確かに対応してなさそう。
[Configuring: Environment Variables | Next.js](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)

## 解決策

Vercel上でビルドすると `.vercel/.env.preview.local` の値を使ってくれるので、下記のようにすればOK。prebuildをやめればよいわけです。

1. `vercel pull` で環境変数を取得
2. `vercel deploy` でVercel上でビルド＆デプロイ

設定ファイルは下記のようになります。

```yaml
- name: Pull Vercel Environment Information
  run: pnpm vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
- name: Deploy Project to Vercel
  run: pnpm vercel deploy --archive=tgz --token=${{ secrets.VERCEL_TOKEN }})
```

上記の変更で、`VERCEL_URL` の値を取得できるようになりました。めでたしめでたし。検証してはいないですが `vercel pull` も不要かも？

## まとめ

これに気づくのに2時間くらいかかりました...

Vercelでビルドするようにした結果、Next.jsのキャッシュもうまく効くようになり、CIが早くなったのは一石二鳥！
キューがたまりやすくなったので、全体としてはトントンかもですが。
