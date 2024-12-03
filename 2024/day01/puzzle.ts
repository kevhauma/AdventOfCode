const prepareData = (inputString: string) => {
  const lines = inputString.split(/\r?\n/g).filter(Boolean);

  return lines.reduce(
    (lists, line) => {
      const [first, second] = line.split(/\s+/);
      lists[0].push(Number(first));
      lists[1].push(Number(second));
      return lists;
    },
    [[], []] as Array<Array<number>>
  );
};

/*
Part one
*/

export const p1 = (inputString: string) => {
  const [list1, list2] = prepareData(inputString);
  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  return list1.reduce(
    (sum, left, index) => sum + Math.abs(left - list2[index])
  );
};

/*
Part two
*/
export const p2 = (inputString: string) => {
  const [leftList, rightList] = prepareData(inputString);

  const rightDict = rightList.reduce((dict, curr) => {
    dict[curr] = (dict[curr] || 0) + 1;
    return dict;
  }, {} as Record<number, number>);

  return leftList.reduce((sum, left) => sum + left * (rightDict[left] || 0));
};
