type ToysList = ['🛹', '🚲', '🛴', '🏄'];

type Rotate<List extends string[]> = List extends [infer F extends string, ...infer R extends string[]] ? [...R, F] : never;

type BoxToys<Item extends string, Count extends number, Result extends string[] = []> = Result['length'] extends Count
  ? Result
  : BoxToys<Item, Count, [...Result, Item]>;

export type Rebuild<ToyCounts extends number[], List extends string[] = ToysList, Result extends unknown[] = []> = ToyCounts extends [
  infer F extends number,
  ...infer R extends number[]
]
  ? Rebuild<R, Rotate<List>, [...Result, ...BoxToys<List[0], F>]>
  : Result;
