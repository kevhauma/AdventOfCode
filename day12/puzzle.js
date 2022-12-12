const fs = require("fs");

const vizualise = (path) => {
  const width = Math.max(...path.map((p) => p.x)) + 1;
  const height = Math.max(...path.map((p) => p.y)) + 1;
  const arrows = path.map((p, i) => {
    let arrow = ".";
    const nx = path[i + 1];
    if (!nx) arrow = "0";
    else if (p.x > nx.x) arrow = "<";
    else if (p.x < nx.x) arrow = ">";
    else if (p.y > nx.y) arrow = "^";
    else if (p.y < nx.y) arrow = "V";
    return { arrow, x: p.x, y: p.y };
  });

  for (let y = 0; y < height; y++) {
    let line = "";
    for (let x = 0; x < width; x++) {
      const found = arrows.find((a) => a.x === x && a.y === y);
      line += found ? found.arrow : ".";
    }
    console.log(line);
  }
};

const prepareData = () => {
  return fs
    .readFileSync("./day12/input.txt", { encoding: "utf8" })
    .trim()
    .split(/\r?\n/g)
    .map((x) => x.split(""));
};
const cell = (letter, x, y) => ({ letter, x, y });
const findNeighboursToGoTo = (data, currCell, prevCells, width, heigth) => {
  const { x, y, letter } = currCell;
  const neighbours = [];
  if (x !== width - 1) neighbours.push(cell(data[y][x + 1], x + 1, y));
  if (x !== 0) neighbours.push(cell(data[y][x - 1], x - 1, y));
  if (y !== heigth - 1) neighbours.push(cell(data[y + 1][x], x, y + 1));
  if (y !== 0) neighbours.push(cell(data[y - 1][x], x, y - 1));

  return neighbours.filter((n) => {
    //if letter is E, check on letter z
    if (n.letter === "E") return "z".charCodeAt(0) - letter.charCodeAt(0) <= 1;
    else
      return (
        n.letter.charCodeAt(0) - letter.charCodeAt(0) <= 1 &&
        !prevCells.find((c) => c.x === n.x && c.y === n.y)
      );
  });
};

const findPath = (data, currCell, prevCells, width, heigth, end) => {
  const previousCells = [...prevCells, currCell];
  const neighbours = findNeighboursToGoTo(
    data,
    currCell,
    prevCells,
    width,
    heigth
  );

  if (neighbours.find((n) => n.letter === "E")) {
    return [...previousCells, end];
  }
    console.log("pathLength: ", previousCells.length);
//vizualise(previousCells)
const paths = []
for (const n of neighbours) {
    const p = findPath(data, n, previousCells, width, heigth, end);
    if(p?.length)
    paths.push(p)
}
  const nPath = paths
    .sort((a, b) => a.length - b.length)[0];
    
  return nPath;
};

/*
Part one
*/
const p1 = () => {
  const data = prepareData();
  const width = data[0].length;
  const heigth = data.length;
  let startCell = { letter: "a", x: -1, y: -1 };
  let endCell = { letter: "E", x: -1, y: -1 };
  data.forEach((row, y) => {
    let x = row.findIndex((letter) => letter === "S");
    if (x !== -1) startCell = { ...startCell, x, y };
    x = row.findIndex((letter) => letter === "E");
    if (x !== -1) endCell = { ...endCell, x, y };
  });
  const foundPath = findPath(data, startCell, [], width, heigth, endCell);
  
  vizualise(foundPath);
  return foundPath.length -1
};

/*
Part two
*/
const p2 = () => {
  const data = prepareData();
};

module.exports = { p1, p2 };
p1()