import { inOrder } from '../traverse/inOrder.mjs';

const isBST = root => {
  const arr = inOrder(root);

  return (
    arr.every((v, i, a) => (i == 0 ? true : v > a[i - 1])) ||
    arr.every((v, i, a) => (i == 0 ? true : v < a[i - 1]))
  );
};
