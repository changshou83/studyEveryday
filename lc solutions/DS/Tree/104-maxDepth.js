// 递归
function maxDepth(root) {
  if (root == null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// 迭代
function maxDepth(root) {
  if (root == null) return 0;
  let depth = 0;
  const stack = [root];
  while (stack.length) {
    const size = stack.length;
    depth++;
    for (let i = 0; i < size; i++) {
      root = stack.pop();
      if (root.left) stack.push(root.left);
      if (root.right) stack.push(root.right);
    }
  }
  return depth;
}
