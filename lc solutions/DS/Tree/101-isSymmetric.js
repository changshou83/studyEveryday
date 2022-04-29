// 对称二叉树
// 递归版本
var isSymmetric = function (root) {
  const compare = (left, right) => {
    // 终止条件
    if (left == null && right == null) return true;
    else if (!left || !right || left.val != right.val) return false;
    // 单层循环的逻辑
    const outside = compare(left.left, right.right);
    const inside = compare(left.right, right.left);
    return outside && inside;
  };
  return compare(root.left, root.right);
};

// 递归版本
var isSymmetric = function (root) {
  if (root == null) return true;
  const stack = [root.right, root.left];
  while (stack.length) {
    const left = stack.pop();
    const right = stack.pop();

    if (!left && !right) continue;
    else if (!left || !right || left.val != right.val) return false;

    // 装外侧结点
    stack.push(right.right);
    stack.push(left.left);
    // 装内侧结点
    stack.push(right.left);
    stack.push(left.right);
  }
  return true;
};
