const traversal = (root, path, result) => {
  path += root.val.toString();
  // 到达叶子结点
  if (root.left == null && root.right == null) {
    result.push(path);
    return;
  }

  // 接着遍历左右节点
  if (root.left) traversal(root.left, path + '->', result);
  if (root.right) traversal(root.right, path + '->', result);
};
const binaryTreePaths_recursion = root => {
  if (root == null) return [];
  const result = [];
  let path = '';
  traversal(root, path, result);
  return result;
};

const binaryTreePaths_iteration = root => {
  if (root == null) return [];
  const result = [];
  const stack = [root];
  const pathStack = [root.val.toString()];
  while (stack.length) {
    const curr = stack.pop();
    const path = pathStack.pop();
    if (curr.left == null && curr.right == null) {
      result.push(path);
    }

    if (curr.left) {
      stack.push(curr.left);
      pathStack.push(path + '->' + curr.left.val);
    }
    if (curr.right) {
      stack.push(curr.right);
      pathStack.push(path + '->' + curr.right.val);
    }
  }

  return result;
};
