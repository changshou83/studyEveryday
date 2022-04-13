import objEqual from './objEqual.mjs';

const objArrEqual = (a, b) =>
  Array.isArray(a) &&
  Array.isArray(b) &&
  a.reduce((equal, item, i) => equal && objEqual(item, b[i]), true);

export default objArrEqual;
