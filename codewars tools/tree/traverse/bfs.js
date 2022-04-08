function BFS(root) {
  if (root == null) return null;
  const result = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    result.push(node.value);
    if (node.left !== null) queue.push(node.left);
    if (node.right !== null) queue.push(node.right);
  }
  return result;
}

function BFSWithEffect(root, fn = () => {}, pre = undefined) {
  if (root == null) return null;
  const result = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    result.push(node.value);
    pre = fn(pre, node);
    if (node.left !== null) queue.push(node.left);
    if (node.right !== null) queue.push(node.right);
  }
  return pre !== undefined ? pre : result;
}
