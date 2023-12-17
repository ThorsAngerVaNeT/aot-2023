type RockPaperScissors = '👊🏻' | '🖐🏾' | '✌🏽';

type WhoWins<Player1 extends RockPaperScissors, Player2 extends RockPaperScissors> =
  Player1 extends Player2
  ? 'draw'
  : Player1 extends '👊🏻'
    ? Player2 extends '🖐🏾'
      ? 'win'
      : 'lose'
    : Player1 extends '🖐🏾'
      ? Player2 extends '👊🏻'
        ? 'lose'
        : 'win'
      : Player1 extends '✌🏽'
        ? Player2 extends '👊🏻'
          ? 'win'
          : 'lose'
        : 'draw';