/**
 * 归纳证明
 * 设不存在非局部倒置的数组为理想数组
 * 如果nums[i]=i,那么问题转换为[i+1.n-1]的问题
 * 如果nums[i]+i+1,那么只有在nums[i+1]=i的时候全局倒置数才等于局部倒置数，问题转换为[i+2，n-1]的问题
 * 归纳总结，得到理想数组的充分必要条件为|nums[i]-i|<=1
 */
function isIdealPermutation(nums) {
  for (let i = 0; i < nums.length; i++) {
    if (Math.abs(nums[i] - i) > 1) return false;
  }

  return true;
}
