---
layout: "../../layouts/BlogPost.astro"
title: "ManjaroをZFS上にインストールする"
description: "ZFSのパーティションをrootとして、Manjaroをインストールする方法を説明します。"
pubDate: "2021/2/1"
tags: ["Linux", "Infrastracture"]
---

意外と情報がなかったので。

今のところ、ZFSをrootパーティションのファイルシステムに指定してManjaroをインストールする、ということは、GUIではできないっぽいので、コマンドをぱちぱち叩いてインストールしました。

## 準備

### ライブUSB作成

まずはISOファイルを以下からダウンロード。自分はGnome好きなのでGnome版をダウンロードしました。

[Manjaro Downloads](https://manjaro.org/download/)

RufusとかEcherとか、ddコマンドとかでISOをUSBに焼きましょう。

```shell
dd bs=4M if=manjaro.iso of=/dev/sdc status=progress && sync
```

### パーティション作成

ライブUSBからManjaroを起動できたら、EFIを格納するESPとrootパーティションを作成しておきましょう。

```shell
sudo parted /dev/sda
(parted) mklabel gpt
(parted) mkpart ESP fat32 1MiB 551MiB
(parted) set 1 esp on
(parted) mkpart ROOT ext2 551MiB 100%
(parted) quit
```

こんな感じになっていればOKです。

```shell
sudo parted -l

Model: ATA VBOX HARDDISK (scsi)
Disk /dev/sda: 32.2GB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags: 

Number Start  End   Size  File system Name Flags
 1   1049kB 578MB  577MB        ESP  boot, esp
 2   578MB  32.2GB 31.6GB        ROOT
```

### ZFSファイルシステム作成

rootパーティションにZFSのファイルシステムを作成していきます。

とりあえずターミナルからプールを作成。`/dev/sda2`がrootパーティションのデバイス名です。

```shell
sudo zpool create rpool /dev/sda2
```

rootデータセットを作成。Manjaroは`/mnt`配下をrootとみなしてOSインストールを行うので、いったんマウントポイントを/mntに指定しておきます。

```
sudo zfs create -o mountpoint=/mnt rpool/root
```

上位のデータセットのマウントポイントをlegacyにしておきます。これをやっておかないと上位のデータセットにデータが書き込まれ、やっかいな状況になったりならなかったり。

```
sudo zfs set mountpoint=legacy rpool
```

こんな感じになっていればOK。

```
zfs list

NAME     USED AVAIL   REFER MOUNTPOINT
rpool    184K 28.1G    24K legacy
rpool/root  24K 28.1G    24K /mnt
```

最後に、ESPを`/mnt/boot`にマウントしておきます。

```shell
sudo mount /dev/sda1 /mnt/boot
```

## OS・ブートローダー設定

### OSインストール

Manjaroの「Manjaro-Architect」を使ってらくらくインストールしていきましょう。ここからは通常のインストール方法と変わりありません。

すでにパーティション設計とファイルシステム作成を終えているので、特別な設定が不要なら「Prepare Installation」をスキップして「Install Desktop System」から始められます。

![](/20210201-manjaro-root-zfs/image01.png)

カーネルのバージョンとかもろもろ選択してManjaroをインストールします。

![](/20210201-manjaro-root-zfs/image02.png)

ずらら〜と出てきて、インストールが完了します。

### ブートローダーインストール

![](/20210201-manjaro-root-zfs/image03.png)

OSのインストールが終わったら「Install BIOS Bootloader」からブートローダーをインストール。私はsystemd-bootが好きなのでいつもsystemd-bootをインストールしています(画面は仮想環境上で実行しているためか、grubしか表示されていません)。

![](/20210201-manjaro-root-zfs/image04.png)

ブートローダーのインストールが終わったら「Configure Base」でホスト名やらロケールやらユーザーやらを設定。これでひととおりインストールは完了です。

![](/20210201-manjaro-root-zfs/image05.png)

インストールしたブートローダーに合わせて、設定ファイルを記述しておきます。

- grubの場合：`/mnt/boot/grub/grub.cfg`を編集

```
/mnt/boot/grub/grub.cfg
set timeout=5
set default=0

menuentry "Manjaro Linux" {
  search -u UUID
  linux /vmlinuz-linux zfs=rpool/root rw
  initrd /initramfs-linux.img
}
```

- systemd-bootの場合：`/mnt/boot/loader/entries/manjaro.conf`を編集

```
title      Manjaro
linux      vmlinuz-linux
initrd     intel-ucode.img
initrd     initramfs-linux.img
options     zfs=rpool/root rw
```

最後の最後に、ESPをアンマウントしてrootパーティションのマウントポイントを変更しておきます。

```shell
sudo umount /dev/sda1
sudo zfs set mountpoint=/ rpool/root
```

再起動後、無事Manjaroが起動すれば作業完了です。お疲れ様でした。