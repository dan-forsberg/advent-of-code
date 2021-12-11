const input = (await Deno.readTextFile("./test.txt")).trim().split(/\r?\n/);
const numbers = input.flatMap((line) =>
  line.split("").map((num) => parseInt(num))
);

const lineWidth = input[0].length;
const lines = input.length;

const XY = (x: number, y: number) => y * lineWidth + x;

const min = (a: number, b: number | undefined) =>
  b === undefined ? a : Math.min(a, b);

const getLowestAdjecant = (x: number, y: number) => {
  let lowest = Infinity;

  lowest = min(lowest, numbers[XY(x + 1, y)]);
  lowest = min(lowest, numbers[XY(x - 1, y)]);
  lowest = min(lowest, numbers[XY(x, y + 1)]);
  lowest = min(lowest, numbers[XY(x, y - 1)]);

  return lowest;
};

const isNumLowPoint = (x: number, y: number, num: number) =>
  getLowestAdjecant(x, y) > num;

let totalRiskLevel = 0;

for (let y = 0; y < lines; y++) {
  for (let x = 0; x < lineWidth; x++) {
    const current = numbers[XY(x, y)];
    if (isNumLowPoint(x, y, current)) {
      console.log("hej");
      totalRiskLevel += current + 1;
    }
  }
}

console.log(totalRiskLevel);
