const input = (await Deno.readTextFile("./input.txt"))
  .trim()
  .split(/\r?\n/)
  .map((line) => line.split(""));

const OPENING_CHARS = ["<", "[", "(", "{"];
const CLOSING_CHARS = [">", "]", ")", "}"];
const POINTS = [
  { char: ")", points: 1 },
  { char: "]", points: 2 },
  { char: "}", points: 3 },
  { char: ">", points: 4 },
];

const getIncompletePart = (line: string[]): string[] | undefined => {
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
        return undefined;
      }

      checked.pop();
    }
  }

  return checked.length > 0 ? checked : undefined;
};

const calculatePoints = (line: string[]): number => {
  let score = 0;

  line.reverse().forEach((char) => {
    const index = OPENING_CHARS.findIndex((c) => c === char);
    const points = POINTS.find((c) => c.char === CLOSING_CHARS[index])!.points;

    score = score * 5 + points;
  });

  return score;
};

const incompleteParts = input
  .map((line) => getIncompletePart(line))
  .filter((value) => value !== undefined);

const scores = incompleteParts
  .map((part) => calculatePoints(part!))
  .sort((a, b) => a - b);

const middleScore = scores[Math.floor(scores.length / 2)];

console.log(middleScore);
