function numMatchingSubseq(s, words) {
  let n = s.length,
    ans = 0;
  // 收集s中字符的位置信息
  const map = new Map();
  for (let i = 0; i < n; i++) {
    if (!map.has(s[i])) map.set(s[i], []);
    map.get(s[i]).push(i);
  }
  // 遍历每一个单词
  for (const w of words) {
    const m = w.length;
    let ok = true,
      idx = -1;
    for (let i = 0; i < m && ok; i++) {
      const c = w[i];

      if (!map.has(c)) {
        ok = false;
      } else {
        const list = map.get(c); // 获取c在s中的位置信息
        let l = 0,
          r = list.length - 1;
        // 使用二分查找优化字母位置的查找过程
        while (l < r) {
          const mid = (l + r) >> 1;
          if (list[mid] > idx) r = mid;
          else l = mid + 1;
        }
        if (r < 0 || list[r] <= idx)
          ok = false; // 没找到或者找到的字符不符合顺序要求
        else idx = list[r]; // 保存上一个字符的位置以确保word符合在s中顺序要求
      }
    }
    if (ok) ans++;
  }
  return ans;
}
