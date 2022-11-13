function orderOfLargestPlusSign(n, mines) {
  // dp[i][j] 是以 (i, j) 为起点在方向 k 上的连续 1 的最大数目
  const dp = Array.from({ length: n }, () => new Array(n).fill(n));

  const deadPoint = new Set();
  for (const point of mines) {
    deadPoint.add(point[0] * n + point[1]);
  }

  let res = 0,
    count = 0;
  // 遍历行, i 是行， j 是列
  for (let i = 0; i < n; i++) {
    count = 0;
    // 从左开始
    for (let j = 0; j < n; j++) {
      if (deadPoint.has(i * n + j)) count = 0;
      else count++;
      dp[i][j] = Math.min(count, dp[i][j]);
    }

    count = 0;
    // 从右开始
    for (let j = n - 1; j >= 0; j--) {
      if (deadPoint.has(i * n + j)) count = 0;
      else count++;
      dp[i][j] = Math.min(count, dp[i][j]);
    }
  }
  // 遍历列, i 是列，j 是行
  for (let i = 0; i < n; i++) {
    count = 0;
    // 从上开始
    for (let j = 0; j < n; j++) {
      if (deadPoint.has(j * n + i)) count = 0;
      else count++;
      dp[j][i] = Math.min(count, dp[j][i]);
    }

    count = 0;
    // 从下开始
    for (let j = n - 1; j >= 0; j--) {
      if (deadPoint.has(j * n + i)) count = 0;
      else count++;
      dp[j][i] = Math.min(count, dp[j][i]);

      res = Math.max(res, dp[j][i]);
    }
  }

  return res;
}
