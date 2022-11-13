function reachNumber(target) {
  // 不管正负都一样
  target = Math.abs(target);

  // 计算需要的步数
  let cnt = 0;
  while (target > 0) {
    cnt++;
    target -= cnt;
  }

  // 如果 target 被减到零说明可以正好到 target
  // 如果减到零以下,则需要判断还需要多少此操作可以调整到 target
  //  如果 delta 是偶数，则需要找到找到几个数的和为 delta/2 ，一定可以找到
  //  如果 delta 是奇数，则需要调整若干个数的正负(前提是 delta/2 > cnt )
  // cnt%2 是为了让后面的逻辑也满足这个偶数可以找满足结果的数
  return target % 2 === 0 ? cnt : cnt + 1 + (cnt % 2);
}
