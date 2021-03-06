// 副作用函数桶
const bucket = new WeakMap();
function track(target, key) {
  if (!activeEffect) return;

  let depsMap = bucket.get(target);
  if (!depsMap) bucket.set(target, (depsMap = new Map()));
  let effects = depsMap.get(key);
  if (!effects) depsMap.set(key, (effects = new Set()));

  effects.add(activeEffect);

  activeEffect.deps.push(effects);
}
function trigger(target, key) {
  const depsMap = bucket.get(target);
  if (!depsMap) return;
  const effects = depsMap.get(key);

  // 解决set无限循环问题
  const effectsToRun = new Set();
  effects &&
    effects.forEach(effectFn => {
      if (effectFn !== activeEffect) effectsToRun.add(effectFn);
    });
  effectsToRun.forEach(effectFn => effectFn());
}
// 注册副作用函数
let activeEffect;
const effectStack = [];
function effect(fn) {
  const effectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;
    effectStack.push(effectFn);
    fn();
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
  };
  effectFn.deps = [];
  effectFn();
}
function cleanup(effectFn) {
  effectFn.deps.forEach(deps => {
    deps.delete(effectFn);
  });
  effectFn.deps.length = 0; // 重置 deps
}

// 监控数据的设置于读取行为
const data = { foo: 1 };
const obj = new Proxy(data, {
  get(target, key, receiver) {
    if (!activeEffect) return;

    track(target, key);

    return Reflect.get(target, key, receiver);
  },
  set(target, key, newValue, receiver) {
    target[key] = newValue;
    trigger(target, key);
  },
});
let temp1, temp2;
// 使用数据
effect(() => {
  obj.foo += 1;
});

obj.foo = 3;
console.log(obj);
