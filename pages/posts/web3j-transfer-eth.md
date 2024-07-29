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

// tags

```
---

使用 `EIP1559` 规范

```java

Web3j web3 = Web3j.build(new HttpService());
Credentials credentials = WalletUtils.loadCredentials("password", "/path/to/walletfile");
TransactionReceipt transactionReceipt = Transfer.sendFundsEIP1559(
        web3, credentials, 
        "0x<address>|<ensName>", //toAddress
        BigDecimal.ONE.valueOf(1), //value
        Convert.Unit.ETHER, //unit
        BigInteger.valueOf(8_000_000), gasLimit
        DefaultGasProvider.GAS_LIMIT, //maxPriorityFeePerGas (max fee per gas transaction willing to give to miners)
        BigInteger.valueOf(3_100_000_000L) //maxFeePerGas (max fee transaction willing to pay)
        ).send();

```

---

effectiveGasPrice

```java

transactionReceipt.effectiveGasPrice();

```

## Credentials

两种创建方式

### Credentials object

- `Credentials.create(ECKeyPair ecKeyPair)`
- `Credentials.create(String privateKey, String publicKey)`

### Use WalletUtils

- `WalletUtils.loadCredentials(String password, String source)`
- `WalletUtils.loadBip39Credentials(String password, String mnemonic)`
- `WalletUtils.loadJsonCredentials(String password, String contract)`