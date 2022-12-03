const fs = require("fs");

const priorities =
  "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const prepareData = () =>
  fs
    .readFileSync("./day3/input.txt", { encoding: "utf8" })
    .trim()
    .split(/\r?\n/g)
    .map((item) => item.trim().split(""));

/*
Part one
*/

const p1 = () => prepareData()
    .map((item) => [
      item.slice(0, item.length / 2),
      item.slice(item.length / 2, item.length),
    ])
    .map((compartments) =>
      compartments[0]
        .map((item) => (compartments[1].indexOf(item) > -1 ? item : null))
        .filter(Boolean)
    )
    .map((sharedItems) => sharedItems[0])
    .filter(Boolean)
    .reduce((sum, item) => sum + priorities.indexOf(item[0]), 0);


/*
Part two
*/
const p2 = () => prepareData()
    .map((_, index, data) => (index % 3 ? null : data.slice(index, index + 3)))
    .filter(Boolean)
    .map((bags) =>
      bags[0]
        .map((item) =>
          bags[1].indexOf(item) > -1 && bags[2].indexOf(item) > -1 ? item : null
        )
        .filter(Boolean)
    )
    .map((sharedItems) => sharedItems[0])
    .filter(Boolean)
    .reduce((sum, item) => sum + priorities.indexOf(item[0]), 0);

module.exports = { p1, p2 };
