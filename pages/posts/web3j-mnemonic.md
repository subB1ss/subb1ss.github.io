---
draft: false
title: 憧憬成为web3高手之：从助记词到钱包私钥
date: 2024-07-31
update: 2024-08-06
categories: Web3相关
tags:
    - web3
    - bip-39
    - bip-44
---

# 从助记词密语到钱包地址

现行的钱包地址都由一串助记词派生而来。

`BIP-39` 标准定义了 2048 个助记词，稍后会看到为什么是 2048 个。

创建助记词的第一步是生成 _初始熵_，有许多生成初始熵的方式，比较常见的是使用电脑的随机数生成器。生成的 _初始熵_ 是一串用于加密的 _比特序列（0 或者 1）_ ，通常来说越长的 _初始熵_ 被认为是越安全的，`128 bits` 长被认为是足够的。

_初始熵_ 可以有 128 bits 到 256 bits 的长度，响应的助记词会有 12 到 24 个单词的长度。

## 从初始熵到助记词

假设我们要创建一个 12 单词长的助记词，第一步是生成 128 bits 长的 _初始熵_。

```
11111011 00010101 11111100 00011110 01000100 00011011 10110100 00110001 01000000 01111010 01010111 11101011 10000111 11111010 00011111 11011110
```

然后我们取 _初始熵_ 的 `SHA-256` 结果的头 `长度 / 32` 位添加到它后面，在这里的情况是 `0100`，得到一串 `132 bits` 的序列。这被加上的四位称为 _校验和（checksum）_，可以用来验证输入的助记词是否合法。

我们将得到的 `132 bits` 序列以 `11 bits` 宽重组：

```
11111011000 10101111111 00000111100 10001000001 10111011010
2008        1407        60          1089        1498
00011000101 00000001111 01001010111 11101011100 00111111110
197         15          599         1884        510
10000111111 10111100100
1087        1508
```

每个序列下的值是它们的十进制值，映射至 `BIP-39` 标准定义的 2048 个单词。这个标准定义了一系列不同的词语表，有英语、中文、西语。  
最终得到的助记词如下：

```
2008     1407     60       1089     1498     197      15
wild     quiz     always   market   robust   board    acid    
599      1884     510      1087     1508
enough   twist    divert   margin   route
```

### checksum

通过重复生成校验和的流程我们可以判断助记词序列是否合法

### 通过骰子生成初始熵

如果你不信任计算机的随机数生成器，也可以通过掷骰子来完成，参照 Alex Van de Sande 制造的图表

