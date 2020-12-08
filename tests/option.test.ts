import { Some, None, none } from '../src/handling-errors-without-exceptions/error-handling'
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