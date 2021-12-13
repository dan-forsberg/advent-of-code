const input = (await Deno.readTextFile("./test.txt")).trim().split(/\r?\n/);

const octopuses = input.flatMap((line) =>
  line.split("").map((num) => parseInt(num))
);

const HEIGHT = input.length;
const WIDTH = input[0].length;

const LEFT = -1;
const RIGHT = 1;
const UP = -HEIGHT;
const DOWN = HEIGHT;

const xy = (x: number, y: number) => y * WIDTH + x;
const XY = (pos: number) => [pos % WIDTH, Math.floor(pos / WIDTH)];

const getValidAdjecantPos = (pos: number) => {
  const adjecants: Set<number> = new Set();
  const [x, y] = XY(pos);

  const hasLeft = x > 0;
  const hasRight = x < WIDTH;

  const hasUp = y > 0;
  const hasDown = y < HEIGHT;

  if (hasLeft) {
    //console.log("has left");
    adjecants.add(pos + LEFT);
  }
  if (hasRight) {
    //console.log("Has right");
    adjecants.add(pos + RIGHT);
  }
  if (hasUp) {
    //console.log("has up");
    adjecants.add(pos + UP);
  }
  if (hasDown) {
    //console.log("has down");
    adjecants.add(pos + DOWN);
  }

  if (hasLeft && hasUp) {
    //console.log("has left+up");
    adjecants.add(pos + LEFT + UP);
  }
  if (hasLeft && hasDown) {
    //console.log("has left+down");
    adjecants.add(pos + LEFT + DOWN);
  }
  if (hasRight && hasUp) {
    //console.log("has right+up");
    adjecants.add(pos + RIGHT + UP);
  }
  if (hasRight && hasDown) {
    //console.log("has right+down");
    adjecants.add(pos + RIGHT + DOWN);
  }

  return [...adjecants];
};

const printBoard = (board: number[], boardTwo?: number[]) => {
  console.log("-".repeat(WIDTH));
  for (let i = 0; i < HEIGHT * WIDTH; i += WIDTH) {
    if (boardTwo) {
      const a = board.slice(i, i + WIDTH).join("");
      const b = boardTwo.slice(i, i + WIDTH).join("");
      const diff = a.split("").filter((v, index) => {
        if (b[index] !== v) return true;
      });

      console.log(a + "\t" + b + "\t diff: " + diff);
    } else console.log(board.slice(i, i + WIDTH).join(""));
  }
  console.log("-".repeat(WIDTH));
  //prompt();
};

let noFlashes = 0;

const tick = (increment = true) => {
  let flashed: number[] = [];

  octopuses.map((_, pos) => {
    if (increment) octopuses[pos]++;
    if (octopuses[pos] > 9 && !flashed.includes(pos)) {
      getValidAdjecantPos(pos).map((_pos) => ++octopuses[_pos]);
      flashed.push(pos);
    }
  });

  if (flashed.length > 0) {
    noFlashes += flashed.length;
    tick(false);
    flashed.map((pos) => (octopuses[pos] = 0));
  }

  flashed = [];
};

printBoard(octopuses);
for (let i = 0; i < 10; i++) {
  tick();
  console.log("After iteration " + i + " = " + noFlashes);
  printBoard(octopuses);
}
