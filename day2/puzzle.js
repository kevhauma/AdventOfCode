const fs = require("fs");

const YOU = { A: 1, B: 2, C: 3 }; // rock, paper, sciccor
const ME = { X: 1, Y: 2, Z: 3 }; //
const RESULT = { LOSE: "X", TIE: "Y", WIN: "Z" };
const points = {X: 1, Y: 2, Z: 3, W: 6, L: 0, T: 3 };

const prepareData = () => fs
    .readFileSync("./day2/input.txt", { encoding: "utf8" })
    .trim()
    .split("\n")
    .map((x) => ({ you: x.split(" ")[0], me: x.split(" ")[1] }));
/*
Part one
*/
const p1 = () =>
  prepareData().reduce(
    (score, r) => score + points[r.me] +
       (YOU[r.you] === ME[r.me]
        ? points.T
        : YOU[r.you] - ME[r.me] === -1 || YOU[r.you] - ME[r.me] === 2
        ? points.W
        : points.L)        
      ,
    0
  );

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