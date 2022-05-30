// https://www.codewars.com/kata/5bb429a97631f02eec00001f/javascript
// 我的想法是弄一个代理，但是失败了，他应该返回一个函数而不是一个代理，，，
// 这个答案的思路是用一个数组来保存原型链，，，

const JSLicense = createLicense(null, -1);

function createLicense(owner, renewed) {
  const childLicenses = [];

  function license(newOwner) {
    if (!new.target || !(owner || newOwner)) throw Error();
    return owner && newOwner
      ? new JSLicense(newOwner)
      : (childLicenses[childLicenses.length] = createLicense(
          newOwner || owner,
          renewed + 1
        ));
  }

  license.owner = owner;
  license.renewed = renewed;
  license.toString = () =>
    `JSLicense: Licensed to ${owner}, renewed ${renewed} time(s)`;

  Object.defineProperty(license, Symbol.hasInstance, {
    value: obj => childLicenses.some(lsc => lsc === obj || obj instanceof lsc),
  });
  return Object.freeze(license);
}
