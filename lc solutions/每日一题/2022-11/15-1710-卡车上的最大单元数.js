// 贪心
function maximumUnits(boxTypes, truckSize) {
  boxTypes.sort((a, b) => b[1] - a[1]);

  let res = 0;
  while (boxTypes.length !== 0) {
    const [nums, unitcnt] = boxTypes.shift();
    if (nums < truckSize) {
      res += nums * unitcnt;
      truckSize -= nums;
    } else {
      res += truckSize * unitcnt;
      break;
    }
  }

  return res;
}
