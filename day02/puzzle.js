const fs = require("fs");

const YOU = { A: 1, B: 2, C: 3 }; // rock, paper, sciccor
const ME = { X: 1, Y: 2, Z: 3 };
const RESULT = { LOSE: "X", TIE: "Y", WIN: "Z" };
const points = {X: ME.X, Y: ME.Y, Z: ME.Z, W: 6, L: 0, T: 3, TIE: {A:ME.X,B:ME.Y,C:ME.Z}, WIN:{A:ME.Y,B:ME.Z,C:ME.X}, LOSE:{A:ME.Z,B:ME.X,C:ME.Y}};

const prepareData = () => fs
    .readFileSync("./day02/input.txt", { encoding: "utf8" })
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
const p2 = () => prepareData().reduce((score,r) => 
  score + (r.me === RESULT.TIE 
    ? points.T + points.TIE[r.you]
    : r.me === RESULT.LOSE 
    ? points.L + points.LOSE[r.you]      
    : points.W + + points.WIN[r.you]
    )
  ,0);

module.exports = { p1, p2 };