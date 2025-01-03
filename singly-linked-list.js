class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Time complexity O(n)
  get(index) {
    if (
      index < 0
      || index >= this.length
      || !this.length
    )
      return null;

    let node = this.head;

    for (let i = 0; i < index; i++)
      node = node.next;

    return node;
  }

  // Time complexity O(n)
  set(index, value) {
    const node = this.get(index);
    if (!node) return null;
    node.value = value;
    return node;
  }

  // Time complexity O(n)
  insert(index, value) {
    if (index < 0 || index > this.length)
      return null;

    if (index == this.length)
      return this.push(value);

    if (!this.length || !index)
      return this.unshift(value);

    const newNode = new Node(value);
    const prevNode = this.get(index - 1);

    newNode.next = prevNode.next;
    prevNode.next = newNode;

    this.length++;
    return this.length;
  }

  // Time complexity O(n)
  remove(index) {
    if (
      index < 0
      || index >= this.length
      || !this.length
    )
      return null;

    if (index == this.length - 1)
      return this.pop();

    if (!index)
      return this.shift();

    const prevNode = this.get(index - 1);
    const currentNode = prevNode.next;

    prevNode.next = currentNode.next;
    currentNode.next = null;
    this.length--;
    return currentNode;
  }

  // Time complexity O(1)
  push(value) {
    const node = new Node(value);

    if (this.length)
      this.tail.next = node;
    else
      this.head = node;

    this.tail = node;

    this.length++;
    return this.length;
  }

  // Time complexity O(n)
  pop() {
    if (!this.length) return null;

    let prevNode = null;
    let currentNode = this.head;

    while (currentNode.next) {
      prevNode = currentNode;
      currentNode = currentNode.next;
    }

    this.tail = prevNode;

    if (this.length == 1)
      this.head = null;
    else
      this.tail.next = null;

    this.length--;
    return currentNode;
  }

  // Time complexity O(1)
  unshift(value) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;

    if (!this.length)
      this.tail = node;

    this.length++;
    return this.length;
  }

  // Time complexity O(1)
  shift() {
    if (!this.length) return null;

    const firstNode = this.head;
    this.head = firstNode.next;

    if (this.length == 1)
      this.tail = null;

    firstNode.next = null;
    this.length--;
    return firstNode;
  }

  // Time complexity O(n)
  reverse() {
    let currentNode = this.head,
      nextNode = null,
      prevNode = null;

    this.head = this.tail;
    this.tail = currentNode;

    while (currentNode) {
      nextNode = currentNode.next;
      currentNode.next = prevNode;
      prevNode = currentNode;
      currentNode = nextNode;
    }

    return this;
  }

  toArray() {
    const values = [];
    let node = this.head;

    while (node) {
      values.push(node.value);
      node = node.next;
    }

    return values;
  }

  static from(arr) {
    const list = new this;

    for (const value of arr)
      list.push(value);

    return list;
  }
}