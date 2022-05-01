const zip = (left, right, fn) => {
  const result = [];
  const len = Math.min(left.length, right.length);
  for (let i = 0; i < len; i++) {
    result.push(fn(left[i], right[i]));
  }
  return result;
};
