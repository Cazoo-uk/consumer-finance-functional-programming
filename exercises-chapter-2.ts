// Exercise 2.3
type CurryFunction = <A, B, C>(f: (a: A, b: B) => C) => (a: A) => (b: B) => C
const curry: CurryFunction = (f) => (a) => (b) => f(a, b)

// Exercise 2.4
const uncurry = <A, B, C>(f: (a: A) => (b: B) => C) => (a: A, b: B) => f(a)(b)

// Exercise 2.5
const compose = <A, B, C>(f: (b: B) => C, g: (a: A) => B) => (a: A) => f(g(a))

// Exercise 2.3 test
const sum = (a: number, b: number) => a + b
const add1 = curry(sum)(1)
console.log("Exercise 2.3: ", add1(10)) // 11

// Exercise 2.4 test
const uncurriedSum = uncurry(curry(sum))
console.log("Exercise 2.4: ", uncurriedSum(10, 21)) // 31

// Exercise 2.5 test
const multiplyBy2 = (b: number) => b * 2
const addTen = (a: number) => a + 10

const addTenAndMultiplyBy2 = compose(multiplyBy2, addTen)
console.log("Exercise 2.5: ", addTenAndMultiplyBy2(3)) // 26

/*
- What did you learn? What surprised you?
- Going over the functions implementations
- Can we break the impl without breaking types?
- Then do we need tests?
- Why are those functions useful?
*/

interface ListNode<T> {
  value: T
  next?: ListNode<T>
}

export { }