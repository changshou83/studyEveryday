export class ListNode {
  val: any;
  next: ListNode | null;
  constructor(val: any, next?: ListNode | null) {
    this.val = val;
    this.next = next ?? null;
  }
}
