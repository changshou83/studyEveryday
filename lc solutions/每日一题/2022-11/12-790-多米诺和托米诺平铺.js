// 一道动态规划
function numTilings(n) {
  const mod = 1e9 + 7;
  // dp[i] 表示第i列的状态
  // dp[0] 表示没有砖被覆盖 dp[1] 表示上面的砖被覆盖 dp[2] 表示下面的砖被覆盖 dp[3] 表示全部砖被覆盖
  const dp = Array.from({ length: n + 1 }).map(() => new Array(4).fill(0));
  dp[0][3] = 1;

  // 从第 1 列开始
  for (let i = 1; i <= n; i++) {
    dp[i][0] = dp[i - 1][3]; // 相当于前一列的状态3
    dp[i][1] = (dp[i - 1][0] + dp[i - 1][2]) % mod; // 可以从前一列的状态0和状态2加新砖得来
    dp[i][2] = (dp[i - 1][0] + dp[i - 1][1]) % mod; // 可以从前一列的状态0和状态1加新砖得来
    dp[i][3] =
      (dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][2] + dp[i - 1][3]) % mod; // 可以从前一列的四种状态加新砖得来
  }

  // 最后返回第 n 列全部砖被覆盖的状态
  return dp[n][3];
}
