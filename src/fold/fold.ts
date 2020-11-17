import { List } from "../list/list"
import { reverse } from "../functions/functions"

const foldRight = <A, B>(l: List<A>, z: B, f: (a: A, b: B) => B): B => {
  switch (l.tag) {
    case "nil": return z;
    case "cons": return f(l.head, foldRight(l.tail, z, f));
  }
};

const foldRightWithFoldLeft = <A, B>(l: List<A>, injectedValue: B, f: (accumulator: B, listItem: A) => B): B => {
  return foldLeft(reverse(l), injectedValue, f);
}

const foldLeftRecursive = <A, B>(l: List<A>, z: B, f: (a: A, b: B) => B): B => {
  switch (l.tag) {
    case "nil": return z;
    case "cons": return f(l.head, foldLeftRecursive(l.tail, z, f));
  }
};

const foldLeft = <A, B>(l: List<A>, injectedValue: B, f: (accumulator: B, listItem: A) => B): B => {
  let state = injectedValue;
  while (l.tag !== "nil") {
    state = f(state, l.head);
    l = l.tail;
  }
  return state;
};


export {
  foldRight,
  foldRightWithFoldLeft,
  foldLeft,
  foldLeftRecursive
}
