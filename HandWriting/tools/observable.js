/**  监听对象属性自动同步  **/
const origin = {
  meta: { id: "1" },
  params: { summary: "sum" },
  posInList: 0,
  list: [
    { meta: { id: "1" }, params: { summary: "sum" } },
    { meta: { id: "2" }, params: { summary: "avg" } },
  ],
  sync() {
    this.list[this.posInList] = { meta: this.meta, params: this.params };
  },
  changePos(newPos) {
    this.posInList = newPos;
    this.meta = this.list[this.posInList].meta;
    this.params = this.list[this.posInList].params;
  },
};

function observable(origin, targets = [], proxyHandler) {
  function setValueWithPath(obj, path, val) {
    const paths = path.split(".");
    paths.reduce((acc, cur, i) => {
      return (acc[cur] = (i === paths.length - 1 ? val : acc[cur]) || {});
    }, obj);
  }
  const stack = [{ node: origin, key: "", path: "" }];
  while (stack.length > 0) {
    let { parent, node, key, path } = stack.pop();
    const type = Object.prototype.toString.call(node).slice(8, -1);

    if (!targets.some((target) => target.indexOf(path) > -1)) {
      continue;
    }
    if (type === "Object") {
      Object.keys(node).forEach((key) => {
        stack.push({
          parent: node,
          node: node[key],
          key,
          path: `${path}${path ? "." : ""}${key}`,
        });
      });
    } else if (!Array.isArray(node)) {
      setValueWithPath(
        origin,
        path.slice(0, path.length - key.length - 1),
        new Proxy(parent, proxyHandler)
      );
    }
  }
}

// observable(origin, ['meta.id', 'params'], {
//   set(obj, prop, val) {
//     obj[prop] = val;
//     origin.sync();
//     return obj;
//   },
//   get(obj, prop) {
//     return obj[prop]
//   }
// });

// console.log(origin.meta)
// origin.meta.id = '2'
// console.log(origin.meta)
// console.log(origin.list[origin.posInList])
// console.log()
// origin.changePos(1)
// console.log(origin)
