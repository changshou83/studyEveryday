Array.prototype.map = function (fn) {
  const results = [];
  this.forEach(el => results.push(fn(el)));

  return results;
};
