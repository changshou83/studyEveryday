import Heapify from './Heapify.mjs';
const buildMaxHeap = arr => arr.reduce((arr, _, i) => Heapify(arr, i), arr);

export default buildMaxHeap;
