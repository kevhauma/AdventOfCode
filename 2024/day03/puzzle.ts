const prepareDataP1 = (inputString: string) => {
  const muls = inputString.match(/mul\([0-9]+,[0-9]+\)/g);

  const pairs = muls?.map((mul) =>
    mul[0].split(",").map((part) => Number(part.replace(/[^0-9]+/gi, "")))
  );

  return pairs;
};
const prepareDataP2 = (inputString: string) => {
  const muls = inputString.matchAll(/mul\([0-9]+,[0-9]+\)/g);

  const donts = inputString
    .matchAll(/don't\(\)/g)
    .map((regexResult) => regexResult.index);

  const dos = inputString
    .matchAll(/do\(\)/g)
    .map((regexResult) => regexResult.index);

  const pairs = muls?.map((mul) => ({
    index: mul.index,
    pair: mul[0]
      .split(",")
      .map((part) => Number(part.replace(/[^0-9]+/gi, ""))),
  }));

  return {
    dos: [...dos].toSorted((a, b) => a - b),
    donts: [...donts].toSorted((a, b) => a - b),
    pairs,
  };
};

/*
Part one
*/

export const p1 = (inputString: string) => {
  const data = prepareDataP1(inputString);
  return data?.reduce((sum, curr) => sum + (curr[0] || 0) * (curr[1] || 0), 0);
};

/*
Part two
*/
export const p2 = (inputString: string) => {
  const data = prepareDataP2(inputString);

  return data?.pairs.reduce((sum, curr) => {
    const do_index = data.dos.findLast((doIndex) => doIndex < curr.index);
    const dont_index = data.donts.findLast(
      (dontIndex) => dontIndex < curr.index
    );

    if ((do_index || 0) >= (dont_index || 0))
      return sum + (curr.pair[0] || 0) * (curr.pair[1] || 0);
    else return sum;
  }, 0);
};
