const input = (await Deno.readTextFile("./test.txt")).trim().split(/\r?\n/);

const _caves = input.flatMap((line) => line.split("-"));
const caves = [
  ...new Set(_caves.filter((cave) => cave !== "start" && cave !== "end")),
];

class Node {
  public isSmall: boolean;
  public next: Node;
  public previous: Node;

  constructor(name: string) {
    this.isSmall = name.toLowerCase() === name;
  }

  setNext(node: Node) {
    this.next = node;
  }

  setPrev(node: Node) {
    this.previous = node;
  }
}
