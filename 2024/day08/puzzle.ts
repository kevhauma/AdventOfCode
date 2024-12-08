type Coord = { x: number, y: number }
type CoordDictType = Record<string, string>
type NodeValidationConfig = { width: number, height: number }

const prepareData = (inputString: string) => {

  let width = 0;
  let height = 0;
  const antennas = inputString.split(/\r?\n/g).filter(Boolean)
    .map((line, y) => {
      if (y + 1 > height) height = y + 1
      return line.split("")
        .map((freq, x) => {
          if (x + 1 > width) width = x + 1
          return freq !== "." ? { x, y, freq } : null
        })
        .filter(antenna => antenna !== null)
    }).flat()

  const frequencyDict = antennas.reduce((dict, { freq, x, y }) => {
    if (dict[freq]) {
      dict[freq].push({ x, y })
    }
    else
      dict[freq] = [{ x, y }]

    return dict;
  }, {} as Record<string, Array<Coord>>);


  return { antennas: frequencyDict, width, height };
};

const vizualise = (antiNodes: CoordDictType, { width, height }: NodeValidationConfig) => {
  for (let y = 0; y < height; y++) {
    let line = ""
    for (let x = 0; x < width; x++) {
      if (antiNodes[`${y}:${x}`])
        line += "#"
      else
        line += "."
    }
    console.log(line)
  }
}

const validateAntiNode = (node: Coord, { width, height }: NodeValidationConfig) => {
  const coordStr = `${node.y}:${node.x}`
  //console.log(coordStr)
  //not out of bounds
  if (node.x < 0 || node.x >= width) return
  if (node.y < 0 || node.y >= height) return

  return coordStr
}
const calculateAntiNodes = (coord: Coord, otherCoord: Coord, validationConfig: NodeValidationConfig) => {
  
  const xDiff = otherCoord.x - coord.x;
  const yDiff = otherCoord.y - coord.y;

  const antiNode1 = {
    x: coord.x - xDiff,
    y: coord.y - yDiff,
  }

  const antiNode2 = {
    x: otherCoord.x + xDiff,
    y: otherCoord.y + yDiff,
  }
  const coord1 = validateAntiNode(antiNode1, validationConfig)
  const coord2 = validateAntiNode(antiNode2, validationConfig)

  return { coord1, coord2 }

}

/*
Part one
*/

export const p1 = (inputString: string) => {
  const { antennas, ...validationConfig } = prepareData(inputString);
  const antiNodes = {} as Record<string, string>

  Object.values(antennas).forEach((coords) => {
    coords.forEach((coord, index) => {
      const others = coords.slice(index+1)
      others.forEach(otherCoord => {
        const { coord1, coord2 } = calculateAntiNodes(coord, otherCoord, validationConfig);
        if (coord1)
          antiNodes[coord1] = "y";
        if (coord2)
          antiNodes[coord2] = "y";
      })
    })
  })


  //vizualise(antiNodes, validationConfig)

  return Object.keys(antiNodes).length
};

/*
Part two
*/
export const p2 = (inputString: string) => {
  const data = prepareData(inputString);
};

