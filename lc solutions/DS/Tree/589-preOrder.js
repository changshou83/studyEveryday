// 递归版本
var preOrder = function (root) {
  if (root == null) return [];
  const res = [root.val];
  for (let child of root.children) {
    res.push(...preOrder(child));
  }
  return res;
};

// 迭代版本
var preOrder = function (root) {
  if (root == null) return [];
  const res = [];
  const stack = [root];
  while (stack.length) {
    root = stack.pop();
    res.push(root.val);
    for (let child of root.children.reverse()) {
      if (child) stack.push(child);
    }
  }
  return res;
};
