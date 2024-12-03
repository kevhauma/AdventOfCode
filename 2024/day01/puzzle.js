const prepareData = (inputString) => {
  const lines = inputString.split(/\r?\n/g).filter(Boolean);

  return lines.reduce(
    (lists, line) => {
      const [first, second] = line.split(/\s+/);
      lists[0].push(Number(first));
      lists[1].push(Number(second));
      return lists;
    },
    [[], []]
  );
};

/*
Part one
*/

export const p1 = (inputString, inputPath) => {
  const [list1, list2] = prepareData(inputString, inputPath);
  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  return list1.reduce(
    (sum, left, index) => sum + Math.abs(left - list2[index])
  );
};

/*
Part two
*/
export const p2 = (inputString, inputPath) => {
  const [leftList, rightList] = prepareData(inputString, inputPath);

  const rightDict = rightList.reduce((dict, curr) => {
    if (!dict[curr]) {
      dict[curr] = 1;
    } else dict[curr] = dict[curr] + 1;

    return dict;
  }, []);

  return leftList.reduce((sum, left) => sum + left * (rightDict[left] || 0));
};
