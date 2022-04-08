function getDepth(root) {
  if (root === null) return 0;
  return Math.max(getDepth(root.left), getDepth(root.left)) + 1;
}
