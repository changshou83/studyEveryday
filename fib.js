const fib = n => {
  if (n == 1 || n == 2) return 1;
  let [a, b] = [0, 1];
  for (let i = 3; i <= n; i++) [a, b] = [b, a + b];
  return a + b;
};
