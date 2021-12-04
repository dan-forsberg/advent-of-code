import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/);
const countIncreasing = (previous, index, total) => {
  if (input[index] > previous) {
    total++;
  }

  return index === input.length || isNaN(parseInt(input[index + 1]))
    ? total
    : countIncreasing(input[index], index + 1, total);
};

console.log(countIncreasing(Infinity, 0, 0));
