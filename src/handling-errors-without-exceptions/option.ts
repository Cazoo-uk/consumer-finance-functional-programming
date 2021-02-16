export type Option<A> = Some<A> | None<A>;

export const map2 = <A, B, C>(oa: Option<A>,
                       ob: Option<B>,
                       f: (a: A, b: B) => C): Option<C> => {

  return oa.flatMap( a => ob.map(b => f(a, b)));
}

export const map3 = <A, B, C, D>(oa: Option<A>,
                              ob: Option<B>,
                              oc: Option<C>,
                              f: (a: A, b: B, c:C) => D): Option<D> => {
return oa.flatMap(a=> ob.flatMap(b=>oc.map(c=>f(a,b,c))));
}
export const lift = <A, B>(f: (a: A) => B): (o: Option<A>) => Option<B> =>
  o => o.map(f);

abstract class OptionBase<A> {
  filter(this: Option<A>, p: (a: A) => boolean): Option<A> {
    return this.flatMap(a => p(a) ? some(a) : none());
  }

  flatMap<B>(this: Option<A>, f: (a: A) => Option<B>): Option<B> {
    return this.map(f).getOrElse(() => none());
  }

  getOrElse<T extends U, U>(this: Option<T>, onEmpty: () => U): U {
    if (this.tag === "none") return onEmpty();
    return this.value;
  }

  map<B>(this: Option<A>, f: (a: A) => B): Option<B> {
    if (this.tag === "none") return none();
    return some(f(this.value));
  }

  orElse<T extends U, U>(this: Option<T>, ou: () => Option<U>): Option<U> {
    return this.map(a => some(a)).getOrElse(() => ou());
  }
}

export class Some<A> extends OptionBase<A> {
  readonly tag: "some" = "some";

  constructor(readonly value: A) {
    super();
  }
}

export class None<A> extends OptionBase<A> {
  static readonly NONE: Option<never> = new None();

  readonly tag: "none" = "none";

  private constructor() {
    super();
  }
}

// 10. smart constructors for `None` and `Some`
export const none = <A>(): Option<A> => None.NONE;

export const some = <A>(a: A): Option<A> => new Some(a);
