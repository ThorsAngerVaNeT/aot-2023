type FindSantaInRow<T> = T extends [...infer R, infer L]
  ? L extends "🎅🏼"
    ? R["length"]
    : FindSantaInRow<R>
  : never;

export type FindSanta<Forest extends unknown[][], RowCount extends number[] = []> =
  Forest extends [infer First, ...infer Rest extends unknown[][]]
  ? FindSantaInRow<First> extends never
    ? FindSanta<Rest, [...RowCount, RowCount['length']]>
    : [RowCount['length'], FindSantaInRow<First>]
  : never;