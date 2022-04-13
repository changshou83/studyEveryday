import _isPlaceholder from './isPlaceholder.mjs';
import _curry1 from './curry1.mjs';

export default function _curry2(fn) {
  return function curryFn(a, b) {
    switch (arguments.length) {
      case 0:
        return curryFn;
      case 1:
        return _isPlaceholder(a)
          ? curryFn
          : _curry1(function (_b) {
              return fn(a, _b);
            });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b)
          ? curryFn
          : _isPlaceholder(a)
          ? _curry1(function (_a) {
              return fn(_a, b);
            })
          : _isPlaceholder(b)
          ? _curry1(function (_b) {
              return fn(a, _b);
            })
          : fn(a, b);
    }
  };
}
