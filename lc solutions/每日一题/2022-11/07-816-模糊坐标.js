// 给坐标添加小数点
function getPos(s) {
  const pos = [];
  // 012是不允许的，0是可以的
  if (s[0] !== "0" || "0" === s) pos.push(s);
  for (let p = 1; p < s.length; p++) {
    // 00.1是不允许的
    // 1.20是不允许的
    if ((p !== 1 && s[0] === "0") || s[s.length - 1] === "0") continue;
    pos.push(s.slice(0, p) + "." + s.slice(p));
  }

  return pos;
}

// 组合坐标
function ambigrousCoordinates(s) {
  const n = s.length - 2;
  const res = [];
  s = s.slice(1, s.length - 1); // 减去两边的括号
  for (let i = 1; i < n; i++) {
    const lt = getPos(s.slice(0, i)),
      rt = getPos(s.slice(i));
    if (lt.length === 0 || rt.length === 0) continue;

    for (const i of lt) {
      for (const j of rt) {
        res.push(`(${i}, ${j})`);
      }
    }
  }

  return res;
}
