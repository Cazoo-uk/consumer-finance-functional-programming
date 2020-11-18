import { list, List } from "../list/list"
import { isNil, nil } from "../nil/nil"
import { cons } from "../cons/cons"
import { foldLeft, foldRight } from "../fold/fold"

const tail = <T>(list: List<T>): List<T> => {
  if (!isNil(list)) {
    return list.tail;
  }

  return nil;
}

const setHead = <T>(list: List<T>, head: T): List<T> => cons(head, tail(list))

const drop = <A>(l: List<A>, n: number): List<A> =>
  (n <= 0 || isNil(l)) ?
    l :
    drop(tail(l), n - 1)

const dropWhile = <A>(l: List<A>, f: (a: A) => boolean): List<A> =>
  (isNil(l) || !f(l.head)) ?
    l :
    dropWhile(tail(l), f)


const init = <A>(l: List<A>): List<A> =>
  (isNil(l) || isNil(l.tail)) ?
    nil :
    cons(l.head, init(l.tail))

const reverse = <A>(inputList: List<A>): List<A> => {
  return foldLeft(inputList, list(), flip(cons));
}

const length = <A>(list: List<A>): number => {
  return foldRight(list, 0, a => {
    return a + 1;
  })
}

const flip = <A, B, TReturn>(fn: (a: A, b: B) => TReturn) => {
  return (c: B, d: A) => {
    return fn(d, c);
  }
}

export {
  length,
  reverse,
  init,
  dropWhile,
  drop,
  setHead,
  tail,
  flip
}
