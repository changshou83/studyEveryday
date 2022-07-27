const MyInstanceof = (child, parent) => {
  let childProto = Object.getPrototypeOf(child)
  while (true) {
    if (childProto === null || childProto === undefined) {
      return false
    } else if (childProto === parent.prototype) return true
    childProto = Object.getPrototypeOf(childProto)
  }
}
