/** because "dashing" implies speed */
type Dasher = "💨";

/** representing dancing or grace */
type Dancer = "💃";

/** a deer, prancing */
type Prancer = "🦌";

/** a star for the dazzling, slightly mischievous Vixen */
type Vixen = "🌟";

/** for the celestial body that shares its name */
type Comet = "☄️";

/** symbolizing love, as Cupid is the god of love */
type Cupid = "❤️";

/** representing thunder, as "Donner" means thunder in German */
type Donner = "🌩️";

/** meaning lightning in German, hence the lightning bolt */
type Blitzen = "⚡";

/** for his famous red nose */
type Rudolph = "🔴";

type Reindeer = Dasher | Dancer | Prancer | Vixen | Comet | Cupid | Donner | Blitzen | Rudolph;

type FlattenArray<Array extends Reindeer[][], Result extends Reindeer[] = []> = Array extends [
  infer F extends Reindeer[],
  ...infer R extends Reindeer[][],
]
  ? FlattenArray<R, [...Result, ...F]>
  : Result;

type ValidateEntity<Entity extends Reindeer[]> = Reindeer extends Entity[number] ? true : false;

type GetBlocks<Sudoku extends Reindeer[][][], Blocks extends Reindeer[][] = []> =
  Sudoku extends [infer F extends Reindeer[][], infer S extends Reindeer[][], infer T extends Reindeer[][], ...infer Rows extends Reindeer[][][]]
  ? GetBlocks<Rows, [...Blocks, [...F[0], ...S[0], ...T[0]], [...F[1], ...S[1], ...T[1]], [...F[2], ...S[2], ...T[2]]]>
  : Blocks;

type GetColumn<
  Rows extends Reindeer[][],
  Index extends number,
  Result extends Reindeer[] = [],
> = Rows extends [infer F extends Reindeer[], ...infer R extends Reindeer[][]]
  ? GetColumn<R, Index, [...Result, F[Index]]>
  : Result;

type GetColumns<
  Rows extends Reindeer[][],
  Columns extends Reindeer[][] = [],
> = Columns["length"] extends Rows["length"]
  ? Columns
  : GetColumns<Rows, [...Columns, GetColumn<Rows, Columns["length"]>]>;

type GetRows<
  Sudoku extends Reindeer[][][],
  Rows extends Reindeer[][] = [],
> = Rows["length"] extends 9
  ? Rows
  : Sudoku extends [infer Row extends Reindeer[][], ...infer Rest extends Reindeer[][][]]
    ? GetRows<Rest, [...Rows, FlattenArray<Row>]>
    : Rows;

type ValidateMatrix<Matrix extends Reindeer[][], Result extends Boolean = false> = Matrix extends [
  infer F extends Reindeer[],
  ...infer R extends Reindeer[][],
]
  ? ValidateEntity<F> extends true
    ? ValidateMatrix<R>
    : false
  : ValidateEntity<Matrix[0]>;

export type Validate<Sudoku extends Reindeer[][][]> =
  | ValidateMatrix<GetRows<Sudoku>>
  | ValidateMatrix<GetColumns<GetRows<Sudoku>>>
  | ValidateMatrix<GetBlocks<Sudoku>> extends true
  ? true
  : false;