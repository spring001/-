/**
 * 给你一个整数数组和一个目标值，你要找到数组里两个整数， 它们的和等于目标值。然后返回这两个整数的下标。
 * 
 * 比如说给你的整数数组是：
 * 1, 2, 3, 6, 8, 11
 * 目标值是 10。那么，满足条件的两个整数是，2 和 8，它们的和是 10。所以你要返回它们的下标是 1 和 4。
 */
const AlgoCasts = (arr, sum) => {
  if (!!!arr || !!!sum) {
    return [-1, -1];
  }
  for (let i = 0; i < arr.length; i++) {
    let lastNum = sum - arr[i];
    let lastIndex = arr.indexOf(lastNum);
    if (lastIndex > -1 && lastIndex !== i) {
      return [i, lastIndex];
    }
  }
  return [-1, -1]
}

/**
 * 有序
 */
const fun = (arr, sum) => {
  if (!!!arr || !!!sum) {
    return [-1, -1];
  }
  let j = arr.length - 1;
  let i = 0;
  while (i < j) {
    if (arr[i] + arr[j] > sum) j--;
    else if (arr[i] + arr[j] < sum) i++;
    else return [i + 1, j + 1];
  }
  return [-1, -1]
}

/**单身数字 */
const single = (arr) => {
  let sum = 0, sumObj = {}, total = 0;;
  (arr || []).forEach(item => {
    if (!sumObj[item]) {
      sumObj[item] = true;
      sum = sum + item;
    } else {
      sum = sum - item;
    }
  })
  return sum;
}