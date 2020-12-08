export type Tree<A> = Leaf<A> | Branch<A>;

export type Leaf<T> = {
    type: "leaf";
    value: T
} 

export const isLeaf = <T>(tree: Tree<T>): tree is Leaf<T> => {
  return tree.type === 'leaf'
} 

export const isBranch = <T>(tree: Tree<T>): tree is Branch<T> => {
  return tree.type === 'branch'
} 

export type Branch<T> = {
  type: "branch";
  left: Tree<T>;
  right: Tree<T>;
}

export const leaf = <T>(value: T): Leaf<T> => {
  return {
    type: "leaf",
    value
  }
}

export const branch = <T>(left: Tree<T>, right: Tree<T>): Branch<T> => {
  return {
    type: "branch",
    left,
    right
  }
}
