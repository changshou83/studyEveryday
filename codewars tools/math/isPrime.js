function isPrime(n) {
  let start = 2;
  while (start <= Math.sqrt(n)) {
    if (n % start++ < 1) return false;
  }
  return n > 1;
}
isPrime(1);
isPrime(2);
isPrime(4);
isPrime(7);
