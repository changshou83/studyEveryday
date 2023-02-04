function Step(...steps) {
  let counter, pending, lock, err, results;

  function next(error, ...prevResults) {
    let result;
    counter = pending = 0; // 赋初值和重置结果数组
    results = []; // 赋初值和重置结果数组

    if (steps.length === 0) {
      if (error) throw new Error(error);
      return;
    }

    const task = steps.shift();
    try {
      lock = true;
      result = task.apply(next, [error, ...prevResults]);
    } catch (err) {
      next(err);
    }
    if (result !== undefined) {
      // 串行任务执行结束后
      next(undefined, result);
    }
    lock = false; // 防止当前串行任务还未执行，parallel却已经执行完毕调用下一个next，确保当前串行任务被完全执行
  }
  next.parallel = function () {
    const idx = counter++; // 更新已执行任务数，并保存结果保存的位置下标
    pending++; // 更新待执行任务数

    return function (error, result) {
      pending--;
      if (error) err = error;
      results[idx] = result; // 将并行任务执行结果存入结果数组
      if (!lock && pending === 0) {
        next(err, ...results);
      }
    };
  };
  next();
}

const fs = require("node:fs");

Step(
  function loadStuff() {
    fs.readFile(`${__dirname}/test.txt`, "utf8", this.parallel());
    fs.readFile(`${__dirname}/test2.txt`, "utf8", this.parallel());
  },
  function showStuff(err, code, txt) {
    if (err) throw err;
    console.log(code);
    console.log(txt);
  }
);
