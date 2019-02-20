/**
 * 继承
 * 
 * 构造函数和原型还有实例之间的关系：每个构造函数都有一个原型对象（prototype），
 * 原型对象都包含一个指向构造函数的指针（constructor），
 * 而实例都包含一个指向原型对象的内部指针 （__propto__） 。
 */
//原型链继承：把子类的prototype设置为父类的实例
/**
 * 优点：父类方法可以复用
 * 缺点：1.不能向父类传递参数，2.引用属性会被所有实例共享
 */
// 父类
function Person() { }
// 子类
function Student() { }
// 继承
Student.prototype = new Person()

//构造函数继承
//在子类构造函数中 父类.call(this) 可以将父类的私有变成子类的私有
/**
 * 优点：1.父类的引用属性不会被共享
 *       2.子类构建实例时可以向父类传递参数
 * 缺点：父类的方法不能复用，子类实例的方法每次都是单独创建的。
 */
// 父类
function Person() {
  this.hobbies = ['music', 'reading']
}
// 子类
function Student() {
  Person.call(this)
}

//组合继承 = 构造函数继承 + 原型链继承
/**
 * 优点：
  父类的方法可以被复用
  父类的引用属性不会被共享
  子类构建实例时可以向父类传递参数
  缺点：
  调用了两次父类的构造函数
 */
// 父类
function Person() {
  this.hobbies = ['music', 'reading']
}
// 父类函数
Person.prototype.say = function () { console.log('I am a person') }
// 子类
function Student() {
  Person.call(this)             // 构造函数继承(继承属性)
}
// 继承
Student.prototype = new Person()  // 原型链继承(继承方法)

//原型式继承->原型式继承的object方法本质上是对参数对象的一个浅复制。
/**
  优点：父类方法可以复用
  缺点：
  父类的引用属性会被所有子类实例共享
  子类构建实例时不能向父类传递参数
  Object.create()实现了原型式继承
 */
function object(o) {
  function F() { }
  F.prototype = o;
  return new F();
}

//寄生组合继承
function Parent() {
  this.x = 100
}
Parent.prototype.say = () => {
  console.log('>>>>>>>> ')
}
function Child() {
  this.y = 100
  Parent.call(this);
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;


// ES6 Class extends
/**
 * ES6继承的结果和寄生组合继承相似
 * 寄生组合继承是先创建子类实例this对象，然后再对其增强
 * 而ES6先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法）,然后再用子类的构造函数修改this。
 */
Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
