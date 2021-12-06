const input = (await Deno.readTextFile('./input.txt')).trim().split(/\r?\n/);

interface ICoordinates {
  X: number[];
  Y: number[];
}

const range = (a: number, b: number): number[] => {
  const nums = [...Array(Math.abs(a - b) + 1).keys()].map(
    (num) => num + Math.min(a, b)
  );

  return a < b ? nums : nums.reverse();
};

const parseCoordinates = (coords: string): ICoordinates => {
  const split = coords.replace(/ -> /, ',').split(',');
  const [x1, x2] = [parseInt(split[0]), parseInt(split[2])];
  const [y1, y2] = [parseInt(split[1]), parseInt(split[3])];

  return { X: range(x1, x2), Y: range(y1, y2) };
};

const generateDiagram = (sizeX: number, sizeY: number) => {
  const diagram: number[][] = [];

  range(0, sizeY).forEach((y) => {
    diagram.push([]);
    range(0, sizeX).forEach((_x) => {
      diagram[y].push(0);
    });
  });

  return diagram;
};

const getGreatestXAndY = (coords: ICoordinates[]) => {
  let greatestX = 0,
    greatestY = 0;

  coords.forEach((coord) => {
    coord.X.forEach((x) => (greatestX = Math.max(x, greatestX)));
    coord.Y.forEach((y) => (greatestY = Math.max(y, greatestY)));
  });

  return { X: greatestX, Y: greatestY };
};

const countCoordsAt = (
  coords: ICoordinates[],
  x: number,
  y: number,
  checkDiagonal = false
) =>
  coords.filter((coord) => {
    const indexOfX = coord.X.findIndex((value) => value === x);
    const indexOfY = coord.Y.findIndex((value) => value === y);

    if (indexOfX === -1 || indexOfY === -1) return false;

    return (
      coord.X.length === 1 ||
      coord.Y.length === 1 ||
      (checkDiagonal && indexOfX === indexOfY)
    );
  }).length;

const constructDiagram = (input: string[], checkDiagonal: boolean) => {
  const allCoordinates = input.map((line) => parseCoordinates(line));

  const { X, Y } = getGreatestXAndY(allCoordinates);
  const diagram = generateDiagram(X, Y);

  console.log('Generated diagram');

  for (const y of range(0, Y)) {
    if (y % 50 == 0) console.log(`Counted ${y}/${Y}`);
    for (const x of range(0, X)) {
      diagram[y][x] = countCoordsAt(allCoordinates, x, y, checkDiagonal);
    }
  }

  console.log('Counted');
  return diagram;
};

const countCrossings = (diagram: number[][], threshold: number) =>
  diagram.flat(1).filter((num) => num >= threshold).length;

// For task 1 set the second arg to false, for taks 2 set it to true
const diagram = constructDiagram(input, true);
const totalOfCrossings = countCrossings(diagram, 2);

console.log(totalOfCrossings);
