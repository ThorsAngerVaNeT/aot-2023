type FilterNotStartingWith<Set, Needle extends string> = Set extends `${Needle}${infer _X}` ? never : Set

type RemoveNaughtyChildren<List extends Record<string, unknown>> = Pick<List, FilterNotStartingWith<keyof List, 'naughty'>>
