const fs = require("fs");

const prepareData = (inputPath) =>
  fs.readFileSync(inputPath, { encoding: "utf8" });

const findIndexWithUniqueCharsInRange = (data, range) =>
  Array.from(data).reduce((marker, letter, index) => 
   (index < range || marker) 
   ? marker
   : new Set(data.slice(index - range, index)).size === range 
   ? index 
   : marker
, 0);

/*
Part one
*/
const p1 = (inputPath) => findIndexWithUniqueCharsInRange(prepareData(inputPath), 4);

/*
Part two
*/
const p2 = (inputPath) => findIndexWithUniqueCharsInRange(prepareData(inputPath), 14);

module.exports = { p1, p2 };
