import { sum } from "../src/sum/sum"
import { curry, uncurry } from "../src/curry/curry"

describe('curry sum', () => {
    it('should return 11', () => {
        const add1 = curry(sum)(1)
        expect(add1(10)).toBe(11);
    });

    it('should return 31', () => {
        const uncurriedSum = uncurry(curry(sum))
        expect(uncurriedSum(10, 21)).toBe(31)
    });
});
