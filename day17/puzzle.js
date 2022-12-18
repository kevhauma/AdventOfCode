const fs = require("fs");

const chamber = {startFromUp: 3,startFromLeft:2,width:6}

const rocks = [
  ["#", "#", "#", "#"],
  [
    [".", "#", "."],
    ["#", "#", "#"],
    [".", "#", "."],
  ],
  [
    [".", ".", "#"],
    [".", ".", "#"],
    ["#", "#", "#"],
  ],
  ["#", "#", "#", "#"],
  [
    ["#", "#"],
    ["#", "#"],
  ],
];

const prepareData = (inputString,inputPath) => {
return fs
    .readFileSync(inputPath, { encoding: "utf8" })
    .trim()
    .split("")
};

/*
Part one
*/
const p1 = (inputString,inputPath) => {
    const rocksToFall = 2022; 
  const actions = prepareData(inputString,inputPath);

};

/*
Part two
*/
const p2 = (inputString, inputPath) => {
  const data = prepareData(inputString, inputPath);
};

module.exports = { p1, p2 };
