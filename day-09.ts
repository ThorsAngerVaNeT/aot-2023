type Split<S extends string> = S extends ''
  ? []
  : S extends `${infer C}${infer R}`
  ? [C, ...Split<R>]
  : []

type Join<T extends string[]> = T extends []
  ? ''
  : T extends [infer Head, ...infer Tail]
  ? Head extends string
  ? `${Head}${Join<Tail extends string[] ? Tail : []>}`
  : never
  : never

type ReverseArray<T> = T extends [...infer H, infer T] ? [T, ...ReverseArray<H>] : [];

type Reverse<T extends string> = Join<ReverseArray<Split<T>>>
