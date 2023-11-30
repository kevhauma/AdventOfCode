const fs = require("fs");

const prepareData = (inputString,inputPath) =>
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
const p1 = (inputString,inputPath) => findIndexWithUniqueCharsInRange(prepareData(inputString,inputPath), 4);

/*
Part two
*/
const p2 = (inputString,inputPath) => findIndexWithUniqueCharsInRange(prepareData(inputString,inputPath), 14);

module.exports = { p1, p2 };
