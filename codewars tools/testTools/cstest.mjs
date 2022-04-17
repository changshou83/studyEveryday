import chalk from 'chalk';
const log = console.log;

const beforeEachs = [];
const afterEachs = [];
const afterAlls = [];
const beforeAlls = [];

let TotalTests = 0;
let passedTests = 0;
let failedTests = 0;

// describes
let stats = [];

// { expects: [], name: '', };
let currIt = null;
// { its: [], name: '', };
let currDesc = null;

function beforeEach(fn) {
  beforeEachs.push(fn);
}

function afterEach(fn) {
  afterEachs.push(fn);
}

function beforeAll(fn) {
  beforeAlls.push(fn);
}

function afterAll(fn) {
  afterAlls.push(fn);
}

function expectsFactory(name, value, expected, status) {
  return {
    name: `expect ${value} ${name} ${expected}`,
    status,
  };
}

function expect(value) {
  return {
    toBe: function (expected) {
      const updateResult = status =>
        expectsFactory('toBe', value, expected, status);
      // toBe 使用 === 进行严等判断
      if (value === expected) {
        currIt.expects.push(updateResult(true));
        passedTests++;
      } else {
        currIt.expects.push(updateResult(false));
        failedTests++;
      }
    },
    toEqual: function (expected) {
      const updateResult = status =>
        expectsFactory('toEqual', value, expected, status);
      // toEqual 使用 == 进行相等判断
      if (value == expected) {
        currIt.expects.push(updateResult(true));
        passedTests++;
      } else {
        currIt.expects.push(updateResult(false));
        failedTests++;
      }
    },

    not: {},

    toMatch: function (params) {},

    //Method is used to check expected result is defined or not.
    toBeDefined: function () {},

    toBeUndefined: function () {},

    //Method is used to check expected result is undefined or not.
    toBeNull: function () {},

    //Method is used to check expected result is null or not.
    toBeNull: function () {},

    //Method is used to check expected result is null or not.
    toBeTruthy: function () {},

    //Method is used to match the expected result is true or not i.e. means expected result is a Boolean value.
    toBeFalsy: function () {},

    //Method is used to match the expected result is false or not i.e. means expected result is a Boolean value.
    toContain: function (y) {},

    //Method is used to match the expected result contains the value of y.
    toBeGreaterThan: function (y) {},

    //Method is used to match the expected result is greater than y.
    toThrow: function (string) {},

    //Method is used to throw any message from expected result.
    toThrowError: function (string) {},
  };
}

function it(desc, fn) {
  // 1.保存 it 状态
  currIt = {
    name: desc,
    expects: [],
  };
  // 2.更新总测试数
  TotalTests++;
  // 执行before
  if (beforeEachs) {
    for (let i = 0; i < beforeEachs.length; i++) {
      beforeEachs[i].apply(this);
    }
  }
  // 3.执行测试函数
  fn.apply(this);
  // 4.执行after
  if (afterEachs) {
    for (let i = 0; i < afterEachs.length; i++) {
      afterEachs[i].apply(this);
    }
  }
  // 5.将it存入对应desc
  currDesc.its.push(currIt);
}

function describe(desc, fn) {
  // 1.保存当前desc信息
  currDesc = {
    its: [],
    name: desc,
  };
  // 2.执行before
  if (beforeAlls) {
    for (var index = 0; index < beforeAlls.length; index++) {
      beforeAlls[index].apply(this);
    }
  }
  // 3.执行测试集合
  fn.apply(this);
  // 4.执行after
  if (afterAlls) {
    for (let i = 0; i < afterAlls.length; i++) {
      afterAlls[i].apply(this);
    }
  }
  // 5.将desc存入总状态
  stats.push(currDesc);
}

export function showTestsResults() {
  console.log(`Total Test: ${TotalTests}    
Test Suites: passed, total
Tests: ${passedTests} passed, ${TotalTests} total

`);
  // 展示测试结果
  const logTitle = failedTests > 0 ? chalk.bgRed : chalk.bgGreen;
  log(logTitle('Test Suites'));
  // 遍历stat和desc
  for (let index = 0; index < stats.length; index++) {
    const { name, its } = stats[index];

    log(name);
    for (let i = 0; i < its.length; i++) {
      const { name, expects } = its[i];

      log(`   ${name}`);
      for (let _i = 0; _i < expects.length; _i++) {
        const { name, status } = expects[_i];

        log(
          `      ${status === true ? chalk.green('√') : chalk.red('X')} ${name}`
        );
      }
    }
    log();
  }

  /*console.log(`


PASS  test\createStore.spec.js (9.731s)
PASS  test\combineReducers.spec.js

Test Suites: 2 passed, 2 total
Tests:       19 passed, 19 total
Snapshots:   0 total
Time:        41.026s, estimated 62s
Ran all test suites.

Ran all test suites related to changed files.
 PASS  test\t.spec.js (6.757s)
    √  (7ms)
`)*/
}

// 挂载到全局
export { describe, it, expect, afterEach, beforeEach, beforeAll, afterAll };
