/**
 * least recently used,一种页面替换算法，可用来实现lru缓存
 * @param n - 内存中的页数
 * @param referencesList - 表示页面引用的整数数组
 * @returns 内存阵列。
 */
const lru = (n, referencesList) => {
  const memory = [];
  const ru = [];

  for (const id of referencesList) {
    if (memory.includes(id)) {
      //       already in memory, update recently used
      ru.push(...ru.splice(ru.indexOf(id), 1));
    } else if (memory.length < n) {
      //       free memory available
      memory.push(id);
      ru.push(id);
    } else {
      //       memory if full
      ru.push(id);
      memory[memory.indexOf(ru.shift())] = id;
    }
  }

  while (memory.length < n) memory.push(-1);

  return memory;
};
