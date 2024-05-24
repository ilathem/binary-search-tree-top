import mergeSort from "./mergeSort.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};


class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(data = []) {
    const end = data.length - 1
    this.root = this.buildTree(mergeSort(data), 0, end);
  }

  buildTree(data, start, end) {
    if (start > end) return null;
    const mid = parseInt((start + end) / 2);
    const node = new Node(data[mid]);
    node.left = this.buildTree(data, start, mid - 1);
    node.right = this.buildTree(data, mid + 1, end);
    return node;
  }

  insert(value) {
    const insertRec = (root, val) => {
      if (root == null) {
        root = new Node(value);
        return root;
      }
      if (val < root.data) {
        root.left = insertRec(root.left, val);
      } else if (val > root.data) {
        root.right = insertRec(root.right, val);
      }
      return root;
    }
    this.root = insertRec(this.root, value);
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);
tree.insert(50);
prettyPrint(tree.root);
tree.insert(50);
prettyPrint(tree.root);