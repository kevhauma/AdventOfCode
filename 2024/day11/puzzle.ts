const prepareData = (inputString: string) => {
  const input = inputString.split(/\s+/g).map(Number);

  return input;
};

const addToRecord = (record: Record<number, number>, key: number, amount: number = 1) => {
  record[key] = (record[key] || 0) + amount
}

const blinkStone = (initialStone: number, amountOfBLinks: number) => {
  let stones: Record<number, number> = { [initialStone]: 1 }

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
        //console.log(stone1Str,stone2Str)
        addToRecord(localStones, Number(stone1Str), amount)
        addToRecord(localStones, Number(stone2Str), amount)

        return
      }
      addToRecord(localStones, stone * 2024, amount)
    })
    //console.log(blink,localStones.join(" "))
    stones = localStones;
  }
  return Object.values(stones).reduce((sum, curr) => sum + curr)
}

const blinkStones = (initialStones: Array<number> = [], amountOfBLinks: number) => {
  return initialStones.reduce((sum, stone) => sum + blinkStone(stone, amountOfBLinks), 0)
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