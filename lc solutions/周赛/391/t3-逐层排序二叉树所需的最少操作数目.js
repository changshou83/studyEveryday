function fn(list, l, r) {
  if (l === r) return 0;

  let max = -Infinity;
  let maxIdx = -1;

  for (let i = l; i <= r; i++) {
    if (list[i] > max) {
      max = list[i];
      maxIdx = i;
    }
  }

  if (max == list[r]) return fn(list, l, r - 1);
  else {
    [list[maxIdx], list[r]] = [list[r], list[maxIdx]];
    return fn(list, l, r - 1);
  }
}

function minimumOperations(root) {
  if (!root) return 0;

  const queue = [root];
  let cnt = 0;

  while (queue.length) {
    const len = queue.length;
    const level = [];
    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      level.push(node.val);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    cnt += fn(level, 0, level.length - 1);
  }

  return cnt;
}
