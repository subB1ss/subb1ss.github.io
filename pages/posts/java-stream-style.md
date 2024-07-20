---
title: Java流处理风格编程之 FlatMap 与 Map
date: 2024-07-20
categories: Sticker
tags: 
    - Java
---

# 流处理风格

比较新的特性，Java8 加入的，其实也不是很新了，但是感觉实际上还是用得比较少。作为 Java 向面向过程让步的一部分存在，但有些时候我其实觉得流绝对没有那么面向过程。

一般来说我很愿意使用流风格 api，能有效的提高代码的可读性。但是因为惯性的原因写逻辑的时候往往不会想到这上面，都是在有多余的时间 review 的时候去替换。

步入正题：

## map

给一个无干扰、无状态的方法作为参数，将这个方法应用至流的每个元素上，并将操作的结果一一对应生成一个新的流作为 map 的结果返回。

## flatMap

大致上和 flat 一样，但是作为参数的不干扰、无状态方法明确了产生的类型是个流，然后用这些流替换掉原本的每个元素，最终将结果 _扁平化_ 为新的流作为结果返回，所谓 _flat_ map。

---

合理的使用流能显著改善代码的可读性：

```java

    List<LogHandler> logHandlers = getLogHandlers();
    List<String> contracts = new ArrayList<>();
    //    for (LogHandler l : logHandlers) {
    //      List<String> cs = l.getContract();
    //      for (String c : cs) {
    //        if (!contracts.contains(c)) {
    //          contracts.add(c);
    //        }
    //      }
    //    }

    logHandlers.stream().flatMap(l -> l.getContract().stream()).distinct().forEach(contracts::add);

```