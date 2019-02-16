/**
*这个题目说的是，给你一个字符串，你要判断它是否是回文字符串。
*字符串里只考虑字母和数字，其它的字符可以无视。另外，对于字母，可以忽略大小写。
*/
const algoCasts = (str) => {

  if (str === null || !str || str.length === 0) {
    return true;
  }

  const isAlphanumeric = (c) => {
    const reg = /[a-z]|[A-Z]|[0-9]/
    const _c = c.toLowerCase();
    return reg.text(_c);
  }

  const isEqualIgnoreCase = (a, b) => {
    return a.toLowerCase() === b.toLowerCase();
  }
  let _str = str.toString();
  let i = 0;
  let j = _str.length - 1;
  for (; i < j; i++ , j--) {
    while (i < j && !isAlphanumeric(_str[i])) i++;
    while (i < j && !isAlphanumeric(_str[j])) j--;

    if (i < j && !isEqualIgnoreCase(_str[i], _str[j])) return false;
  }
  return true;
}


const sum2 = (...args) => {
  let res = [...args].reduce((a, b) => a + b) || 0;
  const fn = (...params) => {
    if (params.length > 0) {
      return sum2(params.reduce((a, b) => a + b, res));
    } else {
      return res;
    }
  }
  // fn.valueOf = () => {
  //   return res;
  // }
  // fn.toString = () => {
  //   return res + '';
  // }
  return fn;
}

