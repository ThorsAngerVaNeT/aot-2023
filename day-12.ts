type FindSanta<T extends unknown[], Leftovers extends unknown[] = []> =
  T extends [infer First, ...infer Rest]
  ? First extends '🎅🏼'
  ? Leftovers['length']
  : FindSanta<Rest, [...Leftovers, First]>
  : never;
