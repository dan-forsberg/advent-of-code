const input = (await Deno.readTextFile("./input.txt")).trim().split(",");

const ITERATIONS = 256;

const fishes = [0, 0, 0, 0, 0, 0, 0, 0, 0];

const swapAllAround = (arr: number[]) => {
  const last = arr.shift() as number;
  arr.push(last);
  arr[6] += last;

  return arr;
};

for (const fish of input) {
  fishes[parseInt(fish)]++;
}

for (let i = 0; i < ITERATIONS; i++) {
  swapAllAround(fishes);
}

const total = fishes.reduce((prev, curr) => prev + curr, 0);
console.log(total);
