// 词法分析
function lexicalAnalysis(expression) {
  // 运算符
  const symbol = ['(', ')', '+', '-', '*', '/'];
  // 数字正则表达式
  const re = /\d/;
  // 词法分析的结果数组
  const tokens = [];
  // 参数被分成单个单元后的数组
  const chars = expression.trim().split('');
  // 词法单元
  let token = '';
  chars.forEach(c => {
    // 筛选数字，如果上一个还是数字，那就连上
    if (re.test(c)) {
      token += c;
    } else if (c == '' && token) {
      // 遇见空格说明数字结束，将数字推进tokens，之后重置token
      tokens.push(token);
      token = '';
    } else if (symbol.includes(c)) {
      // 筛选运算符
      // 如果token为''说明没有遇到数字，也就不用再将''推进tokens里了
      // 如果token不为''说明数字结束，将数字推进tokens，之后重置token
      if (token) {
        tokens.push(token);
        token = '';
      }

      // 将运算符推进tokens
      tokens.push(c);
    }
  })
  // 最后一个字符为数字时，不会再走上面两个if将数字推进tokens
  // 所以在下面又加了一个
  if (token) {
    tokens.push(token)
  }
  // 返回词法分析的结果
  return tokens
}

// 示例
// console.log(lexicalAnalysis('100 + 23 + 34 * 10 / 2'))

// 结果
// [
//   '100', '+',  '23',
//   '+',   '34', '*', 
//   '10',  '/',  '2'  
// ]




// 语法分析
// 定义：对输入的文本按照语法规则进行分析并确定其语法结构的一种过程，称为语法分析。
// 一般语法分析的输出为抽象语法树（AST）或语法分析树（parse tree）。但由于四则运算比较简单，所以这里采取的方案是即时地进行代码生成和错误报告，这样就不需要在内存中保存整个程序结构

// 示例：分析一个四则运算表达式 1 + 2 * 3
//   1 + 2 * 3                         // 1 + 2 * 3
//       +                             // compileExpression
//       |                             //    | compileAddExpr
//       v                             //    |  | compileMultExpr
//   expression                        //    |  |  | compileTerm
//       +                             //    |  |  |  |_ matches integerConstant		push 1
//       |                             //    |  |  |_
//       v                             //    |  | matches '+'
//  addExpression                      //    |  | compileMultExpr
//       +                             //    |  |  | compileTerm
//       |                             //    |  |  |  |_ matches integerConstant		push 2
//       v                             //    |  |  | matches '*'
// multExpression                      //    |  |  | compileTerm
//       +                             //    |  |  |  |_ matches integerConstant		push 3
//       |                             //    |  |  |_ compileOp('*')                      *
//       v                             //    |  |_ compileOp('+')                         +
//     term                            //    |_
//       +                             
//       |                             
//       v                             
//       1        

// 构建语法分析树的算法
// 1.递归下降分析法(自顶向下分析法)：照语法规则一步步递归地分析 token 流，如果遇到非终结符，则继续往下分析，直到终结符为止。
// 2.LL(0)分析法：LL(0)在此基础上多了一个步骤，当第一个 token 不足以确定元素类型时，对下一个字元采取“提前查看”，有可能会解决这种不确定性。

// 表达式代码生成
// 人类：中缀表达式： 5 + 5 
// -> 计算机：后缀表达式： 5 5 + 
// -> 生成代码：push 5  push 5  add

// 代码实现
// 汇编代码生成器
function AssemblyWriter() {
  // 输出的汇编代码
  this.output = ''
}

// 代码生成器的方法
AssemblyWriter.prototype = {
  // 推入对应数值
  writePush(digit) {
    this.output += `push ${digit}\r\n`
  },
  // 执行计算操作
  writeOP(op) {
    this.output += op + '\r\n'
  },

  // 输出汇编代码
  outputStr() {
    return this.output
  }
}

// 语法分析器
function Parser(tokens, writer) {
  // 代码生成器
  this.writer = writer
  // 词法分析的结果数组
  this.tokens = tokens
  // tokens 数组索引
  this.i = -1

  // 加减法转换规则
  this.opMap1 = {
    '+': 'add',
    '-': 'sub',
  }

  // 乘除法转换规则
  this.opMap2 = {
    '/': 'div',
    '*': 'mul',
  }
  // 初始化(执行expression步骤)
  this.init()
}

