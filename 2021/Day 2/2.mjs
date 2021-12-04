import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/);

let horizontal = 0;
let aim = 0;
let depth = 0;

input.forEach((line) => {
  if (line.length > 1) {
    const [direction, num] = line.split(' ');
    const x = parseInt(num);

    switch (direction) {
      case 'forward':
        horizontal += x;
        depth += aim * x;
        break;
      case 'up':
        aim -= x;
        break;
      default:
        aim += x;
    }
  }
});

console.log(depth * horizontal);
