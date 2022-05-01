Array.prototype.reduce = function (fn, initialValue) {
  if (this.length === 0) return this;

  let accumulatedValue = initialValue,
    count = 0;
  if (arguments.length === 1) {
    count = 1;
    accumulatedValue = this[0];
  } else if (arguments.length < 1) {
    throw 'Invalid arguments';
  }

  while (count < this.length) {
    accumulatedValue = fn(accumulatedValue, this[count], count);
    count++;
  }

  return accumulatedValue;
};
