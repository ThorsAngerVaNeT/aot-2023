type Alley = '  ';
type MazeItem = '🎄' | '🎅' | Alley;
type DELICIOUS_COOKIES = '🍪';
type MazeMatrix = MazeItem[][];
type Directions = 'up' | 'down' | 'left' | 'right';
type Move<
  Maze extends string[][],
  Direction extends Directions,
  CurrentPosition extends unknown[][] = FindSanta<Maze>,
  NewPosition extends unknown[][] = GetNewPosition<CurrentPosition, MoveMap[Direction]>
> = Maze[NewPosition[0]['length']][NewPosition[1]['length']] extends '  '
  ? UpdateMaze<UpdateMaze<Maze, CurrentPosition, Alley>, NewPosition, '🎅'>
  : NewPosition extends -1
  ? Cookies
  : Maze;

type GetPositionValue<Maze extends string[][], Position extends unknown[][]> = Maze[Position[0]['length']][Position[1]['length']];

type UpdateMaze<
  Maze extends string[][],
  Position extends unknown[][],
  Item extends string,
  Rows extends string[][] = []
> = Rows['length'] extends Maze['length']
  ? Rows
  : UpdateMaze<
      Maze,
      Position,
      Item,
      [
        ...Rows,
        Rows['length'] extends Position[0]['length'] ? UpdateRow<Maze[Rows['length']], Position[1]['length'], Item> : Maze[Rows['length']]
      ]
    >;

type UpdateRow<
  Row extends string[],
  X extends number,
  Item extends string,
  Result extends string[] = []
> = Result['length'] extends Row['length']
  ? Result
  : UpdateRow<Row, X, Item, [...Result, Result['length'] extends X ? Item : Row[Result['length']]]>;

type FindSantaInRow<Row extends string[]> = Row extends [...infer R extends string[], infer S]
  ? S extends '🎅'
    ? R
    : FindSantaInRow<R>
  : never;

type FindSanta<Forest extends string[][], RowCount extends number[] = []> = Forest extends [
  infer First extends string[],
  ...infer Rest extends string[][]
]
  ? FindSantaInRow<First> extends never
    ? FindSanta<Rest, [...RowCount, RowCount['length']]>
    : [RowCount, FindSantaInRow<First>]
  : never;

type MoveMap = {
  up: [-1, 0];
  down: [1, 0];
  left: [0, -1];
  right: [0, 1];
};

type GetNewPosition<CurrentPosition extends unknown[][], Delta extends [number, number]> = Delta extends [infer Y, infer X]
  ? Y extends 0
    ? X extends -1
      ? CurrentPosition[1] extends [infer _, ...infer R]
        ? [CurrentPosition[0], R]
        : -1
      : [CurrentPosition[0], [...CurrentPosition[1], 'X']]
    : Y extends -1
    ? CurrentPosition[0] extends [infer _, ...infer R]
      ? [R, CurrentPosition[1]]
      : -1
    : [[...CurrentPosition[0], 'Y'], CurrentPosition[1]]
  : never;

type CreateArrayOfItems<Length extends number, Item extends unknown, Result extends unknown[] = []> = Result['length'] extends Length
  ? Result
  : CreateArrayOfItems<Length, Item, [...Result, Item]>;

type Cookies = CreateArrayOfItems<10, CreateArrayOfItems<10, DELICIOUS_COOKIES>>;
