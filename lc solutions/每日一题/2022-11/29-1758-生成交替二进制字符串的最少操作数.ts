function minOperations(s: string) {
    if(s.length === 1) return 0;

    let cnt = 0, prev = s[0];
    for(let i = 1; i < s.length; i++) {
        if(s[i] !== prev) prev = s[i];
        else {
            cnt++;
            prev = s[i] === '1' ? '0' : '1';
        }
    }
    return Math.min(cnt, s.length - cnt);
};
