/**
 * @param {string} s
 * @return {boolean}
 */
const isPalindrome = s => {
  if (!s) return false;
  s = s.replace(/[^a-zA-Z0-9]/g, '').toLocaleLowerCase();
  const l = s.length;
  for (let i = 0; i < Math.ceil(l / 2); i++) {
    if (s[i] != s[l - i - 1]) return false;
  }
  return true;
};
