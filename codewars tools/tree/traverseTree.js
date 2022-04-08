// 纯遍历 递归
const preOrder = node => {
  if (node == null) return null;
  return [node.value].concat(preOrder(node.left)).concat(preOrder(node.right));
};
const inOrder = node => {
  if (node == null) return null;
  return inOrder(node.left).concat(node.value).concat(inOrder(node.right));
};
const postOrder = node => {
  if (node == null) return null;
  return postOrder(node.left).concat(postOrder(node.right)).concat(node.value);
};
// 带副作用的遍历 迭代
const inOrderWithEffect = (root, fn = () => {}, pre = undefined) => {
  const res = [];
  const stk = [];
  while (root || stk.length) {
    while (root) {
      stk.push(root);
      root = root.left;
    }
    root = stk.pop();
    res.push(root.value);
    pre = fn(pre, root);
    root = root.right;
  }
  return pre !== undefined ? pre : res;
};
