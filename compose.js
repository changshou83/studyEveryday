const compose =
  (...fns) =>
  initValue =>
    fns.reverse().reduce((result, fn) => {
      fn(result);
    }, initValue);
