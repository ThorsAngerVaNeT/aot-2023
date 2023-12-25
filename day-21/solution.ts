type TicTacToeChip = "❌" | "⭕";
type TicTacToeEndState = "❌ Won" | "⭕ Won" | "Draw";
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = "  ";
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = "top" | "middle" | "bottom";
type TicTacToeYPositionsIndexMap = { top: 0; middle: 1; bottom: 2 };
type TicTacToeXPositions = "left" | "center" | "right";
type TicTacToeXPositionsIndexMap = { left: 0; center: 1; right: 2 };
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTactToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
  board: TicTactToeBoard;
  state: TicTacToeState;
};

type EmptyBoard = [["  ", "  ", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];

export type NewGame = {
  board: EmptyBoard;
  state: "❌";
};

type IsBoardHasEmptyCells<Board extends TicTactToeBoard> =
  TicTacToeEmptyCell extends Board[number][number] ? true : false;
type IsItDraw<Board extends TicTactToeBoard> = IsBoardHasEmptyCells<Board> extends true
  ? false
  : true;

type CheckArray<A extends string[], Chip extends TicTacToeChip> = A[number] extends Chip
  ? true
  : false;
type CheckColumns<Board extends TicTactToeBoard, Chip extends TicTacToeChip> = true extends
  | CheckArray<[Board[0][0], Board[1][0], Board[2][0]], Chip>
  | CheckArray<[Board[0][1], Board[1][1], Board[2][1]], Chip>
  | CheckArray<[Board[0][2], Board[1][2], Board[2][2]], Chip>
  ? true
  : false;
type CheckRows<Board extends TicTactToeBoard, Chip extends TicTacToeChip> = true extends
  | CheckArray<Board[0], Chip>
  | CheckArray<Board[1], Chip>
  | CheckArray<Board[2], Chip>
  ? true
  : false;
type CheckDiagonals<Board extends TicTactToeBoard, Chip extends TicTacToeChip> = true extends
  | CheckArray<[Board[0][0], Board[1][1], Board[2][2]], Chip>
  | CheckArray<[Board[0][2], Board[1][1], Board[2][0]], Chip>
  ? true
  : false;
type IsItWin<Board extends TicTactToeBoard, Chip extends TicTacToeChip> = true extends
  | CheckColumns<Board, Chip>
  | CheckRows<Board, Chip>
  | CheckDiagonals<Board, Chip>
  ? true
  : false;

type GetState<
  Board extends TicTactToeBoard,
  Chip extends TicTacToeChip,
> = IsItDraw<Board> extends true
  ? "Draw"
  : IsItWin<Board, Chip> extends true
    ? `${Chip} Won`
    : Exclude<TicTacToeChip, Chip>;

type UpdateRow<
  Row extends TicTacToeCell[],
  X extends number,
  Chip extends TicTacToeChip,
  Result extends string[] = [],
> = Result["length"] extends 3
  ? Result
  : UpdateRow<Row, X, Chip, [...Result, Result["length"] extends X ? Chip : Row[Result["length"]]]>;

type UpdateBoard<
  Game extends TicTacToeGame,
  Y extends number,
  X extends number,
  Rows extends unknown[] = [],
> = Rows["length"] extends 3
  ? Rows
  : UpdateBoard<
    Game,
    Y,
    X,
    [
      ...Rows,
      Rows["length"] extends Y
      ? UpdateRow<
        Game["board"][Y],
        X,
        Game["state"] extends TicTacToeChip ? Game["state"] : never
      >
      : Game["board"][Rows["length"]],
    ]
  >;

type MakeMove<Game extends TicTacToeGame, Y extends number, X extends number> = {
  board: UpdateBoard<Game, Y, X>;
  state: GetState<
    UpdateBoard<Game, Y, X>,
    Game["state"] extends TicTacToeChip ? Game["state"] : never
  >;
};

export type TicTacToe<
  Game extends TicTacToeGame,
  Move extends TicTacToePositions,
> = Move extends `${infer Y extends keyof TicTacToeYPositionsIndexMap}-${infer X extends
keyof TicTacToeXPositionsIndexMap}`
  ? Game["board"][TicTacToeYPositionsIndexMap[Y]][TicTacToeXPositionsIndexMap[X]] extends TicTacToeEmptyCell
    ? MakeMove<Game, TicTacToeYPositionsIndexMap[Y], TicTacToeXPositionsIndexMap[X]>
    : Game
  : never;