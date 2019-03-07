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

6. rest 参数
形式为...变量名，用于获取函数的多余参数
7. 箭头函数 => 
 * 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象
 * 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
 * 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
 * 不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

### 数组
1. 扩展运算符
* 扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构。
Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。
```
const go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] // [1, 2, 3]

```
上面代码中，变量go是一个 Generator 函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组。

2. Array.from()
* Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）
```
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```
**任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。**
```
Array.from({ length: 3 });
// [ undefined, undefined, undefined ]
```
上面代码中，Array.from返回了一个具有三个成员的数组，每个位置的值都是undefined。扩展运算符转换不了这个对象。

* Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
```
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
```
3. Array.of
Array.of方法用于将一组值，转换为数组。
```
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
```
Array.of方法可以用下面的代码模拟实现。
```
function ArrayOf(){
  return [].slice.call(arguments);
}
```
4. find & findIndex
```
[1, 4, -5, 10].find((n) => n < 0)
// -5

[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10

[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```
这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。
```
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
```
5. fill
方法使用给定值，填充一个数组。
```
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```
6. entries()，keys()和values()
它们都返回一个遍历器对象，可以用for...of循环进行遍历
```
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```
7. includes
**Map 和 Set 数据结构有一个has方法，需要注意与includes区分。**
* Map 结构的has方法，是用来查找键名的，比如Map.prototype.has(key)、WeakMap.prototype.has(key)、Reflect.has(target, propertyKey)。
* Set 结构的has方法，是用来查找值的，比如Set.prototype.has(value)、WeakSet.prototype.has(value)。

### 对象
1. 表达式作为属性名
```
let propKey = 'foo';

let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
};
```
2. name 方法
函数的name属性，返回函数名。对象方法也是函数，因此也有name属性。
3. 属性的可枚举性和遍历
* 可枚举性
对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。
```
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
```
描述对象的enumerable属性，称为“可枚举性”，如果该属性为false，就表示某些操作会忽略当前属性。

目前，有四个操作会忽略enumerable为false的属性。

for...in循环：只遍历对象自身的和继承的可枚举的属性。
Object.keys()：返回对象自身的所有可枚举的属性的键名。
JSON.stringify()：只串行化对象自身的可枚举的属性。
Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。
4. 属性的遍历
1）for...in
for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

2) Object.keys(obj)
Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

3）Object.getOwnPropertyNames(obj)
Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

4) Reflect.ownKeys(obj)

5. super 关键字
super，指向当前对象的原型对象。

6. 对象的扩展运算符

7. Object.is
和 === 基本一致 不同之处只有两个：一是+0不等于-0，二是NaN等于自身。
```
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```
8. Object.assign

Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
**用途**
* 为对象添加属性
```
class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}
```
* 为对象添加方法
* 浅拷贝
只能拷贝实例属性
以下能拷贝原型属性
```
const clone = source => {
  const properType = Object.getPrototcypeOf(source);
  return Object.assign(Object.create(properType),source);
}
```
9. Object.getOwnPropertyDescriptor()
返回某个对象属性的描述对象（descriptor）

10. Object.setPrototypeOf()
Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的prototype对象，返回参数对象本身

11. Object.getPrototypeOf() 
该方法与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象。

### Symbol
**JavaScript 语言的第七种数据类型**
```let s1 = Symbol('foo');//可以接受一个字符串作为参数，表示对 Symbol 实例的描述```

Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。

由于以 Symbol 值作为名称的属性，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。

1. Symbol.for()，Symbol.keyFor() 
有时，我们希望重新使用同一个 Symbol 值，Symbol.for方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。
```
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true
```
Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。
Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。
```
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```

### Set 和 Map 数据结构
1. Set
* 它类似于数组，但是成员的值都是唯一的，没有重复的值。
* Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。
* 数组去重 [...new Set(array)]
* 去除字符串里面的重复字 //[...new Set('ababbc')].join('')
* Set 实例的属性和方法
 1) Set.prototype.constructor：构造函数，默认就是Set函数。
 2) Set.prototype.size：返回Set实例的成员总数。
 3) add(value)：添加某个值，返回 Set 结构本身。
 4) delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
 5) has(value)：返回一个布尔值，表示该值是否为Set的成员。
 6) clear()：清除所有成员，没有返回值。

* 遍历操作
 1) keys()：返回键名的遍历器
 2) values()：返回键值的遍历器
 3) entries()：返回键值对的遍历器
 4) forEach()：使用回调函数遍历每个成员

2. Map
Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。


### Reflect
1.  将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。
2. 修改某些Object方法的返回结果，让其变得更合理。
Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。
3. 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。
4. Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。

**静态方法**
Reflect.apply(target, thisArg, args)
Reflect.construct(target, args)
Reflect.get(target, name, receiver)
Reflect.set(target, name, value, receiver)
Reflect.defineProperty(target, name, desc)
Reflect.deleteProperty(target, name)
Reflect.has(target, name)
Reflect.ownKeys(target)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.getOwnPropertyDescriptor(target, name)
Reflect.getPrototypeOf(target)
Reflect.setPrototypeOf(target, prototype)

* Reflect.get(target, name, receiver)
Reflect.get方法查找并返回target对象的name属性，如果没有该属性，则返回undefined。如果name属性部署了读取函数（getter），则读取函数的this绑定receiver。
```
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
};

var myReceiverObject = {
  foo: 4,
  bar: 4,
};

Reflect.get(myObject, 'baz', myReceiverObject) // 8
```
* Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性。
* Reflect.construct(target, args) 
Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。

```
function Greeting(name) {
  this.name = name;
}

// new 的写法
const instance = new Greeting('张三');

// Reflect.construct 的写法
const instance = Reflect.construct(Greeting, ['张三']);
```
* Reflect.getPrototypeOf(obj) 方法用于读取对象的__proto__属性
* Reflect.apply(func, thisArg, args)
Reflect.apply方法等同于Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数。
* Reflect.defineProperty(target, propertyKey, attributes)
* Reflect.isExtensible (target) 
Reflect.isExtensible方法对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。如果参数不是对象，Object.isExtensible会返回false，因为非对象本来就是不可扩展的，而Reflect.isExtensible会报错。
* Reflect.ownKeys (target)
Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。
```
var myObject = {
  foo: 1,
  bar: 2,
  [Symbol.for('baz')]: 3,
  [Symbol.for('bing')]: 4,
};

// 旧写法
Object.getOwnPropertyNames(myObject)
// ['foo', 'bar']

Object.getOwnPropertySymbols(myObject)
//[Symbol(baz), Symbol(bing)]

// 新写法
Reflect.ownKeys(myObject)
// ['foo', 'bar', Symbol(baz), Symbol(bing)]
```

**实现观察者模式**
```
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer => observer());
  return result;
}
```
### Proxy
Proxy 用于修改某些操作的默认行为，属于元编程
**Proxy 支持的拦截操作一览**
get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。

### Promise

* 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）
* 一旦状态改变，就不会再变，任何时候都可以得到这个结果。从pending变为fulfilled和从pending变为rejected

```
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```
* Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。
* Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。
* finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。
* Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例

### Iterator 和 for...of 循环
遍历器（Iterator）是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
* 一是为各种数据结构，提供一个统一的、简便的访问接口；
* 二是使得数据结构的成员能够按某种次序排列；
* 三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。

一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。
默认的 Iterator 接口部署在数据结构的**Symbol.iterator**属性
Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。