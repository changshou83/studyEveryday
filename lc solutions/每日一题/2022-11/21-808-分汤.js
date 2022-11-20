// 动态规划
function soupServings(n) {
  n = Math.ceil(n / 25);
  if (n >= 179) return 1.0;

  const memo = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
  function dfs(a, b) {
    // 边界情况
    if (a <= 0 && b <= 0) return 0.5;
    else if (a <= 0) return 1;
    else if (b <= 0) return 0;

    // 状态转移
    if (memo[a][b] === 0) {
      memo[a][b] =
        0.25 *
        (dfs(a - 4, b) +
          dfs(a - 3, b - 1) +
          dfs(a - 2, b - 2) +
          dfs(a - 1, b - 3));
    }
    return memo[a][b];
  }

  return dfs(n, n);
}
