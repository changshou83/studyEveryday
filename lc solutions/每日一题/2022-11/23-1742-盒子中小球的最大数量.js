function countBalls(l, h) {
  let res = 0;
  const list = new Array(50).fill(0);
  for (let i = l; i <= h; i++) {
    let j = i,
      cur = 0;
    while (j != 0) {
      cur += j % 10;
      j = Math.floor(j / 10);
    }

    list[cur]++;
    res = Math.max(list[cur], res);
  }
  return res;
}
