type ArrayOfItems<Item extends string, Count extends number, Result extends string[] = []> =
  Result['length'] extends Count
  ? Result
  : ArrayOfItems<Item, Count, [...Result, Item]>;

type BoxToys<Item extends string, Count extends number> = O2T<{
  [key in Count]: ArrayOfItems<Item, key>
}>;

type O2T<O extends Record<string, any>> = {} extends O ? [] : {
  [key in keyof O]: O[key];
}[keyof O]
