type RockPaperScissors = '👊🏻' | '🖐🏾' | '✌🏽';

type WinPair = {
  '👊🏻': '🖐🏾',
  '🖐🏾': '✌🏽',
  '✌🏽': '👊🏻'
}

export type WhoWins<Player1 extends RockPaperScissors, Player2 extends RockPaperScissors> =
  Player1 extends Player2
  ? 'draw'
  : Player1 extends WinPair[Player2]
    ? 'lose'
    : 'win';
