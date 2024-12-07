
type Coord = {
  x: number;
  y: number;
};

type DataType = { walls: Array<Coord>, height: number, width: number, start: Coord };

type ResultType = { steps: Record<string, number>, obstacles: Record<string, number> }


const vizualize = (results: ResultType, { height, walls, start, width }: DataType) => {
  for (let y = 0; y < height; y++) {
    let l = ''
    for (let x = 0; x < width; x++) {
      // if (x === start.x && y === start.y)
      //   l += "^" 
      if (results.obstacles[`${y}:${x}`])
        l += "O"
      else if (results.steps[`${y}:${x}`]) {
        switch (results.steps[`${y}:${x}`]) {
          case 1: l += "^"; break;
          case 2: l += ">"; break;
          case 3: l += "V"; break;
          case 4: l += "<"; break;
        }
      }
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

const travers = (data: DataType, currentPos: Coord, directionIndex: number, results: ResultType, isP2: boolean = false) => {
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

  for (let y = range.start.y; y <= range.end.y; y++) {
    for (let x = range.start.x; x <= range.end.x; x++) {
      if (isP2) {
        const isOuterStepX = range.start.x === range.end.x ? false : (range.start.x === x || range.end.x === x)
        const isOuterStepY = range.start.y === range.end.y ? false : (range.start.y === y || range.end.y === y)
        
        //if finding a crossover (that isn't a corner of current path)
        if (results.steps[`${y}:${x}`] && !isOuterStepX && !isOuterStepY) {
          //if the crossover matches the next directin
          const nextDirectionIndex = (directionIndex + 1) % 4
          if (results.steps[`${y}:${x}`] === nextDirectionIndex + 1)
            results.obstacles[`${y}:${x}`] = directionIndex + 1

          //TODO somehow check for this scenario
          /*
          . V V
          < < V 
          . . V -- this can be an obstacle
          */

        }
      }
      results.steps[`${y}:${x}`] = directionIndex + 1
    }
  }
  // console.log("========================")
  // vizualize(results, data)

  if (newPosition.x < 0 || newPosition.y < 0) return results
  if (newPosition.x >= width || newPosition.y >= height)
    return results;

  //equivalent for turning right 90%
  const newDirection = (directionIndex + 1) % 4

  return travers(data, newPosition, newDirection, results, isP2)


}

/*
Part one
*/
export const p1 = (inputString: string) => {
  const data = prepareData(inputString);

  const {steps} = travers(data, data.start, 0, { steps: { [`${data.start.y}:${data.start.x}`]: 1 }, obstacles: {} })

  //vizualize(results, data)

  //minus one, it adds the exist cell
  return Object.keys(steps).length - 1
};

/*
Part two
*/
export const p2 = (inputString: string) => {
  const data = prepareData(inputString);
  const {obstacles} = travers(data, data.start, 0, { steps: { [`${data.start.y}:${data.start.x}`]: 1 }, obstacles: {} }, true)

  //vizualize(results, data)

  //is broken, don't use
  return Object.keys(obstacles).length
};