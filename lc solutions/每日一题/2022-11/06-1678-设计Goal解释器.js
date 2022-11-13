function interpret(command) {
  const stack = [];

  for (let c of command) {
    if (c !== ")") stack.push(c);
    else {
      let str = "";
      while (stack[stack.length - 1] !== "(") {
        str = stack.pop() + str;
      }
      stack.pop();

      if (str == "al") stack.push("al");
      else if (str == "") stack.push("o");
    }
  }

  return stack.join("");
}
