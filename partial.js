const partial = (fn, partialArgs) => {
  const fullArgs = partialArgs;

  return function (...restArgs) {
    if (restArgs.length + fullArgs.length > fn.length)
      throw new Error('参数列表过长');

    let argIndex = 0;
    fullArgs.forEach((arg, index) => {
      if (arg === undefined) {
        fullArgs[index] = restArgs[argIndex];
        argIndex += 1;
      }
    });

    return fn.apply(null, fullArgs);
  };
};
