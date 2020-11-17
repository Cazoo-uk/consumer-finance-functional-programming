import { nil, Nil } from "../nil/nil"
import { cons, Cons } from "../cons/cons"

export type List<T> = Cons<T> | Nil

export const list = <T>(...values: T[]): List<T> => {
  if (!values.length) {
    return nil
  }

  return cons(values[0], list(...values.slice(1)))
}
