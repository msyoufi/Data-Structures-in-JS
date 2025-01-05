class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  // Time complexity O(1)
  set(key, value) {
    const index = this._hash(key);

    if (!this.keyMap[index])
      this.keyMap[index] = [];

    for (const data of this.keyMap[index])
      if (key === data[0]) {
        data[1] = value;
        return;
      }

    this.keyMap[index].push([key, value]);
  }

  // Time complexity O(1)
  get(key) {
    const index = this._hash(key);
    const collection = this.keyMap[index];

    if (!collection) return null;

    for (const data of collection)
      if (key === data[0])
        return data[1];

    return null;
  }

  // Time complexity O(1)
  delete(key) {
    const index = this._hash(key);
    const collection = this.keyMap[index];

    if (!collection) return null;

    let i = 0;
    for (const data of collection) {
      if (key === data[0]) {
        collection.splice(i, 1);
        return data;
      }

      i++;
    }

    return null;
  }

  keys() {
    const keys = [];

    for (const collection of this.keyMap) {
      if (!collection) continue;

      for (const data of collection)
        keys.push(data[0]);
    }

    return keys;
  }

  values() {
    const values = [];

    for (const collection of this.keyMap) {
      if (!collection) continue;

      for (const data of collection) {
        if (values.includes(data[1])) continue;
        values.push(data[1]);
      }
    }

    return values;
  }

  entries() {
    const entries = [];

    for (const collection of this.keyMap) {
      if (!collection) continue;

      for (const data of collection)
        entries.push(data);
    }

    return entries;
  }

  _hash(key) {
    let hash = 0;
    const IterCount = Math.min(key.length, 100);

    for (let i = 0; i < IterCount; i++) {
      hash = hash * 37 + key.charCodeAt(i);
      hash %= this.keyMap.length;
    }

    return hash;
  }
}

