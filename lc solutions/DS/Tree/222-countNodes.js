const countNodes_recursion = root =>
  root == null
    ? 0
    : countNodes_recursion(root.left) + countNodes_recursion(root.right) + 1;

const countNodes_iteration = root => {
  if (root == null) return 0;
  const queue = [root];
  let nums = 0;
  while (queue.length) {
    const node = queue.shift();
    nums++;
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return nums;
};

/*
 *- 思路:一个完全二叉树有两种情况
 * 1. 满二叉树：直接使用 `2 ^ h - 1` 计算
 * 2. 最后一层叶子结点没满：分别递归左右孩子，当左或右孩子为完全二叉树时，按照情况一处理
 */
const countNodes = root => {
  if (root == null) return 0;
  let left = root.left,
    right = root.right;
  let leftH = 0,
    rightH = 0;
  while (left) {
    left = left.left;
    leftH++;
  }
  while (right) {
    right = right.right;
    rightH++;
  }
  if (leftH == rightH) {
    return (2 << leftH) - 1;
  }
  return 1 + countNodes(root.left) + countNodes(root.right);
};
