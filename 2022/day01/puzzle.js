const prepareData = (inputString) => {
  const calorieItems = inputString.split(/\r?\n/g);

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

export const p1 = (inputString) => {
  const calorieTotals = prepareData(inputString);
  return Math.max(...calorieTotals);
};

/*
Part two
*/
export const p2 = (inputString) => {
  const calorieTotals = prepareData(inputString);
  return calorieTotals
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((total, current) => total + current);
};
