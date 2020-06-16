const curry = <A, B, C>(f: (a: A, b: B) => C) => (a: A) => (b: B) => f(a, b)

const uncurry = <A, B, C>(f: (a: A) => (b: B) => C) => (a: A, b: B) => f(a)(b)

const sum = (a: number, b: number) => a + b

const add1 = curry(sum)(1)

const uncurriedSum = uncurry(curry(sum))

console.log(uncurriedSum(10, 21))
