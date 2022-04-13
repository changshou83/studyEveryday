const prop = function (obj, key) {
  if (obj == null) return;
  return obj[key];
};
const descend = function wrapper(key) {
  return function descend(a, b) {
    const aa = prop(a, key);
    const bb = prop(b, key);
    return aa > bb ? -1 : aa < bb ? 1 : 0;
  };
};
const ascend = function wrapper(key) {
  return function ascend(a, b) {
    const aa = prop(a, key);
    const bb = prop(b, key);
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  };
};
/* 
  list = [{cond1: ..., cond2: ...},{cond1: ..., cond2: ...}]
  sortWith([ascend('cond1'), descend('cond2')], list)
 */
const sortWith = function sortWith(fns, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    let result = 0;
    for (let i = 0; result === 0 && i < fns.length; i += 1) {
      result = fns[i](a, b);
    }
    return result;
  });
};

export { ascend, descend, sortWith };
