const input = (await Deno.readTextFile("./test.txt"))
  .trim()
  .split(/\r?\n/)
  .map((line) => line.split("").map((num) => parseInt(num)));

console.log(input);
