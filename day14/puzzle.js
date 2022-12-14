const fs = require("fs");

const prepareData = () => {
  return fs
    .readFileSync("./day13/test.txt", { encoding: "utf8" })
    .trim()
    .split(/r?\n/g)
    .map((line) =>
      line
        .split(" -> ")
        .map((coords) => ({
          x: parseInt(coords.split(",")[0]),
          y: parseInt(coords.split(",")[1]),
        }))
    );
};


/*
Part one
*/
const p1 = () => {
  const data = prepareData();
 console.log(data)
};


/*
Part two
*/
const p2 = () => {
  const data = prepareData();
  
};

module.exports = { p1, p2 };
