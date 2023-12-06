const prepareData = (isP2, inputString) => {
  const lines = inputString
    .split(/\r?\n/g)
    .filter(Boolean)
    .reduce((race, line) => {
      const raceCopy = { ...race };
      let [subject, values] = line.split(":");
      if (isP2) {
        values = values.replace(/\s/g, "");
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

const calculate = (data) =>
  Object.entries(data)
    .map(([race, { time, distance }]) => {
      let won = 0;

      for (let holdForMs = 0; holdForMs <= time; holdForMs++) {
        // (time-holdForMs) = time left to move after holding
        // holdForMs = speed to which to go at
        // distances this attempt > race distance
        // + 0 if false
        // + 1 if true
        won += (time - holdForMs) * holdForMs > distance;
      }

      return won;
    })
    .filter(Boolean)
    .reduce((mult, curr) => mult * curr);

/*
Part one
*/

const p1 = (inputString, inputPath) => {
  const data = prepareData(false, inputString, inputPath);
  return calculate(data);
};

/*
Part two
*/
const p2 = (inputString, inputPath) => {
  const data = prepareData(true, inputString, inputPath);
  return calculate(data);
};

module.exports = { p1, p2 };
