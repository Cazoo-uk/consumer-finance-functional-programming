import { branch, isBranch, leaf, Tree } from "../src/tree/tree"

describe('tree', () => {
    it('numbers of leaves and branches', () => {
        const tree = leaf(10);
        expect(treeSize(tree)).toBe(1)
    });

    it('numbers of leaves and branches', () => {
        const tree = branch(leaf(10), leaf(12));
        expect(treeSize(tree)).toBe(3)
    });

    it('maximum number in the tree', () => {
        const tree = leaf(20);
        expect(maximum(tree)).toBe(20);
    })

    it('maximum number in the tree', () => {
        const tree = branch(branch(leaf(10), leaf(12)), branch(leaf(20), leaf(24)));
        expect(maximum(tree)).toBe(24)
    });

    it('maximum number in the tree', () => {
        const tree = branch(branch(leaf(10), leaf(12)), leaf(20));
        expect(maximum(tree)).toBe(20)
    });
});

const maximum = (tree: Tree<number>): number =>
    isBranch(tree)
        ? Math.max(maximum(tree.left), maximum(tree.right))
        : tree.value;

const treeSize = <T>(tree: Tree<T>): number =>
    isBranch(tree)
        ? treeSize(tree.left) + treeSize(tree.right) + 1
        : 1;
