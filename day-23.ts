type Connect4Chips = '🔴' | '🟡';
type Connect4Cell = Connect4Chips | Connect4EmptyCell;
type Connect4EmptyCell = '  ';
type Connect4State = '🔴' | '🟡' | '🔴 Won' | '🟡 Won' | 'Draw';
type Connect4Row = [Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell, Connect4Cell];
type Connect4Board = Connect4Cell[][];
type Connect4Game = { board: Connect4Board; state: Connect4Chips };
type EmptyBoard = [
  ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
  ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
  ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
  ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
  ['  ', '  ', '  ', '  ', '  ', '  ', '  '],
  ['  ', '  ', '  ', '  ', '  ', '  ', '  ']
];

type NewGame = {
  board: EmptyBoard;
  state: '🟡';
};

type Connect4<Game extends Connect4Game, ColumnIndex extends number> = {
  board: UpdateBoard<Game, ColumnIndex>;
  state: GetState<UpdateBoard<Game, ColumnIndex>, Game['state'] extends Connect4State ? Game['state'] : never>;
};

type GetState<Board extends Connect4Cell[][], Chip extends Connect4Chips> = IsItDraw<Board> extends true
  ? 'Draw'
  : IsItWin<Board, Chip> extends true
  ? `${Chip} Won`
  : Exclude<Connect4Chips, Chip>;

type UpdateBoard<Game extends Connect4Game, ColumnIndex extends number, Board extends Connect4Cell[][] = []> = Game['board'] extends [
  ...infer Rows extends Connect4Cell[][],
  infer Row extends Connect4Cell[]
]
  ? Row[ColumnIndex extends keyof Row ? ColumnIndex : never] extends Connect4EmptyCell
    ? UpdateBoard<{ board: Rows; state: Game['state'] }, -1, [UpdateRow<Row, ColumnIndex, Game['state']>, ...Board]>
    : UpdateBoard<{ board: Rows; state: Game['state'] }, ColumnIndex, [Row, ...Board]>
  : Board;

type UpdateRow<
  Row extends Connect4Cell[],
  ColumnIndex extends keyof Row,
  Chip extends Connect4Chips,
  Result extends Connect4Cell[] = []
> = Row['length'] extends Result['length']
  ? Result
  : Result['length'] extends ColumnIndex
  ? UpdateRow<Row, ColumnIndex, Chip, [...Result, Chip]>
  : UpdateRow<Row, ColumnIndex, Chip, [...Result, Row[Result['length']]]>;

type IsItDraw<Game extends Connect4Board> = Connect4EmptyCell extends Game[number][number] ? false : true;
type IsItWin<Board extends Connect4Cell[][], Chip extends Connect4Chips> = true extends
  | CheckColumns<Board, Chip>
  | CheckRows<Board, Chip>
  | CheckDiagonals<GetDiagonals<Board>, Chip>
  ? true
  : false;

type CheckColumns<
  Board extends Connect4Cell[][],
  Chip extends Connect4Chips,
  ColumnCount extends number[] = []
> = ColumnCount['length'] extends Board[0]['length']
  ? CheckCollection<GetColumn<Board, ColumnCount['length']>, Chip> extends true
    ? true
    : false
  : CheckColumns<Board, Chip, [...ColumnCount, ColumnCount['length']]>;

type CheckRows<Board extends Connect4Cell[][], Chip extends Connect4Chips> = Board extends [
  infer Row extends Connect4Cell[],
  ...infer Rows extends Connect4Cell[][]
]
  ? CheckCollection<Row, Chip> extends true
    ? true
    : CheckRows<Rows, Chip>
  : false;

type CheckCollection<Collection extends Connect4Cell[], Chip extends Connect4Chips> = Collection extends [
  infer $1 extends Connect4Cell,
  infer $2 extends Connect4Cell,
  infer $3 extends Connect4Cell,
  infer $4 extends Connect4Cell,
  ...infer R extends Connect4Cell[]
]
  ? $1 | $2 | $3 | $4 extends Chip
    ? true
    : CheckCollection<[$2, $3, $4, ...R], Chip>
  : false;

