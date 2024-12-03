const prepareData = (inputString) => {
  const splitLines = inputString
    .split(/^[[0-9|\s]+$/gm)
    .map((lines) => lines.split(/\r\n|\r|\n/g).filter(Boolean));

  const [stacksLines, movesLines] = splitLines;

  const stacks = [];
  stacksLines.forEach((line) =>
    Array.from(line)
      .map((_, index, inline) =>
        index % 4 ? null : inline.slice(index, index + 4)
      )
      .filter(Boolean)
      .forEach((box, index) => {
        if (!stacks[index]) stacks[index] = [];
        box[1].trim() && stacks[index].unshift(box[1].trim());
      })
  );

  const moves = movesLines
    .map((line) =>
      line
        .split(" ")
        .map((word) => word.replace(/[^0-9]/g, ""))
        .filter(Boolean)
        .map((e) => parseInt(e))
    )
    .map(([move, from, to]) => ({ move, from, to }));

  return {
    stacks: JSON.parse(JSON.stringify(stacks)),
    moves: JSON.parse(JSON.stringify(moves)),
  };
};

/*
Part one
*/

export const p1 = (inputString) => {
  const { moves, stacks } = prepareData(inputString);

  moves.forEach((move) => {
    for (let index = 0; index < move.move; index++) {
      stacks[move.to - 1].push(stacks[move.from - 1].pop());
    }
  });
  return stacks.map((stack) => stack.pop()).join("");
};
/*
Part two
*/
export const p2 = (inputString) => {
  const { moves, stacks } = prepareData(inputString);

  moves.forEach((move) => {
    const tempStack = [];
    for (let index = 0; index < move.move; index++) {
      tempStack.push(stacks[move.from - 1].pop());
    }
    stacks[move.to - 1].push(...tempStack.reverse());
  });
  return stacks.map((stack) => stack.pop()).join("");
};
