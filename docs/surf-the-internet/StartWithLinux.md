# 开始使用linux啦

这篇文章是在Ubuntu上写的

最早是在初中的时候，拥有了人生第一台电脑

那个时候网上冲浪的时候了解到linux，并开始感兴趣的

实际上真的开始学习了解是20年末？不太记得是什么时候了。那时候学校里办了一个区块链的比赛，比赛环境是在Ubuntu上

唠嗑就到这里了，这篇聊聊历程和遇到的问题以及解决方案

这篇应该也会长期更新，最下面整个todo

## alongside windows

我这台电脑确实没有M.2插槽加硬盘了。从仓库盘里开了个30G的分区装了这个ubuntu，是Desktop LTS版本

Grub可以引导WindowsBootManager...这个比较神奇，直接把ubuntu装在分区里，然后引导写到C盘就行了，操作起来其实挺简单的

开始使用后遇到了些许问题，写在下面把

## issues

### 显卡驱动

ubuntu自带的显卡驱动是一个开源的，忘了叫啥名了，得去手动安装你显卡对应的驱动

我去网上搜了下，资料还是挺全的

> [Ubuntu 18.04 安装 NVIDIA 显卡驱动](https://zhuanlan.zhihu.com/p/59618999)

直接按照这个下来就可以了，Ubuntu这个桌面环境，虽然有些小瑕疵，但是一些交互逻辑是真的很不错，用起来挺舒适的

bash实在是舒适，cmd、powershell就是一拖四

!!! note
    软件源啊，语言区啊，之类老生长谈的就不提了

    有个得提一下，就是和windows共存的话，得去把linux的系统时钟设置下，不然windows的时间会乱

    `timedatectl set-local-rtc 1`

### 输入法

这个是直接安装的Rime，直接在官网就有install-introduction

理论上词库应该也是可以和win平台下共享的，配置文件还没弄

我自己打了4年的词库

### vscode

ubuntu自己软件商城里面的snap版本的vscode有个天坑，输入不了中文，那我觉得韩文日文这些双字节的肯定也输入不了

我一开始还以为是输入法的问题，排查半天

最后是google了下cant input chinese in vscode，然后在github vscode的issues下面找到了类似的反馈。找到了最新，发现有反馈ubuntu的snap版本仍然有这个问题

抱着试一试的心态，去vscode官网下了个.deb发行版...结果下载龟速，真的是龟速，差不多就1kb/s

实在是受不了，回windows上用idm多线程下也就平均100kb/s左右下了半天，安装后幸好能用

---

- [ ] 系统美化

- [ ] 输入法配置文件和用户词典
