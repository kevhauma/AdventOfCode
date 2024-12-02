const prepareData = (inputString) => {
  const lines = inputString.split(/\r?\n/g).filter(Boolean);

  return lines.map((line) => line.split(/\s+/g).map((num) => parseInt(num)));
};

/*
Part one
*/

const p1 = (inputString, inputPath) => {
  const data = prepareData(inputString, inputPath);
  const reportResults = data
    .map((report) => {
      return report.reduce(
        (result, current, index) => {
          if (!result.isSafe) return { isSafe: false };
          if (index === 0) return { isSafe: true };

          const difference = report[index - 1] - current;

          const isSafelyDecreasing = difference > 0 && difference <= 3;
          const isSafelyIncreasing = difference < 0 && difference >= -3;

          if (!isSafelyDecreasing && !isSafelyIncreasing)
            return { isSafe: false };

          //if no direction set, return safe
          if (result.isDecreasing === undefined) {
            return { isSafe: true, isDecreasing: isSafelyDecreasing };
          }
          //isSafe and decreasing
          if (result.isDecreasing && isSafelyDecreasing) {
            return { isSafe: true, isDecreasing: true };
          }
          //isSafe and increasing
          if (!result.isDecreasing && isSafelyIncreasing) {
            return { isSafe: true, isDecreasing: false };
          }
          //is not safe
          return { isSafe: false };
        },
        { isSafe: true }
      );
    })
    .filter((result) => result.isSafe);
  return reportResults.length;
};

/*
Part two
*/
const p2 = (inputString, inputPath) => {
  const data = prepareData(inputString, inputPath);
};

module.exports = { p1, p2 };
