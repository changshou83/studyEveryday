Array.prototype.concatAll = function () {
  return this.reduce((acc, subArray) => acc.concat(subArray));
};
