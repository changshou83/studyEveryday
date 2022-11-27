const sum = (start: number, end: number) => {
  let sum = 0;
  while (start <= end) {
    sum += start;
    start++;
  }
  return sum;
}
function pivotInteger(n: number) {
  let left = 1, right = n + 1;
  while (left < right) {
    const x = left + ((right - left) >> 1);
    const leftSum = sum(1, x), rightSum = sum(x, n);
    
    if (leftSum > rightSum) right = x;
    else if (leftSum < rightSum) left = x + 1;
    else return x;
  }

  return -1;
}
