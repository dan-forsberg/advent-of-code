import fs from 'fs';
const input = fs.readFileSync('input.txt', 'utf-8').split(/\r?\n/);

class Board {
  /**
   * @param {string[]} lines
   */
  constructor(lines) {
    this.boardNumbers = lines
      .map((line) => line.trim().split(/\s+/))
      .map((numbers) => numbers.map((num) => parseInt(num)));

    this.markedNumbers = [];
  }

  /**
   * @param {number} num
   */
  addMarkedNumber(num) {
    this.markedNumbers.push(num);
  }

  checkIfWon() {
    let hasWon = false;

    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        const current = this.boardNumbers[y][x];
        if (!this.markedNumbers.includes(current)) break;

        if (x === 4) hasWon = true;
      }
    }

    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        const current = this.boardNumbers[y][x];
        if (!this.markedNumbers.includes(current)) break;

        if (y === 4) hasWon = true;
      }
    }

    return hasWon;
  }

  calculateScore() {
    const flat = this.boardNumbers.flat(1);
    const unmarked = flat.filter((num) => !this.markedNumbers.includes(num));
    const sum = unmarked.reduce((prev, next) => prev + next, 0);

    return sum * this.markedNumbers.pop();
  }
}

const getBoards = () => {
  let lineIndex = 2;
  const boards = [];

  while (lineIndex + 5 <= input.length) {
    const lines = input.slice(lineIndex, lineIndex + 5);
    const board = new Board(lines);
    boards.push(board);

    lineIndex += 5 + 1;
  }

  return boards;
};

const drawnNumbers = input[0].split(',').map((num) => parseInt(num));
const boards = getBoards();

let winningBoard = null;
let index = 0;
do {
  for (const board of boards) {
    board.addMarkedNumber(drawnNumbers[index]);
    if (board.checkIfWon()) {
      winningBoard = board;
      break;
    }
  }

  index++;
} while (!winningBoard);

const score = winningBoard.calculateScore();

console.log(score);
