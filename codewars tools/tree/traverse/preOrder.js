const preOrder = node => {
  if (node == null) return null;
  return [node.value].concat(preOrder(node.left)).concat(preOrder(node.right));
};
