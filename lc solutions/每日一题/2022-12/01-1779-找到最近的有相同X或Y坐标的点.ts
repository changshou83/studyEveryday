function nearestValidPoint(x: number, y: number, points: number[][]): number {
    let res = -1;
    let minDist = Infinity;
    for(let i = 0; i < points.length; i++) {
        const [_x, _y] = points[i];
        if(_x === x || _y === y) {
            const dist = Math.abs(x - _x) + Math.abs(y - _y);
            if(dist < minDist) {
                minDist = dist;
                res = i;
            }
        }
    }
    return res;
};
