const inOrder = node => {
  if (node == null) return null;
  return inOrder(node.left).concat(node.value).concat(inOrder(node.right));
};

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
