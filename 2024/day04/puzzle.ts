type DataType = Array<Array<string>>;


type Coord = {
  x: number;
  y: number;
}

const directions: Record<string, Coord> = {
  TOP: { x: 0, y: -1 },
  RIGHT: { x: 1, y: 0 },
  BOTTOM: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  TOPRIGHT: { x: 1, y: -1 },
  BOTTOMRIGHT: { x: 1, y: 1 },
  BOTTOMLEFT: { x: -1, y: 1 },
  TOPLEFT: { x: -1, y: -1 },
} as const

const word = "XMAS".split("")

const prepareData = (inputString: string) => {
 return inputString.split(/\r?\n/g).filter(Boolean).map(line => line.split(""));
};

const findInDirection = (grid: DataType, center: Coord, direction: Coord, depth: number) => {
  const { x, y } = {
    x: center.x + (direction.x * depth),
    y: center.y + (direction.y * depth)
  }

  if (depth >= word.length)
    return true;

  if (x < 0 || y < 0)
    return false
  if (x >= grid[0].length || y >= grid.length)
    return false

  if (grid[y][x] === word[depth])
    return findInDirection(grid, center, direction, ++depth);

  return false;

}


const findXmas = (grid: DataType, center: Coord) => {
  return Object.keys(directions).filter(directionKey =>
    findInDirection(grid, center, directions[directionKey], 1)
  ).length;
}

/*
Part one
*/

export const p1 = (inputString: string) => {
  const grid = prepareData(inputString);
  const xCoords = grid.reduce((foundXofXmas, line, y) => {
    const foundXs = line.map((letter, x) => letter === word[0] ? x : null).filter(x => x !== null)
    foundXs.forEach(foundX => foundXofXmas.push({ x: foundX || 0, y }))

    return foundXofXmas;
  }, [] as Array<Coord>)

  const xmasses = xCoords.map((coord) => findXmas(grid, coord)).flat()

  return xmasses.reduce((sum, curr) => sum + curr)
};

/*
Part two
*/
export const p2 = (inputString: string) => {
  const data = prepareData(inputString);
};
