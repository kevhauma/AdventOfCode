const fs = require("fs");
const { off } = require("process");

const prepareData = () =>
  fs.readFileSync("./day6/input.txt", { encoding: "utf8" });

const findIndexWithUniqueCharsInRange = (data, range) =>
  Array.from(data).reduce((marker, letter, index) => {
    if (index < range || marker) return marker;

    const fourLast = new Set(data.slice(index - range, index));

    if (fourLast.size === range) return index;
  }, 0);

/*
Part one
*/
const p1 = () => findIndexWithUniqueCharsInRange(prepareData(), 4);

/*
Part two
*/
const p2 = () => findIndexWithUniqueCharsInRange(prepareData(), 14);

module.exports = { p1, p2 };
