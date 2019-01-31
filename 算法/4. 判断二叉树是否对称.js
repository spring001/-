/**
 * 给你一个二叉树，你要判断它是否沿中轴线对称。
 */
const createNode = (val, left, right) => {
  return {
    val,
    left,
    right,
  }
}

const isEqual = (l, r) => {
  if (l !== null && r !== null) {
    return l.val === r.val && isEqual(l.left, t.right) && isEqual(l.right, t.left);
  }
  return l === null && r === null;
}

const fun = (root) => {
  if (root === null || !root) return true;

  return isEqual(root.left, root.right);
}