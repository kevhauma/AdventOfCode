const fs = require("fs");

const prepareData = () =>
  fs
    .readFileSync("./day4/input.txt", { encoding: "utf8" })
    .trim()
    .split(/\r?\n/g)
    .map((item) => item.trim().split(","))
    .map((pairs) =>
      pairs.map((pair) => pair.split("-").map((x) => parseInt(x)))
    );

/*
Part one
*/

const p1 = () =>
  prepareData()
    .map(
      (pairs) => //my start is after other start. AND end is before other end
        (pairs[0][0] <= pairs[1][0] && pairs[0][1] >= pairs[1][1]) ||
        (pairs[1][0] <= pairs[0][0] && pairs[1][1] >= pairs[0][1] && pairs)
    )
    .filter(Boolean).length;

/*
Part two
*/
const p2 = () =>
  prepareData()
    .map(
      (pairs) => // my start is before other end, AND my end is after his start
        (pairs[0][0] <= pairs[1][1] && pairs[0][1] >= pairs[1][0]) ||
        (pairs[1][1] <= pairs[0][0] && pairs[1][0] >= pairs[0][1] && pairs)
    )
    .filter(Boolean).length;

module.exports = { p1, p2 };
