const fs = require("fs");

const prepareData = () => {
  const lines = fs.readFileSync("./day5/input.txt", { encoding: "utf8" });

  const stacks = [];
  const moves = [];

  const [stacksLines, aaah, ...movesLines] = lines
    .split(/(\s[0-9]{1}\s\s?){2,}/g)
    .map((line) => line.split(/\r?\n/g));

  for (const line of stacksLines) {
    const boxesPerLine = Array.from(line)
      .map((_, index, inline) =>
        index % 4 ? null : inline.slice(index, index + 4)
      )
      .filter(Boolean);

    boxesPerLine
      .filter((box) => /[a-zA-Z]|\s/.test(box))
      .forEach((box, index) => {
        if (!stacks[index]) stacks[index] = [];
        stacks[index].unshift(box.join("").replace(/\[|\]/g, "").trim());
      });
  }

  for (const line of movesLines[0].filter(Boolean)) {
    const numbers = line
      .split(" ")
      .map((word) => word.replace(/[^0-9]/g, ""))
      .filter(Boolean)
      .map((e) => parseInt(e));
    moves.push({ move: numbers[0], from: numbers[1], to: numbers[2] });
  }

  return {
    stacks: stacks.map((stack) => stack.filter(Boolean)),
    moves: moves,
  };
};

/*
Part one
*/

const p1 = () => {
  const { moves: movesData, stacks: stacksData } = prepareData();
  const moves = JSON.parse(JSON.stringify(movesData)); //create new array, we dont want to manipulate the arrays from the source
  const stacks = JSON.parse(JSON.stringify(stacksData)); //create new array, we dont want to manipulate the arrays from the source

  moves.forEach((move, i) => {
    for (let index = 0; index < move.move; index++) {
      stacks[move.to - 1].push(stacks[move.from - 1].pop());
    }
  });
  return stacks.map((stack) => stack[stack.length - 1]).join("");
};
/*
Part two
*/
const p2 = () => {
  const { moves: movesData, stacks: stacksData } = prepareData();
  const moves = JSON.parse(JSON.stringify(movesData)); //create new array, we dont want to manipulate the arrays from the source
  const stacks = JSON.parse(JSON.stringify(stacksData)); //create new array, we dont want to manipulate the arrays from the source

  moves.forEach((move, i) => {
    const tempStack = [];
    for (let index = 0; index < move.move; index++) {
      tempStack.push(stacks[move.from - 1].pop());
    }
    stacks[move.to - 1].push(...tempStack.reverse());
  });
  return stacks.map((stack) => stack[stack.length - 1]).join("");
};

module.exports = { p1, p2 };
