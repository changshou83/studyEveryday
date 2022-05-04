var findBottomLeftValue_preOrder = function (root) {
  let maxPath = 0,
    resNode = null;
  const dfs = function (node, curPath) {
    if (node.left === null && node.right === null) {
      // 叶子结点
      if (curPath > maxPath) {
        // 最底层
        maxPath = curPath;
        resNode = node.val;
      }
    }
    node.left && dfs(node.left, curPath + 1); // 回溯
    node.right && dfs(node.right, curPath + 1);
  };
  dfs(root, 1);
  return resNode;
};

var findBottomLeftValue_bfs = function (root) {
  const queue = [root];
  let result = 0;
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (i == 0) result = node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return result;
};
