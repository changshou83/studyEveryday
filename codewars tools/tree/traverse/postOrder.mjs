const postOrder = node => {
  if (node == null) return null;
  return postOrder(node.left).concat(postOrder(node.right)).concat(node.value);
};
