var permute = function (nums) {
  const track = [];
  const res = [];
  return backtrack(nums, track, res);
};

function backtrack(nums, track, res) {
  // 终止条件：遍历到决策树的底端
  if (track.length == nums.length) {
    res.push([...track]); // 注意这里不要传引用，，，要进行一个深拷贝
    return res;
  }
  for (let i = 0; i < nums.length; i++) {
    if (track.includes(nums[i])) continue;
    track.push(nums[i]); // 做选择
    res = backtrack(nums, track, res); // 进入下一层决策树
    track.pop(); // 撤销选择
  }
  return res;
}

permute([1, 2, 3]);
permute([0, 1]);
