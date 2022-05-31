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

function getArguments(func) {
  return (
    func.names ||
    (
      func.toString().match(/(?:^function ?\w*|\B)\((?:([\w, ]+)?)\)/m)[1] || ''
    ).split(',')
  );
}
