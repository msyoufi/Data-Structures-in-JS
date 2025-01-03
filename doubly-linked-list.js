class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
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

    const isNearEnd = index > this.length / 2;
    let rounds = index;
    let node = this.head;

    if (isNearEnd) {
      rounds = this.length - index - 1;
      node = this.tail
    }

    for (let i = 0; i < rounds; i++)
      node = isNearEnd ? node.prev : node.next;

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

    if (!index)
      return this.unshift(value);

    const newNode = new Node(value);
    const prevNode = this.get(index - 1);
    const nextNode = prevNode.next;

    newNode.prev = prevNode;
    newNode.next = nextNode;
    prevNode.next = newNode;
    nextNode.prev = newNode;

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

    const currentNode = this.get(index);
    const prevNode = currentNode.prev;
    const nextNode = currentNode.next;

    prevNode.next = nextNode;
    nextNode.prev = prevNode;
    currentNode.next = null;
    currentNode.prev = null;

    this.length--;
    return currentNode;
  }

  // Time complexity O(1)
  push(value) {
    const node = new Node(value);

    if (this.length) {
      this.tail.next = node;
      node.prev = this.tail;
    } else
      this.head = node;

    this.tail = node;

    this.length++;
    return this.length;
  }

  // Time complexity O(1)
  pop() {
    if (!this.length) return null;

    const lastNode = this.tail;

    if (this.length == 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = lastNode.prev;
      this.tail.next = null;
      lastNode.prev = null;
    }

    this.length--;
    return lastNode;
  }

  // Time complexity O(1)
  unshift(value) {
    const node = new Node(value);

    if (this.length) {
      this.head.prev = node;
      node.next = this.head;
    } else
      this.tail = node;

    this.head = node;

    this.length++;
    return this.length;
  }

  // Time complexity O(1)
  shift() {
    if (!this.length) return null;

    const firstNode = this.head;

    if (this.length == 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = firstNode.next;
      this.head.prev = null;
      firstNode.next = null;
    }

    this.length--;
    return firstNode;
  }

  reverse() {
    if (this.length < 2) return this;

    let currentNode = this.head,
      nextNode = null,
      prevNode = null;

    this.head = this.tail;
    this.tail = currentNode;

    while (currentNode) {
      nextNode = currentNode.next;
      currentNode.next = prevNode;
      currentNode.prev = nextNode;
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