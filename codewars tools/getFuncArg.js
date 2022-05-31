function getArguments(func) {
  return (
    func.names ||
    func
      .toString()
      .replace(/\/\/.*$|\/\*.*?\*\/|\s/gm, '')
      .match(/(?:[\w]+(?:,[\w]+)*)?(?=\))/m)[0]
      .split(',')
  );
}
