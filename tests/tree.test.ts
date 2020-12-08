import { branch, isBranch, leaf, Leaf, Tree } from "../src/tree/tree"

describe('tree', () => {
    it('numbers of leaves and branches', () => {
        const tree = leaf(10);
        expect(treeSizeWithFold(tree)).toBe(1)
    });

    it('numbers of leaves and branches', () => {
        const tree = branch(leaf(10), leaf(12));
        expect(treeSizeWithFold(tree)).toBe(3)
    });

    it('maximum number in the tree', () => {
        const tree = leaf(20);
        expect(maximumWithFold(tree)).toBe(20);
    })

    it('maximum number in the tree', () => {
        const tree = branch(branch(leaf(10), leaf(12)), branch(leaf(20), leaf(24)));
        expect(maximumWithFold(tree)).toBe(24)
    });

    it('maximum number in the tree', () => {
        const tree = branch(branch(leaf(10), leaf(12)), leaf(20));
        expect(maximumWithFold(tree)).toBe(20)
    });

    it('map to another tree', () => {
        const double = (value: number) => value * 2

        const tree = branch(branch(leaf(10), leaf(12)), leaf(20));
        const treeMapped = branch(branch(leaf(20), leaf(24)), leaf(40));

        expect(mapWithFold(double, tree)).toEqual(treeMapped)
    });

    it('maximum with fold', () => {
        const tree = branch(branch(leaf(10), leaf(12)), leaf(20));

        expect(maximumWithFold(tree)).toEqual(20)
    });

    it('depth with fold', () => {
        const treeJustLeaf = leaf(0)

        const tree = branch(leaf(0), leaf(1));

        const treeWithMoreBranches = branch(branch(leaf(2), leaf(3)), leaf(1));

        expect(depth(treeJustLeaf)).toEqual(0)
        expect(depth(tree)).toEqual(1)
        expect(depth(treeWithMoreBranches)).toEqual(2)
    });
});

const maximum = (tree: Tree<number>): number =>
    isBranch(tree)
        ? Math.max(maximum(tree.left), maximum(tree.right))
        : tree.value;

const maximumWithFold = (tree: Tree<number>): number => {
    return fold(
        Math.max,
        tree => tree.value,
        tree
    )
}

const depth = <T>(tree: Tree<T>): number => {
    return fold(
        (leftValue: number, rightValue: number) => {
            return Math.max(leftValue, rightValue) + 1
        },
        (_leaf) => {
            return 0
        },
        tree
    )
}

const treeSize = <T>(tree: Tree<T>): number =>
    isBranch(tree)
        ? treeSize(tree.left) + treeSize(tree.right) + 1
        : 1;

const treeSizeWithFold = <T>(tree: Tree<T>): number =>
    fold(
        (leftValue, rightValue) => {
            return leftValue + rightValue + 1
        },
        () => {
            return 1
        },
        tree
    )

const map = <A, B>(fn: (a: A) => B, tree: Tree<A>): Tree<B> => 
    isBranch(tree)
        ? branch(map(fn, tree.left), map(fn, tree.right))
        : leaf(fn(tree.value));


const mapWithFold = <A, B>(fn: (a: A) => B, tree: Tree<A>): Tree<B> => 
    fold(
        (leftValue, rightValue) => {
            return branch(leftValue, rightValue)
        },
        _leaf => {
            return leaf(fn(_leaf.value))
        },
        tree
    )

const fold = <A, B>(fnBranch: (left: B, right: B) => B, fnLeaf: (leaf: Leaf<A>) => B, tree: Tree<A>): B => {
    if (isBranch(tree)) {
        return fnBranch(fold(fnBranch, fnLeaf, tree.left), fold(fnBranch, fnLeaf, tree.right))
    }
    return fnLeaf(tree);

}