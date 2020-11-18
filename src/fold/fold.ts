import { List } from "../list/list"
import { reverse } from "../functions/functions"

const foldRight = <A, B>(inputList: List<A>, injectedValue: B, f: (accumulator: B, listItem: A) => B): B => {
  switch (inputList.tag) {
    case "nil": return injectedValue;
    case "cons": return f(foldRight(inputList.tail, injectedValue, f), inputList.head);
  }
};

const foldRightWithFoldLeft = <A, B>(inputList: List<A>, injectedValue: B, f: (accumulator: B, listItem: A) => B): B => {
  return foldLeft(reverse(inputList), injectedValue, f);
}

const foldLeftRecursive = <A, B>(inputList: List<A>, z: B, f: (accumulator: B, listItem: A) => B): B => {
  switch (inputList.tag) {
    case "nil": return z;
    case "cons": return f(foldLeftRecursive(inputList.tail, z, f), inputList.head);
  }
};

const foldLeft = <A, B>(inputList: List<A>, injectedValue: B, f: (accumulator: B, listItem: A) => B): B => {
  let state = injectedValue;
  while (inputList.tag !== "nil") {
    state = f(state, inputList.head);
    inputList = inputList.tail;
  }
  return state;
};


export {
  foldRight,
  foldRightWithFoldLeft,
  foldLeft,
  foldLeftRecursive
}
