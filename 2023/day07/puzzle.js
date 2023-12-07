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
  return a.split("").reduce((result, current, index) => {
    const aScore = cards.indexOf(current);
    const bScore = cards.indexOf(b[index]);
    if (result !== 0) return result;
    else return aScore - bScore;
  }, 0);
};

const getRank = (hand, isP2) => {
  const [maxCard, maxAmount] = Object.entries(hand)

    .filter(([card, amount]) => (isP2 ? card !== "J" : true))
    .reduce(
      ([maxCard, maxAmount], [card, amount]) =>
        amount > maxAmount ? [card, amount] : [maxCard, maxAmount],
      [undefined, -Infinity]
    );

  const fullCardScores = Object.entries(hand)
    .filter(([card, amount]) => card !== maxCard)
    .map(([card, amount]) => ({
      card,
      amount,
    }));

  const fullCardScoresWithoutJokers = fullCardScores.filter(({ card }) =>
    isP2 ? card !== "J" : true
  );
  const fullJokerCardScore = fullCardScores.find(({ card }) => card === "J");

  let jokerCount = 0;
  if (isP2) {
    jokerCount = fullJokerCardScore?.amount || 0;
  }

  let rank = RANKS.HIGH_CARD;

  //Five of a Kind
  if (maxAmount + jokerCount === 5) {
    return { rank: RANKS.FIVE_OF_A_KIND };
  }
  //Four of a Kind
  if (maxAmount + jokerCount === 4) {
    return { rank: RANKS.FOUR_OF_A_KIND };
  }
  //Threes
  if (maxAmount + jokerCount === 3) {
    const twoCardScores = fullCardScoresWithoutJokers.filter(
      ({ amount }) => amount === 2
    );
    //has also 2: Full House
    if (twoCardScores.length > 0) {
      return { rank: RANKS.FULL_HOUSE };
    } else {
      return { rank: RANKS.THREE_OF_A_KIND };
    }
  }
  //Twos
  if (maxAmount + jokerCount === 2) {
    const twoCardScores = fullCardScoresWithoutJokers.filter(
      ({ amount }) => amount === 2
    );

    return {
      rank: twoCardScores.length == 1 ? RANKS.TWO_PAIR : RANKS.ONE_PAIR,
    };
  }

  return { rank };
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
      return { cards, hand, bid: parseInt(numbers) };
    });

  return lines;
};

const countScore = (plays, isP2) => {
  const sortedPlays = plays
    .map(({ hand, bid, cards }) => ({
      cards,
      hand,
      bid,
      ...getRank(hand, isP2),
    }))
    .toSorted((a, b) =>
      //if rank is same, sort on highestCard
      a.rank - b.rank !== 0 ? a.rank - b.rank : sortOnCards(a.cards, b.cards)
    );

  const score = sortedPlays.reduce(
    (total, { bid }, index) => total + (index + 1) * bid,
    0
  );
  return score;
};

/*
Part one
*/

const p1 = (inputString, inputPath) => {
  const plays = prepareData(inputString, inputPath);
  const score = countScore(plays);

  return score;
};

/*
Part two
*/
const p2 = (inputString, inputPath) => {
  const plays = prepareData(inputString, inputPath);
  const score = countScore(plays, true);

  return score;
};

module.exports = { p1, p2 };
