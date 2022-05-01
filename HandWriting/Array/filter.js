Array.prototype.filter = function (fn) {
  const results = [];
  this.forEach(el => {
    if (fn(el)) results.push(el);
  });

  return results;
};
