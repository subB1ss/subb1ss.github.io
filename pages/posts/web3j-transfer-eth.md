---
draft: true
title: web3j之转账
date: 2024-07-24
categories: Web3相关
tags:
    - web3j
    - transaction
    - ethereum
---

# Web3j 向目标地址转账

推荐使用 `Transfer class` 来转账以太，不用自己管理 `nonce` 并且会帮你拉取结果：

```java

Web3j web3 = Web3j.build(new HttpService()); // default to http://localhost:8345/
Credentials credentials = WalletUtils.loadCredentials("password", "path/to/wallet/file");
TransactionReceipt transactionReceipt = Transfer.sendFunds(
    web3,
    credentials,
    "0x<address>|<ensName>",
    BigDecimal.valueOf(1.0),
    Convert.Unit.ETHER
).send();

```
---

使用 `EIP1559` 规范
