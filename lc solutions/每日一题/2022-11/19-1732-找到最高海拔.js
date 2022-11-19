function largestAltitude(gain) {
  let r = 0;
  for (let i = 0, h = 0; i < gain.length; i++) {
    h += gain[i];
    r = Math.max(r, h);
  }
  return r;
}
