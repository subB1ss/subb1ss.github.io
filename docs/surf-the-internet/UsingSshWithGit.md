# 使用SSH协议链接Github仓库

之前在自己电脑上用linux把屏幕烧了。虽然大概是屏幕用久了老化了，但还是怕linux的显示器调度是不是有什么问题。暂时先不用linux了，只能感叹自己能力不够。

把文档环境重新装回windows上了，win11的ui其实还挺讨喜的，就是cmd是真的一点都不好用。但是我发现git有bash可以用，我想是不是可能在windows上安装bash来替代cmd。之后会去研究这方面。

现在回到主题，记录下这次环境搭建。主要是遇到了git的ssh协议上的一些问题。

## Material For MkDocs

这个直接按照他官网的文档安装就行，照样还是直接pip install就行，我还是弄了一个python虚拟环境。命令好像是`venv`，附上文档地址[venv — Creation of virtual environments](https://docs.python.org/3/library/venv.html)

linux上是用bash命令直接重载bash环境完成的，我没去看具体的active文件里面写的bash命令是怎样。windows下是active.bat脚本，把内容贴在下面。

```bat
@echo off

rem This file is UTF-8 encoded, so we need to update the current code page while executing it
for /f "tokens=2 delims=:." %%a in ('"%SystemRoot%\System32\chcp.com"') do (
    set _OLD_CODEPAGE=%%a
)
if defined _OLD_CODEPAGE (
    "%SystemRoot%\System32\chcp.com" 65001 > nul
)

set VIRTUAL_ENV=D:\atao\venv

if not defined PROMPT set PROMPT=$P$G

if defined _OLD_VIRTUAL_PROMPT set PROMPT=%_OLD_VIRTUAL_PROMPT%
if defined _OLD_VIRTUAL_PYTHONHOME set PYTHONHOME=%_OLD_VIRTUAL_PYTHONHOME%

set _OLD_VIRTUAL_PROMPT=%PROMPT%
set PROMPT=(venv) %PROMPT%

if defined PYTHONHOME set _OLD_VIRTUAL_PYTHONHOME=%PYTHONHOME%
set PYTHONHOME=

if defined _OLD_VIRTUAL_PATH set PATH=%_OLD_VIRTUAL_PATH%
if not defined _OLD_VIRTUAL_PATH set _OLD_VIRTUAL_PATH=%PATH%

set PATH=%VIRTUAL_ENV%\Scripts;%PATH%
set VIRTUAL_ENV_PROMPT=(venv) 

:END
if defined _OLD_CODEPAGE (
    "%SystemRoot%\System32\chcp.com" %_OLD_CODEPAGE% > nul
    set _OLD_CODEPAGE=
)

```

## git with ssh

github之前取消了通过帐号和密码的授权，要么通过access token要么通过ssh，之前一直用的token，这次打算用ssh

用ssh的几个注意点：

- ssh-agent需要预先在后台运行`eval "$(ssh-agent -s)"`
- 添加ssh密钥`ssh-add ~/.ssh/your_private_key`，当然你的私钥也可以在其他路径
- ssh不通过`git config --global http.proxy`之类的方式代理，我在网上搜到的配置文件地址是~/.ssh/config，测试过了的确是这个配置文件，但是配置好了pit pull的时候也不走代理，非常慢


在网上搜了一下目前是解决了，解决方式是修改了git的hosts文件关掉了ssh的GSSAPIAuthentication和UseDNS，也不知道是哪一项起效了。也没注意这次git pull的时候有没有正确的走代理。如果是通过host文件解决的那也不是个一劳永逸的方案，头疼。

[Git-pull网速太慢如何修复](https://blog.csdn.net/AaricYang/article/details/104617134)