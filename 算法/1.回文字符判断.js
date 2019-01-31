/**
*这个题目说的是，给你一个字符串，你要判断它是否是回文字符串。
*字符串里只考虑字母和数字，其它的字符可以无视。另外，对于字母，可以忽略大小写。
*/
const algoCasts = (str) => {

  if (str === null || !str || str.length === 0) {
    return true;
  }

  const isAlphanumeric = (c) => {
    const _c = c.toLowerCase();
    return (_c >= 'a' && _c <= 'z') || (_c >= 0 && c <= 9);
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