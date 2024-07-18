---
draft: true 
title: 憧憬成为 web3 高手之：智能合约
date: 2024-07-16
updated: 2024-07-16
categories: Web3相关
tags:
    - web3
    - solidity
---

# 智能合约

最初由密码学家 Nick Szabo 提出，web3 语境下指代在 Ethereum 虚拟机环境中运行的不可变的计算机程序。

## 智能合约的生命周期

智能合约通常以高级语言编写，例如 Solidity，随后被编译为 EVM 中运行的低级字节码。编译完成后会随着合约创建交易被部署至区块链中。每个合约都由随机生成的以太坊地址标识，该地址在交易中作为接收者，可以将资金发送给合约或者调用合约的某个功能。

合约 __只有__ 在被交易调用时才会运行，以太坊的所有智能合约均由 EOA 发起的交易执行。合约可以调用另一个合约，但是这种执行链的第一个合约永远是由 EOA 发起的交易执行。合约永远不会自动执行或者在后台运行，在被交易触发执行，直接或间接作为执行链的一环之前，合约在区块链上实际上是“休眠”的。

交易是 _原子性 atomic_ 的，交易完全执行，只在交易成功中止时记录全局状态（合约，账户等）的任何更改。如果交易由于错误而失败，则所有的效果（状态变化）将会回滚，就好像交易从未执行一样。失败的交易仍然存储在区块链中，并从原始账户扣除 gas 成本，但对合约或者账户没有其他影响。

合约的代码不能更改，然而合约可以被“删除”，从区块链上删除代码和它的内部状态（变量）。要删除合约，需要执行被称为 _SELFDESTRUCT_ （曾被称为 _SUICIDE_ ）的 EVM 操作码。
该操作码将区块链中的合约移除，该操作花费“负的 gas ”，从而激励储存状态的释放。该操作不会删除过去的交易记录，但是确实会从所有未来的区块中移除合约状态。

## 用 Solidity 构建智能合约

Solidity 由 GitHub 上的 Solidity 项目开发团队开发并维护：

> https://github.com/ethereum/solidity

Solidity 项目的主要产品是 _Solidity Compiler（solc）_ ，它将用 Solidity 语言编写的程序代码转换为 EVM 字节码，并生成其他制品，如应用程序二进制接口（ABI）等。

Solidity 遵循语义化版本的版本模型，MAJOR.MINOR.PATCH，“major” 用于主要的和“不向前兼容”的更改递增，“minor” 在主要版本之间添加“向前兼容功能”时递增，“patch” 表示错误修复和安全相关的更改。

## 使用 Solidity 编程

> https://solidity.readthedocs.io/en/latest/

### 数据类型

- _boolean（bool）_：布尔值，`true` 或 `false`，逻辑运算符 `!`（not），`&&`（and），`||`（or），`==`（equal），`!=`（not equal）
- _整数（int/uint）_：有符号和无符号整数，从 `u/int8` 到 `u/int256` 以 8bits 递增，没有大小修饰后缀就表示 256bits
- _定点数（fixed/ufixed）_：定义为 `u/fixedMxN`，其中 _M_ 是位大小（以8递增），_N_是小数点后的十进制树的个数
- _地址_：20 字节的以太坊地址，address 对象有 balance（返回余额）和 transfer（转账）的成员方法
- _字节数组（定长）_：固定大小的字节数组，定义为 _byte1_ 到 _byte32_
- _字节数组（动态）_：动态大小的字节数组，定义为 _byte_ 或 _string_
- _enum_：枚举离散值的用户自定义类型
- _struct_：包含一组变量的用户自定义类型
- _mapping_：_key_ => _value_ 对的哈希查找表

Solidity 还提供了一系列用于计算不同单位的字面值：

- 时间单位：seconds，minutes，hours 和 days 可用作后缀，转换为基本单位 seconds 的倍数
- 以太的单位：wei，finney，szabo，和 ether 可用作后缀，转化位基本单位 wei 的倍数

```solidity
require(withdraw_amount <= 100000000000000000);
```

使用单位倍数 ether 改进一下，便于阅读

```solidity
require(withdraw_amount <= 0.1 ether);
```

::: warning
Mappings can be seen as hash tables which are virtually initialized such that every possible key exists from the start and is mapped to a value whose byte-representation is all zeros. However, it is neither possible to obtain a list of all keys of a mapping, nor a list of all values. Record what you added to the mapping, or use it in a context where this is not needed. Or even better, keep a list, or use a more suitable data type.
:::

### 预定义的全局变量和函数

#### 调用交易/消息上下文

***msg***  
*msg* 对象是启动合约执行的交易（源自EOA）或消息（源自合约）。它包含许多有用的属性：

***msg.sender***  
代表发起消息的地址。如果合约是由 EOA 交易调用的，那么这就是签署交易的地址

***msg.gas***  
调用合约消息中留下的 gas 量，