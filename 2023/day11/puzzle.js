const prepareData = (inputString) => {
  //split and expand horizontally
  const horizontalExpanded = inputString
    .split(/\r?\n/g)
    .filter(Boolean)
    .flatMap((line) => {
      const split = line.split("");
      return split.every((symbol) => symbol === ".") ? [split, split] : [split];
    });

  //rotate array to expand vertically
  const rotated = Array.from({ length: horizontalExpanded[0].length }).map(
    (_) => Array.from({ length: horizontalExpanded.length })
  );
  horizontalExpanded.forEach((line, y) => {
    line.forEach((cell, x) => {
      rotated[x][y] = cell;
    });
  });
  //expand vertically (rotated horizontal)
  const verticalExpanded = rotated.flatMap((line) =>
    line.every((symbol) => symbol === ".") ? [line, line] : [line]
  );

  //rotate back
  const universe = Array.from({ length: verticalExpanded[0].length }).map((_) =>
    Array.from({ length: verticalExpanded.length })
  );
  verticalExpanded.forEach((line, y) => {
    line.forEach((cell, x) => {
      universe[x][y] = cell;
    });
  });
  //map galaxies to coordinates
  return universe.flatMap((line, y) =>
    line
      .map((letter, x) => {
        if (letter === "#") return { x, y, id: parseInt(`${x}${y}`) };
      })
      .filter(Boolean)
  );
};

/*
Part one
*/

const p1 = (inputString, inputPath) => {
  const galaxies = prepareData(inputString, inputPath);
const routes = {}
galaxies.forEach(galaxy=>{
  galaxies.forEach(g=>{
    if(g.id === galaxy.id) return
    const combinedId = [g.id, galaxy.id].toSorted((a,b)=>a-b).join("|");
    if(routes[combinedId]!==undefined) return
    
    routes[combinedId] =  Math.abs(g.y - galaxy.y) + Math.abs(g.x-galaxy.x)

  })
})

  return Object.values(routes).reduce((sum,cur)=>sum+cur)
};

/*
Part two
*/
const p2 = (inputString, inputPath) => {
  const data = prepareData(inputString, inputPath);
};

module.exports = { p1, p2 };
