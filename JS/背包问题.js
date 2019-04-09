/**
 * 有一无序数组，数组个数为m，如何从这m个数里面找到N个数，使这N个数的和为M；并阐述时间复杂度和空间复杂度
 */
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];


const sum = (arr, total, count) => {
  const result = [];

  const fn = (arr, total, count, target = []) => {
    if (count === 0 && total === 0) {
      result.push(target);
    } else if (count > 0 && total > 0) {
      for (let [k, v] of arr.entries()) {
        if (v <= total) {
          fn(arr.slice(k + 1), total - v, count - 1, [...target, v]);
        } else {
          break;
        }
      }
    }
  }
  fn(arr, total, count);
  return result;
}

console.log(sum(arr, 14, 3));

/**
 * 取交集
 */
function fn3(arr1, arr2) {
  let len1 = arr1.length, len2 = arr2.length, source = arr1, target = arr2;
  let result = [];
  if (len1 < len2) {
    source = arr2;
    target = arr1;
  }
  source.forEach(item => {
    let index = target.indexOf(item);
    if (index > -1) {
      result.push(item);
      target.splice(index, 1);
    }
  })
  return result
}
/**
 * 降维度
 */
function flat(arr) {
  let result = [];
  arr.forEach(item => {
    if (Array.isArray(item)) {
      result = [...result, ...flat(item)]
    } else {
      result = [...result, item];
    }
  })
  return result;
}



function flat2(arr) {
  return arr.reduce((pre, next) => {
    return Array.isArray(next) ? [...pre, ...flat2(next)] : [...pre, next]
  }, [])
}

/**
 * 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
 */
const rotate = arr => k => {
  k = Math.min(k, arr.length);
  return [...arr.slice(-k), ...arr.slice(0, arr.length - k)]
}
/**
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * @param {*} arr 
 */
const moveNum = arr => {
  const arrs = [...arr];
  for (let i = 0; i < arrs.length; i++) {
    for (let j = i + 1; j < arrs.length; j++) {
      if (arrs[i] === 0 && arrs[j] !== 0) {
        [arrs[i], arrs[j]] = [arrs[j], arrs[i]];
        break;
      }
    }
  }
  return arrs;
}