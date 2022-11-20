function closetNodes(root, qs) {
  const res = [];
  const a = [];
  function dfs(root) {
    if (!root) return null;

    root.left && dfs(root.left);
    a.push(root.val);
    root.right && dfs(root.right);
  }
  dfs(root);

  for (const q of qs) {
    let mini = -1,
      maxi = -1;
    let l = (r = 0);

    while (r < a.length) {
      if (q <= a[r]) {
        maxi = a[r];
        break;
      }
      r++;
    }
    l = r;
    while (l >= 0) {
      if (q >= a[l]) {
        mini = a[l];
      }
      l--;
    }

    res.push([mini, maxi]);
  }

  return res;
}
