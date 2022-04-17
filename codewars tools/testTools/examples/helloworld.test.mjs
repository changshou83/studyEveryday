import { hello, sum } from './helloworld.mjs';
import { describe, it, expect, showTestsResults } from '../cstest.mjs';

describe('hello', function () {
  it('says hello', function () {
    expect(hello('cstest')).toBe('hello cstest');
  });
  it('says hello failed', function () {
    expect(hello('cstest')).toBe('hello cstests');
  });
});

describe('sum', function () {
  it('1 + 1', function () {
    expect(sum(1, 1)).toBe(2);
  });
  it('1 + 2', function () {
    expect(sum(1, 2)).toBe(2);
  });
});

showTestsResults();
