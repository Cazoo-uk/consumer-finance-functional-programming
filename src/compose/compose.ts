export const compose = <A, B, C>(f: (b: B) => C, g: (a: A) => B) => (a: A) => f(g(a))
