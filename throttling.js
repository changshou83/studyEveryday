const throttling = (fn, wait) => {
  let canRun = true;
  return function (...args) {
    const ctx = this;
    const fullArgs = args;

    if (!canRun) return;
    canRun = false;

    setTimeout(() => {
      fn.apply(ctx, fullArgs);
      canRun = true;
    }, wait);
  };
};
