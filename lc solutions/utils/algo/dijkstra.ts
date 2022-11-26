import { BinaryHeap } from '../ds/pq'

export default function dijkstra(graph: number[][][], start: number): number[] {
  // 保存每个节点的最小路径值, distance[nodeIndex] = minDistance
  const distance = new Array<number>(graph.length).fill(Infinity);
  distance[start] = 0;
  
  // 暂存每个点的所有相连的点的最小路径值，是一个最小堆，因此队头为当前队列里的路径值最小的点
  // pq[node] = [nodeIndex, minDistance]
  const pq = new BinaryHeap<number[]>((a,b) => a[1] -  b[1]);
  pq.push([start, 0]);
  
  // 遍历图
  while(!pq.isEmpty()) {
    // 弹出当前的具有最小路径值的点
    const [node, d] = pq.pop() as [number, number];
    // 如果当前点的距离大于最小距离，那么跳过该点
    if(d > distance[node]) continue;
    // 遍历当前节点的相连的节点，并更新distance和pq中的最小距离值
    graph[node].forEach(([edgeNode, edgeDistance]) => {
      const newDistance = d + edgeDistance;
      if(newDistance < distance[edgeNode]) {
        distance[edgeNode] = newDistance;
        pq.push([edgeNode, newDistance]);
      }
    })
  }

  return distance;
}
