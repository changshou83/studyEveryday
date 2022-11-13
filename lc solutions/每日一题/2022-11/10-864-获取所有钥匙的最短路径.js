const directs = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

function shortestPathAllKeys(grid) {
  const rows = grid.length,
    cols = grid[0].length;

  // 找起点和钥匙个数
  let sx = 0,
    sy = 0;
  const keyToIndex = new Map();
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === "@") {
        sx = row;
        sy = col;
      } else if ("a" <= grid[row][col] && grid[row][col] <= "z") {
        if (!keyToIndex.has(grid[row][col])) {
          keyToIndex.set(grid[row][col], keyToIndex.size);
        }
      }
    }
  }

  // [x,y,mask]，xy是位置信息，mask是持有钥匙数，规定下一步走哪
  const queue = [];
  // [x,y,[]]，xy是位置，[]是存储钥匙和步数信息的
  // 例如有两把钥匙的起点[sx,sy,[0,-1,-1,-1]],最终结果[ex,ey,[-1,-1,-1,steps]]
  const dist = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => new Array(1 << keyToIndex.size).fill(-1))
  );
  // 设置起点
  queue.push([sx, sy, 0]);
  dist[sx][sy][0] = 0;
  // 开始探索最短路径
  while (queue.length) {
    let [x, y, mask] = queue.shift();
    for (const direct of directs) {
      let nx = x + direct[0],
        ny = y + direct[1];
      // 如果移动后在边界内并且不是墙
      if (
        nx >= 0 &&
        nx < rows &&
        ny >= 0 &&
        ny < cols &&
        grid[nx][ny] !== "#"
      ) {
        if (grid[nx][ny] === "." || grid[nx][ny] === "@") {
          // 是空房间或者起点
          if (grid[nx][ny][mask] === -1) {
            dist[nx][ny][mask] = dist[x][y][mask] + 1; // 更新步数
            queue.push([nx, ny, mask]); // 更新路径
          }
        } else if ("a" <= grid[nx][ny] && grid[nx][ny] <= "z") {
          // 是钥匙
          const idx = keyToIndex.get(grid[nx][ny]);
          // mask | 1 << idx是当前持有钥匙数和当前位置钥匙的并集
          if (dist[nx][ny][mask | (1 << idx)] === -1) {
            dist[nx][ny][mask | (1 << idx)] = dist[x][y][mask] + 1; // 更新步数
            // 1<<0=1,所以要减一
            if ((mask | (1 << idx)) === (1 << keyToIndex.size) - 1) {
              return dist[nx][ny][mask | (1 << idx)];
            }
            queue.push(dist[nx][ny][mask | (1 << idx)]); // 更新路径
          }
        } else {
          // 是锁
          const idx = keyToIndex.get(grid[nx][ny.toLowerCase()]);
          // mask & 1<<idx为检验是否有能解开当前位置锁的钥匙
          if ((mask & (1 << idx)) !== 0 && dist[nx][ny][mask] === -1) {
            dist[nx][ny][mask] = dist[x][y][mask] + 1; // 更新步数
            queue.push([nx, ny, mask]); // 更新路径
          }
        }
      }
    }
  }

  return -1;
}
