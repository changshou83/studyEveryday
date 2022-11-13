function halvesAreAlike(s) {
  const Vowels = /[aeiou]/i;
  let a = 0,
    b = 0;

  for (let i = 0, j = s.length / 2; j < s.length; i++, j++) {
    if (Vowels.test(s[i])) a++;
    if (Vowels.test(s[j])) b++;
  }

  return a === b;
}
