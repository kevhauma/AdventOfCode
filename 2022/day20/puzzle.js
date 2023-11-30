const prepareData = (inputString, inputPath) => {
  return inputString
    .trim()
    .split(/\r?\n/g)
    .map((x, i) => ({ x: parseInt(x), i }));
};

/*
Part one
*/
const p1 = (inputString, inputPath) => {
  const firstArray = prepareData(inputString, inputPath);
  let resultArray = [...firstArray];

  firstArray.forEach(({ x, i }) => {
    const oldIndex = resultArray.findIndex(
      ({ x: _x, i: _i }) => x === _x && i === _i
    );
    let newIndex;
    if (x >= 0) newIndex = oldIndex + x + 1;
    else newIndex = oldIndex + x - 1;

    if (newIndex < 0) newIndex = firstArray.length+((newIndex) % firstArray.length);
    newIndex =( newIndex % firstArray.length) -1;

    resultArray[oldIndex] = { x: "_" };
    const firstPart = resultArray.slice(0, newIndex);
    const secondPart = resultArray.slice(newIndex);

    resultArray = [...firstPart, { x, i }, ...secondPart].filter(
      ({ x }) => x !== "_"
    );
  });
  console.log(resultArray.map(({x})=>x).join(" "))

  const placesToSum = [1000, 2000, 3000];
  const indexOfZero = resultArray.findIndex(({ x }) => x === 0);
  return placesToSum.reduce(
    (sum, place) =>
      sum + resultArray[(indexOfZero + place) % firstArray.length].x,
    0
  );
};

/*
Part two
*/
const p2 = (inputString, inputPath) => {
  const data = prepareData(inputString, inputPath);
};

module.exports = { p1, p2 };
