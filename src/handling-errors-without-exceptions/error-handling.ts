export type Option<A> = Some<A> | None<A>;

// 1. `abstract class` defines class that cannot be instantiated
abstract class OptionBase<A> {
  
  // 2. `this` parameter
  abstract map<B>(this: Option<A>, f: (a: A) => B): Option<B>;

  abstract getOrElse<A>(this: Option<A>, onNone: () => A): A

}

// 5. `extends` keyword creating inheritance relationship
export class Some<A> extends OptionBase<A> {
  readonly tag: "some" = "some";

  // 6. classes must call `super()` if they extend other classes
  constructor(readonly value: A) {
    super();
  }

  map<B>(this: Some<A>, f: (a: A) => B): Option<B> {
    return new Some(f(this.value));
  };

  getOrElse<A>(this: Some<A>, onNone: () => A): A {
      return this.value;
  };
}

export class None<A> extends OptionBase<A> {
  // 7. `never` is the "bottom type"
  // 8. `static` creates "class" property
  static readonly NONE: Option<never> = new None();

  readonly tag: "none" = "none";

  // 9. `private` prevents access by external code
  private constructor() {
    super();
  }

  map<B>(this: None<A>, _f: (a: A) => B): Option<B> {
    return none()
  };

  getOrElse<A>(this: None<A>, onNone: () => A): A {
    return onNone();
};
}

// 10. smart constructors for `None` and `Some`
export const none = <A>(): Option<A> => None.NONE;

export const some = <A>(a: A): Option<A> => new Some(a);