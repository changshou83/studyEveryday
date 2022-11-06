/********************************** 代码随想录 - 字符串 - 28.找出字符串中第一个匹配项的下标  *********************************************************/
// 考点：优化算法KMP
// KMP算法有什么用：主要应用在字符串匹配上
// 相比于暴力解法，KMP的时间复杂度从O(m*n)减少到O(m+n)
// 方法：通过匹配原字符串中的已匹配失败的字符串的后缀与目标字符串的前缀来跳过一些不合适的匹配起点
// 核心：
//   前缀表
//     作用：用来回退，记录了模式串与主串(文本串)不匹配的时候，模式串应该从哪里开始重新匹配
//     含义：记录下标i之前（包括i）的字符串中，有多大长度的相同前缀后缀
//     特性：已匹配合格的子字符串的下标=前缀表里的值
//       为什么？因为当出现不匹配的字符时，两个字符串中已被匹配的部分肯定相等，这样的话haystack中的后缀肯定与已匹配的needle中的前缀相等，所以就可以利用跳过已经被匹配的位置
//     怎么求？

function getNext(str) {
  const next = [0]; // 第一个位置的前缀肯定为0
  for (let i = 1, j = 0; i < str.length; i++) {
    // i用来记录后缀末尾(后缀从1开始)
    // j用来记录前缀的末尾，同时也是最长相等前后缀的长度

    // 前后缀不相同：给j上累加上一个最长相等前后缀的长度，用于更新next数组
    while (j > 0 && str[i] !== str[j]) j = next[j - 1];
    // 前后缀相同：前缀末尾值+1
    if (str[i] === str[j]) j++;
    // 更新next数组
    next[i] = j;
  }
  return next;
}

function strStr(haystack, needle) {
  const n = haystack.length,
    m = needle.length;

  if (m == 0) return 0;

  const next = getNext(needle); // 保存模式字符串的前缀表

  for (let i = 0, j = 0; i < n; i++) {
    // i就是用来遍历字符串的,j是needle的前缀末尾
    while (j > 0 && haystack[i] != needle[j]) j = next[j - 1];
    if (haystack[i] == needle[j]) j++;
    if (j === m) return i - m + 1;
  }

  return -1;
}

console.log(strStr("bacbababadababacambabacaddababacasdsd", "ababaca") == 10);
