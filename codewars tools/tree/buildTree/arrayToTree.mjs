import T from './T.mjs';
const arrayToTree = (list, rootIndex = 0) => {
  if (rootIndex >= list.length) return undefined;
  return T(
    list[rootIndex],
    arrToTree(list, rootIndex * 2 + 1),
    arrToTree(list, rootIndex * 2 + 2)
  );
};

export default arrayToTree;
