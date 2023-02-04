function Step(...steps) {
  let pending; // 待执行并行任务任务数
  let counter; // 当前已执行并行任务数
  let lock; // 当前串行任务是否在执行
  let err; // 执行并行任务时的错误对象
  let results; // 并行任务结果数组

  function next(error, ...prevResults) {
    // 串行任务执行结果
    let result;
    // 每执行一个串行任务，就重置
    counter = pending = 0;
    results = [];

    // 检查是否还有剩余的步骤
    if (steps.length === 0) {
      if (error) throw new Error(error);
      return;
    }

    // 获取下一个任务并执行
    const step = steps.shift();
    try {
      lock = true;
      result = step.apply(next, [error, ...prevResults]);
    } catch (e) {
      next(e);
    }

    // 单个串行任务执行完
    if (result !== undefined) next(undefined, result);
    // 确保在当前串行任务执行结束前，并行任务不会调用next
    lock = false;
  }

  next.parallel = function () {
    const idx = counter++;
    pending++;

    return function (error, result) {
      pending--;
      if (error) err = error;
      // 保存并行执行结果
      results[idx] = result;
      // 当前串行任务的全部并行任务执行完毕
      if (!lock && pending === 0) next(err, ...results);
    };
  };
  // 相当于一个小型Step了
  next.group = function () {
    const localCallback = next.parallel();
    const result = [];
    let counter = 0;
    let pending = 0;
    let error = undefined;

    function check() {
      if (pending === 0) localCallback(error, result);
    }
    queueMicrotask(check);

    return function () {
      let idx = counter++;
      pending++;

      return function (...args) {
        pending--;
        if (args[0]) error = args[0];
        result[idx] = args[1];
        if (!lock) check();
      };
    };
  };

  next();
}

Step.fn = function StepFn(...steps) {
  return () => Step(...steps);
};

const fs = require("fs");

// const task = Step.fn(
//   function () {
//     return `${__dirname}/test.txt`;
//   },
//   function (err, name) {
//     fs.readFile(name, "utf8", this);
//   },
//   function capitalize(err, text) {
//     if (err) throw err;
//     return text.toUpperCase();
//   },
//   function showAll(err, result) {
//     if (err) throw err;
//     console.log(result);
//   }
// );
// task();

/* parallel */
Step(
  function loadStuff() {
    fs.readFile(`${__dirname}/test.txt`, "utf8", this.parallel());
    fs.readFile(`${__dirname}/test2.txt`, "utf8", this.parallel());
  },
  function capitalize(err, ...args) {
    return args.map((txt) => txt.toUpperCase());
  },
  function showStuff(err, [code, txt]) {
    if (err) throw err;
    // console.log(code);
    // console.log(txt);
  }
);
