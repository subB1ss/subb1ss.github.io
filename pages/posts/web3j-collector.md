---
title: "web3j搜集HD钱包下所有代笔"
date: "2024-02-29"
categories: Sticker
tags:
    - web3j
    - metamask
---

公司需要大量的测试币，tBNB 水龙头每个钱包地址，每个 IP 地址，每天可以领取 0.3 tBNB。利用代理软件切换 IP 地址，在 metamask 钱包里创建了 31 个子钱包地址。每天领取后手动转账收集币太麻烦，写了一个 web3j 转账的脚本。 

```java
 try {
      List<Credentials> credentialsList = WalletUtils.generateWalletFromMnemonic(mnemonic, 31);

      String toAddress = credentialsList.get(0).getAddress();

      for (int i = 1; i < credentialsList.size(); i++) {
        BigInteger balance =
            web3j
                .ethGetBalance(
                    credentialsList.get(i).getAddress(), DefaultBlockParameterName.LATEST)
                .send()
                .getBalance();

        BigInteger fee = BigInteger.valueOf(10_000_000_000L).multiply(BigInteger.valueOf(21_000L));
        if (balance.compareTo(fee) < 0) continue;

        TransactionReceipt transactionReceipt =
            Transfer.sendFundsEIP1559(
                    web3j,
                    credentialsList.get(i),
                    toAddress,
                    new BigDecimal(balance).subtract(new BigDecimal(fee)),
                    Convert.Unit.WEI,
                    Transfer.GAS_LIMIT,
                    BigInteger.valueOf(5_000_000_000L),  // 最高优先费每Gas
                    BigInteger.valueOf(10_000_000_000L)) // 最高手续费每Gas
                .send();

        System.out.println("---------------------------------|");
        System.out.println("                                 |");
        System.out.println("                                 |");
        System.out.println(transactionReceipt.getTransactionHash());
      }

    } catch (Exception e) {
      throw new RuntimeException(e);
    }
```

