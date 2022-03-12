const debounce = (fn, delay) => {
  let timer;

  return function (...args) {
    const ctx = this;
    const fullArgs = args;

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(ctx, fullArgs);
    }, delay);
  };
};
