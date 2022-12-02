const fs = require("fs");

const YOU = {
  ROCK: "A",
  PAPER: "B",
  SCICCOR: "C",
};
const ME = {
  ROCK: "X",
  PAPER: "Y",
  SCICCOR: "Z",
};

const RESULT = {
  LOSE: "X",
  TIE: "Y",
  WIN: "Z",
};

const points = {
  [ME.ROCK]: 1, //rock
  [ME.PAPER]: 2, //paper
  [ME.SCICCOR]: 3, //scissor
  W: 6, //win
  L: 0, //lose
  T: 3, //tie
};

const prepareData = () => {
  const input = fs
    .readFileSync("./day2/input.txt", { encoding: "utf8" })
    .trim();
  return input.split("\n").map((x) => {
    const [a, b] = x.split(" ");
    return { you: a, me: b };
  });
};

/*
Part one
*/
const p1 = () => {
  const rounds = prepareData();
  let score = 0;
  rounds.forEach((r) => {
    score += points[r.me];
    //TIE
    if (
      (r.me === ME.ROCK && r.you === YOU.ROCK) ||
      (r.me === ME.PAPER && r.you === YOU.PAPER) ||
      (r.me === ME.SCICCOR && r.you === YOU.SCICCOR)
    ) {
      score += points.T;
    }
    //LOSE
    else if (
      (r.me === ME.ROCK && r.you === YOU.PAPER) ||
      (r.me === ME.PAPER && r.you === YOU.SCICCOR) ||
      (r.me === ME.SCICCOR && r.you === YOU.ROCK)
    ) {
      score += +points.L;
    }
    //WIN
    else {
      score += points.W;
    }    
  });
 return score
};
/*
Part two
*/
const p2 = () => {
 const rounds = prepareData();
  let score = 0;
  rounds.forEach((r) => {
    //TIE
    if (r.me === RESULT.TIE) {
      score += points.T;
      if (r.you == YOU.ROCK) score += points[ME.ROCK];
      if (r.you == YOU.SCICCOR) score += points[ME.SCICCOR];
      if (r.you == YOU.PAPER) score += points[ME.PAPER];
    }
    //LOSE
    if (r.me === RESULT.LOSE) {
      score += points.L;
      if (r.you == YOU.ROCK) score += points[ME.SCICCOR];
      if (r.you == YOU.SCICCOR) score += points[ME.PAPER];
      if (r.you == YOU.PAPER) score += points[ME.ROCK];
    }
    //WIN
     if (r.me === RESULT.WIN) {
       score += points.W;
       if (r.you == YOU.ROCK) score += points[ME.PAPER];
       if (r.you == YOU.SCICCOR) score += points[ME.ROCK];
       if (r.you == YOU.PAPER) score += points[ME.SCICCOR];
     }
  });
  return score
};

module.exports = { p1, p2 };