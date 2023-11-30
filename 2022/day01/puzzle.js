const fs = require("fs");

const prepareData = (inputString,inputPath) => {
  const input = fs.readFileSync(inputPath, { encoding: "utf8" });
  const calorieItems = input.split(/\r?\n/g);

  const calorieTotals = [];
  let tempCalCount = 0;
  calorieItems.forEach((cal) => {
    //if empty line, count up gathered calories and push em in the other array
    //clear out gathered calories while we're here
    if (!cal) {
      calorieTotals.push(tempCalCount);
      tempCalCount = 0;
    } else tempCalCount += parseInt(cal);
  });
  return calorieTotals;
};

/*
Part one
*/

const p1 = (inputString,inputPath) => {
  const calorieTotals = prepareData(inputString,inputPath);
  return Math.max(...calorieTotals);
};

/*
Part two
*/
const p2 = (inputString,inputPath) => {
  const calorieTotals = prepareData(inputString,inputPath);
  return calorieTotals
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((total, current) => total + current);
};

module.exports = { p1, p2 };
