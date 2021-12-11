const input = (await Deno.readTextFile("./input.txt")).trim().split(/\r?\n/);
const numbers = input.flatMap((line) =>
  line.split("").map((num) => parseInt(num))
);

const WIDTH = input[0].length;
const HEIGHT = input.length;

const XY = (x: number, y: number) => y * WIDTH + x;

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

const lowPoints = [];

for (let y = 0; y < HEIGHT; y++) {
  for (let x = 0; x < WIDTH; x++) {
    const current = numbers[XY(x, y)];
    if (isNumLowPoint(x, y, current)) {
      lowPoints.push(XY(x, y));
    }
  }
}

enum Direction {
  LEFT = -1,
  RIGHT = 1,
  UP = -WIDTH,
  DOWN = WIDTH,
  NONE = 0,
}

const takenPositions: number[] = [];
const travel = (
  x: number,
  y: number,
  direction: Direction = Direction.NONE,
  count = 0
) => {
  let size = 0;
  const pos = XY(x, y) + direction;
  const [X, Y] = xy(pos);
  const indentation = "  ".repeat(count);

  if (
    !takenPositions.includes(pos) &&
    numbers[pos] !== undefined &&
    numbers[pos] < 9
  ) {
    console.log(
      indentation + Direction[direction] + " " + xy(pos) + " = " + numbers[pos]
    );
    size += 1;
    takenPositions.push(pos);

    if (y < HEIGHT - 1) size += travel(X, Y, Direction.DOWN, count + 1);

    if (y > 0) size += travel(X, Y, Direction.UP, count + 1);

    if (x > 0) size += travel(X, Y, Direction.LEFT, count + 1);

    if (x < WIDTH - 1) size += travel(X, Y, Direction.RIGHT, count + 1);
  }
  return size;
};

const xy = (pos: number) => {
  const y = Math.floor(pos / WIDTH);
  const x = pos % WIDTH;

  return [x, y];
};

const allBasinSizes = lowPoints.map((lowPoint) => {
  const _xy = xy(lowPoint);
  return travel(_xy[0], _xy[1]);
});

const biggest = allBasinSizes.sort((a, b) => b - a).slice(0, 3);

console.log(biggest.reduce((prev, curr) => prev * curr, 1));
