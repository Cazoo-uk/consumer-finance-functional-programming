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

const nil: Nil = { tag: "nil" }
const isNil = <T>(l: List<T>): l is Nil => l.tag === "nil"

// Exercise 3.2
const tail = <T>(list: List<T>): List<T> => {
  switch (list.tag) {
    case "nil":
      return list
    case "cons":
      return list.tail
  }
}

/*
- Exercise 3.2
- What else could our function do at the tail
- What does constant time mean?
*/

// Exercise 3.3
const setHead = <T>(list: List<T>, head: T): List<T> => cons(head, tail(list))

// Exercise 3.4
const drop = <T>(list: List<T>, n: number): List<T> => {
  if (n <= 0) {
    return list
  }
  if (n === 1) {
    return tail(list)
  }
  return drop(tail(list), n - 1)
}

const listEx34 = cons(1, cons(2, cons(3, nil)))
console.log("Exercise 3.4: ", drop(listEx34, 2))

// Exercise 3.5
const dropWhile = <T>(list: List<T>, f: (head: T) => boolean): List<T> => {
  if (isNil(list)) {
    return list
  }

  if (f(list.head)) {
    return dropWhile(tail(list), f)
  }
  return list
}

const listEx35 = cons(1, cons(2, cons(3, cons(4, nil))))
console.log(
  "Exercise 3.5: ",
  dropWhile(listEx35, (n) => n <= 3)
)

// Exercise 3.6
const init = <T>(list: List<T>): List<T> => {
  if (isNil(list)) {
    return list
  }
  if (isNil(list.tail)) {
    return nil
  }
  return cons(list.head, init(list.tail))
}

const listEx36 = cons(1, cons(2, cons(3, nil)))
console.log("Exercise 3.6: ", init(listEx36))
