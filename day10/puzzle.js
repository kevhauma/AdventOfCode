const fs = require("fs");

const prepareData = () => {
  return fs
    .readFileSync("./day10/test.txt", { encoding: "utf8" })
    .trim()
    .split(/\r?\n/g)
    .map((l) => ({
      instr: l.split(" ")[0],
      strength: parseInt(l.split(" ")[1]),
    }));
};

/*
Part one
*/

const p1 = () => {
  const data = prepareData()
  const strengths = [];

  data.forEach((entry) => {
    let currentStrength = strengths[strengths.length - 1]
    if(!currentStrength)
        currentStrength = 1

    if (entry.instr === "addx") {
      const newStrength = currentStrength + entry.strength;
 
      strengths.push(currentStrength, newStrength);
    }
    else strengths.push(currentStrength)
  });

  let indexToCheck = 20;
  let previousvalues = []
  
  return strengths
    .map((str, i) => {   
        previousvalues.push(str)    
     if( i + 1 === indexToCheck) { 
        const c = str * indexToCheck
        console.log(indexToCheck, "*", str, "=", c);
      indexToCheck += 40;
previousvalues =[]
      return c
    }
    return null;     
    })
    .filter(Boolean)
    .reduce((sum, curr) => sum + curr);
};

/*F
Part two
*/
const p2 = () => {
  const data = prepareData();
};

module.exports = { p1, p2 };
