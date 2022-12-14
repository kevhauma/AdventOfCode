const fs = require("fs");
const chute = { x: 500, y: 0 };
const visualize = (walls, sand, min, max) => {
  for (let y = min.y < chute.y ? min.y : chute.y; y <= max.y; y++) {
    let line = "";
    for (let x = min.x; x <= max.x; x++) {
      if (x === chute.x && y === chute.y) line += "+";
      else if (walls.find((w) => w.x === x && w.y === y)) line += "#";
      else if (sand.find((s) => s.x === x && s.y === y)) line += "0";
      else line += ".";
    }
    console.log(line);
  }
};

const isSpaceOccupied = (space, walls, sand, maxY,part2) =>
  Boolean([...walls, ...sand]
    .find((s) => (part2 && space.y >= maxY + 2) 
        ? true 
        : s.x === space.x && s.y === space.y
        )
    );

const getNextSpace = (start, walls, sand, maxY,part2) => {
  const availableNextSpaces = [
    { x: start.x, y: start.y + 1 }, //down
    { x: start.x - 1, y: start.y + 1 }, //downLeft
    { x: start.x + 1, y: start.y + 1 }, //downRight
  ];
  for (const availableNextSpace of availableNextSpaces) {
    if (!part2 && availableNextSpace.y > maxY) return "AAAAAAH I CANT STOP FALLING";    
    if (!isSpaceOccupied(availableNextSpace, walls, sand,maxY,part2)) {
      return getNextSpace(availableNextSpace, walls, sand, maxY,part2);
    }
  }
  return start;
};
const prepareData = (inputPath) => {
  const wallCommands = fs
    .readFileSync(inputPath, { encoding: "utf8" })
    .trim()
    .split(/r?\n/g)
    .map((line) =>
      line.split(" -> ").map((coords) => ({
        x: parseInt(coords.split(",")[0]),
        y: parseInt(coords.split(",")[1]),
      }))
    );
  const walls = [];
  wallCommands.forEach((cmds) => {
    let prevCmd = cmds.pop();
    while (cmds.length) {
      const currCmd = cmds.pop();
      const [largestX, smallestX] =
        prevCmd.x < currCmd.x ? [currCmd.x, prevCmd.x] : [prevCmd.x, currCmd.x];
      const [largestY, smallestY] =
        prevCmd.y < currCmd.y ? [currCmd.y, prevCmd.y] : [prevCmd.y, currCmd.y];

      for (let x = smallestX; x <= largestX; x++) {
        walls.push({ x, y: currCmd.y });
      }
      for (let y = smallestY; y <= largestY; y++) {
        walls.push({ x: currCmd.x, y });
      }

      prevCmd = currCmd;
    }
  });
  const maxX = Math.max(...walls.map((w) => w.x));
  const minX = Math.min(...walls.map((w) => w.x));
  const maxY = Math.max(...walls.map((w) => w.y));
  const minY = Math.min(...walls.map((w) => w.y));
  return { walls, min: { x: minX, y: minY }, max: { x: maxX, y: maxY } };
};

/*
Part one
*/
const p1 = (inputPath) => {
  const data = prepareData(inputPath);
  const sand = [];
  while (true) {
    const sandFall = getNextSpace(chute, data.walls, sand, data.max.y);
    if (sandFall.x) sand.push(sandFall);
    else break;
  }
  visualize(data.walls, sand, data.min, data.max);
  return sand.length;
};

/*
Part two
*/
const p2 = (inputPath) => {
  const data = prepareData(inputPath);

  const sand =[]
  while (true) {
    const sandFall = getNextSpace(chute, data.walls, sand, data.max.y,true);
    sand.push(sandFall);
    if (sandFall.x === chute.x && sandFall.y === chute.y) break;
  }
  visualize(data.walls, sand, data.min, data.max);
  return sand.length
};

module.exports = { p1, p2 };
