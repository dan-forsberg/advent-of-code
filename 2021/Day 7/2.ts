const input = (await Deno.readTextFile("./input.txt"))
  .trim()
  .split(",")
  .map((num) => parseInt(num));

const sorted = input.sort((a, b) => a - b);
const farthest = sorted[sorted.length - 1];

/* Creat a new array of size (farthest + 1)
 * At each index put the count of numbers in input with the same value */
const list = [...Array(farthest + 1).keys()].map(
  (_, index) => input.filter((num) => num === index).length
);

const sum = (n: number) => (n * (n + 1)) / 2;

const countWeightOfRearranging = (list: number[], target: number) =>
  list.reduce(
    (total, current, index) => total + current * sum(Math.abs(target - index)),
    0
  );

const leastRequiredFuel = list.reduce(
  (leastKnown, _, index) =>
    Math.min(leastKnown, countWeightOfRearranging(list, index)),
  Infinity
);

console.log(leastRequiredFuel);
