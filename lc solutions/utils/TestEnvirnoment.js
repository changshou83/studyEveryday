/*%%%%%%%%%%%%%%%%%%%%%%%%%%  常驻工具函数  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  */
const l = (...args) => console.log(...args);
const logInfo = (actual, expected, msg) =>
  `\nactual: ${actual}\nexpected: ${expected}\nmessage: ${msg}\n`;
const isObject = (val) =>
  Object.prototype.toString.call(val) === "[object Object]";
const objEqual = (actual, expected, msg = "") =>
  JSON.stringify(actual) === JSON.stringify(expected)
    ? true
    : l(logInfo(JSON.stringify(actual), JSON.stringify(expected), msg));
const arrEqual = (actual, expected, msg = "") => {
  if (!(Array.isArray(actual) && Array.isArray(expected))) {
    return new Error("actual or expected is not an array");
  }
  const isEqual = expected.reduce((equal, item, i) => {
    const _isObject = typeof item === "object" && item !== null;
    return (
      equal && (_isObject ? objEqual(item, actual[i]) : item === actual[i])
    );
  }, true);
  if (isEqual) {
    return true;
  }
  l(logInfo(actual, expected, msg));
};
const Test = {
  arrEqual,
  objEqual,
  primitive: {
    equal: (actual, expected, msg = "default msg") =>
      actual == expected ? true : console.log(logInfo(actual, expected, msg)),
    strictEqual: (actual, expected, msg = "default msg") =>
      actual === expected ? true : console.log(logInfo(actual, expected, msg)),
  },
};
/*%%%%%%%%%%%%%%%%%%%%%%%%%%  数据结构生成函数  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  */
// 根据前序遍历结果生成二叉树
const arrToTree = (list, rootIndex = 0) => {
  const T = (v, l, r) => (v == null ? null : new Node(v, l, r));
  if (rootIndex >= list.length) return undefined;
  return T(
    list[rootIndex],
    arrToTree(list, rootIndex * 2 + 1),
    arrToTree(list, rootIndex * 2 + 2)
  );
};
// 生成链表
function createLL(arr) {
  let curr = null;
  let head = null;
  arr.forEach((node, i) => {
    if (node == null) return;
    if (i == 0) {
      curr = new LLNode(node);
      head = curr;
      return;
    }
    curr.next = new LLNode(node);
    curr = curr.next;
  });
  return head;
}
/*%%%%%%%%%%%%%%%%%%%%%%%%%%  常驻数据结构  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  */
// 二叉树结点
class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}
// 链表结点
class LLNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}
/*%%%%%%%%%%%%%%%%%%%%%%%%%%  排序算法  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  */
function bubble_sort(list) {
  let swap = false;
  while (!swap) {
    swap = true;
    for (let i = 1; i < list.length; i++) {
      if (list[i - 1] > list[i]) {
        swap = false;
        const temp = list[i - 1];
        list[i - 1] = list[i];
        list[i] = temp;
      }
    }
  }
  return list;
}

function selection_sort(list) {
  let suffixStack = 0;
  while (suffixStack != list.length) {
    for (let i = suffixStack; i < list.length; i++) {
      if (list[i] < list[suffixStack]) {
        const temp = list[i];
        list[i] = list[suffixStack];
        list[suffixStack] = temp;
      }
    }
    suffixStack += 1;
  }
  return list;
}

function merge_sort(list) {
  if (list.length < 2) return list;

  const merge = (left, right) => {
    const result = [];
    let i = 0,
      j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i]);
        i += 1;
      } else {
        result.push(right[j]);
        j += 1;
      }
    }
    while (i < left.length) {
      result.push(left[i]);
      i += 1;
    }
    while (j < right.length) {
      result.push(right[j]);
      j += 1;
    }
    return result;
  };

  const middle = Math.floor(list.length / 2);
  const left = merge_sort(list.slice(0, middle));
  const right = merge_sort(list.slice(middle));
  return merge(left, right);
}

/* ----------------------------------  以下为做题区域  ------------------------------------------------------- */
