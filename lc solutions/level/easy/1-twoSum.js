const twoSum = (nums, target) => {
  const store = new Map();
  for (let i = 0, len = nums.length; i < len; i += 1) {
    if (store.has(target - nums[i])) {
      return [store.get(target - nums[i]), i];
    } else {
      store.set(nums[i], i);
    }
  }
};
// 找出所有可能的版本
const twoSumAll_Map = (nums, target) => {
  const store = new Map();
  const result = [];
  for (let i = 0, len = nums.length; i < len; i += 1) {
    if (store.has(target - nums[i])) {
      result.push([nums[store.get(target - nums[i])], nums[i]]); // 返回值
      // result.push([store.get(target - nums[i]), i]);// 返回索引
      store.delete(target - nums[i]);
    } else {
      store.set(nums[i], i);
    }
  }
  return result;
};
const twoSumAll_Pointer = (nums, target) => {
  const result = [];
  let L = 0;
  let R = nums.length - 1;
  nums = nums.sort((a, b) => a - b);
  while (L < R) {
    if (nums[L] > target) break;
    if (L > 0 && nums[L] == nums[L - 1]) {
      L++;
      continue;
    }
    const sum = nums[L] + nums[R];
    if (sum == target) {
      result.push([nums[L], nums[R]]); // 返回值
      // result.push([L, R]); // 返回索引
      while (L < R && nums[L] == nums[L + 1]) L++;
      while (L < R && nums[R] == nums[R - 1]) R--;
      L++;
      R--;
    } else if (sum < target) L++;
    else if (sum > target) R--;
  }
  return result;
};
