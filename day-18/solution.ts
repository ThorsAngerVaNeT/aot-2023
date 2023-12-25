type Count<ToyStack extends string[], Toy extends string, Result extends string[] = []> =
  ToyStack extends [infer F, ...infer R extends string[]]
  ? F extends Toy
    ? Count<R, Toy, [...Result, Toy]>
    : Count<R, Toy, Result>
  : Result['length'];