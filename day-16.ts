type FindSantaInRow<T> = T extends [...infer R, infer L]
  ? L extends "🎅🏼"
    ? R["length"]
    : FindSantaInRow<R>
  : never;

type FindSanta<Forest extends unknown[][], RowCount extends number[] = []> =
  Forest extends [infer First, ...infer Rest]
  ? FindSantaInRow<First> extends never
    ? Rest extends unknown[][]
      ? FindSanta<Rest, [...RowCount, RowCount['length']]>
      : never
    : [RowCount['length'], FindSantaInRow<First>]
  : never;
