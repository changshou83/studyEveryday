function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);

  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return a === 0 || b === 0 ? 0 : Math.abs(a * b) / gcd(a, b);
}

function subarrayLCM(nums, k) {
  let cnt = 0;
  for (let l = 0; l < nums.length; l++) {
    let curLCM = nums[l];
    for (let r = l; r < nums.length; r++) {
      curLCM = lcm(curLCM, nums[r]);
      if (curLCM === k) cnt++;
      if (curLCM > k) break;
    }
  }
  return cnt;
}
