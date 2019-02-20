/**
*引用类型存放在堆中
*浅拷贝
1.Object.assign
2.扩展运算符
* 深拷贝
  JSON.parse(JSON.stringify(object))
  会忽略undefined，symbol，函数，不能解决循环引用的对象
*/
function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error argments')
  }
  const target = source instanceof Array ? [] : {};
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      if (source[key] && typeof source[key] === 'object') {
        target[key] = deepClone(source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}