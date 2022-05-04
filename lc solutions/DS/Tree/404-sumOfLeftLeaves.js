var sumOfLeftLeaves_recursion = function (root) {
  if (root == null) return 0;
  let result = 0;
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    if (node.left) {
      if (node.left.left == null && node.left.right == null) {
        result += node.left.val;
      } else {
        stack.push(node.left);
      }
    }
    if (node.right) {
      stack.push(node.right);
    }
  }
  return result;
};

var sumOfLeftLeaves_iteration = function (root) {
  if (root == null) return 0;
  const leftVal = sumOfLeftLeaves(root.left),
    rightVal = sumOfLeftLeaves(root.right);
  let midVal = 0;
  if (root.left && !root.left.left && !root.left.right) {
    midVal += root.left.val;
  }
  return leftVal + midVal + rightVal;
};
