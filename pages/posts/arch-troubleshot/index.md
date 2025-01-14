---
copyright: false
title: arch 故障排除
date: 2025-01-12
updated: 2025-01-15
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