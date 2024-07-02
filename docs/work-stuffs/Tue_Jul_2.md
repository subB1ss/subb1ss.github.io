# May-June

## May

- `ApplicationRunner`/`CommandLineRunner`接口执行的的不是由Spring管理的代理对象
- `@Async`注解必须是代理对象方法才能生效
- 非主线程的异步方法不会抛出异常至主线程，发生异常时表现为线程阻塞，无法在主线程中捕获
    - 使用`Future`或者`CompletableFuture`来捕获异常
    - 在异步方法内部捕获处理异常
- 用nginx反向代理解决跨域问题
- 语义化版本、约定式提交

## June

- `el-select`之类的数据回显强转一下数据类型`:value="Number(dict.value)"`
- 需要指定Json的数据格式时：
    - `@JsonView`显式定义视图
    - 使用VO对象：ViewObject
- 解析格式问题排查步骤
    1. 检查rawResponse，排查前端数据接收隐式转换问题
    2. 后台控制台或者Log查看数据类型
    3. Entity是否有错误指定类型
    4. `Mapper.xml`内指定`resultMap<JavaType>`
- Entity类param和getter类型不匹配时，Spring代理时会导致`nullpointerException`

```java
    private Long param;

    public long getParam() {
        return this.param;
    }

```


