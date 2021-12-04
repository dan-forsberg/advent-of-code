import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/);

class Count {
  constructor() {
    this.zeros = 0;
    this.ones = 0;
    this.mostCommon = 0;
    this.oneNumbers = [];
    this.zeroNumbers = [];
  }

  addNum(bit, num) {
    if (bit === '1') {
      this.ones++;
      this.oneNumbers.push(num);
    } else {
      this.zeros++;
      this.zeroNumbers.push(num);
    }

    this.mostCommon = this.ones > this.zeros ? 1 : 0;
  }

  getMostCommon() {
    if (this.ones >= this.zeros) return this.oneNumbers;
    return this.zeroNumbers;
  }

  getLeastCommon() {
    if (this.ones < this.zeros) return this.oneNumbers;
    return this.zeroNumbers;
  }
}

// construct an array of Count with length of number of digits
const count = input[0].split('').map(() => new Count());

const countMostCommonBit = (bits, count) => {
  bits.split('').forEach((bit, index) => {
    count[index].addNum(bit, bits);
  });
};

input.forEach((line) => {
  countMostCommonBit(line, count);
});

const countOxygenOrCo2 = (countOxygen) => {
  let results = countOxygen
    ? count[0].getMostCommon()
    : count[0].getLeastCommon();
  for (let index = 1; index < count.length && results.length > 1; index++) {
    const tmpCount = new Count();
    for (let i = 0; i < results.length; i++) {
      tmpCount.addNum(results[i][index], results[i]);
    }

    results = countOxygen
      ? tmpCount.getMostCommon()
      : tmpCount.getLeastCommon();
  }

  return results;
};

const oxygen = countOxygenOrCo2(true);
const co2 = countOxygenOrCo2(false);

console.log(parseInt(oxygen[0], 2) * parseInt(co2[0], 2));
