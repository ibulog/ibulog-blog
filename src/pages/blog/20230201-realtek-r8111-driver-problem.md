---
layout: "../../layouts/BlogPost.astro"
title: "Realtek 8111Gのドライバー問題を解決する"
description: "なんかサーバーが不安定だと思ったらRealtekのドライバーのせいでしたというお話です。"
pubDate: "2023/02/01"
tags: ["Infrastructure"]
heroImage: "/20230201-realtek-r8111-driver-problem/top.jpeg"
---

こんにちは。

年末年始にかけて我が家の録画サーバーがめっちゃ不調に陥ってしまい、ほとほと困り果てていました。

2016年くらいから稼働しているのでそろそろ寿命かなーと思ったら、Realtekのドライバー問題でしたというお話です。

## 原因の調査

サーバーの症状としては、起動から2日ほど経つと勝手に再起動してしまい、しかも起動に失敗する無限ループに入るという感じ。

強制シャットダウンし、20秒ほど待つと起動に成功する。

`journalctl` を見ても目立ったエラーはなし。なんとなくメモリが怪しいと思ってMemtest86を回してみましたが、こちらもエラーは検知されず。

録画サーバーをDHCPサーバーとして使い始めた頃から症状が出始めたな〜と思い当たり、ネットワーク周りを調査したところ、ビンゴでした。

LANケーブルを抜き差しすると、再起動ループに入ることがわかりました。

## 原因

我が家の録画サーバーはmini-ITXなのにPCIeスロットが2本ある変態マザー「BIOSTAR H81MHV3」を使っています。

このマザーのLANコントローラーはRealtek r8111Gなのですが、どうやらこのコントローラーのドライバーに問題があるようです。

本来ならr8111/8168/8411のドライバーがあたるべきところを、誤検知されてr8169のドライバーがあたってしまう模様。けっこう有名な話みたいです。

[[SOLVED] Problem with Realtek 8111/8168/8411 | No internet | r8169 / Kernel & Hardware / Arch Linux Forums](https://bbs.archlinux.org/viewtopic.php?id=262604)

実際に録画サーバー上で `lsmod` したところ、r8169のカーネルモジュールが読み込まれていました。

## 対処法

`r8168-dkms` をインストールして、きちんとr8111/8168/8411用のドライバーがあたるようにします。

```
sudo apt install r8168-dkms
```

r8169のカーネルモジュールが読み込まれないように、blacklistへ。

```
sudo echo "blacklist r8169" > /etc/modprobe.d/r8169_blacklist.conf
```

archlinuxのコミュニティではinitramfsを作り直していたので、作り直します。

```
sudo update-initramfs -u
```

これでOKのはず。

## まとめ

まだ様子見の状態ですが、解決してほしい...

今までは運良くRealtekのドライバー問題に遭遇してこなかったので、「蟹」の洗礼を受けた気持ちです。