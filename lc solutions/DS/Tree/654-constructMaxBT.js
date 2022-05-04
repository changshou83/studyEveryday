var constructMaximumBinaryTree = function (nums) {
  if (!nums.length) return null;

  const rootVal = nums.reduce((max, v) => (v > max ? v : max));
  const rootIndex = nums.indexOf(rootVal);

  const root = new TreeNode(rootVal);
  root.left = constructMaximumBinaryTree(nums.slice(0, rootIndex));
  root.right = constructMaximumBinaryTree(nums.slice(rootIndex + 1));

  return root;
};
