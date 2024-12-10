type Coord = { x: number, y: number }
type HeightMapDict = Record<string, number>

const coordToString = (c: Coord) => `${c.y}:${c.x}`
const stringToCoord = (cStr: string) => {
  const [y, x] = cStr.split(":").map(Number)
  return { x, y }
}

const prepareData = (inputString: string) => {
  const heightMap = inputString.split(/\r?\n/g).map(line => line.split("").map(Number));

  const heightMapDict = heightMap.reduce((dict, line, y) => {
    line.map((height, x) => dict[coordToString({ x, y })] = height)
    return dict
  }, {} as HeightMapDict)

  return heightMapDict;
};

const navigateTrails = (data: HeightMapDict, { x, y }: Coord, height: number, /* out */ result: HeightMapDict = {}) => {
  if (height === 9) {
    return true
  };
  let trialScore = 0
  const nextHeight = height + 1;

  const upCoord = { x, y: y - 1 };
  const downCoord = { x, y: y + 1 };
  const rightCoord = { x: x + 1, y };
  const leftCoord = { x: x - 1, y };

  [upCoord, downCoord, rightCoord, leftCoord].forEach((nextCoord) => {
    if (data[coordToString(nextCoord)] === nextHeight) {
      const trialPeak = navigateTrails(data, nextCoord, nextHeight, result)
      if (trialPeak === true) {
        result[coordToString(nextCoord)] = 9;
        trialScore += 1
      }
      if (typeof trialPeak === 'number')
        trialScore += trialPeak
    }
  })
  return trialScore;
}

/*
Part one
*/
export const p1 = (inputString: string) => {
  const data = prepareData(inputString);

  const startPoints = Object.entries(data).filter(([, height]) => height === 0).map(([coordStr]) => stringToCoord(coordStr))

  return startPoints.map(point => {
    const result = {}
    navigateTrails(data, point, 0, result)
    return Object.keys(result).length
  }).reduce((sum, curr) => sum + curr)
};

/*
Part two
*/
export const p2 = (inputString: string) => {
  const data = prepareData(inputString);
  const startPoints = Object.entries(data).filter(([, height]) => height === 0).map(([coordStr]) => stringToCoord(coordStr))

  //@ts-ignore navigateTrails only uses the boolean return type internally
  return startPoints.map(point => navigateTrails(data, point, 0)).reduce((sum:number, curr) => sum + curr,0)
};