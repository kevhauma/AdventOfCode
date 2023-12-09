const prepareData = (inputString) => {
  return inputString
    .split(/\r?\n/g)
    .filter(Boolean)
    .map((line) => line.split(" ").map(Number));
};

const calculateHistories = (data) => {
  let inbetweenResult = [[...data]];
  let lastResult = [...data];
  do {
    let tempResult = lastResult
      .map((number, index) => {
        if (!index) return null;
        return number - lastResult[index - 1];
      })
      .filter((n) => n !== null);

    inbetweenResult.push(tempResult);
    lastResult = tempResult;
  } while (lastResult.some(Boolean));
  return inbetweenResult;
};

/*
Part one
*/

const p1 = (inputString, inputPath) => {
  const data = prepareData(inputString, inputPath);

  const calculated = data.reduce((total, currentData) => {
    const result = [...total];
    const histories = calculateHistories(currentData);

    //extrapolate to the end
    histories.reverse();
    //add 0 entry to 'last' step
    histories[0].push(0);

    const exprapolated = histories
      .map((step) => step.reverse()[0])
      .reduce((total, lastNumber) => total + lastNumber, 0);

    result.push(exprapolated);

    return result;
  }, []);
  return calculated.reduce((sum, total) => sum + total);
};

/*
Part two
*/
const p2 = (inputString, inputPath) => {
  const data = prepareData(inputString, inputPath);

  const calculated = data.reduce((total, currentData) => {
    const result = [...total];
    const histories = calculateHistories(currentData);

    //extrapolate to the end
    histories.reverse();
    //add 0 entry to 'last' step
    histories[0].shift(0);

    const exprapolated = histories
      .map((step) => step[0])
      .reduce((total, firstNumber) => firstNumber - total, 0);

    result.push(exprapolated);

    return result;
  }, []);
  
  return calculated.reduce((sum, total) => sum + total);
};

module.exports = { p1, p2 };
