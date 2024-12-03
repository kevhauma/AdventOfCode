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

const getResult = (data, isP2) => {
  return data
    .reduce((total, currentData) => {
      const result = [...total];
      const histories = calculateHistories(currentData);

      //extrapolate to the end
      histories.reverse();
      //add 0 entry to 'last' step
      histories[0].push(0);

      const exprapolated = histories
        .map((step) => (isP2 ? step[0] : step.reverse()[0]))
        .reduce((total, number) => (isP2 ? number - total : total + number), 0);

      result.push(exprapolated);

      return result;
    }, [])
    .reduce((sum, total) => sum + total);
};

/*
Part one
*/

export const p1 = (inputString) => {
  const data = prepareData(inputString);
  return getResult(data);
};

/*
Part two
*/
export const p2 = (inputString) => {
  const data = prepareData(inputString);
  return getResult(data, true);
};
