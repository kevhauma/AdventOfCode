const fs = require("fs");

const prepareData = (inputPath) => {
  return fs.readFileSync(inputPath, { encoding: "utf8" })
    .trim()
    .split(/r?\n/g)
    .map((line) =>
      line.split(" -> ").map((coords) => ({
        x: parseInt(coords.split(",")[0]),
        y: parseInt(coords.split(",")[1]),
      }))
    );
};


/*
Part one
*/
const p1 = (inputPath) => {
  const data = prepareData(inputPath);
 console.log(data)
};


/*
Part two
*/
const p2 = (inputPath) => {
  const data = prepareData(inputPath);
  
};

module.exports = { p1, p2 };
