function champagneTower(poured, query_row, query_glass) {
  // f[i][j] 为第i行第j列杯子所经过的水的流量
  const f = Array.from({ length: query_row + 10 }, () =>
    new Array(query_row + 10).fill(0)
  );
  f[0][0] = poured;

  for (let i = 0; i <= query_row; i++) {
    for (let j = 0; j <= i; j++) {
      if (f[j][j] <= 1) continue; // 杯子没被灌满
      // 杯子溢出到下一层
      f[i + 1][j] = (f[i][j] - 1) / 2;
      f[i + 1][j + 1] = (f[i][j] - 1) / 2;
    }
  }

  return Math.min(f[query_row][query_glass], 1);
}
