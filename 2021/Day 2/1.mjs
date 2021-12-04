import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/);

let horizontal = 0;
let depth = 0;

input.forEach((line) => {
  if (line.length > 1) {
    const [direction, num] = line.split(' ');
    const x = parseInt(num);

    switch (direction) {
      case 'forward':
        horizontal += x;
        break;
      case 'up':
        depth -= x;
        break;
      default:
        depth += x;
    }
  }
});

console.log(depth * horizontal);
