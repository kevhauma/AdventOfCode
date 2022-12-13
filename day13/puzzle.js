const fs = require("fs");

const prepareData = () => {
  return fs
    .readFileSync("./day13/test.txt", { encoding: "utf8" })
    .trim()
    .split(/\r?\n\r?\n/g)
    .map((pairs) => pairs.split(/\r?\n/g).map((signal) => JSON.parse(signal)));
};

const compareArray = (firstArr, secondArr, index) => {
  let bothNot = false;
  for (const fI in firstArr) {
    let first = firstArr[fI];
    let second = secondArr[fI];

    //check numbers if not arrays
    if (!Array.isArray(first) && !Array.isArray(second)) {
      if (first < second) {
        return ++index
      }
      if (first > second) {
        return -1
      }
    }
    if (!Array.isArray(first)) first = [first];
    if (!Array.isArray(second)) second = [second];

     return compareArray(first, second, ++index);
  }

 
};

/*
Part one
*/
const p1 = () => {
  const data = prepareData();
};

/*
Part two
*/
const p2 = () => {
  const data = prepareData();
};

module.exports = { p1, p2 };
