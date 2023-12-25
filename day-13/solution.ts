type DayCounter<Start extends number, End extends number, Result extends unknown[] = []> =
  End extends Result['length']
  ? Exclude<[...Result, End][number], 0>
  : DayCounter<Start, End, [...Result, Result['length']]>;
