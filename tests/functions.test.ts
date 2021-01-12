import { list, List } from "../src/list/list"
import { init, reverse, tail, map } from "../src/functions/functions"
import { foldRight, foldRightWithFoldLeft } from "../src/fold/fold"

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
    expect(reverse(list(1, 2, 3))).toEqual(list(3, 2, 1));
  });
});

describe('foldRightWithFoldLeft', () => {
    it('should work as expected', () => {
      expect(foldRightWithFoldLeft(list(1,2,3,4,5,6), '', (acc, item) => { return `${acc}` + `${item}`})).toEqual('654321');
    });
});

describe('foldLeftWithFoldRight', () => {
  const foldLeftWithFoldRight = <A, B>(l: List<A>, injectedValue: B, f: (accumulator: B, listItem: A) => B): B => {
    return foldRight(reverse(l), injectedValue, f);
  }

  it('should work as expected', () => {
    expect(foldLeftWithFoldRight(list(1,2,3,4,5,6), '', (acc, item) => { return `${acc}` + `${item}`})).toEqual('123456');
  });
});


describe('map', () => {
  it('should work as expected', () => {
    expect(map(list(1,2,3), (value) => { return `${value}`})).toEqual(list('1', '2', '3'));
  });
});
