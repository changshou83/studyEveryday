const Heapify = (arr, i) => {
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

export default Heapify;
