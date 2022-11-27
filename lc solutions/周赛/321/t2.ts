function appendCharacters(s: string, t: string) {
  let posT = 0;
  for (let posS = 0; posS < s.length; posS++) {
    if (s[posS] === t[posT]) posT++;
  }

  return t.length - posT;
}
