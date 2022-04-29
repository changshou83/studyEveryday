// N 叉树的最大深度
// 递归
function maxDepth(root) {
  if (root == null) return 0;
  let depth = 0;
  for (let child of root.children) {
    if (child) depth = Math.max(depth, maxDepth(child));
  }
  return 1 + depth;
}

// 迭代
function maxDepth(root) {
  if (root == null) return 0;
  let depth = 0;
  const stack = [];
  while (stack.length) {
    const size = stack.length;
    depth++;
    for (let i = 0; i < size; i++) {
      root = stack.pop();
      for (let child of root.children) {
        if (child) stack.push(child);
      }
    }
  }
}
