function normalize(opts, restSteps) {
  let steps;
  if (Array.isArray(opts)) {
    steps = opts;
  } else if (typeof opts === "function") {
    steps = [opts, ...restSteps];
  }
  opts = { steps, ...opts };
  return opts;
}

function Step(opts = {}, ...restSteps) {
  const { immediate = false, steps = [] } = normalize(opts, restSteps);

  function next(error, ...prevResults) {
    let result;

    // 检查是否还有剩余的步骤
    if (steps.length === 0) {
      if (error) throw new Error(error);
      return;
    }

    // 获取下一个步骤
    const step = steps.shift();
    // 执行下一个步骤
    try {
      result = step.apply(next, [error, ...prevResults]);
    } catch (e) {
      next(e);
    }

    if (result !== undefined) {
      // 单个普通任务执行完
      next(undefined, result);
    }
  }

  return immediate ? next() : next;
}

const fs = require("fs");

Step({
  immediate: true,
  steps: [
    function () {
      return `${__dirname}/test.txt`;
    },
    function (err, name) {
      if (err) throw err;
      fs.readFile(name, "utf8", this);
    },
    function capitalize(err, text) {
      if (err) throw err;
      return text.toUpperCase();
    },
    function showAll(err, result) {
      if (err) throw err;
      console.log(result);
    },
  ],
});
