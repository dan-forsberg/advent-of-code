const input = (await Deno.readTextFile("./input.txt"))
  .trim()
  .split(/\r?\n/)
  .map((line) => line.split(""));

const OPENING_CHARS = ["<", "[", "(", "{"];
const CLOSING_CHARS = [">", "]", ")", "}"];
const POINTS = [
  { char: ")", points: 3 },
  { char: "]", points: 57 },
  { char: "}", points: 1197 },
  { char: ">", points: 25137 },
];

const checkLine = (line: string[]): number => {
  const checked: string[] = [];

  for (const char of line) {
    if (OPENING_CHARS.includes(char)) {
      checked.push(char);
    } else {
      const closingIdx = CLOSING_CHARS.findIndex((c) => c === char);
      const openingIdx = OPENING_CHARS.findIndex(
        (c) => c === checked[checked.length - 1]
      );

      if (closingIdx !== openingIdx) {
        return POINTS.find((points) => points.char === char)!.points;
      }

      checked.pop();
    }
  }
  return 0;
};

const misMatched = input.map((line) => checkLine(line));

console.log(misMatched.reduce((prev, curr) => prev + curr, 0));
