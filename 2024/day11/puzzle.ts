const prepareData = (inputString: string) => {
  const input = inputString.split(/\s+/g).map(Number);

  return input;
};

const blinkStone = (initialStone: number, amountOfBLinks: number) => {
  let stones = [initialStone]

  for (let blink = 0; blink < amountOfBLinks; blink++) {
    const localStones: Array<number> = []
    stones.forEach((stone) => {
      if (!stone) {
        localStones.push(1)
        return
      }
      const stoneString = `${stone}`;

      if (!(stoneString.length % 2)) {
        const stone1Str = stoneString.split("").splice(0, stoneString.length / 2).join("")
        const stone2Str = stoneString.split("").splice(stoneString.length / 2).join("")
        //console.log(stone1Str,stone2Str)
        localStones.push(Number(stone1Str), Number(stone2Str))
        return
      }
      localStones.push(stone * 2024)
    })
    //console.log(blink,localStones.join(" "))
    stones = localStones;
    console.log(blink,initialStone,stones.length)
  }
  return stones.length
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