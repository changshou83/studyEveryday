// 动态规划，记录sequence每个位置上的子串重复值
function maxRepeating(sequence, word) {
  const n = sequence.length,
    m = word.length;
  if (n < m) return 0;

  const sizes = new Array(n).fill(0);
  for (let i = m - 1; i < n; i++) {
    let valid = true;
    // i-m是上一个单词的末尾
    for (let j = 0; j < m; j++) {
      if (sequence[i - m + 1 + j] !== word[j]) {
        valid = false;
        break;
      }
    }
    if (valid) sizes[i] = (i === m - 1 ? 0 : sizes[i - m]) + 1;
  }

  return Math.max(...sizes);
}
