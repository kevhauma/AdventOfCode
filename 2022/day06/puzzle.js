const prepareData = (inputString) => inputString;

const findIndexWithUniqueCharsInRange = (data, range) =>
  Array.from(data).reduce(
    (marker, letter, index) =>
      index < range || marker
        ? marker
        : new Set(data.slice(index - range, index)).size === range
        ? index
        : marker,
    0
  );

/*
Part one
*/
export const p1 = (inputString) =>
  findIndexWithUniqueCharsInRange(prepareData(inputString), 4);

/*
Part two
*/
export const p2 = (inputString) =>
  findIndexWithUniqueCharsInRange(prepareData(inputString), 14);
