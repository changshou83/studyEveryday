function expressiveWords(s, words) {
  return words.reduce((word) => (isExpressive(s, word) ? cnt + 1 : cnt), 0);
}

function isExpressive(s, word) {
  let curw = (curs = 0);
  while (curs < s.length && curw < word.length) {
    if (s[curs] !== word[curw]) return false;

    const ch = s[curs];
    let cnts = (cntw = 0);
    while (curs < s.length && s[curs] === ch) {
      cnts++;
      curs++;
    }
    while (curw < word.length && word[curw] === ch) {
      cntw++;
      curw++;
    }
    if (cnts < cntw) return false;
    if (cnts < 3 && cntw !== cnts) return false;
  }
  return curw === word.length && curs === s.length;
}
