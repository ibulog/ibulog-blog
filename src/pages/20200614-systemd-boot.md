---
layout: "../layouts/BlogPost.astro"
title: "Ubuntu 20.04でsystemd-bootを試してみたら、けっこういい感じだった"
description: "Ubuntu 20.04で、ブートローダーにsystemd-bootを使用する手順を説明しています。"
pubDate: "Jun 06 2020"
tags: ["Linux", "Infrastracture"]
---

最近姿勢を正そうと頑張っているいぶろぐです。

Linuxのsystemdに「systemd-boot」という軽量ブートローダーが組み込まれているということを知ったので、Ubuntu 20.04でちょっと試してみました。

## systemd-boot

### Arch Wikiによると・・・

前は「gummiboot」という名前だったらしい。

Arch Wikiが詳しいです。

[systemd-boot - ArchWiki](https://wiki.archlinux.jp/index.php/Systemd-boot)

適当にまとめると、以下のような感じらしいです。

- systemdが入っていれば導入可能
- 起動が速い
- ESPからしかカーネルをロードできない
- セキュアブート対応

起動が早いのは嬉しいので、早速入れてみることに。

## 導入方法

### ブートローダーインストール

以下、Ubuntu 20.04環境でやってます。とりえあず下記コマンドでブートローダーをESPにインストール。boot領域をいじるので、rootユーザーで作業したほうが楽です。

```
bootctl install
```

エントリーファイルの`/boot/efi/loader/entries/ubuntu.conf`を作成します。GRUBでは`grub.cfg`にすべてのエントリー情報が記述されていますが、systemd-bootでは`entries`ディレクトリの下にエントリーごとにファイルを作成するようです。

エントリーファイルの中身はこんな感じ。

```
title Ubuntu
linux /vmlinuz
initrd /initrd.img
options root=UUID=blkidで調べたUUID quiet splash rw
#追記：btrfsをrootディレクトリに使っている場合は「rootflags=subvol=@」が必要でした
```

OSが入ったディスクのUUIDは`blkid`などのコマンドで調べてください。なお、カーネルイメージやinitrdのパスはESPのrootから相対パスで記述します。Ubuntuはデフォルトでは`/boot/efi`にESPをマウントするので、上の設定は`/boot/efi`直下にカーネルイメージを配置する場合の記述になります。

ついでにこんな感じで前バージョンのカーネル用エントリーファイル`ubuntu-old.conf`も記述しておくことに。

```
title Ubuntu-old
linux /vmlinuz.old
initrd /initrd.img.old
options root=UUID=blkidで調べたUUID rw
```

続いて`/boot/efi/loader/loader.conf`を下記のように編集。defaultにはデフォルトで起動したいOSのエントリーファイル名を拡張子なしで指定します。カーネルパラメータに`init=/bin/bash`などと指定されないよう、editorの項目でカーネルパラメータの編集を無効にしておきます。ブートメニューは非表示にしたいのでtimeoutの項目はコメントアウト。

```
#timeout 3
default ubuntu
editor no
```

ここまででブートローダーの設定は完了です。

### カーネル関連をごにょごにょ

Ubuntuはデフォルトだと、

- `/boot/efi`にESPをマウント
- `/boot`にカーネルイメージやinitrdを配置

となっているのですが、systemd-bootはESPからしかカーネルをロードできません。`/boot`にあるカーネルイメージはロードできないので、`/boot/efi`にコピーしてあげる必要があります。

というわけでコピーします。`/boot`以下の無印カーネルイメージやinitrdは最新のイメージへのシンボリックリンクなので、`-f`オプションだけ指定して`cp`してやれば実体がコピーされます。

```
cp -f /boot/vmlinuz /boot/efi/vmlinuz
cp -f /boot/initrd.img /boot/efi/initrd.img
cp -f /boot/vmlinuz.old /boot/efi/vmlinuz.old
cp -f /boot/initrd.img.old /boot/efi/initrd.img.old
```

といっても`apt`でカーネル更新するたびに毎回イメージをコピーしてエントリーファイルを修正するのはかなり面倒なので、systemdのユニットファイルを作ってカーネルを更新したら自動でコピーするように設定しておきます。

まずはパス監視用のユニットファイル`/etc/systemd/system/kernel-update.path`を作成。カーネルが更新される≒initrdが新しく作成されるというわけで、initrdを監視しています。

```
[Unit]
Description=Copy Kernel to ESP

[Path]
PathChanged=/boot/initrd.img

[Install]
WantedBy=multi-user.target
WantedBy=system-update.target
```

カーネルをコピーするためのユニットファイル`/etc/systemd/system/kernel-update.service`も作成。

```
[Unit]
Description=Copy Kernel to ESP

[Service]
Type=oneshot
ExecStart=/usr/bin/cp -f /boot/vmlinuz /boot/efi/vmlinuz
ExecStart=/usr/bin/cp -f /boot/initrd.img /boot/efi/initrd.img
ExecStart=/usr/bin/cp -f /boot/vmlinuz.old /boot/efi/vmlinuz.old
ExecStart=/usr/bin/cp -f /boot/initrd.img.old /boot/efi/initrd.img.old
```

あとはsystemdのサービスとして有効化。

```
systemctl enable kernel-update.path
```

これでapt経由でカーネルを更新しても自動でイメージがESPにコピーされるようになり、systemd-bootによるブートの準備も整いました。

## どんくらい速いの

### とりあえず起動するか確認

まずはefibootmgrしてみます。

```
# efibootmgr
BootCurrent: 0000
Timeout: 10 seconds
BootOrder: 0001,0000,2001,2002,2003
Boot0000* EFI Hard Drive (LITEON CB1-SD256)
Boot0001* Linux Boot Manager
Boot2001* EFI USB Device
Boot2002* EFI DVD/CDROM
Boot2003* EFI Network
```

「Linux Boot Manager」というやつをUEFIでブート先にしてやればいいみたい。特にスクショはないですが、しっかり起動しました。スペースキー押しながら起動するとブートメニューが出ます。

GRUB2と比較して起動の速さは・・・

MateBook X 2017でこんな感じでした。systemd-bootの方が速い。設定もシンプルなので意外といいかもです。

- GRUB2：16.8秒
- systemd-boot：13.8秒

## systemd-bootに乗り換え

特に問題なさそうだったので、GRUB2からsystemd-bootに乗り換えました。GRUBアンインストールってけっこう新鮮な体験でしたね。

個人的にsystemdは好きなので、この調子でcronとかも置き換わっていくといい感じです。