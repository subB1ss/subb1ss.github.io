---
draft: false 
title: 消息队列与卡夫卡-阅读文档(on going)
date: 2025-04-24
categories: Middleware
tags:
    - MessageQueue
    - Kafka
    - Java
---

# 开始

## 介绍

### 什么是事件流？
事件流是数字版的人体中枢神经。是从事件源，例如数据库、传感器、移动设备、云服务、应用程序等采集即时数据的一种实现方式。  
并且可以存储这些事件流以便后续检索、操作、处理并即时向事件流反应并可溯源。可以按需求路由事件流去往不同的目标技术。  
事件流保证了数据持续的流动和解释，从而在正确的时间、正确的地点提供正确的信息。

### 事件流可以用来做什么？

很多事

### kafka 是一个事件流平台，这意味着什么？

三点：
- 发布（写）和订阅（读）事件流，包括来自其他系统的持续的输入/输出数据
- 按照你需求的时间内可靠地存储并持续化事件
- 按照事件发生的顺序或者追溯时对事件流进行处理

### 简述 kafka 如何工作

kafka 是一个由复数个**服务端**与**客户端**组成的分布式系统，它们之间通过高性能的 TCP 网络连接通信。可以被部署在裸机、虚拟机和地端或云端的虚拟化容器里。

**服务端**：Kafka 以一个或多个服务器集群的形式运行，可以跨越多个数据中心或云区域。一些服务器构成存储层，称为 *brokers*。其他的一些服务器运行 *Kafka Connect* 来持续性地以事件流形式输入输出数据，来和你现存的系统交互，例如关系型数据库或其他 kafka 集群。为了实现关键性任务用例，kafka 集群拥有高拓展性和容错性，如果任意一台服务器下线，其他服务器将接替其工作以确保不丢失任何关键数据的情况下持续运行。  
**客户端**：通过它们，您可以编写分布式应用程序和微服务，并行、大规模地读取、写入和处理事件流，即使在网络故障或机器故障的情况下也能容错。Kafka 自带了一些这样的客户端，同时还有社区提供的数十种客户端：支持 Java 和 Scala（包括更高级的 Kafka Streams 库）、Go、Python、C/C++ 以及许多其他编程语言的客户端，也支持 REST API。

### 主要概念和术语

一条**事件**记录了你的业务中“某事正在发生”这一现实。当你向 kafka 读/写数据时，会以事件的格式进行。  
An event has a key, value, timestamp, and optional metadata headers.  

一条事件的范例：
- Event key: "Alice"
- Event value: "Made a payment of $200 to Bob"
- Event timestamp: "Jun. 25, 2020 at 2:06 p.m."

*Producers* 是指那些向 kafka 发布（写）事件的客户端，*consumers* 是那些订阅（读并处理）这些事件的。kafka 中，它们相互解耦^[decoupled]并互不相干^[agnostic of each other]。这是实现 kafka 著名的高拓展性的核心设计，例如 producers 从来不需要等待 consumers。kafka 提供了数个保证措施例如单条信息只被处理一次的能力。

事件以 *topics* 的形式被组织和持续化储存。一条 *topic* 就像是一个文件系统中的一个文件夹，事件就是文件夹中的文件。一个典型的 *topic* 名可以是 "payments"。  
一条 *topic* 可以拥有复数个消费者和生产者，一个 *topic* 可以有零个、一个或多个生产者向其写入事件，也可以有零个、一个或多个消费者订阅这些事件。  
*Topic* 中的事件可以按照需求随时阅读，不像传统的消息系统，消息不会“阅后即焚”。而是根据你的需求配置每个 *topic* 来决定每条消息应该存多久。Kafka 的性能基本不受数据大小的影响，因此长时间存储数据完全没有问题。

*Topic* 是被分区的，这意味着一个主题会被分散存储在多个“桶”中，这些桶位于不同的 Kafka broker 上。这种分布式的数据存放方式对可扩展性至关重要，因为它允许客户端应用同时从多个 broker 中读取或写入数据。当一个新事件被发布到某个主题时，实际上是被追加到该主题的某个分区中。具有相同事件键（例如某个客户 ID 或车辆 ID）的事件会写入同一个分区，Kafka 保证任何一个主题分区的消费者总是会按照事件写入的顺序，准确无误地读取这些事件。

![主题的分区](./1-1.png)

为了使数据具备容错性和高可用性，每个主题都可以跨地理区域或数据中心进行复制。无论是系统故障、broker 维护，还是其他问题发生时，总会有多个 broker 拥有数据的副本。生产环境中常见的设置是副本因子为 3，也就是说每条数据始终有三份副本。这种复制是在主题分区（topic-partition）级别进行的。

### Kafka APIs

Kafka 为 Java 和 Scala 提供了五个核心 API：
- Admin API：管理和审查主题、brokers和其他的kafka对象
- Producer API：向一个或多个主题中发布（写）事件流
- Consumer API：订阅（读）并处理一个或多个主题中的事件流
- Kafka Streams API：用于实现流处理应用和微服务。它提供了更高层次的功能来处理事件流，包括转换、带状态的操作（如聚合和连接）、窗口操作、基于事件时间的处理等。输入数据从一个或多个主题中读取，生成的输出则写入一个或多个主题，从而实现对输入流到输出流的有效转换
- Kafka Connect API：构建连接器

## 用例

### 消息队列

### 网站活动跟踪

### 指标监控

### 日志聚合
很多人使用 Kafka 来替代传统的日志聚合方案。传统的日志聚合通常是将服务器上的物理日志文件收集起来，集中存储到某个位置（如文件服务器或 HDFS）以便处理。而 Kafka 则抽象掉了文件的细节，以更简洁的方式将日志或事件数据表示为消息流。这不仅实现了更低延迟的处理方式，还更方便支持多个数据源和分布式的数据消费。与 Scribe 或 Flume 等以日志为中心的系统相比，Kafka 拥有同样优秀的性能、更强的持久性保障（得益于副本机制），以及更低的端到端延迟。

