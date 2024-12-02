const prepareData = (inputString) => {
  const lines = inputString.split(/\r?\n/g).filter(Boolean);

  return lines.reduce(
    ([leftList, rightList], line) => {
      const [first, second] = line.split(/\s+/);
      leftList.push(parseInt(first));
      rightList.push(parseInt(second));
      return [leftList, rightList];
    },
    [[], []]
  );
};

/*
Part one
*/

const p1 = (inputString, inputPath) => {
  const [list1, list2] = prepareData(inputString, inputPath);
  const sortedList1 = list1.toSorted((a, b) => a - b);
  const sortedList2 = list2.toSorted((a, b) => a - b);

  const differences = sortedList1.map((left, index) =>
    Math.abs(left - sortedList2[index])
  );
  return differences.reduce((sum, curr) => sum + curr);
};

/*
Part two
*/
const p2 = (inputString, inputPath) => {
  const [leftList, rightList] = prepareData(inputString, inputPath);
  const similarities = leftList.map(
    (left) => left * rightList.filter((right) => right === left).length
  );
  return similarities.reduce((sum, curr) => sum + curr);
};

module.exports = { p1, p2 };
