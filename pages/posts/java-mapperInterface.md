---
draft: false
title: Java MapperInterface
date: 2024-07-22
categories: Sticker
tags:
    - Java
    - Spring
---

# 使用一个统一的 Interface 来提供 Mapper 实例

最近接手公司同事的项目，他习惯在抽离公共逻辑的抽象父类中定义一个抽象的 `getMapperInterface` 方法，返回一个 `MapperInterface` 接口。

再通过在这个接口中定义返回所需要的持久层 _mapper_ 实例的方法，让子类实现这个 `MapperInterface` 并注入这些持久层 _mapper bean_。

通过继承抽象类的 `getMapperInterface` 方法，在该方法中返回自身实例 `this`，这样就能通过在接口中定义的方法访问到子类属性，从而在非 _component_ 中访问到 _bean_。

## 解构一下

实际上就是一种模板语法，使用泛型进一步优化一下：

```java
public abstract class AbstractListener {

    protected abstract <T> T getSpecificBean(Class<T> beanClass);

    public void commonLogic() {
        // ... 公共逻辑
        BeanA beanA = getSpecificBean(BeanA.class); 
        beanA.doSomething();
    }
}

@Component
public class ConcreteListenerA extends AbstractListener {

    @Autowired
    private BeanA beanA;

    @Override
    protected <T> T getSpecificBean(Class<T> beanClass) {
        return beanClass.cast(beanA);
    }
}
```