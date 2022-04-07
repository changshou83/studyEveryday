function traversalLinkedList(head, fn, pre) {
  let node = head;
  let index = 0;
  while (node !== null) {
    pre = fn(pre, node, index);
    node = node.next;
    index++;
  }
  return pre;
}
