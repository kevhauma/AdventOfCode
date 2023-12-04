const fs = require("fs");

const max = { red: 12, green: 13, blue: 14 };

const prepareData = (inputString) => {
  const lines = inputString
    .split(/\r?\n/g)
    .filter(Boolean)
    .reduce((games, line) => {
      const [game, setLine] = line.split(":");
      return {
        ...games,
        [game.replace(/[^0-9]/g, "")]: setLine.split(";").map((set) =>
          set
            .split(",")
            .map((block) => block.trim())
            .reduce((blocks, block) => {
              const [amount, color] = block.split(" ");
              return { ...blocks, [color]: parseInt(amount) };
            }, {})
        ),
      };
    }, {});

  return lines;
};

/*
Part one
*/

const p1 = (inputString, inputPath) => {
  const games = prepareData(inputString, inputPath);
  return (filteredGames = Object.keys(games)
    .filter((gameKey) =>
      games[gameKey].every((blocks) =>
        Object.entries(blocks).every(([color, amount]) => amount <= max[color])
      )
    )
    .reduce((sum, curr) => sum + parseInt(curr), 0));
};

/*
Part two
*/
const p2 = (inputString, inputPath) => {
  const games = prepareData(inputString, inputPath);
  return Object.keys(games)
    .map((gameKey) =>
      games[gameKey].reduce(
        (biggest, block) => ({
          red:
            block.red !== undefined && biggest.red < block.red
              ? block.red
              : biggest.red,
          green:
            block.green !== undefined && biggest.green < block.green
              ? block.green
              : biggest.green,
          blue:
            block.blue !== undefined && biggest.blue < block.blue
              ? block.blue
              : biggest.blue,
        }),
        { blue: -Infinity, red: -Infinity, green: -Infinity }
      )
    )
    .map((block) =>
      Object.values(block).reduce((multi, value) => multi * value, 1)
    )
    .reduce((sum, value) => sum + value);
};

module.exports = { p1, p2 };
