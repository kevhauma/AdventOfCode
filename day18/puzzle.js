const fs = require("fs");
//getCoordString
const gcs = (x, y, z) => `${x},${y},${z}`;

const prepareData = (inputString, inputPath) => {
  return inputString
    .trim()
    .split(/\r?\n/g)
    .map((l) => {
      const [x, y, z] = l.split(",");
      return { x, y, z };
    })
    .reduce((data, { x, y, z }) => ({ ...data, [`${x},${y},${z}`]: true }), {});
};

/*
Part one
*/
const p1 = (inputString, inputPath) => {
  const droplets = prepareData(inputString, inputPath);
  return Object.keys(droplets).reduce((amount, drop) => {
    const [x, y, z] = drop.split(",").map((x) => parseInt(x));
    const left = droplets[gcs(x - 1, y, z)];
    const right = droplets[gcs(x + 1, y, z)];
    const up = droplets[gcs(x, y + 1, z)];
    const down = droplets[gcs(x, y - 1, z)];
    const front = droplets[gcs(x, y, z + 1)];
    const back = droplets[gcs(x, y, z - 1)];
    const neighbouringDroplets = [left, right, up, down, front, back];
    const amountOfNonNeighbours = neighbouringDroplets.filter(x=>!x);
    return amountOfNonNeighbours.length + amount;
  }, 0);
};

/*
Part two
*/
const p2 = (inputString, inputPath) => {
  const data = prepareData(inputString, inputPath);
};

module.exports = { p1, p2 };
