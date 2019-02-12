/**
 * 这个题目说的是，给你一个二维数组 matrix，和一个目标值 target。
 * 你要在数组里找到这个目标值，然后返回它的行/列下标。如果找不到，
 * 则返回 [-1,-1]。
 * 1, 3, 5
 * 2, 4, 6
 */

const fn = (matrix, target) => {
  if (matrix === null || matrix.length === 0 || matrix[0] === null && matrix[0].length === 0) {
    return [-1, -1];
  }
  let m = matrix.length - 1;
  let j = matrix[0].length - 1;
  let i = 0;
  while (i <= m && j >= 0) {
    if (target > matrix[i][j]) {
      i++;
    } else if (target < matrix[i][j]) {
      j--;
    } else {
      return [i, j];
    }
  }
  return [-1, -1];
}