> [I made this handy image that allows you to see all BIP39 words arranged in a way you can print in an A4, pick them using a few dice by throwing it 11 times (the last word is a checksum).](https://x.com/avsa/status/1131281684635234304?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1131281684635234304%7Ctwgr%5E64a640fd48aab891d79649b91430a0600d85b9ec%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Ftype%3Dtext2Fhtmlkey%3Da19fcc184b9711e1b4764040d3dc5c07schema%3Dtwitterurl%3Dhttps3A%2F%2Ftwitter.com%2Favsa%2Fstatus%2F1131281684635234304image%3Dhttps3A%2F%2Fi.embed.ly%2F1%2Fimage3Furl3Dhttps253A252F252Fpbs.twimg.com252Fmedia252FD7Md5NuWkAUR2Kz.png253Alarge26key3Da19fcc184b9711e1b4764040d3dc5c07)

## 从助记词到种子再到私钥

### BIP-39: 从助记词生成确定性的密钥

为了得到实际的私钥，助记词先要转化为 _种子_，这一过程使用 __Password-Based Key Derivation Function 2__ 简称为 __PBKDF2__。类似 __PBKDF2__ 这样的密钥生成函数行为大多相同，接收一些输入作为参数，返回生成的密钥。只要他们的输入不变，返回的密钥也是不会变的。

__PBKDF2__ 有 5 个输入参数：
1. 一个伪随机数函数
2. 密码
3. 盐
4. 迭代次数
5. 密钥长度

最重要的是 _密码_ 和 _盐_，我们使用助记词作为密码，使用“mnemonichunter2”作为盐，生成的 `512 bits` 长种子为：

```
0x77cdf1d92225adc0e67b1b4f5a31820251d518b3af074df25a07b751947fd07ebd29a4d0e57b84ea9de03a9123e2a6ea1e3ed739d4c562efec21f1bb0a54a879
```

下一步我们会用这个种子生成 `BIP-32` 主钥

### BIP-32: 分层确定性钱包

这个种子用于生成一条 _分层确定性钱包（Hierarchical Deterministic Wallet）_ 或者称为 _HD钱包_ 的主钥。为此我们使用 `BIP-32` 和 `BIP-44`。  
前者定义了HD钱包，后者特定了前者的结构。

一个HD钱包从它的主钥 `m` 开始。主钥从种子生成，再次使用 __PBKDF2__，不再使用“mnemonic”作为盐，而是使用“Bitcoin seed”。像这样`PBKDF2("0x77cd...a879", "Bitcoin seed")，再次得到一个 512 bits 长的密钥：

```
0x300b155f751964276c0536230bd9b16fe7a86533c3cbaa7575e8d0431dbedf23f9945bb8b052bd0b0802c10c7c852e7765b69b61ce7233d9fe5a35ab108ca3b6
```

从这个主钥，我们可以派生出许多子钥。每一个子钥（包括主钥）有 $2^31$ 个普通子钥和 $2^31$ 个硬子钥。`BIP-32` 并没有限制层数上线，所以理论上可以从主钥派生出无数个子钥。

每个子钥都有一个序号，普通子钥使用从 $0$ 到 $2^{31}-1$ 的序号，硬子钥使用从 $2^{31}$ 到 $2^{32}-1$ 的序号。

普通子钥从公钥计算派生而出，硬子钥从私钥计算派生而出。

### 拓展密钥

主钥的前 256bits 作为私钥使用，后 256bits 作为 _链码（chain code）_ 使用。为了不让子钥由私钥独立决定，链码被用于作为生成子钥的附加熵。私钥和链码组合在一起构成了拓展私钥。

和拓展私钥一样，我们也有拓展公钥。公钥（Kpub）可以从私钥（Kpriv）派生出来，使用 _椭圆曲线点加法_。基本上，你将私钥点乘椭圆曲线的初始点 `G` 

```
Kpub = Kpriv x G
```

## 派生子钥

现在我们从 `master key` 派生出子钥，假设我们想要派生出位于 `m/0/0'`的子钥。这个过程分为两步：第一步，派生出 `m/0`。第二步派生出 `m/0/0'`，假设我们有一个函数能能够派生出子私钥 `CKDpriv`，那我们就需要这样：`CKDpriv(CKDpriv(m, 0), 0')` 来派生 `m/0/0'`。

我们先判断下这个子钥是否是硬子钥：
- 如果是硬子钥，取 32 bytes 长度的私钥并且在开头添加一个 0 字节（0x00），让他变成 33 字节长
- 如果不是，取 32 bytes 长的公钥

我们将取得的值称为 data，然后我们将序号加至 data 的后面。

然后我们对得到的字节序列使用 HMAC-SHA512。这个哈希算法类似于 PBKDF2 一样产生确定性的结果，但是需要一个额外的加密密钥，在这里我们使用 _链码_

我们将得到的结果分至两个 32 bytes 长的数组，第一组用于计算新的私钥或者公钥，第二组作为新的链码用于继续派生子钥。

使用如下表达式计算新的密钥：

$K_i = (I_l + K_{par})\%n$

新的子钥 $K_i$ 通过取 $I_l$ 的前 32 字节加上父钥 $K_{par}$，再将这个合对 $n$ 取模。$n$ 是 secp256k1 预定义的常量

上面的方式只适用于我们拥有对私钥的访问权的情况，当我们只有公钥的访问权时，例如使用一个硬件钱包时，派生子钥的操作有些许不同

${k_i=point(I_l) + K_{par}}$

使用了椭圆曲线点加法

### 拓展子钥序列化

派生子钥可以序列化成 _Base58_ 编码字符串，提高人类可读性。从主钥派生的子私钥序列化后看起来像是这样：

```
xprv9s21ZrQH143K4YUcKrp6cVxQaX59ZFkN6MFdeZjt8CHVYNs55xxQSvZpHWfojWMv6zgjmzopCyWPSFAnV4RU33J4pwCcnhsB4R4mPEnTsMC
```

公钥看起来像这样：

```
xpub661MyMwAqRbcH2Z5RtM6ydu98YudxiUDTaBESx9VgXpURBCDdWGezitJ8ormADG6CsJPs23fLmaeLp8RJgNvFo6YJkGhpXnHusCkRhGZdqr
```

来看下拓展私钥的组成，在 16 进制下，它看起来是这样的：

```
0x0488ade4000000000000000000f9945bb8b052bd0b0802c10c7c852e7765b69b61ce7233d9fe5a35ab108ca3b600300b155f751964276c0536230bd9b16fe7a86533c3cbaa7575e8d0431dbedf232204691b
```

拓展子钥有 82 bytes 长，并且包含以下字段：

- 版本（4 bytes）：不是 `0x0488b21e`（xpub）就是 `0x0488ade4`（xpriv）。因此，_Base58_ 编码密钥总是以 _xpub_ 或者 _xprv_ 开头
- 深度（1 bytes）：从主钥算起，每个子钥的深度将会加一。主钥的深度是 `0x00`，第一个子钥就是 `0x01`，这个子钥的子钥就是 `0x02`
- 父钥指纹（4 bytes）：父钥的标识符。因为范例是主钥（没有父钥），指纹永远是 `0x00000000`。对于子钥，这个字段通过将父公钥的 _SHA256_ 哈希计算 _RIPEMD160_ 哈希得到
- 序号（4 bytes）：因为范例是主钥，所有子钥序号是 0（0x00000000），对于子钥，该字段就是用于派生子钥的数字。例如对于 `m/1`，子钥序号就是 1 （0x00000001）
- 链码（32 bytes）
- 公钥或者私钥（33 bytes）：私钥原生是 32 bytes，往前面添加一个 0 字节（0x00）使其达到 33 bytes
- 验证合（4 bytes）：对其他所有字节进行两次 _SHA256_

再看一个实际的案例：

从主钥派生一条路径为 `m/0/0'` 的子钥，我们得到：

```
xprv9wpaeBFtdQRvLmeHJW8am7sYUSJJyup2rJwhCzZQG6KZCB5mqWDpSTamzJZAgtAhJVmaoRSMTeRyzmXXt28tvrZQnnr576LpNcDaSjf4fPn
```

十二进制表示

```
0488ade4028d71ca56800000007c85166433befdd691914b0eecd68d60eb3824bdb386fb34f15abf72a240ddef00387d4046b9eccba86fb9404e23e0345ae7cd513d8c819d00c3e7f11ee2aa4f98ed30f059
```

下面是它的所有独立字段，记住子序号是硬子钥，所以序号字段是 $(0+)2^{31}$ 得到 `0x80000000`
|字段|值|
|---|---|
|Version|0x0488ade4|
|Depth|02|
|Parent fingerprint|8d71ca56|
|Index|80000000|
|Chain code| 7c85166433befdd691914b0eecd68d60eb3824bdb386fb34f15abf72a240ddef|
|Private key| 00387d4046b9eccba86fb9404e23e0345ae7cd513d8c819d00c3e7f11ee2aa4f98|
|Checksum| ed30f059|

## 从公钥到地址

这是这个流程的最后一步了，我们对 `m/0/0'`派生子钥进行 _Keccak256_ 哈希，取最后的 20 bytes，并执行 _EIP-55_ 校验和，最终得出的就是钱包地址

> [EIP-55: Mixed-case checksum address encoding](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md)

### BIP-44: Multi-Account Hierarchy for Deterministic Wallets

BIP-44 定义了 BIP-32 和 BIP-32 的引申。是现行被最广泛使用的规范。

BIP-32 并没有定义十分严格的路径层级，BIP-44 基于 BIP-33 的路径定义了 5 个层级

```
m / purpose' / coin_type' / account' / change / address_index
```

这也被称为“派生路径”，我们选区特定的路径并从种子派生特殊的地址，以下是两个例子：

- 以太坊“默认”的第一地址的派生路径 `m/44'/60'/0'/0/0`
- Ledger Live的第三地址的派生路径 `m/44'/60'/2'/0/0`

#### Purpose

由 BIP-43 引入，指明了派生路径使用的什么规范，有些钱包使用类似 `m/44'/60'/0'/0` 的派生路径，这在技术上来说不是一条合法的 BIP-44 的路径，应该使用一个不同的 _purpose_ 

#### Coin type

用于区别不同的币种，以太坊使用 60'，比特币使用 0' 。这些币种定义在 SLIP-44 上。

#### Account 

用于区分用户身份，有些钱包（例如 Ledger Live）使用这个层级替代 address index 来为用户提供更多的隐私保护。

#### Change

该字段只有两个值，0 或 1。0 意味着这个地址是用于 “外部链”，1 用于 “内部链”。对于以太坊通常这个值都是 0。

#### Address index

地址序号，大部分钱包用于派生出一个 HD 钱包中的不同地址，MetaMask也是使用这个值。

---
## java 从助记词密语导入 HD 钱包范例

```java

    /**
     * 根据助记词生成钱包凭证
     * @param mnemonic 助记词
     * @param index 钱包地址总数，生成从 0 至 index 总共 index+1 个
     * @return Credentials 集合
     */

  public static List<Credentials> generateWalletFromMnemonic(String mnemonic, int index) {
    List<Credentials> wallet = new ArrayList<>();
    byte[] seed = MnemonicUtils.generateSeed(mnemonic, "");
    Bip32ECKeyPair masterKey = Bip32ECKeyPair.generateKeyPair(seed);
    for (int i = 0; i <= index; i++) {
      int[] path = {44 | HARDENED_BIT, 60 | HARDENED_BIT, 0 | HARDENED_BIT, 0, i};
      wallet.add(Credentials.create(Bip32ECKeyPair.deriveKeyPair(masterKey, path)));
    }
    return wallet;
  }

```