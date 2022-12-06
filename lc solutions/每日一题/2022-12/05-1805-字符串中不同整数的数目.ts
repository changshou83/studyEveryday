function numDifferentIntegers(word: string): number {
  const set = new Set(), len = word.length;
  let p1 = 0, p2;
  while(true) {
    while(p1 < len && !isDigit(word[p1])) p1++;
    if(p1 === len) break;
    p2 = p1;

    while(p2 < len && isDigit(word[p2])) p2++;
    while(p2 - p1 > 1 && word[p1] === '0') p1++;
    set.add(word.slice(p1,p2))
    p1 = p2;
  }
  return set.size;
}
function isDigit(c: string) {
  return '0' <= c && c <= '9'
}
