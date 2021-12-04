import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/);

// construct an array of {zero, one, ...} with length of number of digits
const count = input[0]
  .split('')
  .map(() => ({ zero: 0, one: 0, mostCommon: 0, leastCommon: 0 }));

input.forEach((line) => {
  line.split('').forEach((bit, index) => {
    const currentDigit = count[index];
    bit === '0' ? currentDigit.zero++ : currentDigit.one++;

    const moreZero = currentDigit.zero > currentDigit.one;
    currentDigit.mostCommon = moreZero ? 0 : 1;
    currentDigit.leastCommon = moreZero ? 1 : 0;
  });
});

const binGamma = count.map((val) => val.mostCommon).join('');
const binEpsilon = count.map((val) => val.leastCommon).join('');

const gamma = parseInt(binGamma, 2);
const epsilon = parseInt(binEpsilon, 2);

console.log(gamma * epsilon);
