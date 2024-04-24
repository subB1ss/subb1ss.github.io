## section 1.5 Character Input and Output

我们将要去考虑一系列关于处理字符数据的程序，你会发现许多程序只是我们在这里讨论的原型的拓展。

标准库提供的输入输出模型是十分简单的：文本输入或者输出，无论它的来源或者目标，都将被作为字符流处理。一个文本流 `text stream` 是一个被分为许多行的字符序列，每行都包含着零或更多字符并以换行符结尾。库的职责就是使每个输入或输出流都符合这个模型。C 程序员在使用库时不需要关心这些行是如何在程序外存在的。

标准库提供了些许函数用于读写单个字符，其中 `getchar` 和 `putchar` 是最简单的。每次被调用，`getchar` 从文本流中读取下一个输入的字符 `next input character` 并将它作为值返回。也就是说，在

```c
    c = getchar();
```

之后，变量 `c` 包含了输入的下一个字符。这个字符通常来自于键盘输入，从文件输入将在第七章讨论。

函数 `putchar` 每被调用就打印一个字符：

```c
    putchar(c);
```

将整型变量 `c` 的值作为一个字符打印，通常是在屏幕上。对 `putchar` 和 `printf` 的调用可以是交错的，输出会以他们被调用的顺序呈现。

### section 1.5.1 File Copying

通过使用 `getchar` 和 `putchar`，你可以写出数量惊人的实用代码同时不需要了解更多关于输入与输出的事。一个简单的例子就是一个复制输入到输出，一次次进行的程序：

```
    read a character
    while (character is not end-of-life indicator)
        output the character just read
        read a character

```

将其转换为C代码：

```c

#include <stdio.h>

/* copy input to output; 1st version */
main ()
{
    int c;

    c = getchar();
    while (c != EOF) {
        putchar(c);
        c = getchar();
    }
}

```

这个关系运算符 `!=` 意思是“不等于”

任何在屏幕或者键盘上出现的字符，当然和其他一样，在底层以二进制形式存储。字符类型是专用于存储这样的字符数据，但是任何整数类型也可以使用。在这里，我们因为一个细微切重要的原因的运用 `int` 类型。

问题的关键是从有效的输入数据中辨别输入的结束。解决方案是 `getchar` 返回一个独特的值作为输入结束的标志，这个值被称为文件结束符 `EOF`，意思是 `end of file`。我们需要将 `c` 声明为一个足够大的类型来装下任何 `getchar` 返回的值。我们不能使用 `char` 既然 `c` 必须足够大来存储 `EOF` 以及任何可能的字符。因此我们使用 `int`。

`EOF` 是一个定义在 `<stdio.h>` 中的整数，但具体的数字值并不重要，只要它不与任何char值相同即可。通过使用符号常量，我们确保程序中没有任何内容依赖于具体的数字值。