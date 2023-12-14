type DecipherNaughtyList<T extends string, Result extends string[] = []> =
  T extends `${infer X}/${infer Last}`
  ? DecipherNaughtyList<Last, [...Result, X]>
  : [...Result, T][number];
