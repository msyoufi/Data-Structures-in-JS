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
}
