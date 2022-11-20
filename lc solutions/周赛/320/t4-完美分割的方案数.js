// https://leetcode.cn/problems/number-of-beautiful-partitions/solution/dong-tai-gui-hua-jian-ji-xie-fa-xun-huan-xyw3/
function beautifulPartitions(s, k, minLength) {
  const MOD = 1e9 + 7;
  const isPrime = (c) => "2357".includes(c);
  const canPartition = (j) =>
    j == 0 || j == n || (!isPrime(s[j - 1]) && isPrime(s[j]));

  const len = s.length;
  if (k * minLength > len || !isPrime(s[0]) || isPrime(s[len - 1])) return 0; // 剪枝
  // f[i][j]表示把s的前j个字符分割成i段的方案数
  const f = Array.from({ length: k + 1 }, () => []);
  f[0][0] = 1; // 空串也算一种方案
  for (let i = 1; i <= k; i++) {
    let sum = 0;
    // 累加所有可以分割的 f[i-1][j'] ，记作 sum
    // 优化：枚举的起点和终点为前后的子串预留出足够的长度
    for (let j = i * minLength; j + (k - i) * minLength <= n; j++) {
      if (canPartition(j - 1)) sum = (sum + f[i - 1][j - minLength]) % MOD;
      if (canPartition(j)) f[i][j] = sum;
    }
  }
  return f[k][len];
}
