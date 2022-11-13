function countConsistentStrings(allowed, words) {
  let cnt = 0;
  const getSet = (word) => new Set(word.split(""));

  for (const word of words) {
    cnt++;
    for (const c of getSet(word).values()) {
      if (!allowed.includes(c)) {
        cnt--;
        break;
      }
    }
  }

  return cnt;
}
