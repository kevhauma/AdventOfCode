const fs = require("fs");

const prepareData = () =>
  fs
    .readFileSync("./day4/input.txt", { encoding: "utf8" })
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

const p1 = () =>
  //my start is after other start. AND my end is before other end
  //and vice versa
  prepareData().filter(
    ([first, second]) =>
      (first.min >= second.min && first.max <= second.max) ||
      (second.min >= first.min && second.max <= first.max)
  ).length;

/*
Part two
*/
const p2 = () =>
  // my start is before other end, AND my end is after other start
  prepareData().filter(
    ([first, second]) => first.min <= second.max && first.max >= second.min
  ).length;

module.exports = { p1, p2 };
