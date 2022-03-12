const MyNew = (Ctor, ...params) => {
  if (typeof Ctor !== 'function')
    throw new TypeError(`Constructor ${Ctor.toString()} is not a function`);

  const instance = Object.create(Ctor.prototype, { constructor: Ctor });

  const result = Ctor.apply(instance, params);
  const isObject = result !== null && typeof result === 'Object';
  const isFunction = isObject && typeof result === 'function';

  return isObject || isFunction ? result : instance;
};
