function largestSumOfAverages(nums: number[], k: number) {
  const len = nums.length;
  const prefix = new Array(len+1).fill(0)
  for(let i = 0; i < len; i++) {
    prefix[i+1] = prefix[i]+nums[i];
  }

  const dp = new Array(len+1).fill(0);
  for(let i = 1; i <= len; i++) {
    dp[i] = prefix[i] / i; // dp[i]为[0,i-1]的平均值
  }

  for(let j = 2; j <= k; j++) {// j表示分组的数量
    for(let i = len; i >= j; i--) {// i表示切分的分组区间右边界
      for(let x = j - 1; x < i; x++) {// x表示切分的分组区间左边界
        dp[i] = Math.max(dp[i], dp[x] + (prefix[i]-prefix[x]) / (i-x)) // 取当前位置和(区间[0,x-1]和[x,i-1])(看看是否可以拆分)中的最大平均值
      }
    }
  }
  return dp[len];
}
