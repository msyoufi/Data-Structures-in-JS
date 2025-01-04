class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Time complexity O(log(n))
  insert(value) {
    const newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    let parent = null;

    while (current) {
      if (value === current.value)
        return null;

      parent = current;
      current = value > current.value
        ? current.right
        : current.left;
    }

    if (value > parent.value)
      parent.right = newNode;
    else
      parent.left = newNode;

    return this;
  }

  // Time complexity O(log(n))
  find(value) {
    let current = this.root;

    while (current) {
      if (value === current.value)
        return current.value;

      current = value > current.value
        ? current.right
        : current.left;
    }

    return null;
  }

  BFS() {
    if (!this.root) return [];

    const queue = [this.root];
    const values = [];
    let node = null;

    while (queue.length) {
      node = queue.shift();
      values.push(node.value);

      if (node.left)
        queue.push(node.left);

      if (node.right)
        queue.push(node.right);
    }

    return values;
  }

  DFS(order) {
    if (!this.root) return [];

    const values = [];

    switch (order) {
      case 'pre':
        preOrder(this.root);
        break;
      case 'post':
        postOrder(this.root);
        break;
      case 'in':
        inOrder(this.root);
    }

    function preOrder(node) {
      values.push(node.value);
      if (node.left) preOrder(node.left);
      if (node.right) preOrder(node.right);
    }

    function postOrder(node) {
      if (node.left) postOrder(node.left);
      if (node.right) postOrder(node.right);
      values.push(node.value);
    }

    function inOrder(node) {
      if (node.left) inOrder(node.left);
      values.push(node.value);
      if (node.right) inOrder(node.right);
    }

    return values;
  }
}

const tree = new BinarySearchTree();

tree.insert(55);
tree.insert(52);
tree.insert(15);
tree.insert(60);
tree.insert(1);
tree.insert(32);
tree.insert(76);
tree.insert(7);
tree.insert(56);

console.log(tree.BFS());
console.log(tree.DFS('pre'));
console.log(tree.DFS('post'));
console.log(tree.DFS('in'));
