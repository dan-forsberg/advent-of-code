const data = (await Deno.readTextFile("./test.txt"))
  .trim()
  .split(/\r?\n/)
  .map((line) => line.split(" | "));

const letters = "abcdefg".split("");

const translate = (dictionary: string[], what: string[]) => {
  const answer: string[] = [];
  what.forEach((led: string) => {
    //@ts-expect-error shush
    answer.push(dictionary[led]);
  });
  return answer;
};

const whatDigit = (segments: string[]) => {
  switch (segments.join("")) {
    case "abcefg":
      return 0;
    case "cf":
      return 1;
    case "acdeg":
      return 2;
    case "acdfg":
      return 3;
    case "bcdf":
      return 4;
    case "abdfg":
      return 5;
    case "abdefg":
      return 6;
    case "acf":
      return 7;
    case "abcdefg":
      return 8;
    case "abcdfg":
      return 9;
  }
};

let totalAnswer = 0;

data.forEach((line) => {
  const [hints, outputs] = line.map((a) => a.split(" "));
  const hintsSorted = hints.map((a) => a.split("")).map((a) => a.sort());
  const confident = Array(7).fill([...letters]);

  const one = hintsSorted.filter((a) => a.length == 2).flat();
  const four = hintsSorted.filter((a) => a.length == 4).flat();
  const seven = hintsSorted.filter((a) => a.length == 3).flat();

  confident[2] = one;
  confident[5] = one;
  confident[0] = seven.filter((x) => !one.includes(x));

  confident[1] = four
    .filter((x) => !confident[2].includes(x))
    .filter((x) => !confident[0].includes(x));

  confident[3] = confident[1];
  confident[4] = confident[4]
    .filter((x: string) => !confident[0].includes(x))
    .filter((x: string) => !confident[1].includes(x))
    .filter((x: string) => !confident[2].includes(x));
  confident[6] = confident[6]
    .filter((x: string) => !confident[0].includes(x))
    .filter((x: string) => !confident[1].includes(x))
    .filter((x: string) => !confident[2].includes(x));

  const nrNine = hintsSorted
    .filter(
      (a) =>
        confident[2].filter((x: string) => !a.includes(x)).length == 0 &&
        confident[3].filter((x: string) => !a.includes(x)).length == 0 &&
        a.length == 6
    )
    .flat();
  confident[4] = confident[4].filter((x: string) => !nrNine.includes(x));
  confident[6] = confident[6].filter((x: string) => !confident[4].includes(x));

  const nrZero = hintsSorted
    .filter(
      (a) =>
        confident[2].filter((x: string) => !a.includes(x)).length == 0 &&
        confident[4].filter((x: string) => !a.includes(x)).length == 0 &&
        a.length == 6
    )
    .flat();
  confident[3] = confident[3].filter((x: string) => !nrZero.includes(x));
  confident[1] = confident[1].filter((x: string) => !confident[3].includes(x));

  const nrSix = hintsSorted
    .filter(
      (a) =>
        confident[3].filter((x: string) => !a.includes(x)).length == 0 &&
        confident[4].filter((x: string) => !a.includes(x)).length == 0 &&
        a.length == 6
    )
    .flat();
  confident[2] = confident[2].filter((x: string) => !nrSix.includes(x));
  confident[5] = confident[5].filter((x: string) => !confident[2].includes(x));

  const translationFile: string[] = [];
  for (let i = 0; i < 7; i++) {
    translationFile[confident[i]] = letters[i];
  }

  const answerForLine: string[] = [];
  outputs.forEach((output) => {
    const actualLeds = translate(translationFile, output.split(""));
    //@ts-expect-error shush
    answerForLine.push(whatDigit(actualLeds.sort()));
  });
  totalAnswer += Number(answerForLine.join(""));
});

console.log(totalAnswer);
