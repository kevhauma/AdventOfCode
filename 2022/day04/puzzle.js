const prepareData = (inputString) =>
  inputString
    .trim()
    .split(/\r?\n/g)
    .map((item) =>
      item
        .trim()
        .split(",")
        .map((pair) => ({
          min: parseInt(pair.split("-")[0]),
          max: parseInt(pair.split("-")[1]),
        }))
    );

/*
Part one
*/

export const p1 = (inputString) =>
  //my start is after other start. AND my end is before other end
  //and vice versa
  prepareData(inputString).filter(
    ([first, second]) =>
      (first.min >= second.min && first.max <= second.max) ||
      (second.min >= first.min && second.max <= first.max)
  ).length;

/*
Part two
*/
export const p2 = (inputString) =>
  // my start is before other end, AND my end is after other start
  prepareData(inputString).filter(
    ([first, second]) => first.min <= second.max && first.max >= second.min
  ).length;
