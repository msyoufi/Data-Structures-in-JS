class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  // Time complexity O(log(n))
  enqueue(value, priority) {
    const node = new Node(value, priority);
    this.values.push(node);

    let idx = this.values.length - 1;
    let parentIdx = null;

    while (idx > 0) {
      parentIdx = this._getParentIndex(idx);

      if (this.values[parentIdx].priority <= node.priority)
        break;

      this.values[idx] = this.values[parentIdx];
      this.values[parentIdx] = node;
      idx = parentIdx;
    }

    return this;
  }

  // Time complexity O(log(n))
  deqeueu() {
    if (!this.values.length) return null;

    const topPrio = this.values[0];
    const endPrio = this.values.pop();

    if (this.values.length) {
      this.values[0] = endPrio;
      this._sinkDown();
    }

    return topPrio;
  }

  _sinkDown() {
    const queueLen = this.values.length;
    const element = this.values[0];

    let idx = 0,
      swapIdx = null,
      leftIdx = null,
      rightIdx = null;

    while (idx < queueLen) {
      leftIdx = this._getChildIndex(idx, 'l');
      rightIdx = this._getChildIndex(idx, 'r');

      if (leftIdx && rightIdx)
        swapIdx = this.values[rightIdx].priority < this.values[leftIdx].priority
          ? rightIdx
          : leftIdx;

      else if (leftIdx) swapIdx = leftIdx;
      else if (rightIdx) swapIdx = rightIdx;
      else break;

      if (this.values[swapIdx].priority >= element.priority) break;

      this.values[idx] = this.values[swapIdx];
      this.values[swapIdx] = element;
      idx = swapIdx;
    }
  }

  _getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  _getChildIndex(index, side) {
    let childIdx = null;

    if (side === 'r')
      childIdx = (index * 2) + 2;
    else
      childIdx = (index * 2) + 1;

    return childIdx < this.values.length ? childIdx : null;
  }
}