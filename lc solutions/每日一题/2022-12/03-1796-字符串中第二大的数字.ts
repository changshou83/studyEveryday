function secondHighest(s: string): number {
  let res = -1;
  let maxValue = -1;
  for(const c of s) {
    if('0' <= c && c <= '9') {
      const n = c.charCodeAt(0) - '0'.charCodeAt(0)
      if(n < maxValue) {
        res = maxValue;
        maxValue = n;
      } else if(res < n && n < maxValue) res = n;
    }
  }
  return res;
}
