const prepareData = (inputString: string) => {
  const data = inputString.split("").map(Number)

  const diskMap: Array<{ id: number, block: number, free: number }> = []
  for (let i = 0; i < data.length; i += 2) {
    diskMap.push({ id: diskMap.length, block: data[i], free: data[i + 1] })
  }

  const diskMapCompressed = diskMap.map(file => {
    const block = Array.from({ length: file.block }).map(() => file.id).join("")
    const free = Array.from({ length: file.free }).map(() => ".").join("")
    return `${block}${free}`
  }).join("").split("")

  return diskMapCompressed;
};

/*
Part one
*/

export const p1 = (inputString: string) => {
  const diskmapCompressed = prepareData(inputString);

  // console.log(diskmapCompressed.join(''))
  for (let i = diskmapCompressed.length - 1; i >= (diskmapCompressed.length) / 2; --i) {
    const indexOfFirstFreeSpace = diskmapCompressed.indexOf(".")
    if (indexOfFirstFreeSpace > i)
      break;
    diskmapCompressed[indexOfFirstFreeSpace] = diskmapCompressed[i]
    diskmapCompressed[i] = "."
    // console.log(diskmapCompressed.join(''))
  }
  // console.log(diskmapCompressed.join(''))
  return diskmapCompressed.filter(fileId=>fileId!==".").reduce((res,curr,index)=>res + (Number(curr) * index),0)
};

/*
Part two
*/
export const p2 = (inputString: string) => {
  const data = prepareData(inputString);
};