### 流式处理

### 事件溯源 
事件溯源是一种应用程序设计风格，它将状态的每一次变化都记录为按时间顺序排列的一系列事件。Kafka 支持存储超大规模的日志数据，非常适合作为这种风格应用的后端。

### 日志提交
Kafka 可以作为分布式系统的一种外部提交日志。日志用于在节点之间复制数据，并作为故障节点重新同步数据的一种机制。Kafka 的日志压缩^[log compaction]功能很好地支持了这种用法。在这种场景下，Kafka 的作用类似于 Apache BookKeeper 项目。

## 快速开始

### STEP 1: GET KAFKA

### STEP 2: START THE KAFKA ENVIRONMENT

**使用下载文件**

**使用 docker 镜像**：  
获取 docker 镜像
```sh
$ docker pull apache/kafka:4.0.0
```
启动 kafka 容器  
```sh
$ docker run -p 9092:9092 apache/kafka:4.0.0
```
或者使用基于 GraalVM Native^[GraalVM 提供了一种功能叫做 Native Image，它可以把 Java（或其他 JVM 语言）代码 AOT（Ahead-Of-Time）编译 成一个 不依赖 JVM 的本地可执行文件（native executable），类似于 C/C++ 编译后的程序。] 的
```sh
$ docker pull apache/kafka-native:4.0.0
$ docker run -p 9092:9092 apache/kafka-native:4.0.0
```

### STEP 3: CREATE A TOPIC TO STORE YOUR EVENTS
```sh
$ bin/kafka-topics.sh --create --topic quickstart-events --bootstrap-server localhost:9092
#	--create			Create a new topic
#	--topic				<String: topic>	
#	--bootstrap-server 	<String: server to connect to>
$ bin/kafka-topics.sh --describe --topic quickstart-events --bootstrap-server localhost:9092
Topic: quickstart-events	TopicId: 00a45VDfTyyFNadsmeZCQg	PartitionCount: 1	ReplicationFactor: 1	Configs: segment.bytes=1073741824
	Topic: quickstart-events	Partition: 0	Leader: 1	Replicas: 1	Isr: 1	Elr: 	LastKnownElr: 
```

### SETP 4: WRITE SOME EVENTS INTO THE TOPIC
Kafka 客户端通过网络向 kafka brokers 交流来读写事件。一旦接受，brokers 将按照你需求的时长持续化并容错地方式存储事件，甚至是永久。  
```sh
$ ./kafka-console-producer.sh --topic quickstart-events --bootstrap-server localhost:9092
>This is my first event
>This is my second event
```

### STEP 5: READ THE EVNETS
```sh
04007a697835:/opt/kafka/bin$ ./kafka-console-consumer.sh --topic quickstart-events --from-beginning --bootstrap-server localhost:9092
This is my first event
This is my second event
```
`Ctrl-C` 来停止 consumer 客户端

### STEP 6: IMPORT/EXPORT YOUR DATA AS STREAMS OF EVENTS WITH KAFKA CONNECT
Kafka Connet 允许你持续性地从外部系统中提取数据，反之亦然^[vice versa]。  
它是一个可扩展的工具，用于运行连接器，这些连接器实现了与外部系统交互的自定义逻辑。因此，将现有系统与 Kafka 集成变得非常简单。为了进一步简化这个过程，Kafka 社区还提供了数百个现成可用的连接器。

在这一节我们使用简单连接器来从文件中向 Kafka topic 导入数据，并将数据从 Kafka topic 中导回文件。

基于快速上手的目标，这里的配置文件将使用相对路径并且认为连接器的包是一个 [uber jar](https://stackoverflow.com/questions/11947037/what-is-an-uber-jar-file)。然而，并不应该在生产环境中使用相对路径，使用绝对路径总是更好的。

```sh
$ echo "plugin.path=libs/connect-file-4.0.0.jar" >> config/connect-standalone.properties
```

然后，准备一些测试文件

```sh
$ echo -e "foo\nbar" > test.txt
```

继续，我们将以 *standalone* 模式启用两个连接器，这意味着它们将在运行在一个本地的专用进程中。 

我们提供三个配置文件作为参数  
- 第一个永远是 Kafka Connect 的配置文件，包含了一些通用配置例如需要连接的 Kafka brokers 和数据的序列化格式。  
- 剩下的两个配置文件每个都特定了一个需要创建的连接器，这些文件中包含了一个独特的连接器名，需要实例化的连接器类，以及一些其他被连接器需要的配置。

```sh
$ bin/connect-standalone.sh config/connect-standalone.properties config/connect-file-source.properties config/connect-file-sink.properties
```


::: details connect-file-source.properties
```properties
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

name=local-file-source
connector.class=FileStreamSource
tasks.max=1
file=test.txt
topic=connect-test
```
:::

::: details console-consumer
```sh
04007a697835:/opt/kafka$ bin/kafka-console-consumer.sh --topic connect-test --from-beginning --bootstrap-server localhost:9092
{"schema":{"type":"string","optional":false},"payload":"foo"}
{"schema":{"type":"string","optional":false},"payload":"bar"}
```
:::

这些卡夫卡自带的范例配置文件，默认使用本地集群配置。先前启动的两个连接器，一个是源连接器它从输入文件中逐行读取并逐个发布至 Kafka topic；第二个是下沉连接器从 Kafka topic 中读取信息并将它们逐行写入文件。

```sh
04007a697835:/opt/kafka$ cat test.sink.txt 
foo
bar
```