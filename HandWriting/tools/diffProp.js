function diffProp(prevProp, nextProp) {
  const stack = [{ prevProp, nextProp, key: "" }];
  const diff = [];
  const changeDiff = (path, prev, curr) =>
    diff.push({
      prev,
      curr,
      path,
      type:
        prev === undefined ? "add" : curr === undefined ? "remove" : "change",
    });
  while (stack.length > 0) {
    const { prevProp, nextProp, key } = stack.pop();
    if (prevProp !== nextProp) {
      // 如果两个prop不相等
      const type1 = typeof prevProp;
      const type2 = typeof nextProp;

      if (type1 !== type2 || prevProp === null || nextProp === null) {
        changeDiff(key, prevProp, nextProp);
      } else if (type1 === "object") {
        if (Array.isArray(prevProp)) {
          if (!Array.isArray(nextProp)) {
            changeDiff(key, prevProp, nextProp);
          } else if (prevProp.length !== nextProp.length) {
            changeDiff(key, prevProp, nextProp);
          } else {
            for (let i = 0; i < prevProp.length; i++) {
              stack.push({
                prevProp: prevProp[i],
                nextProp: nextProp[i],
                key: `${key}[${i}]`,
              });
            }
          }
        } else {
          if (!(typeof nextProp === "object" && !Array.isArray(nextProp))) {
            changeDiff(key, prevProp, nextProp);
          } else {
            const prevPropKeys = Object.keys(prevProp);
            const nextPropKeys = Object.keys(nextProp);

            for (let k of prevPropKeys) {
              if (!nextPropKeys.includes(k)) {
                stack.push({
                  prevProp: prevProp[k],
                  nextProp: undefined,
                  key: `${key}${key ? "." : ""}${k}`,
                });
              } else {
                stack.push({
                  prevProp: prevProp[k],
                  nextProp: nextProp[k],
                  key: `${key}${key ? "." : ""}${k}`,
                });
              }
            }

            for (let k of nextPropKeys) {
              if (!prevPropKeys.includes(k)) {
                stack.push({
                  prevProp: undefined,
                  nextProp: nextProp[k],
                  key: `${key}${key ? "." : ""}${k}`,
                });
              }
            }
          }
        }
      } else {
        changeDiff(key, prevProp, nextProp);
      }
    }
  }
  console.log(diff);
  return diff.map((item) => item.path);
}

const old = [];
const newObj = [];
// console.log(diffProp(old, newObj))
