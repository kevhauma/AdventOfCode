const fs = require("fs");

const prepareData = (inputPath) =>
  fs
    .readFileSync(inputPath, { encoding: "utf8" })
    .trim()
    .split(/\r?\n/g)
    .map((item) =>
      item
        .trim()
        .split(",")
        .map((pair) => ({
          min: parseInt(pair.split("-")[0]),
          max: parseInt(pair.split("-")[1]),
        }))
    );

/*
Part one
*/

const p1 = (inputPath) =>
  //my start is after other start. AND my end is before other end
  //and vice versa
  prepareData(inputPath).filter(
    ([first, second]) =>
      (first.min >= second.min && first.max <= second.max) ||
      (second.min >= first.min && second.max <= first.max)
  ).length;

/*
Part two
*/
const p2 = (inputPath) =>
  // my start is before other end, AND my end is after other start
  prepareData(inputPath).filter(
    ([first, second]) => first.min <= second.max && first.max >= second.min
  ).length;

module.exports = { p1, p2 };
