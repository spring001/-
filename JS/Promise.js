/**
 Promise 基本结构
 Promise的构造函数接受一个函数为参数（handle），该函数有resolve，reject两个参数，这两个参数也是函数
 Promise 状态和值
 状态：
 Pending
 Fulfiled
 Rejected
 状态只有从Pending->Fulfiled 或者 Pending->Rejected
 值：
 状态改变传递给回调函数的值
 handle 包含的resolve reject用户改变Promise的状态和传入Promise的值
 Promise then
 then方法注册 当resolve(成功)/reject(失败)的回调函数
 */
const isFunction = (fun) => {
  return fun && typeof fun === 'function';
}

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

function Promise(handle) {
  let that = this;
  that.status = PENDING;
  that.val = undefined;
  this.onFulfilledCall = [];
  this.onRejectedCall = [];

  function resolve(val) {
    if (val instanceof Promise) {
      return val.then(resolve, reject);
    }
    if (that.status === PENDING) {
      that.status = FULFILLED;
      that.val = val;
      that.onFulfilledCall.forEach(cb => cb(that.val))
    }
  }
  function reject(reason) {
    if (that.status === PENDING) {
      that.status = REJECTED;
      that.val = reason;
      that.onRejectedCall.forEach(cb => cb(that.val))
    }
  }
  try {
    handle(resolve, reject)
  } catch (err) {
    reject(err)
  }
}
Promise.prototype.then = function (onFulfilled, onRejected) {
  const that = this;
  // 处理参数默认值 保证参数后续能够继续执行
  onResolved = typeof onResolved === 'function' ? onResolved : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r };
  if (that.status === PENDING) {
    that.onFulfilledCall.push(onResolved)
    that.onRejectedCall.push(onRejected)
  }
  else if (that.status === FULFILLED) {
    onFulfilled(that.val);
  }
  else if (that.status === REJECTED) {
    onRejected(that.val);
  }
}