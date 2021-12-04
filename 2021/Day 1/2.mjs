import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/);

const sumOfNextThree = (index) =>
  parseInt(input[index]) +
  parseInt(input[index + 1]) +
  parseInt(input[index + 2]);

const countIncreasing = (previous, index, sumOfInc) => {
  const current = sumOfNextThree(index);
  sumOfInc += current > previous ? 1 : 0;

  return isNaN(current)
    ? sumOfInc
    : countIncreasing(current, index + 1, sumOfInc);
};

console.log(countIncreasing(Infinity, 0, 0));
