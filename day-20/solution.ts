type Letters = {
	A: ["█▀█ ",
      "█▀█ ",
      "▀ ▀ "];
	B: ["█▀▄ ",
      "█▀▄ ",
      "▀▀  "];
	C: ["█▀▀ ",
      "█ ░░",
      "▀▀▀ "];
	E: ["█▀▀ ",
      "█▀▀ ",
      "▀▀▀ "];
	H: ["█ █ ",
      "█▀█ ",
      "▀ ▀ "];
	I: ["█ ",
      "█ ",
      "▀ "];
	M: ["█▄░▄█ ",
      "█ ▀ █ ",
      "▀ ░░▀ "];
	N: ["█▄░█ ",
      "█ ▀█ ",
      "▀ ░▀ "];
	P: ["█▀█ ",
      "█▀▀ ",
      "▀ ░░"];
	R: ["█▀█ ",
      "██▀ ",
      "▀ ▀ "];
	S: ["█▀▀ ",
      "▀▀█ ",
      "▀▀▀ "];
	T: ["▀█▀ ",
      "░█ ░",
      "░▀ ░"];
	Y: ["█ █ ",
      "▀█▀ ",
      "░▀ ░"];
	W: ["█ ░░█ ",
      "█▄▀▄█ ",
      "▀ ░ ▀ "];
	" ": ["░",
        "░",
        "░"];
	":": ["#",
        "░",
        "#"];
	"*": ["░",
        "#",
        "░"];
};

type ConcatAsciiArtParts<
  PartOne extends [string, string, string],
  PartTwo extends [string, string, string],
> = [`${PartOne[0]}${PartTwo[0]}`, `${PartOne[1]}${PartTwo[1]}`, `${PartOne[2]}${PartTwo[2]}`];

type LineToAsciiArt<
  Line extends string,
  Result extends [string, string, string] = ["", "", ""],
> = Uppercase<Line> extends `${infer First extends keyof Letters}${infer Rest}`
  ? LineToAsciiArt<Rest, ConcatAsciiArtParts<Result, Letters[First]>>
  : Result;

type ToAsciiArt<
  Message extends string,
  Result extends string[] = [],
> = Message extends `${infer FirstLine}\n${infer RestLines}`
  ? ToAsciiArt<RestLines, [...Result, ...LineToAsciiArt<FirstLine>]>
  : [...Result, ...LineToAsciiArt<Message>];