import{_ as k}from"./ValaxyMain.vue_vue_type_style_index_0_lang.Dw9PLPyq.js";import{f as u,a as g}from"./chunks/vue-router.CH7l4kx7.js";import{A as p,O as y,a2 as l,u as f,N as b,R as a,V as e,Y as n}from"./framework.BVtu4MtS.js";import"./app.MFHf3mD-.js";import"./chunks/dayjs.i0BUjmvK.js";import"./chunks/vue-i18n.BgUPG-Ke.js";import"./chunks/pinia.Dbs4igQg.js";import"./chunks/@vueuse/motion.D6DPsMOl.js";import"./chunks/nprogress.MTuYNGdb.js";import"./YunComment.vue_vue_type_style_index_0_lang.C7xocgAm.js";import"./index.C5okkQwF.js";import"./YunPageHeader.vue_vue_type_script_setup_true_lang.Qj2rLhdQ.js";import"./post.BKoQO2pZ.js";const E="/assets/screenshot.JL8iVDZE.png",F=u("/posts/tweaking-arch",async t=>JSON.parse('{"title":"折腾arch","description":"","frontmatter":{"copyright":false,"title":"折腾arch","date":"2025-01-08","updated":"2025-01-08","categories":"Linux","tags":["arch","wayland","hyprland","linux"]},"headers":[{"level":2,"title":"显卡驱动方面","slug":"显卡驱动方面","link":"#显卡驱动方面","children":[]},{"level":2,"title":"wayland & hyprland","slug":"wayland-hyprland","link":"#wayland-hyprland","children":[{"level":3,"title":"必用软件","slug":"必用软件","link":"#必用软件","children":[]},{"level":3,"title":"输入法和Electron应用","slug":"输入法和electron应用","link":"#输入法和electron应用","children":[]}]},{"level":2,"title":"Wine 与 游戏环节","slug":"wine-与-游戏环节","link":"#wine-与-游戏环节","children":[]},{"level":2,"title":"晒图环节","slug":"晒图环节","link":"#晒图环节","children":[]}],"relativePath":"pages/posts/tweaking-arch/index.md","lastUpdated":1737534049000}'),{lazy:(t,r)=>t.name===r.name}),V={__name:"index",setup(t,{expose:r}){var d;const{data:o}=F(),h=g(),s=Object.assign(h.meta.frontmatter||{},((d=o.value)==null?void 0:d.frontmatter)||{});return h.meta.frontmatter=s,p("pageData",o.value),p("valaxy:frontmatter",s),globalThis.$frontmatter=s,r({frontmatter:{copyright:!1,title:"折腾arch",date:"2025-01-08",updated:"2025-01-08",categories:"Linux",tags:["arch","wayland","hyprland","linux"]}}),(i,c)=>{const m=k;return b(),y(m,{frontmatter:f(s)},{"main-content-md":l(()=>c[0]||(c[0]=[a("p",null,[e("开个文章记录下折腾arch的过程，本文长期更新。"),a("br"),e(" 遇到的一些重大问题会单独写一篇，这篇更偏向记录。")],-1),a("h2",{id:"显卡驱动方面",tabindex:"-1"},[e("显卡驱动方面 "),a("a",{class:"header-anchor",href:"#显卡驱动方面","aria-label":'Permalink to "显卡驱动方面"'},"​")],-1),a("p",null,[e("我用的 Nvidia 显卡，以 linux 平台兼容性差而出名。"),a("br"),e(" 实际上体验确实不好，有很多暗病，特别是在 hyprland 下。hyprland 是一款使用 wayland 协议的混成器，他是面向 AMD 显卡用户开发，但是也确实有不少的N卡用户在使用 hyprland。这样至少在排错的时候可以借鉴别人的经验。")],-1),a("p",null,[e("扯远了，安装显卡驱动的步骤其实还算是简单（即使这样也花了大概2、3个小时的时间）。可以直接参考 "),a("a",{href:"https://wiki.archlinux.org/title/NVIDIA",target:"_blank",rel:"noreferrer"},"wiki"),e(" 和 "),a("a",{href:"https://github.com/korvahannu/arch-nvidia-drivers-installation-guide",target:"_blank",rel:"noreferrer"},"Arch Linux NVIDIA drivers installation guide"),e("。")],-1),a("p",null,"我主要还是参考后面的那篇比较多，我本来是想要安装 dkms 版本的驱动的，但是在设置 Nvidia 模块早加载的那步无论如何都设置不成功，在没有装图形界面的时候想要去查资料也是个费心事，故放弃直接装了 linux 内核的驱动。什么时候把系统折腾崩了，大重装的时候再去装 dkms 版本把，验证下说 dkms 驱动在 wayland 协议下性哪更好的说法是否属实。不过我更先换 AMD 显卡也说不定哈哈。",-1),a("h2",{id:"wayland-hyprland",tabindex:"-1"},[e("wayland & hyprland "),a("a",{class:"header-anchor",href:"#wayland-hyprland","aria-label":'Permalink to "wayland & hyprland"'},"​")],-1),a("p",null,[e("这部分直接参考 hyprland 的官方文档上一步步来就好。我是装的 yay 版本，这样能第一时间跟进版本。"),a("br"),e(" hyprland 可定制度很高，但我没有去大改动，也没有直接拿别人现成的配置文件。直接拿别人的配置文件感觉不通读一遍的话，万一出问题会无从排查。我还是先尽量把系统配置到能用的程度，再去一步步配置自己的。")],-1),a("h3",{id:"必用软件",tabindex:"-1"},[e("必用软件 "),a("a",{class:"header-anchor",href:"#必用软件","aria-label":'Permalink to "必用软件"'},"​")],-1),a("p",null,"hyprland 装完了还需要一系列的基础软件才能组装出一套可用的桌面系统。这部分在它自己的文档里都有提到，没得选的部分就直接略过了，按照文档上来就是。我这里说一下可选部分我的选择，以及一些我觉得很有必要的软件。",-1),a("ul",null,[a("li",null,"通知守护进程： mako"),a("li",null,"音频服务：pipewire"),a("li",null,"状态栏： waybar"),a("li",null,"壁纸： hyprpaper"),a("li",null,"起动器： Rofi（Wayland fork）"),a("li",null,"粘贴版管理器： clipse"),a("li",null,"文本编辑器： nvim"),a("li",null,"文件管理器（TUI）： yazi")],-1),a("h3",{id:"输入法和electron应用",tabindex:"-1"},[e("输入法和Electron应用 "),a("a",{class:"header-anchor",href:"#输入法和electron应用","aria-label":'Permalink to "输入法和Electron应用"'},"​")],-1),a("p",null,[e("输入法当然是选择 Rime 输入法，linux上选择 fcitx5-rime 就可以了。我自己的 Rime 没有配置过多，就导入下之前自己打出来的词库就可以使用了。"),a("br"),e(" fcitx-rime 的用户配置目录位于 "),a("code",null,"~/.local/share/fcitx5/rime"),a("br"),e(" 说到 fcitx5，之前在公司里的 Mac 上使用的 fcitx5 Mac 着实惊艳到我了，卷轴模式简直更是神中神。肯定原生的 fcitx5 也是能支持卷轴模式的，之后再去折腾把。")],-1),a("p",null,"不幸的，Electron应用在 Wayland 协议下的支持十分不友好，虽然可以用提供 X11 协议兼容的 XWayland，但是会有画面拉伸、闪烁等问题。总的来说我还是选择了 Wayland 协议。下面说下遇到的问题，就举例 google-chrome 这款程序吧。",-1),a("h4",{id:"强制-google-chrome-使用-wayland-协议",tabindex:"-1"},[e("强制 google-chrome 使用 wayland 协议 "),a("a",{class:"header-anchor",href:"#强制-google-chrome-使用-wayland-协议","aria-label":'Permalink to "强制 google-chrome 使用 wayland 协议"'},"​")],-1),a("p",null,[e("google-chrome 默认是使用 XWayland 的，要强制启用 Wayland 协议就需要启动时传递参数 "),a("code",null,"--enable-features=UseOzonePlatform --ozone-platform=wayland"),e(" 或者，可以通过 chrome 自己的配置 "),a("code",null,"chrome://flags"),e(" 里面设置这两项"),a("br"),e(" 我自己的解决方案是复制了一份 "),a("code",null,"/usr/share/applications/google-chrome.desktop"),e(" 到 "),a("code",null,"~/.local/share/applications/"),e(" 路径下，然后修改参数如下：")],-1),a("div",{class:"language-sh vp-adaptive-theme"},[a("button",{title:"Copy Code",class:"copy"}),a("span",{class:"lang"},"sh"),a("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[a("code",{"v-pre":""},[a("span",{class:"line"},[a("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"[atao@atodesk "),a("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"~"),a("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"]$ cat .local/share/applications/google-chrome.desktop "),a("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"|"),a("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," grep"),a("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}}," Exec")]),e(`
`),a("span",{class:"line"},[a("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"Exec"),a("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),a("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"/usr/bin/google-chrome-stable"),a("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," %U"),a("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," --enable-feature=UseOzonePlatform"),a("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," --ozone-platform=wayland")]),e(`
`),a("span",{class:"line"},[a("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"Exec"),a("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),a("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"/usr/bin/google-chrome-stable"),a("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," --enable-features"),a("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),a("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"UseOzonePlatform"),a("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," --ozone-platform"),a("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),a("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"wayland")]),e(`
`),a("span",{class:"line"},[a("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"Exec"),a("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),a("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"/usr/bin/google-chrome-stable"),a("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," --incognito"),a("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," --enable-features=UseOzonePlatform"),a("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," --ozone-platform=wayland")])])]),a("button",{class:"collapse"})],-1),a("p",null,[e("这样通过 Rofi 启动也能带上参数了，启用输入法这部分取决于不同的 Electron 程序以及输入法引擎有很大不同。这部分具体请参搜索引擎， Chrome 方面我是在 "),a("code",null,"chrome://flags"),e(" 里面设置了，chrome 支持 wayland text-input-v3 协议。")],-1),a("h4",{id:"wayland-协议下的-chrome-渲染bug",tabindex:"-1"},[e("wayland 协议下的 chrome 渲染bug "),a("a",{class:"header-anchor",href:"#wayland-协议下的-chrome-渲染bug","aria-label":'Permalink to "wayland 协议下的 chrome 渲染bug"'},"​")],-1),a("p",null,[e("不知道是不是我配置不到位，在文本输入框输入文字的时候总是会有问题。输入框会闪烁、抖动或者触发大面积渲染错误。"),a("br"),e(" 在网上找了半天，看到了一个相关的 "),a("a",{href:"https://github.com/hyprwm/Hyprland/issues/7252#issuecomment-2345792172",target:"_blank",rel:"noreferrer"},"github issues"),e(" 按照这条反馈配置 "),a("code",null,"hyprland.conf"),e(" “解决”了这个问题。我刚才看那条 issues 上3天前的回复说 chrome beta 版的更新已经修复了这个问题，等实装到稳定版后试试。 实际上还是会有些小问题，例如配置后文本框不接收长按按键指令（这个似乎是 "),a("code",null,"--enable-wayland-ime"),e(" 带来的影响）。")],-1),a("h2",{id:"wine-与-游戏环节",tabindex:"-1"},[e("Wine 与 游戏环节 "),a("a",{class:"header-anchor",href:"#wine-与-游戏环节","aria-label":'Permalink to "Wine 与 游戏环节"'},"​")],-1),a("p",null,"意外的强大，Lutris 用来管理游戏和 Wine 实例，几乎完美运行少前2，在播片的时候偶尔会出现画面滞留与马赛克色块，但是真的是很少见，对我来说几乎不影响游玩。",-1),a("p",null,"WarThunder 则是直接支持原生 linux 平台，不需要 Wine。但是他是基于 X11 的，也就是在我这里运行在 XWayland 下。性能上只能说一言难尽了，我甚至怀疑还没有跑在 Wine 里面流畅。默认画质我在车库里只能勉强平均 90fps，听说比较新的 Wine 版本已经支持原生 Wayland 协议了，后面真的试试用 Wine 跑把。",-1),a("p",null,"不过看战雷的论坛有不少帖子需求 Wayland 协议的，制作组回复是加入计划中了，只是要等到什么时候就不知道了。",-1),a("h2",{id:"晒图环节",tabindex:"-1"},[e("晒图环节 "),a("a",{class:"header-anchor",href:"#晒图环节","aria-label":'Permalink to "晒图环节"'},"​")],-1),a("figure",null,[a("img",{src:E,alt:"Screenshot",loading:"lazy",decoding:"async"})],-1)])),"main-header":l(()=>[n(i.$slots,"main-header")]),"main-header-after":l(()=>[n(i.$slots,"main-header-after")]),"main-nav":l(()=>[n(i.$slots,"main-nav")]),"main-content-before":l(()=>[n(i.$slots,"main-content-before")]),"main-content":l(()=>[n(i.$slots,"main-content")]),"main-content-after":l(()=>[n(i.$slots,"main-content-after")]),"main-nav-before":l(()=>[n(i.$slots,"main-nav-before")]),"main-nav-after":l(()=>[n(i.$slots,"main-nav-after")]),comment:l(()=>[n(i.$slots,"comment")]),footer:l(()=>[n(i.$slots,"footer")]),aside:l(()=>[n(i.$slots,"aside")]),"aside-custom":l(()=>[n(i.$slots,"aside-custom")]),default:l(()=>[n(i.$slots,"default")]),_:3},8,["frontmatter"])}}};export{V as default,F as usePageData};
