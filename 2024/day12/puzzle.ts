type Coord = { x: number, y: number }
type Region = { area: number, perim: number, coords: Array<Coord> }

const prepareData = (inputString: string) => {
  const lines = inputString.split(/\r?\n/g).map(line => line.split(""));
  const dict: Record<string, Array<Coord>> = {}
  lines.forEach((line, y) => {
    line.forEach((letter, x) => {
      if (!dict[letter])
        dict[letter] = [{ x, y }]
      else
        dict[letter].push({ x, y })
    })
  })
  return dict;
};

const findCoord = (coords: Array<Coord>, { x, y }: Coord) => {
  return coords.find(c => c.x === x && c.y === y)
}

const findNeighbours = (coords: Array<Coord>, { x, y }: Coord): Array<Coord> => {
  const upCoord = { x, y: y - 1 };
  const downCoord = { x, y: y + 1 };
  const rightCoord = { x: x + 1, y };
  const leftCoord = { x: x - 1, y };

  const neighbours = [upCoord, downCoord, rightCoord, leftCoord].filter(coordToFind => findCoord(coords, coordToFind))

  //is a region with a single field
  if (!neighbours.length) return [{ x, y }]

  const coordsWithoutNeighbours = coords.filter(coord => !findCoord(neighbours, coord))

  const neighboursOfNeighbours = neighbours.map(neighbour => findNeighbours(coordsWithoutNeighbours, neighbour)).flat()
  return [neighbours, neighboursOfNeighbours].flat()

}

const calculateRegion = (coords: Array<Coord>, coord: Coord) => {
  const neighbours = findNeighbours(coords, coord)
  return neighbours;
}

const splitLetterGroupIntoRegions = (coords: Array<Coord>) => {
  let cloned = [...coords];
  const regions: Array<Region> = []
  //const region = calculateRegion(cloned, { x: 0, y: 0 })

  while (cloned.length > 0) {
    const region = calculateRegion(cloned, cloned[0])
    regions.push({ area: region.length, perim: 1, coords: region })
    cloned = cloned.filter((coord) => !findCoord(cloned, coord))
  }
  console.log(regions)
}

/*
Part one
*/
export const p1 = (inputString: string) => {
  const data = prepareData(inputString);
  Object.values(data).forEach(groupedCoords => {
    const regions = splitLetterGroupIntoRegions(groupedCoords)

  })
};

/*
Part two
*/
export const p2 = (inputString: string) => {
  const data = prepareData(inputString);
};