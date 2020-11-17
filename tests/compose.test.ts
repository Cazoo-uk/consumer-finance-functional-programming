import { compose } from "../src/compose/compose"

describe('compose', () => {
    it('should multiply the value correctly', () => {
      const multiplyBy2 = (b: number) => b * 2
      const addTen = (a: number) => a + 10

      const addTenAndMultiplyBy2 = compose(multiplyBy2, addTen)

      expect(addTenAndMultiplyBy2(3)).toBe(26)
    });
});
