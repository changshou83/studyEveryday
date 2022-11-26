function swap<T>(array: T[], a: number, b: number) {
  const temp: T = array[a];
  array[a] = array[b];
  array[b] = temp;
}

function getParentIdx(child: number) {
  return Math.floor((child+1)/2)-1;
}

/**
 * A priority queue implemented with a binary heap. The heap is in descending order by default
 */
export class BinaryHeap<T> implements Iterable<T> {
  _data: T[] = [];
  constructor(private compare: (a: T, b: T) => number = descend) {}

  /**
   * Creates a new binary heap from an array like or iterable object
   */
  static from<T>(
    collection: ArrayLike<T> | Iterable<T> | BinaryHeap<T>
  ): BinaryHeap<T>;
  static from<T>(
    collection: ArrayLike<T> | Iterable<T> | BinaryHeap<T>,
    options: { 
      compare?: (a: T, b: T) => number
    }
  ): BinaryHeap<T>;
  static from<T, U, V>(
    collection: ArrayLike<T> | Iterable<T> | BinaryHeap<T>,
    options: {
      compare?: (a: U, b: U) => number;
      map: (value: T, index: number) => U;
      thisArg?: V;
    }
  ): BinaryHeap<U>;
  static from<T, U, V>(
    collection: ArrayLike<T> | Iterable<T> | BinaryHeap<T>,
    options?: {
      compare?: (a: U, b: U) => number;
      map?: (value: T, index: number) => U;
      thisArg?: V;
    }
  ): BinaryHeap<U> {
    let result: BinaryHeap<U>;
    let unmappedValues: ArrayLike<T> | Iterable<T> = [];

    if(collection instanceof BinaryHeap) {
      result = new BinaryHeap(
        options?.compare ?? (collection as unknown as BinaryHeap<U>).compare
      );
      if(options?.compare || options?.map) {
        unmappedValues = collection._data;
      } else {
        result._data = Array.from(collection._data as unknown as U[]);
      }
    } else {
      result = options?.compare
        ? new BinaryHeap(options.compare)
        : new BinaryHeap();
      unmappedValues = collection;
    }

    const values: Iterable<U> = options?.map
      ? Array.from(unmappedValues, options.map, options.thisArg)
      : unmappedValues as U[];
    result.push(...values);

    return result;
  }

  /**
   * The amount of values stored in the binary heap.
   */
  get length(): number {
    return this._data.length;
  }

  /**
   * Returns the greatest value in the binary heap, or undefined if it is empty.
   */
  peek(): T | undefined {
    return this._data[0];
  }

  /**
   * Removes the greatest value from the binary heap and returns it, or null if it empty.
   */
  pop(): T | undefined {
    const size: number = this._data.length - 1;
    swap(this._data, 0, size);

    let parent = 0;
    let right: number = 2 * (parent + 1);
    let left: number = right - 1;
    while(left < size) {
      const greatestChild = right === size || this.compare(this._data[left], this._data[right]) <= 0 ? left : right;

      if(this.compare(this._data[greatestChild], this._data[parent]) < 0) {
        swap(this._data, parent, greatestChild);
        parent = greatestChild;
      } else {
        break;
      }

      right = 2 * (parent + 1);
      left = right - 1;
    }

    return this._data.pop();
  }

  /**
   * Adds values to the binary heap.
   */
  push(...values: T[]): number {
    for(const value of values) {
      let child: number = this._data.length;
      let parent: number = getParentIdx(child);

      this._data.push(value);
      while(
        child !== 0 && this.compare(this._data[child], this._data[parent]) < 0
      ) {
        swap(this._data, parent, child);
        child = parent;
        parent = getParentIdx(child);
      }
    }

    return this._data.length;
  }

  /**
   * Removes all values from the binary heap.
   */
  clear() {
    this._data = [];
  }

  /**
   * Checks if the binary heap is empty.
   */
  isEmpty(): boolean {
    return this._data.length === 0;
  }

  /**
   * Returns a iterator for retrieving and removing values from the binary heap.
   */
  *drain(): IterableIterator<T> {
    while(!this.isEmpty()) {
      yield this.pop() as T;
    }
  }
  
  *[Symbol.iterator](): IterableIterator<T> {
    yield* this.drain();
  }
}

function ascend<T>(a: T, b: T) {
  return a < b ? -1 : a > b ? 1 : 0;
}
function descend<T>(a: T, b: T) {
  return a < b ? 1 : a > b ? -1 : 0;
}
