import { ListNode } from "../../utils/ds/ListNode";

function getList(head: ListNode) {
  const result = [];
  let node: ListNode | null = head;
  while (node !== null) {
    result.push(node.val);
    node = node.next;
  }
  return result;
}
function removeNodes(head: ListNode) {
  // 找严格最大值
  const list = getList(head);
  const stack: number[] = [];
  for(const v of list) {
    while(stack && stack[stack.length - 1] < v) {
      stack.pop();
    }
    stack.push(v);
  }

  // 新建链表
  const res = new ListNode(0, head);
  let prev = res;
  for(const v of stack) {
    prev.next = new ListNode(v);
    prev = prev.next;
  }

  return res.next;
}
