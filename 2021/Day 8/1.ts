const segments = (await Deno.readTextFile("./input.txt"))
  .trim()
  .split(/\r?\n/)
  .map((line) => line.split(" | ")[1].split(" "))
  .flat(1);

enum KnownDigits {
  ONE = 2,
  SEVEN = 3,
  FOUR = 4,
  EIGHT = 7,
}

const count = {
  ONE: 0,
  SEVEN: 0,
  FOUR: 0,
  EIGHT: 0,
};

console.log(KnownDigits[2]);

segments.forEach((segment) => {
  const digit = KnownDigits[segment.length] as string | undefined;
  if (digit) {
    // @ts-ignore shush
    count[digit]++;
  }
});

console.log(count);
console.log(count.FOUR + count.ONE + count.SEVEN + count.EIGHT);
