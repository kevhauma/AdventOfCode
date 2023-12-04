const fs = require("fs");

const numberMap = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const replaceLetteredNumbers = (line) => {
  let copyLine = `${line}`;
  numberMap.reduce((numberedLine, numberString) => {
    return numberedLine.replace(
      new RegExp(numberString, "g"),
      (match, index) => {
        const lineArray = copyLine.split("");
        lineArray[index] = numberMap.indexOf(match);
        copyLine = lineArray.join("");
        return `${match}`;
      }
    );
  }, line);

  return copyLine;
};

const prepareData = (includeNumberWords,inputString) => {
  const lines = inputString
    .split(/\r?\n/g)
    .filter(Boolean)
    .map((line) => (includeNumberWords ? replaceLetteredNumbers(line) : line))
    .map((line) => line.replace(/[^0-9]/g, ""));

  return lines.reduce((total, curr) => {
    const lineArray = curr.split("");
    const first = lineArray.shift();
    const last = lineArray.pop();
    const combined = parseInt(`${first || ""}${last || first}`);
    if (isNaN(combined)) return total;
    return total + combined;
  }, 0);
};

/*
Part one
*/

const p1 = (inputString, inputPath) => {
  return prepareData(false, inputString, inputPath);
};

/*
Part two
*/
const p2 = (inputString, inputPath) => {
  return prepareData(true, inputString, inputPath);
};

module.exports = { p1, p2 };