import { list } from "../src/list/list"
import { init, reverse, tail } from "../src/functions/functions"
import { foldRightWithFoldLeft } from "../src/fold/fold"

describe('tail', () => {
  it('should return the tail', () => {
    expect(tail(list(1, 2))).toEqual(list(2));
  });
});

describe('init', () => {
  it('should return the head', () => {
    expect(init(list(1, 2))).toEqual(list(1));
  });
});

describe('reverse', () => {
  it('should revert the list', () => {
    expect(reverse(list(1,2,3,4,5,6))).toEqual(list(6,5,4,3,2,1));
  });
});

describe('foldRightWithFoldLeft', () => {
    it('should work as expected', () => {
      expect(foldRightWithFoldLeft(list(1,2,3,4,5,6), 0, (acc, item) => { return acc + item})).toEqual(21);
    });
});
