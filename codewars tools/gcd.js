// Great Common Divider 最大公约数
// 计算两个数
function gcd(x, y) {
  if (x == 0 || y == 0) return Math.max(x, y);

  let [max, min] = [Math.max(x, y), Math.min(x, y)];
  while (max % min) [max, min] = [min, max % min];

  return min;
}

// 计算多个数
// https://www.30secondsofcode.org/js/s/gcd
const gcd = (...arr) => {
  const _gcd = (x, y) => (!y ? x : gcd(y, x % y));
  return [...arr].reduce((a, b) => _gcd(a, b));
};
