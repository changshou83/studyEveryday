const curry = fn => {
  return function curriedFn(...args) {
    if (args.length < fn.length) {
      return function (...nextArgs) {
        return curriedFn.apply(null, [...args, ...nextArgs]);
      };
    }
    return fn.apply(null, fullArgs);
  };
};
