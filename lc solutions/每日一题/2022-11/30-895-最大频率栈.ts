class FreqStack {
  freq: Map<number, number>
  group: Map<number, number[]>
  maxFreq: number
  constructor() {
    this.freq = new Map()
    this.group = new Map()
    this.maxFreq = 0
  }
  push(val: number): void {
    this.freq.set(val, (this.freq.get(val) || 0) + 1)
    const freq = this.freq.get(val)
    if(freq) {
      if (!this.group.has(freq)) {
        this.group.set(freq, [])
      }
      this.group.get(freq)!.push(val)
      this.maxFreq = Math.max(this.maxFreq, freq)
    }
  }
  pop(): number {
    const val = this.group.get(this.maxFreq)![this.group.get(this.maxFreq)!.length - 1]
    this.freq.set(val, this.freq.get(val)! - 1)
    this.group.get(this.maxFreq)?.pop()
  
    if(this.group.get(this.maxFreq)?.length === 0) {
      this.maxFreq--
    }
    return val;
  }
}
