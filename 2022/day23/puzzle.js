const getKey = (x, y) => `${x},${y}`;
const getCoords = (key) => ({
  x: parseInt(key.split(",")[0]),
  y: parseInt(key.split(",")[1]),
});

const directionChecks = [
  {
    check: ({ N, NE, NW }) => !N && !NE && !NW,
    assign: (x, y) => ({ x, y: y - 1 }),
  },
  {
    check: ({ S, SE, SW }) => !S && !SE && !SW,
    assign: (x, y) => ({ x, y: y + 1 }),
  },
  {
    check: ({ W, SW, NW }) => !W && !SW && !NW,
    assign: (x, y) => ({ x: x - 1, y }),
  },
  {
    check: ({ E, SE, NE }) => !E && !SE && !NE,
    assign: (x, y) => ({ x: x + 1, y }),
  },
];

const visualize = (elves) => {
  const border = 1;
  const ePos = Object.entries(elves)
    .map(([key, value]) => (value ? getCoords(key) : null))
    .filter(Boolean);
  const minX = 0; // Math.min(...ePos.map((p) => p.x)) - border;
  const maxX = Math.max(...ePos.map((p) => p.x)) + border;
  const minY = 0; //Math.min(...ePos.map((p) => p.y)) - border;
  const maxY = Math.max(...ePos.map((p) => p.y)) + border;
  for (let y = minY; y <= maxY; y++) {
    let line = "";
    for (let x = minX; x <= maxX; x++) {
      if (elves[getKey(x, y)]) line += "#";
      else line += ".";
    }
    console.log(line);
  }
};
const prepareData = (inputString, inputPath) => {
  const elfArray = inputString
    .trim()
    .split(/\r?\n/g)
    .map((line, y) =>
      line
        .split("")
        .map((char, x) =>
          char === "#" ? { pos: { x, y }, proposal: null } : null
        )
    )
    .flat(1)
    .filter(Boolean);

  const elfObject = {};
  elfArray.forEach((elf) => {
    elfObject[getKey(elf.pos.x, elf.pos.y)] = elf.pos;
  });
  return elfObject;
};

const getNeighbourElves = (elves, { x, y }) => {
  const N = elves[getKey(x, y - 1)];
  const NE = elves[getKey(x + 1, y - 1)];
  const NW = elves[getKey(x - 1, y - 1)];

  const E = elves[getKey(x + 1, y)];
  const W = elves[getKey(x - 1, y)];

  const S = elves[getKey(x, y + 1)];
  const SE = elves[getKey(x + 1, y + 1)];
  const SW = elves[getKey(x - 1, y + 1)];
  return { N, NE, NW, E, W, S, SE, SW };
};

/*
Part one
*/
const p1 = (inputString, inputPath) => {
  const elves = prepareData(inputString, inputPath);
  //visualize(elves);
  //console.log("*********************");
  let elvesMoved = 0;
  let round = 0;
  do {
    const t1 = performance.now();
    elvesMoved = 0;
    //do proposals
    Object.keys(elves).forEach((elfKey) => {
      if (!elves[elfKey]) return;
      const { x, y } = getCoords(elfKey);
      const neighbourElves = getNeighbourElves(elves, { x, y });
      const { N, NE, NW, E, W, S, SE, SW } = neighbourElves;
      //if no neighbours
      if (!N && !NE && !NW && !E && !W && !S && !SE && !SW)
        elves[elfKey] = { x, y };
      //other neighbours
      else {
        let hasBeenAssigned = false;
        for (const { check, assign } of directionChecks) {
          if (!hasBeenAssigned && check(neighbourElves)) {
            elves[elfKey] = assign(x, y);
            hasBeenAssigned = true;
          }
        }
      }
    });
    const t2 = performance.now();
    //console.log("proposing:", t2 - t1, "ms");
    //try to move
    Object.keys(elves).forEach((elfKey) => {
      //if key has no proposal
      if (!elves[elfKey]) return;
      //elfProposal
      const { x, y } = elves[elfKey];
      //if proposal is same as currentposition
      if (getKey(x, y) === elfKey) return;
      //see if there are no other elves with same proposal
      const doubleProposals = Object.entries(elves)
        .filter(([key, value]) => Boolean(value))
        .filter(
          ([key, { x: _x, y: _y }]) => key !== elfKey && x === _x && y === _y
        );

      if (doubleProposals.length !== 0) return;
      //move
      elves[getKey(x, y)] = { x, y };
      elves[elfKey] = null;
      elvesMoved += 1;
    });
    const t3 = performance.now();

    //console.log("moving:", t3 - t2, "ms");
    // visualize(elves);
    // console.log("======");

    //shuffle move check order
    const firstToLast = directionChecks.shift();
    directionChecks.push(firstToLast);
    ++round;
    console.log("round:", round, ":", (t3 - t1).toFixed(3), "ms");
  } while (elvesMoved > 0 && round < 10);
 // visualize(elves);

  const ePos = Object.entries(elves)
    .map(([key, value]) => (value ? getCoords(key) : null))
    .filter(Boolean);
  const minX = Math.min(...ePos.map((p) => p.x));
  const maxX = Math.max(...ePos.map((p) => p.x));
  const minY = Math.min(...ePos.map((p) => p.y));
  const maxY = Math.max(...ePos.map((p) => p.y));

  const area = (maxX+1 - minX) * (maxY+1 - minY);
  console.log(area, "=", maxX - minX, "*", maxX - minY);
  const emptySpots = area - ePos.length;
  console.log(emptySpots, "=", area, "-", ePos.length);

  return;
};

/*
Part two
*/
const p2 = (inputString, inputPath) => {};

module.exports = { p1, p2 };
