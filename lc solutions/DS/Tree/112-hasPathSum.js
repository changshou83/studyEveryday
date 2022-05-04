const hasPathSum_recursion_1 = function (root, targetSum) {
  if (root == null) return false;
  const dfs = (root, path) => {
    path += root.val;
    if (!root.left && !root.right && path == targetSum) {
      result = true;
      return;
    }

    root.left && dfs(root.left, path);
    root.right && dfs(root.right, path);
  };
  let result = false;
  let path = 0;
  dfs(root, path);
  return result;
};

const hasPathSum_recursion_2 = function (root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right && targetSum === root.val) return true;
  return (
    hasPathSum_recursion_2(root.left, targetSum - root.val) ||
    hasPathSum_recursion_2(root.right, targetSum - root.val)
  );
};
