// 函数字符串转换
function transformString(code) {
  const stack = [];
  let currentToken = "";
  let isInputMode = false;

  for (let i = 0; i < code.length; i++) {
    const char = code[i];

    if (char === "(") {
      const newToken = [currentToken];
      stack.push(newToken);
      currentToken = "";
    } else if (char === ",") {
      if (isInputMode) {
        stack[stack.length - 1].push(currentToken);
        currentToken = "";
        isInputMode = false;
      }
    } else if (char === ")") {
      if (isInputMode) {
        stack[stack.length - 1].push(currentToken);
        currentToken = "";
        isInputMode = false;
      }
      const completedToken = stack.pop();
      if (stack.length === 0) {
        return completedToken;
      } else {
        stack[stack.length - 1].push(completedToken);
      }
    } else {
      currentToken += char;
      // Check if in input mode
      if (char !== " ") {
        isInputMode = true;
      }
    }
  }
}

// 输入为：[函数名, ...参数]
function transformArray(inputArray, replacements) {
  let result = "";
  let [name, ...params] = inputArray;
  name = name.replace(" ", "");

  if (replacements.hasOwnProperty(name)) {
    const func = replacements[name];
    const replaceParamsReg = /\$\{param_([\dn]+)\}/g;

    const paramsStr = params.map((item) =>
      Array.isArray(item) ? transformArray(item, replacements) : item
    );
    result = func.replaceAll(replaceParamsReg, (_, pos) => {
      if (pos === "n") {
        return paramsStr.join(",");
      }
      return paramsStr[pos - 1];
    });
  }

  return result;
}

// Example usage
try {
  const replacements = {
    add: "plus(${param_n})",
    multiply: "multi(${param_n})",
    square: "squ(${param_1})",
    REGEXP: "${param_1} REGEXP ${param_2}",
    WEEKDATE:
      "date_add(str_to_date(concat(cast(${param_1} as char), '-', cast(${param_2} as char), '-', cast(1 as char)), '%Y-%m-%d'), interval case when ${param_4} >= 0 then ((((${param_3} - 1) * 7) - mod((((weekday(str_to_date(concat(cast(${param_1} as char), '-', cast(${param_2} as char), '-', cast(1 as char)), '%Y-%m-%d')) + 1) + 7) - 7),  7)) + (${param_4} - 1)) else ((((${param_3} - 1) * 7) - mod((((weekday(str_to_date(concat(cast(${param_1} as char), '-',  cast(${param_2} as char), '-', cast(1 as char)), '%Y-%m-%d')) + 1) + 7) - 7),  7)) + (${param_4} + 7))end day)",
  };

  // const input = 'add(3,multiply("112233",square(5)))';
  const input = 'REGEXP("1", WEEKDATE("2","3","4",add("5","6")))';
  const transformedInput = transformString(input);
  // console.log(transformedInput); // 输出为：['add', 3, ['multiply', "\"112233\"", ['square', 5]]]
  const output = transformArray(transformedInput, replacements);
  // console.log(output); // 输出为: 'plus(3,multi("112233",squ(5)))'
} catch (err) {
  console.error(err);
}
