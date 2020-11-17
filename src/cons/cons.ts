import { List } from "../list/list"

export interface Cons<T> {
  tag: "cons"
  head: T
  tail: List<T>
}

export const cons = <T>(head: T, tail: List<T>): Cons<T> => ({
  tag: "cons",
  head,
  tail,
})
