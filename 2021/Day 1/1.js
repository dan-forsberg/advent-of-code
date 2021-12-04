import fs from 'fs';
const input = fs.readFileSync('1-input.json', 'utf-8').split(/\r?\n/);

const countIncreasing = (previous, current, index, total) => {
  console.log(index);
  if (index == input.length) return total;

  total += previous > current ? 0 : 1;

  return countIncreasing(
    parseInt(current),
    parseInt(input[index + 1]),
    index + 1,
    total
  );
};

console.log(countIncreasing(parseInt(input[0]), parseInt(input[1]), 1, 0));
