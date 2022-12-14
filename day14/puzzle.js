const fs = require("fs");
const chute = { x: 500, y: 0 };
const visualize = (walls, sand, min, max) => {
  for (let y = min.y < chute.y ? min.y : chute.y; y <= max.y; y++) {
    let line = "";
    for (let x = min.x; x <= max.x; x++) {
      if (x === chute.x && y === chute.y) line += "+";
      else if (walls[`${x},${y}`] = true) line += "#";
      else if (sand[`${x},${y}`]) line += "0";
      else line += ".";
    }
    console.log(line);
  }
};

const isSpaceOccupied = (space, walls, sand, maxY, part2) =>
  walls[`${space.x},${space.y}`] || sand[`${space.x},${space.y}`] ||
  (part2 && space.y >= maxY + 2);

const getNextSpace = (start, walls, sand, maxY, part2) => {
  const availableNextSpaces = [
    { x: start.x, y: start.y + 1 }, //down
    { x: start.x - 1, y: start.y + 1 }, //downLeft
    { x: start.x + 1, y: start.y + 1 }, //downRight
  ];
  for (const availableNextSpace of availableNextSpaces) {
    if (!part2 && availableNextSpace.y > maxY)
      return "AAAAAAH I CANT STOP FALLING";
      //console.log(walls)
    if (!isSpaceOccupied(availableNextSpace, walls, sand, maxY, part2)) {
      return getNextSpace(availableNextSpace, walls, sand, maxY, part2);
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
  const walls = {};
  let maxX = 0
  let minX = Infinity;
  let maxY = 0;
  let minY = Infinity;

  wallCommands.forEach((cmds) => {
    let prevCmd = cmds.pop();
    while (cmds.length) {
      const currCmd = cmds.pop();
      const [largestX, smallestX] =
        prevCmd.x < currCmd.x ? [currCmd.x, prevCmd.x] : [prevCmd.x, currCmd.x];
      const [largestY, smallestY] =
        prevCmd.y < currCmd.y ? [currCmd.y, prevCmd.y] : [prevCmd.y, currCmd.y];

      for (let x = smallestX; x <= largestX; x++) {
        walls[`${x},${currCmd.y}`] = true;
      }
      for (let y = smallestY; y <= largestY; y++) {
        walls[`${currCmd.x},${y}`] = true;
      }
      maxX = largestX > maxX ? largestX : maxX
      minX = smallestX < minX ? smallestX : minX
      maxY = largestY > maxY ? largestY : maxY;
      minY = smallestY < minY ? smallestY : minY;
      prevCmd = currCmd;
    }
  });
  
  return { walls, min: { x: minX, y: minY }, max: { x: maxX, y: maxY } };
};

/*
Part one
*/
const p1 = (inputPath) => {
  const data = prepareData(inputPath);
  
  const sand = {};
  while (true) {
    const sandFall = getNextSpace(chute, data.walls, sand, data.max.y);
    if (sandFall.x) sand[`${sandFall.x},${sandFall.y}`] = true
    else break;
  }
  //$visualize(data.walls, sand, data.min, data.max);
  return Object.keys(sand).length;
};

/*
Part two
*/
const p2 = (inputPath) => {
  const data = prepareData(inputPath);

  const sand = [];
  while (true) {
    const sandFall = getNextSpace(chute, data.walls, sand, data.max.y, true);
    sand[`${sandFall.x},${sandFall.y}`] = true;
    if (sandFall.x === chute.x && sandFall.y === chute.y) break;
  }
  //visualize(data.walls, sand, data.min, data.max);
  return Object.keys(sand).length;
};

module.exports = { p1, p2 };
