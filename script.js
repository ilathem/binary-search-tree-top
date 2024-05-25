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
    const unique = [...new Set(data)];
    const end = unique.length - 1;
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
    };
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
        while (node.left !== null) {
          minimumValue = node.left.data;
          node = node.left;
        }
        root.data = minimumValue;
        root.right = deleteRec(root.right, minimumValue);
      }
      return root;
    };
    this.root = deleteRec(this.root, value);
  }

  find(value) {
    if (value === this.root.data) return this.root;
    let node = this.root;
    while (node) {
      if (value < node.data) node = node.left;
      if (value > node.data) node = node.right;
      if (value === node.data) return node;
    }
    return null;
  }

  levelOrder(callback = (node) => console.log(node.data)) {
    const levelOrderIter = (root, callback) => {
      const queue = [];
      queue.push(root);
      while (queue.length > 0) {
        const nodeToVisit = queue.shift();
        if (nodeToVisit.left) queue.push(nodeToVisit.left);
        if (nodeToVisit.right) queue.push(nodeToVisit.right);
        callback(nodeToVisit);
      }
    };
    const levelOrderRec = (list, callback) => {
      if (list.length === 0) return;
      const children = [];
      list.forEach((node) => {
        callback(node);
        if (node.left) children.push(node.left);
        if (node.right) children.push(node.right);
      });
      levelOrderRec(children, callback);
    };
    levelOrderIter(this.root, callback);
    // levelOrderRec([this.root], callback);
  }

  inOrder(callback) {
    const inOrderRec = (node, callback) => {
      if (node.left) inOrderRec(node.left, callback);
      callback(node);
      if (node.right) inOrderRec(node.right, callback);
    };
    if (callback) inOrderRec(this.root, callback);
    else {
      const array = [];
      inOrderRec(this.root, (node) => array.push(node.data));
      return array;
    }
  }

  preOrder(callback) {
    const preOrderRec = (node, callback) => {
      callback(node);
      if (node.left) preOrderRec(node.left, callback);
      if (node.right) preOrderRec(node.right, callback);
    };
    if (callback) preOrderRec(this.root, callback);
    else {
      const array = [];
      preOrderRec(this.root, (node) => array.push(node.data));
      return array;
    }
  }

  postOrder(callback) {
    const postOrderRec = (node, callback) => {
      if (node.left) postOrderRec(node.left, callback);
      if (node.right) postOrderRec(node.right, callback);
      callback(node);
    };
    if (callback) postOrderRec(this.root, callback);
    else {
      const array = [];
      postOrderRec(this.root, (node) => array.push(node.data));
      return array;
    }
  }

  height(node) {
    let height = -1;
    const levelOrderRec = (list) => {
      if (list.length === 0) return;
      const children = [];
      list.forEach((node) => {
        if (node.left) children.push(node.left);
        if (node.right) children.push(node.right);
      });
      height++;
      levelOrderRec(children);
    };
    levelOrderRec([node]);
    return height;
  }

  depth(target) {
    let depth = 0;
    let nodeFound = false;
    const levelOrderRec = (list) => {
      if (list.length === 0) return;
      const children = [];
      list.forEach((node) => {
        if (node.data === target.data) nodeFound = true;
        if (node.left && !nodeFound) children.push(node.left);
        if (node.right && !nodeFound) children.push(node.right);
      });
      if (nodeFound) return;
      depth++;
      levelOrderRec(children);
    };
    levelOrderRec([this.root]);
    return depth;
  }

  isBalanced() {
    let isBalanced = true;
    this.preOrder((node) => {
      let leftSubTreeHeight = 0;
      if (node.left !== null) leftSubTreeHeight = this.height(node.left);
      let rightSubTreeHeight = 0;
      if (node.right !== null) rightSubTreeHeight = this.height(node.right);
      if (Math.abs(leftSubTreeHeight - rightSubTreeHeight) > 1)
        isBalanced = false;
    });
    return isBalanced;
  }

  rebalance() {
    console.log("\nRebalancing tree...\n");
    const treeArray = [];
    this.preOrder((node) => treeArray.push(node.data));
    const unique = [...new Set(treeArray)];
    const end = unique.length - 1;
    const sorted = mergeSort(unique);
    this.root = this.buildTree(sorted, 0, end);
  }
}

const getArrayRandom = (length) => {
  let array = new Array();
  for (let i = 0; i < length; i++) {
    array[i] = Math.floor(Math.random() * 100);
  }
  return array;
};

const driverScript = () => {
  const tree = new Tree(getArrayRandom(16));
  console.log(`Tree ${tree.isBalanced() ? "is" : "is not"} balanced`);
  prettyPrint(tree.root);
  console.log("\nPrinting in level order");
  let levelOrder = [];
  tree.levelOrder((node) => levelOrder.push(node.data));
  console.log(levelOrder);
  console.log("\nPrinting in pre order");
  console.log(tree.preOrder());
  console.log("\nPrinting in post order");
  console.log(tree.postOrder());
  console.log("\nPrinting in order");
  console.log(tree.inOrder());
  for (let i = 0; i < 6; i++) {
    const randomNum = Math.floor(Math.random() * 100) + 100;
    console.log(`Adding ${randomNum}`);
    tree.insert(randomNum);
  }
  prettyPrint(tree.root);
  console.log(`Tree ${tree.isBalanced() ? "is" : "is not"} balanced`);
  tree.rebalance();
  console.log(`Tree ${tree.isBalanced() ? "is" : "is not"} balanced`);
  levelOrder = [];
  tree.levelOrder((node) => levelOrder.push(node.data));
  console.log(levelOrder);
  console.log("\nPrinting in pre order");
  console.log(tree.preOrder());
  console.log("\nPrinting in post order");
  console.log(tree.postOrder());
  console.log("\nPrinting in order");
  console.log(tree.inOrder());
  console.log('\n\nFinal Tree:');
  prettyPrint(tree.root);
};

driverScript();
