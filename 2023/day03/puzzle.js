const getOneAbove = ({ x, y }) => ({ x, y: y - 1 });
const getOneBelow = ({ x, y }) => ({ x, y: y + 1 });
const getOneLeft = ({ x, y }) => ({ x: x - 1, y });
const getOneRight = ({ x, y }) => ({ x: x + 1, y });

const getTopLeft = (coord) => getOneAbove(getOneLeft(coord));
const getTopRight = (coord) => getOneAbove(getOneRight(coord));

const getBottomLeft = (coord) => getOneBelow(getOneLeft(coord));
const getBottomRight = (coord) => getOneBelow(getOneRight(coord));

const matchCoord = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => x1 == x2 && y1 == y2;

const isAdjecent = (coord1, coord2) =>
  matchCoord(coord2, getOneAbove(coord1)) ||
  matchCoord(coord2, getOneBelow(coord1)) ||
  matchCoord(coord2, getOneRight(coord1)) ||
  matchCoord(coord2, getOneLeft(coord1)) ||
  matchCoord(coord2, getTopLeft(coord1)) ||
  matchCoord(coord2, getTopRight(coord1)) ||
  matchCoord(coord2, getBottomLeft(coord1)) ||
  matchCoord(coord2, getBottomRight(coord1));

const prepareData = (inputString) => {
  const lines = inputString
    .split(/\r?\n/g)
    .filter(Boolean)
    .reduce(
      (data, line, y) => {
        const numberRegEx = new RegExp("[0-9]+", "g");
        while ((match = numberRegEx.exec(line)) !== null) {
          data.numbers.push({
            number: parseInt(match[0]),
            coords: Array.from(Array(match[0].length)).map((_, i) => ({
              x: match.index + i,
              y,
            })),
          });
        }
        const symbolRegEx = new RegExp("[^0-9.]+", "g");
        while ((match = symbolRegEx.exec(line)) !== null) {
          data.symbols.push({ symbol: match[0], x: match.index, y });
        }

        return data;
      },
      { symbols: [], numbers: [] }
    );

  return lines;
};

/*
Part one
*/

export const p1 = (inputString) => {
  const { numbers, symbols } = prepareData(inputString);
  return symbols
    .flatMap((symbol) =>
      numbers
        .filter((number) =>
          number.coords.some((coord) => isAdjecent(symbol, coord))
        )
        .map((number) => number.number)
    )
    .reduce((sum, curr) => sum + curr);
};

/*
Part two
*/
export const p2 = (inputString) => {
  const { numbers, symbols } = prepareData(inputString);
  const numbersNextToSymbols = symbols
    .flatMap((symbol) => {
      const numbersNextToSymbol = numbers.filter((number) =>
        number.coords.some((coord) => isAdjecent(symbol, coord))
      );

      return symbol.symbol === "*" && numbersNextToSymbol.length >= 2
        ? numbersNextToSymbol.reduce((mult, curr) => mult * curr.number, 1)
        : null;
    })
    .filter(Boolean);

  return numbersNextToSymbols.reduce((sum, curr) => sum + curr);
};
