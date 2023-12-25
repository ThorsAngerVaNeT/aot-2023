type BoxToys<Item extends string, Count extends number, Result extends string[] = []> = Count extends Result['length']
  ? Result
  : BoxToys<Item, Count, [...Result, Item]>;
