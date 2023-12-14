type DecipherNaughtyList<T extends string> =
  T extends `${infer X}/${infer Last}`
  ? X | DecipherNaughtyList<Last>
  : T;
