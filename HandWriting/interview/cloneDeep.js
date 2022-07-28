// 可遍历类型
const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'
const argsTag = '[object Arguments]'
const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag]
// 不可遍历类型
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const numberTag = '[object Number]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const errorTag = '[object Error]'
const regexTag = '[object RegExp]'
const funcTag = '[object Function]'

// 工具函数
/**
 * 获取实例类型
 */
function getType(target) {
  return Object.prototype.toString.call(target)
}
/**
 * 初始化被克隆的对象
 */
function getInit(target, type) {
  const Ctor = target.constructor
  return new Ctor()
}
/**
 * 通用while循环(性能最好)
 */
const forEach = (arr, iteratee) => {
  let index = -1
  const length = arr.length
  while (++index < length) {
    iteratee(arr[index], index)
  }
  return arr
}
// 克隆各种类型
function cloneRegExp(target) {
  const reFlags = /\w*$/ // g,i,m...
  const result = new target.constructor(target.source, reFlags.exec(target))
  result.lastIndex = target.lastIndex
  return result
}
function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target))
}
function cloneFunction(target) {
  const paramReg = /(?<=\().+(?=\)[=>\s]+{)/ // (?<=)(positive lookbehind) & (?=)(positive lookahead)
  const bodyReg = /(?<={)(.|\n)+(?=})/m
  const funcString = target.toString()

  if (target.prototype) {
    const param = paramReg.exec(funcString)
    const body = bodyReg.exec(funcString)
    if (body) {
      if (param) {
        const paramArr = param[0].split(',').map((p) => p.trim())
        return new Function(...paramArr, body[0])
      } else {
        return new Function(body[0])
      }
    } else {
      return null
    }
  } else {
    return eval(funcString)
  }
}
function cloneOtherType(target, type) {
  const Ctor = target.constructor
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(target)
    case regexTag:
      return cloneRegExp(target)
    case symbolTag:
      return cloneSymbol(target)
    case funcTag:
      return cloneFunction(target)
    default:
      return null
  }
}

// 主函数
const _completeDeepClone = (target, map = new WeakMap()) => {
  // 原始类型直接返回
  const isObject = target !== null && typeof target === 'object'
  if (!isObject) return target

  // 根据不同类型进行操作
  const type = getType(target)
  let cloned
  if (deepTag.includes(type)) cloned = getInit(target, type)
  else return cloneOtherType(target, type)

  // 解决循环引用
  if (map.get(target)) return map.get(target)
  map.set(target, cloned)

  // 处理Map和Set
  if (type === setTag) {
    target.forEach((v) => cloned.add(_completeDeepClone(v)))
    return cloned
  }
  if (type === mapTag) {
    target.forEach((v, k) => cloned.set(k, _completeDeepClone(v)))
    return cloned
  }

  // 处理对象和数组
  const isArray = type === arrayTag
  const keys = isArray ? undefined : Object.keys(target)
  forEach(keys || target, (v, k) => {
    if (!isArray) k = v
    if (target.hasOwnProperty(k)) cloned[k] = _completeDeepClone(target[k], map)
  })

  return cloned
}

;(function () {
  const o1 = {
    name: 'g',
    age: 18,
    o: { name: 'o' },
    a: [1, 2],
    r: new RegExp(),
    d: new Date(),
  }
  o1.self = o1

  const o2 = _completeDeepClone(o1)
  o1.name = 'z'
  o1.age = 1

  const judge =
    o1.name !== o2.name &&
    o1.age !== o2.age &&
    o1.o !== o2.o &&
    o1.a !== o2.a &&
    o1.r !== o2.r &&
    o1.d !== o2.d &&
    o1.self.self.self.self.self.self.self.self.self === o1.self &&
    o1.self !== o2.self

  return judge
})()
