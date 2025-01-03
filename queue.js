class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  // Time complexity O(1)
  enqueue(value) {
    const node = new Node(value);

    if (this.size)
      this.last.next = node;
    else
      this.first = node;

    this.last = node;
    return ++this.size;
  }

  // Time complexity O(1)
  dequeue() {
    if (!this.size) return null;

    const firstNode = this.first;
    this.first = firstNode.next;

    if (this.size == 1)
      this.last = null;
    else
      firstNode.next = null;

    this.size--;
    return firstNode.value;
  }

  toArray() {
    const values = [];
    let node = this.first;

    while (node) {
      values.push(node.value);
      node = node.next;
    }

    return values;
  }
}