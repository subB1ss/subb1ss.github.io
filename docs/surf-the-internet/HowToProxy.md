# 代理，互联网的第一步

此篇将简短的介绍如何访问互联网

## 为什么需要代理

因为你无法直接访问某些网站或者使用某些网络服务

所以你需要使用这样一个代理服务器，来将你请求的内容转发至你的本地

就好像你网购，物流再把商品发快递给你一样。这里商品就相当于你请求的内容，快递员就是你的代理服务器



## ClashForWindows

[clash](https://github.com/Dreamacro/clash)是一个用go语言编写的本地代理服务器，他就类似于你的快递地址

[clashforwindows](https://github.com/Fndroid/clash_for_windows_pkg)是拥有图形化用户界面(graphical user interface)的clash，用户友好。在release界面下载.exe的执行文件就可以了

安装完成后在软件内部有他的[文档](https://docs.cfw.lbyczf.com/)的链接，推荐读一下，至少读一下[快速上手](https://docs.cfw.lbyczf.com/contents/quickstart.html)

!!! warning
    如果你使用ia32或者arm架构的处理器，请下载对应版本的*.ia32.exe/*.arm.exe文件。如果你不知道这条是在说什么，那么你的处理器就是x86架构，直接下载.exe文件就可
    
    clash是开源软件，但是clashforwindows并不开源，如果担心数据安全问题请不要使用


## 代理服务器

光这样是无法使用代理服务的，刚刚下载的clashforwindows只是个本地代理服务器，只是你的客户端，或者说是你的收件地址

你还需要一个能够直接访问你请求的地址的代理服务器，或者说物流人员

我不会推荐任何代理服务器或者提供商，请自行寻找

## 优雅使用

文档里会告诉你打开System Proxy按钮来启用全局代理

大部分代理服务器的规则文件都会区分国内外流量然后设定各自的代理规则，但是我不推荐常驻系统代理。我推荐自己根据使用场合手动选择是否代理

### 浏览器&SwitchyOmega

最常见的使用场合就是浏览器了，我推荐使用[google chrome](https://www.google.com/chrome/)，然后安装插件[SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif?hl=en-US)

![vXIov9.png](https://s1.ax1x.com/2022/09/12/vXIov9.png){ align=lift }
如图设置就可以了，协议选http，地址填127.0.0.1，端口7890。都弄好后在插件图标那里启用刚刚你设置的这个配置文件，enjoy it!

### 其他使用场合

你不会google么？

!!! example
    大多数开发者都需要使用git、npm、pip等软件，假如我需要为pip设置代理，但是我又不会
    
    [google](https://google.com)搜索: proxy pip windows

## 一些碎碎念和常见名词解释

- 机场: 代理服务器或者代理服务器提供商
- 梯子: 代理，通常是包含了代理服务器和你的本地客户端，也有人说小飞机
- 墙: [GFW](https://en.wikipedia.org/wiki/Great_Firewall)
- VPN: Virtual Private Network，和代理类似的功能，但是他会全面接管你的流量

### my opinon
我承认gfw的存在有他的意义，但是我不认可一刀切断/一棒子打死这样的做法，我也不认为看不见就是不存在了

### is it illegal?
我不知道，但是互联网不是法外之地，请理智判断，独立思考，谨言慎行

||||||
|---|---|---|---|---|
|:fist:|||||
||:angry: |||一切邪恶，终将绳之以法|
|||:punch:|||

!!! note "写在最后"
    此篇只是对代理做个最入门的介绍，更多详细内容比如加密传输协议，Torjan或者Vmess，又或者基础知识比如端口之类的请自行搜索

    还有适用于Android平台的clashforandroid，直接在playstore或者github上搜索就可以下载，配置同样简单，相信你一定能轻松使用

