class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  // Time complexity O(1)
  push(value) {
    const node = new Node(value);
    node.next = this.first;
    this.first = node;

    if (!this.size)
      this.last = node;

    return ++this.size;
  }

  // Time complexity O(1)
  pop() {
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
