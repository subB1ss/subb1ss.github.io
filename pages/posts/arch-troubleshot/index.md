---
copyright: false
title: arch 故障排除
date: 2025-01-12
updated: 2025-01-22
categories: Linux
tags:
  - arch
  - mpv
  - linux
---

# arch 故障排除

准确来说是 arch + hyprland 故障排除，长期更新

## kitty 粘贴问题

我使用的 terminal emulator 是 kitty，使用的时候发现有问题，kitty 的粘贴快捷键，`Shift` + `Insert` 默认的行为是从 `PRIMARY` 选区里粘贴，而不是从 `CLIPBOARD` 里面。关于选区，详细可以去看[维基](https://wiki.archlinux.org/title/Clipboard#Selections)。  

我一开始以为是 bug，去网上找了挺多没找到结果。最后问 chatgpt 得知这是 kitty 的默认行为，遂通过配置文件解决。

```
[atao@atodesk ~]$ cat .config/kitty/kitty.conf 
map shift+insert paste_from_clipboard
```

## 连接 Kindle

连接 kindle 需要手动操作下，先看下系统日志 `journalctl -k -f`，然后再连接 kindle：  
```bash
Jan 15 00:41:40 atodesk kernel: usb 3-4: new high-speed USB device number 5 using xhci_hcd
Jan 15 00:41:40 atodesk kernel: usb 3-4: New USB device found, idVendor=1949, idProduct=0324, bcdDevice= 4.09
Jan 15 00:41:40 atodesk kernel: usb 3-4: New USB device strings: Mfr=0, Product=4, SerialNumber=5
Jan 15 00:41:40 atodesk kernel: usb 3-4: Product: Internal Storage
Jan 15 00:41:40 atodesk kernel: usb 3-4: SerialNumber: G001PX10134704UH
Jan 15 00:41:40 atodesk kernel: usb-storage 3-4:1.0: USB Mass Storage device detected
Jan 15 00:41:40 atodesk kernel: scsi host2: usb-storage 3-4:1.0
Jan 15 00:41:40 atodesk kernel: usbcore: registered new interface driver usb-storage
Jan 15 00:41:40 atodesk kernel: usbcore: registered new interface driver uas
Jan 15 00:41:41 atodesk kernel: scsi 2:0:0:0: Direct-Access     Kindle   Internal Storage 0409 PQ: 0 ANSI: 2
Jan 15 00:41:41 atodesk kernel: sd 2:0:0:0: Power-on or device reset occurred
Jan 15 00:41:41 atodesk kernel: sd 2:0:0:0: [sda] Media removed, stopped polling
Jan 15 00:41:41 atodesk kernel: sd 2:0:0:0: [sda] Attached SCSI removable disk
Jan 15 00:41:43 atodesk kernel: sd 2:0:0:0: [sda] 13090767 512-byte logical blocks: (6.70 GB/6.24 GiB)
Jan 15 00:41:43 atodesk kernel: sd 2:0:0:0: [sda] Write cache: enabled, read cache: enabled, doesn't support DPO or FUA
Jan 15 00:41:43 atodesk kernel: sda: detected capacity change from 0 to 13090767
Jan 15 00:41:43 atodesk kernel:  sda:
```

这里可以看到， usb device 5，idVendor 1949，idProduct 0324，用 `lsusb` 确认下

```bash
[atao@atodesk ~]$ lsusb
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 002: ID 1038:12ad SteelSeries ApS SteelSeries Arctis 7
Bus 001 Device 003: ID 1e71:2007 NZXT NZXT USB Device
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 003 Device 002: ID 0b05:18f3 ASUSTek Computer, Inc. AURA LED Controller
Bus 003 Device 004: ID 8087:0029 Intel Corp. AX200 Bluetooth
Bus 003 Device 005: ID 1949:0324 Lab126, Inc. Internal Storage
Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 005 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 006 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 007 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 007 Device 002: ID 0c45:8006 Microdia Dual Mode Camera (8006 VGA)
Bus 007 Device 003: ID 369b:0054 ITON Corp. L8 Air
Bus 008 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
```

Lab126, Inc. Internal Storage 就是我们的 kindle 了。接下来挂载 kindle 至我们的文件系统

```bash
[atao@atodesk ~]$ lsblk
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda           8:0    1   6.2G  0 disk 
nvme0n1     259:0    0 953.9G  0 disk 
├─nvme0n1p1 259:1    0    99M  0 part 
├─nvme0n1p2 259:2    0   128M  0 part 
├─nvme0n1p3 259:3    0 119.2G  0 part 
├─nvme0n1p4 259:4    0   821M  0 part 
└─nvme0n1p5 259:5    0 833.6G  0 part 
nvme1n1     259:6    0 953.9G  0 disk 
├─nvme1n1p1 259:7    0   954M  0 part /boot
├─nvme1n1p2 259:8    0  29.8G  0 part [SWAP]
└─nvme1n1p3 259:9    0 923.1G  0 part /
[atao@atodesk ~]$ su
Password: 
[root@atodesk atao]# mount -t vfat /dev/sda /mnt/kindle/
```

这样就挂载完成，传输好了电子书后再 `eject` 就大功告成。

```bash
[root@atodesk ~]# eject /dev/sda 
```

## samba 共享

使用 samba client 可以实现类似 ftp 的文件上传下载，但是还有一个办法。
使用 mount.cifs 可以将 samba 共享目录挂载至本地路径下，示例如下：

```bash
sudo mount.cifs -o username='username' //serverdomain/shareid/ /mnt/smb
```

完成后记得 unmount: `sudo unmount /mnt/smb`

## hyprland 下用原生 wayland 协议运行 minecraft

参考 [wiki](https://wiki.archlinux.org/title/Minecraft#Minecraft_does_not_start_on_native_Wayland)  
首先需要系统级别安装 glfw，我这里选择的是 aur 仓库的 glfw-git，为了能最快获取最新的更新。
```bash
[atao@atodesk ~]$ yay -Q glfw
glfw-git 3.4.r23.ge7ea71be-1
```
然后接着是去 PrismLauncher 去勾选启用系统全局的 glfw，但是这样我运行开不起来的，会报错。遂想起之前看到别人fork的一个 [gflw](https://github.com/BoyOrigin/glfw-wayland) 仓库，也是为了让 mc 运行在原生 wayland 下。  
> To use the patched GLFW library with Nvidia GPUs the `__GL_THREADED_OPTIMIZATIONS` environment variable needs to be set to `0`.  

在 PrismLauncher 添加这条环境变量后，成功启动。wiki 上和这个仓库上都说过这个方法只能运行在 LWJGL3 上，刚好高版本 java 的 gtnh 就是使用的 LWJGL3，:)  
wiki 上有提到，可能会有开启菜单时光标被归中的 bug，可以通过安装 `glfw-wayland-minecraft-cursorfix` 这个包来解决，但我还没遇到。

### wayland 下的 mc 体验

还没怎么玩，但是第一次运行时遇到了系统级别的 laggy，但是之后再没有出现过。  
性能释放上，和 xwayland 相比，其实可能帧数还低了点，但是 xwayland 下窗口缩放会很奇怪，不丝滑。而且偶尔还会有画面闪烁等问题。

## kitty ssh 问题

使用 kitty ssh 连接一个服务器可能会因为配置文件缺失出现一系列的问题。可以通过使用 `kitten ssh` 替代 `ssh`，这会复制当前的配置文件至远端的会话上。实际上也不确定是只作用于本次会话还是登录用户，而且如果 su root 会失效，那这样看起来应该是复制给了用户吧。  
另外一个方法是直接在远端服务器上下载 `kitty-terminfo` 简单粗暴。

## teamspeak 服务器

自建了一个 teamspeak 服务器，discord 不方便，其他语音软件不一定有 linux 发行版。
和 mc 服务器一样是使用的 openfrp 隧道，隧道是免费的，每天签到可以领流量。

没啥特别值得讲的，虽然折腾了半天，但是其实是节点的问题。  
有一点就是，ts3client 不知道为啥，不能在原生 wayland 下运行，走的是 xwayland。然后 fcitx5 不知道为什么在 ts3 里运行不了。去翻文档配置了也不行，ts3 是用的 qt5 来着。想着看看能不能运行在 wayland 下，结果也不行，搜也不太能搜到结果。估计是 ts 自己的问题。  

主要是需求输入中文来配置频道这些，只能换个思路去整了个 [tsmanager](https://www.ts3.app/)，一个 web serverquery client。需要 serveradmin 的密码，这个密码我看 ts-server 自己的日志是没看到有打印的。搜了一圈，说是这个只会在初次运行时直接打印一次至 StandardOutput，不会记录至日志里面。于是乎又去修改了 teamspeak3-server.service 文件，重定向标准输出至文件，遂得到密码。  
然而我今天发现用 journalctl 可以看到这个输出，令人感叹。