const { NotImplementedError } = require("../extensions/index.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class Node {
    constructor(data) {
        this.data = data;
        this.right = null;
        this.left = null;
    }
}
class BinarySearchTree {
    constructor() {
        this.tree = null;
    }

    root() {
        return this.tree;
    }

    add(data) {
        this.tree = addInto(this.tree, data);
        function addInto(node, data) {
            if (!node) {
                return new Node(data);
            }

            if (node.data === data) {
                return data;
            }

            if (data < node.data) {
                node.left = addInto(node.left, data);
            } else {
                node.right = addInto(node.right, data);
            }

            return node;
        }
    }

    has(data) {
        return searchInto(this.tree, data);

        function searchInto(node, data) {
            if (!node) {
                return false;
            }

            if (node.data === data) {
                return true;
            }

            return node.data > data ? searchInto(node.left, data) : searchInto(node.right, data);
        }
    }

    find(data) {
        if (!this.tree) return false;

        let node = this.tree;
        let found = false;
        while (node && !found) {
            if (data < node.data) {
                node = node.left;
            } else if (data > node.data) {
                node = node.right;
            } else {
                found = node;
            }
        }

        if (!found) return null;
        return found;
    }

    remove(data) {
        this.tree = removeNode(this.tree, data);
        function removeNode(node, data) {
            if (!node) {
                return null;
            }

            if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;
            } else if (node.data < data) {
                node.right = removeNode(node.right, data);
                return node;
            } else {
                if (!node.left && !node.right) {
                    node = null;
                    return null;
                }

                if (!node.left) {
                    node = node.right;
                    return node;
                }

                if (!node.right) {
                    node = node.left;
                    return node;
                }

                let minFromRight = node.right;
                while (minFromRight.left) {
                    minFromRight = minFromRight.left;
                }

                node.data = minFromRight.data;
                node.right = removeNode(node.right, minFromRight.data);
                return node;
            }
        }
    }

    min() {
        if (!this.tree) {
            return;
        }

        let node = this.tree;
        while (node.left) {
            node = node.left;
        }

        return node.data;
    }

    max() {
        if (!this.tree) {
            return;
        }

        let node = this.tree;
        while (node.right) {
            node = node.right;
        }
        return node.data;
    }
}

module.exports = {
    BinarySearchTree,
};
