// 相关文章：https://juejin.cn/post/7066969789322756132
// 示例代码：https://github.dev/sveinn-steinarsson/flot-downsample/blob/master/jquery.flot.downsample.js
// lttb：Largest-Triangle-Three-Buckets，直译为最大三角桶（我觉得可以拆成最大三角和桶两个词）。是一种降采样算法，好处是可以不丢失特征点，能够很好的保留数据趋势。
// 原理：将数据分成大小相同的桶，然后从每个桶中选择与相邻桶上的点形成最大面积的点，这样可以保留数据中的重要峰值和谷值。

/**
 * 最大三角桶算法
 * @param {[number, number]} data 要降采样的数据，第一个值为维度值，第二个值为指标值
 * @param {number} threshold 要分为多少个桶
 */
function largestTriangleThreeBuckets(data, threshold) {
  const { floor, min, abs } = Math;
  const dataLen = data.length;
  // 如果数据量没达到阈值或者阈值为0，则返回原数据
  if (threshold >= dataLen || threshold === 0) {
    return data;
  }

  // 样本集
  const sampled = [];
  // 桶的位置
  let sampledIndex = 0;

  // 桶大小，计算桶大小时会排除首尾，首尾会单独放入一个桶中
  const bucketSize = (dataLen - 2) / (threshold - 2);

  // 数据点 A 的位置
  let a = 0;
  // 能形成最大面积的数据点B
  let maxAreaPoint;
  // 三角形面积的最大面积
  let maxArea;
  // 三角形面积
  let area;
  // 下一个 A 点
  let nextA;

  // 将第一个值放入第一个桶中
  sampled[sampledIndex] = data[a];
  // 桶的位置加一
  sampledIndex += 1;

  // 遍历桶
  /**
   * │     │     │     │
   * │     │  x  │  x  │
   * │  x  │ x   │  x  │
   * │     │     │ x x │
   * │     │   x │     │
   *    A     B     C
   * 找A点和C区平均点C点，以及B区中的任一b点组成的三角形的面积，最大的那个就是最后的结果b点，然后遍历下一个区间，上一次的b点变为下一次的a点
   */
  for (let i = 0; i < threshold - 2; i++) {
    // 找 c 区的平均点 c 点
    let avgRangeStart = floor((i + 1) * bucketSize) + 1;
    const avgRangeEnd = min(floor((i + 2) * bucketSize) + 1, dataLen);
    const avgRangeLen = avgRangeEnd - avgRangeStart;
    let avgX = 0;
    let avgY = 0;
    for (; avgRangeStart < avgRangeEnd; avgRangeStart++) {
      avgX += data[avgRangeStart][0] * 1;
      avgY += data[avgRangeStart][1] * 1;
    }
    avgX /= avgRangeLen;
    avgY /= avgRangeLen;
    // 遍历 b 区中的点，找出可以组成最大三角形的那个 b 点
    let rangeOffs = floor((i + 0) * bucketSize) + 1;
    const rangeTo = floor((i + 1) * bucketSize) + 1;
    const pointAX = data[a][0] * 1;
    const pointAY = data[a][1] * 1;

    maxArea = area = -1;
    for (; rangeOffs < rangeTo; rangeOffs++) {
      // 计算三角形面积
      area =
        abs(
          (pointAX - avgX) * (data[rangeOffs][1] - pointAY) -
            (pointAX - data[rangeOffs][0]) * (avgY - pointAY)
        ) * 0.5;

      if (area > maxArea) {
        maxArea = area;
        maxAreaPoint = data[rangeOffs];
        nextA = rangeOffs;
      }
    }
    // 记录样本
    sampled[sampledIndex] = maxAreaPoint;
    sampledIndex += 1;
    // 进入下一次遍历
    a = nextA;
  }

  // 将最后一个值放入最后一个桶中
  sampled[sampledIndex] = data[data.length - 1];
  // 返回样本集
  return sampled;
}
