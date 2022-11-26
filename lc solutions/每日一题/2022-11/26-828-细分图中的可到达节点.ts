import dijkstra from "../../utils/algo/dijkstra";

function reachableNodes(
  edges: number[][],
  maxMoves: number,
  n: number
): number {
  // 建图
  const graph: [number, number][][] = Array.from({length:n}, () => []);
  for(const [u,v,c] of edges) {
    graph[u].push([v,c]);
    graph[v].push([u,c]);
  }

  const distance = dijkstra(graph, 0); // 从 0 出发的最短路
  // 可以在 maxMoves 步内到达的点的个数
  let res = distance.filter(d => d <= maxMoves).reduce((sum, cnt) => sum + cnt, 0)
  for(const [u,v,c] of edges) {
    const a = Math.max(maxMoves - distance[u], 0);
    const b = Math.max(maxMoves - distance[v], 0);
    res += Math.min(a + b, c); // 这条边上可以到达的节点数
  }

  return res;
}
