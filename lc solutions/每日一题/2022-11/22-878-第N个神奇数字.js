// 二分
function nthMagicalNumber(n, a, b) {
  const MOD = 1e9 + 7;
  let l = Math.min(a, b),
    r = n * l;
  const c = lcm(a, b);
  while (l <= r) {
    const mid = l + (r >> 1);
    // 小于等于x的数中能被a整除的加上能被b整除的减去他们的交集
    const cnt = Math.floor(mid / a) + Math.floor(mid / b) - Math.floor(mid / c);
    if (cnt >= n) r = mid - 1;
    else l = mid + 1;
  }
  return (r + 1) % MOD;
}

const lcm = (a, b) => Math.floor((a * b) / gcd(a, b));
const gcd = (a, b) => (b !== 0 ? gcd(b, a % b) : a);
