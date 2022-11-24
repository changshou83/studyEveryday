// 将数组中的数分为三类，0：小于left，1：大于等于left，小于等于right，2：大于right
// 双指针：计算出1，2的数量减去2
function numsSubarrayBoundedMax(nums, l, r) {
  let res = 0,
    last1 = 0,
    last2 = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= left && nums[i] <= right) {
      last1 = i;
    } else if (nums[i] > right) {
      last2 = i;
      last1 = -1;
    }

    if (last1 !== -1) {
      res += last1 - last2;
    }
  }
  return res;
}

// 计数：计算出0，1的数量减去0
function numsSubarrayBoundedMax(nums, l, r) {
  return count(nums, right) - count(nums, left - 1);
}

// 返回最大值小于等于lower的子数组数目
function count(nums, lower) {
  let res = 0,
    cur = 0;
  for (const x of nums) {
    cur = x < lower ? cur + 1 : 0;
    res += cur;
  }
  return res;
}
