function arrayStringsAreEqual(word1, word2) {
  const toStr = (arr) => arr.reduce((res, str) => res + str, "");
  return toStr(word1) === toStr(word2);
}
