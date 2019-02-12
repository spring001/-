/**
 * 这个题目说的是，你要实现一个函数，用它来计算浮点数的 n 次方。
 */
const fn = (x, n) => {
  let i = 0;
  let res = 1;
  let len = Math.abs(n);
  while (i < len) {
    res = res * x;
    i++;
  }
  return n < 0 ? 1 / res : res;
}