var minDistance = function (word1, word2) {
  word1 = ' ' + word1;
  word2 = ' ' + word2;
  const m = word1.length;
  const n = word2.length;
  // dp[i][j]表示word的前i个字符到word2的前j个字符的最小编辑距离
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(m + n - 2));

  dp[0][0] = 0;
  {
    // 因为第一个是空格，所以对应位置与空格的编辑距离为i/j个字符的长度
    let i = 0;
    while (++i < m) {
      dp[i][0] = i;
    }
    i = 0;
    while (++i < n) {
      dp[0][i] = i;
    }
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (word1[i] === word2[j]) {
        dp[i][j] = dp[i - 1][j - 1]; // 相同说明此字符可以被跳过
      } else {
        // 不同则需要在前面的最小距离上+1
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]) + 1;
      }
    }
  }

  return dp[m - 1][n - 1];
};
