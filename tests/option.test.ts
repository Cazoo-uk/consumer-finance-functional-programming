import { variance } from "../src/functions/functions"
import { none, Some, map2, Option } from "../src/handling-errors-without-exceptions/option"
import { list } from "../src/list/list"

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
        expect(option.filter((value) => value === 1)).toEqual(option);
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
        expect(option.flatMap((value) => new Some(value.toString()))).toEqual(none<number>());
    });
})

describe('Option orElse', () => {
    it('should return an option of 99 for none', () => {
        const option = none<number>();
        expect(option.orElse(() => new Some(99))).toEqual(new Some(99))
    });

    it('should return the existing option for a some', () => {
        const option = new Some(2);
        expect(option.orElse(() => new Some(99))).toEqual(new Some(2))
    });
})

describe('Variance', () => {
    it('should work', () => {
        expect(variance(list(1, 2))).toStrictEqual(new Some(0.25));
        expect(variance(list(1, 2, 3, 4, 5))).toStrictEqual(new Some(2));
        expect(variance(list<number>())).toStrictEqual(none<number>());
    })
})

describe('map2', () => {
    const aFunction = (a: number, b: number): string => {
        return `${a}${b}`;
    }
    const option1 = new Some(1);
    const option2 = new Some(2);
    const optionNone = none<number>();

    it('should apply function if both parameters are valid', () => {
        const result = map2(option1, option2, aFunction);

        expect(result).toEqual(new Some("12"));
    });

    it('should return None if first parameter is None', () => {
        const result = map2(optionNone, option2, aFunction);

        expect(result).toEqual(none());
    });

    it('should return None if second parameter is None', () => {
        const result = map2(option1, optionNone, aFunction);

        expect(result).toEqual(none());
    });
})

describe('lift2', () => {

    it('should work', () => {
        const opt1 = new Some(2);
        const opt2 = new Some(4);
        const aFunction = (a: number, b: number): string => {
            return `${a}${b}`;
        }

        const aFunctionWithOptions = (opta: Option<number>, optb: Option<number>): Option<string> => {
            return map2(opta, optb, aFunction)
        };

        expect(aFunctionWithOptions(opt1, opt2)).toEqual(new Some('24'))


        type Lift2 = <TFirstArgument, TSecondArgument, TReturnValue>
                    (fn:(a: TFirstArgument, b: TSecondArgument) => TReturnValue) =>
                    (a: Option<TFirstArgument>, b: Option<TSecondArgument>) => Option<TReturnValue>

        const lift2: Lift2 = (fn) => (a, b) => map2(a, b, fn)

        const aFunctionLifted = lift2(aFunction);


        expect(aFunctionLifted(opt1, opt2)).toEqual(new Some('24'))
    })
})
