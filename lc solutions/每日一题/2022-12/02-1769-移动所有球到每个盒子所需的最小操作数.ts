function minOperations(boxes: string): number[] {
  // 初始情况下当前盒子及其左侧有left个球， 右侧有right个球，记把所有球转移到当前下标为i的盒子的操作数为operation
  let left = boxes[0].charCodeAt(0) - '0'.charCodeAt(0), right = 0, operation = 0;
  const len = boxes.length;
  // 模拟获取初始的operation， left， right
  for(let i = 1; i < len; i++) {
    if(boxes[i] === '1') {
      right++;
      operation += i;
    }
  }

  const res = new Array(len).fill(0)
  res[0] = operation;
  for(let i = 0; i < len; i++) {
    // 原来左侧的left个球需要多操作一次，右侧的right个球需要少操作一次
    operation += left - right;
    // 更新left和right
    if(boxes[i] === '1') {
      left++;
      right--;
    }
    res[i] = operation;
  }

  return res;
}
