const RANKS = {
  FIVE_OF_A_KIND: 7,
  FOUR_OF_A_KIND: 6,
  FULL_HOUSE: 5,
  THREE_OF_A_KIND: 4,
  TWO_PAIR: 3,
  ONE_PAIR: 2,
  HIGH_CARD: 1,
};
const cards = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];

const sortOnCards = (a, b) => {
  return a.reduce((result, current, index) => {
    if (result !== 0) return result;
    else return   current - b[index];
  }, 0);
};

const getCardScoresFromAmount = (hand, amountToFind) => {
  const found = Object.entries(hand).filter(
    ([card, amount]) => amount === amountToFind
  );
  return found.map(([card, amount]) => ({
    card,
    amount,
    score: cards.indexOf(card),
  }));
};

const getRank = (hand) => {
  const maxPair = Math.max(...Object.values(hand));
  
  //Five of a Kind
  if (maxPair === 5) {
    const cardScore = getCardScoresFromAmount(hand, 5).map(
      ({ score }) => score
    );
    return { rank: RANKS.FIVE_OF_A_KIND, cardScores: cardScore };
  }
  //Four of a Kind
  if (maxPair === 4) {
    const fourCardScore = getCardScoresFromAmount(hand, 4).map(
      ({ score }) => score
    );
    const oneCardScore = getCardScoresFromAmount(hand, 1).map(
      ({ score }) => score
    );
    return {
      rank: RANKS.FOUR_OF_A_KIND,
      cardScores: [...fourCardScore, ...oneCardScore],
    };
  }
  //Threes
  if (maxPair === 3) {
    const threeCardScore = getCardScoresFromAmount(hand, 3).map(
      ({ score }) => score
    );
    const twoCardScore = getCardScoresFromAmount(hand, 2).map(
      ({ score }) => score
    );
    //has also 2: Full House
    if (twoCardScore.length > 0) {
      return {
        rank: RANKS.FULL_HOUSE,
        cardScores: [...threeCardScore, ...twoCardScore],
      };
    }
    const oneCardScores = getCardScoresFromAmount(hand, 1)
      .map(({ score }) => score)
      .sort((a, b) => b - a);
    return {
      rank: RANKS.THREE_OF_A_KIND,
      cardScores: [...threeCardScore, ...oneCardScores],
    };
  }
  //Twos
  if (maxPair === 2) {
    const twoCardScores = getCardScoresFromAmount(hand, 2)
      .map(({ score }) => score)
      .sort((a, b) => b - a);
    const oneCardScores = getCardScoresFromAmount(hand, 1)
      .map(({ score }) => score)
      .sort((a, b) => b - a);
    const rank = twoCardScores.length == 2 ? RANKS.TWO_PAIR : RANKS.ONE_PAIR;
    return {
      rank: rank,
      cardScores: [...twoCardScores, ...oneCardScores],
    };
  }
  const oneCardScores = getCardScoresFromAmount(hand, 1)
    .map(({ score }) => score)
    .sort((a, b) => b - a);

  return {
    rank: RANKS.HIGH_CARD,
    cardScores: [...oneCardScores],
  };
};

const prepareData = (inputString) => {
  const lines = inputString
    .split(/\r?\n/g)
    .filter(Boolean)
    .map((line) => {
      const [cards, numbers] = line.split(" ");
      const hand = cards.split("").reduce((group, card) => {
        if (!group[card]) group[card] = 1;
        else group[card] = group[card] + 1;
        return { ...group };
      }, {});
      return { hand, bid: parseInt(numbers) };
    });

  return lines;
};

/*
Part one
*/

const p1 = (inputString, inputPath) => {
  const plays = prepareData(inputString, inputPath);
  const sortedPlays = plays
    .map(({ hand, bid }) => ({ hand, bid, ...getRank(hand) }))
    .toSorted((a, b) =>
      //if rank is same, sort on highestCard
      a.rank - b.rank !== 0
        ? a.rank - b.rank
        : sortOnCards(a.cardScores, b.cardScores)
    );
   console.log(sortedPlays.map(({rank})=>rank))
  //console.log(sortedPlays.map(({cardScores})=>cardScores))
  const score = sortedPlays.reduce(
    (total, { bid }, index) => total + ((index + 1) * bid),
    0
  );

  return score;
};

/*
Part two
*/
const p2 = (inputString, inputPath) => {
  const data = prepareData(inputString, inputPath);
};

module.exports = { p1, p2 };
