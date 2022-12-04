// 回溯解法
function closestCost(baseCosts: number[], toppingCosts: number[], target: number): number {
  let res = Math.min(...baseCosts)
  function backtrace(toppingCosts: number[], pos: number, curCost: number, target: number): void {
    const a = Math.abs(res - target), b = Math.abs(curCost - target);
    // 返回最接近 target 的甜点成本
    if(a < curCost - target) return;
    if(a > b) res = curCost;
    // 返回成本较低的那种
    if(a === b) res = Math.min(res, curCost);
    if(pos === toppingCosts.length) return;

    // 三种情况：加调料，加一份和加两份
    backtrace(toppingCosts, pos + 1, curCost + toppingCosts[pos] * 2, target)
    backtrace(toppingCosts, pos + 1, curCost + toppingCosts[pos], target)
    backtrace(toppingCosts, pos + 1, curCost, target)
  }
  for(const cost of baseCosts) {
    backtrace(toppingCosts, 0, cost, target)
  }
  return res;
}
