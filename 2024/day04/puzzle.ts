type DataType = Array<Array<string>>;

type Coord = {
  x: number;
  y: number;
};

const directions: Record<string, Coord> = {
  TOP: { x: 0, y: -1 },
  RIGHT: { x: 1, y: 0 },
  BOTTOM: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  TOPRIGHT: { x: 1, y: -1 },
  BOTTOMRIGHT: { x: 1, y: 1 },
  BOTTOMLEFT: { x: -1, y: 1 },
  TOPLEFT: { x: -1, y: -1 },
} as const;

const word = "XMAS".split("");

const prepareData = (inputString: string) => {
  return inputString
    .split(/\r?\n/g)
    .filter(Boolean)
    .map((line) => line.split(""));
};

const findInDirection = (
  grid: DataType,
  center: Coord,
  direction: Coord,
  depth: number
) => {
  const { x, y } = {
    x: center.x + direction.x * depth,
    y: center.y + direction.y * depth,
  };

  if (depth >= word.length) return true;

  if (x < 0 || y < 0) return false;
  if (x >= grid[0].length || y >= grid.length) return false;

  if (grid[y][x] === word[depth])
    return findInDirection(grid, center, direction, ++depth);

  return false;
};

const findXmas = (grid: DataType, center: Coord) => {
  return Object.keys(directions).filter((directionKey) =>
    findInDirection(grid, center, directions[directionKey], 1)
  ).length;
};

const findLetters = (grid: DataType, letter: string) => {
  return grid.reduce((foundXofXmas, line, y) => {
    const foundXs = line
      .map((l, x) => (l === letter ? x : null))
      .filter((x) => x !== null);
    foundXs.forEach((foundX) => foundXofXmas.push({ x: foundX || 0, y }));

    return foundXofXmas;
  }, [] as Array<Coord>);
};

/*
Part one
*/

export const p1 = (inputString: string) => {
  const grid = prepareData(inputString);
  const xCoords = findLetters(grid, word[0]);

  const xmasses = xCoords.map((coord) => findXmas(grid, coord)).flat();

  return xmasses.reduce((sum, curr) => sum + curr, 0);
};

/*
Part two
*/

type maskType = Array<Array<string | null>>;
const masks: Array<maskType> = [
  [
    ["M", null, "S"],
    [null, "A", null],
    ["M", null, "S"],
  ],
  [
    ["M", null, "M"],
    [null, "A", null],
    ["S", null, "S"],
  ],
  [
    ["S", null, "S"],
    [null, "A", null],
    ["M", null, "M"],
  ],
  [
    ["S", null, "M"],
    [null, "A", null],
    ["S", null, "M"],
  ],
];

const matchMask = (grid: DataType, coord: Coord, mask: maskType) => {
  const gridSize = { width: grid[0].length, height: grid.length };
  const maskSize = { width: mask[0].length, height: mask.length };
  const xStart = coord.x - Math.floor(maskSize.width / 2);
  const yStart = coord.y - Math.floor(maskSize.height / 2);

  if (xStart < 0 || yStart < 0) return false;
  if (
    xStart + maskSize.width > gridSize.width ||
    yStart + maskSize.height > gridSize.height
  )
    return false;

  return mask.every((maskLine, maskY) => {
    const y = yStart + maskY;
    return maskLine.every((maskLetter, maskX) => {
      if (!maskLetter) return true;
      const x = xStart + maskX;
      return grid[y][x] === maskLetter;
    });
  });
};

const findX_mas = (grid: DataType, coord: Coord) => {
  return masks.find((mask) => matchMask(grid, coord, mask));
};

export const p2 = (inputString: string) => {
  const grid = prepareData(inputString);
  const aCoords = findLetters(grid, "A");
  const x_masses = aCoords.filter((coord) => findX_mas(grid, coord));
  return x_masses.length;
};
