export type AppendGood<T extends Record<string, any>> = {
  [key in (string & keyof T) as `good_${key}`]: T[key]
};
