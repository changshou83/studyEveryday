import Heapify from '../../codewars tools/tree/buildTree/Heapify.mjs';
import buildMaxHeap from '../../codewars tools/tree/buildTree/buildMaxHeap.mjs';

const heapSort = arr => {
  arr = buildMaxHeap(arr);
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]]; // 将末尾元素与队顶元素交换，使末尾元素最大
    arr = Heapify(arr, i - 1); // 调整堆
  }
  return arr;
};
