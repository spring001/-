Function.prototype.myCall = (context = window, ...args) => {
  context.fn = this;
  let result = context.fn(...args);
  delete context.fn;
  return result
}

Function.prototype.myApply = (content = window, args = []) => {
  content.fn = this;
  let result = context.fn(...args);
  delete context.fn;
  return result;
}
Function.prototype.myBind = (context = window, ...args) => {
  const _this = this;
  return function F() {
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    } else {
      _this.apply(context, [...args, ...arguments]);
    }
  }
}