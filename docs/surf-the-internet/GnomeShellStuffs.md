# ubuntu美化及踩坑


直接上成品！

[![xpjXtS.png](https://s1.ax1x.com/2022/09/18/xpjXtS.png)](https://imgse.com/i/xpjXtS)

完全不了解的领域，那么如何入手一个完全不了解的领域呢

GOOGLE!

找了一个ytb视频，照着一步步来

然后卡在了第一步上，他的gnome-tweaks咋和我的长得不太一样捏？

---

最开始我考虑的是，是不是GNOME升级把主题功能给切割掉了。我就去gnome插件里去找，找到了排名第一的插件: User Themes

Aha, that is. 但是他没有达到我预想中的效果，几乎是所有的应用窗口，和所有的按钮图标都没有应用正确的皮肤。

然后我就在网上搜 gnome 42 themes not working

看了半天，是GNOME升级导致的，以前的一些方法已经不再适用。那么我们找到了问题所在，现在要怎么解决这个问题？

我去找到我选的那个主题的网页，找到他的问题反应页面，也就是github的issues。在这里，我看到了20天前的一条新的issues，描述的问题和我的基本一致，在这条issues下面，有主题作者回复的: 对于使用了较新的gnome版本的app(使用了libadwaita)，有一个暂时的解决方案

点开看，是一个python脚本，我下载下来按照文档说明的执行

still doesn't work

怎么绘事呢？我去读那个脚本的代码，发现那个脚本其实就干了几件事，就是把主题文件目录里的部分文件给软连接到了~/.config/gtk-4.0的目录下

然后我去检查这个目录，然后发现了名为assets的软连接没有生效，我去手动修改了一下，让他工作正常。但是还是不行，主题没有正常应用。

我开始怀疑是不是这个主题文件有问题，我去github的那条issues下面添加了我的回复，描述了我的情况。

---

第二天，我完善美化的其他部分:

- 我有多个音频输出设备，而且每次默认的设备并不是我常用的那个，于是我找到了一个方便直接在顶部栏修改音频设备的插件
- 我觉得现在的dock栏太丑，于是我下载了dash to dock这个插件，并调整到我满意位置
- Ubuntu默认的字体，显示英文字符确实还不错，但是显示中文字符就是一拖四，我修改了字体设置
- 他自带的图标简直丑到无法忍受，我替换了图标
- 在dock变得半透明后，完全不透明的top pannel变得很突兀，于是我找来了一个可以调节顶栏透明度的插件，而且还可以当有窗口贴近时取消透明，excelent

至于视频里那些酷炫的窗口拖动之类的动画效果？i dont give a shit

---

能做的事情似乎都已经做了，但是这个主题的问题，确实让我很不爽。于是我又去翻网页，我尝试主题页面给出的使用终端来应用主题的方法(昨天尝试过)

```bash
gsettings set org.gnome.desktop.interface gtk-theme "Nordic"
gsettings set org.gnome.desktop.wm.preferences theme "Nordic"
```

wtf, it worked

那么昨天是为什么无效呢，我不清楚，昨天我也尝试过执行这两条命令，在执行某一条的时候，给了一个没有找到org.gnome.desktop.xxxxx属性的报错，我以为是新版GNOME已经弃用了这个属性

我尝试过找下原因在哪里，但是折腾了几下差点没给我gnome整崩溃，我赶忙收手还原

> 既然他跑起来了，那就不要去动他了

---


- Theme: [Nordic](https://www.gnome-look.org/p/1267246)
- icons: [Tela circle icon](https://www.gnome-look.org/s/Gnome/p/1359276)
- extensions:  
    - Dash to Dock
    - Sound Input & Output Device Chooser
    - Transparent Top Bar (Adjustable transparency)
    - User Themes

在使用Dash to Dock的时候最好关掉系统自带的Ubuntu Dock，虽然我不清楚具体会有什么影响

前面忘了说了，你还需要一个ExtensionManager，对ubuntu用户来说这是最好的插件安装/管理方式

如果你和我一样也是个noob，你可以直接照抄我的方案，当然部署过程中遇到的各种各样的问题需要你自己去解决。old ass 就当看个笑话吧