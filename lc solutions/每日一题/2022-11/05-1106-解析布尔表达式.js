function parseBoolExpr(expression) {
  const stack = [];

  for (let c of expression) {
    if (c === ",") continue;
    else if (c !== ")") stack.push(c);
    else {
      // 如果遇到闭括号，说明一个表达式已被完全匹配
      let t = 0,
        f = 0;
      while (stack[stack.length - 1] !== "(") {
        if (stack.pop() === "t") t++;
        else f++;
      }
      stack.pop(); // 把 `(` 弹出

      const op = stack.pop();
      switch (op) {
        case "!":
          stack.push(f == 1 ? "t" : "f"); // 对单个expr取反
          break;
        case "&":
          stack.push(f == 0 ? "t" : "f"); // 有一个f结果为f
          break;
        case "|":
          stack.push(t > 0 ? "t" : "f"); // 有一个t结果为t
          break;
      }
    }
  }

  return stack.pop() === "t";
}
