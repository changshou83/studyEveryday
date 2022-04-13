import _isPlaceholder from './isPlaceholder.mjs';

export default function _curry1(fn) {
  return function curryFn(a) {
    return arguments.length === 0 || _isPlaceholder(a)
      ? curryFn
      : fn.apply(this, arguments);
  };
}
