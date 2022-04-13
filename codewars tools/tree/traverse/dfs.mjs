function DFS(root) {
  if (root == null) return null;

  const result = [];
  const stack = [root];
  while (stack.length !== 0) {
    const node = stack.pop();
    result.push(node.value);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return result;
}

function DFSWithEffect(root, fn = () => {}, pre = undefined) {
  if (root == null) return null;

  const result = [];
  const stack = [root];
  while (stack.length !== 0) {
    const node = stack.pop();
    result.push(node.value);
    pre = fn(pre, node);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return pre !== undefined ? pre : result;
}

export { DFS, DFSWithEffect };
