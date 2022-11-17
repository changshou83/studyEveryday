// 纯纯数学题
function sumSubSeqWidths(nums) {
  const MOD = 1e9 + 7;
  const len = nums.length;

  // 根据子序列的定义，顺序不影响结果
  nums.sort((a, b) => a - b);

  let k = 1,
    ans = 0; // (2^k)*(第i小的值-第i大的值)
  for (let i = 0; i < length; i++) {
    // 对于每一个元素，要知道you几个子序列以它为最小值，又有几个子序列以它为最大值
    // 如果某个数是数组中第k小的元素，那么以它为最小值的子元素就有2^(n-k)个，同理，以它为最大值的子序列就有2^k个
    ans = (ans + (nums[i] - nums[len - 1 - i]) * k) % MOD;
    k = (2 * k) % MOD;
  }
  return ans;
}
