##ES6基础
###变量的定义
####1. let
1. 暂时性死区
区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
2. 不允许重复定义
####2. 块级作用域
1. 取代 立即执行函数
2. 块级作用域雨函数声明
* 允许在块级作用域内声明函数。
* 函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
####3. const
1. const声明一个只读的常量。一旦声明，常量的值就不能改变。
2. const的作用域与let命令相同：只在声明所在的块级作用域内有效。
3. const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
4. 不允许重复定义
**不允许重复定义**
变量指向的那个内存地址所保存的数据不得改动
* 对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量
* 对象和数组变量指向的内存地址，保存的只是一个指向实际数据的指针.

#### ES6声明变量的六种方法
var function let const import class

###变量解构赋值
####1. 数组的解构赋值
“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
```
let [a, b, c] = [1, 2, 3];
```
**只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。**
```
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5
```
##### 默认值
1. 解构赋值允许指定默认值。
```let [foo = true] = [];```
2. ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。
```
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```
3. 默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
#### 2.对象的解构赋值
1. 对象的解构和数组的解构不同在于数组是按次序的，而对象没得有次序，只要属性名相同就能取到正确的值
2. 默认值：属性严格等于undefined默认值才生效
#### 3.字符串
字符串被转化成类似数组的对象
```
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
let {length : len} = 'hello';
len // 5
```
#### 4. 数值和Boolean
解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
```
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```
#### 5. 函数参数
```
[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]
```
#### 6. 圆括号问题
**不能使用圆括号的情况**
1. 变量声明语句 模式不能使用圆括号
```let [(a)] = [1];```
2. 函数参数
函数参数也属于 变量声明
```function f([(z)]) { return z; }```
3. 赋值语句的模式
```({ p: a }) = { p: 42 };```
能使用括号的情况，非模式部分，可以使用括号
#### 7. 用途
(1) 变量交换
```[x, y] = [y, x];```
(2) 从函数返回多个值
(3) 函数参数的定义
(4) 提取 JSON 数据
(5) 函数参数的默认值
(6) 遍历 Map 结构
```
for (let [key, value] of map) {
  console.log(key + " is " + value);
}
```
(7) 输入模块的指定方法
```const { SourceMapConsumer, SourceNode } = require("source-map");```

### 字符串的扩展
1. 字符串遍历器接口
ES6 为字符串添加了遍历器接口,得以使使用for...of循环遍历。
2. includes(), startsWith(), endsWith()
这三个方法都支持第二个参数，表示开始搜索的位置。返回Boolean值
使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。
3. repeat
repeat方法返回一个新字符串，表示将原字符串重复n次。
4. padStart()，padEnd()
如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。
```
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```
如果省略第二个参数，默认使用空格补全长度。
5. matchAll()
6. 模板字符串
###  正则表达式
1. RegExp 构造函数
如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。
  ```new RegExp(/abc/ig, 'i')```
2. 字符串的正则方法
match()、replace()、search()和split()。
3. 具名组匹配
```const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;```
4. 解构赋值和替换
```let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar');```
5. matchAll
### 数值的扩展
#### 1. Number.isFinite()和Number.isNaN()
* Number.isFinite()用来检查一个数值是否为有限的（finite），即不是Infinity。
* Number.isNaN()用来检查一个值是否为NaN。
注意，如果参数类型不是数值，Number.isFinite一律返回false。
如果参数类型不是NaN，Number.isNaN一律返回false。
#### 2. Number.parseInt(), Number.parseFloat()
ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。
#### 3. Number.isInteger()
Number.isInteger()用来判断一个数值是否为整数。
#### 4.Math 对象扩展
1. Math.trunc方法用于去除一个数的小数部分，返回整数部分。
2. Math.sign方法用来判断一个数到底是正数、负数、还是零
3. Math.cbrt方法用于计算一个数的立方根。
4. Math.hypot方法返回所有参数的平方和的平方根
### 函数
1. 参数的默认值
2. 参数默认值可以与解构赋值的默认值，结合起来使用。
3. 参数默认值的位置
通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。
4. 函数的 length 属性
指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数
5. 作用域  
一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。