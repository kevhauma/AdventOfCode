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

const p1 = () => {
  return prepareData()
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
};

/*
Part two
*/
const p2 = () => {
  const data = prepareData();
  const chunked = [];
  for (let index = 0; index < data.length; index += 3) {
    //for the love of god pls
    chunked.push(data.slice(index, index + 3));
  }
  return chunked
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
};

module.exports = { p1, p2 };
