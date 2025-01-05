class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  // Time complexity O(log(n))
  insert(value) {
    this.values.push(value);

    let valueIndex = this.values.length - 1;
    let parentIndex = null, parentValue = null;

    while (valueIndex > 0) {
      parentIndex = this._getParentIndex(valueIndex);
      parentValue = this.values[parentIndex];

      if (parentValue >= value) break;

      this.values[parentIndex] = value;
      this.values[valueIndex] = parentValue;
      valueIndex = parentIndex;
    }

    return this;
  }

  // Time complexity O(log(n))
  extractMax() {
    if (!this.values.length) return null;

    const max = this.values[0];
    const end = this.values.pop();

    if (this.values.length) {
      this.values[0] = end;
      this._sinkDown();
    }

    return max;
  }


  _sinkDown() {
    const heapLen = this.values.length;
    const element = this.values[0];

    let idx = 0,
      swapIdx = null,
      leftIdx = null,
      rightIdx = null;

    while (idx < heapLen) {
      leftIdx = this._getChildIndex(idx, 'l');
      rightIdx = this._getChildIndex(idx, 'r');

      if (leftIdx && rightIdx)
        swapIdx = this.values[rightIdx] > this.values[leftIdx]
          ? rightIdx
          : leftIdx;

      else if (rightIdx) swapIdx = rightIdx;
      else if (leftIdx) swapIdx = leftIdx;
      else break;

      if (this.values[swapIdx] <= element) break;

      this.values[idx] = this.values[swapIdx];
      this.values[swapIdx] = element;
      idx = swapIdx;
    }
  }

  _getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  _getChildIndex(index, side) {
    let childIndex = null;

    if (side === 'r')
      childIndex = (index * 2) + 2;
    else
      childIndex = (index * 2) + 1;

    return childIndex < this.values.length ? childIndex : null;
  }
}