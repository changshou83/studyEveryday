function getMap(s) {
  const map = new Map();
  for (const c of s) map.set(c, (map.get(c) || 0) + 1)
  return map;
}

function customSortString(order, s) {
  const map = getMap(s);
  let result = '';

  for (const c of order) {
    if (map.has(c)) {
      result += c.repeat(map.get(c));
      map.delete(c);
    }
  }
  for (const entry of map.entries()) {
    result += entry[0].repeat(entry[1]);
  }
  
  return result;
}
