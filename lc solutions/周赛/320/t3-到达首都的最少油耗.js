function minimumFuelCost(roads, seats) {
  // 考虑每条边上至少需要多少辆车
  // 以 0 为根，设子树 x 的大小为 size， 那么它到它父结点这条边就至少需要 [seats/size] 辆车
  // 累加除了 x = 0 以外的值

  let res = 0;
  // 记录每个点有多少条边
  const g = Array.from({ length: roads.length + 1 }, () => []);
  for (const e of roads) {
    const [f, s] = e;
    g[f].push(s);
    g[s].push(f);
  }
  // 从根节点开始遍历整张图
  function dfs(x, father) {
    let size = 1;
    for (const son of g[x]) {
      if (son != father) size += dfs(son, x);
    }
    if (x != 0) res += Math.floor((size + seats - 1) / seats);
    return size;
  }
  dfs(0, -1);
  return res;
}