type GetColumn<Rows extends unknown[][], Index extends number, Result extends unknown[] = []> = Rows extends [
  infer F extends unknown[],
  ...infer R extends unknown[][]
]
  ? GetColumn<R, Index, [...Result, F[Index]]>
  : Result;

type CheckDiagonals<Diagonals extends Connect4Cell[][], Chip extends Connect4Chips> = Diagonals extends [
  infer D extends Connect4Cell[],
  ...infer R extends Connect4Cell[][]
]
  ? D[number] extends Chip
    ? true
    : CheckDiagonals<R, Chip>
  : false;
type GetDiagonals<Board extends Connect4Cell[][]> = [...GetRightDiagonals<Board>, ...GetLeftDiagonals<Board>];
type GetRightDiagonals<
  Board extends Connect4Cell[][],
  Result extends Connect4Cell[][] = [],
  StartColumnIndex extends number[] = [],
  EndColumnIndex extends number[] = [0, 1, 2, 3]
> = Board extends [
  infer $1 extends Connect4Cell[],
  infer $2 extends Connect4Cell[],
  infer $3 extends Connect4Cell[],
  infer $4 extends Connect4Cell[],
  ...infer R extends Connect4Cell[][]
]
  ? EndColumnIndex['length'] extends Board[0]['length']
    ? GetRightDiagonals<
        [$2, $3, $4, ...R],
        [
          ...Result,
          [
            $4[StartColumnIndex['length']],
            $3[[...StartColumnIndex, 1]['length']],
            $2[[...StartColumnIndex, 1, 2]['length']],
            $1[[...StartColumnIndex, 1, 2, 3]['length']]
          ]
        ],
        [],
        [0, 1, 2, 3]
      >
    : GetRightDiagonals<
        Board,
        [
          ...Result,
          [
            $4[StartColumnIndex['length']],
            $3[[...StartColumnIndex, 1]['length']],
            $2[[...StartColumnIndex, 1, 2]['length']],
            $1[[...StartColumnIndex, 1, 2, 3]['length']]
          ]
        ],
        [...StartColumnIndex, StartColumnIndex['length']],
        [...EndColumnIndex, EndColumnIndex['length']]
      >
  : Result;
type GetLeftDiagonals<
  Board extends Connect4Cell[][],
  Result extends Connect4Cell[][] = [],
  StartColumnIndex extends number[] = [],
  EndColumnIndex extends number[] = [0, 1, 2, 3]
> = Board extends [
  infer $1 extends Connect4Cell[],
  infer $2 extends Connect4Cell[],
  infer $3 extends Connect4Cell[],
  infer $4 extends Connect4Cell[],
  ...infer R extends Connect4Cell[][]
]
  ? EndColumnIndex['length'] extends Board[0]['length']
    ? GetLeftDiagonals<
        [$2, $3, $4, ...R],
        [
          ...Result,
          [
            $1[[...StartColumnIndex]['length']],
            $2[[...StartColumnIndex, 1]['length']],
            $3[[...StartColumnIndex, 1, 2]['length']],
            $4[[...StartColumnIndex, 1, 2, 3]['length']]
          ]
        ],
        [],
        [0, 1, 2, 3]
      >
    : GetLeftDiagonals<
        Board,
        [
          ...Result,
          [
            $1[[...StartColumnIndex]['length']],
            $2[[...StartColumnIndex, 1]['length']],
            $3[[...StartColumnIndex, 1, 2]['length']],
            $4[[...StartColumnIndex, 1, 2, 3]['length']]
          ]
        ],
        [...StartColumnIndex, StartColumnIndex['length']],
        [...EndColumnIndex, EndColumnIndex['length']]
      >
  : Result;
