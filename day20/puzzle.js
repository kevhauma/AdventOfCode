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
  const placesToSum = [1000, 2000, 3000];
  const firstArray = prepareData(inputString, inputPath);
  let resultArray = [...firstArray];

  firstArray.forEach(({ x, i }) => {
    const oldIndex = resultArray.findIndex(
      ({ x: _x, i: _i }) => x === _x && i === _i
    );
    let newIndex;
    if (x >= 0) newIndex = oldIndex + x + 1;
    else newIndex = oldIndex + x - 1;

    if (newIndex < 0) newIndex = firstArray.length + newIndex + 1;
    if (newIndex > firstArray.length) newIndex = newIndex - firstArray.length;

    resultArray[oldIndex] = { x: "_" };
    const firstPart = resultArray.slice(0, newIndex);
    const secondPart = resultArray.slice(newIndex);

    resultArray = [...firstPart, { x, i }, ...secondPart].filter(
      ({ x }) => x !== "_"
    );
  });

  const indexOfZero = resultArray.findIndex(({ x }) => x === 0);

  const one = resultArray[(indexOfZero + 1000) % firstArray.length];
  const two = resultArray[(indexOfZero + 2000) % firstArray.length];
  const three = resultArray[(indexOfZero + 3000) % firstArray.length];

  return one.x + two.x + three.x;
};

/*
Part two
*/
const p2 = (inputString, inputPath) => {
  const data = prepareData(inputString, inputPath);
};

module.exports = { p1, p2 };
