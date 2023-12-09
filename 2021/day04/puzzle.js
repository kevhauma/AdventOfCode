class BingoBoard {
  board = [];
  constructor(lines) {
    lines.forEach((line) => {
      this.board.push(
        line
          .split(" ")
          .map((number) => ({ marked: false, number: Number(number) }))
      );
    });
  }
  markNumber(number) {
    this.board.forEach((line) => {
      line.forEach((boardNumber) => {
        if (boardNumber.number === number) {
          boardNumber.marked = true;
        }
      });
    });
  }

  checkWin(rows) {
    const winningRows = this.board.reduce((winRow, line) => {
      return winRow + Number(line.every((boardNumber) => boardNumber.marked));
    }, 0);
    return rows === winningRows;
  }
  getResult() {
    let result = 0;
    this.board.forEach((line) => {
      line.forEach((boardNumber) => {
        if (!boardNumber.marked) result += boardNumber.number;
      });
    });
    return result;
  }
}

const p1 = (inputString) => {
  const input = inputString.split("\n").filter(Boolean);

  const pulledNumbers = input.shift().split(",").map(Number);

  let boards = [];

  for (let i = 0; i < input.length; ) {
    lines = [];
    for (let ii = 0; ii < 5; ii++) {
      lines.push(input[i]);
      i++;
    }
    boards.push(new BingoBoard(lines));
  }

  //works with testcase, not with real input
  let winningNumber;
  pulledNumbers.forEach((pulledNumber) => {
    if (winningNumber) return;
    boards.forEach((board) => {
      board.markNumber(pulledNumber);
      if (board.checkWin(1)) {
        winningNumber = board.getResult() * pulledNumber;
      }
    });
  });
  return winningNumber;
};
//=================================================================================
const p2 = (inputString) => {
    const input = inputString.split("\n").filter(Boolean);
    return null
  };

  
  module.exports = { p1, p2 };