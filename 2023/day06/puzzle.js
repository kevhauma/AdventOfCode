const prepareData = (isP2, inputString) => {
  const lines = inputString
    .split(/\r?\n/g)
    .filter(Boolean)
    .reduce((race, line) => {
      const raceCopy = { ...race };
      let [subject, values] = line.split(":");
      if(isP2) {
        values = values.replace(/\s/g,"")
      }
      values
        .split(/\s/g)
        .filter(Boolean)
        .forEach((value, index) => {
          if (!raceCopy[index]) raceCopy[index] = {};
          raceCopy[index][subject.toLowerCase()] = parseInt(value);
        });
      return raceCopy;
    }, {});
  return lines;
};


const calculate = (data) => Object.entries(data)
.map(([race, { time, distance }]) => {
  let won = 0;
  
  Array.from({ length: time }).forEach((_, holdForMs) => {
    
    const timeLeft = time - holdForMs
    const attemptDistance = timeLeft * holdForMs
    
    if (attemptDistance > distance) won += 1;
  });

  return won;
})
.filter(Boolean)
.reduce((mult, curr) => mult * curr);

/*
Part one
*/

const p1 = (inputString, inputPath) => {
  const data = prepareData(false, inputString, inputPath);
  return calculate(data)
};

/*
Part two
*/
const p2 = (inputString, inputPath) => {
  const data = prepareData(true, inputString, inputPath);
  return calculate(data)
};

module.exports = { p1, p2 };
