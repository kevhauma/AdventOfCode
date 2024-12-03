const prepareData = (inputString, expandBy) => {
  const horizontalIndexes = [];
  const verticalIndexes = [];

  //split and set vertical indexes
  const universe = inputString
    .split(/\r?\n/g)
    .filter(Boolean)
    .map((line) => {
      const split = line.split("");
      const lastOffset = (verticalIndexes[verticalIndexes.length - 1] || 0) + 1;
      verticalIndexes.push(
        split.every((symbol) => symbol === ".")
          ? lastOffset + expandBy - 1
          : lastOffset
      );
      return split;
    });

  //rotate universe
  const rotatedUniverse = Array.from({ length: universe[0].length }).map((_) =>
    Array.from({ length: universe.length })
  );
  universe.forEach((line, y) => {
    line.forEach((cell, x) => {
      rotatedUniverse[x][y] = cell;
    });
  });
  //expand horizontally (rotated)
  rotatedUniverse.forEach((line) => {
    const lastOffset =
      (horizontalIndexes[horizontalIndexes.length - 1] || 0) + 1;
    horizontalIndexes.push(
      line.every((symbol) => symbol === ".")
        ? lastOffset + expandBy - 1
        : lastOffset
    );
  });

  //map galaxies to coordinates
  return universe.flatMap((line, y) =>
    line
      .map((letter, x) => {
        if (letter === "#") {
          const offsetX = horizontalIndexes[x];
          const offsetY = verticalIndexes[y];
          return { x: offsetX, y: offsetY, id: `${x},${y}` };
        }
      })
      .filter(Boolean)
  );
};

const calculate = (galaxies) => {
  const routes = {};
  galaxies.forEach((galaxy) => {
    galaxies.forEach((g) => {
      if (g.id === galaxy.id) return;
      const combinedId = [g.id, galaxy.id].toSorted().join("|");
      if (routes[combinedId] !== undefined) return;

      routes[combinedId] = Math.abs(g.y - galaxy.y) + Math.abs(g.x - galaxy.x);
    });
  });
  return Object.values(routes).reduce((sum, cur) => sum + cur);
};

/*
Part one
*/

export const p1 = (inputString) => {
  const galaxies = prepareData(inputString, 2);
  return calculate(galaxies);
};

/*
Part two
*/
export const p2 = (inputString) => {
  const galaxies = prepareData(inputString, 1000000);
  return calculate(galaxies);
};
