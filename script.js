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
    const unique = [...new Set(data)]
    const end = unique.length - 1
    const sorted = mergeSort(unique);
    this.root = this.buildTree(sorted, 0, end);
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
  
  deleteItem(value) {
    const deleteRec = (root, val) => {
      if (root === null) return root;
      if (val < root.data) {
        root.left = deleteRec(root.left, val);
      } else if (val > root.data) {
        root.right = deleteRec(root.right, val);
      } else {
        if (root.left === null) return root.right;
        else if (root.right === null) return root.left;
        let node = root.right;
        let minimumValue = node.data;
        while(node.left !== null) {
          minimumValue = node.left.data;
          node = node.left;
        }
        root.data = minimumValue;
        root.right = deleteRec(root.right, minimumValue);
      }
      return root;
    }
    this.root = deleteRec(this.root, value);
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);
tree.deleteItem(8)
prettyPrint(tree.root);
tree.deleteItem(3)
prettyPrint(tree.root);
tree.deleteItem(5)
prettyPrint(tree.root);