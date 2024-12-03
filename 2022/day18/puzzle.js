//getCoordString
const gcs = (x, y, z) => `${x},${y},${z}`;

let maxX = -Infinity;
let minX = Infinity;
let maxY = -Infinity;
let minY = Infinity;
let maxZ = -Infinity;
let minZ = Infinity;

const prepareData = (inputString) => {
  return inputString
    .trim()
    .split(/\r?\n/g)
    .reduce((data, line) => ({ ...data, [line]: true }), {});
};

const getNeighbourStrings = (drop, part1) => {
  const [x, y, z] = drop.split(",").map((x) => parseInt(x));
  const left = (part1 || x >= minX) && gcs(x - 1, y, z);
  const right = (part1 || x <= maxX) && gcs(x + 1, y, z);
  const up = (part1 || y >= minY) && gcs(x, y - 1, z);
  const down = (part1 || y <= maxY) && gcs(x, y + 1, z);
  const front = (part1 || z >= minZ) && gcs(x, y, z - 1);
  const back = (part1 || z <= maxZ) && gcs(x, y, z + 1);
  const neighbouringDroplets = [left, right, up, down, front, back];
  return neighbouringDroplets.filter(Boolean);
};

const checkSideTouching = (source, target, part1) => {
  return Object.keys(source).reduce((amount, drop) => {
    const neighbouringDroplets = getNeighbourStrings(drop, true);
    const amountOfNonNeighbours = neighbouringDroplets.filter((xyz) =>
      part1 ? !target[xyz] : target[xyz]
    );
    return amountOfNonNeighbours.length + amount;
  }, 0);
};

/*
Part one
*/
export const p1 = (inputString) => {
  const droplets = prepareData(inputString);
  return checkSideTouching(droplets, droplets, true);
};

//fill up outer space, check which droplet it touches
const fillOutSide = (currectSpace, finalSpace, visitedSpaces, droplets) => {
  visitedSpaces[currectSpace] = true;
  if (currectSpace === finalSpace) return;

  //get neighbours that we havent visited, and are not the drop
  const neighbours = getNeighbourStrings(currectSpace).filter(
    (nb) => !droplets[nb] && !visitedSpaces[nb]
  );

  //for the neighbours that we havent visited, recurse!
  for (const nb of neighbours) {
    fillOutSide(nb, finalSpace, visitedSpaces, droplets);
  }
};

/*
Part two
*/
export const p2 = (inputString) => {
  const droplets = prepareData(inputString);

  Object.keys(droplets).forEach((key) => {
    const [x, y, z] = key.split(",").map((i) => parseInt(i));
    if (x > maxX) maxX = x;
    if (x < minX) minX = x;
    if (y > maxY) maxY = y;
    if (y < minY) minY = y;
    if (z > maxZ) maxZ = z;
    if (z < minZ) minZ = z;
  });
  console.log((maxX + 1 - minX) * (maxY + 1 - minY) * (maxZ + 1 - minZ));
  const visitedSpaces = {};
  let currectSpace = gcs(minX, minY, minZ);
  let finalSpace = gcs(maxX, maxY, maxZ);

  //mutates visitedSpaces, need later
  fillOutSide(currectSpace, finalSpace, visitedSpaces, droplets);

  return checkSideTouching(droplets, visitedSpaces);
};
