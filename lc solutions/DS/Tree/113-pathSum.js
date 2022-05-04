// 从 257-二叉树的所有路径 改动而来
const pathSum = function (root, targetSum) {
  if (root == null) return [];

  const dfs = (root, path, result) => {
    path.push(root.val);
    if (
      !root.left &&
      !root.right &&
      path.reduce((sum, v) => sum + v) == targetSum
    ) {
      result.push([...path]);
      return;
    }

    if (root.left) {
      dfs(root.left, path, result);
      path.pop(); // 回溯
    }
    if (root.right) {
      dfs(root.right, path, result);
      path.pop();
    }
  };

  let result = [];
  let path = [];
  dfs(root, path, result);
  return result;
};
