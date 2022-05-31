// https://www.codewars.com/kata/52605419be184942d400003d/javascript

function defaultArguments(func, params) {
  const argNames =
    func.names ||
    func
      .toString()
      .replace(/\/\/.*$|\/\*.*?\*\/|\s/gm, '')
      .match(/(?:[\w]+(?:,[\w]+)*)?(?=\))/m)[0]
      .split(',');

  const detour = function (...input) {
    return func.apply(
      this,
      argNames.map((_, i) =>
        i < input.length ? input[i] : params[argNames[i]]
      )
    );
  };

  detour.names = argNames;
  return detour;
}
