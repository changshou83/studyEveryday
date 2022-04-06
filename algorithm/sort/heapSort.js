const heapSort = arr => {
  arr = buildMaxHeap(arr);
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]]; // 将末尾元素与队顶元素交换，使末尾元素最大
    arr = HeapAdjust(arr, i - 1); // 调整堆
  }
  return arr;
};
const buildMaxHeap = arr => arr.reduce((arr, _, i) => HeapAdjust(arr, i), arr);
const HeapAdjust = (arr, i) => {
  let childNode = i;
  let rootNode;
  for (
    let isRight = childNode % 2 === 0;
    childNode > 0;
    childNode = rootNode, isRight = childNode % 2 === 0
  ) {
    // 向上寻找根节点
    rootNode = isRight
      ? Math.floor(childNode / 2) - 1
      : Math.floor(childNode / 2);
    // 找两个子节点中的最大值
    if (isRight) {
      if (arr[childNode] < arr[childNode - 1]) childNode--;
    } else if (childNode + 1 < i) {
      if (arr[childNode] < arr[childNode + 1]) childNode++;
    }
    // 若满足条件则调换根节点
    if (arr[rootNode] < arr[childNode])
      [arr[childNode], arr[rootNode]] = [arr[rootNode], arr[childNode]];
  }

  return arr;
};

console.log(buildMaxHeap([8, 5, 10, 12, 7, 6, 15]));
console.log(heapSort([8, 5, 10, 12, 7, 6, 15]));
