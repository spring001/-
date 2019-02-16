#### MVVM
View：界面
Model：数据模型
ViewModel：View和Model之间的桥梁

UI是通过数据驱动的，数据变化了会更新对应的UI，UI改变也会更新对应的Model

数据双向绑定 Angluar 脏数据检测 Vue数据劫持

######脏数据检测
数据双向绑定
界面到数据的更改，是通过UI事件，Ajax请求，或者timeout等回调，数据到界面的更改是通过脏数据检测

只有触发UI事件，Ajax请求，或者timeout的延迟，才会触发脏检查
点击一次button,counter就会+1,因为点击事件,将couter+1,而后触发了脏检查,又将新值2 返回给了界面

当触发指定事件后，会执行$digest函数循环遍历所有的观察者，判断值是有变化，有变化的话会调用处理函数（用新值代替老值），然后继续调用观察者，直到么有变化

每个绑定到UI上的数据，都有一个watch对象

###Vue数据劫持
Object.defineProperty() 

新版本Proxy 替换 Object.defineProperty() 

