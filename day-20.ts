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

type ConcatAsciiArtParts<PartOne extends string[], PartTwo extends string[]> = PartOne extends [
	infer FirstCharOne extends string,
	infer SecondCharOne extends string,
	infer ThirdCharOne extends string,
]
	? PartTwo extends [
			infer FirstCharTwo extends string,
			infer SecondCharTwo extends string,
			infer ThirdCharTwo extends string,
		]
		? [
				`${FirstCharOne}${FirstCharTwo}`,
				`${SecondCharOne}${SecondCharTwo}`,
				`${ThirdCharOne}${ThirdCharTwo}`,
			]
		: never
	: never;

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