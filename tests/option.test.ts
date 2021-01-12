import { length, map, sum } from "../src/functions/functions"
import { none, Option, Some } from "../src/handling-errors-without-exceptions/option"
import { list, List } from "../src/list/list"

describe('Option map', () => {
    it('should map the value', () => {
        const option = new Some(1);
        expect(option.map((value: number) => {
            return value.toString();
        })).toEqual(new Some('1'))
    })
})

describe('Option getOrElse', () => {
    it('should get the value when a Option is Some', () => {
        const option = new Some(1);
        expect(option.getOrElse(() => 0)).toEqual(1)
    })
    it('should call a defined function if Option is None', () => {
        const option = none<number>();
        expect(option.getOrElse(() => 0)).toEqual(0)
    })
})

describe('Option filter', () => {
    it('should return none if the value in the option is not fulfilling the predicate', () => {
        const option = new Some(1);
        expect(option.filter((value) => value === 0)).toEqual(none<number>())
    });

    it('should return the option if the value in the option is fulfilling the predicate', () => {
        const option = new Some(1);
        expect(option.filter((value) => value === 1)).toBe(option);
    })

    it('should return none if the option is none', () => {
        const option = none();
        expect(option.filter((value) => value === 1)).toBe(none());
    })
})

describe('Option flatmap', () => {
    it('should map to another option for an option', () => {
        const option = new Some(1);
        expect(option.flatMap((value) => new Some(value.toString()))).toEqual(new Some('1'))
    });

    it('should map to none for none', () => {
        const option = none<number>();
        // @ts-ignore
        expect(option.flatMap((value) => new Some(value.toString()))).toEqual(none<number>());
    });
})

describe('Option orElse', () => {
    it('should return an option of 99 for none', () => {
        const option = none();
        // @ts-ignore
        expect(option.orElse(() => new Some(99))).toEqual(new Some(99))
    });

    it('should return the existing option for a some', () => {
        const option = new Some(2);
        expect(option.orElse(() => new Some(99))).toEqual(new Some(2))
    });
})

describe('Variance', () => {
    it('should work', () => {
        const mean = (list: List<number>): Option<number> => {
            if (list.tag === "nil") {
                return none();
            }

            return new Some(sum(list) / length(list));
        }

        const variance = (list: List<number>): Option<number> => {
            return mean(list).flatMap(average => mean(map(list, (item) => Math.pow(item - average, 2))));
        }

        const _list = list(1, 2);
        const expectedOption = new Some(0.25)
        expect(variance(_list)).toStrictEqual(expectedOption);
        const listOfUnknown = list<number>();
        expect(variance(listOfUnknown)).toStrictEqual(none<number>());
    })
})




