Array.prototype.concatMap = function (fnThatReturnsArray) {
  return this.map(el => fnThatReturnsArray(el)).concatAll();
};
