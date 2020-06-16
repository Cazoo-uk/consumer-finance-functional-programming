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