// 语法分析器的方法
Parser.prototype = {
  // 初始化
  init() {
    // 执行expression步骤
    this.compileExpression()
  },
  // expression步骤
  compileExpression() {
    // 执行addExpression步骤
    this.compileAddExpr()
  },
  // addExpression步骤
  compileAddExpr() {
    // 执行MultExpression步骤
    this.compileMultExpr()
    // 循环分析词法单元
    while (true) {
      // 获得下一个词法单元
      this.getNextToken()
      // 如果可以匹配，就输出对应的汇编代码
      if (this.opMap1[this.token]) {
        let op = this.opMap1[this.token]
        this.compileMultExpr()
        this.writer.writeOP(op)
      } else {
        // 没有匹配上响应的操作符 这里是没有匹配上 + -(匹配完了)
        // 将 token 索引后退一位
        this.i--
        break
      }
    }
  },
  // MultExpression步骤
  compileMultExpr() {
    // 执行term步骤
    this.compileTerm()
    // 循环分析词法单元
    while (true) {
      // 获得下一个词法单元
      this.getNextToken()
      // 如果可以匹配，就输出对应的汇编代码
      if (this.opMap2[this.token]) {
        let op = this.opMap2[this.token]
        this.compileTerm()
        this.writer.writeOP(op)
      } else {
        // 没有匹配上响应的操作符 这里是没有匹配上 / *(匹配完了)
        // 将 token 索引后退一位
        this.i--
        break
      }
    }
  },
  // term步骤
  compileTerm() {
    // 获得下一个词法单元
    this.getNextToken()
    if (this.token == '(') {
      this.compileExpression()
      this.getNextToken()
      if (this.token != ')') {
        throw '缺少右括号：)'
      }
    } else if (/^\d+$/.test(this.token)) {
      // 如果下一个是数字，推入数字
      this.writer.writePush(this.token)
    } else {
      throw '错误的 token ：第' + (this.i + 1) + '个 token (' + this.token + ')'
    }
  },
  // 获得下一个词法单元
  getNextToken() {
    this.token = this.tokens[++this.i]
  },
  // 获得生成的代码
  getInstructions() {
    return this.writer.outputStr()
  }
}

// // 表达式
// const expression = '1 + 2 / 3'
// // 词法分析的结果
// const tokens = lexicalAnalysis(expression)
// // 代码生成器
// const writer = new AssemblyWriter()
// // 语法分析
// const parser = new Parser(tokens, writer)
// // 获得语法分析后的代码生成的结果
// const instructions = parser.getInstructions()
// 输出生成的汇编代码
// console.log(instructions) 
// push 1
// push 2
// push 3
// div   
// add  


// 模拟栈执行
function CpuEmulator(instructions) {
  // 根据换行符区分语句
  this.ins = instructions.split('\r\n')
  this.memory = []
  this.re = /^(push)\s\w+/
  this.execute()
}

CpuEmulator.prototype = {
  execute() {
    this.ins.forEach(i => {
      switch (i) {
        case 'add':
          this.add()
          break
        case 'sub':
          this.sub()
          break
        case 'mul':
          this.mul()
          break
        case 'div':
          this.div()
          break
        default:
          if (this.re.test(i)) {
            this.push(i.split(' ')[1])
          }
      }
    })
  },
  // 执行加操作
  add() {
    const b = this.pop()
    const a = this.pop()
    this.memory.push(a + b)
  },
  // 执行减操作
  sub() {
    const b = this.pop()
    const a = this.pop()
    this.memory.push(a - b)
  },
  // 执行乘操作
  mul() {
    const b = this.pop()
    const a = this.pop()
    this.memory.push(a * b)
  },
  // 执行除操作
  div() {
    const b = this.pop()
    const a = this.pop()
    // 不支持浮点运算，所以在这要取整
    this.memory.push(Math.floor(a / b))
  },
  // 将数字推到栈中
  push(x) {
    this.memory.push(parseInt(x))
  },
  // 将数字弹出栈
  pop() {
    return this.memory.pop()
  },
  // 获得计算结果
  getResult() {
    return this.memory[0]
  }
}

// 表达式
const expression = '(100+  10)*  10-100/  10      +8*  (4+2)'
// 词法分析
const tokens = lexicalAnalysis(expression)
// 代码生成器
const writer = new AssemblyWriter()
// 语法分析
const parser = new Parser(tokens, writer)
// 代码生成
const instructions = parser.getInstructions()
// 执行生成的代码
const emulator = new CpuEmulator(instructions)
// 输出计算结果
console.log(emulator.getResult()) // 1138