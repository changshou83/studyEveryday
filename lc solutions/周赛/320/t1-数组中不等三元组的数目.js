function unequalTriplets(a) {
  let cnt = 0;
  for (let i = 0; i < a.length; i++) {
    let v = a[i];
    for (let j = i + 1; j < a.length; j++) {
      let w = a[j];
      if (v == w) continue;
      for (let k = j + 1; k < a.length; k++) {
        if (a[k] !== v && a[k] !== w) ant++;
      }
    }
  }
  return cnt;
}
