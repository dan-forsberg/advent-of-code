const input = (await Deno.readTextFile('./basic.txt')).trim().split(/\r?\n/);

const HEIGHT = input.length - 1;
const WIDTH = input[0].length - 1;

const LEFT = -1;
const RIGHT = 1;
const UP = -HEIGHT;
const DOWN = HEIGHT;

let octopuses = input.flatMap((line) => line.split('').map((num) => parseInt(num)));

const xy = (x: number, y: number) => y * WIDTH + x;
const XY = (pos: number) => [pos % (WIDTH + 1), Math.floor(pos / (WIDTH + 1))];

const getValidAdjecantPos = (pos: number) => {
  const adjecants: Set<number> = new Set();
  const [x, y] = XY(pos);

  const hasLeft = x > 0;
  const hasRight = x < WIDTH;

  const hasUp = y > 0;
  const hasDown = y < HEIGHT;

  if (hasLeft) {
    console.log('has left');
    adjecants.add(pos + LEFT);
  }
  if (hasRight) {
    console.log('Has right');
    adjecants.add(pos + RIGHT);
  }
  if (hasUp) {
    console.log('has up');
    adjecants.add(pos + UP);
  }
  if (hasDown) {
    console.log('has down');
    adjecants.add(pos + DOWN);
  }

  if (hasLeft && hasUp) {
    console.log('has left+up');
    adjecants.add(pos + LEFT + UP);
  }
  if (hasLeft && hasDown) {
    console.log('has left+down');
    adjecants.add(pos + LEFT + DOWN);
  }
  if (hasRight && hasUp) {
    console.log('has right+up');
    adjecants.add(pos + RIGHT + UP);
  }
  if (hasRight && hasDown) {
    console.log('has right+down');
    adjecants.add(pos + RIGHT + DOWN);
  }

  return [...adjecants];
};

const printBoard = (board: number[] = octopuses, boardTwo?: number[]) => {
  console.log('-'.repeat(WIDTH));
  for (let i = 0; i < HEIGHT * WIDTH; i += WIDTH) {
    console.log(board.slice(i, i + WIDTH).join(' '));
  }
  console.log('-'.repeat(WIDTH));
  //prompt();
};

const increment = () => {
  octopuses = octopuses.map((v) => v + 1);
};

const flash = () => {
  let flashingOctopuses: number[];
  const flashedOctopuses: number[] = [];
  do {
    flashingOctopuses = octopuses.filter((v, index) => {
      if (v > 9 && !flashedOctopuses.includes(index)) {
        flashedOctopuses.push(index);
        return index;
      }
    });

    const adjecants = flashingOctopuses.flatMap((index) => {
      return getValidAdjecantPos(index);
    });

    adjecants.forEach((pos) => (octopuses[pos] += 1));
  } while (flashingOctopuses.length > 0);

  flashedOctopuses.forEach((pos) => {
    octopuses[pos] = 0;
  });
};

const tick = () => {
  increment();
  flash();
};

printBoard();
tick();
printBoard();
