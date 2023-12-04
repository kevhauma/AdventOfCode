const fs = require("fs");

const prepareData = () => {
  const input = fs.readFileSync("./input.txt", { encoding: "utf8" });
  const lines = input
    .split(/\r?\n/g)
    .filter(Boolean)
    .map((line) => {
      const [card, numbers] = line.split(":");
      const [winningNumbers, myNumbers] = numbers
        .split("|")
        .map((numberstring) =>
          numberstring
            .split(" ")
            .filter(Boolean)
            .map((number) => parseInt(number.trim()))
        );
      return { card, winningNumbers, myNumbers };
    });

  return lines;
};

/*
Part one
*/

const p1 = (inputString, inputPath) => {
  const data = prepareData(inputString, inputPath);
  return data.reduce((total, card) => {
    const winning = card.winningNumbers.filter((win) =>
      card.myNumbers.includes(win)
    );
    return total + (winning.length ? Math.pow(2, winning.length - 1) : 0);
  }, 0);
};

/*
Part two
*/
const p2 = (inputString, inputPath) => {
  const data = prepareData(inputString, inputPath);
  const cardResults = data.map((card) => {
    const winning = card.winningNumbers.filter((win) =>
      card.myNumbers.includes(win)
    );
    return {
      card: parseInt(card.card.replace(/[^0-9]/g, "")),
      amountOfMatching: winning.length + 1,
    };
  });

  
  const results = {};
  cardResults.forEach((card) => {
    results[card.card] = 1;
  });
  
  cardResults.forEach((card) => {
    Array.from({ length: card.amountOfMatching - 1 }).forEach((_, i) => {
      const resultIndex = card.card + (i + 1);
      if (results[resultIndex])
        results[resultIndex] = results[resultIndex] + results[card.card];
    });
  });

  const amountOfCopies = Object.values(results).reduce((sum,value)=>sum+value)

  return amountOfCopies;
};

console.log(p1());
console.log(p2());

module.exports = { p1, p2 };
