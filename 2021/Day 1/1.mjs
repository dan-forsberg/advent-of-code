// @ts-nocheck
import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/);
const countIncreasing = (
  previous = input[0],
  current = input[1],
  index = 1,
  total = 0
) => {
  return index == input.length || isNaN(current)
    ? total
    : countIncreasing(
        parseInt(current),
        parseInt(input[index + 1]),
        index + 1,
        total + previous > current ? 0 : 1
      );
};

console.log(countIncreasing);
