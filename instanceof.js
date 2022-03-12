const MyInstanceof = (child, parent) => {
  const childProto = Object.getPrototypeOf(child);
  while (true) {
    if (childProto === null || childProto === undefined) {
      return false;
    } else if (childProto === parent) return true;
    childProto = Object.getPrototypeOf(childProto);
  }
};
