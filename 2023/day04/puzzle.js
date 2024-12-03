const prepareData = (inputString) => {
  const lines = inputString
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

export const p1 = (inputString) => {
  const data = prepareData(inputString);
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
export const p2 = (inputString) => {
  const data = prepareData(inputString);
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

  const amountOfCopies = Object.values(results).reduce(
    (sum, value) => sum + value
  );

  return amountOfCopies;
};
