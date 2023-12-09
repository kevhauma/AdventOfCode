function convertData(data) {
  let lines = data.split("\n");
  let height = lines.length;
  let width = lines[0].split("").length;

  let trees = [];

  lines.forEach((line, y) => {
    let cells = line.split("");
    cells.forEach((cell, x) => {
      if (cell === "#") trees.push({ x, y });
    });
  });

  return { width, height, trees };
}

function coordsAdd(map, coord1, coord2) {
  let x = coord1.x + coord2.x;
  let y = coord1.y + coord2.y;
  if (x >= map.width) x -= map.width;
  return { x, y };
}

function findTree(trees, coord) {
  return trees.filter((tree) => tree.x == coord.x && tree.y == coord.y);
}

// PART ONE
// ============================================================================================
const p1 = (inputString) => {
  let map = convertData(inputString);

  const slope = { x: 3, y: 1 };
  let toboggan = { x: 0, y: 0 };

  let amountOfTrees = 0;

  while (toboggan.y < map.height) {
    let nextcoord = coordsAdd(map, toboggan, slope);

    let tree = findTree(map.trees, nextcoord);

    if (tree.length) amountOfTrees++;

    toboggan = nextcoord;
  }

  return amountOfTrees;
};

// PART TWO
// ============================================================================================
const p2 = (inputString) => {
  let map = convertData(inputString);

  const slopes = [
    { x: 3, y: 1 },
    { x: 1, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ];

  let treesEncountered = [];

  slopes.forEach((slope) => {
    let toboggan = { x: 0, y: 0 };

    let amountOfTrees = 0;

    while (toboggan.y < map.height) {
      let nextcoord = coordsAdd(map, toboggan, slope);

      let tree = findTree(map.trees, nextcoord);

      if (tree.length) amountOfTrees++;

      toboggan = nextcoord;
    }
    treesEncountered.push(amountOfTrees);
  });

  let result = treesEncountered.reduce((mult, curr) => mult * curr, 1);

  return result;
};

module.exports = { p1, p2 };
