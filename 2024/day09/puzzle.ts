const prepareData = (inputString: string) => {
  const data = inputString.split("").map(Number)

  const diskMap: Array<string> = []
  for (let i = 0; i < data.length; i += 2) {
    const file = { id: diskMap.length, block: data[i], free: data[i + 1] }

    const block = Array.from({ length: file.block }).map(() => file.id).join("")
    const free = Array.from({ length: file.free }).map(() => ".").join("")
    diskMap.push(`${block}${free}`)
  }
  return diskMap.join("").split("");
};

/*
Part one
*/

export const p1 = (inputString: string) => {
  const diskMap = prepareData(inputString);

  //console.log(diskmapCompressed.join(''))
  for (let i = diskMap.length - 1; i >= (diskMap.length) / 2; --i) {
    const indexOfFirstFreeSpace = diskMap.indexOf(".")
    if (indexOfFirstFreeSpace > i)
      break;
    diskMap[indexOfFirstFreeSpace] = diskMap[i]
    diskMap[i] = "."
    // console.log(diskmapCompressed.join(''))
  }
  console.log(diskMap.join(''))

  return diskMap
    .filter(fileId => fileId !== ".")
    .reduce((res, curr, index) => res + (Number(curr) * index), 0)
};

/*
Part two
*/
export const p2 = (inputString: string) => {
  const data = prepareData(inputString);
};