import { List } from "../list/list"

export interface Nil {
  tag: "nil"
}

export const nil: Nil = { tag: "nil" };

export const isNil = <T>(l: List<T>): l is Nil => l.tag === "nil"
