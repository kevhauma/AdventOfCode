
type Coord = {
  x: number;
  y: number;
};

type DataType = { walls: Array<Coord>, height: number, width: number, start: Coord };

type ResultType = Record<string, boolean>


const vizualize = (results: ResultType, { height, walls, start, width }: DataType) => {
  for (let y = 0; y < height; y++) {
    let l = ''
    for (let x = 0; x < width; x++) {
      if (x === start.x && y === start.y)
        l += "^"
      else if (results[`${y}:${x}`])
        l += "X"
      else if (walls.find(wall => wall.x === x && wall.y === y))
        l += "#"
      else
        l += "."
    }
    console.log(l)
  }
}

const prepareData = (inputString: string) => {
  const grid = inputString.split(/\r?\n/g).filter(Boolean).map(line => line.split(""));
  const walls = grid.map((line, y) => line.map((cell, x) => cell === "#" ? { x, y } as Coord : null).filter(cell => cell !== null)).flat()
  const start = grid.map((line, y) => line.map((cell, x) => cell === "^" ? { x, y } as Coord : null).filter(cell => cell !== null)).flat()[0]
  const width = grid[0].length;
  const height = grid.length;
  return { walls, width, height, start };
};

const traversUp = ({ walls }: DataType, { x, y }: Coord) => {
  //search for a wall above current position (same X, highest Y under current Y)
  const wall = walls
    .filter(wall => wall.x === x)
    .toSorted((w1, w2) => w1.y - w2.y)
    .findLast((wall) => wall.y < y)

  if (!wall)
    return { x, y: -1 }
  else
    return { x, y: wall.y + 1 }
}
const traversRight = ({ walls, width }: DataType, { x, y }: Coord) => {
  //search for a wall right of current position (same Y, lowest X over current X)
  const wall = walls
    .filter(wall => wall.y === y)
    .toSorted((w1, w2) => w1.x - w2.x)
    .find((wall) => wall.x > x)

  if (!wall)
    return { x: width, y }
  else
    return { x: wall.x - 1, y }
}
const traversDown = ({ walls, height }: DataType, { x, y }: Coord) => {
  //search for a wall below current position (same X, lowest Y over current Y)
  const wall = walls
    .filter(wall => wall.x === x)
    .toSorted((w1, w2) => w1.y - w2.y)
    .find((wall) => wall.y > y)

  if (!wall)
    return { x, y: height }
  else
    return { x, y: wall.y - 1 }
}
const traversLeft = ({ walls }: DataType, { x, y }: Coord) => {
  //search for a wall left of current position (same Y, highest X under current X)
  const wall = walls
    .filter(wall => wall.y === y)
    .toSorted((w1, w2) => w1.y - w2.y)
    .findLast((wall) => wall.x < x)

  if (!wall)
    return { x: -1, y }
  else
    return { x: wall.x + 1, y }
}

const travers = (data: DataType, currentPos: Coord, directionIndex: number, results: ResultType = {}) => {
  const { width, height } = data
  let newPosition: Coord | undefined
  let range: { start: Coord, end: Coord } | undefined

  switch (directionIndex) {
    case 0: //travers top
      newPosition = traversUp(data, currentPos)
      range = { start: newPosition, end: currentPos }
      break;
    case 1: //travers right
      newPosition = traversRight(data, currentPos)
      range = { start: currentPos, end: newPosition }
      break;
    case 2: //travers down
      newPosition = traversDown(data, currentPos)
      range = { start: currentPos, end: newPosition }
      break;
    case 3: //travers left
      newPosition = traversLeft(data, currentPos)
      range = { start: newPosition, end: currentPos }
      break;

  }
  if (!newPosition || !range) throw 'new position cannot be undefined'

  for (let yRange = range.start.y; yRange <= range.end.y; yRange++) {
    for (let xRange = range.start.x; xRange <= range.end.x; xRange++) {
      results[`${yRange}:${xRange}`] = true
    }
  }


  if (newPosition.x < 0 || newPosition.y < 0) return results
  if (newPosition.x >= width || newPosition.y >= height)
    return results;

  //equivalent for turning right 90%
  const newDirection = (directionIndex + 1) % 4

  return travers(data, newPosition, newDirection, results)


}

/*
Part one
*/
export const p1 = (inputString: string) => {
  const data = prepareData(inputString);

  const results = travers(data, data.start, 0)

  //vizualize(results, data)

  //minus one, it adds the exist cell
  return Object.keys(results).length - 1
};

/*
Part two
*/
export const p2 = (inputString: string) => {
  const data = prepareData(inputString);
};