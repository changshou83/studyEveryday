class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Tower extends Point {
  constructor(info) {
    super(info[0], info[1]);
    this.intensity = info[2];
  }
}

/**
 * 计算两点之间的距离。
 * @param point1 - 第一点
 * @param point2 - 我们正在计算到的距离的点。
 */
const calculateDistance = (point1, point2) =>
  Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
  );
/**
 * 计算点的信号强度
 * @param {*} towers 信号塔列表
 * @param {*} currPoint 当前坐标
 * @param {*} radius 信号塔半径
 * @returns 当前点的信号强度
 */
const calculatePointStrength = (towers, currPoint, radius) =>
  towers.reduce((res, tower) => {
    const distance = calculateDistance(currPoint, tower);
    return distance <= radius
      ? res + Math.floor(tower.intensity / (1 + distance))
      : res;
  }, 0);

function bestCoordinate(towers, radius) {
  let result = [0, 0];
  let maxStrength = 0;

  const _towers = towers.map((tower) => new Tower(tower));
  for (let i = 0; i <= 50; i++) {
    for (let j = 0; j <= 50; j++) {
      const currPointStrength = calculatePointStrength(
        _towers,
        new Point(i, j),
        radius
      );
      if (
        (maxStrength == currPointStrength &&
          !(i > result[0] || (i == result[0] && j > result[1]))) ||
        maxStrength < currPointStrength
      ) {
        maxStrength = currPointStrength;
        result = [i, j];
      }
    }
  }

  return result;
}
