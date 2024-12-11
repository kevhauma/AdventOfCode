const prepareData = (inputString: string) => {
  return inputString.split(/\s+/g)
    .map(Number)
    .reduce((dict, curr) => {
      dict[curr] = 1
      return dict
    }, {} as Record<number, number>);
};

const addToRecord = (record: Record<number, number>, key: number, amount: number = 1) => {
  record[key] = (record[key] || 0) + amount
}

const blinkStones = (initialStones: Record<number, number>, amountOfBLinks: number) => {
  let stones: Record<number, number> = initialStones;

  for (let blink = 0; blink < amountOfBLinks; blink++) {
    const localStones: Record<number, number> = {}

    Object.entries(stones).forEach(([stoneStr, amount]) => {
      const stone = Number(stoneStr)
      if (!stone) {
        addToRecord(localStones, 1, amount)
        return
      }
      const stoneString = `${stone}`;

      if (!(stoneString.length % 2)) {
        const stone1Str = stoneString.split("").splice(0, stoneString.length / 2).join("")
        const stone2Str = stoneString.split("").splice(stoneString.length / 2).join("")

        addToRecord(localStones, Number(stone1Str), amount)
        addToRecord(localStones, Number(stone2Str), amount)
        return
      }

      addToRecord(localStones, stone * 2024, amount)
    })
    
    stones = localStones;
  }
  return Object.values(stones).reduce((sum, curr) => sum + curr)
}
/*
Part one
*/

export const p1 = (inputString: string) => {
  const initialStones = prepareData(inputString);
  return blinkStones(initialStones, 25)

};

/*
Part two
*/
export const p2 = (inputString: string) => {
  const initialStones = prepareData(inputString);
  return blinkStones(initialStones, 75)
};