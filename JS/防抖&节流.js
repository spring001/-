/**
 * 防抖和节流的作用都是防止函数多次调用
 * 区别在于，假设一个用户一直触发这个函数，
 * 且每次触发函数的间隔小于wait，
 * 防抖的情况下只会调用一次，
 * 而节流的情况会每隔一定时间（参数wait）调用函数。
 * 
 */
//防抖->首次不执行
const debounce = (func, wait = 50) => {
  let timer;
  return (...args) => {
    const context = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(context, args);
    }, wait)
  }
}
//防抖->首次执行
const debounce1 = (func, wait, immedate = true) => {
  let timer;
  return (...args) => {
    let context = this;
    if (immedate && !timer) {
      func.apply(this, args);
      timer = 1;
    } else {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, wait);
    }
  }
}

//节流
const throllle2 = (fun, wait = 50) => {
  let pre = 0;
  return (...args) => {
    const context = this;
    let now = Date.now();
    if (now - pre > wait) {
      fun.apply(this, args);
      pre = now;
    }
  }
}
//定时器实现
const throttle = (func, wait = 50) => {
  let timer = null;
  return (...args) => {
    const context = this;
    if (!timer) {
      timer = setTimeout(() => {
        fun.apply(this, args);
        timer = null;
      }, wait);
    }
  }
}
//定时器加时间戳
const throttle2 = (func, wait) => {
  let timer = null;
  let pre = Date.now();
  return (...args) => {
    let cur = Date.now();
    let context = this;
    if (timer) clearTimeout(timer);
    if (cur - pre > wait) {
      fun.apply(this, args);
      pre = cur;
    } else {
      timer = setTimeout(() => {
        fun.apply(this, args);
      }, wait);
    }
  }
}
