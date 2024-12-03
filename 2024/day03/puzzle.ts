const prepareData = (inputString: string) => {
  const muls = inputString.match(/mul\([0-9]+,[0-9]+\)/g);
  const pairs = muls?.map((mul) =>
    mul.split(",").map((part) => Number(part.replace(/[^0-9]+/gi, "")))
  );

  return pairs;
};

/*
Part one
*/

export const p1 = (inputString: string) => {
  const data = prepareData(inputString);
  return data?.reduce((sum, curr) => sum + (curr[0] || 0) * (curr[1] || 0), 0);
};

/*
Part two
*/
export const p2 = (inputString: string) => {
  const data = prepareData(inputString);
};
