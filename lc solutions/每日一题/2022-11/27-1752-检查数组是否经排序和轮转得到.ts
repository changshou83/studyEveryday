function check(nums: number[]): boolean {
  if(nums.length <= 1) return true;

  let x = 0;
  for(let i = 0; i < nums.length; i++) {
    if(i > 0 && nums[i] < nums[i-1]) x++;
  }

  if(x === 0) return true;
  else if(x >= 2) return false;
  else return nums[nums.length - 1] <= nums[0];
}
