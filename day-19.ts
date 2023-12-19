type Toys = ['🛹', '🚲', '🛴', '🏄', '🛹', '🚲', '🛴', '🏄', '🛹', '🚲', '🛴', '🏄'];

type BoxToys<Item extends string, Count extends number, Result extends string[] = []> = Count extends Result['length']
  ? Result
  : BoxToys<Item, Count, [...Result, Item]>;

type CurrentItem<Index extends number[], ToysArray = Toys> = Toys[Index['length']];

type Rebuild<ToysList extends number[], Index extends number[] = [], Result extends string[] = []> =
  ToysList extends [infer Head, ...infer Tail]
  ? Tail extends number[]
    ? Head extends number
      ? BoxToys<CurrentItem<Index>, Head> extends infer Items
        ? Items extends string[]
          ? Rebuild<Tail, [...Index, Index['length']], [...Result, ...Items]>
          : [Items, Index['length']]
        : never
      : never
    : never
  : Result;