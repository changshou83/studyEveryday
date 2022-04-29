// 递归
function minDepth(root) {
  if (root == null) return 0;
  // 注意是叶子结点
  if (root.left == null && root.right != null) return 1 + minDepth(root.right);
  if (root.left != null && root.right == null) return 1 + minDepth(root.left);
  return 1 + Math.min(minDepth(root.left), minDepth(root.right));
}

// 迭代
function minDepth(root) {
  if (root == null) return 0;
  const queue = [root];
  let depth = 0;
  while (queue.length) {
    const size = queue.length;
    depth++;
    for (let i = 0; i < size; i++) {
      root = queue.shift();
      if (root.left) queue.push(root.left);
      if (root.right) queue.push(root.right);
      // 找到最小深度的叶节点
      if (root.left == null && root.right == null) return depth;
    }
  }
  return depth;
}
