const visualize = (map, pos) => {
  map.forEach((row, rowI) => {
    const displayRow = [...row];
    if (rowI === pos.y) displayRow[pos.x] = "X";
    console.log(displayRow.join(""));
  });
};

const prepareData = (inputString, inputPath) => {
  const map = inputString
    .trimEnd()
    .split(/\r?\n/g)
    .map((line) => line.split(""))
    .filter((x) => x.length);
  const instructionsString = map.pop().join("");

  const instructionLength = instructionsString
    .split(/[^0-9]/g)
    .filter(Boolean)
    .map((x) => parseInt(x));
  const instructionDirections = instructionsString
    .split(/[^(L|R)]/g)
    .filter(Boolean);

  const instructions = instructionLength
    .map((len, i) => [len, instructionDirections[i]])
    .flat(1)
    .filter(Boolean);

  const width = Math.max(...map.map((row) => row.length));
  const filledMap = map.map((row) => {
    const fullRow = Array.from(Array(width)).map((_) => " ");
    row.forEach((x, i) => (fullRow[i] = x));
    return fullRow;
  });
  return { map: filledMap, instructions };
};
//scores
const S = {
  R: 0,
  L: 2,
  U: 3,
  D: 1,
};
//moves
const M = {
  R: "R",
  L: "L",
  U: "U",
  D: "D",
};
//turns
const T = {
  R: { L: "U", R: "D" },
  L: { L: "D", R: "U" },
  U: { L: "L", R: "R" },
  D: { L: "R", R: "L" },
};
const findFirstInArray = (array) => {
  return array?.findIndex((x) => Boolean(x.trim()));
};

const findFirstInRow = (map, y) => {
  return findFirstInArray(map[y]);
};
const findLastInRow = (map, y) => {
  const reverseIndex = findFirstInArray([...map[y]].reverse());
  return map[y].length - 1 - reverseIndex;
};
const findFirstInColumn = (map, x) => {
  return findFirstInArray(map.map((row) => row[x]));
};
const findLastInColumn = (map, x) => {
  const column = map.map((row) => row[x]);
  const reverseIndex = findFirstInArray([...column.reverse()]);
  return column.length - 1 - reverseIndex;
};

const isPosOutOfBounds = (map, x, y) => {
  return map[y]?.[x] !== "." && !isPosWall(map, x, y);
};
const isPosWall = (map, x, y) => {
  return map[y]?.[x] === "#";
};

/*
Part one
*/
const p1 = (inputString, inputPath) => {
  const { map, instructions } = prepareData(inputString, inputPath);

  let cDir = M.R;
  const startingX = findFirstInRow(map, 0);
  const startingY = findFirstInColumn(map, startingX);
  let cPos = { x: startingX, y: startingY };

  instructions.forEach((instr) => {
    // console.log("---------------------")
    // console.log(instr)
    // visualize(map, cPos);
    //if isNan, is turningInstruction
    if (isNaN(instr)) {
      //T.R.L (look in Turn matrix, what is the next direction for turning left if my current direction is right)
      cDir = T[cDir][instr];

      return;
    }
    let nextXPos = cPos.x;
    let nextYPos = cPos.y;
    //for every movement, check for wra
    for (let count = 0; count < instr; count++) {
      if (cDir === M.R) {
        nextXPos = cPos.x + 1;
        if (isPosOutOfBounds(map, nextXPos, cPos.y)) {
          nextXPos = findFirstInRow(map, cPos.y);
        }
        if (isPosWall(map, nextXPos, cPos.y)) {
          break;
        }
      }
      if (cDir === M.L) {
        nextXPos = cPos.x - 1;
        if (isPosOutOfBounds(map, nextXPos, cPos.y)) {
          nextXPos = findLastInRow(map, cPos.y);
        }
        if (isPosWall(map, nextXPos, cPos.y)) {
          break;
        }
      }
      if (cDir === M.U) {
        nextYPos = cPos.y - 1;
        if (isPosOutOfBounds(map, cPos.x, nextYPos)) {
          nextYPos = findLastInColumn(map, cPos.x);
        }
        if (isPosWall(map, cPos.x, nextYPos)) {
          break;
        }
      }
      if (cDir === M.D) {
        nextYPos = cPos.y + 1;
        if (isPosOutOfBounds(map, cPos.x, nextYPos)) {
          nextYPos = findFirstInColumn(map, cPos.x);
        }
        if (isPosWall(map, cPos.x, nextYPos)) {
          break;
        }
      }

      cPos = { x: nextXPos, y: nextYPos };
    }
  });

  console.log(`1000 * ${cPos.y + 1} + 4 * ${cPos.x + 1} + ${S[cDir]}`);
  return 1000 * (cPos.y + 1) + 4 * (cPos.x + 1) + S[cDir];
};

/*
Part two
*/
const p2 = (inputString, inputPath) => {
  const data = prepareData(inputString, inputPath);
};

module.exports = { p1, p2 };
