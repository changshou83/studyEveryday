const pipe =
  (...fns) =>
  initValue =>
    fns.reduce((result, fn) => fn(result), initValue);
