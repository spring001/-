const inSort = (a, b, desc) => {
  if (desc) {//降序
    return a < b;
  } else {
    return a > b;
  }
}
//冒泡排序->两层循环 两两比较 交换位置
const bubbleSort = (arr, desc = false) => {
  if (arr instanceof Array === false) {
    throw 'bubbleSort 函数的参数只接受一个数组'
  }
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (inSort(arr[j], arr[j + 1], desc)) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr;
}
//选择排序->两层循环 找准一个最大或者最小的索引,交换位置
const selectSort = (arr, desc = false) => {
  if (arr instanceof Array === false) {
    throw 'bubbleSort 函数的参数只接受一个数组'
  }
  let index = 0;
  let len = arr.length;
  for (let i = 1; i < len; i++) {
    for (let j = i; j < len; j++) {
      if (inSort(arr[index], arr[j], desc)) {
        index = j;
      }
    }
    [arr[index], arr[i - 1]] = [arr[i - 1], arr[index]]
    index = i;
  }
  return arr
}
//插入排序->两层循环 左边有序 右边无序 只要比它前一个数小就交换,直到没有更小的
const insertSort = arr => {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
      } else {
        break;
      }
    }
  }
  return arr;
}
//快速排序
/**
 * 处理大数据最快的排序算法之一
 * 找到一个数作为参考，比这个数字大的放在数字左边，比它小的放在右边； 然后分别再对左边和右变的序列做相同的操作(递归).
 */
const quickSort = (arr) => {
  if (arr instanceof Array === false) {
    throw 'bubbleSort 函数的参数只接受一个数组'
  }
  let left = [];
  let right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[0]) {
      right.push(arr[i])
    } else {
      left.push(arr[i])
    }
  }
  if (left.length > 1) {
    left = quickSort(left)
  }
  if (right.length > 1) {
    right = quickSort(right)
  }
  return [...left, arr[0], ...right];
}