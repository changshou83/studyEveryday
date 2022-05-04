class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const buildTree_preOrder_inOrder = (preOrder, inOrder) => {
  if (!inOrder.length) return null;

  const rootVal = preOrder.shift();
  const rootIndex = inOrder.indexOf(rootVal);

  const root = new TreeNode(rootVal);
  root.left = buildTree_preOrder_inOrder(
    preOrder.slice(0, rootIndex),
    inOrder.slice(0, rootIndex)
  );
  root.right = buildTree_preOrder_inOrder(
    preOrder.slice(rootIndex),
    inOrder.slice(rootIndex + 1)
  );

  return root;
};
// preOrder = [3,9,20,15,7], inOrder = [9,3,15,20,7]
const buildTree_postOrder_inOrder = (inOrder, postOrder) => {
  if (!inOrder.length) return null;

  const rootVal = postOrder.pop();
  const rootIndex = inOrder.indexOf(rootVal);

  const root = new TreeNode(rootVal);
  root.left = buildTree_postOrder_inOrder(
    inOrder.slice(0, rootIndex),
    postOrder.slice(0, rootIndex)
  );
  root.right = buildTree_postOrder_inOrder(
    inOrder.slice(rootIndex + 1),
    postOrder.slice(rootIndex)
  );

  return root;
};
// inOrder=[9,3,15,20,7] postOrder=[9,15,7,20,3]
