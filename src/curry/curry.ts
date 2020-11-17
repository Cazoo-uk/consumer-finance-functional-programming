type CurryFunction = <A, B, C>(f: (a: A, b: B) => C) => (a: A) => (b: B) => C
export const curry: CurryFunction = (f) => (a) => (b) => f(a, b)
export const uncurry = <A, B, C>(f: (a: A) => (b: B) => C) => (a: A, b: B) => f(a)(b)
