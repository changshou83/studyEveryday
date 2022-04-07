/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function (head) {
  let pre = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = pre; // 关键一步
    // 向后走
    pre = curr;
    curr = next;
  }
  return pre;
};
