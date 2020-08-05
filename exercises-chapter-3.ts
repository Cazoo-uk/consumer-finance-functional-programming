

type List<T> = Cons<T> | Nil

interface Nil {
  tag: "nil"
}

interface Cons<T> {
  tag: "cons"
  head: T
  tail: List<T>
}

const cons = <T>(head: T, tail: List<T>): Cons<T> => ({
  tag: "cons",
  head,
  tail,
})

const list = <T>(...values: T[]): List<T> => {
  if (!values.length) {
    return nil
  }

  return cons(values[0], list(...values.slice(1)))
}

const nil: Nil = { tag: "nil" };

const isNil = <T>(l: List<T>): l is Nil => l.tag === "nil"



cons(1, cons(2, nil))
list(1, 2)

  const tail = <T>(list: List<T>): List<T> => {
    if (!isNil(list)) {
      return list.tail;
    }

    return nil;
  }

// const setHead = <T>(head: T, list: List<T>): List<T> => {
//   if (!isNil(list)) {
//     return cons(head, list.tail);
//   }
//   return cons(head, nil);
// }

// const originalList = list(1, 2);

// const drop = <A>(l: List<A>, n: number): List<A> => {
//   if (n <= 0 || l === nil) return l;
//   return drop(tail(l), n - 1);
// }
const drop = <A>(l: List<A>, n: number): List<A> =>
  (n <= 0 || isNil(l)) ?
    l :
    drop(tail(l), n - 1)

//const longerList = list(1, 2, 3, 4, 5, 6, 7);

//console.log(drop(longerList, 0));

const dropWhile = <A>(l: List<A>, f: (a: A) => boolean): List<A> =>
  (isNil(l) || !f(l.head)) ?
    l :
    dropWhile(tail(l), f)

// const dropWhileX = <A>(l: List<A>, f: (a: A) => boolean): List<A> => {
//   if (isNil(l)) return nil
//   if (f(l.head)) {
//     return dropWhile(tail(l), f)
//   }
//   return l;
// }

// console.log(util.inspect(dropWhile(list(1, 2, 1, 4), (a) => a % 2 === 0), { depth: null }))


const init = <A>(l: List<A>): List<A> => 
  (isNil(l) || isNil(l.tail)) ?
    nil :
    cons(l.head, init(l.tail))

// list(1,2)
// head = 1
// head = 1
// tail = list(2)

init(list(1, 2)) // list(1)

init(list(1)) // nil

init(list(1, 2, 3, 4, 5)) // list(1,2,3,4)

console.log(init(list(1, 2, 3)))